import type { Language } from "@/lib/i18n";

type Localized<T> = Record<Language, T>;

export type MegaMenuKey = "services" | "industries" | "talent" | "work";

export const navigation = {
  en: {
    logo: "FrameBridge Studio",
    language: "中文",
    cta: "Send Brief",
    megaCtaTitle: "Need a UK production partner?",
    megaCtaText: "Send us your project brief.",
    megaCtaButton: "Start a brief",
    mobileMenu: "Menu",
    closeMenu: "Close"
  },
  zh: {
    logo: "FrameBridge Studio",
    language: "EN",
    cta: "提交需求",
    megaCtaTitle: "需要英国本地制作伙伴？",
    megaCtaText: "把项目需求发给我们。",
    megaCtaButton: "提交需求",
    mobileMenu: "菜单",
    closeMenu: "关闭"
  }
} satisfies Localized<Record<string, string>>;

export const primaryNav = [
  { href: "/", key: "home", label: { en: "Home", zh: "首页" } },
  { href: "/services", key: "services", label: { en: "Services", zh: "服务" }, mega: "services" },
  { href: "/industries", key: "industries", label: { en: "Industries", zh: "行业" }, mega: "industries" },
  { href: "/talent", key: "talent", label: { en: "Talent", zh: "人才" }, mega: "talent" },
  { href: "/work", key: "work", label: { en: "Work", zh: "案例" }, mega: "work" },
  { href: "/for-agencies", key: "agencies", label: { en: "For Agencies", zh: "代理合作" } },
  { href: "/about", key: "about", label: { en: "About", zh: "关于" } },
  { href: "/contact", key: "contact", label: { en: "Contact", zh: "联系" } }
] as const;

