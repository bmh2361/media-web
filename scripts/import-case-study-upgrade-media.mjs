import { readFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const suppliedRoot = "D:/media web/作品集";
const manifestPath = path.join(process.cwd(), "content", "portfolio-media.generated.json");
const publicRoot = path.join(process.cwd(), "public", "media", "portfolio");
const current = JSON.parse(await readFile(manifestPath, "utf8"));
const removed = new Set(["teal-editorial-series", "commercial-fashion-styling", "creative-beauty-makeup"]);

const groups = [
  { id: "wang-linkai-london-concert", folder: "2026王琳凯(小鬼)伦敦演唱会", sector: "events-roadshows", files: ["live-event-group-wide-04.jpg", "artist-live-editorial-01.jpg", "live-performer-stage-01.jpg"], altEn: ["Wang Linkai London concert group finale viewed across the audience.", "Wang Linkai performing under red stage lighting in London.", "Wang Linkai photographed from the stage during the London concert."], altZh: ["王琳凯伦敦演唱会全场合影与观众现场。", "王琳凯在红色舞台灯光下演出。", "王琳凯伦敦演唱会舞台现场。"] },
  { id: "geely-london-brand-launch", folder: "2025吉利伦敦发布会", sector: "automotive", files: ["industry-design-talk-02.jpg", "5525063ce95fcaa511132033800f9aaf.jpg", "766149be4ed8c3ee6a65f87256913438.jpg"], altEn: ["Geely Global Design presentation at the London brand launch.", "Geely EX5 presentation screen and guests at the London launch.", "Audience viewing a speaker on stage at the Geely London launch."], altZh: ["吉利伦敦品牌发布会的全球设计演讲。", "吉利 EX5 伦敦发布现场与嘉宾。", "吉利伦敦发布会舞台与现场观众。"] },
  { id: "yue-yunpeng-london-live", folder: "2025岳云鹏德云社伦敦巡回", sector: "events-roadshows", files: ["8d29f2f5d3fa954afd1121efd29a2ab3.jpg", "cultural-presentation-stage-03.avif"], altEn: ["Yue Yunpeng and fellow performers on stage during the 2025 London performance.", "Wide stage view from Yue Yunpeng's 2025 London performance."], altZh: ["岳云鹏与演出人员在 2025 伦敦演出舞台上。", "岳云鹏 2025 伦敦演出的舞台全景。"] },
  { id: "london-fashion-week-2025", folder: "2025伦敦时装周", sector: "fashion-beauty-apparel", files: ["artist-editorial-reflection-02.avif", "artist-fashion-editorial-03.avif"], altEn: ["Outdoor fashion editorial portrait created during London Fashion Week 2025.", "Full-length indoor fashion editorial portrait from London Fashion Week 2025."], altZh: ["2025 伦敦时装周期间创作的户外时尚编辑肖像。", "2025 伦敦时装周期间创作的室内全身时尚肖像。"] },
  { id: "agibot-london-launch", folder: "Agibot智元伦敦发布会", sector: "technology-ai", files: ["expert-speaker-stage-01.jpg", "robot-exhibition-content-03.jpg", "robot-service-display-01.jpg"], altEn: ["Speaker presenting AGIBOT robotics technology at a London event.", "AGIBOT humanoid robot displayed in the London exhibition space.", "AGIBOT service robot demonstrated in the London display area."], altZh: ["AGIBOT 智元伦敦活动的机器人技术演讲。", "AGIBOT 智元人形机器人在伦敦展示空间亮相。", "AGIBOT 智元服务机器人在伦敦展示区演示。"] },
  { id: "beauty-fashion-brand-content", folder: "美妆和服装产品", sector: "fashion-beauty-apparel", files: ["beauty-device-campaign-04.jpg", "beauty-product-editorial-02.jpg", "beauty-lifestyle-campaign-06.jpg", "beauty-makeup-editorial-07.jpg", "beauty-skincare-campaign-05.jpg", "creator-fashion-editorial-01.jpg", "fashion-retail-display-08.jpg"], altEn: ["Beauty device product image with a model on a pink set.", "Footwear product editorial photographed against a blue background.", "Lifestyle beauty portrait featuring cosmetic products.", "Makeup editorial portrait featuring a compact product.", "Skincare product portrait in an outdoor setting.", "Full-length menswear editorial portrait.", "Fashion retail display documented as brand content."], altZh: ["粉色场景中的美妆仪器产品与模特影像。", "蓝色背景中的鞋履产品编辑影像。", "呈现化妆产品的生活方式美妆肖像。", "呈现粉饼产品的妆容编辑肖像。", "户外场景中的护肤产品人物影像。", "男装全身编辑肖像。", "作为品牌内容记录的时尚零售陈列。"] }
];

const records = current.records.filter((record) => !removed.has(record.projectId));
let originalBytes = records.reduce((sum, record) => sum + record.originalBytes, 0);
let generatedBytes = records.reduce((sum, record) => sum + record.webpBytes + record.avifBytes + record.mobileBytes + record.thumbnailBytes, 0);

for (const group of groups) {
  const target = path.join(publicRoot, group.sector, group.id);
  await mkdir(target, { recursive: true });
  for (const [index, filename] of group.files.entries()) {
    const input = path.join(suppliedRoot, group.folder, filename);
    const sourceStats = await stat(input);
    const category = index === 0 ? "hero" : index === 1 ? "cover" : "gallery";
    const base = `${String(index + 1).padStart(2, "0")}-${category}`;
    const outputs = {
      webp: path.join(target, `${base}.webp`), avif: path.join(target, `${base}.avif`),
      mobile: path.join(target, `${base}-mobile.webp`), thumb: path.join(target, `${base}-thumb.webp`)
    };
    const fullBudget = category === "hero" ? 450 * 1024 : 250 * 1024;
    const make = (format, width, quality, output) => sharp(input).rotate().resize({ width, withoutEnlargement: true })[format]({ quality }).toFile(output);
    let webp = await make("webp", 1600, 78, outputs.webp);
    if (webp.size > fullBudget) webp = await make("webp", 1200, 64, outputs.webp);
    let avif = await make("avif", 1600, 55, outputs.avif);
    if (avif.size > fullBudget) avif = await make("avif", 1200, 45, outputs.avif);
    const mobile = await make("webp", 900, 76, outputs.mobile);
    const thumb = await make("webp", 640, 68, outputs.thumb);
    const publicBase = `/media/portfolio/${group.sector}/${group.id}/${base}`;
    const ratio = webp.width / webp.height;
    records.push({ id: `${group.id}-${base}`, sourceFile: `${group.folder}/${filename}`, publicPath: `${publicBase}.webp`, avifPath: `${publicBase}.avif`, mobilePath: `${publicBase}-mobile.webp`, thumbnailPath: `${publicBase}-thumb.webp`, projectId: group.id, category, width: webp.width, height: webp.height, aspectRatio: `${webp.width}:${webp.height}`, orientation: ratio > 1.08 ? "landscape" : ratio < 0.92 ? "portrait" : "square", objectPositionDesktop: "50% 50%", objectPositionMobile: "50% 50%", altEn: group.altEn[index], altZh: group.altZh[index], allowedPages: [`/work/${group.id}`], priority: category === "hero", websiteUseApproved: true, mediaRightsApproved: true, copyrightApproved: true, creditRequired: false, sourceCredit: null, publicStatus: "public", originalBytes: sourceStats.size, webpBytes: webp.size, avifBytes: avif.size, mobileBytes: mobile.size, thumbnailBytes: thumb.size });
    originalBytes += sourceStats.size;
    generatedBytes += webp.size + avif.size + mobile.size + thumb.size;
  }
}

await writeFile(manifestPath, `${JSON.stringify({ ...current, generatedAt: new Date().toISOString(), selectedAssetCount: records.length, originalBytes, generatedBytes, records }, null, 2)}\n`);
console.log(`Case-study upgrade media imported: ${records.length} active assets across 12 projects.`);
