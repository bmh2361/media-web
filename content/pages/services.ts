import type { LocalisedString } from "@/content/types";

const l = (en: string, zh: string): LocalisedString => ({ en, zh });

export const servicesContent = {
  eyebrow: l("Connected capabilities", "服务能力"),
  title: l(
    "People, production and UK execution under one structure.",
    "在同一项目结构中，统筹人才、制作与英国执行。"
  ),
  intro: l(
    "Four core delivery routes, with specialist projects available where the brief requires them.",
    "四条核心交付路径，并在项目需要时提供专业与创新项目支持。"
  ),
  pillars: [
    {
      key: "commercial",
      title: l("Commercial Production", "商业内容制作"),
      result: l("A coherent campaign ready for every required channel.", "形成适配目标渠道的完整品牌内容。"),
      capabilities: l(
        "Creative planning, photography, brand films, product and social content",
        "创意策划、商业摄影、品牌视频、产品与社交内容"
      ),
      deliverables: l("Key visuals, films, interviews and channel edits", "主视觉、影片、访谈与渠道版本"),
      href: "/services/commercial-production"
    },
    {
      key: "talent",
      title: l("Talent, Models & Styling", "模特、人才与造型"),
      result: l(
        "The right people and visual language around the brief.",
        "围绕项目需求建立合适的人才与视觉语言。"
      ),
      capabilities: l(
        "Casting, creators, presenters, makeup, hair and styling",
        "选角、创作者、主持人、妆发与造型"
      ),
      deliverables: l("Shortlists, bookings, schedules and rights plans", "候选名单、预订、排期与使用权规划"),
      href: "/talent"
    },
    {
      key: "events",
      title: l("Events, PR, Exhibitions & Roadshows", "活动、公关、展会与路演"),
      result: l(
        "A controlled live moment with a useful content afterlife.",
        "完成可控的现场执行，并沉淀后续传播内容。"
      ),
      capabilities: l(
        "Launches, exhibitions, roadshows, panels, venues and live production",
        "发布、展会、路演、论坛、场地与现场制作"
      ),
      deliverables: l("Run-of-show, event delivery and media assets", "现场流程、活动执行与媒体素材"),
      href: "/services/events-exhibitions"
    },
    {
      key: "agency",
      title: l("UK Production & Local Execution", "英国制作与本地落地执行"),
      result: l(
        "From an overseas brief to a controlled UK delivery route.",
        "把跨境需求转化为英国可执行、可审核、可交付的制作方案。"
      ),
      capabilities: l(
        "Feasibility, locations, local crews, suppliers and bilingual production management",
        "可行性、场地、本地团队、供应商与双语制作管理"
      ),
      deliverables: l(
        "White-label delivery, local review and organised production handoff",
        "白标执行、本地审核与规范化制作移交"
      ),
      href: "/for-agencies"
    },
    {
      key: "market-entry",
      title: l("UK Market Entry & Compliance Coordination", "英国市场进入与合规协同"),
      result: l(
        "A bilingual route from practical setup preparation to approved launch communications and local delivery.",
        "以中英双语路径连接落地准备、专业机构对接、获批传播与英国本地执行。"
      ),
      capabilities: l(
        "Readiness, setup coordination, specialist referrals, claims workflows and roadshows",
        "市场准备、公司设立协同、专业机构对接、声明工作流与路演"
      ),
      deliverables: l(
        "Briefing documents, responsibility maps, approval trackers and launch handoff",
        "项目简报、责任地图、审批追踪与市场启动移交"
      ),
      href: "/services/uk-market-entry"
    },
    {
      key: "research",
      title: l("Specialist & Innovation Projects", "专业与创新项目"),
      result: l(
        "Specialist ideas made clear without overstating claims.",
        "准确转化专业内容，不夸大技术或合作关系。"
      ),
      capabilities: l(
        "Expert interviews, research stories, showcases and forums",
        "专家访谈、科研故事、技术展示与论坛"
      ),
      deliverables: l("Reviewed films, explainers and event content", "经审核的影片、说明内容与活动素材"),
      href: "/services/research-innovation"
    }
  ] as const
};
