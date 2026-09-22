import type { Language } from "@/lib/i18n";

const l = <T>(en: T, zh: T): Record<Language, T> => ({ en, zh });

// Capability offers, not claims about completed commercial outcomes.
export const commercial = {
  positioning: l(
    "UK market entry and partnerships for Chinese technology companies.",
    "帮助中国科技企业，在英国建立市场与合作。"
  ),
  introduction: l(
    "We help Chinese technology businesses assess market fit, prepare a locally relevant proposition and turn UK opportunities into focused launch, partnership and local delivery programmes.",
    "从判断市场和应用场景，到本地化表达、发布落地、合作方沟通与后续推进，我们围绕清晰的商业目标组织英国本地行动，并按项目拓展欧洲合作。"
  ),
  geography: l("UK-led, with selected work across Europe.", "以英国为起点，按项目开展欧洲合作。"),
  companyCta: l("Discuss a UK Market Project", "沟通英国市场项目"),
  demandCta: l("Share a Commercial Requirement", "提交商业需求"),
  specialistCta: l("Introduce Your Capability", "介绍专业能力"),
  scopeNote: l(
    "Each engagement has an agreed scope, deliverables, timeline, responsibilities and fee. Research and outreach do not guarantee introductions, buyer interest, sales, investment or media coverage.",
    "每个项目单独确认范围、交付、时间、职责和费用。研究与沟通不等于保证引荐、买家意向、销售、投资或媒体报道。"
  ),
  sectors: l(
    [
      "AI, Robotics & Intelligent Systems",
      "Energy & Smart Infrastructure",
      "Mobility & Automotive Technology"
    ],
    ["人工智能、机器人与智能系统", "能源与智慧基础设施", "出行与汽车技术"]
  ),
  adjacent: l(
    "Selected adjacent industrial and technology projects where there is a clear UK market-entry fit.",
    "兼顾与英国市场进入目标明确匹配的相关工业与技术项目。"
  ),
  demandIntroduction: l(
    "Start with the UK or European requirement, then assess whether a relevant Chinese technology or company is worth progressing.",
    "先理解英国或欧洲企业的真实业务需求，再判断是否存在值得推进的中国技术或企业。"
  ),
  situations: l(
    [
      [
        "Considering the UK, but unsure where to start?",
        "Test the market assumptions, application context and evidence gaps before committing to a launch."
      ],
      [
        "An exhibition needs value beyond the event?",
        "Define the audience and proposition beforehand, coordinate local activity, then organise feedback and next actions."
      ],
      [
        "Looking for buyers, partners or pilot environments?",
        "Clarify which organisations could be relevant and scope the research and outreach needed to test that fit."
      ],
      [
        "China headquarters needs a UK execution layer?",
        "Give a defined project a local coordinator, clear approvals and practical reporting."
      ]
    ],
    [
      ["想进入英国，但不知道从哪里开始？", "先判断应用场景、市场假设和证据缺口，再决定是否投入发布或拓展。"],
      [
        "已经订了展会，希望留下的不只是照片？",
        "展前明确受众与表达，展中推进本地行动，展后整理反馈和下一步。"
      ],
      ["需要买家、合作方或试点场景？", "先明确哪些机构值得接触，再按范围开展研究与沟通，验证合作可能。"],
      ["中国总部需要一个英国执行接口？", "为具体项目安排本地协调，明确审批流程、责任和汇报节奏。"]
    ]
  ),
  steps: l(
    [
      ["Understand", "Clarify the objective, application context and evidence needed."],
      ["Position", "Make the product and proposition relevant to UK stakeholders."],
      [
        "Connect",
        "Identify and approach relevant organisations where included in scope; participation depends on fit and interest."
      ],
      [
        "Deliver",
        "Coordinate the agreed launch, meetings, exhibition, communication assets or local activity."
      ],
      ["Follow Through", "Capture feedback, organise contacts and define the next commercial action."]
    ],
    [
      ["判断", "明确商业目标、应用场景和需要补足的证据。"],
      ["定位", "把技术与产品优势转化为英国受众听得懂、愿意讨论的价值。"],
      ["沟通", "按约定范围研究并接触相关机构，是否参与取决于匹配度与双方意愿。"],
      ["落地", "统筹已确认的发布、会议、展会、传播素材或本地行动。"],
      ["跟进", "整理反馈与联系记录，明确下一项商业行动。"]
    ]
  ),
  advantages: l(
    [
      [
        "China-to-UK translation",
        "Translate expectations, decisions and briefs between China headquarters and UK delivery teams."
      ],
      [
        "Technology-informed commercial translation",
        "Our engineering, energy systems and applied AI research backgrounds help us understand complex products, ask useful questions and frame clearer commercial conversations."
      ],
      [
        "Brand and local execution",
        "Connect the intended message with the assets, approvals and on-the-ground work needed to deliver it. Selected cases show the team's actual production role."
      ],
      [
        "Specialists when the brief needs them",
        "Coordinate relevant professional, technical or creative input subject to availability and fit. Specialist responsibilities are agreed separately."
      ]
    ],
    [
      ["理解中英双方的工作方式", "把中国总部的目标、决策与项目要求转化为英国团队可执行的安排。"],
      [
        "懂技术，也重视商业表达",
        "工程、能源系统与应用人工智能研究背景帮助我们理解复杂产品、提出有效问题，并把技术优势讲清楚。"
      ],
      ["把品牌表达落实到现场", "连接传播目标、素材、审批与本地交付。案例展示的是团队实际承担的制作工作。"],
      ["按需组织专业能力", "根据项目需要协调专业、技术或创意支持，具体人选取决于适配与可用性，职责另行确认。"]
    ]
  ),
  goodFit: l(
    [
      "A real product, technology or operating business",
      "A defined UK ambition or selected European objective",
      "A decision maker involved in the brief and approvals",
      "A realistic timeframe for market entry",
      "Willingness to adapt the proposition to local requirements",
      "Capacity for market validation and sustained follow-up"
    ],
    [
      "已有真实产品、技术或运营业务",
      "有明确的英国目标或具体欧洲项目",
      "决策者参与需求沟通与审批",
      "市场进入时间安排合理",
      "愿意根据当地需求调整产品表达",
      "接受验证与持续跟进所需的投入"
    ]
  ),
  notFit: l(
    [
      "Guaranteed buyers without market preparation",
      "Guaranteed sales, media coverage or investment",
      "Requests to claim institutional endorsement",
      "A product or business not ready for external discussion",
      "Regulated legal, tax or compliance advice from Venus Bridge"
    ],
    [
      "不做市场准备，只要求保证买家",
      "要求保证销售、媒体报道或投资",
      "要求借机构名义作背书",
      "产品或业务尚不适合对外讨论",
      "要求 Venus Bridge 直接出具法律、税务或合规意见"
    ]
  )
};

