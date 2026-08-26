import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "content", "portfolio-media.generated.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const escapeCell = (value) =>
  String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
const projectCounts = Object.entries(
  manifest.records.reduce((counts, record) => {
    counts[record.projectId] = (counts[record.projectId] ?? 0) + 1;
    return counts;
  }, {})
).sort(([left], [right]) => left.localeCompare(right));

const placementRows = manifest.records
  .map((record, index) => {
    const pages = record.allowedPages.join("<br>");
    const files = [record.publicPath, record.avifPath, record.mobilePath, record.thumbnailPath].join("<br>");
    const weights = [
      `WebP ${kb(record.webpBytes)}`,
      `AVIF ${kb(record.avifBytes)}`,
      `mobile ${kb(record.mobileBytes)}`,
      `thumb ${kb(record.thumbnailBytes)}`
    ].join("<br>");
    return `| ${index + 1} | ${escapeCell(record.sourceFile)} | ${escapeCell(files)} | ${escapeCell(record.projectId)} | ${escapeCell(pages)} | ${record.category} | ${record.aspectRatio} | ${escapeCell(record.objectPositionDesktop)} | ${escapeCell(record.objectPositionMobile)} | ${escapeCell(record.altEn)}<br>${escapeCell(record.altZh)} | ${weights} |`;
  })
  .join("\n");

const placement = `# Portfolio image placement map

Generated from \`content/portfolio-media.generated.json\` on ${manifest.generatedAt}. The manifest is the operational source of truth; this document is the human review view.

| # | Original file | Final files | Project | Assigned pages | Module | Source ratio | Desktop crop | Mobile crop | Alt text (EN / ZH) | Output weight |
|---:|---|---|---|---|---|---|---|---|---|---|
${placementRows}
`;

const importReport = `# Portfolio import report

## Result

- Scanned image records: **${manifest.sourceRecordCount}**.
- Selected source images: **${manifest.selectedAssetCount}**.
- Generated responsive files: **${manifest.records.length * 4}** (WebP, AVIF, mobile WebP and thumbnail WebP).
- Internal-only records excluded: **${manifest.excludedInternalCount}**.
- Other publishable candidates not imported: **${manifest.sourceRecordCount - manifest.selectedAssetCount - manifest.excludedInternalCount}**.
- Selected-source weight: **${kb(manifest.originalBytes)}**.
- Total generated responsive weight: **${kb(manifest.generatedBytes)}** across four variants per source.
- Rights state for every selected record: website use, media rights and copyright approved; no credit required; public.

## Selection by project

| Project id | Imported source images |
|---|---:|
${projectCounts.map(([project, count]) => `| ${project} | ${count} |`).join("\n")}

## Why images were not imported

The 54 records under \`04_internal_only_do_not_publish\` were excluded categorically and were never copied into \`public\`. The remaining ${manifest.sourceRecordCount - manifest.selectedAssetCount - manifest.excludedInternalCount} candidates were held outside the public build because they were near-duplicates, weaker variations of a selected frame, less useful for B2B proof, compositionally unsuitable for the available responsive crops, or unnecessary for the page assignment. No source files were modified.

## Processing

Sharp applies EXIF orientation and writes fresh derivative files, removing source EXIF/GPS/device metadata. Full WebP and AVIF variants are bounded at 1600 px; mobile WebP is bounded at 900 px; thumbnails are bounded at 640 px. Source aspect ratios are preserved in the files and safe display crops are controlled by the manifest's desktop/mobile object position.

No runtime path points to the source drive. All website files live under \`public/media/portfolio\`.
`;

await Promise.all([
  writeFile(path.join(root, "docs", "portfolio-image-placement-map.md"), placement, "utf8"),
  writeFile(path.join(root, "docs", "portfolio-import-report.md"), importReport, "utf8")
]);

console.log(`Generated portfolio docs for ${manifest.records.length} selected assets.`);
