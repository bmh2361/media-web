import type { Localized, ServiceDetail } from "@/content/types";

const processEn = [
  { title: "Brief and objective", text: "Align the audience, outcome, channels and constraints." },
  {
    title: "Feasibility and resource mapping",
    text: "Confirm the people, locations, approvals and production dependencies."
  },
  {
    title: "Creative and production plan",
    text: "Set scope, responsibilities, schedule, rights and deliverables."
  },
  { title: "UK execution", text: "Coordinate suppliers, contributors and on-site production." },
  {
    title: "Delivery and handoff",
    text: "Prepare approved assets and documentation for campaign or agency use."
  }
];
const processZh = [
  { title: "明确需求与目标", text: "确认受众、成果、渠道与项目限制。" },
  { title: "可行性与资源梳理", text: "核实人员、场地、审批与制作依赖。" },
  { title: "创意与制作方案", text: "明确范围、分工、排期、使用权与交付规格。" },
  { title: "英国现场执行", text: "统筹供应商、参与人员与现场制作。" },
  { title: "交付与衔接", text: "整理审核后的素材与文件，供品牌传播或代理交接。" }
];

export const commercialProduction: Localized<ServiceDetail> = {
  en: {
    eyebrow: "CREATE",
    title: "Commercial production built around the campaign objective.",
    intro:
      "We coordinate UK shoots from creative interpretation and casting through production, rights planning and final asset handoff.",
    scope: [
      "Creative campaign production",
      "Commercial photography",
      "Brand films and product videos",
      "Short-form social content",
      "Interviews and editorial content",
      "Styling, makeup and production design"
    ],
    needs: [
      "A China-facing campaign produced in the UK",
      "A consistent stills and motion asset system",
      "Local talent, crew, locations and suppliers",
      "Clear usage rights and channel specifications"
    ],
    deliverables: [
      "Campaign key visuals and image libraries",
      "Brand, launch and product films",
      "Social-first edits and platform crops",
      "Interviews and editorial assets",
      "Production documentation and asset handoff"
    ],
    process: processEn,
    relatedWork: ["Fashion campaign production", "AI product video", "Jewellery editorial shoot"],
    ctaTitle: "Planning a UK campaign or content production?",
    cta: "Start a production brief"
  },
  zh: {
    eyebrow: "CREATE 创作",
    title: "围绕传播目标统筹英国商业内容制作。",
    intro: "从创意理解、选角与现场制作，到使用权规划及成片交付，统一管理英国拍摄流程。",
    scope: [
      "创意广告制作",
      "商业摄影",
      "品牌影片与产品视频",
      "社交媒体短内容",
      "访谈与编辑内容",
      "造型、妆发与美术设计"
    ],
    needs: [
      "在英国执行面向中国市场的广告项目",
      "建立统一的图片与视频素材体系",
      "协调英国人才、团队、场地与供应商",
      "提前明确使用权与渠道规格"
    ],
    deliverables: [
      "广告主视觉与图片素材库",
      "品牌、发布与产品影片",
      "社交媒体短版与多比例剪辑",
      "访谈及编辑内容",
      "制作文件与规范化素材交付"
    ],
    process: processZh,
    relatedWork: ["时尚广告制作", "AI 产品视频", "珠宝编辑拍摄"],
    ctaTitle: "正在筹备英国广告或内容制作？",
    cta: "提交制作需求"
  }
};

