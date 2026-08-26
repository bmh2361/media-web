export type ClaimStatus = "VERIFIED" | "SUPPORTED" | "ASPIRATIONAL" | "NOT_SAFE_TO_PUBLISH";

export const phase3Claims = [
  {
    id: "london-base",
    claim: "London-based UK delivery",
    status: "VERIFIED" as ClaimStatus,
    public: true
  },
  {
    id: "bilingual-delivery",
    claim: "Bilingual China/UK communication",
    status: "SUPPORTED" as ClaimStatus,
    public: true
  },
  {
    id: "portfolio-role",
    claim: "Named project roles exactly as recorded in the approved portfolio registry",
    status: "VERIFIED" as ClaimStatus,
    public: true
  },
  {
    id: "institutional-endorsement",
    claim: "University or institutional endorsement",
    status: "NOT_SAFE_TO_PUBLISH" as ClaimStatus,
    public: false
  },
  {
    id: "full-market-entry",
    claim: "Full UK market-entry ownership",
    status: "NOT_SAFE_TO_PUBLISH" as ClaimStatus,
    public: false
  },
  {
    id: "future-specialists",
    claim: "Selected specialist coordination for deeper market development",
    status: "ASPIRATIONAL" as ClaimStatus,
    public: false
  }
] as const;

