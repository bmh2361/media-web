import type { CommercialProgress } from "@/content/cases/commercial-template";
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
  | "location-coordination"
  | "market-research"
  | "proposition-localisation"
  | "stakeholder-research"
  | "stakeholder-outreach"
  | "partnership-coordination"
  | "pilot-coordination"
  | "commercial-follow-up";
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
  commercialProgress?: CommercialProgress;
  id: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  eventNameEn: string;
  eventNameZh: string;
  participationSummaryEn: string;
  participationSummaryZh: string;
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
  roleStatementEn: string;
  roleStatementZh: string;
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
  caseEn: "Selected team experience. The contribution shown is described for this project.",
  caseZh: "团队项目经验；本页说明团队在该项目中参与的具体工作。",
  seriesEn: "Independent works selected from the team’s portfolio.",
  seriesZh: "选自团队作品的独立内容，保留各自项目属性。"
};
type Spec = {
  commercialProgress?: CommercialProgress;
  slug: string;
  titleEn: string;
  titleZh: string;
  eventNameEn: string;
  eventNameZh: string;
  participationSummaryEn: string;
  participationSummaryZh: string;
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
    titleEn: "Wang Linkai | London Concert",
    titleZh: "王琳凯（小鬼）｜伦敦演唱会",
    eventNameEn: "Wang Linkai (Xiao Gui) London Concert 2026",
    eventNameZh: "王琳凯（小鬼）伦敦演唱会 2026",
    participationSummaryEn: "Concert photography and editorial image selection.",
    participationSummaryZh: "团队参与演唱会摄影与编辑选片。",
    clientName: "Wang Linkai (Xiao Gui)",
    clientNamePublic: true,
    sector: "events-roadshows",
    category: "institutional-talent",
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
      "Artist portraits and the wider live setting create a short visual account of the performance and its closing moments.",
    executionZh: "艺人肖像与较完整的现场场景，呈现表演及收官时刻。",
    rolesEn: ["Live-event photography", "Editorial image selection"],
    rolesZh: ["现场活动摄影", "编辑影像筛选"],
    primarySector: "media-entertainment",
    tags: ["concert", "photography", "london"],
    cover: [2, "cover"],
    layout: layouts.three("wang-linkai-london-concert")
  },
  {
    slug: "geely-london-brand-launch",
    titleEn: "Geely | UK Brand Launch",
    titleZh: "吉利汽车｜英国品牌发布",
    eventNameEn: "Geely London Brand Launch 2025",
    eventNameZh: "吉利伦敦品牌发布会 2025",
    participationSummaryEn: "Launch photography connecting the design presentation and EX5 display.",
    participationSummaryZh: "团队参与设计介绍与 EX5 展示的发布现场摄影。",
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
      "Geely launched its namesake brand in the UK in London on 23 October 2025, introducing the EX5 as its first UK model. The London presentation brought the brand’s design perspective and the EX5 into the same introduction for a British audience.",
    contextZh:
      "2025 年 10 月 23 日，吉利在伦敦发布其同名品牌进入英国市场，并介绍首款英国车型 EX5。这场伦敦发布将设计、产品与品牌身份放在同一次面向英国受众的介绍中。",
    executionEn:
      "The selection connects the Geely Global Design presentation, EX5 and the London launch audience.",
    executionZh: "选集将 Geely Global Design 设计演讲、EX5 与伦敦发布现场观众连接起来。",
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
    titleEn: "Changan | European Brand Launch",
    titleZh: "长安汽车｜欧洲品牌发布",
    eventNameEn: "Changan European Brand Launch 2025, Mainz",
    eventNameZh: "长安汽车 2025 欧洲品牌发布｜美因茨",
    participationSummaryEn: "Launch photography across the brand presentations and vehicle displays.",
    participationSummaryZh: "团队参与品牌介绍与车辆展示的发布现场摄影。",
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
      "2025 年 3 月 21 日，长安在德国美因茨举行 Sharing the Future 欧洲品牌发布会，介绍 CHANGAN、DEEPAL 与 AVATR。多个品牌共同亮相，集团介绍、各品牌身份与具体车型构成此次发布的不同层次。",
    executionEn:
      "The Sharing the Future stage and AVATR presentation appear alongside vehicle imagery, showing the relationship between the collective launch and individual brands.",
    executionZh: "Sharing the Future 主舞台、AVATR 介绍与车辆影像共同呈现整体发布与各品牌之间的关系。",
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
    titleEn: "CATL | Munich Technology Launch",
    titleZh: "宁德时代｜慕尼黑技术发布",
    eventNameEn: "CATL Open Day 2025, Munich",
    eventNameZh: "CATL Open Day 2025｜慕尼黑",
    participationSummaryEn: "Event photography of speakers, technical material and the audience setting.",
    participationSummaryZh: "团队参与演讲、技术内容与观众环境的活动摄影。",
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
      "Battery design and safety presentations, including Wave Cell + CTB and No Propagation 3.0, appear within CATL’s event setting.",
    executionZh:
      "电池设计与安全介绍，包括 Wave Cell + CTB 和 No Propagation 3.0，出现在宁德时代的活动现场画面中。",
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
    titleEn: "Yue Yunpeng | London Live",
    titleZh: "岳云鹏｜伦敦演出",
    eventNameEn: "Yue Yunpeng London Live 2025",
    eventNameZh: "岳云鹏伦敦演出 2025",
    participationSummaryEn: "Live-performance photography of the performers and stage.",
    participationSummaryZh: "团队参与演出人员与舞台场景的现场摄影。",
    clientName: "Yue Yunpeng",
    clientNamePublic: true,
    sector: "events-roadshows",
    category: "institutional-talent",
    year: "2025",
    location: "London, UK",
    projectTypeEn: "Chinese-language cultural performance",
    projectTypeZh: "华语文化演出",
    objectiveEn: "Chinese-language performance in a London audience context.",
    objectiveZh: "华语文化内容在伦敦的现场表达。",
    contextEn:
      "Yue Yunpeng’s London performance brought Chinese-language live entertainment into a British cultural setting. The performers and stage identity communicate the form of the live show.",
    contextZh: "岳云鹏伦敦演出将华语现场娱乐带到英国文化场景。演出人员与舞台识别共同说明活动的内容形态。",
    executionEn: "The selected stage images focus on performers together within the show’s visual setting.",
    executionZh: "所选舞台影像以同台演出人员及演出视觉环境为中心。",
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
    titleEn: "London Fashion | Editorial Portraits",
    titleZh: "伦敦时尚｜编辑肖像",
    eventNameEn: "London Fashion Week 2025 — Editorial Portraits",
    eventNameZh: "伦敦时装周 2025｜编辑肖像",
    participationSummaryEn: "Editorial portrait photography and image selection.",
    participationSummaryZh: "团队参与编辑肖像摄影与影像筛选。",
    sector: "fashion-beauty-apparel",
    category: "brand-evidence",
    year: "2025",
    location: "London, UK",
    projectTypeEn: "London fashion editorial portraits",
    projectTypeZh: "伦敦时尚编辑肖像",
    objectiveEn: "Editorial fashion expression through a London setting.",
    objectiveZh: "通过伦敦场景形成时尚编辑表达。",
    contextEn:
      "This selection consists of editorial portraits made in the London Fashion Week context, using indoor and outdoor locations. People, clothing and the London setting are the subjects of this editorial work.",
    contextZh: "这组选集是在伦敦时装周语境中创作的室内外编辑肖像，以人物与服装表达为主，属于时尚编辑内容。",
    executionEn:
      "The paired portraits contrast an outdoor London setting with an interior, while keeping people and clothing at the centre.",
    executionZh: "两组肖像以伦敦户外与室内环境形成对照，人物与服装始终是画面主体。",
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
    titleEn: "Leapmotor | IAA Mobility",
    titleZh: "零跑汽车｜IAA Mobility",
    eventNameEn: "Leapmotor at IAA Mobility 2023, Munich",
    eventNameZh: "零跑汽车 IAA Mobility 2023｜慕尼黑",
    participationSummaryEn: "Exhibition photography of vehicles, product details and the stand environment.",
    participationSummaryZh: "团队参与车辆、产品细节与展台环境的展会摄影。",
    clientName: "Leapmotor",
    clientNamePublic: true,
    sector: "automotive",
    category: "industry-credibility",
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
      "Stand views, vehicle images and close product details describe different scales of the same exhibition presence.",
    executionZh: "展台场景、整车画面与产品细节，从不同尺度呈现同一次参展。",
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
    year: "2024",
    titleEn: "BYD BD11 | London Product Launch",
    titleZh: "BYD BD11｜伦敦产品发布",
    eventNameEn: "BYD BD11 Double-Decker Bus Launch, London",
    eventNameZh: "BYD BD11 双层公交车伦敦发布",
    participationSummaryEn: "Launch photography of the BD11, venue and audience.",
    participationSummaryZh: "团队参与 BD11 发布摄影，涵盖车辆、场地与观众。",
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
      "BYD introduced the BD11 at the London Bus Museum in May 2024 as an electric double-decker designed for the UK. The setting connected battery technology with a familiar transport format. The venue placed the new model within Britain’s established bus culture.",
    contextZh:
      "2024 年 5 月，BYD 在伦敦巴士博物馆发布面向英国的 BD11 纯电动双层公交车。熟悉的公交车型与当地交通场景，让电池技术不再只是参数介绍，也让行业受众能够从英国公共交通的实际需求理解这款产品。",
    executionEn:
      "The selection moves between the BD11 display, the launch venue and people gathered around the vehicle. Together they show the scale and setting of the product introduction.",
    executionZh: "所选内容包括 BD11 展示、发布场地与车辆周围的人群，共同呈现这款产品亮相时的尺度与环境。",
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
    titleEn: "AGIBOT | London Product Launch",
    titleZh: "AGIBOT 智元｜伦敦产品发布",
    eventNameEn: "AGIBOT London Launch",
    eventNameZh: "AGIBOT 智元伦敦发布会",
    participationSummaryEn: "Photography of the technical presentation and robot displays.",
    participationSummaryZh: "团队参与技术演讲与机器人展示的现场摄影。",
    clientName: "AGIBOT",
    clientNamePublic: true,
    sector: "technology-ai",
    category: "industry-credibility",
    location: "London, UK",
    projectTypeEn: "Robotics product introduction",
    projectTypeZh: "机器人产品介绍活动",
    objectiveEn: "Connecting technical explanation and real product displays in a clear brand introduction.",
    objectiveZh: "让技术介绍与真实产品展示形成清晰的品牌表达。",
    contextEn:
      "The AGIBOT London event brought a technical presentation and robot displays into the same setting. For a complex product category, this offers a way to connect an explanation of the technology with a visible product form.",
    contextZh:
      "AGIBOT 伦敦活动将技术演讲与机器人展示安排在同一场景。对于具身智能这一复杂产品类别，现场表达可以把技术介绍与具体产品形态联系起来。",
    executionEn:
      "Speaker-led presentation images sit alongside robots in the display area, showing both the technical introduction and the physical products.",
    executionZh: "技术演讲与展示区内的机器人相互对应，既呈现介绍内容，也呈现真实产品形态。",
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
    titleEn: "Automotive Film | UK Locations",
    titleZh: "汽车品牌影片｜英国实景",
    eventNameEn: "London Automotive Brand Film",
    eventNameZh: "伦敦汽车品牌影片",
    participationSummaryEn: "UK location coordination, local production and automotive imagery.",
    participationSummaryZh: "团队参与英国实景协调、本地制作与汽车视觉制作。",
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
      "The material shown combines London street scenes, interview imagery, vehicle movement and countryside locations. These different settings give the film’s automotive subject an everyday British context.",
    executionZh:
      "现有项目内容包括伦敦街景、人物采访画面、车辆行驶与乡村实景，以不同环境呈现汽车与英国日常生活的联系。",
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
    titleEn: "Beauty & Fashion | Selected Work",
    titleZh: "美妆与时尚｜独立作品选集",
    eventNameEn: "Selected Beauty & Fashion Brand Content",
    eventNameZh: "美妆与时尚品牌内容精选",
    participationSummaryEn: "Photography and visual selection across separate works.",
    participationSummaryZh: "选集展示不同作品中的摄影与视觉内容筛选。",
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
      "Product emphasis, styling and retail context vary across this selection of independent works.",
    executionZh: "不同独立作品分别侧重产品、造型和零售环境，展示多种内容形式。",
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
    titleEn: "European Roads | Selected Work",
    titleZh: "欧洲汽车与生活方式｜独立作品选集",
    eventNameEn: "European Road & Lifestyle — Selected Work",
    eventNameZh: "欧洲汽车与生活方式影像选集",
    participationSummaryEn: "Automotive photography and location imagery across separate works.",
    participationSummaryZh: "选集展示不同作品中的汽车摄影与实景影像创作。",
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
      "Road and city images give each vehicle a different relationship with its surroundings in this selection of independent works.",
    executionZh: "道路与城市影像呈现车辆和周围环境的不同关系，各幅内容来自独立作品。",
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
  "archetype" | "evidenceLevel" | "scope" | "capabilities" | "roleStatementEn" | "roleStatementZh"
>;
const caseNarratives: Record<string, CaseNarrative> = {
  "wang-linkai-london-concert": {
    archetype: "talent-activation",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "editorial-selection"],
    capabilities: ["Event Documentation", "Content Production", "Post-project Assets"],
    roleStatementEn:
      "Concert photography and editorial selection covered the performer, stage atmosphere and finale. The team’s selected images pair the artist’s stage presence with the shared experience of the London show.",
    roleStatementZh:
      "团队承担演唱会摄影与编辑选片，涵盖艺人表演、舞台氛围与收官场景。所选影像将艺人的舞台表现与伦敦演出的共同参与感联系起来。"
  },
  "geely-london-brand-launch": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Launch photography covered the Geely design presentation, EX5 display and audience environment. The team’s contribution keeps the design discussion alongside the vehicle introduced to the UK audience.",
    roleStatementZh:
      "团队以发布现场摄影覆盖吉利设计介绍、EX5 展示与观众环境。在这组内容中，设计演讲与车型展示相互参照，呈现品牌如何介绍其英国市场产品。"
  },
  "changan-europe-launch-2025": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "The team photographed the Mainz launch, from brand presentations and vehicle reveals to guest viewing areas. The coverage brings the shared launch setting and individual vehicle displays into one account of the event.",
    roleStatementZh:
      "团队承担美因茨发布现场摄影，涵盖品牌介绍、车辆亮相与嘉宾观看区域。拍摄内容同时保留共同发布场景与各车型展示，使多品牌亮相的关系在影像中清楚可见。"
  },
  "catl-open-day-2025": {
    archetype: "industry-event-presence",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "The team photographed speakers, technical presentation material and the audience at the Munich event. The resulting selection places CATL’s battery explanations within the live industry discussion.",
    roleStatementZh:
      "团队承担慕尼黑活动现场摄影，拍摄演讲者、技术发布内容与观众环境。所选内容将宁德时代的电池技术介绍放回现场交流语境，保留讲解内容与活动场景的联系。"
  },
  "yue-yunpeng-london-live": {
    archetype: "talent-activation",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation"],
    capabilities: ["Event Documentation", "Content Production"],
    roleStatementEn:
      "The team photographed the live performance, concentrating on the performers and stage environment. The images show the relationship between the people on stage and the event’s visual identity.",
    roleStatementZh:
      "团队承担现场演出摄影，以演出人员及舞台环境为主要内容。画面呈现表演者之间的舞台关系，并保留活动自身的视觉识别。"
  },
  "london-fashion-week-2025": {
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["content-production", "editorial-selection"],
    capabilities: ["Content Production", "Post-project Assets"],
    roleStatementEn:
      "The team contributed editorial portrait photography and image selection in London. Indoor and outdoor portraits give clothing, pose and surroundings different weight within the frame.",
    roleStatementZh:
      "团队承担伦敦编辑肖像摄影与影像筛选。室内外肖像分别呈现服装、人物姿态与周边环境在画面中的不同关系。"
  },
  "leapmotor-iaa-2023": {
    archetype: "industry-event-presence",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "The team’s exhibition photography covered the stand, vehicles, product details and visitor setting. Wide views establish Leapmotor’s presence at IAA Mobility; closer images concentrate on the vehicles within that setting.",
    roleStatementZh:
      "团队承担展会摄影，涵盖展台、车辆、产品细节与观众环境。全景交代零跑在 IAA Mobility 的展示场景，近景则把注意力带回其中的车辆与产品信息。"
  },
  "byd-bd11-london": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "The team photographed the BD11 launch, covering the vehicle presentation, museum setting and audience. Bringing those subjects into the same body of work places the product introduction within its British public-transport setting.",
    roleStatementZh:
      "团队承担 BD11 发布现场摄影，拍摄车辆展示、博物馆场地与观众环境。这组内容把产品亮相与英国公共交通场景放在一起，保留了此次介绍的当地背景。"
  },
  "agibot-london-launch": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "The team contributed photography to the launch’s visual content, covering the technical talk, robot displays and event environment. The work shown here connects the product explanation with the robots presented in the room.",
    roleStatementZh:
      "团队参与发布现场的视觉内容制作，围绕技术演讲、机器人展示与活动环境呈现产品信息。本案例展示的具体工作为现场摄影与展示内容记录。"
  },
  "london-automotive-brand-film": {
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
      "The team’s experience on this film covers UK location coordination, local production and automotive visual production. The work spans London streets, interview settings and the English countryside, grounding the vehicle imagery in recognisable British places.",
    roleStatementZh:
      "团队在该影片中的经验涵盖英国实景协调、本地制作与汽车视觉制作。工作涉及伦敦街道、人物采访和英格兰乡村场景，让车辆影像与具体的英国环境形成联系。"
  },
  "beauty-fashion-brand-content": {
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["content-production", "editorial-selection"],
    capabilities: ["Content Production", "Post-project Assets"],
    roleStatementEn:
      "The team’s photography and visual-content selection across separate pieces of work brings together product-led portraits, beauty, apparel and retail imagery. Each piece retains its own subject and setting.",
    roleStatementZh:
      "团队在不同作品中参与摄影与视觉内容筛选。选集汇集产品肖像、美妆、服装与零售影像，各自保留独立的主体与场景。"
  },
  "european-road-lifestyle": {
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["content-production", "editorial-selection"],
    capabilities: ["Content Production", "Post-project Assets"],
    roleStatementEn:
      "This selection represents the team’s automotive photography and on-location image making across separate works. Vehicles are shown in relation to roads, movement and urban surroundings.",
    roleStatementZh:
      "选集展示团队在不同作品中的汽车摄影与实景影像创作，呈现车辆与道路、行驶状态及城市环境的关系。"
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
    eventNameEn: spec.eventNameEn,
    eventNameZh: spec.eventNameZh,
    participationSummaryEn: spec.participationSummaryEn,
    participationSummaryZh: spec.participationSummaryZh,
    contentType: spec.contentType ?? "case-study",
    clientName: spec.clientName,
    clientNamePublic: spec.clientNamePublic ?? false,
    sector: spec.sector,
    category: spec.category,
    section: sortIndex < 7 ? "selected-projects" : "production-experience",
    sortDate: spec.sortDate,
    sortOrder: commercialOrder.indexOf(spec.slug) + 1,
    commercialProgress: spec.commercialProgress,
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
  "market-presence": { en: "Brand Launch Documentation", zh: "品牌发布影像" },
  "industry-credibility": { en: "Exhibitions & Industry Events", zh: "展会与行业交流" },
  "institutional-talent": { en: "Culture, Talent & Brand Experiences", zh: "文化、艺人与品牌体验" },
  "brand-evidence": { en: "Brand & Campaign Content", zh: "品牌与传播内容" }
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
