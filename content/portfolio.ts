import generatedMedia from "@/content/portfolio-media.generated.json";
import type { ExpertiseSector, ProjectPath } from "@/content/information-architecture";

export type PortfolioSection = "selected-projects" | "production-experience" | "production-scenarios";
export type ProjectSector =
  | "automotive"
  | "fashion-beauty-apparel"
  | "events-roadshows"
  | "talent-casting-styling"
  | "creative-production"
  | "technology-ai"
  | "other";
export type CommercialCaseCategory =
  | "market-presence"
  | "industry-credibility"
  | "institutional-talent"
  | "brand-evidence";
export type PortfolioPublicationStatus = "published" | "draft" | "private";
export type PortfolioContentType = "case-study" | "portfolio-series";
export type PreviewPresentation = "landscape-full" | "portrait-editorial" | "dual-image" | "cinematic";
export type HeroLayout = "wide" | "cinematic" | "portrait" | "editorial-split" | "natural" | "contained";
export type CaseArchetype =
  | "market-presence-launch"
  | "industry-event-presence"
  | "talent-activation"
  | "brand-content-system";
export type CaseEvidenceLevel = "confirmed" | "public-record" | "internal-record";
export type CaseScope =
  | "visual-documentation"
  | "content-production"
  | "editorial-selection"
  | "local-production"
  | "location-coordination";
export type CaseCapability =
  | "Event Documentation"
  | "Content Production"
  | "Brand Presentation"
  | "Local Production"
  | "UK Location Coordination"
  | "Post-project Assets";
export type MediaNarrativeRole = "preview" | "hero" | "editorial" | "detail" | "closing";
export type MediaWidth = "full" | "wide" | "editorial" | "medium" | "portrait" | "detail";
export type CaseStudyMediaDecision = {
  mediaId: string;
  role: MediaNarrativeRole;
  safeCrop: boolean;
  galleryFit: "natural" | "contain";
  width: MediaWidth;
  maxDisplayWidth: number;
  focalPoint: { x: number; y: number };
  desktopFocalPoint?: { x: number; y: number };
  mobileFocalPoint?: { x: number; y: number };
};
export type ProjectLayoutBlock =
  | { type: "full"; media: string[] }
  | { type: "pair"; media: string[]; split?: "equal" | "7-5" | "5-7"; align?: "top" | "centre" | "bottom" }
  | { type: "offset"; media: string[]; side?: "left" | "right" }
  | { type: "triptych"; media: string[] }
  | { type: "portrait-focus"; media: string[] }
  | { type: "text-media"; media: string[]; textKey: string };

export type PortfolioMedia = {
  id: string;
  sourceFile: string;
  publicPath: string;
  avifPath: string;
  mobilePath: string;
  thumbnailPath: string;
  projectId: string;
  category: "hero" | "cover" | "gallery" | "detail" | "bts" | "published";
  width: number;
  height: number;
  aspectRatio: string;
  orientation?: "landscape" | "portrait" | "square";
  objectPositionDesktop?: string;
  objectPositionMobile?: string;
  altEn: string;
  altZh: string;
  allowedPages: string[];
  priority: boolean;
  websiteUseApproved: true;
  mediaRightsApproved: true;
  copyrightApproved: true;
  creditRequired: false;
  sourceCredit: null;
  publicStatus: "public";
  originalBytes: number;
  webpBytes: number;
  avifBytes: number;
  mobileBytes: number;
  thumbnailBytes: number;
};
export type EvidenceRecord = { type: "source-pdf" | "user-confirmation"; label: string; verified: true };
export type InstitutionalEvidenceContext = {
  evidenceLevel: "A";
  participantIdentityEn: string;
  participantIdentityZh: string;
  institutionEn: string;
  institutionZh: string;
  programmeEn: string;
  programmeZh: string;
  roleEn: string;
  roleZh: string;
  dateLocationEn: string;
  dateLocationZh: string;
  contributionEn: string;
  contributionZh: string;
  approvedWordingEn: string;
  approvedWordingZh: string;
  permissionStatus: "approved";
};

export type PortfolioProject = {
  id: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  contentType: PortfolioContentType;
  clientName?: string;
  clientNamePublic: boolean;
  sector: ProjectSector;
  category: CommercialCaseCategory;
  objectiveTags?: string[];
  section: PortfolioSection;
  sortDate?: string;
  sortOrder: number;
  date?: string;
  year?: string;
  location?: string;
  projectTypeEn: string;
  projectTypeZh: string;
  briefEn?: string;
  briefZh?: string;
  contextEn?: string;
  contextZh?: string;
  objectiveEn?: string;
  objectiveZh?: string;
  commercialObjectiveEn: string;
  commercialObjectiveZh: string;
  market?: string;
  audienceEn?: string;
  audienceZh?: string;
  executionEn?: string;
  executionZh?: string;
  evidenceCreatedEn?: string[];
  evidenceCreatedZh?: string[];
  commercialUseEn?: string[];
  commercialUseZh?: string[];
  continuedValueEn?: string[];
  continuedValueZh?: string[];
  institutionalContext?: InstitutionalEvidenceContext;
  institutionalRelationshipLevel?: "A" | "B" | "C" | "unverified";
  scopeBoundaryEn: string;
  scopeBoundaryZh: string;
  venusRoleEn: string[];
  venusRoleZh: string[];
  deliverablesEn?: string[];
  deliverablesZh?: string[];
  services: string[];
  primaryPath: ProjectPath;
  primarySector: ExpertiseSector;
  secondarySectors?: ExpertiseSector[];
  tags: string[];
  roleEn: string[];
  roleZh: string[];
  media: PortfolioMedia[];
  coverMediaId: string;
  coverFit: "cover" | "contain";
  layout: ProjectLayoutBlock[];
  previewMediaId: string;
  heroMediaId: string;
  previewPresentation: PreviewPresentation;
  heroLayout: HeroLayout;
  previewSupportingMediaId?: string;
  archetype: CaseArchetype;
  evidenceLevel: CaseEvidenceLevel;
  scope: CaseScope[];
  capabilities: CaseCapability[];
  projectChallengeEn: string;
  projectChallengeZh: string;
  roleStatementEn: string;
  roleStatementZh: string;
  projectValueEn: string;
  projectValueZh: string;
  mediaDecisions: CaseStudyMediaDecision[];
  mediaStatus: "ready" | "pending" | "none";
  evidenceStatus: "verified" | "partial" | "pending";
  evidence: EvidenceRecord[];
  websiteUseApproved: true;
  mediaRightsApproved: true;
  copyrightApproved: true;
  publicStatus: PortfolioPublicationStatus;
  status: "completed";
  clientApproval: true;
  legalApproved: true;
  homepageFeatured: boolean;
  homepageOrder?: number;
  relatedCases?: string[];
};
export type ProofTier = "strategic" | "execution" | "capability";
export type ProofPresentation = {
  tier: ProofTier;
  label: Record<"en" | "zh", string>;
  businessObjective: Record<"en" | "zh", string>;
};
type Manifest = {
  generatedAt: string;
  sourceRecordCount: number;
  selectedAssetCount: number;
  excludedInternalCount: number;
  originalBytes: number;
  generatedBytes: number;
  records: PortfolioMedia[];
};

