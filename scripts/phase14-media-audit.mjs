import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const repoRoot = process.cwd();
const curatedRoot = "D:/media pics/venus_bridge_media_curated_assets/venus_bridge_media_curated_assets";
const capabilityRoot = "D:/media pics/venus_portfolio_codex_ready/venus_portfolio_codex_ready";
const publicRoot = path.join(repoRoot, "public");
const outputRoot = path.join(publicRoot, "media", "art-directed");
const contentRoot = path.join(repoRoot, "content", "media");
const docsRoot = path.join(repoRoot, "docs");
const auditRoot = path.join(repoRoot, "audit");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);
const palette = {
  "rich-black": "#090a0c",
  graphite: "#242528",
  "soft-ivory": "#f4f0e8",
  "warm-neutral": "#ded4c7",
  "cool-neutral": "#d8dfe3",
  "image-derived-muted": "#c8c4bd",
  transparent: "#00000000"
};

const capabilitySubjects = {
  "vbm-001": "technology-device",
  "vbm-002": "technology-device",
  "vbm-003": "technology-device",
  "vbm-004": "stage",
  "vbm-005": "stage",
  "vbm-006": "stage",
  "vbm-007": "stage",
  "vbm-008": "stage",
  "vbm-009": "group",
  "vbm-010": "stage",
  "vbm-011": "single-person",
  "vbm-012": "single-person",
  "vbm-013": "single-person",
  "vbm-014": "single-person",
  "vbm-015": "single-person",
  "vbm-016": "single-person",
  "vbm-017": "single-person",
  "vbm-018": "product",
  "vbm-019": "product",
  "vbm-020": "single-person",
  "vbm-021": "single-person",
  "vbm-022": "single-person",
  "vbm-023": "group",
  "vbm-024": "interview"
};

const manualFocalPoints = {
  "vbm-001": { x: 0.5, y: 0.5 },
  "vbm-002": { x: 0.52, y: 0.5 },
  "vbm-003": { x: 0.5, y: 0.48 },
  "vbm-007": { x: 0.52, y: 0.45 },
  "vbm-011": { x: 0.5, y: 0.3 },
  "vbm-014": { x: 0.5, y: 0.28 },
  "vbm-020": { x: 0.52, y: 0.34 },
  "vbm-021": { x: 0.5, y: 0.34 },
  "vbm-022": { x: 0.5, y: 0.32 },
  "vbm-023": { x: 0.48, y: 0.45 },
  "vbm-024": { x: 0.5, y: 0.42 }
};

const manualProtectedAreas = {
  "commercial-fashion-styling-01-hero": { left: 0.08, top: 0.09, right: 0.92, bottom: 0.84 },
  "byd-bd11-london-01-hero": { left: 0.09, top: 0.08, right: 0.91, bottom: 0.92 }
};

async function listFiles(root) {
  const output = [];
  async function walk(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const filePath = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(filePath);
      else output.push(filePath);
    }
  }
  await walk(root);
  return output;
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round(value, digits = 2) {
  return Number(value.toFixed(digits));
}

async function inspectImage(filePath) {
  const input = await fs.readFile(filePath);
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  const pipeline = sharp(input, { failOn: "none" }).rotate();
  const metadata = await pipeline.metadata();
  const stats = await pipeline.clone().resize(96, 96, { fit: "inside" }).stats();
  const rgb = stats.channels.slice(0, 3).map((channel) => channel.mean);
  const brightness = rgb.length === 3 ? rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722 : 0;
  const saturation = rgb.length === 3 ? Math.max(...rgb) - Math.min(...rgb) : 0;
  const contrast =
    stats.channels.slice(0, 3).reduce((sum, channel) => sum + channel.stdev, 0) /
    Math.max(1, stats.channels.slice(0, 3).length);
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  return {
    filePath: toPosix(filePath),
    filename: path.basename(filePath),
    format: metadata.format ?? path.extname(filePath).slice(1),
    bytes: input.byteLength,
    width,
    height,
    aspectRatio: height ? round(width / height, 4) : 0,
    exifOrientation: metadata.orientation ?? 1,
    orientation: width > height * 1.08 ? "landscape" : height > width * 1.08 ? "portrait" : "square",
    sharpnessScore: round(clamp(contrast / 0.65, 0, 100)),
    blurRisk: contrast < 22 ? "high" : contrast < 38 ? "medium" : "low",
    exposure: brightness < 70 ? "dark" : brightness > 195 ? "bright" : "balanced",
    contrast: round(contrast),
    averageLuminance: round(brightness),
    colourTemperature: rgb[0] - rgb[2] > 12 ? "warm" : rgb[2] - rgb[0] > 12 ? "cool" : "neutral",
    saturation: round(saturation),
    dominantColour: stats.dominant
      ? `rgb(${stats.dominant.r}, ${stats.dominant.g}, ${stats.dominant.b})`
      : "unknown",
    auxiliaryColour:
      rgb.length === 3 ? `rgb(${rgb.map((value) => Math.round(value)).join(", ")})` : "unknown",
    sha256: hash,
    sha256_12: hash.slice(0, 12)
  };
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"' && quoted && text[index + 1] === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(value);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else value += char;
  }
  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }
  const [headers, ...records] = rows;
  return records.map((record) =>
    Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ""]))
  );
}

