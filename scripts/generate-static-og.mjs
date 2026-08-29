import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDirectory = path.join(root, "public", "og");
const output = path.join(outputDirectory, "venus-bridge.png");
const lockup = await sharp(
  path.join(root, "public", "brand", "venus-bridge", "png", "venus-bridge-horizontal-lockup-white.png")
)
  .resize({ width: 560, withoutEnlargement: true })
  .png()
  .toBuffer();

await mkdir(outputDirectory, { recursive: true });
await sharp({
  create: { width: 1200, height: 630, channels: 4, background: { r: 10, g: 11, b: 13, alpha: 1 } }
})
  .composite([
    { input: lockup, left: 72, top: 72 },
    {
      input: Buffer.from('<svg width="1056" height="4"><rect width="1056" height="4" fill="#cca672"/></svg>'),
      left: 72,
      top: 554
    }
  ])
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(`Static Open Graph image generated: ${path.relative(root, output)}`);
