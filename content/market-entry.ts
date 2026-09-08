import type { LocalisedString } from "@/content/types";

const l = (en: string, zh: string): LocalisedString => ({ en, zh });

export type ComplianceSource = {
  id: string;
  title: string;
  authority: "GOV.UK" | "Companies House" | "HMRC" | "ICO" | "ASA_CAP" | "FCA" | "UKIPO" | "OtherOfficial";
  url: string;
  topic: string;
  lastCheckedAt: string;
  nextReviewAt: string;
  status: "current" | "review-required" | "withdrawn";
};

export type MarketEntryPartner = {
  legalName: string;
  serviceScope: string[];
  qualificationsVerified: boolean;
  registerEvidence: string;
  insuranceVerified: boolean;
  dataSharingTermsApproved: boolean;
  referralTermsApproved: boolean;
  conflictsProcessApproved: boolean;
  logoPermission: boolean;
  lastVerifiedAt: string;
  approvedPublicWording: LocalisedString;
  public: boolean;
};

export const marketEntryPartners: MarketEntryPartner[] = [];

export const marketEntryGovernance = {
  lastReviewedAt: "2026-07-17",
  nextReviewAt: "2026-10-17",
  reviewedBy: "Internal scope and source review",
  legalReviewStatus: "pending-independent-review" as "pending-independent-review" | "approved",
  partneredRequirements: [
    "Confirmed legal name and written service scope",
    "Verified qualifications and public-register evidence",
    "Professional indemnity insurance checked",
    "Referral, conflicts and data-sharing processes approved",
    "Logo permission and public wording approved",
    "Responsibility boundary independently reviewed"
  ]
};

export const complianceSources: ComplianceSource[] = [
  {
    id: "companies-house-acsp",
    title: "Being an Authorised Corporate Service Provider (ACSP)",
    authority: "Companies House",
    url: "https://www.gov.uk/guidance/being-an-authorised-corporate-service-provider",
    topic: "Authorised agents, identity verification and filing boundaries",
    lastCheckedAt: "2026-07-17",
    nextReviewAt: "2026-10-17",
    status: "current"
  },
  {
    id: "companies-house-acsp-list",
    title: "List of Authorised Corporate Service Providers (ACSPs)",
    authority: "Companies House",
    url: "https://www.gov.uk/government/publications/list-of-authorised-corporate-service-providers-acsps",
    topic: "Partner verification evidence",
    lastCheckedAt: "2026-07-17",
    nextReviewAt: "2026-08-17",
    status: "current"
  },
  {
    id: "hmrc-vat-registration",
    title: "Register for VAT: when to register",
    authority: "HMRC",
    url: "https://www.gov.uk/register-for-vat/when-register-for-vat",
    topic: "VAT workflow and specialist referral",
    lastCheckedAt: "2026-07-17",
    nextReviewAt: "2026-10-17",
    status: "current"
  },
  {
    id: "hmrc-eori",
    title: "Get an EORI number",
    authority: "HMRC",
    url: "https://www.gov.uk/eori",
    topic: "Import and export workflow",
    lastCheckedAt: "2026-07-17",
    nextReviewAt: "2026-10-17",
    status: "current"
  },
  {
    id: "ico-pecr",
    title: "Guide to Privacy and Electronic Communications Regulations",
    authority: "ICO",
    url: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/",
    topic: "Direct marketing, electronic communications and cookies",
    lastCheckedAt: "2026-07-17",
    nextReviewAt: "2026-08-17",
    status: "review-required"
  },
  {
    id: "asa-substantiation",
    title: "Substantiation",
    authority: "ASA_CAP",
    url: "https://www.asa.org.uk/advice-online/substantiation.html",
    topic: "Evidence for objective advertising claims",
    lastCheckedAt: "2026-07-17",
    nextReviewAt: "2026-10-17",
    status: "current"
  },
  {
    id: "fca-financial-promotions",
    title: "Approving financial promotions",
    authority: "FCA",
    url: "https://www.fca.org.uk/firms/financial-promotions-and-adverts/approving-financial-promotions",
    topic: "Financial-promotion review and approval boundary",
    lastCheckedAt: "2026-07-17",
    nextReviewAt: "2026-08-17",
    status: "current"
  },
  {
    id: "ukipo-trade-marks",
    title: "Intellectual property: trade marks",
    authority: "UKIPO",
    url: "https://www.gov.uk/government/collections/intellectual-property-trade-marks",
    topic: "Trade mark search, registration and specialist referral",
    lastCheckedAt: "2026-07-17",
    nextReviewAt: "2026-10-17",
    status: "current"
  },
  {
    id: "opss-product-safety",
    title: "Product safety advice for businesses",
    authority: "OtherOfficial",
    url: "https://www.gov.uk/guidance/product-safety-advice-for-businesses",
    topic: "Product-category scoping and specialist review",
    lastCheckedAt: "2026-07-17",
    nextReviewAt: "2026-10-17",
    status: "current"
  }
];

