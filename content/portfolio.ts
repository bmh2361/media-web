import generatedMedia from "@/content/portfolio-media.generated.json";
import type { ExpertiseSector, ProjectPath } from "@/content/information-architecture";
import { publicCommercialCaseNarratives } from "@/content/evidence/public-case-narratives";
import type { PublicCommercialCaseNarrative } from "@/content/evidence/public-case-narratives";

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
  roleStatementEn: string;
  roleStatementZh: string;
  projectValueEn: string;
  projectValueZh: string;
  structureEn: string[];
  structureZh: string[];
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
  workTier: 1 | 2 | 3;
  engagementType:
    | "launch"
    | "exhibition"
    | "industry-event"
    | "local-production"
    | "brand-content"
    | "cultural-event";
  geography: "UK" | "Germany" | "Europe" | "Multi-market";
  commercialNarrative?: PublicCommercialCaseNarrative;
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
  evidenceCount?: number;
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
    projectTypeEn: "Live performance visual documentation",
    projectTypeZh: "现场演出视觉记录",
    objectiveEn: "A reusable visual record of a London live performance",
    objectiveZh: "形成可复用的伦敦现场演出视觉记录",
    contextEn: "Concert photography spanning performance, stage atmosphere and the audience-facing finale.",
    contextZh: "演唱会摄影记录，覆盖表演、舞台氛围与面向观众的收官画面。",
    executionEn: "Captured wide and portrait perspectives across the live stage environment.",
    executionZh: "以全景与肖像视角记录现场舞台环境。",
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
    projectTypeEn: "UK brand-launch visual documentation",
    projectTypeZh: "英国品牌发布视觉记录",
    objectiveEn: "UK market-presence evidence from Geely's London brand launch",
    objectiveZh: "形成吉利伦敦品牌发布的英国市场落地证据",
    contextEn:
      "Visual documentation from Geely Auto's London launch, including design presentation, EX5 display and audience context.",
    contextZh: "吉利汽车伦敦发布的视觉记录，包括设计演讲、EX5 展示与观众环境。",
    executionEn: "Captured the presentation, display screens and live audience setting.",
    executionZh: "拍摄演讲、展示屏幕与现场观众环境。",
    rolesEn: ["Launch-context photography", "UK-facing visual documentation"],
    rolesZh: ["发布场景摄影", "面向英国市场的视觉记录"],
    primarySector: "automotive",
    primaryPath: "launch-in-the-uk",
    tags: ["brand-launch", "geely", "london"],
    cover: [2, "cover"],
    layout: layouts.three("geely-london-brand-launch")
  },
  {
    slug: "changan-europe-launch-2025",
    titleEn: "Changan at IAA Mobility 2025 — European Expansion",
    titleZh: "长安汽车 IAA Mobility 2025｜欧洲市场扩张",
    clientName: "Changan",
    clientNamePublic: true,
    sector: "automotive",
    category: "market-presence",
    sortDate: "2025-09-08",
    year: "2025",
    location: "Munich, Germany",
    projectTypeEn: "European launch-context brand evidence",
    projectTypeZh: "欧洲发布场景品牌证据",
    objectiveEn: "European-market brand visibility in an international launch setting",
    objectiveZh: "国际发布场景中的欧洲市场品牌可见度",
    contextEn: "Visual coverage across presentation, vehicle reveal and guest viewing moments.",
    contextZh: "欧洲品牌发布的视觉记录，覆盖舞台演示、车辆亮相与嘉宾观看场景。",
    executionEn: "Captured the stage, vehicles and guest context in Munich.",
    executionZh: "在慕尼黑拍摄舞台、车辆与嘉宾环境。",
    rolesEn: ["Launch-context documentation", "Visual assets showing the European setting"],
    rolesZh: ["发布场景记录", "面向欧洲的品牌资产"],
    primarySector: "automotive",
    primaryPath: "launch-in-the-uk",
    tags: ["launch", "munich"],
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
    sortDate: "2025-07-01",
    year: "2025",
    location: "Munich, Germany",
    projectTypeEn: "Visual evidence for European industry communications",
    projectTypeZh: "欧洲行业传播视觉证据",
    objectiveEn: "International communications in a professional stakeholder setting",
    objectiveZh: "专业利益相关方场景中的国际传播",
    contextEn: "A live presentation environment including stage, speakers and audience moments.",
    contextZh: "现场发布环境，包括舞台、演讲者与观众画面。",
    executionEn: "Captured the presentation and stakeholder setting in Munich.",
    executionZh: "在慕尼黑记录发布与利益相关方现场环境。",
    rolesEn: ["Event documentation", "International communications assets"],
    rolesZh: ["活动记录", "国际传播资产"],
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
    projectTypeEn: "Cultural performance visual documentation",
    projectTypeZh: "文化演出视觉记录",
    objectiveEn: "A concise visual record of a Chinese-language live performance in London",
    objectiveZh: "形成华语现场演出在伦敦落地的精炼视觉记录",
    contextEn: "Two stage views documenting the performers and live presentation environment.",
    contextZh: "两张舞台画面记录演出人员与现场呈现环境。",
    executionEn: "Captured complementary wide stage perspectives.",
    executionZh: "拍摄相互补充的舞台全景视角。",
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
    titleEn: "London Fashion Week 2025 — Editorial & Event Content",
    titleZh: "伦敦时装周 2025｜时尚编辑与活动内容",
    sector: "fashion-beauty-apparel",
    category: "brand-evidence",
    sortDate: "2025-02-01",
    year: "2025",
    location: "London, UK",
    projectTypeEn: "Fashion editorial content",
    projectTypeZh: "时尚编辑内容",
    objectiveEn: "Fashion editorial imagery created during London Fashion Week",
    objectiveZh: "在伦敦时装周语境中创作时尚编辑视觉证据",
    contextEn: "A two-image editorial pairing across outdoor and indoor London settings.",
    contextZh: "由伦敦户外与室内场景组成的双图编辑影像。",
    executionEn: "Created complementary full-length fashion portraits.",
    executionZh: "创作相互呼应的全身时尚肖像。",
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
    projectTypeEn: "Brand evidence from a European industry setting",
    projectTypeZh: "欧洲行业现场品牌证据",
    objectiveEn: "European industry presence and stakeholder context",
    objectiveZh: "欧洲行业存在与利益相关方语境",
    contextEn: "Exhibition-floor coverage including the stand, vehicles, details and visitor interaction.",
    contextZh: "展会现场视觉记录，包括展台、车辆、产品细节与观众互动。",
    executionEn: "Captured the exhibition environment and product details.",
    executionZh: "拍摄展会环境与产品细节。",
    rolesEn: ["Exhibition documentation", "Automotive brand evidence"],
    rolesZh: ["展会记录", "汽车品牌证据"],
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
    projectTypeEn: "UK market-presence documentation",
    projectTypeZh: "英国市场落地项目记录",
    objectiveEn: "Evidence of UK market presence from a London product introduction",
    objectiveZh: "围绕伦敦产品亮相建立英国市场落地证据",
    contextEn: "Photography covering the BD11 vehicle, venue and audience context.",
    contextZh: "覆盖 BD11 车辆、场地与观众环境的摄影记录。",
    executionEn: "Captured the vehicle and presentation setting.",
    executionZh: "拍摄车辆与展示现场环境。",
    rolesEn: ["London launch documentation", "UK-facing brand evidence"],
    rolesZh: ["伦敦发布记录", "面向英国的品牌证据"],
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
    titleEn: "AGIBOT UK Launch 2026, London",
    titleZh: "AGIBOT 智元英国发布会 2026｜伦敦",
    clientName: "AGIBOT",
    clientNamePublic: true,
    sector: "technology-ai",
    category: "industry-credibility",
    sortDate: "2026-06-30",
    year: "2026",
    location: "London, UK",
    projectTypeEn: "Robotics launch visual documentation",
    projectTypeZh: "机器人发布视觉记录",
    objectiveEn: "A visual record of the embodied-robotics brand’s London event",
    objectiveZh: "形成具身机器人品牌伦敦活动的视觉证据",
    contextEn:
      "Event photographs showing a technical presentation and two robots in the display environment.",
    contextZh: "活动照片呈现技术演讲与展示环境中的两款机器人。",
    executionEn: "Captured the speaker and product displays across landscape and portrait formats.",
    executionZh: "以横幅与竖幅画面记录演讲者与产品展示。",
    rolesEn: ["Technology-event photography", "Product display documentation"],
    rolesZh: ["科技活动摄影", "产品展示记录"],
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
    projectTypeEn: "On-location automotive brand imagery in the UK",
    projectTypeZh: "英国实景汽车品牌影像",
    objectiveEn: "London-localised international brand evidence",
    objectiveZh: "伦敦本地化国际品牌证据",
    contextEn:
      "A UK automotive story combining streets, interview imagery, vehicle movement and countryside locations.",
    contextZh: "结合街景、人物采访、车辆行驶与乡村地点的英国汽车故事影像。",
    executionEn: "Produced imagery across London and English countryside settings.",
    executionZh: "在伦敦与英格兰乡村场景制作影像。",
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
    projectTypeEn: "Selected visual-content series",
    projectTypeZh: "精选视觉内容系列",
    objectiveEn: "A curated portfolio showcasing beauty, product, fashion and retail-content capabilities",
    objectiveZh: "集中展示美妆、产品、时尚与零售内容能力",
    contextEn:
      "A mixed portfolio series spanning beauty devices, cosmetics, footwear, skincare, fashion portraiture and retail display.",
    contextZh: "涵盖美妆仪器、化妆品、鞋履、护肤、时尚肖像与零售陈列的综合选集。",
    executionEn: "Selected and sequenced seven distinct visual-content formats.",
    executionZh: "筛选并编排七种不同的视觉内容形式。",
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
    titleEn: "European Automotive Asset Programme",
    titleZh: "欧洲汽车品牌资产项目",
    contentType: "portfolio-series",
    sector: "automotive",
    category: "brand-evidence",
    location: "Europe",
    projectTypeEn: "Road and lifestyle automotive photography",
    projectTypeZh: "道路与生活方式汽车摄影",
    objectiveEn: "A selected programme of European automotive brand assets",
    objectiveZh: "欧洲汽车品牌资产精选项目",
    contextEn: "Automotive photography across open roads and European city settings.",
    contextZh: "在欧洲公路与城市环境中拍摄的汽车影像。",
    executionEn: "Selected vehicle-in-motion and environmental frames.",
    executionZh: "筛选车辆行驶与环境关系画面。",
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
  | "roleStatementEn"
  | "roleStatementZh"
  | "projectValueEn"
  | "projectValueZh"
  | "structureEn"
  | "structureZh"
>;
const caseNarratives: Record<string, CaseNarrative> = {
  "wang-linkai-london-concert": {
    archetype: "talent-activation",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "editorial-selection"],
    capabilities: ["Event Documentation", "Content Production", "Post-project Assets"],
    roleStatementEn:
      "Venus Bridge handled live-event photography and editorial image selection within the London performance setting.",
    roleStatementZh: "Venus Bridge 负责伦敦演出现场的视觉记录与编辑选片。",
    projectValueEn:
      "A concise, approved visual record preserving the performer, stage atmosphere and audience-facing finale for continued use.",
    projectValueZh: "形成一组经批准的精炼视觉记录，保留表演者、舞台氛围与面向观众的收官场景，供后续使用。",
    structureEn: [
      "Assess the live stage and audience setting",
      "Document performance and atmosphere from complementary viewpoints",
      "Curate the approved public image selection"
    ],
    structureZh: ["观察现场舞台与观众环境", "以互补视角记录表演与现场氛围", "筛选获准公开使用的影像"]
  },
  "geely-london-brand-launch": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Venus Bridge delivered visual documentation of the London launch environment, covering the design presentation, EX5 display and audience context.",
    roleStatementZh: "Venus Bridge 完成伦敦发布现场的视觉记录，覆盖设计演讲、EX5 展示与观众环境。",
    projectValueEn:
      "An approved set of launch-context assets preserving the product, presentation and visible UK market setting.",
    projectValueZh: "形成一组经批准的发布场景资产，保留产品、演讲与可见的英国市场环境。",
    structureEn: [
      "Identify the presentation, product and audience context",
      "Capture the live launch across landscape and portrait formats",
      "Deliver an approved public visual record"
    ],
    structureZh: ["明确演讲、产品与观众环境", "以横竖画幅记录发布现场", "交付获准公开使用的视觉记录"]
  },
  "changan-europe-launch-2025": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Venus Bridge documented the Munich launch setting across the stage, vehicle reveal and guest viewing environment.",
    roleStatementZh: "Venus Bridge 记录慕尼黑发布现场，覆盖舞台、车辆亮相与嘉宾观看环境。",
    projectValueEn:
      "A coherent visual record of Changan's visible European launch presence, spanning product, people and event context.",
    projectValueZh: "形成连贯的欧洲发布现场记录，覆盖产品、人员与活动环境。",
    structureEn: [
      "Map the visible launch moments",
      "Document stage, vehicles and guest context",
      "Select a coherent set of visual assets showing the European setting"
    ],
    structureZh: ["梳理可见的发布关键场景", "记录舞台、车辆与嘉宾环境", "筛选连贯的欧洲场景视觉资产"]
  },
  "catl-open-day-2025": {
    archetype: "industry-event-presence",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Venus Bridge documented the Munich presentation environment, including speakers, technical screens and the professional audience setting.",
    roleStatementZh: "Venus Bridge 记录慕尼黑发布环境，包括演讲者、技术屏幕与专业观众现场。",
    projectValueEn:
      "Approved event material preserving CATL's presentation, technical screens and professional stakeholder environment.",
    projectValueZh: "形成经批准的活动内容，保留 CATL 的演讲、技术屏幕与专业利益相关方环境。",
    structureEn: [
      "Assess the technical presentation setting",
      "Capture speakers, screens and audience context",
      "Preserve a concise public event record"
    ],
    structureZh: ["观察技术演讲环境", "记录演讲者、屏幕与观众语境", "沉淀精炼的公开活动记录"]
  },
  "yue-yunpeng-london-live": {
    archetype: "talent-activation",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation"],
    capabilities: ["Event Documentation", "Content Production"],
    roleStatementEn:
      "Venus Bridge delivered complementary wide-stage documentation of the London performance.",
    roleStatementZh: "Venus Bridge 以互补的舞台全景完成伦敦演出的视觉记录。",
    projectValueEn:
      "A focused two-image public record clearly showing the performers and the London live setting.",
    projectValueZh: "以两张核心画面形成公开记录，清楚呈现演出人员与伦敦现场语境。",
    structureEn: [
      "Establish the full stage context",
      "Capture complementary performance views",
      "Deliver the approved public selection"
    ],
    structureZh: ["建立完整舞台语境", "记录互补的演出视角", "交付获准公开使用的精选画面"]
  },
  "london-fashion-week-2025": {
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["content-production", "editorial-selection"],
    capabilities: ["Content Production", "Post-project Assets"],
    roleStatementEn:
      "Venus Bridge created and selected a complementary pair of full-length editorial portraits in London Fashion Week settings.",
    roleStatementZh: "Venus Bridge 在伦敦时装周语境中创作并筛选一组相互呼应的全身编辑肖像。",
    projectValueEn:
      "A compact editorial asset pair showing two distinct London settings while preserving the full portrait compositions.",
    projectValueZh: "形成一组精炼编辑资产，在保留完整人物构图的同时呈现两种伦敦场景。",
    structureEn: [
      "Set two distinct editorial contexts",
      "Create complementary full-length portraits",
      "Select the final approved pair"
    ],
    structureZh: ["建立两种不同的编辑场景", "创作相互呼应的全身肖像", "筛选最终获准公开的双图"]
  },
  "leapmotor-iaa-2023": {
    archetype: "industry-event-presence",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Venus Bridge documented Leapmotor's visible IAA Mobility presence across the stand, vehicles, product details and visitor environment.",
    roleStatementZh:
      "Venus Bridge 记录零跑汽车在 IAA Mobility 的现场呈现，覆盖展台、车辆、产品细节与观众环境。",
    projectValueEn:
      "A reusable exhibition record connecting product detail with the wider European industry setting.",
    projectValueZh: "形成可复用的展会记录，将产品细节与欧洲行业现场语境连接起来。",
    structureEn: [
      "Establish the exhibition and launch context",
      "Document stand, vehicles, details and visitors",
      "Sequence the material from scale to product evidence"
    ],
    structureZh: ["建立展会与发布语境", "记录展台、车辆、细节与观众", "按现场规模到产品证据编排素材"]
  },
  "byd-bd11-london": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Venus Bridge delivered on-site visual documentation of the BD11 product introduction in London, covering the vehicle, venue and audience setting.",
    roleStatementZh: "Venus Bridge 完成 BD11 产品亮相的伦敦现场视觉记录，覆盖车辆、场地与观众环境。",
    projectValueEn:
      "An approved visual record preserving a recognisable UK product presence and the live presentation setting.",
    projectValueZh: "形成经批准的视觉记录，保留清晰可辨的英国产品亮相与现场发布环境。",
    structureEn: [
      "Identify the vehicle and venue context",
      "Document product, presentation and audience",
      "Deliver a coherent visual record of the UK setting"
    ],
    structureZh: ["明确车辆与场地语境", "记录产品、演示与观众", "交付连贯的英国场景视觉记录"]
  },
  "agibot-london-launch": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["visual-documentation", "content-production"],
    capabilities: ["Event Documentation", "Brand Presentation", "Post-project Assets"],
    roleStatementEn:
      "Venus Bridge documented the London technology-event setting across the technical presentation and two product displays.",
    roleStatementZh: "Venus Bridge 记录伦敦科技活动现场，覆盖技术演讲与两款产品展示。",
    projectValueEn:
      "A concise set of event assets connecting the speaker, robotics products and their London display environment.",
    projectValueZh: "形成精炼活动资产，将演讲者、机器人产品与伦敦展示环境联系起来。",
    structureEn: [
      "Establish the technical presentation context",
      "Capture speaker and product displays",
      "Balance landscape-format environmental shots with complete portrait-format product views"
    ],
    structureZh: ["建立技术演讲语境", "记录演讲者与产品展示", "用横向环境与完整竖向产品画面形成平衡"]
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
      "Venus Bridge coordinated UK locations and produced automotive imagery across London streets, interview, vehicle-movement and countryside settings.",
    roleStatementZh:
      "Venus Bridge 协调英国实景，并在伦敦街道、人物采访、车辆行驶与乡村场景中完成汽车影像制作。",
    projectValueEn:
      "A location-led UK visual story linking recognisable London settings, people, vehicle movement and wider English settings.",
    projectValueZh: "形成以英国实景为线索的视觉故事，连接伦敦辨识度、人物、车辆行驶与英格兰环境。",
    structureEn: [
      "Structure the story around recognisable UK settings",
      "Coordinate London and countryside locations",
      "Produce interview, movement and environmental imagery",
      "Sequence the material as a reusable brand story"
    ],
    structureZh: [
      "围绕可识别的英国场景组织故事",
      "协调伦敦与乡村实景",
      "制作采访、行驶与环境影像",
      "将素材编排为可复用的品牌故事"
    ]
  },
  "beauty-fashion-brand-content": {
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["content-production", "editorial-selection"],
    capabilities: ["Content Production", "Post-project Assets"],
    roleStatementEn:
      "This capability selection brings together photography and visual-content curation across beauty, product, fashion and retail formats.",
    roleStatementZh: "本能力选集汇集美妆、产品、时尚与零售形式中的摄影及视觉内容筛选。",
    projectValueEn: "A curated portfolio showcasing a range of product-led and people-led visual formats.",
    projectValueZh: "形成一组精选能力内容，展示产品与人物视觉形式的跨度。",
    structureEn: [
      "Review distinct content formats",
      "Select distinct product and portrait imagery",
      "Sequence the material as capability evidence"
    ],
    structureZh: ["审阅不同内容形式", "筛选不重复的产品与人物证据", "按能力证据逻辑编排素材"]
  },
  "european-road-lifestyle": {
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["content-production", "editorial-selection"],
    capabilities: ["Content Production", "Post-project Assets"],
    roleStatementEn:
      "This capability selection brings together automotive photography and on-location image making across European road and city settings.",
    roleStatementZh: "本能力选集汇集欧洲公路与城市环境中的汽车摄影及实景影像创作。",
    projectValueEn:
      "A curated visual set demonstrating our ability to capture vehicles in motion across varied European environments.",
    projectValueZh: "形成精选视觉内容，展示在不同欧洲环境中创作车辆行驶与环境关系画面的能力。",
    structureEn: [
      "Review road, city and environmental contexts",
      "Select complementary vehicle-in-motion frames",
      "Sequence the material as capability evidence"
    ],
    structureZh: ["审阅公路、城市与环境场景", "筛选互补的车辆行驶画面", "按能力证据逻辑编排素材"]
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
  const commercialNarrative = publicCommercialCaseNarratives[spec.slug];
  const workTier = commercialNarrative ? 1 : spec.slug === "london-automotive-brand-film" ? 2 : 3;
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
    evidenceCreatedEn: [`${spec.evidenceCount ?? media.length} approved public images.`],
    evidenceCreatedZh: [`${spec.evidenceCount ?? media.length} 张已获公开使用批准的影像。`],
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
    market: spec.location,
    workTier,
    engagementType:
      commercialNarrative?.engagementType ??
      (spec.slug === "london-automotive-brand-film"
        ? "local-production"
        : spec.category === "institutional-talent"
          ? "cultural-event"
          : "brand-content"),
    geography:
      commercialNarrative?.geography ??
      (spec.location.includes("Germany") ? "Germany" : spec.location.includes("UK") ? "UK" : "Europe"),
    commercialNarrative
  };
});

export const commercialCaseCategories: Record<CommercialCaseCategory, Record<"en" | "zh", string>> = {
  "market-presence": { en: "Market Entry & Launch", zh: "市场进入与发布" },
  "industry-credibility": { en: "Industry & Exhibitions", zh: "行业与展会" },
  "institutional-talent": { en: "Partnerships & Institutions", zh: "合作与机构" },
  "brand-evidence": { en: "Brand & Content", zh: "品牌与内容" }
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
            en: project.clientNamePublic ? "Client Project" : "Project Record",
            zh: project.clientNamePublic ? "客户项目" : "项目记录"
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
