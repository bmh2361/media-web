import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const manifest = JSON.parse(await readFile(path.join(root, "content", "portfolio-media.generated.json"), "utf8"));
const active = [
  "wang-linkai-london-concert", "geely-london-brand-launch", "changan-europe-launch-2025",
  "catl-open-day-2025", "yue-yunpeng-london-live", "london-fashion-week-2025",
  "leapmotor-iaa-2023", "byd-bd11-london", "agibot-london-launch",
  "london-automotive-brand-film", "beauty-fashion-brand-content", "european-road-lifestyle"
];
const output = path.join(root, "audit", "case-study-media-presentation");
await mkdir(output, { recursive: true });

const escapeXml = (value) => value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" })[character]);
const markdown = ["# Case Study Source Media Inventory", "", `Generated for ${active.length} active projects.`, ""];

for (const slug of active) {
  const records = manifest.records.filter((record) => record.projectId === slug);
  const columns = Math.min(3, records.length);
  const rows = Math.ceil(records.length / columns);
  const cellWidth = 420;
  const cellHeight = 350;
  const composites = [];
  for (const [index, record] of records.entries()) {
    const left = (index % columns) * cellWidth;
    const top = Math.floor(index / columns) * cellHeight;
    const image = await sharp(path.join(root, "public", record.publicPath.slice(1))).resize({ width: 380, height: 270, fit: "contain", background: "#101010" }).png().toBuffer();
    composites.push({ input: image, left: left + 20, top: top + 18 });
    const label = `<svg width="${cellWidth}" height="62"><rect width="100%" height="100%" fill="#101010"/><text x="20" y="22" fill="#f4f0e7" font-family="Arial" font-size="14">${escapeXml(record.id)}</text><text x="20" y="44" fill="#b9b2a6" font-family="Arial" font-size="12">${record.width} × ${record.height} · ${(record.width / record.height).toFixed(3)}</text></svg>`;
    composites.push({ input: Buffer.from(label), left, top: top + 288 });
  }
  await sharp({ create: { width: columns * cellWidth, height: rows * cellHeight, channels: 3, background: "#101010" } }).composite(composites).png().toFile(path.join(output, `${slug}.png`));
  markdown.push(`## ${slug}`, "", "| File | Native size | Ratio | Orientation | Current alt |", "|---|---:|---:|---|---|");
  for (const record of records) {
    const ratio = record.width / record.height;
    const orientation = ratio > 1.8 ? "panoramic" : ratio > 1.08 ? "landscape" : ratio < 0.92 ? "portrait" : "square";
    markdown.push(`| ${record.sourceFile} | ${record.width}×${record.height} | ${ratio.toFixed(3)} | ${orientation} | ${record.altEn} |`);
  }
  markdown.push("");
}

await writeFile(path.join(output, "source-media-inventory.md"), `${markdown.join("\n")}\n`);
console.log(`Audited ${active.reduce((total, slug) => total + manifest.records.filter((record) => record.projectId === slug).length, 0)} active source records and generated ${active.length} contact sheets.`);
