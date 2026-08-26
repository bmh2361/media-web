import type { MediaId } from "@/content/media";
import type { LocalisedString } from "@/content/types";

const l = (en: string, zh: string): LocalisedString => ({ en, zh });

export type IndustryKey =
  | "fashion-beauty-apparel"
  | "ai-technology-robotics"
  | "automotive-mobility"
  | "education-research-innovation"
  | "entertainment-culture-events"
  | "consumer-lifestyle-commerce";
export type IndustryVariant =
  | "editorial"
  | "systems"
  | "cinematic"
  | "publication"
  | "sequence"
  | "channel-matrix";
export type IndustryRecord = {
  key: IndustryKey;
  title: LocalisedString;
  challenge: LocalisedString;
  capabilities: LocalisedString[];
  formats: LocalisedString[];
  deliverables: LocalisedString[];
  clientNeeds?: LocalisedString[];
  clientInputs?: LocalisedString[];
  adjacentCategoryNote?: LocalisedString;
  detailPath?: string;
  relatedServicePaths: string[];
  relatedWorkFilter?: string;
  variant: IndustryVariant;
  mediaIds: MediaId[];
};

export const industriesPageCopy = {
  title: l("Six sectors. One UK execution partner.", "六大行业方向，一套英国本地执行体系。"),
  intro: l(
    "Production, talent and activation shaped around the commercial reality of each category.",
    "根据不同品类的商业场景，组合制作、人才与活动落地能力。"
  )
};