export const portfolioMediaManifest = generatedMedia as Manifest;
const mediaFor = (slug: string) => portfolioMediaManifest.records.filter((media) => media.projectId === slug);
const rightsEvidence: EvidenceRecord = {
  type: "user-confirmation",
  label: "Website and media-use rights confirmed by the user.",
  verified: true
};
const id = (slug: string, order: number, role: "hero" | "cover" | "gallery") =>
  `${slug}-${String(order).padStart(2, "0")}-${role}`;
const boundary = {
  caseEn:
    "The public record supports photography and visual documentation of the visible project setting. It does not claim event ownership, wider campaign strategy or measured commercial outcomes.",
  caseZh:
    "公开记录仅支持可见项目场景的摄影与视觉记录，不代表 Venus Bridge 负责活动主办、整体传播策略或量化商业成果。",
  seriesEn:
    "This selection demonstrates photography and visual-content capability. Client identity, commission scope, distribution and outcomes are not claimed where they are not verified.",
  seriesZh: "本选集用于展示摄影与视觉内容能力；未经核验的客户身份、委托范围、传播渠道与项目成果不作公开主张。"
};
type Spec = {
  slug: string;
  titleEn: string;
  titleZh: string;
  contentType?: PortfolioContentType;
  clientName?: string;
  clientNamePublic?: boolean;
  sector: ProjectSector;
  category: CommercialCaseCategory;
  sortDate?: string;
  year?: string;
  location: string;
  projectTypeEn: string;
  projectTypeZh: string;
  objectiveEn: string;
  objectiveZh: string;
  contextEn: string;
  contextZh: string;
  executionEn: string;
  executionZh: string;
  rolesEn: string[];
  rolesZh: string[];
  primarySector: ExpertiseSector | "media-entertainment";
  primaryPath?: ProjectPath;
  tags: string[];
  cover: [number, "hero" | "cover" | "gallery"];
  coverFit?: "cover" | "contain";
  layout: ProjectLayoutBlock[];
  homepageOrder?: number;
};
const layouts = {
  seven: (slug: string): ProjectLayoutBlock[] => [
    { type: "full", media: [id(slug, 1, "hero")] },
    { type: "pair", media: [id(slug, 2, "cover"), id(slug, 3, "gallery")], split: "7-5" },
    { type: "triptych", media: [id(slug, 4, "gallery"), id(slug, 5, "gallery"), id(slug, 6, "gallery")] },
    { type: "full", media: [id(slug, 7, "gallery")] }
  ],
  three: (slug: string): ProjectLayoutBlock[] => [
    { type: "full", media: [id(slug, 1, "hero")] },
    { type: "pair", media: [id(slug, 2, "cover"), id(slug, 3, "gallery")], split: "equal", align: "top" }
  ]
};

