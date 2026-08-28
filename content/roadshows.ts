import type { MediaId } from "@/content/media";
import type { CaseStudy, LocalisedString } from "@/content/types";
import { defineCaseStudy } from "@/content/cases/template";

const l = (en: string, zh: string): LocalisedString => ({ en, zh });

export type RoadshowComplianceGate = {
  type: "claims" | "financial-promotion" | "data" | "product" | "rights" | "venue";
  required: boolean;
  status: "not-required" | "pending" | "approved" | "blocked";
  blocksProductionRelease?: boolean;
  blocksCampaignRelease?: boolean;
};

export type RoadshowScenario = {
  id: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  scenarioType: "brand-launch" | "investor-partner" | "product-buyer" | "innovation-industry";
  status: "concept" | "completed" | "completed-awaiting-approval";
  targetAudienceEn: string[];
  targetAudienceZh: string[];
  objectivesEn: string[];
  objectivesZh: string[];
  cities?: string[];
  servicesEn: string[];
  servicesZh: string[];
  deliverablesEn: string[];
  deliverablesZh: string[];
  complianceGates: RoadshowComplianceGate[];
  media: MediaId[];
  publicStatus: "hidden" | "scenario" | "case-study";
};

const eventMedia: MediaId[] = [
  "event-concept-hero",
  "event-concept-landscape",
  "event-concept-portrait",
  "event-concept-diagram"
];

