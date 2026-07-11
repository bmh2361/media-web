import type { Language } from "@/lib/i18n";
type Localized<T> = Record<Language, T>;
export type MegaMenuKey = "services";
export const navigation = {
  en: {
    logo: "FrameBridge Studio",
    language: "中文",
    cta: "Send Brief",
    megaCtaTitle: "Planning a UK project?",
    megaCtaText: "Share the objective and required outcome.",
    megaCtaButton: "Send brief",
    mobileMenu: "Menu",
    closeMenu: "Close"
  },
  zh: {
    logo: "FrameBridge Studio 镜桥创意",
    language: "EN",
    cta: "提交需求",
    megaCtaTitle: "正在筹备英国项目？",
    megaCtaText: "告诉我们目标与预期成果。",
    megaCtaButton: "提交需求",
    mobileMenu: "菜单",
    closeMenu: "关闭"
  }
} satisfies Localized<Record<string, string>>;
export const primaryNav = [
  { href: "/services", key: "services", label: { en: "Services", zh: "服务" }, mega: "services" },
  { href: "/industries", key: "industries", label: { en: "Industries", zh: "行业" } },
  { href: "/work", key: "work", label: { en: "Work", zh: "案例" } },
  { href: "/about", key: "about", label: { en: "About", zh: "关于" } },
  { href: "/contact", key: "contact", label: { en: "Contact", zh: "联系" } }
] as const;
export const megaMenus = {
  services: {
    eyebrow: { en: "Create · Connect · Activate", zh: "创作 · 连接 · 落地" },
    items: [
      {
        href: "/services/commercial-production",
        title: { en: "Commercial Production", zh: "商业内容制作" },
        description: {
          en: "Campaigns, photography, films and social content.",
          zh: "广告、摄影、品牌影片与社交内容。"
        }
      },
      {
        href: "/talent",
        title: { en: "Models, Talent & Creators", zh: "海外模特与人才资源" },
        description: {
          en: "Models, presenters, creators and production specialists.",
          zh: "模特、主持人、创作者与制作人才。"
        }
      },
      {
        href: "/services/research-innovation",
        title: { en: "Research & Innovation Collaboration", zh: "英国科研与创新协作" },
        description: {
          en: "Academic, technical and innovation resource coordination.",
          zh: "科研、技术嘉宾与创新资源协调。"
        }
      },
      {
        href: "/services/events-exhibitions",
        title: { en: "Technology Events & Exhibitions", zh: "科技展会与活动策划" },
        description: {
          en: "Launches, showcases, panels and exhibition delivery.",
          zh: "发布、展示、论坛与展会执行。"
        }
      },
      {
        href: "/for-agencies",
        title: { en: "UK Localisation & Agency Support", zh: "英国本地化与代理支持" },
        description: {
          en: "White-label execution, logistics and bilingual handoff.",
          zh: "白标执行、后勤协调与双语交付。"
        }
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