const en = {
  nav: {
    capabilities: "Capabilities",
    work: "Work",
    about: "About",
    contact: "Contact",
    cta: "Discuss a UK Collaboration",
    menu: "Open menu",
    close: "Close menu"
  },
  hero: {
    eyebrow: "REAL UK PROJECTS · INTERNATIONAL BRAND VALUE",
    title: "Build credible international presence through real UK projects.",
    body: "We help ambitious Chinese companies shape and deliver relevant UK activity—bringing together industry environments, selected academic and expert networks, creators, talent and production where appropriate—then turn the work into usable brand evidence.",
    primary: "Send a Project Brief",
    secondary: "View Selected Work"
  },
  proof: {
    eyebrow: "SELECTED PROJECTS",
    title: "Real UK and European work, precisely located.",
    body: "Named launches and content production, with place and role made explicit so the evidence is not asked to prove more than it can.",
    link: "View project"
  },
  outcomes: {
    eyebrow: "WHAT WE HELP YOU ACHIEVE",
    title: "Three commercial objectives a UK project can serve.",
    items: [
      {
        title: "Build Credible International Presence",
        text: "Create relevant UK substance that customers, partners and stakeholders can examine."
      },
      {
        title: "Create a UK Brand Moment",
        text: "Show up in an industry, launch or stakeholder environment that fits the objective."
      },
      {
        title: "Produce Assets That Keep Working",
        text: "Turn the real activity into approved film, photography and stakeholder content."
      },
      {
        title: "Control Local Delivery",
        text: "Coordinate the agreed people, logistics and production through one bilingual project layer."
      }
    ]
  },
  capabilitiesIntro: {
    eyebrow: "FOUR CAPABILITIES",
    title: "Built around what you want to make happen.",
    body: "Bring together the right relationships, environments, people and production around one commercial objective.",
    link: "Explore Capabilities"
  },
  capabilities: [
    {
      id: "institutional-expert-collaboration",
      title: "Institutional & Expert Collaboration",
      short: "Legitimate knowledge exchange, technical discussion and professional engagement.",
      problem: "You need credible expertise or a UK knowledge setting without implied endorsement.",
      coordination: "We shape the format, identify appropriate participants where verified, coordinate logistics and define how the engagement is documented.",
      outputs: "Roundtables, interviews, visits and reusable stakeholder content.",
      examples: ["Academic or expert engagement", "Technical roundtables", "Executive conversations", "Knowledge-exchange formats"]
    },
    {
      id: "industry-presence-events",
      title: "Industry Presence & Events",
      short: "Meaningful presence in relevant industry and stakeholder environments.",
      problem: "You need credible presence at an exhibition, conference, visit or brand event.",
      coordination: "We coordinate the local format, people, venue and production interfaces required for the agreed scope.",
      outputs: "Delivery support, participant coordination, documentation and follow-on assets.",
      examples: ["Exhibitions and conferences", "Roundtables and visits", "Brand events", "Event documentation"]
    },
    {
      id: "creators-talent-cultural-partnerships",
      title: "Creators, Talent & Cultural Partnerships",
      short: "Commissioned creative people within a wider commercial project.",
      problem: "You need local creative collaborators without managing separate suppliers.",
      coordination: "We define the role, coordinate casting or outreach, usage, production requirements and working interfaces.",
      outputs: "Commissioned talent and production-ready coordination.",
      examples: ["Creators and presenters", "Models and performers", "Casting and styling", "Commissioned collaborations"]
    },
    {
      id: "creative-production-brand-assets",
      title: "Creative Production & Brand Assets",
      short: "Photography and film that turn UK activity into reusable commercial assets.",
      problem: "You need UK activity turned into useful commercial material.",
      coordination: "We plan and execute the agreed creative production, from local crew and locations through capture and delivery.",
      outputs: "Photography, film, interviews, event and stakeholder content.",
      examples: ["Commercial photography", "Brand films and interviews", "Event coverage", "China-ready international content"]
    }
  ],
  selectedWork: {
    eyebrow: "SELECTED WORK",
    title: "Execution evidence, not just atmosphere.",
    body: "Projects designed to create useful commercial value during the activity and long after it.",
    link: "View Selected Work"
  },
  process: {
    eyebrow: "HOW A PROJECT COMES TOGETHER",
    title: "From objective to evidence people can use.",
    items: [
      { title: "Define the Objective", text: "Clarify the audience, decision or brand moment the activity must support." },
      { title: "Shape a Credible Route", text: "Select an appropriate environment, people and production scope—subject to fit, availability and permission." },
      { title: "Deliver & Document", text: "Execute the agreed scope and turn what genuinely happened into approved, reusable evidence." }
    ]
  },
  why: {
    eyebrow: "WHY VENUS BRIDGE",
    title: "A practical bridge between Chinese objectives and UK execution.",
    body: "Instead of managing separate UK contacts and suppliers, clients work through one bilingual coordination layer—from objective to local delivery and reusable assets.",
    items: ["One project logic", "Bilingual China/UK coordination", "London-based delivery", "Activity turned into brand assets"]
  },
  finalCta: {
    eyebrow: "START A CONVERSATION",
    title: "Planning something in the UK?",
    body: "Tell us what you want to achieve. We will identify the right people, format and execution route.",
    button: "Send a Project Brief"
  },
  programmes: {
    eyebrow: "WHAT ARE YOU TRYING TO ACHIEVE?",
    title: "Four ways a UK project could move the brand forward.",
    body: "Choose the ambition that feels closest. The activity, people and outputs are then shaped around the agreed objective.",
    items: [
      {
        title: "International Credibility Project",
        objective: "Build credible UK substance around the company, leadership or technology.",
        activity: "May include a legitimate expert conversation, visit, roundtable or executive interview.",
        outputs: "Discussion records, interviews, photography or film.",
        capabilities: ["Institutional & Expert Collaboration", "Creative Production & Brand Assets"],
        proof: { slug: "london-automotive-brand-film", label: "Adjacent production proof only: UK interview and brand-content imagery" }
      },
      {
        title: "UK Industry Presence Project",
        objective: "Build meaningful presence around a UK or European industry environment.",
        activity: "May include exhibition, conference, local coordination, presenter and event content.",
        outputs: "Event documentation and China-facing stakeholder assets.",
        capabilities: ["Industry Presence & Events", "Creative Production & Brand Assets"],
        proof: { slug: "changan-europe-launch-2025", label: "Related work: European launch content production" }
      },
      {
        title: "International Brand Activation",
        objective: "Create a premium UK-facing brand moment without full market entry.",
        activity: "May combine a London environment, commissioned talent, styling and production.",
        outputs: "Activation photography, short-form film and campaign assets.",
        capabilities: ["Creators, Talent & Cultural Partnerships", "Creative Production & Brand Assets"],
        proof: { slug: "beauty-fashion-brand-content", label: "Adjacent capability proof only: talent-facing visual production" }
      },
      {
        title: "UK Brand Content Production",
        objective: "Create credible overseas visual assets for commercial use in China and beyond.",
        activity: "May include commercial photography, interviews, brand film or event documentation.",
        outputs: "Campaign, social and stakeholder-ready visual assets.",
        capabilities: ["Creative Production & Brand Assets"],
        proof: { slug: "byd-bd11-london", label: "Related work: London launch documentation" }
      }
    ]
  },
  footer: "Real UK activity, turned into credible international brand value."
};