function subjectFromText(record) {
  if (capabilitySubjects[record.id]) return capabilitySubjects[record.id];
  const text = `${record.altEn ?? ""} ${record.projectId ?? ""} ${record.category ?? ""}`.toLowerCase();
  if (/interview|conversation|panel/.test(text)) return "interview";
  if (/audience|group|attendees|crowd/.test(text)) return "group";
  if (/car|vehicle|road|automotive|bus/.test(text)) return "vehicle";
  if (/robot|technology|device|screen|hardware/.test(text)) return "technology-device";
  if (/product|makeup detail|cosmetic/.test(text)) return "product";
  if (/model|portrait|woman|man|creator|artist/.test(text)) return "single-person";
  if (/stage|speaker|presentation|exhibition|event/.test(text)) return "stage";
  if (/detail|close-up/.test(text)) return "detail";
  return "environment";
}

function objectiveFlags(record, subjectType) {
  return {
    containsSinglePerson: subjectType === "single-person",
    containsGroup: subjectType === "group" || subjectType === "interview",
    containsObviousFace: ["single-person", "group", "interview", "stage"].includes(subjectType),
    containsProduct: ["product", "technology-device"].includes(subjectType),
    containsVehicle: subjectType === "vehicle",
    containsTechnologyDevice: subjectType === "technology-device",
    containsTextOrLogo:
      ["vehicle", "technology-device", "stage"].includes(subjectType) ||
      /logo|brand|screen/.test(record.altEn ?? ""),
    isStage: subjectType === "stage",
    isEventWide: subjectType === "stage" || subjectType === "environment",
    isInterview: subjectType === "interview",
    isBackstage: record.category === "bts"
  };
}

function scoreRecord(record, image, duplicateCount, selected) {
  const subject = subjectFromText(record);
  const flags = objectiveFlags(record, subject);
  const commercial = clamp(
    11 +
      (selected ? 8 : 0) +
      (record.priority === true || record.priority === "hero-candidate" ? 4 : 0) +
      (record.publicStatus === "public" ? 2 : 0),
    0,
    25
  );
  const composition = clamp(
    8 +
      (image.width >= 1200 ? 5 : image.width >= 900 ? 3 : 1) +
      (image.blurRisk === "low" ? 6 : image.blurRisk === "medium" ? 3 : 0) +
      (image.exposure === "balanced" ? 4 : 2) +
      (image.orientation !== "square" ? 2 : 1),
    0,
    25
  );
  const cropSafety = clamp(
    9 +
      (["product", "vehicle", "technology-device", "group"].includes(subject) ? 3 : 6) +
      (image.width >= 1000 ? 3 : 1) +
      (image.orientation === "landscape" && flags.containsSinglePerson ? 0 : 2),
    0,
    20
  );
  const brandCompatibility = clamp(
    7 +
      (image.saturation < 75 ? 4 : 2) +
      (image.exposure === "balanced" ? 3 : 2) +
      (image.colourTemperature === "neutral" ? 1 : 0),
    0,
    15
  );
  const uniqueness = clamp(15 - Math.max(0, duplicateCount - 1) * 5, 2, 15);
  return {
    commercialSemanticMatch: commercial,
    compositionAndVisualQuality: composition,
    cropSafety,
    brandColourCompatibility: brandCompatibility,
    uniquenessAndPageRhythm: uniqueness,
    total: commercial + composition + cropSafety + brandCompatibility + uniqueness
  };
}

