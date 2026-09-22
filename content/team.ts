import type { LocalisedString } from "@/content/types";

export type TeamMember = {
  slug: string;
  name: string;
  displayNameZh?: string;
  role?: LocalisedString;
  specialism?: LocalisedString;
  contribution: LocalisedString;
  expertiseSummary: LocalisedString;
  credential: LocalisedString;
  projectResponsibility?: LocalisedString;
  clientValue?: LocalisedString;
  expertise?: LocalisedString[];
  image: string;
  imageAlt: LocalisedString;
  focalPoint: { x: number; y: number };
  imageTreatment?: "mono" | "colour";
  imageFit?: "cover" | "contain";
  featured?: boolean;
  order: number;
  public: boolean;
  approved: boolean;
};

export type TeamRole = {
  id: string;
  title: LocalisedString;
  responsibility: LocalisedString;
  clientValue?: LocalisedString;
  relationship: "core-function" | "project-network";
};

const l = (en: string, zh: string): LocalisedString => ({ en, zh });

// Profile copy is edited from the supplied people/index.json. Statements about
// prior work remain attributed as professional background, not Venus Bridge work.
export const teamMembers: TeamMember[] = [
  {
    slug: "vivian",
    name: "Vivian Wang",
    role: l("Co-Founder · Client & Creative Direction", "联合创始人 · 客户与创意方向"),
    specialism: l("Brand presentation & production standards", "品牌呈现与制作标准"),
    contribution: l(
      "Shapes brand expression and client communication for technology projects, maintaining the creative and production standard through delivery.",
      "负责科技项目的品牌表达与客户沟通，并在创意交付全过程把控制作与视觉标准。"
    ),
    expertiseSummary: l(
      "Creative direction, brand presentation and visual production across film, fashion and commercial settings.",
      "专长涵盖创意方向、品牌呈现，以及影视、时尚与商业场景中的视觉制作。"
    ),
    credential: l(
      "International film, fashion and commercial visual direction",
      "国际影视、时尚与商业视觉方向经验"
    ),
    projectResponsibility: l(
      "Leads client communication, brand presentation and creative delivery for technology projects.",
      "负责科技项目的客户沟通、品牌表达与创意交付。"
    ),
    clientValue: l(
      "A clear creative route that remains accountable to the commercial objective.",
      "让创意路径清晰，并始终对应项目的商业目标。"
    ),
    expertise: [
      l("Creative direction", "创意方向"),
      l("Brand presentation", "品牌呈现"),
      l("Visual production", "视觉制作"),
      l("Client leadership", "客户项目领导")
    ],
    image: "/people/vivian-wang.jpg",
    imageAlt: l("Colour portrait of Vivian Wang.", "Vivian Wang 彩色肖像。"),
    focalPoint: { x: 50, y: 34 },
    imageTreatment: "colour",
    imageFit: "cover",
    featured: true,
    order: 2,
    public: true,
    approved: true
  },
  {
    slug: "fei-cao",
    name: "Dr. Fei Cao",
    role: l("China Corporate Relations & Project Development", "中国企业关系与项目拓展"),
    specialism: l("China–UK requirement discovery & coordination", "中英需求发现与项目协调"),
    contribution: l(
      "Leads early China-side engagement, clarifies enterprise requirements and translates them into an executable UK delivery brief.",
      "负责中国端前期企业对接与需求澄清，并将目标转化为英国团队可执行的项目路径。"
    ),
    expertiseSummary: l(
      "Corporate engagement, partnership development, technical requirement discovery and China-side coordination.",
      "专长涵盖企业对接、合作拓展、技术需求发现与中国端协调。"
    ),
    credential: l(
      "PhD · Chemical & Process Engineering, University of Leeds",
      "博士 · 利兹大学化学与过程工程"
    ),
    projectResponsibility: l(
      "Leads early corporate engagement, requirement discovery and China-side stakeholder coordination.",
      "负责企业前期对接、需求发现与中国端利益相关方协调。"
    ),
    clientValue: l(
      "Fewer assumptions between the corporate objective in China and the team delivering in the UK.",
      "减少中国端企业目标与英国执行团队之间的信息偏差。"
    ),
    expertise: [
      l("Corporate engagement", "企业对接"),
      l("Requirement discovery", "需求发现"),
      l("Stakeholder coordination", "利益相关方协调"),
      l("Technical translation", "技术需求转译")
    ],
    image: "/people/fei-cao.jpg",
    imageAlt: l("Colour portrait of Dr. Fei Cao.", "Dr. Fei Cao 彩色肖像。"),
    focalPoint: { x: 50, y: 36 },
    imageTreatment: "colour",
    imageFit: "cover",
    order: 5,
    public: true,
    approved: true
  },
  {
    slug: "minghan",
    name: "Dr. Minghan Bao",
    displayNameZh: "包铭涵 博士",
    role: l("Co-Founder · Energy, AI & Technology Strategy", "联合创始人 · 能源、人工智能与技术战略"),
    specialism: l("Energy systems, applied AI & industrial technology", "能源系统、应用人工智能与工业技术"),
    contribution: l(
      "Minghan brings an engineering and applied AI perspective to energy systems and industrial technology, helping connect technical capability with commercial relevance.",
      "铭涵以工程与应用人工智能背景理解能源系统和工业技术，帮助企业把技术能力与实际商业需求联系起来。"
    ),
    expertiseSummary: l(
      "His doctoral research applied machine learning and AI to industrial sensing and multiphase-flow measurement. His background also includes data systems and railway microgrid research. This is personal research experience, not Venus Bridge client delivery.",
      "博士研究将机器学习与人工智能应用于工业传感和多相流测量，背景亦涵盖数据系统与铁路微电网研究。这些属于个人研究经历，不代表 Venus Bridge 的客户交付项目。"
    ),
    credential: l(
      "PhD in Chemical & Process Engineering, University of Leeds. Global Talent Visa holder, endorsed by the Royal Academy of Engineering — a personal visa endorsement, not an endorsement of Venus Bridge.",
      "利兹大学化学与过程工程博士。英国皇家工程院背书全球人才签证持有人；此为个人签证背书，不代表对 Venus Bridge 的背书。"
    ),
    projectResponsibility: l(
      "Leads energy, AI and technology strategy, translating complex technical propositions into clearer evaluation and discussion with potential UK stakeholders.",
      "负责能源、人工智能与技术战略，帮助潜在英国合作方更清晰地评估和讨论复杂技术方案。"
    ),
    clientValue: l(
      "Helps technology companies explain technically complex products in a form that UK commercial, research and industry stakeholders can evaluate more effectively.",
      "帮助技术企业把复杂产品和技术能力转化为英国商业、科研及产业合作方更容易判断和讨论的表达。"
    ),
    expertise: [
      l("Energy Systems", "能源系统"),
      l("Applied AI", "应用人工智能"),
      l("Industrial Technology", "工业技术"),
      l("Technical Commercialisation", "技术商业化")
    ],
    image: "/people/minghan-bao.jpg",
    imageAlt: l("Colour portrait of Dr. Minghan Bao.", "包铭涵博士彩色肖像。"),
    focalPoint: { x: 50, y: 32 },
    imageTreatment: "colour",
    imageFit: "cover",
    featured: true,
    order: 1,
    public: true,
    approved: true
  },
  {
    slug: "patrick-lenihan",
    name: "Dr. Patrick Lenihan",
    role: l("Applied AI & Technical Delivery", "应用人工智能与技术交付"),
    specialism: l("Machine learning & creative technology", "机器学习与创意技术"),
    contribution: l(
      "Turns technical opportunities into tested experiments, solution designs and implementable workflows for project delivery.",
      "将技术机会转化为经过验证的实验、解决方案设计与可实施的项目工作流。"
    ),
    expertiseSummary: l(
      "Applied AI, machine-learning optimisation, intelligent systems and creative production workflows.",
      "专长涵盖应用型 AI、机器学习优化、智能系统与创意生产工作流。"
    ),
    credential: l("PhD · Computer Science (UK)", "博士 · 英国计算机科学"),
    projectResponsibility: l(
      "Turns technical opportunities into experiments, solution designs and implementable workflows.",
      "将技术机会转化为实验、解决方案设计与可实施工作流。"
    ),
    clientValue: l(
      "Applied AI choices tested against practical production and collaboration needs.",
      "让应用型 AI 选择经过真实制作与协作需求的检验。"
    ),
    expertise: [
      l("Applied AI", "应用型 AI"),
      l("ML optimisation", "机器学习优化"),
      l("Creative workflows", "创意工作流"),
      l("Solution design", "方案设计")
    ],
    image: "/people/patrick-lenihan.png",
    imageAlt: l("Colour portrait of Dr. Patrick Lenihan.", "Dr. Patrick Lenihan 彩色肖像。"),
    focalPoint: { x: 50, y: 31 },
    imageTreatment: "colour",
    imageFit: "cover",
    order: 4,
    public: true,
    approved: true
  },
  {
    slug: "richard-bussmann",
    name: "Dr. Richard Bußmann",
    role: l("European Commercial Strategy & Finance", "欧洲商业战略与财务"),
    specialism: l("Commercial feasibility, structure & risk", "商业可行性、结构与风险"),
    contribution: l(
      "Frames European opportunities through commercial feasibility, financial structure, risk and long-term partnership considerations.",
      "从商业可行性、财务结构、风险与长期合作角度判断欧洲市场机会。"
    ),
    expertiseSummary: l(
      "European corporate strategy, compliance, M&A, investment analysis and China–Europe commercial context.",
      "专长涵盖欧洲企业战略、合规、并购、投资分析与中欧商业语境。"
    ),
    credential: l(
      "PhD · Applied Financial Mathematics, Central China Normal University",
      "博士 · 华中师范大学应用金融数学"
    ),
    projectResponsibility: l(
      "Supports commercial framing, risk assessment and long-term partnership structures.",
      "负责商业框架、风险评估与长期合作结构方面的判断。"
    ),
    clientValue: l(
      "European commercial context connected to an informed understanding of Chinese business culture.",
      "将欧洲商业语境与对中国商业文化的直接理解连接起来。"
    ),
    expertise: [
      l("Commercial feasibility", "商业可行性"),
      l("European context", "欧洲市场语境"),
      l("Financial framing", "财务框架"),
      l("Risk assessment", "风险评估")
    ],
    image: "/people/richard-bussmann.png",
    imageAlt: l("Colour portrait of Dr. Richard Bußmann.", "Dr. Richard Bußmann 彩色肖像。"),
    focalPoint: { x: 50, y: 45 },
    imageTreatment: "colour",
    imageFit: "cover",
    order: 3,
    public: true,
    approved: true
  }
];