export const engagements = [
  {
    id: "readiness",
    title: l("UK Market & Partnership Readiness", "英国市场与合作准备"),
    audience: l(
      "For companies deciding whether, where and how to enter the UK.",
      "适合需要判断英国市场是否值得进入、从哪里切入的企业。"
    ),
    scope: l(
      [
        "Objective and use-case clarification",
        "Focused market and competitor context",
        "Application, audience and stakeholder mapping",
        "Proposition review and evidence gaps"
      ],
      [
        "目标与应用场景澄清",
        "聚焦的市场与竞争背景研究",
        "应用、受众和相关机构梳理",
        "价值表达审视与证据缺口分析"
      ]
    ),
    outputs: l(
      [
        "Market-entry brief",
        "Target stakeholder framework",
        "Messaging review",
        "Recommended first action plan"
      ],
      ["市场进入简报", "目标机构分类框架", "产品与传播表达建议", "首轮行动计划"]
    )
  },
  {
    id: "launch",
    title: l("UK Launch & Partnership Programme", "英国市场启动与合作项目"),
    audience: l(
      "Our primary offer for a launch, exhibition, delegation visit, product demonstration or defined market-entry objective.",
      "核心服务：围绕发布、展会、管理层来访、产品演示或明确的市场启动目标组织项目。"
    ),
    scope: l(
      [
        "Commercial objective and stakeholder plan",
        "Localised proposition and communication assets",
        "Launch, exhibition, demonstration or meeting coordination",
        "Relevant partner, expert or buyer research where agreed",
        "Local execution and structured follow-up"
      ],
      [
        "商业目标与目标受众规划",
        "本地化表达与传播素材",
        "发布、展会、演示或会议协调",
        "按约定开展合作方、专家或买家研究",
        "英国现场执行与结构化跟进"
      ]
    ),
    outputs: l(
      [
        "Before: objective, audience brief and delivery plan",
        "During: agreed activity, assets and coordination",
        "After: feedback record and next-step actions"
      ],
      [
        "项目前：目标、受众简报与执行计划",
        "项目中：约定的现场工作、素材与协调",
        "项目后：反馈记录与后续行动清单"
      ]
    )
  },
  {
    id: "development",
    title: l("UK Partnership Development", "英国合作推进"),
    audience: l(
      "For companies that need defined local follow-up after an initial market activity.",
      "适合完成首轮市场活动后，需要继续沟通、验证和推进合作的企业。"
    ),
    scope: l(
      [
        "Target account research and follow-up coordination",
        "Meeting preparation and feedback tracking",
        "Pilot or demonstration coordination where agreed",
        "Local partner communication and China HQ reporting"
      ],
      ["目标机构研究与跟进协调", "会议准备与反馈追踪", "按约定协调试点或演示", "本地合作沟通与中国总部汇报"]
    ),
    outputs: l(
      [
        "Agreed account and action list",
        "Meeting and response log",
        "Periodic progress report",
        "Next-step recommendations within a defined term"
      ],
      ["约定的目标机构与行动清单", "会议与回应记录", "阶段进展汇报", "项目期内的下一步建议"]
    )
  }
];