const zh = {
  nav: {
    capabilities: "核心能力",
    work: "精选项目",
    about: "关于我们",
    contact: "联系",
    cta: "提交项目需求",
    menu: "打开菜单",
    close: "关闭菜单"
  },
  hero: {
    eyebrow: "真实英国项目 · 国际品牌价值",
    title: "通过真实的英国项目，建立可信的国际品牌存在。",
    body: "我们帮助有国际发展目标的中国企业策划并执行合适的英国项目；根据项目需要，协调行业场景、精选高校与专家网络、创作者、人才和制作，并把真实工作转化为可使用的品牌证据。",
    primary: "提交项目需求",
    secondary: "查看精选项目"
  },
  proof: {
    eyebrow: "精选项目",
    title: "真实的英国与欧洲项目，地点清晰可核对。",
    body: "以具名发布和内容制作为证，并明确标示地点与角色，避免让证据承担超出其范围的主张。",
    link: "查看项目"
  },
  outcomes: {
    eyebrow: "我们帮助企业实现什么",
    title: "英国项目可以服务的三个商业目标。",
    items: [
      { title: "建立可信的国际存在", text: "形成客户、合作方与关键利益相关者可以核对的英国项目实质。" },
      { title: "创造英国品牌时刻", text: "在符合目标的行业、发布或利益相关方场景中出现。" },
      { title: "制作可持续使用的资产", text: "把真实活动转化为经批准的影片、摄影与利益相关方内容。" },
      { title: "控制本地执行", text: "通过一个双语项目层协调约定的人员、物流与制作。" }
    ]
  },
  capabilitiesIntro: {
    eyebrow: "四项核心能力",
    title: "围绕你希望实现的目标，组合合适的英国能力。",
    body: "把关系、场景、人才与创意制作连接起来，共同服务一个清晰的商业目标。",
    link: "了解核心能力"
  },
  capabilities: [
    {
      id: "institutional-expert-collaboration",
      title: "高校、机构与专家合作",
      short: "设计真实、准确的知识交流与专业参与形式。",
      problem: "企业需要可信的专业观点或英国知识场景，而不是模糊背书。",
      coordination: "我们设计参与形式，在关系可验证的前提下寻找合适参与者，并协调流程、现场与内容记录。",
      outputs: "圆桌、访谈、参访与可持续使用的专业内容。",
      examples: ["高校或专家参与", "技术圆桌", "高管对谈", "知识交流形式"]
    },
    {
      id: "industry-presence-events",
      title: "行业参与与活动执行",
      short: "帮助企业进入相关行业与关键受众场景。",
      problem: "企业需要在展会、会议、参访或品牌活动中建立可信露出。",
      coordination: "我们根据确认范围协调本地形式、人员、场地与制作接口。",
      outputs: "执行支持、参与者协调、活动记录与后续品牌资产。",
      examples: ["展会与会议", "圆桌与参访", "品牌活动", "活动内容记录"]
    },
    {
      id: "creators-talent-cultural-partnerships",
      title: "创作者、人才与文化合作",
      short: "把委托创意人才纳入完整商业项目。",
      problem: "企业需要本地创意合作方，但不希望分别管理供应商。",
      coordination: "我们明确合作角色，并协调选角或邀约、使用范围、制作需求与工作接口。",
      outputs: "委托人才与可进入制作流程的协调服务。",
      examples: ["创作者与主持人", "模特与表演者", "选角与造型", "委托内容合作"]
    },
    {
      id: "creative-production-brand-assets",
      title: "创意制作与品牌资产",
      short: "用摄影与影片把英国行动变成可持续使用的商业资产。",
      problem: "企业需要把英国行动转化为有效商业素材。",
      coordination: "我们从本地团队和场地到拍摄与交付，规划并执行已确认的创意制作范围。",
      outputs: "摄影、影片、访谈、活动记录与传播素材。",
      examples: ["商业摄影", "品牌影片与访谈", "活动记录", "适用于中国市场的海外内容"]
    }
  ],
  selectedWork: {
    eyebrow: "精选项目",
    title: "展示执行证据，而不只是现场氛围。",
    body: "精选那些既有真实现场，也能持续形成商业内容与品牌价值的项目。",
    link: "查看精选项目"
  },
  process: {
    eyebrow: "项目如何推进",
    title: "从目标，到可以持续使用的证据。",
    items: [
      { title: "明确目标", text: "确认项目需要支持的受众、决策或品牌时刻。" },
      { title: "设计可信路径", text: "根据匹配度、可用性与授权，选择合适的场景、人员与制作范围。" },
      { title: "执行并形成记录", text: "完成约定范围，并把真实发生的工作转化为经批准、可持续使用的证据。" }
    ]
  },
  why: {
    eyebrow: "为什么是 VENUS BRIDGE",
    title: "把中国企业目标与英国本地执行连接起来。",
    body: "客户无需分别管理英国联系人与供应商。我们以一层中英双语协调，把目标、本地执行与可持续使用的品牌资产连接起来。",
    items: ["统一项目逻辑", "中英双语协调", "伦敦本地执行", "把行动转化为品牌资产"]
  },
  finalCta: {
    eyebrow: "开始沟通",
    title: "正在计划英国项目？",
    body: "告诉我们希望实现什么。我们会判断适合的人员、形式与执行路径。",
    button: "提交项目需求"
  },
  programmes: {
    eyebrow: "你希望实现什么？",
    title: "四种可以推动品牌向前的英国项目。",
    body: "先选择最接近的目标，再围绕确认的范围设计活动、参与者与成果。",
    items: [
      {
        title: "国际可信度项目",
        objective: "围绕企业、管理层或技术建立可信的英国项目基础。",
        activity: "可根据目标设计合规的专家交流、参访、圆桌或高管访谈。",
        outputs: "讨论记录、访谈、摄影或影片。",
        capabilities: ["高校、机构与专家合作", "创意制作与品牌资产"],
        proof: { slug: "london-automotive-brand-film", label: "仅为相邻制作证据：英国访谈与品牌内容影像" }
      },
      {
        title: "英国行业参与项目",
        objective: "围绕英国或欧洲行业环境建立有意义的品牌露出。",
        activity: "可包括展会、会议、本地协调、主持人与活动内容。",
        outputs: "活动记录与面向中国市场的利益相关方素材。",
        capabilities: ["行业参与与活动执行", "创意制作与品牌资产"],
        proof: { slug: "changan-europe-launch-2025", label: "相关项目：欧洲发布活动内容制作" }
      },
      {
        title: "国际品牌激活项目",
        objective: "在不等同完整市场进入的前提下，创造高质量英国品牌场景。",
        activity: "可组合伦敦场景、委托人才、造型与创意制作。",
        outputs: "活动摄影、短片与 campaign 素材。",
        capabilities: ["创作者、人才与文化合作", "创意制作与品牌资产"],
        proof: { slug: "beauty-fashion-brand-content", label: "仅为相邻能力证据：人才参与的视觉制作" }
      },
      {
        title: "英国品牌内容制作",
        objective: "为中国及其他市场制作可信的海外商业视觉资产。",
        activity: "可包括商业摄影、访谈、品牌影片或活动记录。",
        outputs: "适用于 campaign、社交与利益相关方沟通的视觉资产。",
        capabilities: ["创意制作与品牌资产"],
        proof: { slug: "byd-bd11-london", label: "相关项目：伦敦发布活动记录" }
      }
    ]
  },
  footer: "把真实的英国行动，转化为可信的国际品牌价值。"
};