export const industryRecords: IndustryRecord[] = [
  {
    key: "fashion-beauty-apparel",
    title: l("Fashion, Beauty & Apparel", "时尚、美妆与服装"),
    challenge: l(
      "Produce UK campaign, lookbook and social assets while aligning products, models, makeup, hair, wardrobe, locations and usage rights against one schedule.",
      "在同一排期内统筹产品、模特、妆发、服装造型、场地与使用权，完成英国广告、型录与社交素材。"
    ),
    capabilities: [
      l("Creative direction and production planning", "创意方向与制作规划"),
      l("Casting, makeup, hair and wardrobe coordination", "选角、妆发与服装造型统筹"),
      l("London locations, permits and bilingual on-set coordination", "伦敦场地、许可与双语现场协调")
    ],
    formats: [
      l("Campaigns, lookbooks and editorial content", "广告、型录与编辑内容"),
      l("E-commerce, social and launch content", "电商、社交与发布内容")
    ],
    deliverables: [
      l("Campaign photography and image selects", "广告摄影与精选图片"),
      l("Short-form, behind-the-scenes and interview video", "短视频、幕后与采访内容"),
      l("Multi-ratio assets and usage handoff, subject to scope", "根据范围交付多比例素材与使用信息")
    ],
    clientNeeds: [
      l("UK campaign, editorial or lookbook shoot", "英国广告、编辑或型录拍摄"),
      l("Product, lifestyle and social-first content", "产品、生活方式与社交优先内容"),
      l("Model casting, makeup, hair and wardrobe", "模特选角、化妆、发型与服装造型"),
      l("London location or launch-event production", "伦敦场地或发布活动制作"),
      l("China-facing overseas assets or UK-facing campaign content", "面向中国的海外素材或英国本地发布内容")
    ],
    clientInputs: [
      l("Brand guidelines, references and product list", "品牌规范、参考与产品清单"),
      l("Intended channels, territories and target audience", "使用渠道、地区与目标受众"),
      l("Target date, location preference and deliverable priorities", "目标日期、场地偏好与交付优先级")
    ],
    adjacentCategoryNote: l(
      "Selected accessories and jewellery projects may be supported where they fit the production brief.",
      "对于符合制作范围的配饰与珠宝项目，也可根据具体需求提供支持。"
    ),
    detailPath: "/industries/fashion-beauty-apparel",
    relatedServicePaths: ["/services/commercial-production", "/talent"],
    relatedWorkFilter: "commercial-production",
    variant: "editorial",
    mediaIds: ["industry-fashion", "industry-beauty", "industry-lifestyle"]
  },
  {
    key: "ai-technology-robotics",
    title: l("AI, Technology & Robotics", "AI、科技与机器人"),
    challenge: l(
      "Make complex products legible without introducing unsupported technical or performance claims.",
      "让复杂技术更易理解，同时避免引入未经证实的技术或性能表述。"
    ),
    capabilities: [
      l("Technical storytelling", "技术叙事"),
      l("Interview and demonstration planning", "访谈与演示规划")
    ],
    formats: [
      l("Explainers and product demos", "说明内容与产品演示"),
      l("Launch interviews and panels", "发布访谈与论坛")
    ],
    deliverables: [
      l("Reviewed product films", "经审核的产品影片"),
      l("Media and exhibition assets", "媒体与展会素材")
    ],
    relatedServicePaths: ["/services/research-innovation", "/services/commercial-production"],
    relatedWorkFilter: "technology-content",
    variant: "systems",
    mediaIds: ["industry-tech", "research-interview"]
  },
  {
    key: "automotive-mobility",
    title: l("Automotive & Mobility", "汽车与出行"),
    challenge: l(
      "Coordinate vehicles, access, presenters and live moments under practical UK scheduling and weather constraints.",
      "结合英国本地排期与天气条件，统筹车辆、进场、主持人与现场环节。"
    ),
    capabilities: [
      l("Location and access planning", "场地与进场规划"),
      l("Presenter and event coordination", "主持人与活动协调")
    ],
    formats: [
      l("Exterior, interior and motion coverage", "外观、内饰与动态内容"),
      l("Launch and road content", "发布与道路内容")
    ],
    deliverables: [
      l("Wide and vertical edits", "横版与竖版版本"),
      l("Detail stills and event coverage", "细节图片与活动记录")
    ],
    relatedServicePaths: ["/services/events-exhibitions", "/talent"],
    detailPath: "/industries/automotive",
    relatedWorkFilter: "events-exhibitions",
    variant: "cinematic",
    mediaIds: ["industry-automotive", "events-stage"]
  },
  {
    key: "education-research-innovation",
    title: l("Education, Research & Innovation", "教育、科研与创新"),
    challenge: l(
      "Translate specialist knowledge without overstating access, endorsement or partnership.",
      "准确转化专业知识，不夸大机构权限、背书或正式合作。"
    ),
    capabilities: [
      l("Expert interview preparation", "专家访谈准备"),
      l("Approval-aware technical communication", "兼顾审批的技术传播")
    ],
    formats: [
      l("Research stories and roundtables", "科研故事与圆桌"),
      l("Campus and workshop filming", "校园与工作坊拍摄")
    ],
    deliverables: [
      l("Reviewed interviews and explainers", "经审核的访谈与说明内容"),
      l("Session recordings and summaries", "活动记录与摘要")
    ],
    relatedServicePaths: ["/services/research-innovation"],
    relatedWorkFilter: "research-innovation",
    variant: "publication",
    mediaIds: ["research-hero", "research-roundtable"]
  },
  {
    key: "entertainment-culture-events",
    title: l("Entertainment, Culture & Events", "娱乐、文化与活动"),
    challenge: l(
      "Capture public-facing moments while coordinating talent, press and live production needs.",
      "统筹艺人、媒体与现场制作，形成可及时传播的公共内容。"
    ),
    capabilities: [
      l("Guest and stage coordination", "嘉宾与舞台协调"),
      l("Fast-turn content capture", "快速内容采集")
    ],
    formats: [
      l("Stage, interview and audience coverage", "舞台、访谈与观众内容"),
      l("Premieres, exhibitions and panels", "首映、展览与论坛")
    ],
    deliverables: [
      l("Press images and highlights", "新闻图片与精选视频"),
      l("Social-ready recaps", "适配社媒的回顾内容")
    ],
    relatedServicePaths: ["/services/events-exhibitions", "/talent"],
    relatedWorkFilter: "events-exhibitions",
    variant: "sequence",
    mediaIds: ["events-hero", "events-stage", "events-exhibition"]
  },
  {
    key: "consumer-lifestyle-commerce",
    title: l("Consumer, Lifestyle & Cross-border Commerce", "消费、生活方式与跨境商业"),
    challenge: l(
      "Localise product stories for UK settings without losing China-facing campaign intent.",
      "在保留中国市场传播意图的同时，让产品故事适配英国场景。"
    ),
    capabilities: [
      l("UK localisation and bilingual handoff", "英国本地化与双语交付"),
      l("Creator and product content", "创作者与产品内容")
    ],
    formats: [
      l("Retail, e-commerce and social campaigns", "零售、电商与社交广告"),
      l("Product and creator stories", "产品与创作者故事")
    ],
    deliverables: [
      l("Product stills and short video", "产品图片与短视频"),
      l("Channel crops and asset libraries", "渠道裁切与素材库")
    ],
    relatedServicePaths: ["/services/commercial-production", "/for-agencies"],
    relatedWorkFilter: "commercial-production",
    variant: "channel-matrix",
    mediaIds: ["industry-lifestyle", "home-create"]
  }
];
