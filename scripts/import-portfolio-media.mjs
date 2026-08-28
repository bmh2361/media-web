import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot =
  process.env.PORTFOLIO_SOURCE_ROOT ??
  "D:/media pics/venus_bridge_media_curated_assets/venus_bridge_media_curated_assets";
const publicRoot = path.join(process.cwd(), "public", "media", "portfolio");
const manifestPath = path.join(process.cwd(), "content", "portfolio-media.generated.json");

const projects = [
  {
    id: "catl-open-day-2025",
    sector: "automotive",
    sourceDir: "01_automotive_cases/01_catl_open_day_2025_munich",
    files: [
      "01_01_catl_open_day_2025_munich_000.jpg",
      "05_01_catl_open_day_2025_munich_004.jpg",
      "02_01_catl_open_day_2025_munich_001.jpg",
      "07_01_catl_open_day_2025_munich_006.jpg",
      "11_01_catl_open_day_2025_munich_010.jpg",
      "13_01_catl_open_day_2025_munich_012.jpg",
      "16_01_catl_open_day_2025_munich_015.jpg"
    ]
  },
  {
    id: "byd-bd11-london",
    sector: "automotive",
    sourceDir: "01_automotive_cases/02_byd_bd11_london_launch",
    files: [
      "02_02_byd_bd11_london_launch_018.jpg",
      "09_02_byd_bd11_london_launch_025.jpg",
      "01_02_byd_bd11_london_launch_017.jpg",
      "05_02_byd_bd11_london_launch_021.jpg",
      "10_02_byd_bd11_london_launch_026.jpg",
      "12_02_byd_bd11_london_launch_028.jpg",
      "16_02_byd_bd11_london_launch_032.jpg"
    ]
  },
  {
    id: "changan-europe-launch-2025",
    sector: "automotive",
    sourceDir: "01_automotive_cases/03_changan_europe_launch_munich",
    files: [
      "01_03_changan_europe_launch_munich_033.jpg",
      "09_03_changan_europe_launch_munich_041.jpg",
      "03_03_changan_europe_launch_munich_035.jpg",
      "06_03_changan_europe_launch_munich_038.jpg",
      "11_03_changan_europe_launch_munich_043.jpg",
      "12_03_changan_europe_launch_munich_044.jpg",
      "16_03_changan_europe_launch_munich_048.jpg"
    ]
  },
  {
    id: "leapmotor-iaa-2023",
    sector: "automotive",
    sourceDir: "01_automotive_cases/04_leapmotor_iaa_2023_munich",
    files: [
      "01_04_leapmotor_iaa_2023_munich_049.jpg",
      "02_04_leapmotor_iaa_2023_munich_050.jpg",
      "03_04_leapmotor_iaa_2023_munich_051.jpg",
      "06_04_leapmotor_iaa_2023_munich_054.jpg",
      "10_04_leapmotor_iaa_2023_munich_058.jpg",
      "11_04_leapmotor_iaa_2023_munich_059.jpg",
      "16_04_leapmotor_iaa_2023_munich_064.jpg"
    ]
  },
  {
    id: "london-automotive-brand-film",
    sector: "automotive",
    sourceDir: "01_automotive_cases/05_byd_overseas_brand_film_london",
    files: [
      "01_05_byd_overseas_brand_film_london_065.jpg",
      "11_05_byd_overseas_brand_film_london_075.jpg",
      "03_05_byd_overseas_brand_film_london_067.jpg",
      "06_05_byd_overseas_brand_film_london_070.jpg",
      "08_05_byd_overseas_brand_film_london_072.jpg",
      "14_05_byd_overseas_brand_film_london_078.jpg",
      "16_05_byd_overseas_brand_film_london_080.jpg"
    ]
  },
  {
    id: "european-road-lifestyle",
    sector: "automotive",
    sourceDir: "01_automotive_cases/06_european_automotive_lifestyle_archive",
    files: [
      "03_06_european_automotive_lifestyle_archive_083.jpg",
      "09_06_european_automotive_lifestyle_archive_089.jpg",
      "01_06_european_automotive_lifestyle_archive_081.jpg",
      "06_06_european_automotive_lifestyle_archive_086.jpg",
      "12_06_european_automotive_lifestyle_archive_092.jpg",
      "13_06_european_automotive_lifestyle_archive_093.jpg",
      "14_06_european_automotive_lifestyle_archive_094.jpg"
    ]
  },
  {
    id: "teal-editorial-series",
    sector: "fashion-beauty-apparel",
    sourceDir: "02_fashion_beauty_apparel/01_teal_editorial_series",
    files: [
      "07_teal_editorial_010.jpg",
      "01_teal_editorial_004.jpg",
      "05_teal_editorial_008.jpg",
      "09_teal_editorial_012.jpg",
      "10_teal_editorial_013.jpg",
      "12_teal_editorial_015.jpg",
      "14_teal_editorial_017.jpg"
    ]
  },
  {
    id: "commercial-fashion-styling",
    sector: "fashion-beauty-apparel",
    sourceDir: "02_fashion_beauty_apparel/02_commercial_fashion_and_styling",
    files: [
      "59_img-049_crop1.jpg",
      "12_img-021_crop1.jpg",
      "07_img-019_crop3.jpg",
      "20_img-023_crop1.jpg",
      "25_img-027_crop2.jpg",
      "31_img-030_crop2.jpg",
      "35_img-031_crop2.jpg",
      "53_img-042_crop1.jpg"
    ]
  },
  {
    id: "creative-beauty-makeup",
    sector: "fashion-beauty-apparel",
    sourceDir: "02_fashion_beauty_apparel/03_creative_beauty_and_makeup",
    files: ["01_img-054_crop1.jpg", "02_img-055_crop1.jpg", "04_img-056_crop1.jpg", "08_img-059_crop1.jpg"]
  },
  {
    id: "talent-categories",
    sector: "talent-casting-styling",
    sourceDir: "03_talent_casting_reference",
    files: [
      "01_female_talent/01_female_talent_003.jpg",
      "01_female_talent/04_female_talent_006.jpg",
      "01_female_talent/10_female_talent_012.jpg",
      "02_male_talent/01_male_talent_024.jpg",
      "02_male_talent/07_male_talent_030.jpg",
      "02_male_talent/11_male_talent_034.jpg"
    ]
  }
];

