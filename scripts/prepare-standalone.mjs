import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const runtime = resolve(root, ".next/standalone");
if (!existsSync(resolve(runtime, "server.js"))) {
  throw new Error("Next.js standalone runtime was not generated");
}
// Next.js deliberately excludes these assets from output file tracing.
// https://nextjs.org/docs/app/api-reference/config/next-config-js/output
cpSync(resolve(root, "public"), resolve(runtime, "public"), {
  recursive: true,
});
cpSync(resolve(root, ".next/static"), resolve(runtime, ".next/static"), {
  recursive: true,
});