const specs: Spec[] = [
  {
    slug: "wang-linkai-london-concert",
    titleEn: "Wang Linkai (Xiao Gui) London Concert 2026",
    titleZh: "王琳凯（小鬼）伦敦演唱会 2026",
    clientName: "Wang Linkai (Xiao Gui)",
    clientNamePublic: true,
    sector: "events-roadshows",
    category: "institutional-talent",
    sortDate: "2026-01-01",
    year: "2026",
    location: "London, UK",
    projectTypeEn: "Overseas live music event",
    projectTypeZh: "海外音乐演出",
    objectiveEn: "A Chinese artist’s live identity in an overseas cultural setting.",
    objectiveZh: "中国艺人在海外文化现场的形象表达。",
    contextEn:
      "Wang Linkai’s London concert placed the artist’s live performance in an overseas audience setting. Performance and the shared atmosphere of the room are distinct parts of how a cultural project is understood beyond its home market.",
    contextZh:
      "王琳凯伦敦演唱会将艺人的舞台表现放进海外观众的现场体验。表演本身与共同参与的氛围，是理解文化内容如何在海外呈现的两个重要部分。",
    executionEn:
      "The selection brings artist portraits and the shared live setting together as a concise account of the performance.",
    executionZh: "选集将艺人肖像与现场共同参与的场景连接起来，形成精炼的演出内容。",
    rolesEn: ["Live-event photography", "Editorial image selection"],
    rolesZh: ["现场活动摄影", "编辑影像筛选"],
    primarySector: "media-entertainment",
    tags: ["concert", "photography", "london"],
    cover: [2, "cover"],
    layout: layouts.three("wang-linkai-london-concert")
  },
  {
    slug: "geely-london-brand-launch",
    titleEn: "Geely London Brand Launch 2025",
    titleZh: "吉利伦敦品牌发布会 2025",
    clientName: "Geely Auto",
    clientNamePublic: true,
    sector: "automotive",
    category: "market-presence",
    sortDate: "2025-10-23",
    year: "2025",
    location: "London, UK",
    projectTypeEn: "UK brand and product launch",
    projectTypeZh: "英国品牌与产品发布",
    objectiveEn: "Making an international automotive brand relevant to a British audience.",
    objectiveZh: "让国际汽车品牌的表达与英国受众建立联系。",
    contextEn:
      "Geely launched its namesake brand in the UK in London on 23 October 2025, introducing the EX5 as its first UK model. The event brought design, product and brand together at the point where a wider international business needed a distinct introduction to British consumers.",
    contextZh:
      "2025 年 10 月 23 日，吉利在伦敦发布其同名品牌进入英国市场，并介绍首款英国车型 EX5。对一个已有国际业务基础的汽车品牌，这场发布需要把设计、产品与品牌身份转化为英国消费者能够理解的介绍。",
    executionEn:
      "The project imagery places the design speaker, product presentation and launch audience in a connected sequence. It shows how the brand and its first UK model were presented together in London.",
    executionZh: "项目影像串联设计演讲、产品介绍与现场观众，呈现品牌和首款英国车型如何在伦敦共同亮相。",
    rolesEn: ["Launch photography", "Design and product imagery"],
    rolesZh: ["发布现场摄影", "设计与产品影像"],
    primarySector: "automotive",
    primaryPath: "launch-in-the-uk",
    tags: ["brand-launch", "geely", "london"],
    cover: [2, "cover"],
    layout: layouts.three("geely-london-brand-launch")
  },
  {
    slug: "changan-europe-launch-2025",
    titleEn: "Changan European Brand Launch 2025, Mainz",
    titleZh: "长安汽车 2025 欧洲品牌发布｜美因茨",
    clientName: "Changan",
    clientNamePublic: true,
    sector: "automotive",
    category: "market-presence",
    sortDate: "2025-03-21",
    year: "2025",
    location: "Mainz, Germany",
    projectTypeEn: "European multi-brand launch",
    projectTypeZh: "欧洲多品牌发布",
    objectiveEn: "A European introduction connecting brand architecture with the product range.",
    objectiveZh: "把品牌架构与产品阵容放进同一场欧洲市场介绍。",
    contextEn:
      "On 21 March 2025, Changan introduced CHANGAN, DEEPAL and AVATR in Mainz at its Sharing the Future European brand launch. Presenting several brands together made the relationship between group ambition, brand identity and individual vehicles central to the event.",
    contextZh:
      "2025 年 3 月 21 日，长安在德国美因茨举行 Sharing the Future 欧洲品牌发布会，介绍 CHANGAN、DEEPAL 与 AVATR。多个品牌共同亮相，需要让受众理解集团方向、各品牌定位与具体车型之间的关系。",
    executionEn:
      "The selected material connects the main presentation with individual brand and vehicle moments, including the Sharing the Future stage and AVATR presentation. It preserves how the launch introduced the range within one event.",
    executionZh:
      "项目内容将主舞台与各品牌、车型的展示联系起来，包括 Sharing the Future 舞台与 AVATR 介绍，保留了同一场活动中品牌阵容的呈现关系。",
    rolesEn: ["Launch photography", "Brand and product imagery"],
    rolesZh: ["发布现场摄影", "品牌与产品影像"],
    primarySector: "automotive",
    primaryPath: "launch-in-the-uk",
    tags: ["launch", "mainz"],
    cover: [1, "hero"],
    layout: layouts.seven("changan-europe-launch-2025"),
    homepageOrder: 2
  },
  {
    slug: "catl-open-day-2025",
    titleEn: "CATL Open Day 2025, Munich",
    titleZh: "CATL Open Day 2025｜慕尼黑",
    clientName: "CATL",
    clientNamePublic: true,
    sector: "automotive",
    category: "industry-credibility",
    sortDate: "2025-09-07",
    year: "2025",
    location: "Munich, Germany",
    projectTypeEn: "European battery-technology event",
    projectTypeZh: "欧洲电池技术交流活动",
    objectiveEn: "Battery technology presented through Europe’s electric-mobility priorities.",
    objectiveZh: "把电池技术放进欧洲电动出行的产业议题。",
    contextEn:
      "At its 2025 Open Day in Munich, CATL presented Shenxing Pro in relation to Europe’s electric-mobility needs, including safety, battery life, range and charging. The event connected technical propositions with the questions that shape automotive industry communication.",
    contextZh:
      "CATL 在慕尼黑 2025 Open Day 中，围绕欧洲电动出行需求介绍神行 Pro，涉及安全、寿命、续航和充电。活动将技术主张与汽车产业沟通中需要回答的实际问题连接起来。",
    executionEn:
      "The project material includes presentation imagery around battery design and safety alongside the wider event setting. These are event communication assets; the technology and product claims are CATL’s.",
    executionZh:
      "项目影像包括电池设计、安全等技术介绍及整体活动场景，属于活动传播内容；技术与产品主张均来自 CATL。",
    rolesEn: ["Event photography", "Technical presentation imagery"],
    rolesZh: ["活动现场摄影", "技术发布影像"],
    primarySector: "automotive",
    primaryPath: "launch-in-the-uk",
    tags: ["industry", "event", "munich"],
    cover: [1, "hero"],
    layout: layouts.seven("catl-open-day-2025"),
    homepageOrder: 3
  },
  {
    slug: "yue-yunpeng-london-live",
    titleEn: "Yue Yunpeng London Live 2025",
    titleZh: "岳云鹏伦敦演出 2025",
    clientName: "Yue Yunpeng",
    clientNamePublic: true,
    sector: "events-roadshows",
    category: "institutional-talent",
    sortDate: "2025-06-01",
    year: "2025",
    location: "London, UK",
    projectTypeEn: "Chinese-language cultural performance",
    projectTypeZh: "华语文化演出",
    objectiveEn: "Chinese-language performance in a London audience context.",
    objectiveZh: "华语文化内容在伦敦的现场表达。",
    contextEn:
      "Yue Yunpeng’s London performance brought Chinese-language live entertainment into a British cultural setting. The performers and stage identity help communicate the form of the event without substituting attendance or box-office claims for its content.",
    contextZh:
      "岳云鹏伦敦演出将华语现场娱乐带到英国文化场景。演出人员与舞台识别共同说明活动的内容形态，无需用未经核实的观众规模或票房来替代项目本身。",
    executionEn:
      "The selected stage imagery preserves the relationship between the performers and the event’s visual identity.",
    executionZh: "所选舞台内容保留了演出人员与活动视觉识别之间的关系。",
    rolesEn: ["Live-performance photography", "Visual documentation"],
    rolesZh: ["现场演出摄影", "视觉记录"],
    primarySector: "media-entertainment",
    tags: ["performance", "culture", "london"],
    cover: [1, "hero"],
    layout: [
      {
        type: "pair",
        media: [id("yue-yunpeng-london-live", 1, "hero"), id("yue-yunpeng-london-live", 2, "cover")],
        split: "equal",
        align: "centre"
      }
    ]
  },
  {
    slug: "london-fashion-week-2025",
    titleEn: "London Fashion Week 2025 — Editorial Portraits",
    titleZh: "伦敦时装周 2025｜编辑肖像",
    sector: "fashion-beauty-apparel",
    category: "brand-evidence",
    sortDate: "2025-02-01",
    year: "2025",
    location: "London, UK",
    projectTypeEn: "London fashion editorial portraits",
    projectTypeZh: "伦敦时尚编辑肖像",
    objectiveEn: "Editorial fashion expression through a London setting.",
    objectiveZh: "通过伦敦场景形成时尚编辑表达。",
    contextEn:
      "This selection consists of editorial portraits made in the London Fashion Week context, using indoor and outdoor locations. It is portrait-led fashion content, rather than a record of runway or backstage production.",
    contextZh:
      "这组选集是在伦敦时装周语境中创作的室内外编辑肖像，以人物与服装表达为主，属于时尚编辑内容，并非秀场或后台制作记录。",
    executionEn:
      "The paired portraits use contrasting environments to give the styling a distinct editorial character.",
    executionZh: "肖像通过不同环境的对照，为服装与造型形成具有辨识度的编辑表达。",
    rolesEn: ["Editorial photography", "Image selection"],
    rolesZh: ["编辑摄影", "影像筛选"],
    primarySector: "fashion-beauty-apparel",
    tags: ["fashion-week", "editorial", "london"],
    cover: [1, "hero"],
    layout: [
      {
        type: "portrait-focus",
        media: [id("london-fashion-week-2025", 1, "hero"), id("london-fashion-week-2025", 2, "cover")]
      }
    ]
  },
  {
    slug: "leapmotor-iaa-2023",
    titleEn: "Leapmotor at IAA Mobility 2023, Munich",
    titleZh: "零跑汽车 IAA Mobility 2023｜慕尼黑",
    clientName: "Leapmotor",
    clientNamePublic: true,
    sector: "automotive",
    category: "industry-credibility",
    sortDate: "2023-09-01",
    year: "2023",
    location: "Munich, Germany",
    projectTypeEn: "Automotive industry exhibition",
    projectTypeZh: "汽车行业展会",
    objectiveEn: "A product story within Europe’s automotive exhibition landscape.",
    objectiveZh: "在欧洲汽车行业展会中呈现产品与品牌。",
    contextEn:
      "IAA Mobility 2023 brought automotive and mobility businesses into a shared Munich exhibition setting. Leapmotor’s presence placed its vehicles alongside wider industry discussion, where product detail, brand identity and the stand environment all shaped the introduction.",
    contextZh:
      "IAA Mobility 2023 在慕尼黑汇集汽车与出行企业。零跑的产品展示置于这一行业场景中，车型细节、品牌识别与展台环境共同构成面向欧洲受众的介绍。",
    executionEn:
      "The selected exhibition imagery links vehicle presentation with stand identity and the surrounding event. The contribution was content capture, with no stand design, construction or exhibition management role claimed.",
    executionZh:
      "项目内容将车辆展示、展台识别与周边展会场景相互连接。团队贡献是现场内容拍摄，不包含展台设计、搭建或展会统筹。",
    rolesEn: ["Exhibition photography", "Automotive product imagery"],
    rolesZh: ["展会摄影", "汽车产品影像"],
    primarySector: "automotive",
    primaryPath: "launch-in-the-uk",
    tags: ["exhibition", "IAA", "munich"],
    cover: [1, "hero"],
    layout: layouts.seven("leapmotor-iaa-2023"),
    homepageOrder: 4
  },
  {
    slug: "byd-bd11-london",
    titleEn: "BYD BD11 Double-Decker Bus Launch, London",
    titleZh: "BYD BD11 双层公交车伦敦发布",
    clientName: "BYD",
    clientNamePublic: true,
    sector: "automotive",
    category: "market-presence",
    location: "London, UK",
    projectTypeEn: "UK public-transport product launch",
    projectTypeZh: "英国公共交通产品发布",
    objectiveEn: "Electric mobility in the language of British public transport.",
    objectiveZh: "让新能源产品进入英国公共交通的具体语境。",
    contextEn:
      "BYD introduced the BD11 at the London Bus Museum in May 2024 as an electric double-decker designed for the UK. The setting connected battery technology with a familiar transport format. For an industry audience, the market question was how the vehicle fitted the practical context of British bus travel.",
    contextZh:
      "2024 年 5 月，BYD 在伦敦巴士博物馆发布面向英国的 BD11 纯电动双层公交车。熟悉的公交车型与当地交通场景，让电池技术不再只是参数介绍，也让行业受众能够从英国公共交通的实际需求理解这款产品。",
    executionEn:
      "The project selection brings the BD11 presentation and its British transport setting together. Product and event imagery gives the launch a clear context beyond a stand-alone vehicle photograph.",
    executionZh:
      "项目影像将 BD11 的发布环节与英国交通场景连接起来，使产品介绍保留了现场语境，而不只是孤立的车辆展示。",
    rolesEn: ["London launch photography", "Product and venue imagery"],
    rolesZh: ["伦敦发布摄影", "产品与场地影像"],
    primarySector: "automotive",
    primaryPath: "launch-in-the-uk",
    tags: ["bus", "launch", "london"],
    cover: [1, "hero"],
    coverFit: "contain",
    layout: layouts.seven("byd-bd11-london"),
    homepageOrder: 1
  },
  {
    slug: "agibot-london-launch",
    titleEn: "AGIBOT London Launch",
    titleZh: "AGIBOT 智元伦敦发布会",
    clientName: "AGIBOT",
    clientNamePublic: true,
    sector: "technology-ai",
    category: "industry-credibility",
    location: "London, UK",
    projectTypeEn: "Robotics product introduction",
    projectTypeZh: "机器人产品介绍活动",
    objectiveEn: "Making embodied intelligence tangible in a London technology setting.",
    objectiveZh: "在伦敦科技活动中，让具身智能拥有具体的产品表达。",
    contextEn:
      "The AGIBOT London event brought a technical presentation and robot displays into the same setting. For a complex product category, this offers a way to connect an explanation of the technology with a visible product form.",
    contextZh:
      "AGIBOT 伦敦活动将技术演讲与机器人展示安排在同一场景。对于具身智能这一复杂产品类别，现场表达可以把技术介绍与具体产品形态联系起来。",
    executionEn:
      "The project imagery connects the speaker-led introduction with robots in the display environment. It provides a concrete view of how the products appeared at the event.",
    executionZh: "项目影像将演讲介绍与展示环境中的机器人连接起来，呈现产品在此次活动中的具体亮相方式。",
    rolesEn: ["Technology-event photography", "Robot display imagery"],
    rolesZh: ["科技活动摄影", "机器人展示影像"],
    primarySector: "technology-ai-research",
    primaryPath: "launch-in-the-uk",
    tags: ["robotics", "technology", "london"],
    cover: [2, "cover"],
    coverFit: "contain",
    layout: layouts.three("agibot-london-launch")
  },
  {
    slug: "london-automotive-brand-film",
    titleEn: "London Automotive Brand Film",
    titleZh: "伦敦汽车品牌影片",
    clientName: "BYD",
    clientNamePublic: true,
    sector: "automotive",
    category: "brand-evidence",
    location: "London and England, UK",
    projectTypeEn: "UK automotive location production",
    projectTypeZh: "英国汽车实景制作",
    objectiveEn: "An automotive brand story grounded in recognisable British places.",
    objectiveZh: "以可识别的英国实景，承接汽车品牌的本地表达。",
    contextEn:
      "An automotive story set in London and the English countryside can move a product beyond an abstract international image. Streets, people and journeys give the vehicle a relationship with the places in which a local audience might encounter it.",
    contextZh:
      "伦敦街景与英格兰乡村，为汽车品牌提供了具体的当地生活参照。人物、道路与行驶场景让产品进入可识别的英国环境，使本地化表达超越单纯更换城市背景。",
    executionEn:
      "The available project material links London streets, interview imagery, vehicle movement and countryside locations. The team contribution described here is local production and imagery, without claiming the final edit or distribution.",
    executionZh:
      "现有项目内容连接伦敦街道、人物采访、车辆行驶与乡村实景。此处展示的团队贡献为本地制作与影像，不延伸至成片剪辑或投放发行。",
    rolesEn: ["UK location coordination", "Automotive visual production"],
    rolesZh: ["英国实景协调", "汽车视觉制作"],
    primarySector: "automotive",
    tags: ["brand-film", "location", "london"],
    cover: [1, "hero"],
    layout: [
      { type: "full", media: [id("london-automotive-brand-film", 1, "hero")] },
      {
        type: "pair",
        media: [
          id("london-automotive-brand-film", 2, "cover"),
          id("london-automotive-brand-film", 3, "gallery")
        ],
        split: "7-5"
      },
      { type: "offset", media: [id("london-automotive-brand-film", 4, "gallery")], side: "right" },
      {
        type: "triptych",
        media: [
          id("london-automotive-brand-film", 5, "gallery"),
          id("london-automotive-brand-film", 6, "gallery"),
          id("london-automotive-brand-film", 7, "gallery")
        ]
      }
    ],
    homepageOrder: 5
  },
  {
    slug: "beauty-fashion-brand-content",
    titleEn: "Selected Beauty & Fashion Brand Content",
    titleZh: "美妆与时尚品牌内容精选",
    contentType: "portfolio-series",
    sector: "fashion-beauty-apparel",
    category: "brand-evidence",
    location: "UK",
    projectTypeEn: "Beauty and fashion portfolio series",
    projectTypeZh: "美妆与时尚作品选集",
    objectiveEn: "Product, people and styling across consumer-brand content.",
    objectiveZh: "以产品、人物与造型，展示消费品牌的内容表达能力。",
    contextEn:
      "A portfolio series across beauty, skincare, fashion and retail imagery. The selection brings different projects and visual formats together to show how products and people can share the frame.",
    contextZh:
      "涵盖美妆、护肤、时尚与零售影像的作品选集，汇集不同项目与表现形式，展示产品与人物如何共同构成画面。",
    executionEn:
      "The selection spans product-led portraits, beauty imagery, apparel and retail settings. These are separate works, not one commissioned brand campaign.",
    executionZh:
      "选集包括以产品为核心的肖像、美妆、服装与零售场景，各作品相互独立，并非一次受托完成的整合品牌 campaign。",
    rolesEn: ["Photography", "Visual-content selection"],
    rolesZh: ["摄影", "视觉内容筛选"],
    primarySector: "fashion-beauty-apparel",
    tags: ["beauty", "fashion", "product"],
    cover: [1, "hero"],
    layout: [
      { type: "text-media", media: [id("beauty-fashion-brand-content", 1, "hero")], textKey: "series-intro" },
      {
        type: "pair",
        media: [
          id("beauty-fashion-brand-content", 2, "cover"),
          id("beauty-fashion-brand-content", 3, "gallery")
        ],
        split: "5-7"
      },
      {
        type: "triptych",
        media: [
          id("beauty-fashion-brand-content", 4, "gallery"),
          id("beauty-fashion-brand-content", 5, "gallery"),
          id("beauty-fashion-brand-content", 6, "gallery")
        ]
      },
      { type: "offset", media: [id("beauty-fashion-brand-content", 7, "gallery")], side: "right" }
    ]
  },
  {
    slug: "european-road-lifestyle",
    titleEn: "European Road & Lifestyle — Selected Work",
    titleZh: "欧洲汽车与生活方式影像选集",
    contentType: "portfolio-series",
    sector: "automotive",
    category: "brand-evidence",
    location: "Europe",
    projectTypeEn: "European automotive portfolio series",
    projectTypeZh: "欧洲汽车作品选集",
    objectiveEn: "Automotive lifestyle content with a European sense of place.",
    objectiveZh: "以欧洲道路与生活场景，呈现汽车品牌的当地相关性。",
    contextEn:
      "A portfolio series of automotive imagery across European roads and urban settings. It explores how the relationship between vehicle, movement and surroundings can give brand content a local context.",
    contextZh:
      "汇集欧洲道路与城市场景中的汽车影像，展示车辆、行驶状态与周边环境如何共同建立品牌内容的当地语境。",
    executionEn:
      "Selected road and city imagery shows different ways of placing vehicles within a European environment. The series is not presented as a continuing commissioned programme.",
    executionZh: "所选道路与城市影像展示了车辆进入欧洲环境的不同方式，不将其包装为持续委托的长期项目。",
    rolesEn: ["Automotive photography", "On-location image making"],
    rolesZh: ["汽车摄影", "实景影像创作"],
    primarySector: "automotive",
    tags: ["road", "lifestyle", "europe"],
    cover: [1, "hero"],
    layout: layouts.seven("european-road-lifestyle")
  }
];

