import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import config from "../next.config.mjs";

describe("Contabo deployment contract", () => {
  it("produces a self-contained runtime without publishing a development server", () => {
    expect(config.output).toBe("standalone");
    expect(config.poweredByHeader).toBe(false);
    expect(config.reactStrictMode).toBe(true);
  });
  it("serves security headers from the standalone application", async () => {
    const rules = await config.headers();
    const headers = Object.fromEntries(
      rules[0].headers.map(({ key, value }) => [key, value]),
    );
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Strict-Transport-Security"]).toContain("includeSubDomains");
    expect(headers["Content-Security-Policy-Report-Only"]).toContain(
      "frame-ancestors 'none'",
    );
  });
});

describe("retired hosting integration", () => {
  it("has no obsolete provider configuration or automatic deployment", () => {
    expect(existsSync(resolve("netlify.toml"))).toBe(false);
    for (const file of readdirSync(resolve(".github/workflows"))) {
      const workflow = readFileSync(resolve(".github/workflows", file), "utf8");
      expect(workflow).not.toMatch(/netlify/i);
    }
    expect(readFileSync(resolve("README.md"), "utf8")).toContain("Contabo");
    expect(readFileSync(resolve("README.md"), "utf8")).not.toMatch(/netlify/i);
  });
});