export const roadshowScenarios: RoadshowScenario[] = [
  {
    id: "roadshow-brand-launch",
    slug: "uk-brand-launch-roadshow",
    titleEn: "UK Brand Launch Roadshow",
    titleZh: "英国品牌发布路演",
    scenarioType: "brand-launch",
    status: "concept",
    targetAudienceEn: ["Retail and channel partners", "Media", "Industry partners", "Target customers"],
    targetAudienceZh: ["零售与渠道合作方", "媒体", "行业合作方", "目标客户"],
    objectivesEn: [
      "Build initial UK market awareness",
      "Demonstrate the product and brand proposition",
      "Create reusable launch communications"
    ],
    objectivesZh: ["建立初步英国市场认知", "展示产品与品牌主张", "生成可持续使用的发布传播素材"],
    servicesEn: [
      "Roadshow format, route, city and venue planning",
      "Visual identity, presenters, talent and guest flow",
      "Bilingual on-site production and local suppliers",
      "Photography, film, interviews and post-event content"
    ],
    servicesZh: [
      "路演形式、路线、城市与场地规划",
      "活动视觉、主持、人才与嘉宾流程",
      "双语现场制作与本地供应商协调",
      "摄影、视频、采访与会后内容"
    ],
    deliverablesEn: [
      "Roadshow concept and run-of-show",
      "Venue and supplier plan",
      "Guest communications",
      "Event photography, short films and interviews",
      "Press, social and post-event handoff pack"
    ],
    deliverablesZh: [
      "路演概念与现场流程",
      "场地与供应商方案",
      "嘉宾沟通资料",
      "活动摄影、短片与采访",
      "媒体、社交与会后移交包"
    ],
    complianceGates: [
      { type: "claims", required: true, status: "pending", blocksCampaignRelease: true },
      { type: "rights", required: true, status: "pending", blocksCampaignRelease: true },
      { type: "venue", required: true, status: "pending", blocksProductionRelease: true }
    ],
    media: eventMedia,
    publicStatus: "scenario"
  },
  {
    id: "roadshow-investor-partner",
    slug: "investor-strategic-partner-roadshow-production",
    titleEn: "Investor & Strategic Partner Roadshow Production",
    titleZh: "投资人与战略合作伙伴路演制作",
    scenarioType: "investor-partner",
    status: "concept",
    targetAudienceEn: [
      "Potential strategic partners",
      "B2B stakeholders",
      "Professionally reviewed audiences"
    ],
    targetAudienceZh: ["潜在战略合作伙伴", "B2B 利益相关方", "经专业审核确认的受众"],
    objectivesEn: [
      "Present the organisation and its capabilities clearly",
      "Coordinate reviewed meetings and event production",
      "Create approved bilingual presentation and media assets"
    ],
    objectivesZh: ["清晰呈现企业及其能力", "协调经审核的会议与活动制作", "制作经批准的双语演示与媒体素材"],
    servicesEn: [
      "Meeting and event production",
      "Venue, schedule and guest coordination",
      "Bilingual visual and presentation production",
      "Photography, film, interviews and on-site delivery"
    ],
    servicesZh: [
      "会议与活动制作",
      "场地、日程与嘉宾协调",
      "双语视觉与演示资料制作",
      "摄影、视频、采访与现场执行"
    ],
    deliverablesEn: [
      "Reviewed meeting format and run-of-show",
      "Approved presentation asset pack",
      "Guest and production schedule",
      "Permission-controlled media handoff"
    ],
    deliverablesZh: [
      "经审核的会议形式与流程",
      "经批准的演示资料包",
      "嘉宾与制作日程",
      "受权限控制的媒体移交"
    ],
    complianceGates: [
      {
        type: "financial-promotion",
        required: true,
        status: "blocked",
        blocksProductionRelease: true,
        blocksCampaignRelease: true
      },
      { type: "claims", required: true, status: "pending", blocksCampaignRelease: true },
      { type: "data", required: true, status: "pending", blocksCampaignRelease: true },
      { type: "rights", required: true, status: "pending", blocksCampaignRelease: true }
    ],
    media: eventMedia,
    publicStatus: "scenario"
  },
  {
    id: "roadshow-product-buyer",
    slug: "product-demonstration-buyer-roadshow",
    titleEn: "Product Demonstration & Buyer Roadshow",
    titleZh: "产品演示与买家路演",
    scenarioType: "product-buyer",
    status: "concept",
    targetAudienceEn: ["Buyers", "Distributors", "Channel partners", "Product and technical stakeholders"],
    targetAudienceZh: ["买家", "经销商", "渠道合作方", "产品与技术利益相关方"],
    objectivesEn: [
      "Demonstrate an approved product use case",
      "Gather structured buyer and channel feedback",
      "Create sales-support and media assets"
    ],
    objectivesZh: ["演示经批准的产品使用场景", "收集结构化买家与渠道反馈", "生成销售支持与媒体素材"],
    servicesEn: [
      "Demonstration format and sample logistics",
      "Buyer event, presenter and technical interview coordination",
      "Multi-city delivery and feedback capture",
      "Demo film and follow-up asset production"
    ],
    servicesZh: [
      "演示形式与样品物流",
      "买家活动、主持与技术采访协调",
      "多城市执行与反馈记录",
      "演示视频与后续素材制作"
    ],
    deliverablesEn: [
      "Demonstration and logistics plan",
      "Approved claims and safety-information checklist",
      "Buyer session run-of-show",
      "Demo capture and follow-up asset pack"
    ],
    deliverablesZh: ["演示与物流方案", "经批准的声明与安全信息清单", "买家活动流程", "演示记录与后续素材包"],
    complianceGates: [
      { type: "product", required: true, status: "blocked", blocksProductionRelease: true },
      { type: "claims", required: true, status: "pending", blocksCampaignRelease: true },
      { type: "rights", required: true, status: "pending", blocksCampaignRelease: true }
    ],
    media: eventMedia,
    publicStatus: "scenario"
  },
  {
    id: "roadshow-innovation-industry",
    slug: "innovation-university-industry-roadshow",
    titleEn: "Innovation, University & Industry Roadshow",
    titleZh: "创新、高校与产业路演",
    scenarioType: "innovation-industry",
    status: "concept",
    targetAudienceEn: ["Industry stakeholders", "Experts", "Potential collaborators", "Technical audiences"],
    targetAudienceZh: ["产业利益相关方", "专家", "潜在合作方", "技术受众"],
    objectivesEn: [
      "Translate reviewed technical material for a wider audience",
      "Support expert and industry exchange",
      "Create an approved record of demonstrations and discussion"
    ],
    objectivesZh: ["将经审核的技术材料转译给更广泛受众", "支持专家与产业交流", "形成经批准的演示与讨论记录"],
    servicesEn: [
      "Expert, guest and venue coordination",
      "Technical-content translation and bilingual materials",
      "Demonstration, interview, photography and film production",
      "Post-event industry communication support"
    ],
    servicesZh: [
      "专家、嘉宾与会场协调",
      "技术内容转译与双语资料",
      "演示、采访、摄影与视频制作",
      "会后产业沟通支持"
    ],
    deliverablesEn: [
      "Reviewed speaker and demonstration brief",
      "Bilingual event and presentation materials",
      "Interview and event media assets",
      "Approval-controlled post-event handoff"
    ],
    deliverablesZh: [
      "经审核的嘉宾与演示简报",
      "双语活动与演示资料",
      "采访与活动媒体素材",
      "受审批控制的会后移交"
    ],
    complianceGates: [
      { type: "claims", required: true, status: "pending", blocksCampaignRelease: true },
      { type: "rights", required: true, status: "pending", blocksCampaignRelease: true },
      { type: "venue", required: true, status: "pending", blocksProductionRelease: true }
    ],
    media: eventMedia,
    publicStatus: "scenario"
  }
];

export function canReleaseRoadshowProduction(scenario: RoadshowScenario) {
  return !scenario.complianceGates.some(
    (gate) => gate.required && gate.blocksProductionRelease && gate.status !== "approved"
  );
}

