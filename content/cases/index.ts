import type { CaseStatus, CaseStudy, DisclosureLevel, LocalisedString, ServicePillar } from "@/content/types";
import type { ProjectType } from "@/lib/contact/validation";
import { defineCaseStudy } from "./template";

const l = (en: string, zh: string): LocalisedString => ({ en, zh });
const concept = (caseStudy: Omit<CaseStudy, "status" | "disclosureLevel" | "evidenceState">) =>
  defineCaseStudy({
    ...caseStudy,
    status: "concept",
    disclosureLevel: "illustrative",
    evidenceState: "unverified"
  });

export const caseStudies: CaseStudy[] = [
  concept({
    slug: "london-celebrity-event-coverage",
    title: l("London entertainment event media plan", "伦敦娱乐活动传播执行方案"),
    summary: l(
      "An illustrative event model for coordinating a guest-facing programme, press moments and post-event assets in London.",
      "用于说明如何在伦敦统筹嘉宾活动、媒体环节与会后素材的概念项目模式。"
    ),
    industry: l("Entertainment & Culture", "娱乐与文化"),
    industryKey: "event",
    servicePillars: ["events-exhibitions", "talent"],
    projectType: l("Concept event delivery model", "概念活动执行模式"),
    challenge: l(
      "A cultural launch needs a public programme and media capture without disrupting guests, speakers or venue operations.",
      "文化发布活动需要兼顾现场体验与媒体采集，且不能干扰嘉宾、演讲者和场地运营。"
    ),
    objective: l(
      "Set a run-of-show that gives speakers, press and suppliers defined handoff points.",
      "建立明确的现场流程，让演讲者、媒体与供应商在指定节点交接。"
    ),
    outcome: l(
      "A proposed operating plan for a controlled live programme and approved post-event asset list.",
      "形成用于受控现场执行及审核后会后素材清单的建议方案。"
    ),
    clientNeed: l(
      "Example brief: stage a London guest programme with a moderated conversation, press arrivals and same-week social selects.",
      "示例需求：在伦敦举办包含嘉宾对谈、媒体到场与当周社媒精选素材的活动。"
    ),
    frameBridgeRole: l(
      "FrameBridge could coordinate venue feasibility, speaker timings, media capture plan, supplier briefings and the handoff schedule.",
      "FrameBridge 可协调场地可行性、嘉宾时间、媒体采集方案、供应商简报与交付排期。"
    ),
    productionScope: [
      l("Audience journey and run-of-show", "观众动线与现场流程"),
      l("Speaker, venue and press call-times", "嘉宾、场地与媒体到场时间"),
      l("Capture permissions and edit selection route", "拍摄许可与素材筛选路径")
    ],
    deliverables: [
      l("Run-of-show and supplier call sheet", "现场流程表与供应商通告"),
      l("Approved arrival, stage and interview capture list", "经确认的到场、舞台与访谈采集清单"),
      l("Post-event selects and caption-ready handoff", "会后精选素材与可配文交接包")
    ],
    formats: [
      l("Event stills", "活动摄影"),
      l("Short interview clips", "简短访谈视频"),
      l("Vertical social selects", "竖版社媒精选素材")
    ],
    usageContext: [
      l("Event announcements, press follow-up and owned social channels", "活动预告、媒体跟进与自有社交渠道")
    ],
    constraints: [
      l(
        "Venue access windows and guest photography consent must be agreed before the capture plan is locked.",
        "确定拍摄方案前，须确认场地进场窗口及嘉宾拍摄同意。"
      )
    ],
    location: l("London venue, subject to feasibility", "伦敦场地，以可行性确认结果为准"),
    market: l("UK press and China-facing owned channels", "英国媒体与面向中国的自有渠道"),
    visualDirection: l(
      "Document the live atmosphere through arrival, exchange and stage moments rather than staged campaign imagery.",
      "以到场、交流和舞台时刻记录现场氛围，而非使用摆拍式广告视觉。"
    ),
    cta: l("Plan an event delivery model", "规划活动执行模式"),
    relatedIndustries: ["event"],
    heroMediaId: "event-concept-hero",
    mediaIds: ["event-concept-landscape", "event-concept-portrait", "event-concept-diagram"]
  }),
  concept({
    slug: "fashion-campaign-production-london",
    title: l("London fashion seasonal campaign", "伦敦时尚季节广告制作方案"),
    summary: l(
      "An illustrative campaign model for aligning casting, styling, stills and motion with channel-specific usage.",
      "用于说明如何将选角、造型、图片与视频和渠道使用要求对齐的概念项目模式。"
    ),
    industry: l("Fashion", "时尚"),
    industryKey: "fashion",
    servicePillars: ["commercial-production", "talent"],
    projectType: l("Concept seasonal campaign model", "概念季节广告模式"),
    challenge: l(
      "A seasonal collection needs a UK location and cast that support both editorial stills and paid social without expanding the shoot days.",
      "季节系列需要在不增加拍摄天数的前提下，利用英国场景和模特兼顾编辑图片与付费社媒素材。"
    ),
    objective: l(
      "Agree the casting, styling references and shot priorities before booking locations and crew.",
      "在确认场地和团队前，明确选角、造型参考与镜头优先级。"
    ),
    outcome: l(
      "A proposed stills-and-motion plan mapped to 4:5, 9:16 and landscape placements.",
      "形成适配 4:5、9:16 及横版投放位的图片与视频建议方案。"
    ),
    clientNeed: l(
      "Example brief: create a London seasonal campaign with two model profiles, a day-to-evening styling change and paid plus organic outputs.",
      "示例需求：为季节广告制作伦敦场景内容，包含两类模特、日间至夜间造型变化以及付费与自然流量素材。"
    ),
    frameBridgeRole: l(
      "FrameBridge could translate the brief into casting criteria, styling approvals, location options, shot order and delivery specifications.",
      "FrameBridge 可将需求转化为选角标准、造型审批、场地备选、拍摄顺序及交付规格。"
    ),
    productionScope: [
      l("Casting shortlist against audience and usage", "按受众与使用范围筛选候选模特"),
      l("Styling and location reference approval", "造型与场景参考审核"),
      l("Stills and motion shot order", "图片与视频拍摄顺序")
    ],
    deliverables: [
      l("Campaign key stills and edit selects", "广告主视觉图片与精选素材"),
      l("4:5 product-and-look edits", "4:5 产品与造型素材"),
      l("9:16 movement clips with usage notes", "附使用说明的 9:16 动态短片")
    ],
    formats: [
      l("4:5 paid social", "4:5 付费社媒素材"),
      l("9:16 vertical video", "9:16 竖版视频"),
      l("16:9 campaign cut", "16:9 广告版本")
    ],
    usageContext: [
      l("Paid and organic social, lookbook and PR review", "付费与自然流量社媒、型录及公关审核")
    ],
    constraints: [
      l(
        "Model availability, territory, duration and category exclusivity must be confirmed before use across paid channels.",
        "用于付费渠道前，必须确认模特档期、使用地区、期限和品类排他范围。"
      )
    ],
    location: l("London, selected against styling and access needs", "伦敦，按造型与进场需求筛选"),
    market: l("UK production for China-facing campaign channels", "面向中国广告渠道的英国制作"),
    visualDirection: l(
      "A seasonal wardrobe-led sequence that moves from architectural daylight to controlled evening scenes.",
      "以季节造型为线索，从建筑自然光场景过渡到受控夜景。"
    ),
    cta: l("Map a seasonal campaign brief", "梳理季节广告需求"),
    relatedIndustries: ["fashion"],
    heroMediaId: "fashion-concept-hero",
    mediaIds: ["fashion-concept-landscape", "fashion-concept-portrait", "fashion-concept-diagram"]
  }),
  concept({
    slug: "ai-product-video-uk-market",
    title: l("AI product explanation for a UK audience", "面向英国受众的 AI 产品说明内容"),
    summary: l(
      "An illustrative product-story model for turning a technical use case into reviewed interview, demo and short-form assets.",
      "用于说明如何将技术使用场景转化为经审核的访谈、演示与短内容的概念项目模式。"
    ),
    industry: l("AI & Technology", "AI 与科技"),
    industryKey: "technology",
    servicePillars: ["technology-content", "commercial-production"],
    projectType: l("Concept technology communication model", "概念科技传播模式"),
    challenge: l(
      "A product team needs to explain a complex AI workflow without making unsupported technical or performance claims.",
      "产品团队需要解释复杂的 AI 工作流，同时避免作出未经证实的技术或性能表述。"
    ),
    objective: l(
      "Build an approval route for product terminology, interface capture and expert interview answers before filming.",
      "在拍摄前建立产品术语、界面录制和专家访谈回答的审核路径。"
    ),
    outcome: l(
      "A proposed education-led asset set that separates product demonstration from claim-approved launch messaging.",
      "形成将产品演示与经确认的发布信息区分开的教育型素材建议方案。"
    ),
    clientNeed: l(
      "Example brief: explain one UK-relevant product use case through a founder interview, interface demonstration and short educational cuts.",
      "示例需求：通过创始人访谈、界面演示和教育型短视频解释一个与英国市场相关的产品使用场景。"
    ),
    frameBridgeRole: l(
      "FrameBridge could plan the interview structure, coordinate technical review, sequence interface capture and prepare release-ready edits.",
      "FrameBridge 可规划访谈结构、协调技术审核、安排界面录制顺序并准备发布版本。"
    ),
    productionScope: [
      l("Use-case and terminology review", "使用场景与术语审核"),
      l("Founder or expert interview outline", "创始人或专家访谈提纲"),
      l("Interface capture and educational edit plan", "界面录制与教育型剪辑方案")
    ],
    deliverables: [
      l("Reviewed interview master", "经审核的访谈主版本"),
      l("Product interface demonstration sequence", "产品界面演示序列"),
      l("Short educational clips with claim review markers", "带有表述审核标记的教育型短视频")
    ],
    formats: [
      l("Interview master", "访谈主版本"),
      l("Screen demonstration", "屏幕演示"),
      l("Vertical explainer clips", "竖版说明短片")
    ],
    usageContext: [
      l("Product launch pages, sales enablement and exhibition screens", "产品发布页、销售支持与展会屏幕")
    ],
    constraints: [
      l(
        "Technical accuracy, interface permissions and approved product claims determine what may be recorded and published.",
        "技术准确性、界面权限及获批产品表述决定可录制与发布的内容。"
      )
    ],
    location: l("UK studio or client-approved workspace", "英国摄影棚或经客户确认的工作场地"),
    market: l("UK product communication", "英国市场产品传播"),
    visualDirection: l(
      "Pair a clear interview setting with purposeful interface detail so the use case remains legible.",
      "将清晰的访谈场景与重点界面细节结合，确保使用场景易于理解。"
    ),
    cta: l("Map a product explanation", "梳理产品说明内容"),
    relatedIndustries: ["technology"],
    heroMediaId: "technology-concept-hero",
    mediaIds: ["technology-concept-landscape", "technology-concept-portrait", "technology-concept-diagram"]
  }),
  concept({
    slug: "beauty-creator-content-sprint",
    title: l("Beauty creator content sprint", "美妆创作者内容短周期方案"),
    summary: l(
      "An illustrative creator-content model for matching product claims, creator briefs and review windows within a short launch schedule.",
      "用于说明如何在短发布周期内匹配产品表述、创作者简报与审核窗口的概念项目模式。"
    ),
    industry: l("Beauty", "美妆"),
    industryKey: "beauty",
    servicePillars: ["talent", "commercial-production"],
    projectType: l("Concept creator content model", "概念创作者内容模式"),
    challenge: l(
      "A beauty launch needs varied creator voices while keeping ingredient claims, before-and-after language and usage territory controlled.",
      "美妆发布需要多元创作者表达，同时控制成分表述、使用前后语言及使用地区。"
    ),
    objective: l(
      "Define a creator brief and review sequence that protects product claims before content is cut for social channels.",
      "在内容剪辑为社交渠道版本前，明确创作者简报及保护产品表述的审核顺序。"
    ),
    outcome: l(
      "A proposed creator workflow with claim-approved scripts, product demonstrations and channel-ready cutdowns.",
      "形成包含获批脚本、产品演示和适配渠道短版本的创作者工作流建议。"
    ),
    clientNeed: l(
      "Example brief: coordinate a small UK creator group for a product texture story, routine demonstration and launch-week organic posts.",
      "示例需求：协调小型英国创作者团队，完成产品质地故事、使用流程演示和发布周自然流量内容。"
    ),
    frameBridgeRole: l(
      "FrameBridge could source against audience fit, issue creator briefs, coordinate product receipt and manage the review calendar.",
      "FrameBridge 可按受众匹配筛选创作者、发放简报、协调产品寄送并管理审核日历。"
    ),
    productionScope: [
      l("Creator selection and territory check", "创作者筛选与使用地区核对"),
      l("Product claim and routine briefing", "产品表述与使用流程简报"),
      l("Review-window and publication calendar", "审核窗口与发布时间表")
    ],
    deliverables: [
      l("Creator shortlist with audience rationale", "附受众依据的创作者候选名单"),
      l("Claim-reviewed routine demonstrations", "经表述审核的使用流程演示"),
      l("Organic launch-week vertical posts", "发布周自然流量竖版内容")
    ],
    formats: [
      l("9:16 creator video", "9:16 创作者视频"),
      l("Product texture stills", "产品质地图片"),
      l("Caption and disclosure copy", "文案与披露说明")
    ],
    usageContext: [
      l(
        "Organic creator channels and brand reposting subject to agreed usage",
        "在约定使用范围内用于创作者自然流量渠道及品牌转载"
      )
    ],
    constraints: [
      l(
        "Ingredient wording, disclosure requirements and creator usage permissions must be cleared before posting dates are confirmed.",
        "确认发布日期前，必须明确成分表述、披露要求及创作者使用许可。"
      )
    ],
    location: l(
      "Creator-selected UK locations, subject to brand review",
      "由创作者选择并经品牌审核的英国场景"
    ),
    market: l("UK creator and China-facing brand channels", "英国创作者渠道与面向中国的品牌渠道"),
    visualDirection: l(
      "Show product texture and routine steps in creator-led environments, with the product claim carried in approved captions.",
      "在创作者主导的日常场景中展示产品质地与使用步骤，并通过获批文案承载产品表述。"
    ),
    cta: l("Plan a creator content sprint", "规划创作者内容短周期"),
    relatedIndustries: ["beauty"],
    heroMediaId: "beauty-concept-hero",
    mediaIds: ["beauty-concept-landscape", "beauty-concept-portrait", "beauty-concept-diagram"]
  }),
  concept({
    slug: "automotive-event-presenter-support",
    title: l("Automotive launch and presenter support", "汽车发布与主持人支持方案"),
    summary: l(
      "An illustrative launch model for integrating vehicle access, presenter preparation, moving coverage and weather contingency.",
      "用于说明如何整合车辆进场、主持人准备、动态拍摄与天气预案的概念项目模式。"
    ),
    industry: l("Automotive", "汽车"),
    industryKey: "automotive",
    servicePillars: ["events-exhibitions", "talent"],
    projectType: l("Concept automotive launch model", "概念汽车发布模式"),
    challenge: l(
      "A vehicle launch needs moving and static coverage, but access, safety, weather and presenter timings all affect the shooting order.",
      "汽车发布需要动态与静态内容，但进场、安全、天气和主持人时间都会影响拍摄顺序。"
    ),
    objective: l(
      "Confirm safe vehicle access and a weather-aware run sheet before scheduling presenter and camera calls.",
      "在安排主持人与摄影团队到场前，确认安全的车辆进场方式和考虑天气的现场流程表。"
    ),
    outcome: l(
      "A proposed launch-day schedule covering exterior, interior, presenter and media moments with a contingency route.",
      "形成涵盖外观、内饰、主持人和媒体环节，并含预案路径的发布日建议排期。"
    ),
    clientNeed: l(
      "Example brief: support a UK vehicle reveal with a bilingual presenter, controlled test-area access and wide, vertical and social assets.",
      "示例需求：支持英国车辆亮相活动，包含双语主持人、受控测试区域进场，以及横版、竖版和社媒素材。"
    ),
    frameBridgeRole: l(
      "FrameBridge could align the venue, vehicle team, presenter brief, safety boundaries and production schedule.",
      "FrameBridge 可协调场地、车辆团队、主持人简报、安全边界与制作排期。"
    ),
    productionScope: [
      l("Vehicle access and safety route", "车辆进场与安全路线"),
      l("Presenter briefing and rehearsal", "主持人简报与彩排"),
      l("Weather contingency and capture order", "天气预案与拍摄顺序")
    ],
    deliverables: [
      l("Exterior and interior vehicle coverage", "车辆外观与内饰内容"),
      l("Presenter-led reveal sequence", "主持人引导的亮相片段"),
      l("Wide, vertical and social edit list", "横版、竖版与社媒剪辑清单")
    ],
    formats: [
      l("16:9 launch film", "16:9 发布影片"),
      l("9:16 reveal clips", "9:16 亮相短片"),
      l("Vehicle detail stills", "车辆细节图片")
    ],
    usageContext: [
      l(
        "Launch event screens, press materials and owned social channels",
        "发布活动屏幕、媒体资料与自有社交渠道"
      )
    ],
    constraints: [
      l(
        "Vehicle movement, filming zones, insurance and weather fallback must be agreed with the venue and vehicle owner.",
        "须与场地及车辆所有方确认车辆移动、拍摄区域、保险和天气备用方案。"
      )
    ],
    location: l("UK launch site with controlled vehicle access", "具备受控车辆进场条件的英国发布场地"),
    market: l("UK launch and international social distribution", "英国发布与国际社媒传播"),
    visualDirection: l(
      "Move between controlled exterior motion, interior detail and presenter explanation to make the launch sequence easy to follow.",
      "在受控外观动态、内饰细节与主持人讲解之间切换，使发布流程易于理解。"
    ),
    cta: l("Plan an automotive launch route", "规划汽车发布执行路径"),
    relatedIndustries: ["automotive"],
    heroMediaId: "automotive-concept-hero",
    mediaIds: ["automotive-concept-landscape", "automotive-concept-portrait", "automotive-concept-diagram"]
  }),
  concept({
    slug: "jewellery-editorial-shoot",
    title: l("Jewellery editorial production", "珠宝编辑式内容制作方案"),
    summary: l(
      "An illustrative editorial model for planning product detail, model wearing shots and rights-aware launch assets.",
      "用于说明如何规划产品细节、模特佩戴画面与使用权意识下的发布素材的概念项目模式。"
    ),
    industry: l("Jewellery", "珠宝"),
    industryKey: "jewellery",
    servicePillars: ["commercial-production", "talent"],
    projectType: l("Concept jewellery editorial model", "概念珠宝编辑制作模式"),
    challenge: l(
      "A jewellery collection needs macro detail and model-wearing images, while sample security, retouching approval and usage duration remain controlled.",
      "珠宝系列需要微距细节和模特佩戴画面，同时必须控制样品安全、修图审核和使用期限。"
    ),
    objective: l(
      "Set a shot list that protects product handling and separates e-commerce, editorial and PR selections.",
      "制定兼顾产品保管的镜头清单，并区分电商、编辑和公关精选素材。"
    ),
    outcome: l(
      "A proposed approval-led image library for product launch, press review and future channel crops.",
      "形成以审批为核心的图片库建议方案，用于产品发布、媒体审核与后续渠道裁切。"
    ),
    clientNeed: l(
      "Example brief: produce London editorial imagery for a jewellery collection with close product detail, model wearing and a restrained press selection.",
      "示例需求：为珠宝系列制作伦敦编辑式内容，包括产品近景、模特佩戴及克制的媒体精选素材。"
    ),
    frameBridgeRole: l(
      "FrameBridge could coordinate casting, product handling protocol, styling references, retouching review and final file naming.",
      "FrameBridge 可协调选角、产品保管流程、造型参考、修图审核和最终文件命名。"
    ),
    productionScope: [
      l("Product handling and security protocol", "产品保管与安全流程"),
      l("Model wearing and macro detail shot list", "模特佩戴与微距细节镜头清单"),
      l("Retouching and usage selection review", "修图与使用素材筛选审核")
    ],
    deliverables: [
      l("Macro product detail image set", "产品微距细节图片组"),
      l("Model-wearing editorial selects", "模特佩戴编辑精选素材"),
      l("Press-review and e-commerce file groups", "媒体审核与电商文件分组")
    ],
    formats: [
      l("High-resolution product stills", "高分辨率产品图片"),
      l("4:5 editorial crops", "4:5 编辑式裁切"),
      l("Press preview PDF", "媒体预览 PDF")
    ],
    usageContext: [
      l(
        "Launch pages, press review, lookbook and agreed paid placements",
        "发布页、媒体审核、型录及约定的付费投放"
      )
    ],
    constraints: [
      l(
        "Sample custody, retouching sign-off and model usage duration must be agreed before final assets are released.",
        "发布最终素材前，必须确认样品保管、修图签核和模特使用期限。"
      )
    ],
    location: l(
      "London studio or daylight location approved for product security",
      "经产品安全审核的伦敦摄影棚或自然光场地"
    ),
    market: l("International launch and China-facing editorial channels", "国际发布与面向中国的编辑式渠道"),
    visualDirection: l(
      "Use macro material detail and measured model-wearing composition to show scale, finish and styling context.",
      "通过微距材质细节和克制的模特佩戴构图展示尺寸、质感与造型语境。"
    ),
    cta: l("Map a jewellery editorial brief", "梳理珠宝编辑制作需求"),
    relatedIndustries: ["jewellery"],
    heroMediaId: "jewellery-concept-hero",
    mediaIds: ["jewellery-concept-landscape", "jewellery-concept-portrait", "jewellery-concept-diagram"]
  })
];

