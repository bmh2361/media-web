export type Language = "en" | "zh";
export type Localized<T> = Record<Language, T>;
export type ProjectPath = "create-in-the-uk" | "launch-in-the-uk" | "enter-the-uk";
export type ExpertiseSector =
  | "automotive"
  | "fashion-beauty-apparel"
  | "entertainment-culture"
  | "technology-ai-research";

export type ProjectScenario = {
  id: string;
  primaryPath: ProjectPath;
  title: Localized<string>;
  clientObjective: Localized<string>;
  coordination: Localized<string[]>;
  possibleDeliverables: Localized<string[]>;
  status: "scenario";
};

export type PathDefinition = {
  slug: ProjectPath;
  title: Localized<string>;
  headline: Localized<string>;
  intro: Localized<string>;
  clients: Localized<string[]>;
  modules: Array<{
    id: string;
    title: Localized<string>;
    text: Localized<string>;
    items: Localized<string[]>;
  }>;
  projectSlugs: string[];
  heroProjectSlug: string;
  scenarios: ProjectScenario[];
  mediaIds: string[];
  directScope?: Localized<string[]>;
  specialistScope?: Localized<string[]>;
};

export type ExpertiseDefinition = {
  slug: ExpertiseSector;
  title: Localized<string>;
  subtitle: Localized<string>;
  headline?: Localized<string>;
  intro?: Localized<string>;
  challenge: Localized<string>;
  produce: Localized<string[]>;
  coordinate: Localized<string[]>;
  modules: Array<{ title: Localized<string>; text: Localized<string> }>;
  projectSlugs: string[];
  heroProjectId: string;
  homepageMediaId?: string;
  relatedPaths: ProjectPath[];
  evidenceNote?: Localized<string>;
};

const l = <T>(en: T, zh: T): Localized<T> => ({ en, zh });

const scenario = (
  id: string,
  primaryPath: ProjectPath,
  title: Localized<string>,
  objective: Localized<string>,
  coordination: Localized<string[]>,
  deliverables: Localized<string[]>
): ProjectScenario => ({
  id,
  primaryPath,
  title,
  clientObjective: objective,
  coordination,
  possibleDeliverables: deliverables,
  status: "scenario"
});