export const marketEntryContent = {
  eyebrow: l("UK MARKET ENTRY", "英国市场进入"),
  title: l(
    "From UK setup planning to a compliant market launch.",
    "从英国落地准备，到更有秩序的合规传播与市场启动。"
  ),
  intro: l(
    "We help Chinese brands, agencies and international teams coordinate the practical workstreams behind entering the UK — from company setup preparation and specialist referrals to compliance-aware communications, launch content, roadshows and local delivery.",
    "我们协助中国品牌、代理与国际团队梳理进入英国所需的实际工作，包括公司设立准备、专业机构对接、传播合规协调、发布内容、路演与英国本地执行。"
  ),
  boundary: l(
    "Venus Bridge provides project coordination, bilingual communications and production support. Legal, tax, accounting and regulated advice is provided by appropriately qualified independent specialists where required.",
    "Venus Bridge 提供项目协调、中英双语沟通与制作执行支持。法律、税务、会计及其他受监管专业意见，需由具备相应资质的独立专业机构提供。"
  ),
  primaryCta: l("Discuss UK market entry", "咨询英国市场进入"),
  secondaryCta: l("View the coordination scope", "查看协同范围"),
  route: [
    l("Readiness", "准备"),
    l("Setup coordination", "设立协同"),
    l("Specialist review", "专业审核"),
    l("Communications", "传播"),
    l("Launch", "启动"),
    l("Roadshow", "路演"),
    l("Handoff", "移交")
  ],
  workflows: [
    {
      id: "readiness",
      title: l("Market Entry Readiness", "市场进入准备"),
      summary: l(
        "Define what the UK activity includes, who owns each decision and which workstreams must precede launch.",
        "明确英国业务范围、决策责任以及启动前必须完成的工作流。"
      ),
      direct: [
        l("Initial requirements interview and UK activity map", "初始需求访谈与英国活动范围图"),
        l("Bilingual information checklist and stakeholder map", "中英文资料清单与利益相关方地图"),
        l("Priorities, timeline, risk register and decision log", "优先级、时间表、风险登记与决策记录")
      ],
      deliverables: [
        l("Market-entry briefing document", "市场进入项目简报"),
        l("Readiness checklist", "准备度清单"),
        l("Responsibility map and partner requirement list", "责任地图与合作方需求清单"),
        l("Bilingual project timeline", "中英双语项目时间表")
      ],
      boundary: l(
        "This is project scoping, not a legal feasibility opinion or tax-structure recommendation.",
        "该工作属于项目范围梳理，不构成法律可行性意见或税务结构建议。"
      )
    },
    {
      id: "setup",
      title: l("Company Setup Coordination", "公司设立协同"),
      summary: l(
        "Organise the information and questions needed for company setup, then route regulated tasks to the client or an appropriate provider.",
        "组织公司设立所需资料与问题，并将受监管事项交由客户或适当专业机构处理。"
      ),
      direct: [
        l("Company-name, activity and structure question list", "公司名称、业务活动与结构问题清单"),
        l("Director, shareholder and control-information checklist", "董事、股东与控制人资料清单"),
        l("Registered-office, contact and SIC discussion materials", "注册地址、联系信息与 SIC 讨论材料"),
        l(
          "Identity-verification preparation and post-setup obligations list",
          "身份核验准备与成立后基础义务清单"
        )
      ],
      deliverables: [
        l("Setup information pack", "设立资料包"),
        l("Specialist question list", "专业机构问题清单"),
        l("Responsibility and handoff tracker", "责任与移交追踪表")
      ],
      boundary: l(
        "The client or an appropriate specialist decides the final structure and handles formal filings, Companies House identity verification, ACSP activity, legal documents, tax advice and AML/KYC work.",
        "最终结构选择、正式申报、Companies House 身份核验、ACSP 代理、法律文件、税务意见及 AML/KYC 工作由客户或适当专业机构完成。"
      )
    },
    {
      id: "operations",
      title: l("Tax, Customs & Operational Referrals", "税务、海关与运营专业对接"),
      summary: l(
        "Classify the operational questions and prepare an efficient brief for accountants, tax advisers, customs agents and other providers.",
        "分类运营问题，并为会计师、税务顾问、海关代理及其他服务商准备有效简报。"
      ),
      direct: [
        l(
          "VAT, payroll, EORI, customs and insurance requirement mapping",
          "VAT、工资、EORI、海关与保险需求梳理"
        ),
        l(
          "Invoice, contract, payment and logistics workflow questions",
          "发票、合同、支付与物流流程问题整理"
        ),
        l("Specialist brief, meeting and action coordination", "专业机构简报、会议与行动项协调")
      ],
      deliverables: [
        l("Operational referral brief", "运营专业对接简报"),
        l("Open-question and decision tracker", "待确认问题与决策追踪表"),
        l("Cross-provider timeline", "跨服务商时间表")
      ],
      boundary: l(
        "Venus Bridge does not decide VAT liability, tax rates, customs classifications, permanent establishment, employment tax or banking approval.",
        "Venus Bridge 不判断 VAT 注册义务、税率、关税分类、常设机构、雇佣税或银行审批结果。"
      )
    },
    {
      id: "rights",
      title: l("Brand, Trade Mark & Rights Coordination", "品牌、商标与权利协同"),
      summary: l(
        "Connect brand-launch preparation with trade mark referral, production rights and asset handoff.",
        "将品牌发布准备与商标专业对接、制作权利及资产交付连接起来。"
      ),
      direct: [
        l("UK naming and communication-context review", "英国品牌命名与传播语境检查"),
        l("Public-register search assistance and protection list", "公开数据库检索协助与待保护资产清单"),
        l(
          "Image, music, talent, venue, territory and duration tracker",
          "图片、音乐、人才、场地、区域与期限追踪"
        ),
        l("Trade mark specialist brief and referral coordination", "商标专业机构简报与对接协调")
      ],
      deliverables: [
        l("Rights & Approval Tracker", "权利与审批追踪表"),
        l("Brand asset register", "品牌资产登记表"),
        l("Usage and handoff record", "使用范围与交付记录")
      ],
      boundary: l(
        "Formal clearance, infringement opinions, disputes and registration advice require an appropriately qualified trade mark or legal specialist.",
        "正式法律检索、侵权意见、争议处理与注册意见须由具备相应资质的商标或法律专业机构提供。"
      )
    },
    {
      id: "communications",
      featured: true,
      title: l("Marketing, Data & Claims Coordination", "营销、数据与传播声明协同"),
      summary: l(
        "Build an evidence-led approval route for claims, multilingual content, talent disclosures and marketing data touchpoints.",
        "为传播声明、多语言内容、人才标识及营销数据触点建立证据驱动的审批路径。"
      ),
      direct: [
        l("Claims inventory linked to an evidence register", "与证据登记对应的传播声明清单"),
        l("Client, legal and specialist review routing", "客户、法律与专业审核路径"),
        l("Influencer, talent and paid-partnership marking workflow", "Influencer、人才与付费合作标记流程"),
        l(
          "Website, cookie, CRM, email and SMS data-touchpoint map",
          "网站、Cookie、CRM、邮件与短信数据触点图"
        ),
        l("Bilingual consistency and launch approval checklist", "双语一致性与上线审批清单")
      ],
      deliverables: [
        l("Claims and Evidence Matrix", "声明与证据矩阵"),
        l("Marketing Approval Tracker", "营销审批追踪表"),
        l("Content Rights Register", "内容权利登记表"),
        l("Data Touchpoint Map", "数据触点图"),
        l("Launch Sign-off Checklist", "发布签署清单")
      ],
      boundary: l(
        "Legal interpretation of UK GDPR, PECR or advertising rules, formal ASA or FCA review and regulated approval remain outside our role.",
        "UK GDPR、PECR 或广告规则的法律解释、正式 ASA/FCA 审核及受监管审批不属于我们的职责。"
      )
    },
    {
      id: "product",
      title: l("Product & Sector Compliance Coordination", "产品与行业合规协同"),
      summary: l(
        "Classify the product, channel and launch questions before arranging category-specific specialist review.",
        "先梳理产品、渠道与上市问题，再安排按品类进行的专业审核。"
      ),
      direct: [
        l("Product category, sales model and market-role map", "产品品类、销售模式与市场角色梳理"),
        l(
          "Import, label, claims, testing and responsibility checklist",
          "进口、标签、声明、测试与责任方清单"
        ),
        l("Packaging, label, photography and evidence collection", "包装、标签、图片与证明资料收集"),
        l("Laboratory, product-safety or category-specialist referral", "实验室、产品安全或品类专家对接"),
        l("Product information and launch-communication consistency check", "产品信息与上市传播一致性检查")
      ],
      deliverables: [
        l("Product workstream map", "产品工作流地图"),
        l("Specialist review brief", "专业审核简报"),
        l("Pre-launch information checklist", "上市前资料清单")
      ],
      boundary: l(
        "Requirements vary by product, channel and business structure. We do not certify products, issue certificates, act as a statutory responsible person or promise market access.",
        "具体义务因产品、渠道与业务结构而异。我们不提供产品认证、不签发证书、不充当法定责任方，也不保证市场准入。"
      )
    },
    {
      id: "launch",
      title: l("Market Launch, Communications & Local Delivery", "市场启动、传播与英国本地执行"),
      summary: l(
        "Turn approved market-entry preparation into a clear UK-facing launch for customers, media, partners and audiences.",
        "将获批的市场进入准备转化为客户、媒体、合作伙伴与受众能够理解的英国市场呈现。"
      ),
      direct: [
        l("Bilingual brand and launch materials", "中英文品牌与发布资料"),
        l("UK-facing websites, campaigns, photography and film", "面向英国的网站、传播活动、摄影与影片"),
        l("Founder interviews, product demonstrations and PR assets", "创始人访谈、产品演示与公关素材"),
        l("Events, exhibitions, talent and presenter coordination", "活动、展览、人才与主持协调"),
        l("Roadshow, venue, supplier and on-site bilingual production", "路演、场地、供应商与现场双语制作"),
        l("Post-event content and structured handoff", "会后内容与规范移交")
      ],
      deliverables: [
        l("Launch communication system", "发布传播体系"),
        l("Approved campaign and event assets", "经批准的广告与活动素材"),
        l("Roadshow production pack", "路演制作包"),
        l("Structured content handoff", "规范化内容移交")
      ],
      boundary: l(
        "Launch activity begins only after the client and appointed specialists approve the relevant claims, rights and regulated workstreams.",
        "只有在客户及其指定专业机构批准相关声明、权利和受监管工作流后，市场启动活动才会推进。"
      )
    }
  ],
  responsibilities: [
    {
      title: l("Venus Bridge directly provides", "Venus Bridge 直接提供"),
      items: [
        l("Bilingual project coordination and requirements gathering", "双语项目协调与需求梳理"),
        l("Document organisation, timelines and approval tracking", "资料组织、时间表与审批追踪"),
        l("Claims, evidence and rights workflows", "声明、证据与权利工作流"),
        l("Brand communications, content and roadshow production", "品牌传播、内容与路演制作"),
        l("Local supplier coordination and structured handoff", "本地供应商协调与规范移交")
      ]
    },
    {
      title: l("Qualified specialists provide where required", "需要时由有资质专业机构提供"),
      items: [
        l("Legal, company-law, tax and accounting advice", "法律、公司法、税务与会计意见"),
        l("ACSP identity verification and formal filing services", "ACSP 身份核验与正式申报服务"),
        l("Trade mark and data-protection legal advice", "商标与数据保护法律意见"),
        l("Product certification and immigration advice", "产品认证与移民意见"),
        l("FCA-regulated approval and investment advice", "FCA 受监管审批与投资意见")
      ]
    },
    {
      title: l("The client remains responsible for", "客户最终负责"),
      items: [
        l("Final business structure and professional appointments", "最终业务结构与专业顾问任命"),
        l("Accuracy of submitted information and regulatory filings", "提交信息与监管申报的准确性"),
        l("Final legal and commercial decisions", "最终法律与商业决策"),
        l("Approval of claims, product safety and compliance", "声明批准、产品安全与合规"),
        l("Ongoing statutory obligations", "持续法定义务")
      ]
    }
  ],
  faqs: [
    {
      q: l("Do you register companies directly?", "你们直接注册公司吗？"),
      a: l(
        "No. We can organise the information, timeline and specialist brief. Formal filing, identity verification and regulated agent activity are completed by the client or an appropriately authorised provider.",
        "不直接提供。我们可以组织资料、时间表和专业机构简报；正式申报、身份核验及受监管代理工作由客户或具备适当授权的服务商完成。"
      )
    },
    {
      q: l("Do you provide legal or tax advice?", "你们提供法律或税务意见吗？"),
      a: l(
        "No. We coordinate the questions, documents and review route. Advice is provided by independently appointed qualified specialists.",
        "不提供。我们协调问题、资料与审核路径，专业意见由独立任命的合资格机构提供。"
      )
    },
    {
      q: l("Can you coordinate UK advisers?", "可以协调英国专业顾问吗？"),
      a: l(
        "Yes. We can define the requirement, help screen suitable providers, organise bilingual communication and track actions. The client appoints the adviser and makes the final decision.",
        "可以。我们可定义需求、协助筛选适合的服务商、组织双语沟通并追踪行动；顾问由客户任命，最终决定由客户作出。"
      )
    },
    {
      q: l("Can you support VAT, EORI or trade mark workstreams?", "可以支持 VAT、EORI 或商标工作流吗？"),
      a: l(
        "We can prepare the brief, information checklist and referral route. Eligibility, filing and professional conclusions are confirmed by HMRC processes or the relevant qualified specialist.",
        "我们可以准备简报、资料清单与对接路径；资格判断、正式申报与专业结论由 HMRC 流程或相关合资格专业机构确认。"
      )
    },
    {
      q: l("Can you produce UK launch events and roadshows?", "可以制作英国发布活动和路演吗？"),
      a: l(
        "Yes. We can develop the format, coordinate venues, suppliers, speakers and bilingual materials, produce the event and deliver approved media assets.",
        "可以。我们可设计形式、协调场地、供应商、嘉宾与双语资料，执行活动并交付经批准的传播素材。"
      )
    },
    {
      q: l("Can you support investor roadshows?", "可以支持投资人路演吗？"),
      a: l(
        "We can produce meetings and events after the client confirms the lawful communication route. Potential financial promotions are blocked until reviewed by the client's lawyer and an appropriately authorised or permitted specialist.",
        "在客户确认合法传播路径后，我们可提供会议和活动制作。可能构成金融推广的内容，在客户律师及具备适当授权或许可的专业机构审核前会被阻止发布。"
      )
    },
    {
      q: l("What information is required to begin?", "启动项目需要哪些信息？"),
      a: l(
        "Start with the current company location, intended UK activity, target date, product or service category, sales and import plans, data and marketing touchpoints, planned events and any advisers already appointed. Do not send identity or banking documents through the public form.",
        "请先提供当前公司注册地、英国业务计划、目标时间、产品或服务类别、销售与进口计划、数据和营销触点、拟举办活动及已聘顾问。请勿通过公开表单发送身份或银行文件。"
      )
    }
  ]
} as const;

export const hasPartneredMarketEntryNetwork = marketEntryPartners.some(
  (partner) =>
    partner.public &&
    partner.qualificationsVerified &&
    partner.insuranceVerified &&
    partner.dataSharingTermsApproved &&
    partner.referralTermsApproved &&
    partner.conflictsProcessApproved &&
    partner.logoPermission &&
    Boolean(partner.registerEvidence && partner.lastVerifiedAt)
);
