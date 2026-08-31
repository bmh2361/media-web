import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const inventory = JSON.parse(fs.readFileSync(path.join(root, "audit", "og-card-inventory.json"), "utf8"));
const columns = 3;
const tileWidth = 640;
const tileHeight = 375;
const cardWidth = 600;
const cardHeight = 315;
const rows = Math.ceil(inventory.cards.length / columns);
const composites = [];

for (const [index, card] of inventory.cards.entries()) {
  const left = (index % columns) * tileWidth + 20;
  const top = Math.floor(index / columns) * tileHeight + 42;
  const file = path.join(root, "public", card.path.replace(/^\//, ""));
  composites.push({ input: await sharp(file).resize(cardWidth, cardHeight).png().toBuffer(), left, top });
  const label = `${String(index + 1).padStart(2, "0")}  ${card.language.toUpperCase()}  ${card.route}`;
  composites.push({
    input: Buffer.from(
      `<svg width="600" height="34" xmlns="http://www.w3.org/2000/svg"><text x="0" y="24" fill="#f4f0e8" font-family="Arial, sans-serif" font-size="18">${label.replaceAll("&", "&amp;")}</text></svg>`
    ),
    left,
    top: top - 32
  });
}

const output = path.join(root, "audit", "english-hardening", "final", "og-contact-sheet.png");
await sharp({
  create: { width: columns * tileWidth, height: rows * tileHeight, channels: 3, background: "#17191d" }
})
  .composite(composites)
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(`Generated ${output} with ${inventory.cards.length} cards.`);