export const projectPaths: PathDefinition[] = [
  {
    slug: "create-in-the-uk",
    title: l("Create in the UK", "英国内容制作"),
    headline: l(
      "Commercial content, interviews and product stories made in the UK.",
      "在英国完成商业内容、采访与产品故事。"
    ),
    intro: l(
      "A single production route for creative planning, talent, locations, crews and multi-format delivery in London and across the UK.",
      "在伦敦及英国各地，以一条清晰路径统筹创意、人才、场地、团队与多格式交付。"
    ),
    clients: l(
      [
        "Brand and marketing teams",
        "Artists and creators",
        "Technology and research teams",
        "Overseas agencies"
      ],
      ["品牌与市场团队", "艺人与创作者", "科技与科研团队", "海外代理机构"]
    ),
    modules: [
      {
        id: "commercial-content",
        title: l("Commercial content", "商业内容"),
        text: l(
          "Photography, film and social-first content shaped around the brief, audience and intended channels.",
          "围绕项目需求、受众与使用渠道，制作摄影、影片和社交优先内容。"
        ),
        items: l(["Campaign imagery", "Brand film", "Vertical assets"], ["宣传影像", "品牌影片", "竖版素材"])
      },
      {
        id: "interviews",
        title: l("Interviews", "采访内容"),
        text: l(
          "Founder, expert, artist and creator conversations produced for long-form masters and approved cutdowns.",
          "为创始人、专家、艺人与创作者制作长内容主片及经确认的短版素材。"
        ),
        items: l(
          ["Editorial structure", "Camera, light and sound", "Bilingual coordination"],
          ["编辑结构", "摄影、灯光与收音", "双语协调"]
        )
      },
      {
        id: "product-demonstrations",
        title: l("Product demonstrations", "产品演示"),
        text: l(
          "Clear visual demonstrations for physical products, intelligent hardware and technology propositions.",
          "为实体产品、智能硬件与技术主张制作清晰的视觉演示。"
        ),
        items: l(
          ["User scenarios", "Feature capture", "Claims review route"],
          ["使用场景", "功能画面", "声明审核路径"]
        )
      },
      {
        id: "talent-casting-styling",
        title: l("Talent and styling", "人才与造型"),
        text: l(
          "Project-specific artists, creators, presenters, models, actors, makeup, hair and wardrobe, subject to availability and usage.",
          "按项目配置艺人、创作者、主持人、模特、演员、化妆、发型与服装，并单独确认档期和使用范围。"
        ),
        items: l(
          ["Private shortlists", "Usage-aware booking", "Makeup, hair and wardrobe"],
          ["非公开候选名单", "基于使用范围的预订", "妆发与服装"]
        )
      },
      {
        id: "multi-format-production",
        title: l("Multi-format production", "多格式制作"),
        text: l(
          "Editing, retouching, aspect ratios and file handoff are defined against the channels included in scope.",
          "根据约定渠道明确剪辑、修图、画幅版本与文件移交。"
        ),
        items: l(
          ["Long and short form", "Horizontal and vertical", "Structured handoff"],
          ["长短版本", "横竖画幅", "规范移交"]
        )
      }
    ],
    projectSlugs: ["beauty-fashion-brand-content", "london-automotive-brand-film"],
    heroProjectSlug: "beauty-fashion-brand-content",
    mediaIds: ["vbm-023", "vbm-011", "vbm-024", "vbm-001", "vbm-014"],
    scenarios: [
      scenario(
        "commercial-or-interview-production",
        "create-in-the-uk",
        l("Commercial or interview production", "商业内容或采访制作"),
        l(
          "Build a coherent UK content set around an approved brief.",
          "围绕已确认的需求制作一组完整的英国内容。"
        ),
        l(["Creative alignment", "Crew and talent", "Review route"], ["创意对齐", "团队与人才", "审核路径"]),
        l(
          ["Photography or film", "Interview master", "Channel cutdowns"],
          ["摄影或影片", "采访主片", "渠道短版"]
        )
      )
    ]
  },
  {
    slug: "launch-in-the-uk",
    title: l("Launch in the UK", "英国发布与现场执行"),
    headline: l(
      "Launches, live programmes and roadshows delivered through one UK team.",
      "由英国本地团队统筹发布、现场项目与路演。"
    ),
    intro: l(
      "For brand launches, live performance, exhibitions, product demonstrations, speakers, interviews and on-site delivery.",
      "面向品牌发布、现场表演、展览、产品演示、演讲、采访与现场执行。"
    ),
    clients: l(
      [
        "Brand and communications teams",
        "Artists and cultural organisations",
        "Automotive and technology teams"
      ],
      ["品牌与传播团队", "艺人与文化机构", "汽车与科技团队"]
    ),
    modules: [
      {
        id: "launch-programme",
        title: l("Launch programme", "发布项目"),
        text: l(
          "Connect the venue, product, speakers, interviews and live media to one practical run of show.",
          "将场地、产品、演讲、采访与现场媒体纳入一套可执行流程。"
        ),
        items: l(
          ["Brand launches", "Product demonstrations", "Stakeholder events"],
          ["品牌发布", "产品演示", "相关方活动"]
        )
      },
      {
        id: "live-performance",
        title: l("Live performance and cultural programmes", "现场表演与文化项目"),
        text: l(
          "Coordinate access, schedules, live capture and post-event selects without implying artist representation.",
          "统筹进场、排期、现场拍摄与会后精选，不暗示艺人代理关系。"
        ),
        items: l(["Concerts", "Cultural events", "Creator events"], ["演出", "文化活动", "创作者活动"])
      },
      {
        id: "exhibitions-roadshows",
        title: l("Exhibitions and roadshows", "展览与路演"),
        text: l(
          "Plan demonstrations, speaker content and audience movement for single-site or multi-location delivery.",
          "为单场或多地点执行规划演示、演讲内容与观众动线。"
        ),
        items: l(["Exhibitions", "Roadshows", "Technology showcases"], ["展览", "路演", "科技展示"])
      },
      {
        id: "on-site-delivery",
        title: l("On-site delivery", "现场执行"),
        text: l(
          "Schedules, suppliers, guest flow, photography, video and bilingual communication managed on site.",
          "在现场统筹排期、供应商、嘉宾动线、摄影、摄像与双语沟通。"
        ),
        items: l(
          ["Speakers and interviews", "Photography and video", "Local coordination"],
          ["演讲与采访", "摄影与视频", "本地协调"]
        )
      }
    ],
    projectSlugs: ["changan-europe-launch-2025", "catl-open-day-2025", "leapmotor-iaa-2023"],
    heroProjectSlug: "changan-europe-launch-2025",
    mediaIds: ["vbm-010", "vbm-007", "vbm-004", "vbm-006", "vbm-003"],
    scenarios: [
      scenario(
        "brand-launch-or-live-programme",
        "launch-in-the-uk",
        l("Brand launch or live programme", "品牌发布或现场项目"),
        l(
          "Deliver a controlled UK event with a clear content plan.",
          "以清晰内容计划完成可控的英国现场项目。"
        ),
        l(
          ["Venue and run of show", "Speakers or performers", "Live capture"],
          ["场地与流程", "演讲者或表演者", "现场拍摄"]
        ),
        l(
          ["Event documentation", "Speaker content", "Post-event selects"],
          ["活动记录", "演讲内容", "会后精选"]
        )
      )
    ]
  },
  {
    slug: "enter-the-uk",
    title: l("Enter the UK Market", "英国市场进入"),
    headline: l(
      "Connect market-entry preparation to communications, production and UK delivery.",
      "把市场进入准备衔接到传播、制作与英国落地。"
    ),
    intro: l(
      "A responsibility-led route for overseas teams coordinating UK readiness, independent specialist input, communications and local execution.",
      "以责任边界为核心，帮助海外团队统筹英国准备、独立专业意见、传播与本地执行。"
    ),
    clients: l(
      [
        "Chinese brands planning UK activity",
        "International teams without a UK delivery function",
        "Agencies needing bilingual coordination"
      ],
      ["计划开展英国业务的中国品牌", "缺少英国交付职能的国际团队", "需要双语协调的代理机构"]
    ),
    modules: [
      {
        id: "readiness",
        title: l("Readiness and responsibility map", "准备度与责任地图"),
        text: l(
          "Clarify objectives, dependencies, information and ownership before local activation.",
          "在英国启动前明确目标、依赖、资料与责任归属。"
        ),
        items: l(["Objectives", "Timeline", "Decision owners"], ["目标", "时间表", "决策责任人"])
      },
      {
        id: "specialist-referrals",
        title: l("Independent specialist referrals", "独立专业机构对接"),
        text: l(
          "Prepare briefs and introductions while legal, tax, accounting and regulated advice remains with appointed specialists.",
          "准备简报并协调引荐；法律、税务、会计及受监管意见由客户聘任的专业机构提供。"
        ),
        items: l(
          ["Brief preparation", "Bilingual coordination", "Action tracking"],
          ["简报准备", "双语协调", "行动跟踪"]
        )
      },
      {
        id: "uk-production",
        title: l("UK production and local execution", "英国制作与本地执行"),
        text: l(
          "Translate the agreed route into local production teams, locations, schedules and communications.",
          "将约定路径转化为本地制作团队、场地、排期与传播工作。"
        ),
        items: l(
          ["Local production", "On-site coordination", "Structured handoff"],
          ["本地制作", "现场协调", "规范移交"]
        )
      },
      {
        id: "activation",
        title: l("Launch communications and activation", "发布传播与落地"),
        text: l(
          "Move from readiness into approved content, events and local delivery where included in scope.",
          "在约定范围内，从准备阶段推进至经确认的内容、活动与本地交付。"
        ),
        items: l(
          ["Approved content", "Launch events", "Local activation"],
          ["经确认的内容", "发布活动", "本地启动"]
        )
      }
    ],
    projectSlugs: ["london-automotive-brand-film"],
    heroProjectSlug: "london-automotive-brand-film",
    mediaIds: ["vbm-023"],
    scenarios: [
      scenario(
        "market-entry-to-local-delivery",
        "enter-the-uk",
        l("Market-entry preparation to local delivery", "从市场进入准备到本地交付"),
        l(
          "Organise UK workstreams before production or launch decisions.",
          "在制作或发布决策前梳理英国工作流。"
        ),
        l(
          ["Responsibility map", "Specialist briefs", "Local production plan"],
          ["责任地图", "专业简报", "本地制作计划"]
        ),
        l(
          ["Project roadmap", "Bilingual information pack", "Delivery plan"],
          ["项目路线图", "双语资料包", "交付计划"]
        )
      )
    ],
    directScope: l(
      [
        "Project framing and bilingual coordination",
        "Information and timeline organisation",
        "Communications, content and UK execution"
      ],
      ["项目梳理与双语协调", "资料与时间表组织", "传播、内容与英国执行"]
    ),
    specialistScope: l(
      [
        "Legal and tax advice",
        "Accounting and company-registration agency",
        "Certification, data and immigration advice"
      ],
      ["法律与税务意见", "会计与公司注册代理", "认证、数据与移民意见"]
    )
  }
];

