import type { FutureCommercialCaseIntake, LocalisedEvidenceText } from "@/content/evidence/case-evidence";

export const publicClaimClassifications = [
  "PUBLIC_COMPANY_FACT",
  "PUBLIC_EVENT_FACT",
  "OWNER_CONFIRMED_PROJECT_FACT",
  "VERIFIED_VENUS_ROLE",
  "VERIFIED_VENUS_OUTPUT",
  "SUBSEQUENT_PUBLIC_DEVELOPMENT",
  "UNVERIFIED"
] as const;
export type PublicClaimClassification = (typeof publicClaimClassifications)[number];
export type PublicClaim = {
  text: Required<LocalisedEvidenceText>;
  classification: PublicClaimClassification;
  sourceIds: string[];
};
export type PublicCommercialCaseNarrative = Pick<
  FutureCommercialCaseIntake,
  "marketOrGeography" | "participantsOrCounterpartyTypes" | "lastVerifiedDate"
> & {
  proofTier: "commercial";
  engagementType: "launch" | "exhibition" | "industry-event";
  geography: "UK" | "Germany";
  marketMomentLabel: Required<LocalisedEvidenceText>;
  marketMoment: PublicClaim;
  whyItMattered: PublicClaim;
  projectObjective: PublicClaim;
  challenge: PublicClaim;
  verifiedVenusRole: PublicClaim;
  whatVenusBridgeDid: Required<LocalisedEvidenceText>[];
  whatVenusBridgeDidNotDo: Required<LocalisedEvidenceText>[];
  activity: {
    before: Required<LocalisedEvidenceText>[];
    onSite: Required<LocalisedEvidenceText>[];
    after: Required<LocalisedEvidenceText>[];
  };
  approachLabel: Required<LocalisedEvidenceText>;
  verifiedOutputs: PublicClaim[];
  verifiedResult: PublicClaim;
  continuedValue: Required<LocalisedEvidenceText>;
  publicEvidenceAvailable: Required<LocalisedEvidenceText>;
  subsequentDevelopment?: PublicClaim;
  subsequentDisclaimer?: Required<LocalisedEvidenceText>;
  claimBoundary: Required<LocalisedEvidenceText>;
};

const t = (en: string, zh: string) => ({ en, zh });
const claim = (
  en: string,
  zh: string,
  classification: PublicClaimClassification,
  ...sourceIds: string[]
): PublicClaim => ({ text: t(en, zh), classification, sourceIds });
const disclaimer = t(
  "This subsequent market development is provided as company context and is not presented as an outcome attributable to Venus Bridge.",
  "后续市场发展仅作为企业背景信息，不作为可归因于 Venus Bridge 的项目成果。"
);
const boundary = t(
  "Public sources support the market context; approved project media and the owner record support the stated Venus Bridge role. Wider strategy, commercial outcomes and subsequent developments are not attributed to Venus Bridge.",
  "公开来源支持市场背景；经批准的项目影像与所有者记录支持所述 Venus Bridge 职责。更广泛的企业战略、商业成果及后续发展均不归因于 Venus Bridge。"
);

