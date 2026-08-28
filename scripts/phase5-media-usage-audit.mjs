import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const phase4Path = path.join(root, "audit", "phase-4-media", "media-inventory.json");
const portfolioPath = path.join(root, "content", "portfolio-media.generated.json");
const outputRoot = path.join(root, "audit", "phase-5-media");
const sourceRoots = ["app", "components", "content"];

async function walk(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(item)));
    else if (/\.(tsx?|mjs|json)$/.test(entry.name)) files.push(item);
  }
  return files;
}

const inventory = JSON.parse(await fs.readFile(phase4Path, "utf8"));
const portfolio = JSON.parse(await fs.readFile(portfolioPath, "utf8")).records;
const files = (await Promise.all(sourceRoots.map((directory) => walk(path.join(root, directory))))).flat();
const sources = await Promise.all(
  files.map(async (file) => ({
    file: path.relative(root, file).split(path.sep).join("/"),
    text: await fs.readFile(file, "utf8")
  }))
);
const placements = [];

for (const asset of inventory) {
  const publicPath = `/media/${asset.relativePath}`;
  const basename = path.basename(asset.relativePath);
  const matched = sources.filter(
    (source) => source.text.includes(publicPath) || source.text.includes(basename)
  );
  placements.push({
    source: asset.relativePath,
    likelyProject: asset.likelyProject,
    category: asset.directory,
    currentRoutesOrSections: matched.map((item) => item.file),
    numberOfAppearances: matched.length,
    visualQuality: asset.scores.visualQuality,
    evidenceStrength: Number(
      ((asset.scores.commercialRelevance + asset.scores.internationalContext) / 2).toFixed(1)
    ),
    focalPoint: asset.scores.focalClarity,
    cropSafety: asset.scores.websiteCropSafety,
    exactDuplicates: asset.duplicates,
    publicPath
  });
}

const homepageSelectedIds = [
  "changan-europe-launch-2025-04-gallery",
  "catl-open-day-2025-06-gallery",
  "london-automotive-brand-film-03-gallery",
  "byd-bd11-london-07-gallery",
  "changan-europe-launch-2025-01-hero",
  "catl-open-day-2025-05-gallery",
  "leapmotor-iaa-2023-07-gallery",
  "london-automotive-brand-film-06-gallery",
  "byd-bd11-london-02-cover",
  "changan-europe-launch-2025-02-cover"
];
const selectedPaths = new Set(
  portfolio.filter((item) => homepageSelectedIds.includes(item.id)).map((item) => item.publicPath)
);
const selected = placements.filter((asset) => selectedPaths.has(asset.publicPath));
const selectedByHash = new Map();
for (const asset of inventory.filter((item) =>
  selected.some((selectedAsset) => selectedAsset.source === item.relativePath)
)) {
  selectedByHash.set(asset.sha256, [...(selectedByHash.get(asset.sha256) ?? []), asset.relativePath]);
}
const repeatedHomepageBinaries = [...selectedByHash.values()].filter((items) => items.length > 1);

const report = {
  generatedAt: new Date().toISOString(),
  sourceAudit: "audit/phase-4-media/media-inventory.json",
  totalAssetsReAudited: placements.length,
  assetsWithDirectSourceReferences: placements.filter((item) => item.numberOfAppearances > 0).length,
  homepageSelectedAssets: selected.length,
  homepageSelectedIds,
  repeatedHomepageBinaries,
  truthPolicy: {
    A: "Verified project or relationship evidence; public wording approved.",
    B: "Verified participation or delivery evidence; relationship wording remains bounded.",
    C: "Contextual capability evidence only; no named relationship claim.",
    D: "Internal or unverified; excluded from public claims."
  },
  placements
};

await fs.mkdir(outputRoot, { recursive: true });
await fs.writeFile(path.join(outputRoot, "media-usage-ledger.json"), JSON.stringify(report, null, 2));
await fs.writeFile(
  path.join(outputRoot, "summary.json"),
  JSON.stringify(
    {
      generatedAt: report.generatedAt,
      totalAssetsReAudited: report.totalAssetsReAudited,
      assetsWithDirectSourceReferences: report.assetsWithDirectSourceReferences,
      homepageSelectedAssets: report.homepageSelectedAssets,
      repeatedHomepageBinaries: report.repeatedHomepageBinaries.length
    },
    null,
    2
  )
);
console.log(
  `Phase 5 media usage audit: ${placements.length} assets, ${selected.length} homepage selections, ${repeatedHomepageBinaries.length} repeated binaries.`
);
