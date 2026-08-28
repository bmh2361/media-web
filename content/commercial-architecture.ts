import type { Language } from "@/lib/i18n";

type Localized = Record<Language, string>;

export type CustomerSituation = {
  id: "exploring" | "preparing" | "presence" | "delivery";
  title: Localized;
  signal: Localized;
  decision: Localized;
  href: string;
};

export const customerSituations: CustomerSituation[] = [
  {
    id: "exploring",
    title: { en: "Exploring the UK", zh: "正在探索英国市场" },
    signal: {
      en: "You need a grounded view of what a credible UK move would require.",
      zh: "需要先判断一次可信的英国市场行动究竟需要什么。"
    },
    decision: {
      en: "Clarify readiness, dependencies and the next useful test.",
      zh: "明确准备度、关键依赖与下一步可验证行动。"
    },
    href: "/what-we-do/enter-the-uk"
  },
  {
    id: "preparing",
    title: { en: "Preparing a UK Launch", zh: "正在筹备英国发布" },
    signal: {
      en: "A product, brand or programme needs a credible UK-facing moment.",
      zh: "产品、品牌或项目需要一次可信的英国市场亮相。"
    },
    decision: {
      en: "Align the launch story, live plan and local delivery.",
      zh: "统一发布叙事、现场计划与本地交付。"
    },
    href: "/what-we-do/launch-in-the-uk"
  },
  {
    id: "presence",
    title: { en: "Building UK Presence", zh: "正在建立英国市场存在" },
    signal: {
      en: "One launch is not enough; your UK story needs continuity.",
      zh: "一次发布并不足够，需要持续建立英国市场表达。"
    },
    decision: {
      en: "Build a practical rhythm of content, moments and relationships.",
      zh: "建立内容、市场节点与关系沟通的持续节奏。"
    },
    href: "/what-we-do/building-uk-presence"
  },
  {
    id: "delivery",
    title: { en: "Ready for Local Delivery", zh: "已经准备好英国本地执行" },
    signal: {
      en: "The objective is defined and you need the UK work to happen reliably.",
      zh: "目标已经明确，需要英国本地团队可靠地完成执行。"
    },
    decision: {
      en: "Turn the brief into an accountable local production plan.",
      zh: "把需求转化为责任清晰的本地制作与交付计划。"
    },
    href: "/what-we-do/create-in-the-uk"
  }
];

export const solutions = [
  {
    title: { en: "Brand & Localisation", zh: "品牌与本地化" },
    description: {
      en: "Adapt the message and content for UK audiences and channels.",
      zh: "让品牌信息和内容更适合英国受众与渠道。"
    },
    status: { en: "Developing capability", zh: "发展中能力" },
    href: "/services#brand-localisation"
  },
  {
    title: { en: "Launch & Activation", zh: "发布与市场激活" },
    description: {
      en: "Deliver launches, exhibitions, roadshows and live content.",
      zh: "执行发布、展会、路演与现场内容。"
    },
    status: { en: "Core delivery", zh: "核心交付" },
    href: "/services#launch-activation"
  },
  {
    title: { en: "Creative Production", zh: "创意内容制作" },
    description: {
      en: "Produce campaign, interview, product and social content in the UK.",
      zh: "在英国制作广告、采访、产品与社交媒体内容。"
    },
    status: { en: "Core delivery", zh: "核心交付" },
    href: "/services#creative-production"
  },
  {
    title: { en: "Local Delivery", zh: "英国本地交付" },
    description: {
      en: "Coordinate locations, crews, talent, approvals and handoff.",
      zh: "协调场地、团队、人才、审批与交付。"
    },
    status: { en: "Core delivery", zh: "核心交付" },
    href: "/services#local-delivery"
  }
] as const;