export const caseStatusLabels: Record<"en" | "zh", Record<string, string>> = {
  en: {
    "published:named": "Published client project",
    "anonymised:confidential": "Client-confidential project",
    "concept:illustrative": "Concept project model"
  },
  zh: {
    "published:named": "已公开客户项目",
    "anonymised:confidential": "客户保密项目",
    "concept:illustrative": "概念项目模式"
  }
};

export function getCaseDisclosureLabel(
  caseStudy: Pick<CaseStudy, "status" | "disclosureLevel">,
  lang: "en" | "zh"
) {
  return (
    caseStatusLabels[lang][`${caseStudy.status}:${caseStudy.disclosureLevel}`] ??
    caseStatusLabels[lang]["concept:illustrative"]
  );
}
export function disclosureLabel(status: CaseStatus, level: DisclosureLevel, lang: "en" | "zh") {
  return getCaseDisclosureLabel({ status, disclosureLevel: level }, lang);
}
export const featuredCaseStudies = caseStudies.slice(0, 3);
export const projectTypeByServicePillar: Partial<Record<ServicePillar, ProjectType>> = {
  "commercial-production": "commercial",
  talent: "talent",
  "research-innovation": "research",
  "events-exhibitions": "events",
  "agency-support": "agency",
  "technology-content": "video"
};
export function getCaseProjectType(caseStudy: CaseStudy): ProjectType {
  return projectTypeByServicePillar[caseStudy.servicePillars[0]] ?? "other";
}
export function isPortfolioEligible(caseStudy: CaseStudy) {
  return (
    (caseStudy.status === "published" || caseStudy.status === "anonymised") &&
    (caseStudy.evidenceState === "client-approved" || caseStudy.evidenceState === "publicly-verifiable")
  );
}
export const serviceLabels: Record<ServicePillar, LocalisedString> = {
  "commercial-production": l("Commercial Production", "商业制作"),
  talent: l("Talent", "人才"),
  "technology-content": l("Technology Content", "科技内容"),
  "research-innovation": l("Research & Innovation", "科研与创新"),
  "events-exhibitions": l("Events & Exhibitions", "活动与展会"),
  "agency-support": l("Agency Support", "代理支持")
};