export const megaMenus = {
  services: {
    eyebrow: { en: "Production services", zh: "制作服务" },
    items: [
      {
        title: { en: "Creative Production", zh: "创意制作" },
        description: { en: "Direction, planning and UK shoot management.", zh: "创意方向、制作策划与英国现场管理。" }
      },
      {
        title: { en: "Commercial Photography", zh: "商业摄影" },
        description: { en: "Campaign, product and editorial image systems.", zh: "广告、产品与编辑式视觉资产。" }
      },
      {
        title: { en: "Video & Brand Films", zh: "视频与品牌影片" },
        description: { en: "Launch films, product stories and campaign edits.", zh: "上市影片、产品故事与广告剪辑。" }
      },
      {
        title: { en: "Short-form Video & Short Drama", zh: "短视频与短剧" },
        description: { en: "Narrative formats built for social attention.", zh: "适合社媒传播的剧情化短内容。" }
      },
      {
        title: { en: "Talent Casting", zh: "人才选角" },
        description: { en: "Models, actors, presenters and on-camera talent.", zh: "模特、演员、主持人与出镜人才。" }
      },
      {
        title: { en: "Creator Campaigns", zh: "达人共创广告" },
        description: { en: "UK-based creators for China-facing campaigns.", zh: "协调在英创作者服务中国传播项目。" }
      },
      {
        title: { en: "Makeup & Styling", zh: "妆造与造型" },
        description: { en: "Wardrobe, beauty, product and image direction.", zh: "服装、妆造、产品陈列与视觉把控。" }
      },
      {
        title: { en: "Event & PR Coverage", zh: "活动与公关记录" },
        description: { en: "Launch, exhibition and press-ready content.", zh: "发布会、展会与公关传播素材。" }
      },
      {
        title: { en: "UK Production Consulting", zh: "英国本地制作咨询" },
        description: { en: "Local feasibility, crew, permits and workflow advice.", zh: "本地可行性、团队、许可与流程建议。" }
      }
    ]
  },
  industries: {
    eyebrow: { en: "Industries", zh: "服务行业" },
    items: [
      { title: { en: "Fashion", zh: "时尚" }, description: { en: "Campaigns, lookbooks and editorial imagery.", zh: "广告、画册与编辑式视觉。" } },
      { title: { en: "Jewellery & Accessories", zh: "珠宝与配饰" }, description: { en: "Detail-led product and model content.", zh: "强调细节质感的产品与模特内容。" } },
      { title: { en: "Beauty & Skincare", zh: "美妆护肤" }, description: { en: "Texture, routine and launch storytelling.", zh: "质地、使用场景与上市叙事。" } },
      { title: { en: "AI & Technology", zh: "AI 与科技" }, description: { en: "Human-facing demos and product videos.", zh: "更有人感的演示与产品视频。" } },
      { title: { en: "Automotive", zh: "汽车" }, description: { en: "Lifestyle, event and mobility content.", zh: "生活方式、活动与出行内容。" } },
      { title: { en: "Lifestyle", zh: "生活方式" }, description: { en: "Premium scenes for brand worlds.", zh: "塑造品牌世界观的高质感场景。" } },
      { title: { en: "Food & Beverage", zh: "食品饮品" }, description: { en: "Product appetite, rituals and retail moments.", zh: "产品食欲感、仪式感与零售场景。" } },
      { title: { en: "Entertainment", zh: "娱乐" }, description: { en: "Talent, events and public-facing moments.", zh: "艺人、活动与公众传播现场。" } },
      { title: { en: "Education", zh: "教育" }, description: { en: "Presenter, campus and trust-building content.", zh: "出镜、校园与信任建立内容。" } },
      { title: { en: "Cross-border E-commerce", zh: "跨境电商" }, description: { en: "Content packages for launch and conversion.", zh: "适合上新与转化的内容组合。" } }
    ]
  },
  talent: {
    eyebrow: { en: "Talent network", zh: "人才网络" },
    items: [
      { title: { en: "UK-based Chinese creators", zh: "英国华人创作者" }, description: { en: "Creators with UK context and China fluency.", zh: "理解英国场景与中国受众的创作者。" } },
      { title: { en: "British models", zh: "英国模特" }, description: { en: "Commercial and editorial faces for campaigns.", zh: "适合商业与编辑拍摄的本地面孔。" } },
      { title: { en: "Asian models", zh: "亚洲模特" }, description: { en: "Casting for China-facing brand relevance.", zh: "服务中国传播语境的人才匹配。" } },
      { title: { en: "Actors", zh: "演员" }, description: { en: "Narrative, short drama and brand storytelling.", zh: "剧情短片、短剧与品牌故事表达。" } },
      { title: { en: "Presenters and hosts", zh: "主持人与出镜讲解" }, description: { en: "Bilingual demos, interviews and live moments.", zh: "双语演示、访谈与活动主持。" } },
      { title: { en: "Makeup artists", zh: "化妆师" }, description: { en: "Camera-ready beauty for brand standards.", zh: "符合商业镜头标准的妆容支持。" } },
      { title: { en: "Stylists", zh: "造型师" }, description: { en: "Wardrobe, fashion and product styling.", zh: "服装、时尚与产品造型。" } },
      { title: { en: "Photographers and videographers", zh: "摄影师与摄像师" }, description: { en: "Specialist image makers for each format.", zh: "匹配不同内容形式的影像团队。" } }
    ]
  },
  work: {
    eyebrow: { en: "Work formats", zh: "案例类型" },
    items: [
      { title: { en: "Campaign Production", zh: "广告制作" }, description: { en: "Full campaign stills and motion packages.", zh: "完整广告图片与视频资产。" } },
      { title: { en: "Event Coverage", zh: "活动记录" }, description: { en: "Launches, celebrity moments and PR assets.", zh: "发布、明星活动与公关素材。" } },
      { title: { en: "Product Content", zh: "产品内容" }, description: { en: "Stills, demos and launch-ready product assets.", zh: "静物、演示与上市产品素材。" } },
      { title: { en: "Fashion Lookbook", zh: "时尚画册" }, description: { en: "Editorial styling and model-led collections.", zh: "编辑造型与模特系列拍摄。" } },
      { title: { en: "Technology Video", zh: "科技视频" }, description: { en: "Presenter-led and product-led explainers.", zh: "出镜讲解与产品说明视频。" } },
      { title: { en: "Creator-led Campaign", zh: "达人共创广告" }, description: { en: "Creator content with production polish.", zh: "兼具达人表达与制作质感的内容。" } },
      { title: { en: "Short Drama", zh: "短剧" }, description: { en: "Narrative formats for brand attention.", zh: "服务品牌注意力的剧情内容。" } }
    ]
  }
} satisfies Record<
  MegaMenuKey,
  {
    eyebrow: Localized<string>;
    items: Array<{
      title: Localized<string>;
      description: Localized<string>;
    }>;
  }
>;