export const commercialProducts = [
  {
    id: "uk-market-entry-diagnostic",
    title: { en: "UK Market Entry Diagnostic", zh: "英国市场进入诊断" },
    status: "build-first",
    publicWording: {
      en: "Available for selected projects, subject to fit.",
      zh: "仅面向部分适配项目提供。"
    },
    scope: {
      en: "A focused review of the UK objective, assumptions, dependencies and next useful test.",
      zh: "聚焦评估英国市场目标、关键假设、依赖与下一步验证。"
    }
  },
  {
    id: "launch-readiness",
    title: { en: "Launch Readiness", zh: "发布准备度梳理" },
    status: "pilot-first",
    publicWording: {
      en: "Discuss launch readiness.",
      zh: "沟通发布准备度。"
    },
    scope: {
      en: "A scoped review of launch objectives, content, live dependencies, approvals and handoff.",
      zh: "按范围梳理发布目标、内容、现场依赖、审批与交付。"
    }
  },
  {
    id: "localisation-review",
    title: { en: "Localisation Review", zh: "本地化内容审阅" },
    status: "pilot-first",
    publicWording: {
      en: "Available as a scope-based review.",
      zh: "按具体范围提供审阅。"
    },
    scope: {
      en: "A practical review of selected UK-facing messages and content—not a full brand consultancy engagement.",
      zh: "对选定的英国市场信息与内容进行实务审阅，不等同于完整品牌咨询。"
    }
  }
] as const;

export const deliveryProcess = [
  {
    title: { en: "Define", zh: "定义" },
    text: {
      en: "Agree the objective, audience, constraints and evidence needed.",
      zh: "明确目标、受众、限制与所需证明。"
    }
  },
  {
    title: { en: "Connect", zh: "连接" },
    text: {
      en: "Identify the right local people, places and specialist dependencies.",
      zh: "确认合适的本地人员、场地与专业依赖。"
    }
  },
  {
    title: { en: "Plan", zh: "规划" },
    text: {
      en: "Set scope, schedule, responsibilities, approvals and usage.",
      zh: "制定范围、排期、责任、审批与使用规则。"
    }
  },
  {
    title: { en: "Execute", zh: "执行" },
    text: {
      en: "Coordinate the UK work and make accountable live decisions.",
      zh: "协调英国现场工作，并对实时决策负责。"
    }
  },
  {
    title: { en: "Learn", zh: "复盘" },
    text: {
      en: "Organise delivery, capture learning and define the useful next step.",
      zh: "完成规范交付、沉淀经验并明确下一步。"
    }
  }
] as const;

export const executionClusters = [
  { en: "Content", zh: "内容策划与制作" },
  { en: "Film & Photography", zh: "影片与摄影" },
  { en: "Talent & Creator", zh: "人才与创作者" },
  { en: "Events & Exhibitions", zh: "活动与展会" },
  { en: "Interviews & Expert Content", zh: "采访与专家内容" },
  { en: "UK Production Management", zh: "英国制作管理" }
] as const;

export const industryTiers = [
  {
    tier: { en: "Core", zh: "核心" },
    items: [{ en: "Automotive & Mobility", zh: "汽车与出行", href: "/industries/automotive" }]
  },
  {
    tier: { en: "Growth", zh: "增长" },
    items: [
      { en: "AI & Technology", zh: "AI 与科技", href: "/industries/technology-ai-research" },
      { en: "Fashion & Beauty", zh: "时尚与美妆", href: "/industries/fashion-beauty-apparel" },
      { en: "Entertainment & Creator", zh: "娱乐与创作者", href: "/industries/entertainment-culture" }
    ]
  },
  {
    tier: { en: "Adjacent", zh: "邻近" },
    items: [{ en: "Selected Consumer Brands", zh: "部分消费品牌", href: "/contact?brief=fit-call" }]
  }
] as const;

export const fitCallLabel = {
  en: "Request a 20-minute UK Fit Call",
  zh: "申请 20 分钟英国市场沟通"
} as const;

export const executionBriefLabel = {
  en: "Send an Execution Brief",
  zh: "提交英国执行需求"
} as const;