const alt = {
  "catl-open-day-2025": [
    "Audience facing a blue-lit CATL presentation stage in Munich.",
    "Speaker presenting battery technology on a wide CATL stage.",
    "CATL Open Day audience and presentation screen.",
    "Presenter framed by a technical presentation screen.",
    "Audience watching a sustainability presentation.",
    "Speaker presenting a product development timeline.",
    "Wide closing view of the CATL Open Day stage and audience."
  ],
  "byd-bd11-london": [
    "Red BYD BD11 double-decker bus displayed at a London launch event.",
    "Audience seated beside a red double-decker bus during a presentation.",
    "Side view of the BYD BD11 electric bus inside a London transport venue.",
    "Guests gathering around the displayed double-decker bus.",
    "Front view of the BYD BD11 bus inside the venue.",
    "Audience members listening during the bus presentation.",
    "Launch group assembled in front of the red double-decker bus."
  ],
  "changan-europe-launch-2025": [
    "Presenter introducing Changan vehicles on a blue-lit Munich stage.",
    "Guests exploring Changan vehicles inside the European brand launch venue.",
    "Vehicle reveal on the Changan European launch stage.",
    "Guests viewing vehicles in an outdoor product display area.",
    "Presenter speaking beside a vehicle interior graphic.",
    "Launch participants gathered across the Sharing the Future stage.",
    "Wide view of the Changan launch stage and audience."
  ],
  "leapmotor-iaa-2023": [
    "Wide view of the Leapmotor exhibition stand at IAA Mobility 2023.",
    "Leapmotor press conference group on stage in Munich.",
    "Front view of a Leapmotor vehicle on the exhibition floor.",
    "Leapmotor vehicle interior and dashboard detail.",
    "Leapmotor exhibition reception and meeting area.",
    "Rear lighting detail on a white Leapmotor vehicle.",
    "Visitors viewing a Leapmotor vehicle at the exhibition."
  ],
  "london-automotive-brand-film": [
    "London street frame with a red bus from an automotive brand film.",
    "Aerial view of an automotive gathering in the English countryside.",
    "Interview subject standing beside an electric vehicle.",
    "Aerial city view used within the London automotive story.",
    "Aerial view of vehicles and a painted venue building.",
    "Electric vehicle driving through a London street.",
    "Vehicle travelling along a rural road in an aerial film frame."
  ],
  "european-road-lifestyle": [
    "Performance car travelling on an open European road.",
    "Sports car moving through a city street with spectators nearby.",
    "Low front tracking view of a performance car on a highway.",
    "Sports cars travelling together on a European road.",
    "Performance car passing a crowd outside a Munich hotel.",
    "Sports car framed through an architectural foreground.",
    "Yellow sports car moving through a city street at night."
  ],
  "teal-editorial-series": [
    "Model in a teal coat against a modern glass building.",
    "Model in dark tailoring beside a red city bus.",
    "Full-length editorial styling in a sculpted garden setting.",
    "Model walking in a flowing teal garment at night.",
    "Side view of a teal garment moving through city light.",
    "Editorial portrait with structured teal outerwear.",
    "Full-length fashion image balancing garment movement and architecture."
  ],
  "commercial-fashion-styling": [
    "Model wearing a structured camel coat in a studio fashion image.",
    "Model in a white tailored jacket for a commercial fashion image.",
    "Group wearing pale dresses in an outdoor apparel image.",
    "Model posed in blue apparel against a fabric backdrop.",
    "Model wearing a yellow layered dress on a neutral set.",
    "Model in a blue structured look against a dark background.",
    "Model wearing a printed dress against a red studio backdrop.",
    "Model wearing a yellow floral dress in a studio setting."
  ],
  "creative-beauty-makeup": [
    "Creative beauty portrait with pink graphic makeup in a retail setting.",
    "Fashion portrait with floral styling and a teal jacket.",
    "Creative beauty portrait with sculptural styling and pale makeup.",
    "Close beauty portrait with blue and pink graphic eye makeup."
  ],
  "talent-categories": [
    "Close portrait demonstrating editorial makeup and short-hair styling.",
    "Full-length fashion portrait beside a window.",
    "Full-length model image in a sculptural gold outfit.",
    "Two male models wearing contrasting neutral and dark styling.",
    "Two male models in coordinated editorial styling.",
    "Male model in a red jacket in an outdoor urban setting."
  ]
};