type CaseNarrative = Pick<
  PortfolioProject,
  | "archetype"
  | "evidenceLevel"
  | "scope"
  | "capabilities"
  | "projectChallengeEn"
  | "projectChallengeZh"
  | "continuedValueEn"
  | "continuedValueZh"
  | "roleStatementEn"
  | "roleStatementZh"
  | "projectValueEn"
  | "projectValueZh"
>;
const caseNarratives: Record<string, CaseNarrative> = {
  "wang-linkai-london-concert": {
    projectChallengeEn:
      "Retain the artist’s performance identity alongside the atmosphere of a London live event.",
    continuedValueEn: [
      "This experience can inform future conversations about cultural content and brand relevance. Any talent or brand collaboration would be a separate future scope."
    ],
    projectChallengeZh: "在呈现艺人舞台形象的同时，保留伦敦演出现场的氛围。",
    continuedValueZh: [
      "这份经验可为未来文化内容与品牌相关性的讨论提供参考；艺人或品牌合作应作为新的项目范围单独沟通。"
    ],
    archetype: "talent-activation",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "editorial-selection"],
    capabilities: ["Event Documentation", "Content Production", "Post-project Assets"],
    roleStatementEn:
      "Our team contributed concert photography and editorial selection, covering the performer, stage atmosphere and finale.",
    roleStatementZh: "团队承担演唱会摄影与编辑选片，覆盖艺人表演、舞台氛围与收官场景。",
    projectValueEn: "A Chinese artist’s live identity in an overseas cultural setting.",
    projectValueZh: "中国艺人在海外文化现场的形象表达。"
  },
  "geely-london-brand-launch": {
    projectChallengeEn:
      "The challenge was to make the relationship between Geely design and the EX5 clear within the London launch, giving the product a local introduction without losing the wider brand story.",
    continuedValueEn: [
      "The material can support later introductions that need to connect product design with the UK launch setting."
    ],
    projectChallengeZh:
      "传播需要在伦敦发布场景中讲清吉利设计与 EX5 的关系，让产品拥有面向当地的介绍，同时保留完整的品牌背景。",
    continuedValueZh: ["这些内容可用于需要联系产品设计与英国发布场景的后续介绍。"],
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Our team covered the design presentation, EX5 display and audience environment through launch photography.",
    roleStatementZh: "团队以发布现场摄影覆盖设计介绍、EX5 展示与观众环境。",
    projectValueEn: "Making an international automotive brand relevant to a British audience.",
    projectValueZh: "让国际汽车品牌的表达与英国受众建立联系。"
  },
  "changan-europe-launch-2025": {
    projectChallengeEn:
      "A multi-brand launch needs both a coherent group story and recognisable product identities. The communication challenge was to keep that hierarchy legible across the stage presentation and vehicle displays.",
    continuedValueEn: [
      "This kind of launch content can give later brand and product introductions a consistent reference point."
    ],
    projectChallengeZh:
      "多品牌发布既需要统一的集团叙事，也需要清晰的品牌与产品识别。现场传播的难点，是让舞台介绍与车辆展示共同表达这层关系。",
    continuedValueZh: ["这类发布内容可为后续品牌与产品介绍提供一致的参照。"],
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Our team photographed the Mainz launch across presentations, vehicle reveals and guest viewing areas.",
    roleStatementZh: "团队承担美因茨发布现场摄影，覆盖品牌介绍、车辆亮相与嘉宾观看区域。",
    projectValueEn: "A European introduction connecting brand architecture with the product range.",
    projectValueZh: "把品牌架构与产品阵容放进同一场欧洲市场介绍。"
  },
  "catl-open-day-2025": {
    projectChallengeEn:
      "Technical presentations need enough context to explain why a feature matters. The communication challenge was to retain the relationship between the speaker, technical material and industry setting.",
    continuedValueEn: [
      "Keeping technical content in its presentation context can support later industry briefings and project introductions."
    ],
    projectChallengeZh:
      "技术发布不能只留下参数与术语。传播难点在于保留演讲者、技术内容与行业场景之间的关系，让受众看见技术议题所回应的需求。",
    continuedValueZh: ["保留技术内容的发布语境，可为后续行业介绍与项目沟通提供素材。"],
    archetype: "industry-event-presence",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Our team provided event photography of the speakers, technical presentations and audience setting in Munich.",
    roleStatementZh: "团队承担慕尼黑活动现场摄影，覆盖演讲者、技术发布内容与观众环境。",
    projectValueEn: "Battery technology presented through Europe’s electric-mobility priorities.",
    projectValueZh: "把电池技术放进欧洲电动出行的产业议题。"
  },
  "yue-yunpeng-london-live": {
    projectChallengeEn:
      "Make the performance format and stage relationship clear within a concise selection.",
    continuedValueEn: [
      "For future cultural projects, this experience is relevant to presenting the live format clearly in later introductions."
    ],
    projectChallengeZh: "以精炼内容呈现演出形式与舞台关系。",
    continuedValueZh: ["对于未来文化项目，这份经验与如何在后续介绍中清晰呈现演出形式有关。"],
    archetype: "talent-activation",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation"],
    capabilities: ["Event Documentation", "Content Production"],
    roleStatementEn:
      "Our team contributed live-performance photography showing the performers and stage environment.",
    roleStatementZh: "团队承担现场演出摄影，呈现演出人员与舞台环境。",
    projectValueEn: "Chinese-language performance in a London audience context.",
    projectValueZh: "华语文化内容在伦敦的现场表达。"
  },
  "london-fashion-week-2025": {
    projectChallengeEn:
      "Keep clothing, character and a sense of place in balance across contrasting settings.",
    continuedValueEn: [
      "The selection can help frame future fashion and brand-content briefs. It carries no claim of an official fashion-week appointment or show-production role."
    ],
    projectChallengeZh: "在不同场景中平衡服装、人物气质与地点感。",
    continuedValueZh: [
      "这组选集可作为未来时尚与品牌内容需求的沟通参考，不主张时装周官方委任或秀场制作身份。"
    ],
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["content-production", "editorial-selection"],
    capabilities: ["Content Production", "Post-project Assets"],
    roleStatementEn:
      "Our team contributed editorial photography and image selection for the London portraits.",
    roleStatementZh: "团队承担伦敦编辑肖像摄影与影像筛选。",
    projectValueEn: "Editorial fashion expression through a London setting.",
    projectValueZh: "通过伦敦场景形成时尚编辑表达。"
  },
  "leapmotor-iaa-2023": {
    projectChallengeEn:
      "In a busy exhibition, close product detail can lose its context and wide stand views can lose the product story. The communication task was to retain both the vehicle and its place within the industry event.",
    continuedValueEn: [
      "For exhibitors, a connected account of product and setting can support post-show introductions and internal reference."
    ],
    projectChallengeZh:
      "展会中，产品特写容易失去场景，展台全景又可能弱化产品信息。传播需要兼顾车辆本身与其所处的行业现场。",
    continuedValueZh: ["对于参展品牌，产品与场景相互关联的内容可用于展后介绍及内部参考。"],
    archetype: "industry-event-presence",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Our team contributed exhibition photography of the stand, vehicles, product details and visitor setting.",
    roleStatementZh: "团队承担展会摄影，覆盖展台、车辆、产品细节与观众环境。",
    projectValueEn: "A product story within Europe’s automotive exhibition landscape.",
    projectValueZh: "在欧洲汽车行业展会中呈现产品与品牌。"
  },
  "byd-bd11-london": {
    projectChallengeEn:
      "The communication challenge was to connect a new vehicle and its technology with an established public-transport setting, without reducing the launch to a product display.",
    continuedValueEn: [
      "For a brand planning a similar introduction, content of this kind can support product presentations and follow-up conversations about local relevance."
    ],
    projectChallengeZh:
      "这类发布的沟通难点，是把新车型与技术特点放进当地成熟的公交语境，而不止于展示一辆新车。",
    continuedValueZh: [
      "对于筹备同类发布的品牌，这类内容可用于产品介绍及后续沟通，帮助说明产品与当地需求的关系。"
    ],
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Our team contributed launch photography, bringing together the vehicle presentation, venue and audience setting.",
    roleStatementZh: "团队承担发布现场摄影，将车辆展示、场地与观众环境纳入同一组内容。",
    projectValueEn: "Electric mobility in the language of British public transport.",
    projectValueZh: "让新能源产品进入英国公共交通的具体语境。"
  },
  "agibot-london-launch": {
    projectChallengeEn:
      "The communication challenge was to connect the technical presentation with the robots on display without implying that a demonstration proved commercial readiness or buyer demand.",
    continuedValueEn: [
      "Such material can help a future product introduction explain both the technology topic and the event setting."
    ],
    projectChallengeZh:
      "沟通难点是连接技术介绍与机器人展示，同时不把一次活动演示等同于商业成熟度或购买需求的验证。",
    continuedValueZh: ["这类内容可为后续产品介绍提供技术议题与活动场景的共同参照。"],
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Our team photographed the technology presentation and robot displays within the London event.",
    roleStatementZh: "团队承担伦敦活动中的技术演讲与机器人展示摄影。",
    projectValueEn: "Making embodied intelligence tangible in a London technology setting.",
    projectValueZh: "在伦敦科技活动中，让具身智能拥有具体的产品表达。"
  },
  "london-automotive-brand-film": {
    projectChallengeEn:
      "The production challenge was to maintain a coherent vehicle story across urban, interview and countryside settings.",
    continuedValueEn: [
      "For brands planning UK content, this experience is relevant to making locations part of the product story and organising production around them."
    ],
    projectChallengeZh: "制作需要在城市、人物采访与乡村等不同场景之间，保留连贯的车辆与品牌表达。",
    continuedValueZh: [
      "对于计划在英国制作内容的品牌，这份经验与如何让场地服务产品表达、如何围绕实景组织制作有关。"
    ],
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["location-coordination", "local-production", "content-production"],
    capabilities: [
      "UK Location Coordination",
      "Local Production",
      "Content Production",
      "Brand Presentation",
      "Post-project Assets"
    ],
    roleStatementEn:
      "Selected team experience in UK location coordination and automotive visual production across London streets, interview settings and the English countryside.",
    roleStatementZh: "团队过往经验涵盖英国实景协调与汽车影像制作，涉及伦敦街道、人物采访与英格兰乡村场景。",
    projectValueEn: "An automotive brand story grounded in recognisable British places.",
    projectValueZh: "以可识别的英国实景，承接汽车品牌的本地表达。"
  },
  "beauty-fashion-brand-content": {
    projectChallengeEn:
      "Show the range of content approaches while preserving each image’s separate project context.",
    continuedValueEn: [
      "Useful as a reference for future briefs on product emphasis, styling and content format."
    ],
    projectChallengeZh: "展示内容形式的跨度，同时保留不同作品各自的项目属性。",
    continuedValueZh: ["可为未来项目中的产品重点、造型与内容形式提供参考。"],
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["content-production", "editorial-selection"],
    capabilities: ["Content Production", "Post-project Assets"],
    roleStatementEn:
      "The team’s contribution represented in this series is photography and visual-content selection across separate pieces of work.",
    roleStatementZh: "这组选集展示团队在不同作品中的摄影与视觉内容筛选能力。",
    projectValueEn: "Product, people and styling across consumer-brand content.",
    projectValueZh: "以产品、人物与造型，展示消费品牌的内容表达能力。"
  },
  "european-road-lifestyle": {
    projectChallengeEn:
      "Keep the vehicle central while allowing each road or city setting to contribute to the story.",
    continuedValueEn: [
      "For a future localisation brief, these works can provide a reference for setting, vehicle movement and tone."
    ],
    projectChallengeZh: "以车辆为主体，同时让道路与城市环境参与表达。",
    continuedValueZh: ["对于未来本地化内容需求，这些作品可作为场景、车辆动态与表达基调的参考。"],
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["content-production", "editorial-selection"],
    capabilities: ["Content Production", "Post-project Assets"],
    roleStatementEn:
      "The team’s contribution represented here is automotive photography and on-location image making across separate works.",
    roleStatementZh: "这组选集展示团队在不同作品中的汽车摄影与实景影像制作。",
    projectValueEn: "Automotive lifestyle content with a European sense of place.",
    projectValueZh: "以欧洲道路与生活场景，呈现汽车品牌的当地相关性。"
  }
};
const commercialOrder = [
  "byd-bd11-london",
  "changan-europe-launch-2025",
  "geely-london-brand-launch",
  "catl-open-day-2025",
  "leapmotor-iaa-2023",
  "agibot-london-launch",
  "london-automotive-brand-film",
  "wang-linkai-london-concert",
  "yue-yunpeng-london-live",
  "london-fashion-week-2025",
  "beauty-fashion-brand-content",
  "european-road-lifestyle"
];

