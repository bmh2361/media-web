import type { LocalisedString } from "@/content/types";

export type CommercialOutcome =
  | "market-presence"
  | "industry-credibility"
  | "institutional-engagement"
  | "employer-branding"
  | "talent-engagement"
  | "brand-activation"
  | "international-communications"
  | "brand-evidence"
  | "cultural-engagement"
  | "stakeholder-engagement";

export type InstitutionalRelationshipLevel = "A" | "B" | "C" | "unverified";
export type EvidenceStatus = "verified" | "context-confirmed" | "pending-publication-check";
export type MediaStatus = "ready" | "pending" | "suppressed";

export type CommercialEvidenceCase = {
  slug: string;
  title: LocalisedString;
  client?: string;
  year?: string;
  market: LocalisedString;
  commercialObjective: LocalisedString;
  context: LocalisedString;
  programme: LocalisedString;
  venusBridgeRole: LocalisedString;
  execution?: LocalisedString;
  evidence: LocalisedString;
  outcome?: LocalisedString;
  capabilities: CommercialOutcome[];
  audience: LocalisedString;
  institutionalRelationshipLevel: InstitutionalRelationshipLevel;
  media: string[];
  mediaStatus: MediaStatus;
  evidenceStatus: EvidenceStatus;
};

const localised = (en: string, zh: string): LocalisedString => ({ en, zh });

/**
 * Media-ready institutional case records. Add approved assets to `media` and set
 * `mediaStatus` to `ready` only after the evidence intake and naming checks pass.
 */
export const universityTalentCases: CommercialEvidenceCase[] = [
  {
    slug: "cambridge-student-community-cultural-programme",
    title: localised("Cambridge Student-Community Cultural Programme", "剑桥学生社群文化项目"),
    market: localised("Cambridge, UK", "英国剑桥"),
    commercialObjective: localised(
      "Create meaningful brand participation within a relevant international student community.",
      "在相关国际学生社群中形成有意义的品牌参与。"
    ),
    context: localised(
      "Brand-supported cultural engagement in a Cambridge-based community setting.",
      "在剑桥本地社群场景中开展品牌支持的文化互动。"
    ),
    programme: localised(
      "A culturally relevant community programme shaped around participation rather than event exposure alone.",
      "围绕真实参与而非单纯活动曝光设计的文化社群项目。"
    ),
    venusBridgeRole: localised(
      "Programme context, participant coordination and local delivery, subject to final evidence confirmation.",
      "项目语境、参与方协调与本地落地；最终公开表述以证据核验为准。"
    ),
    evidence: localised(
      "Programme records are held for naming, relationship and publication review.",
      "项目记录正在进行名称、关系层级与公开授权审核。"
    ),
    capabilities: ["institutional-engagement", "cultural-engagement", "brand-activation"],
    audience: localised("International student and university-community audiences", "国际学生与高校社群受众"),
    institutionalRelationshipLevel: "C",
    media: [],
    mediaStatus: "pending",
    evidenceStatus: "context-confirmed"
  },
  {
    slug: "uk-university-talent-engagement-programme",
    title: localised("UK University Talent Engagement Programme", "英国高校人才触达项目"),
    market: localised("United Kingdom", "英国"),
    commercialObjective: localised(
      "Help an international employer engage relevant graduate audiences in the UK.",
      "帮助国际雇主在英国触达相关毕业生受众。"
    ),
    context: localised(
      "A university-facing employer visibility and graduate engagement context.",
      "面向高校场景的雇主品牌与毕业生沟通语境。"
    ),
    programme: localised(
      "Employer presentation, audience engagement and locally coordinated programme delivery.",
      "雇主展示、受众互动与本地项目协调交付。"
    ),
    venusBridgeRole: localised(
      "Programme design, bilingual coordination and local delivery—not recruitment representation.",
      "项目设计、双语协调与本地落地，不承担招聘代理角色。"
    ),
    evidence: localised(
      "Employer, institution, date and outcome details remain withheld until publication checks are complete.",
      "雇主、机构、日期与成果信息将在公开审核完成后补充。"
    ),
    capabilities: ["employer-branding", "talent-engagement", "institutional-engagement"],
    audience: localised("Students, graduates and relevant early-career talent", "学生、毕业生与相关青年人才"),
    institutionalRelationshipLevel: "unverified",
    media: [],
    mediaStatus: "pending",
    evidenceStatus: "context-confirmed"
  },
  {
    slug: "london-university-community-activation",
    title: localised("London University-Community Activation", "伦敦高校社群品牌项目"),
    market: localised("London, UK", "英国伦敦"),
    commercialObjective: localised(
      "Build locally relevant presence within a university-community environment.",
      "在高校社群环境中建立具有本地相关性的品牌存在。"
    ),
    context: localised(
      "Brand and community engagement connected with a London university-community setting.",
      "与伦敦高校社群场景相关的品牌与社区互动。"
    ),
    programme: localised(
      "A community-facing activation built around cultural relevance, participation and responsible local coordination.",
      "围绕文化相关性、社群参与与可靠本地协调形成的项目。"
    ),
    venusBridgeRole: localised(
      "Context definition, stakeholder coordination and accountable local delivery, subject to final evidence confirmation.",
      "场景定义、参与方协调与可追责的本地交付；最终公开表述以证据核验为准。"
    ),
    evidence: localised(
      "Exact organisation, sponsor and relationship wording will be added only after verification and permission.",
      "具体机构、赞助方与关系表述仅在核实并获许可后补充。"
    ),
    capabilities: ["institutional-engagement", "cultural-engagement", "stakeholder-engagement"],
    audience: localised(
      "University-community and culturally relevant local audiences",
      "高校社群与具有文化相关性的当地受众"
    ),
    institutionalRelationshipLevel: "unverified",
    media: [],
    mediaStatus: "pending",
    evidenceStatus: "context-confirmed"
  }
];