export const partnerTracks = [
  {
    id: "commercial-demand",
    intent: "demand",
    title: l("Commercial demand", "商业需求"),
    audience: l(
      "Buyers, distributors, importers, operators, system integrators, corporate innovation teams and potential pilot customers.",
      "面向买家、分销商、进口商、运营方、系统集成商、企业创新团队与潜在试点客户。"
    ),
    body: l(
      "Start with the UK or European requirement, then assess whether a relevant Chinese technology or company is worth progressing. Research depth, outreach, responsibilities and commercial terms are scoped before work begins.",
      "先理解英国或欧洲企业的真实业务需求，再判断是否存在值得推进的中国技术或企业。研究深度、对接范围、职责与商业条款在启动前确认。"
    ),
    examples: l(
      [
        "Robotics for a hospitality or operational environment",
        "A distribution opportunity in intelligent hardware",
        "A manufacturing or technology supplier brief",
        "A transport, commercial property or infrastructure pilot"
      ],
      [
        "酒店或运营场景中的机器人应用",
        "智能硬件产品的分销机会",
        "制造或技术供应商需求",
        "交通、商业地产或基础设施试点"
      ]
    )
  },
  {
    id: "research",
    intent: "research",
    title: l("Technology & research collaboration", "技术与研究合作"),
    audience: l(
      "Researchers, universities, innovation programmes, technical experts, R&D teams, labs and applied research organisations.",
      "面向研究人员、高校、创新项目、技术专家、企业研发团队、实验室与应用研究机构。"
    ),
    body: l(
      "Where the technical proposition is relevant and both sides see value, we can help structure the brief, initial communication and practical next steps. Research participation is not brand endorsement; any introduction is subject to availability, fit and institutional approval where required.",
      "当技术方向匹配、双方认可合作价值时，我们可协助明确研究需求、组织初步沟通与下一步安排。研究参与不等于品牌背书；引荐取决于适配、可用性，以及必要的机构审批。"
    ),
    examples: l(
      [
        "An applied technical question with an identifiable use case",
        "A demonstration or feasibility discussion",
        "A mutually relevant research brief"
      ],
      ["有明确应用场景的技术问题", "演示或可行性讨论", "双方均有兴趣的研究课题"]
    )
  },
  {
    id: "delivery-partners",
    intent: "specialist",
    title: l("Professional & delivery partners", "专业与执行合作方"),
    audience: l(
      "Legal, tax, accounting, compliance, certification, logistics, industry specialists, venues, event teams and creative or technical suppliers.",
      "面向法律、税务、会计、合规、认证、物流、行业专家、场地、活动及创意或技术团队。"
    ),
    body: l(
      "We involve specialists when a project needs their expertise. Before work starts, we agree the commercial context, scope, responsibilities, timeline, approval route and relevant commercial terms. Regulated advice remains the responsibility of the appointed qualified provider.",
      "只在项目确有需要时组织专业支持。开始工作前，明确商业背景、范围、职责、时间、审批路径及适用商业条款。受监管的专业意见由受聘且具备相应资质的服务方负责。"
    ),
    examples: l(
      [
        "A scoped specialist brief",
        "An agreed point of contact and approval route",
        "Clear delivery and commercial terms"
      ],
      ["范围明确的专业需求", "确认项目接口与审批路径", "清楚的交付与商业条款"]
    )
  }
];
