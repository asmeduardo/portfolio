import { expect, it, vi } from "vitest";
import { verify } from "../scripts/verify.mjs";

it("stops verification immediately when an earlier check fails", () => {
  const run = vi.fn(() => ({ status: 17 }));
  expect(verify({ run, npmCli: "test-npm-cli" })).toBe(17);
  expect(run).toHaveBeenCalledTimes(1);
});

it.each(["win32", "linux"])(
  "runs infrastructure and browser acceptance on %s",
  (platform) => {
    const run = vi.fn(() => ({ status: 0 }));
    expect(verify({ run, platform, npmCli: "test-npm-cli" })).toBe(0);
    const interpreter = platform === "win32" ? "python" : "python3";
    expect(
      run.mock.calls.some(
        ([command, args]) =>
          command === interpreter && args.includes("ops/test_isolation.py"),
      ),
    ).toBe(true);
    expect(run.mock.calls.at(-1)[1]).toContain("test:e2e");
  },
);

it("does not run browser acceptance when infrastructure validation fails", () => {
  const run = vi
    .fn()
    .mockReturnValueOnce({ status: 0 })
    .mockReturnValueOnce({ status: 9 });
  expect(verify({ run, npmCli: "test-npm-cli" })).toBe(9);
  expect(run).toHaveBeenCalledTimes(2);
});
