import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const version = "v20260831";
const outputDirectory = path.join(root, "public", "og", version);
const inventoryPath = path.join(root, "audit", "og-card-inventory.json");

const pages = [
  ["home", "Move your UK and European market plans forward", "让英国与欧洲市场行动真正向前推进"],
  ["companies", "Local execution for Chinese companies", "面向中国企业的本地商业执行"],
  ["partners", "Relevant Chinese-company projects", "参与真正相关的中国企业项目"],
  ["work", "Real UK and European projects", "真实英国与欧洲项目"],
  ["how-we-work", "From commercial goal to local action", "从商业目标到本地行动"],
  ["about", "Cross-border market operations", "跨境市场运营"],
  ["contact", "Start a project conversation", "从一次项目沟通开始"],
  ["privacy", "Privacy notice", "隐私说明"],
  ["terms", "Website terms", "网站条款"],
  ["work-byd-bd11-london", "BYD BD11 London product introduction", "BYD BD11 双层公交车伦敦发布"],
  ["work-changan-europe-launch-2025", "Changan European Brand Launch 2025", "长安汽车 2025 欧洲品牌发布"],
  ["work-geely-london-brand-launch", "Geely London Brand Launch 2025", "吉利伦敦品牌发布会 2025"],
  ["work-catl-open-day-2025", "CATL Open Day 2025, Munich", "CATL Open Day 2025｜慕尼黑"],
  ["work-leapmotor-iaa-2023", "Leapmotor at IAA Mobility 2023", "零跑汽车 IAA Mobility 2023"],
  ["work-agibot-london-launch", "AGIBOT London Launch", "AGIBOT 智元伦敦发布会"],
  ["work-london-automotive-brand-film", "London Automotive Brand Film", "伦敦汽车品牌影片"],
  ["work-wang-linkai-london-concert", "Wang Linkai London Concert 2026", "王琳凯伦敦演唱会 2026"],
  ["work-yue-yunpeng-london-live", "Yue Yunpeng London Live 2025", "岳云鹏伦敦演出 2025"],
  ["work-london-fashion-week-2025", "London Fashion Week 2025", "伦敦时装周 2025"],
  ["work-beauty-fashion-brand-content", "Beauty & Fashion Brand Content", "美妆与时尚品牌内容精选"],
  ["work-european-road-lifestyle", "European Automotive Asset Programme", "欧洲汽车品牌资产项目"]
];

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const wrap = (value, max = 34) => {
  if (/[^\u0000-\u00ff]/.test(value)) {
    const chars = [...value];
    return [chars.slice(0, 18).join(""), chars.slice(18, 36).join("")].filter(Boolean);
  }
  const words = value.split(" ");
  const lines = [];
  for (const word of words) {
    const current = lines.at(-1);
    if (!current || `${current} ${word}`.length > max) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  }
  return lines.slice(0, 3);
};

const inventory = [];
await mkdir(outputDirectory, { recursive: true });
for (const [route, en, zh] of pages) {
  for (const [lang, title] of [
    ["en", en],
    ["zh", zh]
  ]) {
    const lines = wrap(title);
    const titleMarkup = lines
      .map((line, index) => `<tspan x="72" dy="${index ? 68 : 0}">${escapeXml(line)}</tspan>`)
      .join("");
    const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0a0b0d"/>
      <circle cx="1050" cy="105" r="190" fill="none" stroke="#cca672" stroke-opacity=".22" stroke-width="2"/>
      <path d="M72 112h1056M72 548h1056" stroke="#cca672" stroke-opacity=".55"/>
      <text x="72" y="82" fill="#f4f0e8" font-family="Arial, 'Microsoft YaHei', sans-serif" font-size="26" font-weight="700" letter-spacing="5">VENUS BRIDGE</text>
      <text x="72" y="267" fill="#f4f0e8" font-family="Arial, 'Microsoft YaHei', sans-serif" font-size="56" font-weight="600">${titleMarkup}</text>
      <text x="72" y="586" fill="#cca672" font-family="Arial, 'Microsoft YaHei', sans-serif" font-size="20" letter-spacing="3">GLOBAL PARTNERSHIPS</text>
      <text x="1128" y="586" text-anchor="end" fill="#f4f0e8" fill-opacity=".48" font-family="Arial, sans-serif" font-size="16">${lang === "zh" ? "ZH-CN" : "EN-GB"}</text>
    </svg>`);
    const directory = path.join(outputDirectory, lang);
    const output = path.join(directory, `${route}.png`);
    await mkdir(directory, { recursive: true });
    await sharp(svg).png({ compressionLevel: 9 }).toFile(output);
    inventory.push({
      route: route === "home" ? `/${lang}` : `/${lang}/${route.replace(/^work-/, "work/")}`,
      language: lang,
      path: `/og/${version}/${lang}/${route}.png`,
      width: 1200,
      height: 630,
      title,
      rightsSafeFallback: route.startsWith("work-")
    });
  }
}

await mkdir(path.dirname(inventoryPath), { recursive: true });
await writeFile(
  inventoryPath,
  `${JSON.stringify({ version, generatedAt: "2026-08-31", cards: inventory }, null, 2)}\n`,
  "utf8"
);
console.log(`Generated ${inventory.length} route- and language-specific Open Graph images.`);
