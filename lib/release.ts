import "server-only";

export const releaseProfiles = ["development", "staging", "production"] as const;
export type ReleaseProfile = (typeof releaseProfiles)[number];

export const publicWorkModes = ["concept-models", "portfolio"] as const;
export type PublicWorkMode = (typeof publicWorkModes)[number];

type ConfirmationKey =
  | "LEGAL_REVIEW_CONFIRMED"
  | "PUBLIC_COMPANY_DETAILS_CONFIRMED"
  | "CONTACT_DELIVERY_VERIFIED";

const isReleaseProfile = (value: string | undefined): value is ReleaseProfile =>
  Boolean(value && releaseProfiles.includes(value as ReleaseProfile));
const isPublicWorkMode = (value: string | undefined): value is PublicWorkMode =>
  Boolean(value && publicWorkModes.includes(value as PublicWorkMode));
const confirmed = (key: ConfirmationKey) => process.env[key] === "true";

export type ReleaseConfig = {
  profile: ReleaseProfile;
  configuredProfile: ReleaseProfile | null;
  publicWorkMode: PublicWorkMode | null;
  legalReviewConfirmed: boolean;
  publicCompanyDetailsConfirmed: boolean;
  contactDeliveryVerified: boolean;
  mediaGuidesEnabled: boolean;
};

export function getReleaseConfig(): ReleaseConfig {
  const configuredProfile = isReleaseProfile(process.env.RELEASE_PROFILE)
    ? process.env.RELEASE_PROFILE
    : null;
  return {
    profile: configuredProfile ?? "development",
    configuredProfile,
    publicWorkMode: isPublicWorkMode(process.env.PUBLIC_WORK_MODE) ? process.env.PUBLIC_WORK_MODE : null,
    legalReviewConfirmed: confirmed("LEGAL_REVIEW_CONFIRMED"),
    publicCompanyDetailsConfirmed: confirmed("PUBLIC_COMPANY_DETAILS_CONFIRMED"),
    contactDeliveryVerified: confirmed("CONTACT_DELIVERY_VERIFIED"),
    mediaGuidesEnabled: process.env.NEXT_PUBLIC_SHOW_MEDIA_GUIDES === "true"
  };
}

export type WorkPresentation = {
  navigationLabel: Record<"en" | "zh", string>;
  pageTitle: Record<"en" | "zh", string>;
  description: Record<"en" | "zh", string>;
  sectionHeading: Record<"en" | "zh", string>;
  ctaLabel: Record<"en" | "zh", string>;
  metadataTitle: Record<"en" | "zh", string>;
};

const conceptPresentation: WorkPresentation = {
  navigationLabel: { en: "Project Models", zh: "项目模式" },
  pageTitle: { en: "Concept Project Models", zh: "概念项目模式" },
  description: {
    en: "Illustrative project models that show how UK production, talent and content delivery can be planned. They are not presented as completed client projects.",
    zh: "用于说明英国制作、人才与内容交付如何规划的项目模式示例，不作为已完成客户项目展示。"
  },
  sectionHeading: { en: "Illustrative Project Models", zh: "项目模式示例" },
  ctaLabel: { en: "Explore Project Models", zh: "查看项目模式" },
  metadataTitle: { en: "Concept Project Models | FrameBridge Studio", zh: "概念项目模式｜FrameBridge Studio" }
};

const portfolioPresentation: WorkPresentation = {
  navigationLabel: { en: "Portfolio", zh: "作品集" },
  pageTitle: { en: "Selected Portfolio", zh: "精选作品集" },
  description: {
    en: "Published and client-confidential work that meets FrameBridge evidence requirements.",
    zh: "符合 FrameBridge 证据要求的已公开及客户保密项目。"
  },
  sectionHeading: { en: "Selected Portfolio", zh: "精选作品集" },
  ctaLabel: { en: "Explore Portfolio", zh: "查看作品集" },
  metadataTitle: { en: "Portfolio | FrameBridge Studio", zh: "作品集｜FrameBridge Studio" }
};

export function getWorkPresentation(mode = getReleaseConfig().publicWorkMode): WorkPresentation {
  return mode === "portfolio" ? portfolioPresentation : conceptPresentation;
}