export const phase3 = { en, zh } as const;

export const phase3ProjectCapabilities: Record<string, { en: string[]; zh: string[] }> = {
  "changan-europe-launch-2025": { en: ["Industry Presence & Events", "Creative Production & Brand Assets"], zh: ["行业参与与活动执行", "创意制作与品牌资产"] },
  "byd-bd11-london": { en: ["Industry Presence & Events", "Creative Production & Brand Assets"], zh: ["行业参与与活动执行", "创意制作与品牌资产"] },
  "catl-open-day-2025": { en: ["Industry Presence & Events", "Creative Production & Brand Assets"], zh: ["行业参与与活动执行", "创意制作与品牌资产"] },
  "leapmotor-iaa-2023": { en: ["Industry Presence & Events", "Creative Production & Brand Assets"], zh: ["行业参与与活动执行", "创意制作与品牌资产"] },
  "london-automotive-brand-film": { en: ["Creative Production & Brand Assets"], zh: ["创意制作与品牌资产"] },
  "european-road-lifestyle": { en: ["Creative Production & Brand Assets"], zh: ["创意制作与品牌资产"] },
  "london-fashion-week-2025": { en: ["Creators, Talent & Cultural Partnerships", "Creative Production & Brand Assets"], zh: ["创作者、人才与文化合作", "创意制作与品牌资产"] },
  "beauty-fashion-brand-content": { en: ["Creators, Talent & Cultural Partnerships", "Creative Production & Brand Assets"], zh: ["创作者、人才与文化合作", "创意制作与品牌资产"] }
};
