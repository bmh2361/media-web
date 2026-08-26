import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = path.join(process.cwd(), "audit", "case-study-media-presentation", "screenshots");
const files = await readdir(directory);

async function sheet(name, selected, columns, width, height) {
  const cells = [];
  for (const [index, file] of selected.entries()) {
    const image = await sharp(path.join(directory, file)).resize({ width, height, fit: "contain", background: "#111" }).png().toBuffer();
    cells.push({ input: image, left: (index % columns) * width, top: Math.floor(index / columns) * height });
  }
  await sharp({ create: { width: columns * width, height: Math.ceil(selected.length / columns) * height, channels: 3, background: "#111" } }).composite(cells).png().toFile(path.join(directory, name));
}

await sheet("heroes-desktop-contact-sheet.png", files.filter((file) => file.endsWith("-1440-hero.png")).sort(), 3, 480, 380);
await sheet("heroes-mobile-contact-sheet.png", files.filter((file) => file.endsWith("-390-hero.png")).sort(), 4, 280, 480);
await sheet("preview-contact-sheet.png", files.filter((file) => file.startsWith("preview-")).sort(), 3, 480, 620);
await sheet("gallery-first-last-contact-sheet.png", files.filter((file) => /-1440-(first|last)\.png$/.test(file)).sort(), 4, 360, 300);
console.log("Composed desktop hero, mobile hero, preview and gallery screenshot contact sheets.");