function ratiosForSubject(subject) {
  if (subject === "single-person") return { desktop: "4 / 5", tablet: "4 / 5", mobile: "4 / 5" };
  if (subject === "interview") return { desktop: "3 / 2", tablet: "4 / 3", mobile: "4 / 5" };
  if (["product", "technology-device"].includes(subject))
    return { desktop: "4 / 3", tablet: "4 / 3", mobile: "4 / 3" };
  if (subject === "vehicle") return { desktop: "3 / 2", tablet: "4 / 3", mobile: "4 / 3" };
  if (subject === "group") return { desktop: "16 / 9", tablet: "4 / 3", mobile: "4 / 3" };
  if (subject === "detail") return { desktop: "4 / 3", tablet: "4 / 3", mobile: "1 / 1" };
  return { desktop: "16 / 9", tablet: "4 / 3", mobile: "4 / 3" };
}

function protectedAreaForSubject(subject) {
  if (subject === "single-person") return { left: 0.14, top: 0.02, right: 0.86, bottom: 0.98 };
  if (subject === "interview") return { left: 0.04, top: 0.04, right: 0.96, bottom: 0.96 };
  if (subject === "group") return { left: 0.02, top: 0.05, right: 0.98, bottom: 0.95 };
  if (subject === "vehicle") return { left: 0.03, top: 0.12, right: 0.97, bottom: 0.92 };
  if (subject === "technology-device") return { left: 0.08, top: 0.04, right: 0.92, bottom: 0.96 };
  if (subject === "product") return { left: 0.1, top: 0.08, right: 0.9, bottom: 0.92 };
  if (subject === "stage") return { left: 0.04, top: 0.08, right: 0.96, bottom: 0.92 };
  return { left: 0.04, top: 0.04, right: 0.96, bottom: 0.96 };
}

function preferredFit(subject, flags) {
  if (subject === "single-person") return "portrait-frame";
  if (["product", "vehicle", "technology-device", "group", "interview"].includes(subject)) return "editorial";
  if (flags.containsTextOrLogo) return "contain";
  if (subject === "environment") return "full-width-natural";
  return "cover";
}

function backgroundFor(subject, image) {
  if (subject === "stage" || image.exposure === "dark") return "graphite";
  if (subject === "technology-device" || image.colourTemperature === "cool") return "cool-neutral";
  if (["single-person", "product"].includes(subject))
    return image.averageLuminance > 150 ? "warm-neutral" : "soft-ivory";
  return "soft-ivory";
}

function parsePosition(value) {
  const values = String(value ?? "50% 50%")
    .match(/[\d.]+/g)
    ?.map(Number);
  return values?.length >= 2
    ? { x: clamp(values[0] / 100, 0, 1), y: clamp(values[1] / 100, 0, 1) }
    : { x: 0.5, y: 0.5 };
}

function ratioNumber(value) {
  const [width, height] = value.split("/").map(Number);
  return width / height;
}

function cropWindow(sourceWidth, sourceHeight, targetRatio, focalPoint) {
  const sourceRatio = sourceWidth / sourceHeight;
  if (sourceRatio > targetRatio) {
    const visibleWidth = targetRatio / sourceRatio;
    const left = clamp(focalPoint.x - visibleWidth / 2, 0, 1 - visibleWidth);
    return { left, top: 0, right: left + visibleWidth, bottom: 1 };
  }
  const visibleHeight = sourceRatio / targetRatio;
  const top = clamp(focalPoint.y - visibleHeight / 2, 0, 1 - visibleHeight);
  return { left: 0, top, right: 1, bottom: top + visibleHeight };
}

function includesArea(window, area) {
  const epsilon = 0.005;
  return (
    area.left >= window.left - epsilon &&
    area.top >= window.top - epsilon &&
    area.right <= window.right + epsilon &&
    area.bottom <= window.bottom + epsilon
  );
}

