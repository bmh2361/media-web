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
  | "market-facing-presentation"
  | "brand-presentation"
  | "presentation-selection"
  | "local-execution"
  | "location-coordination";
export type CaseCapability =
  | "Market-facing Presentation"
  | "Local Brand Expression"
  | "Brand Presentation"
  | "Local Execution"
  | "UK Location Coordination"
  | "Local Market Assets";
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
  eventNameEn: string;
  eventNameZh: string;
  marketOutcomeEn: string;
  marketOutcomeZh: string;
  strategicRelevanceEn: string;
  strategicRelevanceZh: string;
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
  seriesEn: "Selected experience across independent local market projects.",
  seriesZh: "精选独立项目经验，呈现不同本地市场语境。"
};
type Spec = {
  publicStatus?: PortfolioPublicationStatus;
  slug: string;
  titleEn: string;
  titleZh: string;
  eventNameEn: string;
  eventNameZh: string;
  marketOutcomeEn: string;
  marketOutcomeZh: string;
  strategicRelevanceEn: string;
  strategicRelevanceZh: string;
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
    publicStatus: "private",
    titleEn: "Wang Linkai | London Concert",
    titleZh: "王琳凯（小鬼）｜伦敦演唱会",
    eventNameEn: "Wang Linkai (Xiao Gui) London Concert 2026",
    eventNameZh: "王琳凯（小鬼）伦敦演唱会 2026",
    participationSummaryEn:
      "Our team supported the UK-facing presentation of Wang Linkai’s live identity in London.",
    participationSummaryZh: "团队参与王琳凯伦敦演出的本地呈现，连接艺人身份与海外受众场景。",
    clientName: "Wang Linkai (Xiao Gui)",
    clientNamePublic: true,
    sector: "events-roadshows",
    category: "institutional-talent",
    year: "2026",
    location: "London, UK",
    marketOutcomeEn:
      "The concert established a tangible London audience encounter for the artist, giving an existing Chinese cultural identity a specific overseas expression.",
    marketOutcomeZh: "演唱会让艺人与伦敦受众形成真实的现场接触，使原有的中国文化身份在海外获得具体表达。",
    strategicRelevanceEn:
      "The experience adds an audience perspective to our cross-border work: local presence must connect with how people encounter and understand an international proposition.",
    strategicRelevanceZh:
      "这类经验为团队的跨境工作补充了受众视角：海外落地需要回应当地人如何接触、理解并感知一个来自中国的形象。",
    projectTypeEn: "Overseas live music event",
    projectTypeZh: "海外音乐演出",
    objectiveEn: "A Chinese artist’s live identity connects with an overseas audience in London.",
    objectiveZh: "中国艺人的现场表达与伦敦海外受众建立联系。",
    contextEn:
      "Wang Linkai’s 2026 London concert brought a Chinese artist’s live identity into a UK audience setting. Cultural activity of this kind provides a concrete context for understanding how an established home-market presence travels overseas.",
    contextZh:
      "王琳凯 2026 伦敦演唱会将中国艺人的舞台表达带入英国受众场景。这类文化项目为理解国内知名度如何转化为海外可感知的存在提供了具体参照。",
    executionEn:
      "The performance, stage atmosphere and finale shaped the local audience experience. Our contribution connected the artist’s identity with these defining moments of the London appearance.",
    executionZh: "团队围绕表演、舞台氛围与收官时刻参与本地呈现，将艺人身份与伦敦演出的具体体验连接起来。",
    rolesEn: ["Our team supported the UK-facing presentation of Wang Linkai’s live identity in London."],
    rolesZh: ["团队参与王琳凯伦敦演出的本地呈现，连接艺人身份与海外受众场景。"],
    primarySector: "media-entertainment",
    tags: ["concert", "local-presence", "london"],
    cover: [2, "cover"],
    layout: layouts.three("wang-linkai-london-concert")
  },
  {
    slug: "geely-london-brand-launch",
    titleEn: "Geely | UK Brand Launch",
    titleZh: "吉利汽车｜英国品牌发布",
    eventNameEn: "Geely London Brand Launch 2025",
    eventNameZh: "吉利伦敦品牌发布会 2025",
    participationSummaryEn:
      "Our team supported Geely’s UK launch presentation, linking the EX5 and design story to a British audience.",
    participationSummaryZh: "团队参与吉利英国发布呈现，将 EX5、设计理念与英国受众的理解相衔接。",
    clientName: "Geely Auto",
    clientNamePublic: true,
    sector: "automotive",
    category: "market-presence",
    sortDate: "2025-10-23",
    year: "2025",
    location: "London, UK",
    marketOutcomeEn:
      "The London launch gave Geely a physical and narrative presence in the UK, linking its international identity with a specific model and a British audience.",
    marketOutcomeZh:
      "伦敦发布让吉利在英国形成了具体的产品与品牌呈现，将国际品牌身份、首款车型与英国受众连接起来。",
    strategicRelevanceEn:
      "The project shows our understanding of how a Chinese automotive entrant becomes locally recognisable through product, positioning and launch execution.",
    strategicRelevanceZh:
      "这一项目体现了团队对中国汽车品牌英国落地的理解：产品介绍、市场定位与本地呈现需要形成一致表达。",
    projectTypeEn: "UK brand and product launch",
    projectTypeZh: "英国品牌与产品发布",
    objectiveEn: "An international automotive group becomes a tangible proposition for the UK market.",
    objectiveZh: "让国际汽车集团的实力转化为英国市场可感知的产品主张。",
    contextEn:
      "Geely introduced its namesake brand in London on 23 October 2025, with the EX5 as its first UK model. Bringing design, product and brand identity together made the group’s international scale relevant to a specific British market introduction.",
    contextZh:
      "2025 年 10 月 23 日，吉利在伦敦发布其同名品牌进入英国市场，并介绍首款英国车型 EX5。设计、车型和品牌身份共同构成这次市场介绍，将集团的国际布局落实到英国受众面前。",
    executionEn:
      "Geely Global Design’s presentation, the EX5 display and the London audience formed the local launch context. Our contribution connected the design explanation with the vehicle’s physical presence.",
    executionZh:
      "团队围绕 Geely Global Design 设计介绍、EX5 展示与伦敦现场受众参与本地呈现，让设计理念与真实车型保持联系。",
    rolesEn: [
      "Our team supported Geely’s UK launch presentation, linking the EX5 and design story to a British audience."
    ],
    rolesZh: ["团队参与吉利英国发布呈现，将 EX5、设计理念与英国受众的理解相衔接。"],
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
    participationSummaryEn:
      "Our team contributed to the European-facing presentation of Changan’s brands and product range.",
    participationSummaryZh: "团队参与长安面向欧洲的品牌与产品呈现，衔接集团布局与当地市场认知。",
    clientName: "Changan",
    clientNamePublic: true,
    sector: "automotive",
    category: "market-presence",
    sortDate: "2025-03-21",
    year: "2025",
    location: "Mainz, Germany",
    marketOutcomeEn:
      "The Mainz launch gave Changan’s European ambitions a shared platform, making the relationship between its brands and product range visible to an international audience.",
    marketOutcomeZh:
      "美因茨发布为长安欧洲布局建立了集中亮相的平台，让国际受众能够同时认识集团旗下品牌及其产品阵容。",
    strategicRelevanceEn:
      "This experience informs our work with Chinese groups that need to translate a complex brand portfolio into a legible European market introduction.",
    strategicRelevanceZh:
      "这一经验有助于团队理解多品牌中国企业进入欧洲时，如何将复杂的品牌架构转化为当地市场能够理解的进入路径。",
    projectTypeEn: "European multi-brand launch",
    projectTypeZh: "欧洲多品牌发布",
    objectiveEn: "A multi-brand automotive group establishes a shared European market proposition.",
    objectiveZh: "以多品牌布局建立面向欧洲的整体市场主张。",
    contextEn:
      "On 21 March 2025, Changan introduced CHANGAN, DEEPAL and AVATR in Mainz at its Sharing the Future European brand launch. The combined introduction connected the group’s international ambition with distinct brands and vehicles in a competitive European market.",
    contextZh:
      "2025 年 3 月 21 日，长安在德国美因茨举行 Sharing the Future 欧洲品牌发布，介绍 CHANGAN、DEEPAL 与 AVATR。多品牌共同亮相，需要让欧洲受众同时理解集团布局、品牌差异及产品定位。",
    executionEn:
      "The main-stage introduction, AVATR presentation and vehicle displays provided different entry points into the group’s proposition. Our contribution connected those elements within the European launch setting.",
    executionZh: "团队的参与围绕主舞台介绍、AVATR 展示及车辆阵容展开，让整体发布与各品牌的市场表达形成联系。",
    rolesEn: [
      "Our team contributed to the European-facing presentation of Changan’s brands and product range."
    ],
    rolesZh: ["团队参与长安面向欧洲的品牌与产品呈现，衔接集团布局与当地市场认知。"],
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
    participationSummaryEn:
      "Our team supported CATL’s technology presentation within Munich’s European mobility industry context.",
    participationSummaryZh: "团队参与宁德时代在慕尼黑的技术呈现，衔接中国电池创新与欧洲出行产业语境。",
    clientName: "CATL",
    clientNamePublic: true,
    sector: "automotive",
    category: "industry-credibility",
    sortDate: "2025-09-07",
    year: "2025",
    location: "Munich, Germany",
    marketOutcomeEn:
      "The Munich programme placed CATL’s battery proposition within a European industrial setting, linking technology leadership with locally relevant mobility priorities.",
    marketOutcomeZh:
      "慕尼黑项目将宁德时代的电池技术主张置于欧洲产业场景中，让技术优势与当地出行需求形成明确联系。",
    strategicRelevanceEn:
      "The experience informs our work with industrial companies whose European positioning depends on technical credibility and relevance to the wider supply chain.",
    strategicRelevanceZh:
      "这一经验有助于服务依赖技术可信度与产业链相关性的中国工业企业，理解其欧洲落地所需的行业语境。",
    projectTypeEn: "European battery-technology event",
    projectTypeZh: "欧洲电池技术交流活动",
    objectiveEn: "Chinese battery innovation enters Europe’s mobility industry conversation.",
    objectiveZh: "让中国电池技术进入欧洲出行产业的核心讨论。",
    contextEn:
      "CATL’s 2025 Open Day in Munich placed Shenxing Pro within Europe’s electric-mobility priorities: safety, battery life, range and charging. The German automotive setting connected a Chinese technology proposition with the practical concerns of a European industrial ecosystem.",
    contextZh:
      "宁德时代在慕尼黑 2025 Open Day 围绕安全、寿命、续航和充电介绍神行 Pro。德国汽车产业环境使中国电池技术与欧洲电动出行的实际需求直接相遇，构成鲜明的 B2B 产业语境。",
    executionEn:
      "Technical presentations, including Wave Cell + CTB and No Propagation 3.0, sat alongside the company’s wider industry presence. Our contribution connected these technical explanations with the Munich stakeholder-facing setting.",
    executionZh:
      "团队围绕 Wave Cell + CTB、No Propagation 3.0 等技术介绍及产业交流场景参与呈现，将具体技术说明与慕尼黑的行业环境相衔接。",
    rolesEn: [
      "Our team supported CATL’s technology presentation within Munich’s European mobility industry context."
    ],
    rolesZh: ["团队参与宁德时代在慕尼黑的技术呈现，衔接中国电池创新与欧洲出行产业语境。"],
    primarySector: "automotive",
    primaryPath: "launch-in-the-uk",
    tags: ["industry", "event", "munich"],
    cover: [1, "hero"],
    layout: layouts.seven("catl-open-day-2025"),
    homepageOrder: 3
  },
  {
    slug: "yue-yunpeng-london-live",
    publicStatus: "private",
    titleEn: "Yue Yunpeng | London Live",
    titleZh: "岳云鹏｜伦敦演出",
    eventNameEn: "Yue Yunpeng London Live 2025",
    eventNameZh: "岳云鹏伦敦演出 2025",
    participationSummaryEn:
      "Our team contributed to the local presentation of Yue Yunpeng’s Chinese-language performance in London.",
    participationSummaryZh: "团队参与岳云鹏伦敦演出的本地呈现，衔接华语文化内容与英国现场语境。",
    clientName: "Yue Yunpeng",
    clientNamePublic: true,
    sector: "events-roadshows",
    category: "institutional-talent",
    year: "2025",
    location: "London, UK",
    marketOutcomeEn:
      "The London appearance brought a Chinese-language performance proposition into a UK cultural setting, creating a concrete point of contact with an overseas audience.",
    marketOutcomeZh: "伦敦演出将华语表演带入英国文化场景，为内容与海外受众建立了具体的接触点。",
    strategicRelevanceEn:
      "The project demonstrates the value of cultural context in cross-border activity, where local relevance can depend on preserving identity as well as adapting presentation.",
    strategicRelevanceZh:
      "该项目说明跨境落地需要理解文化语境：既保持内容本身的身份，也让呈现方式与当地环境相衔接。",
    projectTypeEn: "Chinese-language cultural performance",
    projectTypeZh: "华语文化演出",
    objectiveEn: "Chinese-language cultural identity finds a live setting in the UK.",
    objectiveZh: "让华语文化身份在英国形成具体的线下呈现。",
    contextEn:
      "Yue Yunpeng’s 2025 London performance placed Chinese-language entertainment in a British cultural setting. It illustrates a form of overseas presence in which cultural familiarity and a local audience encounter meet.",
    contextZh:
      "岳云鹏 2025 伦敦演出将华语娱乐带入英国文化场景。熟悉的文化表达与海外现场受众相遇，体现了文化项目建立本地存在的一种路径。",
    executionEn:
      "The performers and stage identity carried the programme’s Chinese-language character into the London setting. Our contribution supported a presentation that kept both the cultural identity and local context visible.",
    executionZh: "团队围绕演出人员与舞台识别参与呈现，使华语文化特色与伦敦现场环境保持联系。",
    rolesEn: [
      "Our team contributed to the local presentation of Yue Yunpeng’s Chinese-language performance in London."
    ],
    rolesZh: ["团队参与岳云鹏伦敦演出的本地呈现，衔接华语文化内容与英国现场语境。"],
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
    titleEn: "London Fashion | Local Market Expression",
    titleZh: "伦敦时尚｜本地市场表达",
    eventNameEn: "London Fashion Week 2025 — Local Market Expression",
    eventNameZh: "伦敦时装周 2025｜本地市场表达",
    participationSummaryEn:
      "Our team contributed to fashion presentation grounded in London’s people, clothing and local settings.",
    participationSummaryZh: "团队参与以伦敦人物、服装与当地环境为基础的时尚呈现，积累本地化表达经验。",
    sector: "fashion-beauty-apparel",
    category: "brand-evidence",
    year: "2025",
    location: "London, UK",
    marketOutcomeEn:
      "The work gave the fashion proposition a recognisable London setting, showing how local context can make an international style relevant to a particular place.",
    marketOutcomeZh: "项目为时尚表达建立了可识别的伦敦场景，体现了国际化风格如何通过当地环境获得具体相关性。",
    strategicRelevanceEn:
      "The experience informs our understanding of localisation for consumer brands, where setting and cultural cues shape how a proposition is understood.",
    strategicRelevanceZh:
      "这一经验有助于团队理解消费品牌的本地化：环境与文化线索会直接影响当地受众如何理解产品主张。",
    projectTypeEn: "Fashion market localisation",
    projectTypeZh: "时尚市场本地化",
    objectiveEn: "Fashion presentation takes on a recognisable London context.",
    objectiveZh: "让时尚表达进入可识别的伦敦市场语境。",
    contextEn:
      "The work was developed in the London Fashion Week context, across indoor and outdoor settings. It explores how people, clothing and place make a fashion proposition locally recognisable.",
    contextZh:
      "这组项目形成于伦敦时装周语境，涉及室内与户外环境。人物、服装与场景共同说明时尚表达如何建立当地识别度。",
    executionEn:
      "London interiors and outdoor settings offered contrasting local contexts for clothing and personal style. Our contribution kept the fashion proposition connected to the environment in which it was presented.",
    executionZh:
      "团队通过伦敦室内外场景中的服装与人物表达，参与时尚主张的本地呈现，让产品风格与当地环境保持联系。",
    rolesEn: [
      "Our team contributed to fashion presentation grounded in London’s people, clothing and local settings."
    ],
    rolesZh: ["团队参与以伦敦人物、服装与当地环境为基础的时尚呈现，积累本地化表达经验。"],
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
    participationSummaryEn:
      "Our team supported Leapmotor’s brand and product presentation within the IAA Mobility industry environment.",
    participationSummaryZh: "团队参与零跑在 IAA Mobility 的品牌与产品呈现，支持其进入欧洲汽车行业视野。",
    clientName: "Leapmotor",
    clientNamePublic: true,
    sector: "automotive",
    category: "industry-credibility",
    year: "2023",
    location: "Munich, Germany",
    marketOutcomeEn:
      "IAA Mobility gave Leapmotor a visible European industry platform, placing its EV proposition in the same market conversation as international automotive brands.",
    marketOutcomeZh:
      "IAA Mobility 为零跑提供了可见的欧洲行业平台，使其新能源产品主张进入与国际汽车品牌同场的市场讨论。",
    strategicRelevanceEn:
      "The project gives our team practical insight into how Chinese automotive challengers establish relevance within European industry platforms.",
    strategicRelevanceZh: "该项目使团队积累了中国汽车新进入者如何借助欧洲行业平台建立市场相关性的实践认识。",
    projectTypeEn: "Automotive industry exhibition",
    projectTypeZh: "汽车行业展会",
    objectiveEn: "A Chinese EV challenger gains a place in Europe’s international mobility showcase.",
    objectiveZh: "中国新能源品牌在欧洲国际汽车平台上建立可见的市场位置。",
    contextEn:
      "IAA Mobility 2023 in Munich brought automotive businesses into a shared international industry environment. Leapmotor’s presence placed its vehicles alongside established competitors, making product differentiation and European-facing positioning particularly relevant.",
    contextZh:
      "2023 年慕尼黑 IAA Mobility 汇集国际汽车与出行企业。零跑在同一行业平台上展示产品，与成熟品牌形成直接参照，产品差异与面向欧洲的定位因此更为关键。",
    executionEn:
      "The stand, vehicles and product details brought the brand proposition into the exhibition’s industry setting. Our contribution supported the connection between the overall presence and the individual products on display.",
    executionZh:
      "团队围绕展台、整车与产品细节参与呈现，将品牌整体亮相与具体车型联系起来，使产品表达保留欧洲行业平台的背景。",
    rolesEn: [
      "Our team supported Leapmotor’s brand and product presentation within the IAA Mobility industry environment."
    ],
    rolesZh: ["团队参与零跑在 IAA Mobility 的品牌与产品呈现，支持其进入欧洲汽车行业视野。"],
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
    participationSummaryEn:
      "Our team supported the BD11’s UK-facing launch presentation in a British public-transport setting.",
    participationSummaryZh: "团队参与 BD11 面向英国市场的发布呈现，衔接新能源产品与本地公共交通场景。",
    clientName: "BYD",
    clientNamePublic: true,
    sector: "automotive",
    category: "market-presence",
    location: "London, UK",
    marketOutcomeEn:
      "The launch placed BYD’s electric mobility proposition within London’s public-transport context, giving the BD11 a tangible place in the UK zero-emission mobility conversation.",
    marketOutcomeZh:
      "此次发布将 BYD 的新能源技术置于伦敦公共交通语境中，使 BD11 的产品价值与英国零排放出行议题建立直接联系。",
    strategicRelevanceEn:
      "The experience demonstrates how our team connects a Chinese technology proposition with a specific UK sector and local market setting.",
    strategicRelevanceZh: "这一经验体现了团队将中国技术企业的产品主张与英国具体行业、应用场景相衔接的能力。",
    projectTypeEn: "UK public-transport product launch",
    projectTypeZh: "英国公共交通产品发布",
    objectiveEn: "Chinese electric mobility meets Britain’s double-decker bus market.",
    objectiveZh: "中国新能源技术进入英国双层公交车的本地应用场景。",
    contextEn:
      "BYD introduced the BD11 at the London Bus Museum in May 2024 as an electric double-decker designed for the UK. This placed Chinese battery technology within a recognisable British transport format, giving the product a concrete local market context.",
    contextZh:
      "2024 年 5 月，BYD 在伦敦巴士博物馆发布面向英国的 BD11 纯电动双层公交车。双层公交这一鲜明的英国交通形态，为中国电池技术提供了具体的本地应用语境。",
    executionEn:
      "The vehicle presentation, museum setting and launch audience brought product and place together. The team’s contribution supported a UK-facing presentation rooted in the way British audiences recognise public transport.",
    executionZh:
      "团队围绕车辆展示、博物馆环境与现场受众参与本地呈现，让产品亮相与英国公共交通的使用场景相衔接。",
    rolesEn: [
      "Our team supported the BD11’s UK-facing launch presentation in a British public-transport setting."
    ],
    rolesZh: ["团队参与 BD11 面向英国市场的发布呈现，衔接新能源产品与本地公共交通场景。"],
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
    participationSummaryEn:
      "Our team supported AGIBOT’s London product presentation, connecting embodied AI with visible robotics.",
    participationSummaryZh: "团队参与智元伦敦产品呈现，将具身智能的技术表达与真实机器人展示相衔接。",
    clientName: "AGIBOT",
    clientNamePublic: true,
    sector: "technology-ai",
    category: "industry-credibility",
    location: "London, UK",
    marketOutcomeEn:
      "The London introduction gave AGIBOT’s embodied AI proposition a physical UK presence, bringing technical explanations and real products into the same local setting.",
    marketOutcomeZh:
      "伦敦发布为智元的具身智能主张提供了英国本地的实体呈现，让技术说明与真实产品在同一场景中被理解。",
    strategicRelevanceEn:
      "This experience supports our understanding of how emerging Chinese technology companies build international credibility through locally intelligible product presentation.",
    strategicRelevanceZh:
      "这一经验帮助团队理解中国前沿科技企业如何通过当地可理解的产品呈现，为国际市场认知与后续交流建立基础。",
    projectTypeEn: "Robotics product introduction",
    projectTypeZh: "机器人产品介绍活动",
    objectiveEn: "Embodied AI becomes a tangible product proposition in a UK technology setting.",
    objectiveZh: "让具身智能在英国科技场景中形成可理解的产品主张。",
    contextEn:
      "AGIBOT’s London introduction brought a technical presentation and robot displays into one setting. For embodied AI, the relationship between technical capability and a visible product is central to making an international proposition understandable locally.",
    contextZh:
      "智元伦敦发布将技术演讲与机器人展示放在同一场景。具身智能走向国际市场，需要让当地受众能够从具体产品理解技术能力及其应用方向。",
    executionEn:
      "The technical talk and physical robot displays offered complementary ways to understand the proposition. Our contribution supported their presentation within the London launch environment.",
    executionZh: "团队围绕技术演讲及机器人实物展示参与伦敦现场呈现，让技术解释与产品形态互相支撑。",
    rolesEn: [
      "Our team supported AGIBOT’s London product presentation, connecting embodied AI with visible robotics."
    ],
    rolesZh: ["团队参与智元伦敦产品呈现，将具身智能的技术表达与真实机器人展示相衔接。"],
    primarySector: "technology-ai-research",
    primaryPath: "launch-in-the-uk",
    tags: ["robotics", "technology", "london"],
    cover: [2, "cover"],
    coverFit: "contain",
    layout: layouts.three("agibot-london-launch")
  },
  {
    slug: "london-automotive-brand-film",
    titleEn: "BYD | UK Market Localisation",
    titleZh: "BYD｜英国市场本地化",
    eventNameEn: "BYD Automotive Brand Localisation, London and England",
    eventNameZh: "BYD 汽车品牌本地化｜伦敦及英格兰",
    participationSummaryEn:
      "Our team supported UK location coordination and local brand presentation across London and England.",
    participationSummaryZh: "团队参与英国实景协调与本地品牌呈现，连接伦敦及英格兰生活场景。",
    clientName: "BYD",
    clientNamePublic: true,
    sector: "automotive",
    category: "brand-evidence",
    location: "London and England, UK",
    marketOutcomeEn:
      "The project gave BYD’s automotive proposition a recognisable British context, linking the vehicle with everyday places and journeys beyond a standalone product introduction.",
    marketOutcomeZh: "项目为 BYD 的汽车主张建立了可识别的英国生活语境，使车辆与日常环境和出行方式产生联系。",
    strategicRelevanceEn:
      "The experience demonstrates how UK-side coordination and local knowledge help translate an international brand into a credible market-facing presence.",
    strategicRelevanceZh:
      "这一经验体现了英国端协调与本地知识的价值：将国际品牌主张转化为有当地依据的市场呈现。",
    projectTypeEn: "UK automotive market localisation",
    projectTypeZh: "英国汽车市场本地化",
    objectiveEn: "An automotive proposition gains everyday relevance in British places.",
    objectiveZh: "让汽车品牌在英国日常场景中建立本地相关性。",
    contextEn:
      "London streets and the English countryside offer recognisable reference points for an automotive brand entering a British context. The project connected BYD’s vehicle proposition with places, people and journeys that give local relevance substance.",
    contextZh:
      "伦敦街道与英格兰乡村为汽车品牌提供了可识别的英国生活参照。项目将 BYD 的产品表达与人物、道路及日常出行联系起来，使本地化具有具体内容。",
    executionEn:
      "UK location coordination connected London streets, interview settings and countryside journeys. Working across those environments gave the team practical experience of grounding an international automotive proposition in British places.",
    executionZh:
      "团队参与英国实景协调，衔接伦敦街道、人物交流场景与乡村出行环境，积累将国际汽车品牌表达落实到英国具体场景的经验。",
    rolesEn: [
      "Our team supported UK location coordination and local brand presentation across London and England."
    ],
    rolesZh: ["团队参与英国实景协调与本地品牌呈现，连接伦敦及英格兰生活场景。"],
    primarySector: "automotive",
    tags: ["localisation", "location", "london"],
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
    titleEn: "Beauty & Fashion | Market Localisation",
    titleZh: "美妆与时尚｜市场本地化",
    eventNameEn: "Beauty & Fashion — Selected Localisation Experience",
    eventNameZh: "美妆与时尚｜本地化经验精选",
    participationSummaryEn:
      "Our team contributed to product-led local brand presentation across independent beauty and fashion projects.",
    participationSummaryZh: "团队在独立美妆与时尚项目中参与产品导向的本地呈现，衔接产品、人物与零售语境。",
    contentType: "portfolio-series",
    sector: "fashion-beauty-apparel",
    category: "brand-evidence",
    location: "UK",
    marketOutcomeEn:
      "The selection demonstrates concrete ways to place consumer products in recognisable settings, giving each proposition a clearer relationship with its intended audience.",
    marketOutcomeZh:
      "这组经验展示了消费产品进入具体场景的不同方式，使各自的品牌主张与目标受众建立更清晰的联系。",
    strategicRelevanceEn:
      "These projects broaden our localisation perspective beyond industrial launches to the everyday contexts that shape consumer understanding.",
    strategicRelevanceZh:
      "这些项目将团队对本地化的理解延伸至消费端，帮助识别影响日常产品认知的市场与生活语境。",
    projectTypeEn: "Consumer-brand localisation experience",
    projectTypeZh: "消费品牌本地化经验",
    objectiveEn: "Consumer products gain relevance through people, style and retail context.",
    objectiveZh: "通过人物、风格与零售语境建立消费产品的市场相关性。",
    contextEn:
      "This selection brings together independent beauty, skincare, fashion and retail projects. Across these settings, a product’s relationship with people and everyday use shapes how a consumer proposition becomes understandable.",
    contextZh:
      "这组经验来自独立的美妆、护肤、时尚及零售项目。产品与人物、日常使用场景之间的关系，影响消费者如何理解品牌主张。",
    executionEn:
      "The individual projects varied in product emphasis, styling and retail setting. Our contribution supported each proposition’s local presentation while retaining its own product and audience context.",
    executionZh: "不同项目分别侧重产品、风格或零售环境。团队参与各自的本地呈现，保留具体产品及其受众语境。",
    rolesEn: [
      "Our team contributed to product-led local brand presentation across independent beauty and fashion projects."
    ],
    rolesZh: ["团队在独立美妆与时尚项目中参与产品导向的本地呈现，衔接产品、人物与零售语境。"],
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
    titleEn: "European Mobility | Local Market Context",
    titleZh: "欧洲出行｜本地市场语境",
    eventNameEn: "European Mobility — Selected Local Market Experience",
    eventNameZh: "欧洲出行｜本地市场经验精选",
    participationSummaryEn:
      "Our team contributed to automotive market expression grounded in European roads and urban settings.",
    participationSummaryZh: "团队参与欧洲道路与城市场景中的汽车表达，衔接车辆主张与当地出行环境。",
    contentType: "portfolio-series",
    sector: "automotive",
    category: "brand-evidence",
    location: "Europe",
    marketOutcomeEn:
      "The projects gave automotive propositions a visible European sense of place, showing how local surroundings can connect a vehicle’s identity with everyday mobility.",
    marketOutcomeZh: "这些项目为汽车主张建立了具体的欧洲场景，将车辆身份与日常出行环境连接起来。",
    strategicRelevanceEn:
      "The experience reinforces our understanding that European localisation depends on the relationship between a product and the places where it will be encountered.",
    strategicRelevanceZh: "这一经验深化了团队对欧洲本地化的理解：产品需要与当地使用环境建立可信的联系。",
    projectTypeEn: "European automotive localisation experience",
    projectTypeZh: "欧洲汽车本地化经验",
    objectiveEn: "Automotive positioning connects with Europe’s roads and everyday mobility settings.",
    objectiveZh: "让汽车定位与欧洲道路及日常出行环境建立联系。",
    contextEn:
      "These independent projects place vehicles within European roads and urban settings. They explore how movement and place give an automotive proposition a local frame of reference beyond technical specifications.",
    contextZh:
      "这些独立项目将车辆置于欧洲道路与城市环境中，围绕行驶状态与场景建立产品的当地参照，使汽车主张超越单一技术参数。",
    executionEn:
      "Road and city settings brought out different relationships between vehicles and their surroundings. The team’s contribution supported local presentation across these distinct mobility contexts.",
    executionZh: "团队围绕道路、城市与车辆之间的关系参与本地呈现，在不同出行环境中体现产品的当地相关性。",
    rolesEn: [
      "Our team contributed to automotive market expression grounded in European roads and urban settings."
    ],
    rolesZh: ["团队参与欧洲道路与城市场景中的汽车表达，衔接车辆主张与当地出行环境。"],
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
    scope: ["market-facing-presentation", "presentation-selection"],
    capabilities: ["Market-facing Presentation", "Local Brand Expression", "Local Market Assets"],
    roleStatementEn:
      "Our team contributed to the London programme’s audience-facing presentation, supporting the connection between the artist’s stage presence and the shared experience of the UK performance.",
    roleStatementZh:
      "团队参与伦敦演出面向受众的呈现，将艺人的舞台表现与英国现场的共同体验联系起来，支持其海外形象表达。"
  },
  "geely-london-brand-launch": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["market-facing-presentation", "brand-presentation"],
    capabilities: ["Market-facing Presentation", "Brand Presentation", "Local Market Assets"],
    roleStatementEn:
      "Our team operated within Geely’s UK launch environment, supporting the local presentation of its design perspective and EX5 product story. The work connected the group’s wider proposition with the market experience offered in London.",
    roleStatementZh:
      "团队参与吉利英国发布环境中的本地呈现，围绕设计理念与 EX5 产品叙事展开工作，将集团层面的品牌主张与伦敦的具体市场体验联系起来。"
  },
  "changan-europe-launch-2025": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["market-facing-presentation", "brand-presentation"],
    capabilities: ["Market-facing Presentation", "Brand Presentation", "Local Market Assets"],
    roleStatementEn:
      "Our team worked within the European launch environment, supporting the presentation of the brand architecture and product portfolio. The contribution brought the collective market introduction and individual brand identities into a coherent European-facing account.",
    roleStatementZh:
      "团队参与欧洲发布环境中的品牌与产品呈现，兼顾集团整体介绍及各品牌身份，支持长安以更清晰的层次向欧洲受众表达市场布局。"
  },
  "catl-open-day-2025": {
    archetype: "industry-event-presence",
    evidenceLevel: "confirmed",
    scope: ["market-facing-presentation", "brand-presentation"],
    capabilities: ["Market-facing Presentation", "Brand Presentation", "Local Market Assets"],
    roleStatementEn:
      "Our team supported CATL’s European-facing technology presentation within the Munich industry environment. The contribution worked at the interface of technical explanation, company positioning and stakeholder-facing activity.",
    roleStatementZh:
      "团队参与宁德时代面向欧洲的技术呈现，在技术说明、企业定位与行业受众之间建立表达联系，支持其技术主张在当地产业环境中获得具体呈现。"
  },
  "yue-yunpeng-london-live": {
    archetype: "talent-activation",
    evidenceLevel: "confirmed",
    scope: ["market-facing-presentation"],
    capabilities: ["Market-facing Presentation", "Local Brand Expression"],
    roleStatementEn:
      "Our team supported the programme’s local presentation through its performers and live setting, contributing to how the cultural proposition was represented in a UK context.",
    roleStatementZh: "团队通过演出人员及现场环境参与项目的本地呈现，支持华语文化内容在英国语境中的表达。"
  },
  "london-fashion-week-2025": {
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["brand-presentation", "presentation-selection"],
    capabilities: ["Local Brand Expression", "Local Market Assets"],
    roleStatementEn:
      "Our team supported local fashion presentation through the relationship between people, clothing and London settings. The experience concerns market expression within a fashion context.",
    roleStatementZh:
      "团队围绕人物、服装与伦敦场景参与时尚本地化表达，积累在当地时尚语境中呈现产品风格的实践经验。"
  },
  "leapmotor-iaa-2023": {
    archetype: "industry-event-presence",
    evidenceLevel: "confirmed",
    scope: ["market-facing-presentation", "brand-presentation"],
    capabilities: ["Market-facing Presentation", "Brand Presentation", "Local Market Assets"],
    roleStatementEn:
      "Our team worked within Leapmotor’s European-facing presence at IAA Mobility, supporting how the brand and vehicles were presented in the international exhibition environment.",
    roleStatementZh:
      "团队参与零跑在 IAA Mobility 面向欧洲的市场呈现，支持品牌与车型在国际汽车行业环境中的表达。"
  },
  "byd-bd11-london": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["market-facing-presentation", "brand-presentation"],
    capabilities: ["Market-facing Presentation", "Brand Presentation", "Local Market Assets"],
    roleStatementEn:
      "Our team supported the market-facing presentation around the BD11 launch, connecting the vehicle, brand narrative and British setting. This contribution helped make BYD’s technology proposition tangible within the UK launch environment.",
    roleStatementZh:
      "团队参与 BD11 发布的英国市场呈现，将车辆、品牌表达与当地场景联系起来，使技术主张在英国发布环境中获得更具体的产品表达。"
  },
  "agibot-london-launch": {
    archetype: "market-presence-launch",
    evidenceLevel: "confirmed",
    scope: ["market-facing-presentation", "brand-presentation"],
    capabilities: ["Market-facing Presentation", "Brand Presentation", "Local Market Assets"],
    roleStatementEn:
      "Our team contributed to AGIBOT’s UK-facing product presentation, supporting the connection between the technical narrative, robot displays and local launch setting.",
    roleStatementZh:
      "团队参与智元面向英国的产品呈现，将技术叙事、机器人展示与本地发布环境联系起来，帮助复杂技术获得具体表达。"
  },
  "london-automotive-brand-film": {
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["location-coordination", "local-execution", "brand-presentation"],
    capabilities: [
      "UK Location Coordination",
      "Local Execution",
      "Local Brand Expression",
      "Brand Presentation",
      "Local Market Assets"
    ],
    roleStatementEn:
      "Our team contributed UK location coordination and on-the-ground support for local automotive brand presentation. The work connected the vehicle’s identity with London streets and English countryside settings.",
    roleStatementZh:
      "团队参与英国实景协调及汽车品牌本地呈现的落地支持，将车辆身份与伦敦街道、英格兰乡村环境连接起来。"
  },
  "beauty-fashion-brand-content": {
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["brand-presentation", "presentation-selection"],
    capabilities: ["Local Brand Expression", "Local Market Assets"],
    roleStatementEn:
      "Our team supported local brand presentation across these independent projects, connecting product emphasis with people, style and consumer settings.",
    roleStatementZh: "团队在这些独立项目中参与品牌本地呈现，将产品重点与人物、风格和消费场景联系起来。"
  },
  "european-road-lifestyle": {
    archetype: "brand-content-system",
    evidenceLevel: "confirmed",
    scope: ["brand-presentation", "presentation-selection"],
    capabilities: ["Local Brand Expression", "Local Market Assets"],
    roleStatementEn:
      "Our team contributed to the local expression of automotive propositions across independent European settings, linking vehicles with the roads and everyday environments in which they are understood.",
    roleStatementZh: "团队在独立的欧洲场景中参与汽车产品的本地表达，将车辆与当地道路、日常环境相联系。"
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
    marketOutcomeEn: spec.marketOutcomeEn,
    marketOutcomeZh: spec.marketOutcomeZh,
    strategicRelevanceEn: spec.strategicRelevanceEn,
    strategicRelevanceZh: spec.strategicRelevanceZh,
    executionEn: spec.executionEn,
    executionZh: spec.executionZh,
    evidenceCreatedEn: [spec.executionEn],
    evidenceCreatedZh: [spec.executionZh],
    scopeBoundaryEn: series ? boundary.seriesEn : boundary.caseEn,
    scopeBoundaryZh: series ? boundary.seriesZh : boundary.caseZh,
    venusRoleEn: spec.rolesEn,
    venusRoleZh: spec.rolesZh,
    services: ["market-execution", spec.sector],
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
    publicStatus: spec.publicStatus ?? "published",
    status: "completed",
    clientApproval: true,
    legalApproved: true,
    homepageFeatured: Boolean(spec.homepageOrder),
    homepageOrder: spec.homepageOrder,
    market: spec.location
  };
});

export const commercialCaseCategories: Record<CommercialCaseCategory, Record<"en" | "zh", string>> = {
  "market-presence": { en: "Market Entry & Launch", zh: "市场进入与发布" },
  "industry-credibility": { en: "Industry & Ecosystem Engagement", zh: "产业与生态交流" },
  "institutional-talent": { en: "Culture & Audience Engagement", zh: "文化与受众连接" },
  "brand-evidence": { en: "Localisation & Market Activation", zh: "本地化与市场落地" }
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
        ? { en: "Localisation Experience", zh: "本地化经验" }
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
  "production-experience": { en: "Local Market Experience", zh: "本地市场经验" },
  "production-scenarios": { en: "Market Contexts", zh: "市场场景" }
} as const;
