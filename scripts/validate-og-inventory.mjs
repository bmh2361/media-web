import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inventoryPath = path.join(root, "audit", "og-card-inventory.json");
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const failures = [];
const corePaths = ["", "/companies", "/partners", "/work", "/how-we-work", "/about", "/contact"];
const requiredRoutes = corePaths.flatMap((route) => [`` + `/en${route}`, `/zh${route}`]);
const cardsByRoute = new Map(inventory.cards.map((card) => [card.route, card]));
for (const route of requiredRoutes)
  if (!cardsByRoute.has(route)) failures.push(`Missing core OG card: ${route}`);
const coreFiles = requiredRoutes.map((route) => cardsByRoute.get(route)?.path).filter(Boolean);
if (new Set(coreFiles).size !== coreFiles.length) failures.push("Core routes share an OG image path.");
for (const card of inventory.cards) {
  if (/Venus Bridge\s+Media|concept(?:ual)? project/i.test(`${card.title} ${card.subtitle ?? ""}`))
    failures.push(`${card.route}: obsolete or conceptual positioning in OG copy`);
  const file = path.join(root, "public", card.path.replace(/^\//, ""));
  if (!fs.existsSync(file)) {
    failures.push(`${card.route}: missing ${card.path}`);
    continue;
  }
  const metadata = await sharp(file).metadata();
  if (metadata.width !== 1200 || metadata.height !== 630)
    failures.push(`${card.route}: expected 1200x630, got ${metadata.width}x${metadata.height}`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Open Graph inventory validation passed: ${inventory.cards.length} cards at 1200x630.`);
