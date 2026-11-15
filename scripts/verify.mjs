import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function verify({
  run = spawnSync,
  platform = process.platform,
  npmCli = process.env.npm_execpath,
} = {}) {
  if (!npmCli) throw new Error("Execute verification through npm run verify");
  const steps = [
    [process.execPath, [npmCli, "run", "check"]],
    [platform === "win32" ? "python" : "python3", ["ops/test_isolation.py"]],
    [process.execPath, [npmCli, "run", "test:e2e", "--", "--workers=2"]],
  ];
  for (const [command, args] of steps) {
    const result = run(command, args, { stdio: "inherit" });
    if (result.error) throw result.error;
    if (result.status !== 0) return result.status ?? 1;
  }
  return 0;
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  process.exitCode = verify();
}