export const researchInnovation: Localized<ServiceDetail> = {
  en: {
    eyebrow: "CONNECT",
    title: "Research and innovation collaboration, coordinated with professional care.",
    intro:
      "We identify and coordinate relevant academic, technical and innovation resources, subject to institutional approval, availability and project requirements.",
    scope: [
      "Researcher and academic speaker identification",
      "University-industry introductions",
      "Technical interviews and research communication",
      "Innovation roundtables and workshops",
      "Campus or research-related filming coordination",
      "Technology storytelling"
    ],
    needs: [
      "A credible technical voice for a public programme",
      "Research communication for non-specialist audiences",
      "Relevant UK innovation contacts and introductions",
      "Filming that requires institutional coordination"
    ],
    deliverables: [
      "Resource and contributor shortlists",
      "Briefing and introduction coordination",
      "Interview, panel and workshop formats",
      "Technical storytelling and filmed content",
      "Approval-aware schedules and production plans"
    ],
    process: processEn,
    relatedWork: ["AI product video", "Technology interviews and explainers", "Innovation event content"],
    note: "Introductions, access and participation are subject to institutional approval, contributor availability, compliance and project fit. FrameBridge does not imply university endorsement, guaranteed access, funding or partnership.",
    ctaTitle: "Exploring a UK research or innovation collaboration?",
    cta: "Map the collaboration"
  },
  zh: {
    eyebrow: "CONNECT 连接",
    title: "以专业、合规的方式协调英国科研与创新资源。",
    intro:
      "我们根据项目目标识别并协调相关科研人员、学术嘉宾与创新资源，具体合作受机构审批、档期与项目合规要求约束。",
    scope: [
      "科研人员与学术嘉宾识别",
      "产学资源引荐",
      "技术访谈与科研传播",
      "创新圆桌与工作坊",
      "校园或科研相关拍摄协调",
      "科技内容叙事"
    ],
    needs: [
      "为公开项目匹配可信的技术表达者",
      "将专业研究转化为公众可理解的内容",
      "对接相关英国创新资源",
      "协调涉及机构审批的拍摄"
    ],
    deliverables: [
      "资源与嘉宾候选名单",
      "引荐、沟通与简报协调",
      "访谈、圆桌与工作坊形式",
      "技术叙事与影像内容",
      "兼顾审批的排期与制作方案"
    ],
    process: processZh,
    relatedWork: ["AI 产品视频", "科技访谈与说明内容", "创新活动传播素材"],
    note: "所有引荐、进入权限与参与安排均取决于机构审批、人员档期、合规要求及项目匹配度；不代表大学背书，也不承诺实验室进入、经费或正式合作。",
    ctaTitle: "正在探索英国科研或创新协作？",
    cta: "梳理协作需求"
  }
};

export const eventsExhibitions: Localized<ServiceDetail> = {
  en: {
    eyebrow: "ACTIVATE",
    title: "Technology events and exhibitions designed for credible UK execution.",
    intro:
      "We coordinate the format, contributors, venue production and communication assets—not simply event photography.",
    scope: [
      "Technology showcases and product launches",
      "Industry forums and panels",
      "Exhibition planning",
      "Speaker and guest coordination",
      "Venue, stage and AV coordination",
      "Run-of-show planning",
      "Media interviews and event content",
      "Post-event communication assets"
    ],
    needs: [
      "A UK launch with a clear audience journey",
      "An exhibition presence requiring local suppliers",
      "A panel or forum with coordinated contributors",
      "One team connecting live delivery and media outputs"
    ],
    deliverables: [
      "Event concept and format",
      "Venue, stage, AV and supplier plan",
      "Speaker briefs and run-of-show",
      "Interview, photography and video assets",
      "Post-event edits and communication toolkit"
    ],
    process: processEn,
    relatedWork: ["Automotive event support", "London media moment", "Technology showcase content"],
    note: "Venue, speaker and supplier availability is confirmed during feasibility. Public claims, technical demonstrations and contributor participation remain subject to approval.",
    ctaTitle: "Planning a UK technology event or exhibition?",
    cta: "Plan the activation"
  },
  zh: {
    eyebrow: "ACTIVATE 落地",
    title: "从活动形式到现场执行，统筹英国科技展会与品牌活动。",
    intro: "服务范围不仅是活动摄影，还包括形式策划、嘉宾、场地制作、舞台视听、现场流程与会后传播。",
    scope: [
      "科技展示与产品发布",
      "行业论坛与圆桌",
      "展会策划",
      "演讲嘉宾与来宾协调",
      "场地、舞台与视听统筹",
      "现场流程规划",
      "媒体访谈与活动内容",
      "会后传播素材"
    ],
    needs: [
      "在英国完成路径清晰的产品发布",
      "需要本地供应商支持的展会项目",
      "需要统筹嘉宾的论坛或圆桌",
      "由同一团队衔接现场与传播交付"
    ],
    deliverables: [
      "活动概念与形式",
      "场地、舞台、视听与供应商方案",
      "嘉宾简报与现场流程表",
      "访谈、摄影与视频素材",
      "会后剪辑与传播工具包"
    ],
    process: processZh,
    relatedWork: ["汽车活动支持", "伦敦媒体活动", "科技展示内容"],
    note: "场地、嘉宾与供应商档期将在可行性阶段确认；公开表述、技术演示及参与安排均需相关方审批。",
    ctaTitle: "正在筹备英国科技活动或展会？",
    cta: "规划活动落地"
  }
};
