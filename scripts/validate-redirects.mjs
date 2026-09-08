import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const redirectsFile = path.join(root, "public", "_redirects");
const lines = fs
  .readFileSync(redirectsFile, "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"));
const entries = lines.map((line) => {
  const [source, destination, status] = line.split(/\s+/);
  const [targetPath, fragment = null] = destination.split("#", 2);
  return { source, destination, status: Number(status), targetPath, fragment };
});
const sources = new Set(entries.map((entry) => entry.source));
const failures = [];
const outputHtml = (targetPath) =>
  targetPath === "/en" || targetPath === "/zh"
    ? path.join(root, "out", `${targetPath.slice(1)}.html`)
    : path.join(root, "out", `${targetPath.slice(1)}.html`);

for (const entry of entries) {
  if (![307, 308].includes(entry.status))
    failures.push(`${entry.source}: unsupported status ${entry.status}`);
  if (entry.source !== "/" && sources.has(entry.targetPath))
    failures.push(`${entry.source}: redirect chain through ${entry.targetPath}`);
  if (entry.source === entry.targetPath) failures.push(`${entry.source}: redirect loop`);
  const sourceLanguage = entry.source.match(/^\/(en|zh)(?:\/|$)/)?.[1];
  const targetLanguage = entry.targetPath.match(/^\/(en|zh)(?:\/|$)/)?.[1];
  if (sourceLanguage && sourceLanguage !== targetLanguage)
    failures.push(`${entry.source}: language is not preserved`);
  const targetFile = outputHtml(entry.targetPath);
  if (!fs.existsSync(targetFile)) failures.push(`${entry.source}: missing final target ${entry.targetPath}`);
  if (fs.existsSync(targetFile)) {
    const html = fs.readFileSync(targetFile, "utf8");
    if (entry.fragment && !new RegExp(`\\bid=["']${entry.fragment}["']`).test(html))
      failures.push(`${entry.source}: missing target anchor #${entry.fragment}`);
    const expectedCanonical = `https://www.venusbridge.co.uk${entry.targetPath}`;
    if (!html.includes(`rel="canonical" href="${expectedCanonical}"`))
      failures.push(`${entry.source}: final canonical is not ${expectedCanonical}`);
  }
}

const sitemapSource = fs.readFileSync(path.join(root, "app", "sitemap.ts"), "utf8");
for (const entry of entries.filter((item) => item.source !== "/" && !item.source.includes("*"))) {
  if (sitemapSource.includes(`"${entry.source}"`))
    failures.push(`${entry.source}: retired URL appears in sitemap source`);
}

const matrix = {
  generatedAt: new Date().toISOString(),
  rootLanguageRedirect: { status: 307, decision: "temporary-language-entry" },
  redirectCount: entries.length,
  failures,
  entries: entries.map((entry) => ({
    oldRoute: entry.source,
    currentFirstHop: entry.destination,
    requiredFinalDestination: entry.destination,
    status: entry.status,
    targetAnchor: entry.fragment,
    anchorExists: entry.fragment
      ? !failures.some((failure) => failure.startsWith(`${entry.source}: missing target anchor`))
      : null,
    oneHop: !sources.has(entry.targetPath)
  }))
};
fs.mkdirSync(path.join(root, "audit"), { recursive: true });
fs.writeFileSync(path.join(root, "audit", "redirect-matrix.json"), `${JSON.stringify(matrix, null, 2)}\n`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Redirect validation passed: ${entries.length} rules resolve in one hop.`);
