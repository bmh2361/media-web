import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const port = Number(process.env.PLAYWRIGHT_PORT ?? 3217);
const baseURL = `http://127.0.0.1:${port}`;
const filters = process.argv.slice(2);
const run = (command, args, options = {}) =>
  new Promise((resolve) => {
    const child = spawn(command, args, { stdio: "inherit", ...options });
    child.on("exit", (code) => resolve(code ?? 1));
  });

const server = spawn(process.execPath, ["scripts/serve-static-export.mjs", "--port", String(port)], {
  cwd: root,
  stdio: "inherit",
  env: process.env
});

let ready = false;
for (let attempt = 0; attempt < 80; attempt += 1) {
  try {
    const response = await fetch(`${baseURL}/en`);
    if (response.ok) {
      ready = true;
      break;
    }
  } catch {}
  await new Promise((resolve) => setTimeout(resolve, 250));
}

let code = 1;
try {
  if (!ready) throw new Error("Production server did not become ready.");
  code = await run(
    process.execPath,
    [
      path.join(root, "node_modules", "@playwright", "test", "cli.js"),
      "test",
      ...filters,
      "--config",
      "playwright.production.config.ts"
    ],
    { cwd: root, env: { ...process.env, PLAYWRIGHT_BASE_URL: baseURL } }
  );
} finally {
  server.kill();
}

process.exit(code);