const altZh = {
  "catl-open-day-2025": "慕尼黑 CATL Open Day 发布活动现场影像。",
  "byd-bd11-london": "伦敦 BYD BD11 双层公交车发布活动现场。",
  "changan-europe-launch-2025": "慕尼黑长安汽车欧洲品牌发布活动现场。",
  "leapmotor-iaa-2023": "慕尼黑 IAA Mobility 2023 零跑汽车展会现场。",
  "london-automotive-brand-film": "伦敦汽车品牌故事影片现场画面。",
  "european-road-lifestyle": "欧洲道路与城市汽车生活方式影像。",
  "teal-editorial-series": "青绿色造型与城市建筑结合的时尚编辑影像。",
  "commercial-fashion-styling": "服装廓形与造型清晰可见的商业时尚影像。",
  "creative-beauty-makeup": "突出妆面与造型细节的创意美妆影像。",
  "talent-categories": "用于说明人才类型与镜头表现的匿名示例影像。"
};

const allowedPages = (projectId, sector) => {
  const pages = [`/work/${projectId}`];
  if (sector === "automotive") pages.push("/industries/automotive", "/services/events-exhibitions");
  if (sector === "fashion-beauty-apparel")
    pages.push("/industries/fashion-beauty-apparel", "/services/commercial-production");
  if (sector === "talent-casting-styling") pages.push("/talent");
  if (
    ["changan-europe-launch-2025", "teal-editorial-series", "london-automotive-brand-film"].includes(
      projectId
    )
  )
    pages.push("/");
  return pages;
};

