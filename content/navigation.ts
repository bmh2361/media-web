import type { Language } from "@/lib/i18n";

type Localized<T> = Record<Language, T>;

export type MegaMenuKey = "how-we-help" | "industries";

export const navigation = {
  en: {
    logo: "Venus Bridge",
    language: "中文",
    cta: "Request a UK Fit Call",
    megaCtaTitle: "Planning a UK move?",
    megaCtaText: "Start with your current situation and the decision you need to make.",
    megaCtaButton: "Request a fit call",
    mobileMenu: "Menu",
    closeMenu: "Close"
  },
  zh: {
    logo: "Venus Bridge",
    language: "EN",
    cta: "申请英国市场沟通",
    megaCtaTitle: "正在规划英国市场行动？",
    megaCtaText: "从当前阶段和需要做出的决策开始。",
    megaCtaButton: "申请沟通",
    mobileMenu: "菜单",
    closeMenu: "关闭"
  }
} satisfies Localized<Record<string, string>>;

export const primaryNav = [
  {
    href: "/what-we-do",
    key: "how-we-help",
    label: { en: "How We Help", zh: "我们如何协助" },
    mega: "how-we-help"
  },
  {
    href: "/industries",
    key: "industries",
    label: { en: "Industries", zh: "行业" },
    mega: "industries"
  },
  { href: "/services", key: "solutions", label: { en: "Solutions", zh: "解决方案" } },
  { href: "/work", key: "work", label: { en: "Proof", zh: "项目证明" } },
  { href: "/about", key: "about", label: { en: "Why Venus", zh: "为什么选择我们" } },
  { href: "/contact", key: "contact", label: { en: "Contact", zh: "联系" } }
] as const;

export const megaMenus = {
  "how-we-help": {
    eyebrow: { en: "Start with your situation", zh: "从当前阶段开始" },
    items: [
      {
        href: "/what-we-do/enter-the-uk",
        title: { en: "Exploring the UK", zh: "正在探索英国市场" },
        description: {
          en: "Clarify readiness, dependencies and a useful next test.",
          zh: "明确准备度、关键依赖与下一步验证。"
        }
      },
      {
        href: "/what-we-do/launch-in-the-uk",
        title: { en: "Preparing a UK Launch", zh: "正在筹备英国发布" },
        description: {
          en: "Align the launch story, live plan and local delivery.",
          zh: "统一发布叙事、现场计划与本地交付。"
        }
      },
      {
        href: "/what-we-do/building-uk-presence",
        title: { en: "Building UK Presence", zh: "正在建立英国市场存在" },
        description: {
          en: "Build continuity across content, moments and relationships.",
          zh: "持续建设内容、市场节点与关系沟通。"
        }
      },
      {
        href: "/what-we-do/create-in-the-uk",
        title: { en: "Ready for Local Delivery", zh: "已经准备好英国本地执行" },
        description: {
          en: "Turn a defined brief into accountable UK delivery.",
          zh: "把明确需求转化为责任清晰的英国交付。"
        }
      }
    ]
  },
  industries: {
    eyebrow: { en: "Industry priorities", zh: "行业重点" },
    items: [
      {
        href: "/industries/automotive",
        title: { en: "Automotive & Mobility", zh: "汽车与出行" },
        description: { en: "Core sector.", zh: "核心行业。" }
      },
      {
        href: "/industries/technology-ai-research",
        title: { en: "AI & Technology", zh: "AI 与科技" },
        description: { en: "Growth sector.", zh: "增长行业。" }
      },
      {
        href: "/industries/fashion-beauty-apparel",
        title: { en: "Fashion & Beauty", zh: "时尚与美妆" },
        description: { en: "Growth sector.", zh: "增长行业。" }
      },
      {
        href: "/industries/entertainment-culture",
        title: { en: "Entertainment & Creator", zh: "娱乐与创作者" },
        description: { en: "Growth sector.", zh: "增长行业。" }
      }
    ]
  }
} satisfies Record<
  MegaMenuKey,
  {
    eyebrow: Localized<string>;
    items: Array<{ href: string; title: Localized<string>; description: Localized<string> }>;
  }
>;
