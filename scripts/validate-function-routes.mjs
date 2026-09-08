import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const routeFile = path.join(root, "out", "_routes.json");
const failures = [];

if (!fs.existsSync(routeFile)) {
  failures.push("Missing generated out/_routes.json.");
} else {
  const routes = JSON.parse(fs.readFileSync(routeFile, "utf8"));
  const expectedInclude = ["/api/contact"];
  const expectedExclusions = ["/en", "/en/*", "/zh", "/zh/*", "/_next/static/*", "/media/*", "/og/*"];
  if (routes.version !== 1) failures.push("out/_routes.json must use version 1.");
  if (JSON.stringify(routes.include) !== JSON.stringify(expectedInclude)) {
    failures.push("Only /api/contact may be included in the Pages Function routing surface.");
  }
  for (const route of expectedExclusions) {
    if (!routes.exclude?.includes(route)) failures.push(`Missing static route exclusion: ${route}`);
  }
  for (const route of routes.include ?? []) {
    if (/^\/(?:en|zh)(?:\/|$)|^\/(?:_next\/static|media|og)(?:\/|$)/.test(route)) {
      failures.push(`Static surface is incorrectly routed through Functions: ${route}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  "Cloudflare Function routing validation passed: /api/contact is dynamic; pages and assets remain static."
);