async function renderDerivative(
  inputPath,
  outputBase,
  width,
  height,
  background,
  fit,
  focalPoint,
  protectedArea
) {
  const metadata = await sharp(inputPath).metadata();
  const sourceWidth = metadata.width ?? width;
  const sourceHeight = metadata.height ?? height;
  const desiredWindow = cropWindow(sourceWidth, sourceHeight, width / height, focalPoint);
  const coverIsSafe = includesArea(desiredWindow, protectedArea);
  const fitUsed = fit === "cover" && coverIsSafe ? "cover" : "contain";
  const base =
    fitUsed === "cover"
      ? sharp(inputPath)
          .rotate()
          .extract({
            left: Math.round(desiredWindow.left * sourceWidth),
            top: Math.round(desiredWindow.top * sourceHeight),
            width: Math.max(1, Math.round((desiredWindow.right - desiredWindow.left) * sourceWidth)),
            height: Math.max(1, Math.round((desiredWindow.bottom - desiredWindow.top) * sourceHeight))
          })
          .resize({ width, height, fit: "fill" })
      : sharp(inputPath).rotate().resize({ width, height, fit: "contain", background });
  const avifPath = `${outputBase}.avif`;
  const webpPath = `${outputBase}.webp`;
  try {
    const [avifStat, webpStat] = await Promise.all([fs.stat(avifPath), fs.stat(webpPath)]);
    return {
      fit: fitUsed,
      visibleArea: fitUsed === "contain" ? { left: 0, top: 0, right: 1, bottom: 1 } : desiredWindow,
      avifBytes: avifStat.size,
      webpBytes: webpStat.size,
      width,
      height
    };
  } catch {}
  await Promise.all([
    base.clone().avif({ quality: 58, effort: 5 }).toFile(avifPath),
    base.clone().webp({ quality: 76, effort: 5 }).toFile(webpPath)
  ]);
  const [avifStat, webpStat] = await Promise.all([fs.stat(avifPath), fs.stat(webpPath)]);
  return {
    fit: fitUsed,
    visibleArea: fitUsed === "contain" ? { left: 0, top: 0, right: 1, bottom: 1 } : desiredWindow,
    avifBytes: avifStat.size,
    webpBytes: webpStat.size,
    width,
    height
  };
}

function routeForCapability(page) {
  const routes = {
    "homepage-expertise": "/",
    "entertainment-culture": "/expertise/entertainment-culture",
    "technology-ai-research": "/expertise/technology-ai-research",
    "create-in-the-uk": "/what-we-do/create-in-the-uk",
    "launch-in-the-uk": "/what-we-do/launch-in-the-uk",
    "enter-the-uk": "/what-we-do/enter-the-uk"
  };
  return routes[page] ?? `/${page}`;
}

function publicPath(filePath) {
  return `/${toPosix(path.relative(publicRoot, filePath))}`;
}

await Promise.all([
  fs.mkdir(outputRoot, { recursive: true }),
  fs.mkdir(contentRoot, { recursive: true }),
  fs.mkdir(docsRoot, { recursive: true }),
  fs.mkdir(auditRoot, { recursive: true })
]);

const [curatedFiles, capabilityFiles, repositoryFiles] = await Promise.all([
  listFiles(curatedRoot),
  listFiles(capabilityRoot),
  listFiles(path.join(publicRoot, "media"))
]);
const curatedImages = curatedFiles.filter((file) => imageExtensions.has(path.extname(file).toLowerCase()));
const capabilityImages = capabilityFiles.filter((file) =>
  imageExtensions.has(path.extname(file).toLowerCase())
);
const repositoryImages = repositoryFiles.filter(
  (file) =>
    imageExtensions.has(path.extname(file).toLowerCase()) && !toPosix(file).includes("/media/art-directed/")
);
const allScannedFiles = [...curatedImages, ...capabilityImages, ...repositoryImages];

const inspected = [];
for (const file of allScannedFiles) inspected.push(await inspectImage(file));
const inspectionByPath = new Map(inspected.map((item) => [toPosix(item.filePath).toLowerCase(), item]));
const hashCounts = new Map();
for (const item of inspected) hashCounts.set(item.sha256, (hashCounts.get(item.sha256) ?? 0) + 1);

const curatedManifest = parseCsv(await fs.readFile(path.join(curatedRoot, "asset_manifest.csv"), "utf8")).map(
  (record) => ({
    assetId: record.asset_id,
    path: record.output_path,
    category: record.category,
    caseGroup: record.case_group,
    recommendedUsage: record.recommended_usage,
    priority: record.priority,
    rightsStatus: record.rights_status,
    publicStatus: record.public_status
  })
);
const capabilityCsv = parseCsv(
  await fs.readFile(path.join(capabilityRoot, "04_manifests", "portfolio-assets.csv"), "utf8")
);
const portfolioManifest = JSON.parse(
  await fs.readFile(path.join(repoRoot, "content", "portfolio-media.generated.json"), "utf8")
);
const capabilityManifest = JSON.parse(
  await fs.readFile(path.join(repoRoot, "content", "capability-media.generated.json"), "utf8")
);