const artDirection: Record<
  string,
  {
    preview: string;
    hero: string;
    previewPresentation: PreviewPresentation;
    heroLayout: HeroLayout;
    supporting?: string;
    detail?: string[];
    closing?: string[];
    focal?: Record<string, { desktop: { x: number; y: number }; mobile: { x: number; y: number } }>;
  }
> = {
  "wang-linkai-london-concert": {
    preview: id("wang-linkai-london-concert", 1, "hero"),
    hero: id("wang-linkai-london-concert", 1, "hero"),
    previewPresentation: "landscape-full",
    heroLayout: "wide",
    detail: [id("wang-linkai-london-concert", 3, "gallery")],
    focal: {
      [id("wang-linkai-london-concert", 2, "cover")]: {
        desktop: { x: 0.5, y: 0.42 },
        mobile: { x: 0.5, y: 0.38 }
      }
    }
  },
  "geely-london-brand-launch": {
    preview: id("geely-london-brand-launch", 1, "hero"),
    hero: id("geely-london-brand-launch", 3, "gallery"),
    previewPresentation: "landscape-full",
    heroLayout: "editorial-split"
  },
  "changan-europe-launch-2025": {
    preview: id("changan-europe-launch-2025", 3, "gallery"),
    hero: id("changan-europe-launch-2025", 2, "cover"),
    previewPresentation: "landscape-full",
    heroLayout: "wide",
    detail: [id("changan-europe-launch-2025", 4, "gallery"), id("changan-europe-launch-2025", 7, "gallery")],
    closing: [id("changan-europe-launch-2025", 6, "gallery")]
  },
  "catl-open-day-2025": {
    preview: id("catl-open-day-2025", 1, "hero"),
    hero: id("catl-open-day-2025", 1, "hero"),
    previewPresentation: "cinematic",
    heroLayout: "wide",
    detail: [id("catl-open-day-2025", 3, "gallery"), id("catl-open-day-2025", 6, "gallery")],
    closing: [id("catl-open-day-2025", 7, "gallery")]
  },
  "yue-yunpeng-london-live": {
    preview: id("yue-yunpeng-london-live", 1, "hero"),
    hero: id("yue-yunpeng-london-live", 1, "hero"),
    previewPresentation: "landscape-full",
    heroLayout: "natural",
    closing: [id("yue-yunpeng-london-live", 2, "cover")]
  },
  "london-fashion-week-2025": {
    preview: id("london-fashion-week-2025", 1, "hero"),
    supporting: id("london-fashion-week-2025", 2, "cover"),
    hero: id("london-fashion-week-2025", 2, "cover"),
    previewPresentation: "dual-image",
    heroLayout: "portrait",
    closing: [id("london-fashion-week-2025", 1, "hero")]
  },
  "leapmotor-iaa-2023": {
    preview: id("leapmotor-iaa-2023", 1, "hero"),
    hero: id("leapmotor-iaa-2023", 2, "cover"),
    previewPresentation: "landscape-full",
    heroLayout: "wide",
    detail: [id("leapmotor-iaa-2023", 4, "gallery"), id("leapmotor-iaa-2023", 6, "gallery")],
    closing: [id("leapmotor-iaa-2023", 7, "gallery")]
  },
  "byd-bd11-london": {
    preview: id("byd-bd11-london", 1, "hero"),
    hero: id("byd-bd11-london", 1, "hero"),
    previewPresentation: "landscape-full",
    heroLayout: "wide",
    detail: [id("byd-bd11-london", 3, "gallery")],
    closing: [id("byd-bd11-london", 7, "gallery")]
  },
  "agibot-london-launch": {
    preview: id("agibot-london-launch", 1, "hero"),
    hero: id("agibot-london-launch", 1, "hero"),
    previewPresentation: "landscape-full",
    heroLayout: "wide",
    closing: [id("agibot-london-launch", 3, "gallery")]
  },
  "london-automotive-brand-film": {
    preview: id("london-automotive-brand-film", 1, "hero"),
    hero: id("london-automotive-brand-film", 1, "hero"),
    previewPresentation: "cinematic",
    heroLayout: "wide",
    detail: [id("london-automotive-brand-film", 5, "gallery")],
    closing: [id("london-automotive-brand-film", 7, "gallery")]
  },
  "beauty-fashion-brand-content": {
    preview: id("beauty-fashion-brand-content", 5, "gallery"),
    hero: id("beauty-fashion-brand-content", 1, "hero"),
    previewPresentation: "landscape-full",
    heroLayout: "editorial-split",
    detail: [
      id("beauty-fashion-brand-content", 4, "gallery"),
      id("beauty-fashion-brand-content", 5, "gallery")
    ],
    closing: [id("beauty-fashion-brand-content", 7, "gallery")]
  },
  "european-road-lifestyle": {
    preview: id("european-road-lifestyle", 1, "hero"),
    supporting: id("european-road-lifestyle", 5, "gallery"),
    hero: id("european-road-lifestyle", 1, "hero"),
    previewPresentation: "dual-image",
    heroLayout: "portrait",
    closing: [id("european-road-lifestyle", 7, "gallery")]
  }
};

