import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const mediaRoot = path.join(root, "public", "media");
const outputRoot = path.join(root, "audit", "phase-4-media");
const sheetRoot = path.join(outputRoot, "contact-sheets");
const supported = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);

async function walk(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(item)));
    else if (supported.has(path.extname(entry.name).toLowerCase())) files.push(item);
  }
  return files;
}

const clamp = (value) => Math.max(0, Math.min(5, Number(value.toFixed(1))));
const posix = (value) => value.split(path.sep).join("/");
const xml = (value) => value.replace(/[<>&'"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char]);
const normalizedVariant = (relative) => relative.toLowerCase().replace(/\.(avif|webp|jpe?g|png|gif|svg)$/i, "").replace(/-(desktop|tablet|mobile|thumb|thumbnail|hero|cover|gallery|detail|original|\d+x\d+)$/i, "");

await fs.mkdir(sheetRoot, { recursive: true });
const files = await walk(mediaRoot);
const sourceRoots = ["app", "components", "content", "lib"];
const sourceFiles = (await Promise.all(sourceRoots.map(async (dir) => {
  try { return await walkText(path.join(root, dir)); } catch { return []; }
}))).flat();
async function walkText(directory) {
  const output = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await walkText(item)));
    else if (/\.(tsx?|mjs|json|md)$/.test(entry.name)) output.push(await fs.readFile(item, "utf8"));
  }
  return output;
}
const sourceText = sourceFiles.join("\n");
const records = [];
for (const file of files) {
  const input = await fs.readFile(file);
  const relative = posix(path.relative(mediaRoot, file));
  let metadata = {};
  let stats;
  try {
    const image = sharp(input, { animated: false, failOn: "none" }).rotate();
    metadata = await image.metadata();
    stats = await image.clone().resize(64, 64, { fit: "inside" }).stats();
  } catch {}
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  const orientation = width > height * 1.08 ? "landscape" : height > width * 1.08 ? "portrait" : "square";
  const luminance = stats ? stats.channels.slice(0, 3).reduce((sum, channel) => sum + channel.mean, 0) / 3 : 128;
  const contrast = stats ? stats.channels.slice(0, 3).reduce((sum, channel) => sum + channel.stdev, 0) / 3 : 0;
  const semantic = relative.toLowerCase();
  const originalLike = /(^|\/)(portfolio|expertise)\//.test(semantic) && !/(mobile|thumbnail|art-directed)/.test(semantic);
  const commercial = clamp(1.8 + (/portfolio|expertise|event|launch|interview|technology|talent|creator/.test(semantic) ? 1.6 : 0) + (originalLike ? 0.8 : 0));
  const visual = clamp(1.5 + (width >= 1200 ? 1.6 : width >= 900 ? 1.1 : 0.4) + (contrast >= 30 ? 1.1 : contrast >= 18 ? 0.6 : 0.2));
  const premium = clamp((visual + commercial) / 2 + (/art-directed|portfolio/.test(semantic) ? 0.5 : 0));
  const international = clamp(1.2 + (/london|uk|europe|munich|iaa|changan|byd|catl|leapmotor/.test(semantic) ? 2.7 : /event|exhibition/.test(semantic) ? 1.4 : 0));
  const focal = clamp(2.3 + (/portrait|interview|creator|artist|robot|vehicle|automotive/.test(semantic) ? 1.2 : 0) + (width >= 900 ? 0.6 : 0));
  const crop = clamp(2.2 + (orientation !== "square" ? 0.8 : 0.4) + (width >= 900 ? 0.8 : 0) - (/mobile/.test(semantic) ? 0.2 : 0));
  const colour = clamp(3.1 + (luminance > 45 && luminance < 215 ? 0.8 : 0.2) + (contrast > 18 ? 0.5 : 0));
  records.push({
    filename: path.basename(file), relativePath: relative, directory: posix(path.dirname(relative)), width, height,
    aspectRatio: height ? Number((width / height).toFixed(4)) : null, orientation, bytes: input.byteLength,
    format: metadata.format ?? path.extname(file).slice(1), sha256: crypto.createHash("sha256").update(input).digest("hex"),
    variantGroup: normalizedVariant(relative), likelyProject: relative.split("/").slice(0, 4).join("/"),
    currentWebsiteUsage: sourceText.includes(`/media/${relative}`), averageLuminance: Number(luminance.toFixed(1)),
    scores: { commercialRelevance: commercial, visualQuality: visual, premiumFeel: premium, internationalContext: international, focalClarity: focal, compositionFlexibility: crop, websiteCropSafety: crop, colourCompatibility: colour },
    totalScore: Number((commercial + visual + premium + international + focal + crop + crop + colour).toFixed(1))
  });
}