export const publicCommercialCaseNarratives: Record<string, PublicCommercialCaseNarrative> = {
  "byd-bd11-london": {
    proofTier: "commercial",
    engagementType: "launch",
    geography: "UK",
    marketOrGeography: "London, UK",
    participantsOrCounterpartyTypes: [],
    lastVerifiedDate: "2026-09-09",
    marketMomentLabel: t("UK-Specific Product Introduction", "英国特定产品发布"),
    marketMoment: claim(
      "BYD gave the BD11 electric double-decker its global debut at the London Bus Museum, placing a new commercial vehicle directly in the public-transport environment for which it was developed.",
      "BYD 在伦敦巴士博物馆完成 BD11 纯电动双层公交车的全球首发，将一款新商用车型直接置于其面向的伦敦公共交通环境中。",
      "PUBLIC_COMPANY_FACT",
      "byd-bd11-global-launch"
    ),
    whyItMattered: claim(
      "The official launch positioned the BD11 as a new-generation electric double-decker for the UK, linking the product introduction to BYD's established electric-bus activity in London.",
      "官方发布将 BD11 定位为面向英国的新一代纯电动双层公交车，并把本次产品亮相与 BYD 已有的伦敦电动公交业务联系起来。",
      "PUBLIC_COMPANY_FACT",
      "byd-bd11-global-launch"
    ),
    projectObjective: claim(
      "Create an approved public record of the vehicle introduction, presentation and recognisable London setting.",
      "形成一份经批准的公开记录，清楚呈现车辆亮相、发布环节与可识别的伦敦环境。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "byd-bd11-london-owner-scope"
    ),
    challenge: claim(
      "Present a UK-specific commercial vehicle with enough product, venue and audience context to make its London public-transport setting immediately legible.",
      "在产品、场地与观众语境之间建立清晰联系，使这款面向英国的商用车辆能够立即被识别为置身伦敦公共交通环境。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "byd-bd11-london-owner-scope"
    ),
    verifiedVenusRole: claim(
      "Venus Bridge delivered on-site visual documentation in London and prepared approved UK-facing brand evidence.",
      "Venus Bridge 完成伦敦现场视觉记录，并整理获准使用的面向英国的品牌证据。",
      "VERIFIED_VENUS_ROLE",
      "byd-bd11-london-owner-scope"
    ),
    whatVenusBridgeDid: [
      t("On-site visual documentation", "现场视觉记录"),
      t("Product, venue and audience coverage", "产品、场地与观众记录"),
      t("Approved asset preparation", "获准资产整理")
    ],
    whatVenusBridgeDidNotDo: [
      t("Market-entry strategy", "市场进入战略"),
      t("Event ownership", "活动主办"),
      t("Sales or operator outcomes", "销售或运营商成果")
    ],
    activity: {
      before: [t("Brief and coverage priorities", "项目简报与拍摄重点对齐")],
      onSite: [t("Vehicle, presentation and audience documentation", "车辆、发布与观众现场记录")],
      after: [t("Approved public asset selection", "获准公开资产筛选")]
    },
    approachLabel: t("Documentation Approach", "记录方法"),
    verifiedOutputs: [
      claim(
        "Approved London launch record",
        "经批准的伦敦发布记录",
        "VERIFIED_VENUS_OUTPUT",
        "byd-bd11-london-owner-scope"
      ),
      claim(
        "Product and presentation imagery",
        "产品与发布环节影像",
        "VERIFIED_VENUS_OUTPUT",
        "byd-bd11-london-owner-scope"
      )
    ],
    verifiedResult: claim(
      "A coherent, rights-approved record of the BD11 introduction in its visible London market setting.",
      "形成一套权利获批、连贯呈现 BD11 在伦敦目标市场环境中亮相的记录。",
      "VERIFIED_VENUS_OUTPUT",
      "byd-bd11-london-owner-scope"
    ),
    continuedValue: t(
      "A reusable record of the product introduction and London setting.",
      "一套可继续使用的产品亮相与伦敦环境记录。"
    ),
    publicEvidenceAvailable: t("7 approved images", "7 张获准公开使用的影像"),
    claimBoundary: boundary
  },
  "geely-london-brand-launch": {
    proofTier: "commercial",
    engagementType: "launch",
    geography: "UK",
    marketOrGeography: "London, UK",
    participantsOrCounterpartyTypes: [],
    lastVerifiedDate: "2026-09-09",
    marketMomentLabel: t("UK Brand Market Entry", "英国品牌市场进入"),
    marketMoment: claim(
      "Geely Auto formally launched its namesake brand in the UK in London and introduced the all-electric EX5 as its first UK model.",
      "吉利汽车在伦敦正式发布其同名品牌进入英国市场，并以纯电 EX5 作为首款英国车型。",
      "PUBLIC_COMPANY_FACT",
      "geely-ex5-uk-launch"
    ),
    whyItMattered: claim(
      "The company described the UK launch as the next phase of its European strategy, giving the London event significance beyond a single product display.",
      "吉利将英国发布描述为其欧洲战略的下一阶段，因此这场伦敦活动的意义不止于单一车型展示。",
      "PUBLIC_COMPANY_FACT",
      "geely-ex5-uk-launch"
    ),
    projectObjective: claim(
      "Establish an approved visual record of the UK brand launch, EX5 presentation and audience setting.",
      "建立一套经批准的视觉记录，呈现英国品牌发布、EX5 展示与现场观众环境。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "geely-london-brand-launch-owner-scope"
    ),
    challenge: claim(
      "Create a clear launch record around the arrival of a standalone automotive brand in a mature UK market while keeping the documented role distinct from the client's market-entry programme.",
      "围绕一个独立汽车品牌进入成熟英国市场的时刻建立清晰发布记录，同时将记录工作与客户自身的市场进入计划明确区分。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "geely-london-brand-launch-owner-scope"
    ),
    verifiedVenusRole: claim(
      "Venus Bridge documented the London launch environment, including the design presentation, EX5 display and audience context.",
      "Venus Bridge 记录伦敦发布现场，包括设计演讲、EX5 展示与观众环境。",
      "VERIFIED_VENUS_ROLE",
      "geely-london-brand-launch-owner-scope"
    ),
    whatVenusBridgeDid: [
      t("Launch-context photography", "发布场景摄影"),
      t("EX5 and presentation coverage", "EX5 与演讲记录"),
      t("UK-facing visual documentation", "面向英国市场的视觉记录")
    ],
    whatVenusBridgeDidNotDo: [
      t("UK market-entry strategy", "英国市场进入战略"),
      t("Dealer-network development", "经销网络建设"),
      t("Sales outcomes", "销售成果")
    ],
    activity: {
      before: [t("Presentation and product priorities", "演讲与产品重点对齐")],
      onSite: [t("Launch, product and audience coverage", "发布、产品与观众记录")],
      after: [t("Approved visual handoff", "获准视觉资产交付")]
    },
    approachLabel: t("Documentation Approach", "记录方法"),
    verifiedOutputs: [
      claim(
        "Approved UK brand-launch record",
        "经批准的英国品牌发布记录",
        "VERIFIED_VENUS_OUTPUT",
        "geely-london-brand-launch-owner-scope"
      ),
      claim(
        "EX5 and presentation assets",
        "EX5 与演讲资产",
        "VERIFIED_VENUS_OUTPUT",
        "geely-london-brand-launch-owner-scope"
      )
    ],
    verifiedResult: claim(
      "An approved asset set preserving the product, presentation and visible UK launch setting.",
      "形成一组经批准的资产，保留产品、演讲与可见的英国发布环境。",
      "VERIFIED_VENUS_OUTPUT",
      "geely-london-brand-launch-owner-scope"
    ),
    continuedValue: t(
      "A reusable record of Geely Auto's visible UK launch moment.",
      "一套可继续使用的吉利汽车英国发布现场记录。"
    ),
    publicEvidenceAvailable: t("3 approved images", "3 张获准公开使用的影像"),
    subsequentDevelopment: claim(
      "Geely subsequently opened UK ordering for the EX5 and continued developing its announced sales and service network.",
      "此后，吉利在英国开放 EX5 订购，并继续推进其已公布的销售与服务网络建设。",
      "SUBSEQUENT_PUBLIC_DEVELOPMENT",
      "geely-ex5-uk-launch"
    ),
    subsequentDisclaimer: disclaimer,
    claimBoundary: boundary
  },
  "changan-europe-launch-2025": {
    proofTier: "commercial",
    engagementType: "exhibition",
    geography: "Germany",
    marketOrGeography: "Munich, Germany",
    participantsOrCounterpartyTypes: [],
    lastVerifiedDate: "2026-09-09",
    marketMomentLabel: t("European Expansion at IAA Mobility", "IAA Mobility 欧洲市场扩张"),
    marketMoment: claim(
      "Changan appeared at IAA Mobility 2025 in Munich with CHANGAN, DEEPAL and AVATR, and announced the European market launch of the DEEPAL S05.",
      "长安汽车携 CHANGAN、DEEPAL 与 AVATR 亮相 2025 慕尼黑国际车展，并宣布 DEEPAL S05 在欧洲上市。",
      "PUBLIC_EVENT_FACT",
      "changan-iaa-2025"
    ),
    whyItMattered: claim(
      "The Munich activity followed Changan's formal European brand launch in Mainz in March 2025 and made its expansion visible within a major European mobility event.",
      "慕尼黑活动发生在长安汽车 2025 年 3 月于美因茨完成正式欧洲品牌发布之后，使其欧洲扩张在重要 mobility 行业活动中得到公开呈现。",
      "PUBLIC_COMPANY_FACT",
      "changan-iaa-2025",
      "changan-europe-launch-mainz"
    ),
    projectObjective: claim(
      "Create an approved record connecting the vehicles, stage activity and visitor setting at IAA Mobility in Munich.",
      "形成一套经批准的记录，将慕尼黑 IAA Mobility 的车辆、舞台活动与观众环境联系起来。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "changan-europe-launch-2025-owner-scope"
    ),
    challenge: claim(
      "Show Changan's European expansion through the specific IAA Mobility setting without mislabelling the Munich appearance as the earlier formal European brand launch.",
      "通过明确的 IAA Mobility 场景呈现长安汽车的欧洲扩张，同时避免把慕尼黑亮相误写为此前的正式欧洲品牌发布。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "changan-europe-launch-2025-owner-scope"
    ),
    verifiedVenusRole: claim(
      "Venus Bridge documented the Munich exhibition setting across the stage, vehicles and guest viewing environment.",
      "Venus Bridge 记录慕尼黑展会现场，覆盖舞台、车辆与嘉宾观看环境。",
      "VERIFIED_VENUS_ROLE",
      "changan-europe-launch-2025-owner-scope"
    ),
    whatVenusBridgeDid: [
      t("Exhibition documentation", "展会记录"),
      t("Vehicle and stage coverage", "车辆与舞台记录"),
      t("Visual assets showing the European setting", "呈现欧洲场景的视觉资产")
    ],
    whatVenusBridgeDidNotDo: [
      t("Formal European launch ownership", "正式欧洲发布主办"),
      t("European expansion strategy", "欧洲扩张战略"),
      t("Sales or distribution outcomes", "销售或渠道成果")
    ],
    activity: {
      before: [t("Visible event priorities", "可见活动重点梳理")],
      onSite: [t("Stage, vehicle and visitor documentation", "舞台、车辆与观众记录")],
      after: [t("Coherent European event asset selection", "连贯欧洲活动资产筛选")]
    },
    approachLabel: t("Documentation Approach", "记录方法"),
    verifiedOutputs: [
      claim(
        "IAA Mobility event documentation",
        "IAA Mobility 活动记录",
        "VERIFIED_VENUS_OUTPUT",
        "changan-europe-launch-2025-owner-scope"
      ),
      claim(
        "Vehicle, stage and visitor assets",
        "车辆、舞台与观众资产",
        "VERIFIED_VENUS_OUTPUT",
        "changan-europe-launch-2025-owner-scope"
      )
    ],
    verifiedResult: claim(
      "A coherent approved record of Changan's visible presence at IAA Mobility 2025.",
      "形成一套经批准、连贯呈现长安汽车亮相 IAA Mobility 2025 的记录。",
      "VERIFIED_VENUS_OUTPUT",
      "changan-europe-launch-2025-owner-scope"
    ),
    continuedValue: t(
      "A reusable record of the brand's Munich industry-event presence.",
      "一套可继续使用的慕尼黑行业活动现场记录。"
    ),
    publicEvidenceAvailable: t("7 approved images", "7 张获准公开使用的影像"),
    claimBoundary: boundary
  },
  "catl-open-day-2025": {
    proofTier: "commercial",
    engagementType: "industry-event",
    geography: "Germany",
    marketOrGeography: "Munich, Germany",
    participantsOrCounterpartyTypes: ["European automotive stakeholders"],
    lastVerifiedDate: "2026-09-09",
    marketMomentLabel: t("European Technology Introduction", "欧洲技术发布"),
    marketMoment: claim(
      "At CATL Open Day in Munich, CATL unveiled Shenxing Pro, an LFP battery product presented as designed for European e-mobility needs ahead of IAA Mobility 2025.",
      "CATL 在慕尼黑 Open Day 发布神行 Pro 磷酸铁锂电池产品，并将其定位为面向欧洲电动出行需求的解决方案，活动发生于 IAA Mobility 2025 前夕。",
      "PUBLIC_COMPANY_FACT",
      "catl-shenxing-pro-open-day"
    ),
    whyItMattered: claim(
      "The event translated battery safety, lifespan, range and charging claims into a European automotive-industry communication setting.",
      "该活动把电池安全、寿命、续航与充电等技术主张带入欧洲汽车行业传播环境。",
      "PUBLIC_COMPANY_FACT",
      "catl-shenxing-pro-open-day"
    ),
    projectObjective: claim(
      "Create a clear event record of the technical presentation, speakers, screens and professional audience environment.",
      "形成清晰活动记录，呈现技术演讲、演讲者、屏幕与专业观众环境。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "catl-open-day-2025-owner-scope"
    ),
    challenge: claim(
      "Make a complex battery-technology introduction legible through the visible presentation and professional audience setting without claiming ownership of the technical proposition.",
      "通过可见的演讲与专业观众环境让复杂电池技术发布更易理解，同时不主张 Venus Bridge 对技术命题的所有权。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "catl-open-day-2025-owner-scope"
    ),
    verifiedVenusRole: claim(
      "Venus Bridge documented the Munich presentation environment, including speakers, technical screens and the professional audience setting.",
      "Venus Bridge 记录慕尼黑发布环境，包括演讲者、技术屏幕与专业观众现场。",
      "VERIFIED_VENUS_ROLE",
      "catl-open-day-2025-owner-scope"
    ),
    whatVenusBridgeDid: [
      t("Technical-event documentation", "技术活动记录"),
      t("Speaker and screen coverage", "演讲者与屏幕记录"),
      t("Professional audience context", "专业观众环境记录")
    ],
    whatVenusBridgeDidNotDo: [
      t("Technology strategy", "技术战略"),
      t("Product claims ownership", "产品主张所有权"),
      t("Customer or partnership outcomes", "客户或合作成果")
    ],
    activity: {
      before: [t("Technical presentation priorities", "技术演讲重点对齐")],
      onSite: [t("Speaker, screen and audience documentation", "演讲者、屏幕与观众记录")],
      after: [t("Approved technical-event record", "获准技术活动记录整理")]
    },
    approachLabel: t("Documentation Approach", "记录方法"),
    verifiedOutputs: [
      claim(
        "Approved CATL Open Day record",
        "经批准的 CATL Open Day 记录",
        "VERIFIED_VENUS_OUTPUT",
        "catl-open-day-2025-owner-scope"
      ),
      claim(
        "Presentation and stakeholder-environment assets",
        "演讲与利益相关方环境资产",
        "VERIFIED_VENUS_OUTPUT",
        "catl-open-day-2025-owner-scope"
      )
    ],
    verifiedResult: claim(
      "A concise approved record of CATL's technology presentation in a European automotive-industry environment.",
      "形成一套经批准的精炼记录，呈现 CATL 在欧洲汽车行业环境中的技术发布。",
      "VERIFIED_VENUS_OUTPUT",
      "catl-open-day-2025-owner-scope"
    ),
    continuedValue: t(
      "Reusable technical-event and professional-environment assets.",
      "可继续使用的技术活动与专业环境资产。"
    ),
    publicEvidenceAvailable: t("7 approved images", "7 张获准公开使用的影像"),
    claimBoundary: boundary
  },
  "leapmotor-iaa-2023": {
    proofTier: "commercial",
    engagementType: "exhibition",
    geography: "Germany",
    marketOrGeography: "Munich, Germany",
    participantsOrCounterpartyTypes: [],
    lastVerifiedDate: "2026-09-09",
    marketMomentLabel: t("Global Product Debut at IAA Mobility", "IAA Mobility 全球产品首发"),
    marketMoment: claim(
      "Leapmotor used IAA Mobility 2023 in Munich for its global strategy press conference and unveiled the C10 as its first global model.",
      "零跑汽车在慕尼黑 IAA Mobility 2023 举行全球战略发布会，并发布其首款全球化车型 C10。",
      "PUBLIC_EVENT_FACT",
      "leapmotor-2023-annual-report"
    ),
    whyItMattered: claim(
      "The appearance placed Leapmotor's global product and technology proposition within a major European mobility event at an early stage of its international development.",
      "此次亮相在其国际化发展的早期阶段，将零跑的全球化产品与技术命题置于重要欧洲 mobility 行业活动中。",
      "PUBLIC_COMPANY_FACT",
      "leapmotor-2023-annual-report"
    ),
    projectObjective: claim(
      "Create an approved exhibition record spanning the stand, vehicles, product details and visitor environment.",
      "形成一套经批准的展会记录，覆盖展台、车辆、产品细节与观众环境。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "leapmotor-iaa-2023-owner-scope"
    ),
    challenge: claim(
      "Present a Chinese EV company's global product debut through both stand-scale context and detailed vehicle evidence in a major European industry environment.",
      "在重要欧洲行业环境中，通过展台整体语境与车辆细节证据呈现一家中国电动车企的全球化产品首发。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "leapmotor-iaa-2023-owner-scope"
    ),
    verifiedVenusRole: claim(
      "Venus Bridge documented Leapmotor's visible IAA Mobility presence across the stand, vehicles, product details and visitor environment.",
      "Venus Bridge 记录零跑汽车在 IAA Mobility 的现场呈现，覆盖展台、车辆、产品细节与观众环境。",
      "VERIFIED_VENUS_ROLE",
      "leapmotor-iaa-2023-owner-scope"
    ),
    whatVenusBridgeDid: [
      t("Exhibition documentation", "展会记录"),
      t("Stand and vehicle coverage", "展台与车辆记录"),
      t("Product-detail assets", "产品细节资产")
    ],
    whatVenusBridgeDidNotDo: [
      t("Global strategy ownership", "全球战略所有权"),
      t("Stellantis transaction", "Stellantis 交易"),
      t("European distribution outcomes", "欧洲分销成果")
    ],
    activity: {
      before: [t("Stand and product priorities", "展台与产品重点对齐")],
      onSite: [t("Stand, vehicle, detail and visitor coverage", "展台、车辆、细节与观众记录")],
      after: [t("Exhibition asset sequence", "展会资产编排")]
    },
    approachLabel: t("Documentation Approach", "记录方法"),
    verifiedOutputs: [
      claim(
        "IAA Mobility exhibition record",
        "IAA Mobility 展会记录",
        "VERIFIED_VENUS_OUTPUT",
        "leapmotor-iaa-2023-owner-scope"
      ),
      claim(
        "Vehicle and product-detail assets",
        "车辆与产品细节资产",
        "VERIFIED_VENUS_OUTPUT",
        "leapmotor-iaa-2023-owner-scope"
      )
    ],
    verifiedResult: claim(
      "A reusable approved record connecting the C10-era exhibition presence with the wider European industry setting.",
      "形成一套经批准、可复用的记录，将 C10 时期的展会亮相与更广泛的欧洲行业环境联系起来。",
      "VERIFIED_VENUS_OUTPUT",
      "leapmotor-iaa-2023-owner-scope"
    ),
    continuedValue: t(
      "A structured record from exhibition scale to product detail.",
      "一套从展会规模到产品细节的结构化记录。"
    ),
    publicEvidenceAvailable: t("7 approved images", "7 张获准公开使用的影像"),
    claimBoundary: boundary
  },
  "agibot-london-launch": {
    proofTier: "commercial",
    engagementType: "launch",
    geography: "UK",
    marketOrGeography: "London, UK",
    participantsOrCounterpartyTypes: [],
    lastVerifiedDate: "2026-09-09",
    marketMomentLabel: t("UK Embodied-Robotics Launch", "英国具身机器人发布"),
    marketMoment: claim(
      "AGIBOT held its UK launch and partner conference in London on 30 June 2026, combining product demonstrations, company presentations and application-focused sessions.",
      "AGIBOT 于 2026 年 6 月 30 日在伦敦举行英国发布与合作伙伴大会，活动包括产品演示、公司介绍与应用场景专题环节。",
      "PUBLIC_EVENT_FACT",
      "agibot-uk-launch-2026"
    ),
    whyItMattered: claim(
      "The official event introduced AGIBOT's robotics portfolio and UK commercial model within a local environment focused on real-world deployment and partner engagement.",
      "官方活动在聚焦实际部署与合作伙伴交流的本地环境中，介绍 AGIBOT 的机器人产品组合与英国商业模式。",
      "PUBLIC_COMPANY_FACT",
      "agibot-uk-launch-2026"
    ),
    projectObjective: claim(
      "Create an approved visual record of the London technical presentation and displayed robotics products.",
      "形成一套经批准的视觉记录，呈现伦敦技术演讲与现场展示的机器人产品。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "agibot-london-launch-owner-scope"
    ),
    challenge: claim(
      "Connect the technical presentation with complete product-display views while keeping unverified partner and commercial outcomes outside the case claim.",
      "把技术演讲与完整产品展示画面联系起来，同时将未经核实的合作伙伴与商业成果排除在案例主张之外。",
      "OWNER_CONFIRMED_PROJECT_FACT",
      "agibot-london-launch-owner-scope"
    ),
    verifiedVenusRole: claim(
      "Venus Bridge documented the London technology-event setting across the technical presentation and product displays.",
      "Venus Bridge 记录伦敦科技活动现场，覆盖技术演讲与产品展示。",
      "VERIFIED_VENUS_ROLE",
      "agibot-london-launch-owner-scope"
    ),
    whatVenusBridgeDid: [
      t("Technology-event photography", "科技活动摄影"),
      t("Speaker and product-display documentation", "演讲者与产品展示记录"),
      t("Landscape and portrait asset coverage", "横竖画幅资产记录")
    ],
    whatVenusBridgeDidNotDo: [
      t("UK launch ownership", "英国发布主办"),
      t("Partner recruitment", "合作伙伴招募"),
      t("Commercial deployment outcomes", "商业部署成果")
    ],
    activity: {
      before: [t("Presentation and display priorities", "演讲与展示重点对齐")],
      onSite: [t("Speaker and robotics-product coverage", "演讲者与机器人产品记录")],
      after: [t("Approved event asset selection", "获准活动资产筛选")]
    },
    approachLabel: t("Documentation Approach", "记录方法"),
    verifiedOutputs: [
      claim(
        "Approved UK launch visual record",
        "经批准的英国发布视觉记录",
        "VERIFIED_VENUS_OUTPUT",
        "agibot-london-launch-owner-scope"
      ),
      claim(
        "Technical-presentation and product-display assets",
        "技术演讲与产品展示资产",
        "VERIFIED_VENUS_OUTPUT",
        "agibot-london-launch-owner-scope"
      )
    ],
    verifiedResult: claim(
      "A concise approved record connecting the technical presentation, robotics products and London launch environment.",
      "形成一套经批准的精炼记录，将技术演讲、机器人产品与伦敦发布环境联系起来。",
      "VERIFIED_VENUS_OUTPUT",
      "agibot-london-launch-owner-scope"
    ),
    continuedValue: t(
      "Reusable event assets spanning speaker and product views.",
      "覆盖演讲者与产品视角的可复用活动资产。"
    ),
    publicEvidenceAvailable: t("3 approved images", "3 张获准公开使用的影像"),
    subsequentDevelopment: claim(
      "AGIBOT publicly described the event as part of its continuing European growth and local commercial-deployment work.",
      "AGIBOT 公开将该活动描述为其持续推进欧洲增长与本地商业部署工作的一部分。",
      "SUBSEQUENT_PUBLIC_DEVELOPMENT",
      "agibot-uk-launch-2026"
    ),
    subsequentDisclaimer: disclaimer,
    claimBoundary: boundary
  }
};