const mediaDecisionsFor = (slug: string, media: PortfolioMedia[]): CaseStudyMediaDecision[] => {
  const direction = artDirection[slug];
  return media.map((item, index) => {
    const portrait = item.width < item.height;
    const detail = direction.detail?.includes(item.id) ?? false;
    const closing = direction.closing?.includes(item.id) ?? index === media.length - 1;
    const role: MediaNarrativeRole =
      item.id === direction.hero
        ? "hero"
        : item.id === direction.preview
          ? "preview"
          : detail
            ? "detail"
            : closing
              ? "closing"
              : "editorial";
    const points = direction.focal?.[item.id];
    return {
      mediaId: item.id,
      role,
      safeCrop:
        (direction.previewPresentation === "landscape-full" ||
          direction.previewPresentation === "cinematic") &&
        item.id === direction.preview,
      galleryFit: "natural",
      width: detail ? "detail" : portrait ? "portrait" : role === "closing" ? "wide" : "editorial",
      maxDisplayWidth: detail ? 620 : portrait ? 760 : item.width < 1100 ? 1000 : 1320,
      focalPoint: points?.desktop ?? { x: 0.5, y: 0.5 },
      desktopFocalPoint: points?.desktop,
      mobileFocalPoint: points?.mobile
    };
  });
};