const hashes = new Map();
for (const record of records) hashes.set(record.sha256, [...(hashes.get(record.sha256) ?? []), record.relativePath]);
for (const record of records) record.duplicates = hashes.get(record.sha256).filter((item) => item !== record.relativePath);

async function sheet(name, items) {
  const cellW = 240, cellH = 185, columns = 5;
  const rows = Math.ceil(items.length / columns);
  if (!rows) return;
  const canvas = sharp({ create: { width: cellW * columns, height: cellH * rows, channels: 3, background: "#111214" } });
  const composites = [];
  for (let index = 0; index < items.length; index++) {
    const record = items[index];
    const left = (index % columns) * cellW;
    const top = Math.floor(index / columns) * cellH;
    try {
      const thumb = await sharp(path.join(mediaRoot, record.relativePath), { animated: false, failOn: "none" }).rotate().resize(cellW - 12, 142, { fit: "contain", background: "#25272a" }).jpeg({ quality: 72 }).toBuffer();
      composites.push({ input: thumb, left: left + 6, top: top + 6 });
    } catch {}
    const label = `<svg width="${cellW}" height="37"><rect width="100%" height="100%" fill="#111214"/><text x="7" y="14" font-family="Arial" font-size="10" fill="#f2f0e9">${xml(record.filename.slice(0, 34))}</text><text x="7" y="29" font-family="Arial" font-size="9" fill="#b99a69">${record.width}×${record.height} · ${record.totalScore}/40</text></svg>`;
    composites.push({ input: Buffer.from(label), left, top: top + 148 });
  }
  await canvas.composite(composites).jpeg({ quality: 82 }).toFile(path.join(sheetRoot, `${name}.jpg`));
}

const groups = new Map();
for (const record of records) groups.set(record.directory, [...(groups.get(record.directory) ?? []), record]);
for (const [directory, items] of groups) await sheet(`folder--${directory.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "root"}`, items);
for (const orientation of ["landscape", "portrait", "square"]) {
  const oriented = records.filter((record) => record.orientation === orientation);
  for (let index = 0; index < oriented.length; index += 100) await sheet(`orientation--${orientation}--${String(index / 100 + 1).padStart(2, "0")}`, oriented.slice(index, index + 100));
}
await sheet("homepage-candidates", records.filter((record) => record.totalScore >= 30).sort((a, b) => b.totalScore - a.totalScore).slice(0, 100));

const summary = {
  generatedAt: new Date().toISOString(), root: posix(mediaRoot), totalAssets: records.length,
  formats: Object.fromEntries([...new Set(records.map((record) => record.format))].sort().map((format) => [format, records.filter((record) => record.format === format).length])),
  orientations: Object.fromEntries(["landscape", "portrait", "square"].map((value) => [value, records.filter((record) => record.orientation === value).length])),
  exactDuplicateFiles: records.filter((record) => record.duplicates.length).length,
  variantGroups: new Set(records.map((record) => record.variantGroup)).size,
  currentlyReferenced: records.filter((record) => record.currentWebsiteUsage).length,
  contactSheets: (await fs.readdir(sheetRoot)).length,
  topHomepageCandidates: records.sort((a, b) => b.totalScore - a.totalScore).slice(0, 40).map(({ relativePath, totalScore, scores }) => ({ relativePath, totalScore, scores }))
};
await fs.writeFile(path.join(outputRoot, "media-inventory.json"), JSON.stringify(records, null, 2));
await fs.writeFile(path.join(outputRoot, "summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
