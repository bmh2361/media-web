import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicRoot = path.join(root, "public");
const auditRoot = path.join(root, "audit", "phase-3-2c", "pre-implementation");
const contactRoot = path.join(auditRoot, "portfolio-contact-sheets");
const imageExtensions = new Set([".avif", ".jpg", ".jpeg", ".png", ".svg", ".webp"]);

const toPosix = (value) => value.split(path.sep).join("/");
const escapeXml = (value) => value.replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]);

async function walk(directory) {
  const output = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walk(absolute));
    else output.push(absolute);
  }
  return output;
}

function family(relative) {
  if (relative.startsWith("media/art-directed/")) return "art-directed";
  if (relative.startsWith("media/portfolio/")) return "portfolio-derivative";
  if (relative.startsWith("media/expertise/")) return "expertise";
  if (relative.startsWith("media/demo/")) return "demo";
  if (relative.startsWith("media/placeholders/")) return "placeholder";
  if (relative.startsWith("brand/")) return "brand";
  if (relative.startsWith("images/")) return "legacy-scaffold";
  return "other";
}

function logicalId(relative) {
  if (relative.startsWith("media/art-directed/")) return relative.split("/")[2];
  if (relative.startsWith("media/portfolio/")) return relative.replace(/-(mobile|thumb)(?=\.)/, "").replace(/\.(avif|webp)$/, "");
  if (relative.startsWith("media/expertise/")) return relative.replace(/\.(avif|jpg|jpeg|webp)$/, "");
  return relative.replace(/@2x(?=\.)/, "").replace(/\.(avif|jpg|jpeg|png|svg|webp)$/, "");
}

function isReviewSource(relative) {
  return /^media\/art-directed\/[^/]+\/desktop\.jpg$/.test(relative) ||
    (relative.startsWith("media/expertise/") && relative.endsWith(".jpg"));
}

function reviewGroup(relative) {
  if (relative.includes("/art-directed/vbm-")) return "03-capability-selected";
  if (relative.includes("/art-directed/") && /(byd-bd11|catl-open|changan-europe|european-road|leapmotor|london-automotive)/.test(relative)) return "01-automotive-projects";
  if (relative.includes("/art-directed/") && /(commercial-fashion|creative-beauty|talent-categories|teal-editorial)/.test(relative)) return "02-fashion-beauty-talent-projects";
  if (relative.includes("/expertise/technology-ai-research/")) return "04-technology-ai-research";
  if (relative.includes("/expertise/entertainment-culture/")) return "05-creators-culture-entertainment";
  return "06-other";
}

async function metadataFor(file, relative) {
  const stat = await fs.stat(file);
  const extension = path.extname(file).toLowerCase();
  let width = null;
  let height = null;
  let format = extension.slice(1);
  if (extension !== ".svg") {
    const metadata = await sharp(file, { failOn: "none" }).rotate().metadata();
    width = metadata.width ?? null;
    height = metadata.height ?? null;
    format = metadata.format ?? format;
  }
  const hash = crypto.createHash("sha256").update(await fs.readFile(file)).digest("hex");
  const aspectRatio = width && height ? Number((width / height).toFixed(4)) : null;
  return {
    relativePath: relative,
    filename: path.basename(relative),
    family: family(relative),
    logicalId: logicalId(relative),
    bytes: stat.size,
    format,
    width,
    height,
    aspectRatio,
    orientation: width && height ? (width > height * 1.08 ? "landscape" : height > width * 1.08 ? "portrait" : "square") : "vector",
    sha256: hash,
    reviewSource: isReviewSource(relative),
    reviewGroup: isReviewSource(relative) ? reviewGroup(relative) : null
  };
}

async function renderContactSheet(group, records, pageIndex) {
  const columns = 4;
  const rows = 5;
  const cellWidth = 360;
  const cellHeight = 290;
  const composites = [];
  for (const [index, record] of records.entries()) {
    const source = path.join(publicRoot, record.relativePath);
    const thumbnail = await sharp(source, { failOn: "none" })
      .rotate()
      .resize(320, 205, { fit: "contain", background: "#111214" })
      .jpeg({ quality: 82 })
      .toBuffer();
    const x = (index % columns) * cellWidth + 20;
    const y = Math.floor(index / columns) * cellHeight + 20;
    const label = record.relativePath.replace("media/art-directed/", "AD/").replace("media/expertise/", "EXP/");
    const svg = Buffer.from(`<svg width="320" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="64" fill="#f4f0e8"/><text x="8" y="17" font-family="Arial" font-size="11" fill="#171717">${escapeXml(label.slice(0, 57))}</text><text x="8" y="34" font-family="Arial" font-size="10" fill="#6b625a">${escapeXml(label.slice(57, 114))}</text><text x="8" y="53" font-family="Arial" font-size="10" fill="#6b625a">${record.width}x${record.height} | ${record.orientation} | ${(record.bytes / 1024).toFixed(0)} KB</text></svg>`);
    composites.push({ input: thumbnail, left: x, top: y }, { input: svg, left: x, top: y + 205 });
  }
  const output = path.join(contactRoot, `${group}-${String(pageIndex + 1).padStart(2, "0")}.jpg`);
  await sharp({ create: { width: columns * cellWidth, height: rows * cellHeight, channels: 3, background: "#f4f0e8" } })
    .composite(composites)
    .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
    .toFile(output);
  return toPosix(path.relative(root, output));
}

await fs.rm(contactRoot, { recursive: true, force: true });
await fs.mkdir(contactRoot, { recursive: true });
const files = (await walk(publicRoot)).sort((a, b) => a.localeCompare(b));
const images = files.filter((file) => imageExtensions.has(path.extname(file).toLowerCase()));
const inventory = [];
for (const file of images) {
  const relative = toPosix(path.relative(publicRoot, file));
  inventory.push(await metadataFor(file, relative));
}

const reviewSources = inventory.filter((record) => record.reviewSource);
const sheets = [];
for (const group of [...new Set(reviewSources.map((record) => record.reviewGroup))].sort()) {
  const records = reviewSources.filter((record) => record.reviewGroup === group);
  for (let index = 0; index < records.length; index += 20) {
    sheets.push(await renderContactSheet(group, records.slice(index, index + 20), Math.floor(index / 20)));
  }
}

const familySummary = Object.entries(Object.groupBy(inventory, (record) => record.family)).map(([name, records]) => ({
  family: name,
  files: records.length,
  megabytes: Number((records.reduce((sum, record) => sum + record.bytes, 0) / 1024 / 1024).toFixed(2)),
  logicalIds: new Set(records.map((record) => record.logicalId)).size
})).sort((a, b) => a.family.localeCompare(b.family));

const report = {
  generatedAt: new Date().toISOString(),
  publicImageFiles: inventory.length,
  reviewSourcePhotographs: reviewSources.length,
  artDirectedMasters: reviewSources.filter((record) => record.family === "art-directed").length,
  expertiseOriginals: reviewSources.filter((record) => record.family === "expertise").length,
  familySummary,
  contactSheets: sheets,
  records: inventory
};

await fs.writeFile(path.join(auditRoot, "public-media-inventory.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ publicImageFiles: report.publicImageFiles, reviewSourcePhotographs: report.reviewSourcePhotographs, familySummary, contactSheets: sheets }, null, 2));
