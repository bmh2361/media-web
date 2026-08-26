import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const packageRoot = path.resolve(projectRoot, "..", ".phase13-source", "venus_portfolio_codex_ready");
const csvPath = path.join(packageRoot, "04_manifests", "portfolio-assets.csv");
const outputRoot = path.join(projectRoot, "public", "media", "expertise");

const placement = {
  "technology-ai-product": ["technology-ai-research", "ai-products"],
  "founder-expert-interviews": ["technology-ai-research", "expert-content"],
  "events-exhibitions-roadshows": ["entertainment-culture", "live-events"],
  "creator-commercial-content": ["entertainment-culture", "creator-commercial"],
  "artist-live-performance": ["entertainment-culture", "live-performance"],
  "artist-creator-interviews": ["entertainment-culture", "interviews"]
};

const usage = {
  "vbm-001": ["technology-ai-research", "create-in-the-uk"],
  "vbm-002": ["technology-ai-research", "homepage-expertise"],
  "vbm-003": ["technology-ai-research", "launch-in-the-uk"],
  "vbm-004": ["technology-ai-research", "launch-in-the-uk"],
  "vbm-005": ["technology-ai-research"],
  "vbm-006": ["entertainment-culture", "launch-in-the-uk"],
  "vbm-007": ["entertainment-culture", "launch-in-the-uk"],
  "vbm-008": ["entertainment-culture"],
  "vbm-009": ["entertainment-culture"],
  "vbm-010": ["technology-ai-research", "launch-in-the-uk"],
  "vbm-011": ["entertainment-culture", "create-in-the-uk"],
  "vbm-012": [],
  "vbm-013": [],
  "vbm-014": ["entertainment-culture", "create-in-the-uk"],
  "vbm-015": [],
  "vbm-016": [],
  "vbm-017": [],
  "vbm-018": [],
  "vbm-019": [],
  "vbm-020": ["entertainment-culture"],
  "vbm-021": ["homepage-expertise"],
  "vbm-022": [],
  "vbm-023": ["entertainment-culture", "create-in-the-uk", "enter-the-uk"],
  "vbm-024": ["entertainment-culture", "create-in-the-uk"]
};

const alt = {
  "vbm-001": [
    "A humanoid service robot displayed at a technology exhibition.",
    "科技展会现场展示的服务型人形机器人。"
  ],
  "vbm-002": [
    "Robotics products arranged in a technology exhibition display.",
    "科技展会中的机器人产品展示。"
  ],
  "vbm-003": ["A humanoid robot demonstrated at an industry exhibition.", "行业展会现场演示的人形机器人。"],
  "vbm-004": [
    "An industry speaker presenting on a large event stage.",
    "行业演讲者在大型活动舞台上进行分享。"
  ],
  "vbm-005": [
    "A design industry presentation in front of a seated audience.",
    "面向现场观众的设计行业演讲。"
  ],
  "vbm-006": ["A live performer photographed under stage lighting.", "舞台灯光下拍摄的现场表演者。"],
  "vbm-007": ["A live music audience facing a blue-lit stage.", "面向蓝色灯光舞台的现场音乐观众。"],
  "vbm-008": ["A cultural programme presented on a theatre stage.", "剧场舞台上进行的文化节目展示。"],
  "vbm-009": [
    "Performers and attendees gathered for a live event photograph.",
    "表演者与观众在现场活动中合影。"
  ],
  "vbm-010": ["A large industry event stage viewed from the audience.", "从观众席望向大型行业活动舞台。"],
  "vbm-011": [
    "A creator in striped apparel photographed for editorial content.",
    "穿条纹服装的创作者编辑式人像。"
  ],
  "vbm-012": ["A creator holding a footwear product in a studio portrait.", "创作者手持鞋履产品的棚拍人像。"],
  "vbm-013": ["A creator photographed beside a car on a city street.", "城市街道上在汽车旁拍摄的创作者。"],
  "vbm-014": [
    "A beauty device demonstrated in product-led social content.",
    "美妆仪器产品导向的社交内容画面。"
  ],
  "vbm-015": ["A skincare product presented in a bright beauty portrait.", "明亮美妆人像中展示的护肤产品。"],
  "vbm-016": [
    "A creator presenting beauty products in a lifestyle setting.",
    "生活方式场景中展示美妆产品的创作者。"
  ],
  "vbm-017": ["A makeup-focused editorial beauty portrait.", "突出妆容细节的编辑式美妆人像。"],
  "vbm-018": [
    "A fashion retail display photographed as commercial content.",
    "作为商业内容拍摄的时尚零售陈列。"
  ],
  "vbm-019": ["A cosmetics product held in an editorial beauty portrait.", "编辑式美妆人像中手持的化妆品。"],
  "vbm-020": [
    "An artist photographed in a dramatic live-performance setting.",
    "在具有戏剧感的现场表演环境中拍摄的艺人。"
  ],
  "vbm-021": ["An artist photographed outdoors in an editorial composition.", "户外编辑式构图中的艺人。"],
  "vbm-022": ["An artist photographed in a fashion-led editorial setting.", "时尚导向编辑场景中拍摄的艺人。"],
  "vbm-023": ["A cast photographed during a UK location production.", "英国外景制作期间拍摄的演员群像。"],
  "vbm-024": ["Two speakers in conversation during a live panel session.", "现场对谈环节中的两位演讲者。"]
};