export const portfolioProjects: PortfolioProject[] = specs.map((spec, sortIndex) => {
  const series = spec.contentType === "portfolio-series";
  const media = mediaFor(spec.slug);
  const narrative = caseNarratives[spec.slug];
  return {
    id: spec.slug,
    slug: spec.slug,
    titleEn: spec.titleEn,
    titleZh: spec.titleZh,
    contentType: spec.contentType ?? "case-study",
    clientName: spec.clientName,
    clientNamePublic: spec.clientNamePublic ?? false,
    sector: spec.sector,
    category: spec.category,
    section: sortIndex < 7 ? "selected-projects" : "production-experience",
    sortDate: spec.sortDate,
    sortOrder: commercialOrder.indexOf(spec.slug) + 1,
    year: spec.year,
    location: spec.location,
    projectTypeEn: spec.projectTypeEn,
    projectTypeZh: spec.projectTypeZh,
    objectiveEn: spec.objectiveEn,
    objectiveZh: spec.objectiveZh,
    commercialObjectiveEn: spec.objectiveEn,
    commercialObjectiveZh: spec.objectiveZh,
    contextEn: spec.contextEn,
    contextZh: spec.contextZh,
    executionEn: spec.executionEn,
    executionZh: spec.executionZh,
    evidenceCreatedEn: [spec.executionEn],
    evidenceCreatedZh: [spec.executionZh],
    scopeBoundaryEn: series ? boundary.seriesEn : boundary.caseEn,
    scopeBoundaryZh: series ? boundary.seriesZh : boundary.caseZh,
    venusRoleEn: spec.rolesEn,
    venusRoleZh: spec.rolesZh,
    services: ["creative-production", spec.sector],
    primaryPath: spec.primaryPath ?? "create-in-the-uk",
    primarySector:
      spec.primarySector === "media-entertainment" ? "entertainment-culture" : spec.primarySector,
    tags: spec.tags,
    roleEn: spec.rolesEn,
    roleZh: spec.rolesZh,
    media,
    coverMediaId: id(spec.slug, spec.cover[0], spec.cover[1]),
    coverFit: spec.coverFit ?? "cover",
    layout: spec.layout,
    previewMediaId: artDirection[spec.slug].preview,
    heroMediaId: artDirection[spec.slug].hero,
    previewPresentation: artDirection[spec.slug].previewPresentation,
    heroLayout: artDirection[spec.slug].heroLayout,
    previewSupportingMediaId: artDirection[spec.slug].supporting,
    ...narrative,
    mediaDecisions: mediaDecisionsFor(spec.slug, media),
    mediaStatus: media.length ? "ready" : "none",
    evidenceStatus: "verified",
    evidence: [rightsEvidence],
    websiteUseApproved: true,
    mediaRightsApproved: true,
    copyrightApproved: true,
    publicStatus: "published",
    status: "completed",
    clientApproval: true,
    legalApproved: true,
    homepageFeatured: Boolean(spec.homepageOrder),
    homepageOrder: spec.homepageOrder,
    market: spec.location
  };
});