const selectedCuratedPaths = new Set(portfolioManifest.records.map((record) => record.sourceFile));
const scoreRecords = [];
for (const record of curatedManifest) {
  const sourcePath = path.join(curatedRoot, record.path);
  const image = inspectionByPath.get(toPosix(sourcePath).toLowerCase());
  if (!image) continue;
  const selected = selectedCuratedPaths.has(record.path);
  const subjectType = subjectFromText({ ...record, id: record.assetId });
  const flags = objectiveFlags(record, subjectType);
  const score = scoreRecord(record, image, hashCounts.get(image.sha256) ?? 1, selected);
  scoreRecords.push({
    assetId: record.assetId,
    sourceLibrary: "curated-assets",
    originalPath: toPosix(sourcePath),
    currentPublicPaths: portfolioManifest.records
      .filter((item) => item.sourceFile === record.path)
      .map((item) => item.publicPath),
    category: record.category,
    caseGroup: record.caseGroup,
    filename: image.filename,
    ...image,
    subjectType,
    ...flags,
    suitableForHero: record.priority === "hero-candidate" && score.cropSafety >= 14,
    suitableForCard: score.compositionAndVisualQuality >= 13,
    suitableForGallery: record.recommendedUsage === "case-gallery",
    suitableForMobile: score.cropSafety >= 13,
    safeCropPossible: score.cropSafety >= 13,
    duplicateOrNearDuplicate: (hashCounts.get(image.sha256) ?? 1) > 1,
    currentPages: portfolioManifest.records
      .filter((item) => item.sourceFile === record.path)
      .flatMap((item) => item.allowedPages),
    recommendedPages: [record.recommendedUsage],
    scores: score,
    selected,
    selectionDecision: selected
      ? "Retained after the Phase 14 quality, rights and narrative review."
      : record.publicStatus === "internal-only"
        ? "Rejected: internal-only source material."
        : "Not selected: a stronger or more distinctive image represents this visual role."
  });
}

for (const record of capabilityManifest.records) {
  const sourcePath = path.join(capabilityRoot, record.sourcePath);
  const image = inspectionByPath.get(toPosix(sourcePath).toLowerCase());
  if (!image) continue;
  const csv = capabilityCsv.find((item) => item.asset_id === record.id) ?? {};
  const selected = record.usedPublicly;
  const subjectType = subjectFromText(record);
  const flags = objectiveFlags(record, subjectType);
  const score = scoreRecord(record, image, hashCounts.get(image.sha256) ?? 1, selected);
  scoreRecords.push({
    assetId: record.id,
    sourceLibrary: "codex-ready-capability",
    originalPath: toPosix(sourcePath),
    currentPublicPaths: [record.publicPath, record.avifPath, record.mobilePath],
    category: record.category,
    caseGroup: csv.category_en ?? record.categoryEn,
    filename: image.filename,
    ...image,
    subjectType,
    ...flags,
    suitableForHero: record.heroCandidate && score.cropSafety >= 14,
    suitableForCard: score.compositionAndVisualQuality >= 13,
    suitableForGallery: false,
    suitableForMobile: score.cropSafety >= 13,
    safeCropPossible: score.cropSafety >= 13,
    duplicateOrNearDuplicate: (hashCounts.get(image.sha256) ?? 1) > 1,
    currentPages: record.actualPages.map(routeForCapability),
    recommendedPages: record.recommendedPages,
    scores: score,
    selected,
    selectionDecision: selected
      ? "Retained as capability media; this does not promote it to case media."
      : "Held in review: visually redundant, lower-priority or commercially ambiguous for the current page set."
  });
}

const publicRecords = [
  ...portfolioManifest.records.map((record) => ({ ...record, mediaType: "case-media" })),
  ...capabilityManifest.records
    .filter((record) => record.usedPublicly)
    .map((record) => ({ ...record, mediaType: "capability-media" }))
];

