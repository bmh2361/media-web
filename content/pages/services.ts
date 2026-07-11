import type { LocalisedString } from "@/content/types";
const l = (en: string, zh: string): LocalisedString => ({ en, zh });
export const servicesContent = {
  eyebrow: l("Five connected capabilities", "五大协同能力"),
  title: l(
    "People, production and UK execution under one project structure.",
    "在同一项目体系下统筹人才、制作与英国落地。"
  ),
  intro: l(
    "Start with the business pillar, then define the specialist capabilities required by the brief.",
    "先明确业务支柱，再根据项目需求组合具体专业能力。"
  ),
  pillars: [
    {
      key: "commercial",
      title: l("Commercial Production", "商业制作"),
      href: "/services/commercial-production",
      capabilities: l(
        "Campaign production · Commercial photography · Brand films · Product video · Social-first content · Interviews · Styling and production design",
        "广告制作 · 商业摄影 · 品牌影片 · 产品视频 · 社交内容 · 访谈 · 造型与美术"
      )
    },
    {
      key: "talent",
      title: l("Models, Talent & Creators", "模特、人才与创作者"),
      href: "/talent",
      capabilities: l(
        "Models · Actors · Presenters · Creators · Makeup artists · Stylists · Directors · Photographers · Videographers · Producers",
        "模特 · 演员 · 主持人 · 创作者 · 妆发 · 造型 · 导演 · 摄影 · 摄像 · 制片"
      )
    },
    {
      key: "research",
      title: l("Research & Innovation Collaboration", "科研与创新协作"),
      href: "/services/research-innovation",
      capabilities: l(
        "Expert identification · Academic speakers · Introductions · Technical interviews · Research communication · Roundtables · Approval-aware filming",
        "专家识别 · 学术嘉宾 · 资源引荐 · 技术访谈 · 科研传播 · 圆桌 · 兼顾审批的拍摄"
      )
    },
    {
      key: "events",
      title: l("Technology Events & Exhibitions", "科技活动与展会"),
      href: "/services/events-exhibitions",
      capabilities: l(
        "Showcases · Launches · Exhibitions · Forums · Panels · Speakers · Venues · AV · Stage · Run-of-show · Event content",
        "展示 · 发布 · 展会 · 论坛 · 圆桌 · 嘉宾 · 场地 · 视听 · 舞台 · 现场流程 · 活动内容"
      )
    },
    {
      key: "agency",
      title: l("UK Localisation & Agency Support", "英国本地化与代理支持"),
      href: "/for-agencies",
      capabilities: l(
        "White-label execution · UK feasibility · Casting · Local crews · Locations · Suppliers · Bilingual communication · Confidential handoff",
        "白标执行 · 英国可行性 · 选角 · 本地团队 · 场地 · 供应商 · 双语沟通 · 保密交付"
      )
    }
  ] as const
};