export const commercialCaseCategories: Record<CommercialCaseCategory, Record<"en" | "zh", string>> = {
  "market-presence": { en: "Market Entry & Brand Launches", zh: "市场进入与品牌发布" },
  "industry-credibility": { en: "Exhibitions & Industry Engagement", zh: "展会与行业交流" },
  "institutional-talent": { en: "Culture, Talent & Brand Experiences", zh: "文化、艺人与品牌体验" },
  "brand-evidence": { en: "Brand Localisation & Campaign Content", zh: "品牌本地化与传播内容" }
};
export const commercialCaseFilters = [
  { value: "all", label: { en: "All", zh: "全部" } },
  { value: "market-presence", label: commercialCaseCategories["market-presence"] },
  { value: "industry-credibility", label: commercialCaseCategories["industry-credibility"] },
  { value: "institutional-talent", label: commercialCaseCategories["institutional-talent"] },
  { value: "brand-evidence", label: commercialCaseCategories["brand-evidence"] }
] as const;
export const isPublishedPortfolioProject = (project: PortfolioProject) =>
  project.publicStatus === "published" &&
  project.evidenceStatus === "verified" &&
  Boolean(project.evidenceLevel) &&
  project.scope.length > 0 &&
  project.websiteUseApproved &&
  project.mediaRightsApproved &&
  project.copyrightApproved &&
  project.clientApproval &&
  project.legalApproved;
export const publishedPortfolioProjects = portfolioProjects
  .filter(isPublishedPortfolioProject)
  .sort((a, b) => a.sortOrder - b.sortOrder);
export const selectedProjects = publishedPortfolioProjects.filter(
  (project) => project.section === "selected-projects"
);
export const productionExperience = publishedPortfolioProjects.filter(
  (project) => project.section === "production-experience"
);
export const homepagePortfolioProjects = publishedPortfolioProjects
  .filter((project) => project.homepageFeatured)
  .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99))
  .slice(0, 10);
export const getProjectCover = (project: PortfolioProject) =>
  project.media.find((media) => media.id === project.previewMediaId) ?? project.media[0];
export const getProjectHero = (project: PortfolioProject) =>
  project.media.find((media) => media.id === project.heroMediaId) ?? project.media[0];
export const getMediaDecision = (project: PortfolioProject, mediaId: string) =>
  project.mediaDecisions.find((decision) => decision.mediaId === mediaId);
export const getNextPortfolioProject = (project: PortfolioProject) => {
  const index = publishedPortfolioProjects.findIndex((item) => item.slug === project.slug);
  return publishedPortfolioProjects[(index + 1) % publishedPortfolioProjects.length];
};
export function getProofPresentation(project: PortfolioProject): ProofPresentation {
  const tier: ProofTier = project.contentType === "portfolio-series" ? "capability" : "execution";
  return {
    tier,
    label:
      tier === "capability"
        ? { en: "Portfolio Series", zh: "作品系列" }
        : {
            en: "Selected team experience",
            zh: "团队项目经验"
          },
    businessObjective: { en: project.commercialObjectiveEn, zh: project.commercialObjectiveZh }
  };
}
export const homepageProofProjects = [
  "london-automotive-brand-film",
  "changan-europe-launch-2025",
  "byd-bd11-london"
]
  .map((slug) => publishedPortfolioProjects.find((project) => project.slug === slug))
  .filter((project): project is PortfolioProject => Boolean(project));
export const homepageEarlyProofProjects = [
  "changan-europe-launch-2025",
  "byd-bd11-london",
  "catl-open-day-2025"
]
  .map((slug) => publishedPortfolioProjects.find((project) => project.slug === slug))
  .filter((project): project is PortfolioProject => Boolean(project));
export const findPortfolioProject = (slug: string) =>
  portfolioProjects.find((project) => project.slug === slug);
export const findPublishedPortfolioProject = (slug: string) =>
  publishedPortfolioProjects.find((project) => project.slug === slug);
export const getRelatedPortfolioProjects = (project: PortfolioProject, limit = 3) =>
  publishedPortfolioProjects.filter((candidate) => candidate.slug !== project.slug).slice(0, limit);
export const findPortfolioMedia = (
  projectId: string,
  preferredCategory: PortfolioMedia["category"] = "hero"
) =>
  portfolioMediaManifest.records.find(
    (record) => record.projectId === projectId && record.category === preferredCategory
  ) ?? portfolioMediaManifest.records.find((record) => record.projectId === projectId);
export const portfolioMediaForPage = (path: string) =>
  portfolioMediaManifest.records.filter((record) => record.allowedPages.includes(path));
export const portfolioSectionLabels = {
  "selected-projects": { en: "Selected Projects", zh: "精选项目" },
  "production-experience": { en: "Production Experience", zh: "制作经验" },
  "production-scenarios": { en: "Production Scenarios", zh: "制作场景" }
} as const;