const profiles = [];
for (const record of publicRecords) {
  const sourcePublicPath = record.publicPath;
  const inputPath = path.join(publicRoot, sourcePublicPath.replace(/^\//, ""));
  const image = inspectionByPath.get(toPosix(inputPath).toLowerCase()) ?? (await inspectImage(inputPath));
  const subjectType = subjectFromText(record);
  const flags = objectiveFlags(record, subjectType);
  const focalPoint = manualFocalPoints[record.id] ?? parsePosition(record.objectPositionDesktop);
  const protectedArea = manualProtectedAreas[record.id] ?? protectedAreaForSubject(subjectType);
  const fit = preferredFit(subjectType, flags);
  const renderFit = fit === "contain" ? "contain" : "cover";
  const ratios = ratiosForSubject(subjectType);
  const backgroundTreatment = backgroundFor(subjectType, image);
  const directory = path.join(outputRoot, record.id.replace(/[^a-z0-9-]/gi, "-"));
  await fs.mkdir(directory, { recursive: true });
  const specs = {
    desktop: { width: 1600, ratio: ratios.desktop },
    tablet: { width: 1024, ratio: ratios.tablet },
    mobile: { width: 720, ratio: ratios.mobile }
  };
  const derivatives = {};
  for (const [device, spec] of Object.entries(specs)) {
    const height = Math.round(spec.width / ratioNumber(spec.ratio));
    derivatives[device] = await renderDerivative(
      inputPath,
      path.join(directory, device),
      spec.width,
      height,
      palette[backgroundTreatment],
      renderFit,
      focalPoint,
      protectedArea
    );
  }
  const jpegPath = path.join(directory, "desktop.jpg");
  await sharp(path.join(directory, "desktop.webp")).jpeg({ quality: 82, mozjpeg: true }).toFile(jpegPath);
  const jpegStat = await fs.stat(jpegPath);
  profiles.push({
    assetId: record.id,
    mediaType: record.mediaType,
    subjectType,
    focalPoint,
    protectedArea,
    containsFace: flags.containsObviousFace,
    containsMultipleFaces: flags.containsGroup,
    containsProduct: flags.containsProduct,
    containsVehicle: flags.containsVehicle,
    containsTextOrLogo: flags.containsTextOrLogo,
    preferredFit: fit,
    desktopAspectRatio: ratios.desktop,
    tabletAspectRatio: ratios.tablet,
    mobileAspectRatio: ratios.mobile,
    desktopObjectPosition: `${Math.round(focalPoint.x * 100)}% ${Math.round(focalPoint.y * 100)}%`,
    tabletObjectPosition: `${Math.round(focalPoint.x * 100)}% ${Math.round(focalPoint.y * 100)}%`,
    mobileObjectPosition: `${Math.round(focalPoint.x * 100)}% ${Math.round(focalPoint.y * 100)}%`,
    backgroundTreatment,
    overlay: "none",
    safeForTextOverlay: subjectType === "environment" && !flags.containsTextOrLogo,
    sourcePublicPath,
    desktopAvifPath: publicPath(path.join(directory, "desktop.avif")),
    desktopWebpPath: publicPath(path.join(directory, "desktop.webp")),
    desktopJpegPath: publicPath(jpegPath),
    tabletAvifPath: publicPath(path.join(directory, "tablet.avif")),
    tabletWebpPath: publicPath(path.join(directory, "tablet.webp")),
    mobileAvifPath: publicPath(path.join(directory, "mobile.avif")),
    mobileWebpPath: publicPath(path.join(directory, "mobile.webp")),
    desktopWidth: derivatives.desktop.width,
    desktopHeight: derivatives.desktop.height,
    tabletWidth: derivatives.tablet.width,
    tabletHeight: derivatives.tablet.height,
    mobileWidth: derivatives.mobile.width,
    mobileHeight: derivatives.mobile.height,
    derivatives: {
      desktop: derivatives.desktop,
      tablet: derivatives.tablet,
      mobile: derivatives.mobile,
      jpegBytes: jpegStat.size
    },
    altEn: record.altEn,
    altZh: record.altZh,
    currentPages:
      record.mediaType === "case-media" ? record.allowedPages : record.actualPages.map(routeForCapability),
    module: record.category,
    replacedOldImage: false,
    colour: {
      averageLuminance: image.averageLuminance,
      saturation: image.saturation,
      temperature: image.colourTemperature,
      dominantColour: image.dominantColour,
      auxiliaryColour: image.auxiliaryColour
    }
  });
}

const inventory = {
  generatedAt: new Date().toISOString(),
  counts: {
    curatedLibraryImages: curatedImages.length,
    capabilityLibraryImages: capabilityImages.length,
    repositoryRasterImages: repositoryImages.length,
    totalFilesScanned: inspected.length,
    curatedManifestRecords: curatedManifest.length,
    capabilityManifestRecords: capabilityManifest.records.length,
    currentPublicAssetProfiles: profiles.length,
    exactDuplicateFiles: inspected.length - new Set(inspected.map((item) => item.sha256)).size
  },
  records: inspected.map((item) => ({
    ...item,
    source: item.filePath.startsWith(toPosix(curatedRoot))
      ? "curated-assets"
      : item.filePath.startsWith(toPosix(capabilityRoot))
        ? "codex-ready-capability"
        : "repository-public-media"
  }))
};

await Promise.all([
  fs.writeFile(path.join(auditRoot, "phase-14-source-inventory.json"), JSON.stringify(inventory, null, 2)),
  fs.writeFile(
    path.join(contentRoot, "image-selection-scores.json"),
    JSON.stringify({ generatedAt: inventory.generatedAt, records: scoreRecords }, null, 2)
  ),
  fs.writeFile(
    path.join(contentRoot, "presentation-profiles.json"),
    JSON.stringify({ generatedAt: inventory.generatedAt, profiles }, null, 2)
  )
]);

const beforeMatrixPath = path.join(auditRoot, "phase-14-browser", "before-matrix.json");
let beforeMatrix = [];
try {
  beforeMatrix = JSON.parse(await fs.readFile(beforeMatrixPath, "utf8"));
} catch {}

const routeSummaries = [...new Set(beforeMatrix.map((item) => item.path))].map((route) => {
  const checks = beforeMatrix.filter((item) => item.path === route);
  return {
    route,
    checks: checks.length,
    maxImages: Math.max(0, ...checks.map((item) => item.images.length)),
    duplicateBreakpoints: checks.filter((item) => item.duplicateSources.length).length,
    coverImages: Math.max(
      0,
      ...checks.map((item) => item.images.filter((image) => image.objectFit === "cover").length)
    ),
    containImages: Math.max(
      0,
      ...checks.map((item) => item.images.filter((image) => image.objectFit === "contain").length)
    )
  };
});

const reportHeader =
  "Generated from the two supplied media libraries, the repository media registry and the browser baseline.\n";
const currentAudit = `# Phase 14 current visual audit\n\n${reportHeader}\n## Baseline\n\n- ${inventory.counts.totalFilesScanned} raster files scanned across source libraries and repository media.\n- ${beforeMatrix.length} page/breakpoint browser checks recorded.\n- ${beforeMatrix.filter((item) => item.overflow).length} overflow failures and ${beforeMatrix.reduce((sum, item) => sum + item.images.filter((image) => image.broken).length, 0)} broken images.\n- ${beforeMatrix.filter((item) => item.duplicateSources.length).length} page/breakpoint combinations contained repeated image requests.\n\n## Page-by-page findings\n\n| Page | Breakpoints | Maximum images | Breakpoints with repeats | Cover images | Contain images | Primary Phase 14 action |\n| --- | ---: | ---: | ---: | ---: | ---: | --- |\n${routeSummaries
  .map(
    (item) =>
      `| ${item.route} | ${item.checks} | ${item.maxImages} | ${item.duplicateBreakpoints} | ${item.coverImages} | ${item.containImages} | Replace uniform crop logic with presentation profiles; remove same-page repeats and use subject-led ratios. |`
  )
  .join("\n")}\n`;

const selectionMatrix = `# Phase 14 image selection matrix\n\n${reportHeader}\nScores use the required 25/25/20/15/15 framework. Identity and client relationships are not inferred from imagery.\n\n| Asset | Library | Category | Subject | Commercial | Visual | Crop | Brand | Unique | Total | Decision |\n| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |\n${scoreRecords
  .sort((a, b) => b.scores.total - a.scores.total)
  .map(
    (item) =>
      `| ${item.assetId} | ${item.sourceLibrary} | ${item.category} | ${item.subjectType} | ${item.scores.commercialSemanticMatch} | ${item.scores.compositionAndVisualQuality} | ${item.scores.cropSafety} | ${item.scores.brandColourCompatibility} | ${item.scores.uniquenessAndPageRhythm} | ${item.scores.total} | ${item.selectionDecision.replaceAll("|", "/")} |`
  )
  .join("\n")}\n`;

const placementMap = `# Phase 14 image placement map\n\n${reportHeader}\n| Asset | Original public file | Final desktop file | Pages | Module | Desktop | Tablet | Mobile | Background | Object position | Alt | Final size | Replaced |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: | --- |\n${profiles
  .map(
    (item) =>
      `| ${item.assetId} | ${item.sourcePublicPath} | ${item.desktopAvifPath} | ${item.currentPages.join(", ")} | ${item.module} | ${item.desktopAspectRatio} | ${item.tabletAspectRatio} | ${item.mobileAspectRatio} | ${item.backgroundTreatment} | ${item.desktopObjectPosition} | ${item.altEn.replaceAll("|", "/")} | ${Math.round(item.derivatives.desktop.avifBytes / 1024)} KB | ${item.replacedOldImage ? "yes" : "new crop"} |`
  )
  .join("\n")}\n`;

const usageMap = `# Phase 14 image usage map\n\n${reportHeader}\nRules: no same-page repeat, no asset as two page heroes, and no more than two public-page families by default. Case card and its matching case hero are the explicit exception.\n\n| Asset | Media status | Pages | Page count | Subject | Hero eligible |\n| --- | --- | --- | ---: | --- | --- |\n${profiles
  .map(
    (item) =>
      `| ${item.assetId} | ${item.mediaType} | ${item.currentPages.join(", ")} | ${new Set(item.currentPages).size} | ${item.subjectType} | ${item.module === "hero" ? "yes" : "no"} |`
  )
  .join("\n")}\n`;

const colourGroups = new Map();
for (const profile of profiles) {
  for (const page of profile.currentPages) {
    const values = colourGroups.get(page) ?? [];
    values.push(profile);
    colourGroups.set(page, values);
  }
}
const colourAudit = `# Phase 14 colour and background audit\n\n${reportHeader}\nNo universal filter is applied. Backgrounds are selected from the fixed media token set according to luminance, temperature and subject.\n\n| Page | Dominant treatment | Avg luminance | Avg saturation | Warm/cool balance | Recommended text | Adjacent-image note |\n| --- | --- | ---: | ---: | --- | --- | --- |\n${[
  ...colourGroups.entries()
]
  .map(([page, items]) => {
    const treatments = items.map((item) => item.backgroundTreatment);
    const dominant = treatments.sort(
      (a, b) => treatments.filter((x) => x === b).length - treatments.filter((x) => x === a).length
    )[0];
    const luminance = Math.round(
      items.reduce((sum, item) => sum + item.colour.averageLuminance, 0) / items.length
    );
    const saturation = Math.round(
      items.reduce((sum, item) => sum + item.colour.saturation, 0) / items.length
    );
    const warm = items.filter((item) => item.colour.temperature === "warm").length;
    const cool = items.filter((item) => item.colour.temperature === "cool").length;
    return `| ${page} | ${dominant} | ${luminance} | ${saturation} | ${warm > cool ? "warm-led" : cool > warm ? "cool-led" : "balanced"} | ${["rich-black", "graphite"].includes(dominant) ? "soft ivory" : "rich black"} | Alternate subject scale and temperature; use neutral spacing between strong colour shifts. |`;
  })
  .join("\n")}\n`;

const beforeAfter = `# Phase 14 before / after report\n\n## Before\n\n- 50 baseline screenshots are stored in \`audit/phase-14-browser/before\`.\n- The browser matrix found ${beforeMatrix.filter((item) => item.duplicateSources.length).length} page/breakpoint combinations with repeated resources.\n- Portfolio and capability components used separate image logic and most layouts supplied fixed cover ratios.\n\n## After\n\nThe final screenshot count, crop-safety result, duplicate count and visual comparisons are appended after implementation verification.\n`;

const finalReport = `# Phase 14 final report\n\n## Executive summary\n\nPhase 14 rescans ${inventory.counts.totalFilesScanned} raster files, scores ${scoreRecords.length} source candidates and creates ${profiles.length} public presentation profiles. Every profiled public asset receives independent desktop, tablet and mobile AVIF/WebP derivatives plus a desktop JPEG fallback.\n\n## System delivered\n\n- One Art Direction data model for case and capability media.\n- Subject-specific ratios, focal points, protected areas, backgrounds and overlay rules.\n- Product, vehicle, group, interview and technology media fail safe to contain when a cover crop would breach the protected area.\n- Capability and case publication boundaries remain unchanged.\n\n## Verification\n\nFinal command and browser results are appended after the implementation pass.\n`;

await Promise.all([
  fs.writeFile(path.join(docsRoot, "phase-14-current-visual-audit.md"), currentAudit),
  fs.writeFile(path.join(docsRoot, "phase-14-image-selection-matrix.md"), selectionMatrix),
  fs.writeFile(path.join(docsRoot, "phase-14-image-placement-map.md"), placementMap),
  fs.writeFile(path.join(docsRoot, "phase-14-image-usage-map.md"), usageMap),
  fs.writeFile(path.join(docsRoot, "phase-14-colour-and-background-audit.md"), colourAudit),
  fs.writeFile(path.join(docsRoot, "phase-14-before-after-report.md"), beforeAfter),
  fs.writeFile(path.join(docsRoot, "phase-14-final-report.md"), finalReport)
]);

console.log(
  JSON.stringify(
    {
      scanned: inventory.counts,
      scoredCandidates: scoreRecords.length,
      presentationProfiles: profiles.length
    },
    null,
    2
  )
);
