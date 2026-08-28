import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputDirectory = path.join(root, "dist");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const output = path.join(outputDirectory, `venus-bridge-media-source-${timestamp}.zip`);
const fileList = path.join(outputDirectory, `.source-files-${timestamp}.txt`);

const excludedDirectories = new Set([
  ".git",
  ".next",
  ".playwright",
  "blob-report",
  "coverage",
  "dist",
  "node_modules",
  "out",
  "playwright-report",
  "test-results"
]);

function shouldExclude(relativePath, entry) {
  const normalized = relativePath.replaceAll("\\", "/");
  if (entry.isDirectory() && excludedDirectories.has(entry.name)) return true;
  if (normalized === "audit/performance/fixtures" || normalized.startsWith("audit/performance/fixtures/")) {
    return true;
  }
  if (normalized === "public/media/demo" || normalized.startsWith("public/media/demo/")) return true;
  if (normalized.startsWith("audit/") && /\.(?:jpe?g|png|webm|mp4|log)$/i.test(normalized)) return true;
  if (/^(?:debug|npm-debug|yarn-debug|yarn-error)\.log/i.test(entry.name)) return true;
  if ([".DS_Store", "Thumbs.db"].includes(entry.name)) return true;
  if (entry.name.startsWith(".env") && entry.name !== ".env.example") return true;
  return /(?:~|\.tmp|\.temp)$/i.test(entry.name);
}

function collect(directory, relativeDirectory = "") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(relativeDirectory, entry.name);
    if (shouldExclude(relativePath, entry)) return [];
    if (entry.isDirectory()) return collect(path.join(directory, entry.name), relativePath);
    return [relativePath.replaceAll("\\", "/")];
  });
}

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(fileList, `${collect(root).join("\n")}\n`, "utf8");
const result = spawnSync("tar", ["-a", "-c", "-f", output, "-T", fileList], {
  cwd: root,
  encoding: "utf8"
});
fs.rmSync(fileList, { force: true });
if (result.status !== 0) {
  process.stderr.write(result.stderr || "Source package creation failed.\n");
  process.exit(result.status || 1);
}
console.log(JSON.stringify({ output, bytes: fs.statSync(output).size }, null, 2));
