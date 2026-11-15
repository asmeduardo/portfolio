"""Validate the actual Compose deployment boundary without starting containers."""
import configparser
import json
import os
from pathlib import Path
import subprocess
import unittest


class PortfolioIsolationTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        result = subprocess.run(
            ["docker", "compose", "-f", str(Path(__file__).with_name("compose.yaml")),
             "config", "--format", "json"],
            env={**os.environ, "PORTFOLIO_IMAGE": "portfolio:test"},
            capture_output=True, text=True, timeout=30, check=True,
        )
        cls.config = json.loads(result.stdout)

    def test_portfolio_is_a_separate_project_with_no_database_or_shared_network(self):
        self.assertEqual(self.config["name"], "eduardo-portfolio")
        self.assertEqual(set(self.config["services"]), {"web"})
        self.assertEqual(self.config["networks"]["web"]["name"], "eduardo-portfolio-web")
        self.assertFalse(self.config["networks"]["web"].get("external", False))
        self.assertFalse(self.config.get("volumes"))

    def test_runtime_is_nonroot_readonly_and_only_exposed_on_loopback(self):
        service = self.config["services"]["web"]
        self.assertEqual(service["user"], "1000:1000")
        self.assertTrue(service["read_only"])
        self.assertFalse(service.get("privileged", False))
        self.assertIn("no-new-privileges:true", service["security_opt"])
        self.assertEqual(service["cap_drop"], ["ALL"])
        self.assertEqual([(p["host_ip"], p["published"]) for p in service["ports"]],
                         [("127.0.0.1", "18182")])

    def test_build_has_its_own_root_slice_and_bounded_resources(self):
        units = list(Path(__file__).parent.glob("*build*.slice"))
        self.assertEqual(len(units), 1)
        self.assertNotIn("-", units[0].stem,
                         "A dash nests the build under another slice and inherits its limits")
        config = configparser.ConfigParser(interpolation=None)
        config.read(units[0])
        self.assertEqual(config["Slice"]["CPUQuota"], "50%")
        self.assertEqual(config["Slice"]["MemoryMax"], "1792M")
        self.assertEqual(config["Slice"]["MemorySwapMax"], "0")

    def test_memory_cpu_and_process_budget_are_explicit(self):
        service = self.config["services"]["web"]
        self.assertEqual(service["cgroup_parent"], "portfolio.slice")
        self.assertLessEqual(int(service["mem_limit"]), 384 * 1024 * 1024)
        self.assertLessEqual(float(service["cpus"]), 0.2)
        self.assertLessEqual(service["pids_limit"], 64)


if __name__ == "__main__":
    unittest.main()
