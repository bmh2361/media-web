import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const out = path.join(process.cwd(), "audit", "performance", "fixtures");
await fs.mkdir(out, { recursive: true });

function noise(width, height, seed) {
  const buffer = Buffer.allocUnsafe(width * height * 3);
  let value = seed;
  for (let index = 0; index < buffer.length; index += 1) {
    value = (value * 1664525 + 1013904223) >>> 0;
    buffer[index] = (value >>> 16) & 255;
  }
  return buffer;
}

async function image(name, width, height, quality, seed) {
  const target = path.join(out, name);
  await sharp(noise(width, height, seed), { raw: { width, height, channels: 3 } })
    .blur(1.4)
    .webp({ quality, effort: 4 })
    .toFile(target);
  const stat = await fs.stat(target);
  return { name, width, height, bytes: stat.size };
}

const assets = [
  await image("hero-desktop.webp", 1200, 1500, 58, 11),
  await image("hero-mobile.webp", 720, 960, 56, 17),
  await image("poster-desktop.webp", 1200, 675, 56, 23)
];
for (let index = 1; index <= 12; index += 1)
  assets.push(await image(`gallery-${String(index).padStart(2, "0")}.webp`, 900, 600, 54, index * 31));

const simulatedVideoBytes = 1_200_000;
await fs.writeFile(path.join(out, "hero-video-payload.bin"), Buffer.alloc(simulatedVideoBytes));
const manifest = {
  generatedAt: new Date().toISOString(),
  purpose: "Performance-only fixtures; never production or portfolio media.",
  assets,
  simulatedVideo: {
    name: "hero-video-payload.bin",
    bytes: simulatedVideoBytes,
    assumedDurationSeconds: 8,
    assumedBitrateMbps: 1.2,
    note: "Network payload simulation only; not a playable public video."
  }
};
await fs.writeFile(path.join(out, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest, null, 2));
