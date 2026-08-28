import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const sourceDirectory = process.argv[2] || "D:/media pics/media logo";
const outputDirectory = path.join(process.cwd(), "public", "brand", "venus-bridge-media");

const sources = [
  {
    source: "ChatGPT Image 2026年7月17日 19_52_01 (1).png",
    name: "vbm-monogram-gold",
    widths: [96, 192],
    role: "mark"
  },
  {
    source: "ChatGPT Image 2026年7月17日 19_52_01 (2).png",
    name: "vbm-lockup-name",
    widths: [320, 640],
    role: "name"
  },
  {
    source: "ChatGPT Image 2026年7月17日 19_52_02 (3).png",
    name: "vbm-lockup-tagline",
    widths: [560, 1120],
    role: "tagline"
  },
  {
    source: "ChatGPT Image 2026年7月17日 19_52_02 (4).png",
    name: "vbm-lockup-full-transparent",
    widths: [560, 1120],
    role: "full-transparent"
  }
];

const clamp = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

async function isolateArtwork(inputPath, extract) {
  const pipeline = sharp(inputPath).removeAlpha();
  if (extract) pipeline.extract(extract);
  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  const output = Buffer.alloc(info.width * info.height * 4);
  const matte = [250, 247, 241];

  for (let source = 0, target = 0; source < data.length; source += 3, target += 4) {
    const red = data[source];
    const green = data[source + 1];
    const blue = data[source + 2];
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    const range = Math.max(red, green, blue) - Math.min(red, green, blue);
    const warmth = red - blue;
    const goldSignal = clamp((warmth - 12) / 42);
    const darkSignal = clamp((228 - luminance) / 112);
    const isGold = warmth > 18 && red > green + 2 && range > 20;
    let alpha = Math.max(isGold ? goldSignal : 0, darkSignal);

    if (alpha < 0.035) alpha = 0;
    if (alpha > 0.94) alpha = 1;

    if (!alpha) {
      output[target] = 0;
      output[target + 1] = 0;
      output[target + 2] = 0;
      output[target + 3] = 0;
      continue;
    }

    if (!isGold && range < 35) {
      output[target] = 10;
      output[target + 1] = 11;
      output[target + 2] = 13;
    } else if (alpha < 1) {
      output[target] = clamp((red - (1 - alpha) * matte[0]) / alpha, 0, 255);
      output[target + 1] = clamp((green - (1 - alpha) * matte[1]) / alpha, 0, 255);
      output[target + 2] = clamp((blue - (1 - alpha) * matte[2]) / alpha, 0, 255);
    } else {
      output[target] = red;
      output[target + 1] = green;
      output[target + 2] = blue;
    }
    output[target + 3] = Math.round(alpha * 255);
  }

  const trimmed = await sharp(output, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 4 })
    .png()
    .toBuffer({ resolveWithObject: true });
  const padding = Math.max(8, Math.round(trimmed.info.height * 0.045));

  return sharp(trimmed.data)
    .extend({
      top: padding,
      right: padding,
      bottom: padding,
      left: padding,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();
}

async function createDarkSurfaceVariant(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    const range = Math.max(red, green, blue) - Math.min(red, green, blue);
    if (data[index + 3] && luminance < 110 && range < 45) {
      data[index] = 244;
      data[index + 1] = 240;
      data[index + 2] = 232;
    }
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

async function writeSizes(buffer, name, widths) {
  const outputs = [];
  for (const [index, width] of widths.entries()) {
    const suffix = index === 0 ? "" : "@2x";
    const outputPath = path.join(outputDirectory, `${name}${suffix}.png`);
    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(outputPath);
    const metadata = await sharp(outputPath).metadata();
    const stats = await fs.stat(outputPath);
    outputs.push({
      path: path.relative(process.cwd(), outputPath).replaceAll("\\", "/"),
      width: metadata.width,
      height: metadata.height,
      hasAlpha: metadata.hasAlpha,
      bytes: stats.size
    });
  }
  return outputs;
}

async function writeAppIcon(mark, width, name) {
  const markWidth = Math.round(width * 0.68);
  const resizedMark = await sharp(mark).resize({ width: markWidth }).png().toBuffer();
  const markMetadata = await sharp(resizedMark).metadata();
  const outputPath = path.join(outputDirectory, name);
  await sharp({
    create: {
      width,
      height: width,
      channels: 4,
      background: { r: 10, g: 11, b: 13, alpha: 1 }
    }
  })
    .composite([
      {
        input: resizedMark,
        left: Math.round((width - (markMetadata.width || markWidth)) / 2),
        top: Math.round((width - (markMetadata.height || markWidth)) / 2)
      }
    ])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
  return outputPath;
}

await fs.mkdir(outputDirectory, { recursive: true });
const report = [];

for (const asset of sources) {
  const inputPath = path.join(sourceDirectory, asset.source);
  const sourceMetadata = await sharp(inputPath).metadata();
  const artwork = await isolateArtwork(inputPath);
  const outputs = await writeSizes(artwork, asset.name, asset.widths);
  const variants = [];

  if (asset.role !== "mark") {
    const darkArtwork = await createDarkSurfaceVariant(artwork);
    variants.push(...(await writeSizes(darkArtwork, `${asset.name}-dark`, asset.widths)));
  }

  report.push({
    source: asset.source,
    role: asset.role,
    sourceMetadata: {
      width: sourceMetadata.width,
      height: sourceMetadata.height,
      channels: sourceMetadata.channels,
      hasAlpha: sourceMetadata.hasAlpha
    },
    outputs,
    darkSurfaceVariants: variants
  });
}

const nameSource = path.join(sourceDirectory, sources[1].source);
const wordmark = await isolateArtwork(nameSource, { left: 130, top: 635, width: 1188, height: 190 });
const wordmarkDark = await createDarkSurfaceVariant(wordmark);
report.push({
  source: sources[1].source,
  role: "header-wordmark",
  derivedFromApprovedArtwork: true,
  outputs: await writeSizes(wordmark, "vbm-wordmark-name", [280, 560]),
  darkSurfaceVariants: await writeSizes(wordmarkDark, "vbm-wordmark-name-dark", [280, 560])
});

const mark = await isolateArtwork(path.join(sourceDirectory, sources[0].source));
const appIcon192 = await writeAppIcon(mark, 192, "vbm-app-icon-192.png");
const appIcon512 = await writeAppIcon(mark, 512, "vbm-app-icon-512.png");
await sharp(mark)
  .resize({ width: 64 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outputDirectory, "vbm-favicon-64.png"));
await fs.copyFile(appIcon512, path.join(process.cwd(), "app", "icon.png"));
await fs.copyFile(appIcon192, path.join(process.cwd(), "app", "apple-icon.png"));

await fs.writeFile(
  path.join(outputDirectory, "asset-report.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), assets: report }, null, 2)}\n`,
  "utf8"
);
console.log(JSON.stringify(report, null, 2));
