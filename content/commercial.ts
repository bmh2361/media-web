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
  )
};

export const engagements = [
  {
    id: "readiness",
    stage: l("Explore", "探索机会"),
    question: l("Is the UK opportunity worth pursuing?", "英国市场是否值得进入？"),
    action: l("Assess the application and audience", "判断应用与受众"),
    mapOutput: l("First action recommendations", "首轮行动建议"),
    inputs: l("Product overview, target application and UK ambition.", "产品简介、目标应用与英国市场计划。"),
    formatTitle: l("Market & partnership brief", "市场与合作简报"),
    formatFields: l(
      ["Application question", "Stakeholder categories", "Evidence gaps", "Next action"],
      ["应用问题", "相关方类别", "证据缺口", "下一步"]
    ),
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
    stage: l("Launch", "筹备启动"),
    question: l("How can a launch create useful next steps?", "一次发布如何更有价值？"),
    action: l("Coordinate messaging and local activity", "组织表达与本地行动"),
    mapOutput: l("Launch plan and delivery materials", "启动计划与交付材料"),
    inputs: l("Launch objective, date, audience and available assets.", "启动目标、日期、受众与现有素材。"),
    formatTitle: l("Launch project board", "启动项目板"),
    formatFields: l(
      ["Target audience", "On-site arrangements", "Materials", "Responsibility"],
      ["目标受众", "现场安排", "材料", "责任位置"]
    ),
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
    stage: l("Develop", "持续推进"),
    question: l("What should happen after the meeting?", "会面后如何继续？"),
    action: l("Organise feedback and next actions", "整理反馈与下一步"),
    mapOutput: l("Partnership follow-up record", "合作跟进记录"),
    inputs: l("Previous activity, contact records and open questions.", "前期活动、联系记录与待解决问题。"),
    formatTitle: l("Follow-up record", "跟进记录"),
    formatFields: l(
      ["Discussion topic", "Feedback", "To confirm", "Next action"],
      ["议题", "反馈", "待确认项", "下一步"]
    ),
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