const positions = {
  "vbm-003": ["50% 42%", "50% 38%"],
  "vbm-006": ["50% 30%", "50% 28%"],
  "vbm-011": ["50% 28%", "50% 25%"],
  "vbm-020": ["50% 24%", "50% 22%"],
  "vbm-021": ["50% 32%", "50% 28%"],
  "vbm-023": ["50% 45%", "48% 42%"],
  "vbm-024": ["50% 46%", "50% 45%"]
};

function parseCsv(text) {
  const rows = [];
  let row = [],
    value = "",
    quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"' && quoted && text[i + 1] === '"') {
      value += '"';
      i += 1;
    } else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      row.push(value);
      value = "";
      if (row.some(Boolean)) rows.push(row);
      row = [];
    } else value += char;
  }
  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }
  const [rawHeaders, ...data] = rows;
  const headers = rawHeaders.map((header) => header.replace(/^\uFEFF/, ""));
  return data.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]))
  );
}

const source = await readFile(csvPath, "utf8");
const assets = parseCsv(source);
if (assets.length !== 24) throw new Error(`Expected 24 assets, found ${assets.length}`);

const records = [];
for (const asset of assets) {
  const sourcePath = path.join(packageRoot, ...asset.web_ready_path.split("/"));
  const name = path.basename(asset.web_ready_path, path.extname(asset.web_ready_path));
  const [section, group] = placement[asset.category_slug];
  const destination = path.join(outputRoot, section, group);
  await mkdir(destination, { recursive: true });
  const paths = {
    webp: path.join(destination, `${name}.webp`),
    avif: path.join(destination, `${name}.avif`),
    jpg: path.join(destination, `${name}.jpg`),
    mobileWebp: path.join(destination, `${name}-mobile.webp`),
    mobileAvif: path.join(destination, `${name}-mobile.avif`),
    thumbnail: path.join(destination, `${name}-thumb.webp`)
  };
  const pipeline = sharp(sourcePath).rotate().withMetadata({});
  await pipeline
    .clone()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(paths.webp);
  await pipeline
    .clone()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .avif({ quality: 55 })
    .toFile(paths.avif);
  await pipeline
    .clone()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(paths.jpg);
  await pipeline
    .clone()
    .resize({ width: 900, height: 1200, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(paths.mobileWebp);
  await pipeline
    .clone()
    .resize({ width: 900, height: 1200, fit: "inside", withoutEnlargement: true })
    .avif({ quality: 52 })
    .toFile(paths.mobileAvif);
  await pipeline
    .clone()
    .resize({ width: 480, height: 480, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(paths.thumbnail);
  const metadata = await sharp(paths.webp).metadata();
  const publicPath = (filePath) =>
    `/${path.relative(path.join(projectRoot, "public"), filePath).replaceAll("\\", "/")}`;
  const recommendedPages = asset.recommended_pages.split(" | ").filter(Boolean);
  const [desktopPosition, mobilePosition] = positions[asset.asset_id] ?? ["50% 50%", "50% 50%"];
  records.push({
    id: asset.asset_id,
    category: asset.category_slug,
    categoryEn: asset.category_en,
    categoryZh: asset.category_zh,
    sourcePath: asset.source_path,
    webReadyPath: asset.web_ready_path,
    originalFilename: asset.original_filename,
    duplicateSourcePaths: asset.duplicate_source_paths ? [asset.duplicate_source_paths] : [],
    width: Number(asset.width),
    height: Number(asset.height),
    outputWidth: metadata.width,
    outputHeight: metadata.height,
    orientation: asset.orientation,
    aspectRatio: asset.aspect_ratio,
    heroCandidate: asset.hero_candidate === "True",
    homepageCandidate: asset.homepage_candidate === "True",
    recommendedPages,
    actualPages: usage[asset.asset_id],
    usedPublicly: usage[asset.asset_id].length > 0,
    publicPath: publicPath(paths.webp),
    avifPath: publicPath(paths.avif),
    jpegPath: publicPath(paths.jpg),
    mobilePath: publicPath(paths.mobileWebp),
    mobileAvifPath: publicPath(paths.mobileAvif),
    thumbnailPath: publicPath(paths.thumbnail),
    objectPositionDesktop: desktopPosition,
    objectPositionMobile: mobilePosition,
    altEn: alt[asset.asset_id][0],
    altZh: alt[asset.asset_id][1],
    contentRole: "capability-media",
    caseReady: false,
    capabilityReady: true,
    websiteUseApproved: true,
    mediaRightsApproved: true,
    copyrightApproved: true,
    creditRequired: false,
    public: true,
    sourceBytes: Number(asset.source_size_bytes),
    webReadyBytes: Number(asset.web_size_bytes),
    webpBytes: (await stat(paths.webp)).size,
    avifBytes: (await stat(paths.avif)).size,
    jpegBytes: (await stat(paths.jpg)).size,
    mobileBytes: (await stat(paths.mobileWebp)).size,
    mobileAvifBytes: (await stat(paths.mobileAvif)).size,
    thumbnailBytes: (await stat(paths.thumbnail)).size
  });
}

await writeFile(
  path.join(projectRoot, "content", "capability-media.generated.json"),
  `${JSON.stringify({ packageVersion: "1.0", sourceRecordCount: 24, duplicateBinaryAssetsRemoved: 1, records }, null, 2)}\n`
);
console.log(
  `Imported ${records.length} capability assets; ${records.filter((record) => record.usedPublicly).length} selected for public pages.`
);