const manifest = [];
let originalBytes = 0;
let generatedBytes = 0;

for (const project of projects) {
  const targetDir = path.join(publicRoot, project.sector, project.id);
  await mkdir(targetDir, { recursive: true });
  for (const [index, file] of project.files.entries()) {
    const sourceFile = path.join(sourceRoot, project.sourceDir, file);
    const sourceStats = await stat(sourceFile);
    const role = index === 0 ? "hero" : index === 1 ? "cover" : "gallery";
    const base = `${String(index + 1).padStart(2, "0")}-${role}`;
    const webpPath = path.join(targetDir, `${base}.webp`);
    const avifPath = path.join(targetDir, `${base}.avif`);
    const mobilePath = path.join(targetDir, `${base}-mobile.webp`);
    const thumbPath = path.join(targetDir, `${base}-thumb.webp`);
    const fullBudget = role === "hero" ? 450 * 1024 : 250 * 1024;
    let webp = await sharp(sourceFile)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(webpPath);
    if (webp.size > fullBudget) {
      webp = await sharp(sourceFile)
        .rotate()
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 64 })
        .toFile(webpPath);
    }
    let avif = await sharp(sourceFile)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .avif({ quality: 55 })
      .toFile(avifPath);
    if (avif.size > fullBudget) {
      avif = await sharp(sourceFile)
        .rotate()
        .resize({ width: 1200, withoutEnlargement: true })
        .avif({ quality: 45 })
        .toFile(avifPath);
    }
    const mobile = await sharp(sourceFile)
      .rotate()
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(mobilePath);
    const thumb = await sharp(sourceFile)
      .rotate()
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 68 })
      .toFile(thumbPath);
    originalBytes += sourceStats.size;
    generatedBytes += webp.size + avif.size + mobile.size + thumb.size;
    const publicBase = `/media/portfolio/${project.sector}/${project.id}/${base}`;
    manifest.push({
      id: `${project.id}-${base}`,
      sourceFile: `${project.sourceDir}/${file}`,
      publicPath: `${publicBase}.webp`,
      avifPath: `${publicBase}.avif`,
      mobilePath: `${publicBase}-mobile.webp`,
      thumbnailPath: `${publicBase}-thumb.webp`,
      projectId: project.id,
      category: role,
      width: webp.width,
      height: webp.height,
      aspectRatio: `${webp.width}:${webp.height}`,
      objectPositionDesktop: "50% 50%",
      objectPositionMobile: "50% 50%",
      altEn: alt[project.id][index],
      altZh: altZh[project.id],
      allowedPages: allowedPages(project.id, project.sector),
      priority: role === "hero",
      websiteUseApproved: true,
      mediaRightsApproved: true,
      copyrightApproved: true,
      creditRequired: false,
      sourceCredit: null,
      publicStatus: "public",
      originalBytes: sourceStats.size,
      webpBytes: webp.size,
      avifBytes: avif.size,
      mobileBytes: mobile.size,
      thumbnailBytes: thumb.size
    });
  }
}

await writeFile(
  manifestPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sourceRecordCount: 261,
      selectedAssetCount: manifest.length,
      excludedInternalCount: 54,
      originalBytes,
      generatedBytes,
      records: manifest
    },
    null,
    2
  )}\n`,
  "utf8"
);

console.log(
  `Imported ${manifest.length} selected assets. Source bytes: ${originalBytes}; generated responsive bytes: ${generatedBytes}.`
);