export const publicTeamMembers = teamMembers
  .filter((member) => member.public && member.approved)
  .sort((a, b) => a.order - b.order);

export const coreTeamRoles: TeamRole[] = [
  {
    id: "client-direction",
    title: l("Client direction", "客户方向"),
    responsibility: l(
      "Defines the objective, decision owners and what success needs to mean before local work begins.",
      "在当地工作开始前，明确项目目标、决策责任与成功标准。"
    ),
    clientValue: l("A brief connected to the business need.", "让项目需求始终对应真实商业目标。"),
    relationship: "core-function"
  },
  {
    id: "project-architecture",
    title: l("Project architecture", "项目设计"),
    responsibility: l(
      "Turns the objective into a viable UK or European project with a defined scope and approval route.",
      "把目标转化为范围与审批路径清楚、可在英国或欧洲执行的项目。"
    ),
    clientValue: l("A workable route before resources are committed.", "在投入资源前先形成可执行路径。"),
    relationship: "core-function"
  },
  {
    id: "coordination",
    title: l("Partnerships & coordination", "合作方与协调"),
    responsibility: l(
      "Organises the organisations, settings, people and specialist skills the agreed project requires.",
      "围绕已确认项目，组织所需机构、场地、人员与专业能力。"
    ),
    clientValue: l("The right participants working to one brief.", "让合适参与方围绕同一份需求协作。"),
    relationship: "core-function"
  },
  {
    id: "local-delivery",
    title: l("Local delivery", "当地执行"),
    responsibility: l(
      "Keeps timing, local interfaces, communication and execution connected through handover.",
      "统一管理时间、当地接口、沟通与执行，直至完成交接。"
    ),
    clientValue: l("One accountable delivery route.", "形成一条责任清楚的交付路径。"),
    relationship: "core-function"
  },
  {
    id: "evidence",
    title: l("Creative evidence", "创意与项目证据"),
    responsibility: l(
      "Preserves approved content, documentation and project material where the scope calls for it.",
      "在项目范围需要时，保留经批准的内容、记录与项目材料。"
    ),
    clientValue: l(
      "Useful assets that can outlast the project moment.",
      "留下可以在项目之后继续使用的资产。"
    ),
    relationship: "core-function"
  }
];

export const extendedProductionRoles: TeamRole[] = [
  ["research", "Research & institutions", "研究与机构"],
  ["industry", "Industry specialists", "行业专家"],
  ["events", "Venue & event operations", "场地与活动执行"],
  ["creative", "Creative production", "创意制作"],
  ["talent", "Creators & talent", "创作者与人才"],
  ["logistics", "Local logistics", "当地后勤"]
].map(([id, en, zh]) => ({
  id,
  title: l(en, zh),
  responsibility: l(
    "Engaged only where the agreed project requires this capability.",
    "仅在已确认项目确有需要时配置。"
  ),
  relationship: "project-network"
}));