export function canReleaseRoadshowCampaign(scenario: RoadshowScenario) {
  return !scenario.complianceGates.some(
    (gate) => gate.required && gate.blocksCampaignRelease && gate.status !== "approved"
  );
}

const toLocalised = (en: string[], zh: string[]) => en.map((value, index) => l(value, zh[index] ?? value));

export const roadshowCaseStudies: CaseStudy[] = roadshowScenarios.map((scenario) =>
  defineCaseStudy({
    slug: scenario.slug,
    status: "concept",
    deliveryStatus: "concept",
    publicStatus: "hidden",
    realProject: false,
    featured: false,
    clientNameDisclosure: "withheld",
    mediaApproval: "placeholder",
    publicDisclosurePermission: "not-required",
    clientLogoApproval: "not-applicable",
    roleDisclosure: l(
      "Illustrative Venus Bridge coordination and production scope.",
      "用于说明 Venus Bridge 协调与制作范围。"
    ),
    disclosure: l(
      "Illustrative roadshow production scenario. It is not completed client work.",
      "路演制作场景示例，不作为已完成客户项目展示。"
    ),
    disclosureLevel: "illustrative",
    evidenceState: "unverified",
    evidence: [],
    clientApproval: false,
    mediaRightsApproved: false,
    legalApproved: false,
    title: l(scenario.titleEn, scenario.titleZh),
    summary: l(
      `A concept operating model for ${scenario.titleEn.toLowerCase()}, with approvals and specialist review built into delivery.`,
      `用于说明${scenario.titleZh}如何纳入审批与专业审核的概念执行模型。`
    ),
    industry: l("UK Market Entry & Roadshows", "英国市场进入与路演"),
    industryKey: "event",
    servicePillars: ["events-exhibitions", "agency-support"],
    projectType: l("Roadshow production scenario", "路演制作场景"),
    challenge: l(
      "Coordinate a multi-stakeholder UK roadshow without publishing unapproved claims, regulated communications or rights-restricted material.",
      "在不发布未经批准的声明、受监管传播或受权利限制素材的前提下，协调多方参与的英国路演。"
    ),
    objective: l(scenario.objectivesEn.join("; "), scenario.objectivesZh.join("；")),
    outcome: l(
      "A proposed roadshow route with explicit production and campaign release gates.",
      "形成带有明确制作与传播发布门控的路演建议路径。"
    ),
    clientNeed: l(
      "Example brief only: align the audience, route, meetings, live production and follow-up communications.",
      "仅为示例需求：统一受众、路线、会议、现场制作与后续传播。"
    ),
    frameBridgeRole: l(
      "Venus Bridge could coordinate the format, bilingual materials, venues, suppliers, live production and approved content handoff.",
      "Venus Bridge 可协调活动形式、双语资料、场地、供应商、现场制作及经批准的内容移交。"
    ),
    productionScope: toLocalised(scenario.servicesEn, scenario.servicesZh),
    deliverables: toLocalised(scenario.deliverablesEn, scenario.deliverablesZh),
    formats: [
      l("Roadshow production", "路演制作"),
      l("Photography and film", "摄影与视频"),
      l("Bilingual materials", "双语资料")
    ],
    usageContext: [
      l(
        "Approved meetings, launch communications and post-event follow-up",
        "经批准的会议、发布传播与会后跟进"
      )
    ],
    constraints: [
      l(
        "Required compliance gates must be approved before the relevant production or campaign material is released.",
        "相关制作或传播素材发布前，所有必需合规门控必须获得批准。"
      ),
      ...(scenario.scenarioType === "investor-partner"
        ? [
            l(
              "Potential financial promotions are marked regulated-review-required. Invitations, investment materials and social content remain blocked until the client's lawyer and an appropriately FCA-authorised or permitted specialist confirm the communication route.",
              "可能构成金融推广的内容将标记为 regulated-review-required；在客户律师及具备适当 FCA 授权或许可的专业机构确认传播路径前，邀请、投资材料与社交内容均保持阻止状态。"
            )
          ]
        : [])
    ],
    location: l("UK cities subject to feasibility and approvals", "英国城市，以可行性与审批为准"),
    market: l("UK market-entry audiences", "英国市场进入相关受众"),
    visualDirection: l(
      "An editorial record of route, people, demonstrations and approved live moments — not invented institutional imagery.",
      "以编辑式方式记录路线、人物、演示及获批现场，不使用虚构机构视觉。"
    ),
    cta: l("Discuss a roadshow production route", "咨询路演制作路径"),
    relatedIndustries: ["event", "technology", "automotive", "fashion"],
    heroMediaId: scenario.media[0],
    mediaIds: scenario.media.slice(1)
  })
);