export const expertiseSectors: ExpertiseDefinition[] = [
  {
    slug: "automotive",
    title: l("Automotive", "汽车与出行"),
    subtitle: l("Campaigns, launches, exhibitions and road content.", "品牌内容、发布、展览与道路影像。"),
    challenge: l(
      "Vehicle access, safety, schedules and multi-market communications must work together.",
      "车辆进场、安全、排期与多市场传播需要协同运作。"
    ),
    produce: l(
      ["Campaign and brand-film imagery", "Launch and exhibition content", "Road and lifestyle assets"],
      ["宣传与品牌影片", "发布与展览内容", "道路与生活方式素材"]
    ),
    coordinate: l(
      ["Vehicle and venue requirements", "Presenters and schedules", "UK and European crews"],
      ["车辆与场地要求", "主持与排期", "英国及欧洲团队"]
    ),
    modules: [
      {
        title: l("Launches and exhibitions", "发布与展览"),
        text: l(
          "Plan the visual and operational route around the vehicle and audience.",
          "围绕车辆与受众规划视觉和执行路径。"
        )
      },
      {
        title: l("Road and lifestyle content", "道路与生活方式内容"),
        text: l(
          "Balance vehicle detail, movement and environmental context.",
          "平衡车辆细节、动态与环境语境。"
        )
      }
    ],
    projectSlugs: ["changan-europe-launch-2025", "catl-open-day-2025", "leapmotor-iaa-2023"],
    heroProjectId: "byd-bd11-london",
    relatedPaths: ["create-in-the-uk", "launch-in-the-uk", "enter-the-uk"]
  },
  {
    slug: "fashion-beauty-apparel",
    title: l("Fashion, Beauty & Apparel", "时尚、美妆与服装"),
    subtitle: l("Commercial campaigns, styling and UK production.", "商业内容、造型与英国制作。"),
    challenge: l(
      "Garment detail, talent usage and fast channel delivery form one production system.",
      "服装细节、人才使用范围与快速渠道交付需要纳入同一制作体系。"
    ),
    produce: l(
      ["Campaign and editorial photography", "Beauty and social-first content", "UK launch assets"],
      ["宣传与编辑摄影", "美妆与社交优先内容", "英国发布素材"]
    ),
    coordinate: l(
      ["Models, makeup and wardrobe", "Locations and crews", "Usage and approvals"],
      ["模特、妆发与服装", "场地与团队", "使用范围与审核"]
    ),
    modules: [
      {
        title: l("Commercial fashion", "商业时尚"),
        text: l(
          "Build image sets around garments, objectives and channels.",
          "围绕服装、传播目标与渠道建立影像体系。"
        )
      },
      {
        title: l("Beauty and styling", "美妆与造型"),
        text: l(
          "Coordinate project-specific talent and styling without a public talent database.",
          "按项目协调人才与造型，不建立公开人才库。"
        )
      }
    ],
    projectSlugs: ["london-fashion-week-2025", "beauty-fashion-brand-content"],
    heroProjectId: "beauty-fashion-brand-content",
    relatedPaths: ["create-in-the-uk", "launch-in-the-uk"]
  },
  {
    slug: "entertainment-culture",
    title: l("Entertainment & Culture", "娱乐与文化"),
    subtitle: l("Artists, creators, live events and cultural content.", "艺人、创作者、现场活动与文化内容。"),
    headline: l(
      "Content and live production for artists, creators and cultural projects.",
      "为艺人、创作者与文化项目提供内容制作和现场执行。"
    ),
    intro: l(
      "London production for artists and creators, live events, interviews, commercial and editorial content, with bilingual coordination.",
      "在伦敦为艺人、创作者、现场活动、采访、商业与编辑内容提供制作及双语协调。"
    ),
    challenge: l(
      "Access, approvals, usage, venue conditions and live schedules need clear control.",
      "进场、审核、使用范围、场地条件与现场排期需要清晰管理。"
    ),
    produce: l(
      [
        "Concert, stage and backstage content",
        "Creator commercial content",
        "Interview and editorial content"
      ],
      ["演出、舞台与经批准的后台内容", "创作者商业内容", "采访与编辑内容"]
    ),
    coordinate: l(
      ["Artists, creators and presenters", "Makeup, hair and wardrobe", "Live events and local delivery"],
      ["艺人、创作者与主持人", "妆发与服装", "现场活动与本地执行"]
    ),
    modules: [],
    projectSlugs: [],
    heroProjectId: "talent-categories",
    homepageMediaId: "vbm-021",
    relatedPaths: ["create-in-the-uk", "launch-in-the-uk"],
    evidenceNote: l(
      "Selected Visual Experience shows capability media, not named client case studies or artist representation.",
      "“精选视觉经验”展示能力媒体，不代表具名客户案例或艺人代理关系。"
    )
  },
  {
    slug: "technology-ai-research",
    title: l("Technology, AI & Research", "科技、AI与科研"),
    subtitle: l(
      "Technology products, expert content and research-informed communication.",
      "科技产品、专家内容与以科研理解为基础的传播。"
    ),
    headline: l(
      "Clearer content for complex products, people and ideas.",
      "让复杂的产品、技术与专业观点，更清晰地被理解。"
    ),
    intro: l(
      "Content for AI products, technology demonstrations, founders and experts, industry events, research-informed communication and UK launches.",
      "支持 AI 产品、科技演示、创始人与专家内容、行业活动、科研理解型传播及英国发布。"
    ),
    challenge: l(
      "Technical accuracy, claims and approval workflows must stay clear for non-specialist audiences.",
      "面向非专业受众时，技术准确性、声明与审核流程仍需保持清晰。"
    ),
    produce: l(
      [
        "AI and technology product demonstrations",
        "Founder and expert content",
        "Launch and exhibition content"
      ],
      ["AI 与科技产品演示", "创始人与专家内容", "发布与展览内容"]
    ),
    coordinate: l(
      [
        "Demonstrations and user scenarios",
        "Experts subject to fit and availability",
        "Industry events and bilingual communication"
      ],
      ["演示与使用场景", "按匹配度和档期对接专家", "行业活动与双语沟通"]
    ),
    modules: [],
    projectSlugs: ["catl-open-day-2025", "leapmotor-iaa-2023"],
    heroProjectId: "catl-open-day-2025",
    homepageMediaId: "vbm-002",
    relatedPaths: ["create-in-the-uk", "launch-in-the-uk", "enter-the-uk"],
    evidenceNote: l(
      "Research-informed communication is secondary until verified research project media and approved relationship records are available. Access to academic experts and research networks is subject to project fit and availability.",
      "在获得经核实的科研项目媒体与获批关系记录前，科研传播保持为次级内容。学术专家与科研网络的对接取决于项目匹配度与档期。"
    )
  }
];

export const getProjectPath = (slug: string) => projectPaths.find((item) => item.slug === slug);
export const getExpertiseSector = (slug: string) => expertiseSectors.find((item) => item.slug === slug);
export const pathLabels = Object.fromEntries(projectPaths.map((item) => [item.slug, item.title])) as Record<
  ProjectPath,
  Localized<string>
>;
export const expertiseLabels = Object.fromEntries(
  expertiseSectors.map((item) => [item.slug, item.title])
) as Record<ExpertiseSector, Localized<string>>;
