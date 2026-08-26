import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const supported = new Set([".avif", ".heic", ".heif", ".jpeg", ".jpg", ".png", ".tif", ".tiff", ".webp"]);
const inputArgument = process.argv[2];

if (!inputArgument || ["--help", "-h"].includes(inputArgument)) {
  console.log("Usage: npm run evidence:contact-sheet -- <input-folder> [output-folder]");
  console.log("Creates paginated PNG contact sheets; original images are never changed or copied.");
  process.exit(0);
}

const inputFolder = path.resolve(inputArgument);
const outputFolder = path.resolve(process.argv[3] ?? path.join(path.dirname(inputFolder), `${path.basename(inputFolder)}-contact-sheets`));
if (inputFolder === outputFolder) throw new Error("Output folder must be different from the input folder.");

async function collectImages(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(folder, entry.name);
    if (entry.isDirectory()) return collectImages(absolute);
    return entry.isFile() && supported.has(path.extname(entry.name).toLowerCase()) ? [absolute] : [];
  }));
  return nested.flat().sort((a, b) => a.localeCompare(b));
}

const escapeXml = (value) => value.replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]);
const orientationOf = (width, height) => width > height * 1.08 ? "landscape" : height > width * 1.08 ? "portrait" : "square";
const files = await collectImages(inputFolder);
if (!files.length) throw new Error(`No supported images found in ${inputFolder}`);

await mkdir(outputFolder, { recursive: true });
const columns = 4;
const rows = 5;
const cellWidth = 320;
const cellHeight = 260;
const pageSize = columns * rows;
const pages = Math.ceil(files.length / pageSize);

for (let page = 0; page < pages; page += 1) {
  const pageFiles = files.slice(page * pageSize, (page + 1) * pageSize);
  const composites = [];
  for (let index = 0; index < pageFiles.length; index += 1) {
    const file = pageFiles[index];
    const metadata = await sharp(file).metadata();
    const width = metadata.autoOrient?.width ?? metadata.width ?? 0;
    const height = metadata.autoOrient?.height ?? metadata.height ?? 0;
    const thumbnail = await sharp(file).rotate().resize(280, 175, { fit: "contain", background: "#111111" }).png().toBuffer();
    const x = (index % columns) * cellWidth + 20;
    const y = Math.floor(index / columns) * cellHeight + 20;
    const relative = path.relative(inputFolder, file);
    const label = `${relative} · ${width}×${height} · ${orientationOf(width, height)}`;
    const labelSvg = Buffer.from(`<svg width="280" height="55" xmlns="http://www.w3.org/2000/svg"><rect width="280" height="55" fill="#f5f0e8"/><text x="8" y="18" font-family="Arial, sans-serif" font-size="11" fill="#171717">${escapeXml(label.slice(0, 76))}</text><text x="8" y="37" font-family="Arial, sans-serif" font-size="10" fill="#6b625a">${escapeXml(label.slice(76, 152))}</text></svg>`);
    composites.push({ input: thumbnail, left: x, top: y }, { input: labelSvg, left: x, top: y + 175 });
  }
  const pageNumber = String(page + 1).padStart(2, "0");
  await sharp({ create: { width: columns * cellWidth, height: rows * cellHeight, channels: 3, background: "#f5f0e8" } })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputFolder, `contact-sheet-${pageNumber}.png`));
}

console.log(JSON.stringify({ inputFolder, outputFolder, images: files.length, pages }, null, 2));
