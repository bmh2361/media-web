import "server-only";

import { hasPartneredMarketEntryNetwork } from "@/content/market-entry";
import {
  areWebsiteTermsApproved,
  company,
  hasCompleteCompanyConfiguration,
  isPrivacyNoticeApproved
} from "@/content/company";
import {
  isAnalyticsReady,
  isContactFormReady,
  isLegalIdentityReady,
  isSitePublicationReady,
  type ReleaseGateInputs
} from "@/lib/release-policy";

export { isAnalyticsReady, isContactFormReady, isLegalIdentityReady, isSitePublicationReady };

export const releaseProfiles = ["development", "staging", "production"] as const;
export type ReleaseProfile = (typeof releaseProfiles)[number];

export const publicWorkModes = ["hidden", "scenarios", "portfolio"] as const;
export type PublicWorkMode = (typeof publicWorkModes)[number];
export const publicMarketEntryModes = ["hidden", "coordination", "partnered"] as const;
export type PublicMarketEntryMode = (typeof publicMarketEntryModes)[number];

type ConfirmationKey = "LEGAL_REVIEW_CONFIRMED" | "PUBLIC_COMPANY_DETAILS_CONFIRMED";

const isHttpsProductionUrl = (input: string | undefined) => {
  if (!input) return false;
  try {
    const url = new URL(input);
    return (
      url.protocol === "https:" &&
      !/(?:^|\.)localhost$|(?:^|\.)example\.(?:com|org|net)$|\.example$/i.test(url.hostname)
    );
  } catch {
    return false;
  }
};
const isReleaseProfile = (value: string | undefined): value is ReleaseProfile =>
  Boolean(value && releaseProfiles.includes(value as ReleaseProfile));
const isPublicWorkMode = (value: string | undefined): value is PublicWorkMode =>
  Boolean(value && publicWorkModes.includes(value as PublicWorkMode));
const isPublicMarketEntryMode = (value: string | undefined): value is PublicMarketEntryMode =>
  Boolean(value && publicMarketEntryModes.includes(value as PublicMarketEntryMode));
const confirmed = (key: ConfirmationKey) => process.env[key] === "true";

export type ReleaseConfig = {
  profile: ReleaseProfile;
  configuredProfile: ReleaseProfile | null;
  publicWorkMode: PublicWorkMode | null;
  publicMarketEntryMode: PublicMarketEntryMode | null;
  legalReviewConfirmed: boolean;
  publicCompanyDetailsConfirmed: boolean;
  mediaGuidesEnabled: boolean;
  indexingRequested: boolean;
  contactFormRequested: boolean;
  previewDeployment: boolean;
  previewContactBindingsConfirmed: boolean;
};

function isPreviewDeployment() {
  if (process.env.RELEASE_PROFILE !== "production") return true;
  const branch = process.env.CF_PAGES_BRANCH?.trim();
  const productionBranch = process.env.CF_PAGES_PRODUCTION_BRANCH?.trim() || "main";
  // Cloudflare supplies CF_PAGES_BRANCH. A production-labelled build without
  // that deployment context is treated as a non-indexable preview by default.
  return !branch || branch !== productionBranch;
}

export function getReleaseConfig(): ReleaseConfig {
  const configuredProfile = isReleaseProfile(process.env.RELEASE_PROFILE)
    ? process.env.RELEASE_PROFILE
    : null;
  return {
    profile: configuredProfile ?? "development",
    configuredProfile,
    publicWorkMode: isPublicWorkMode(process.env.PUBLIC_WORK_MODE) ? process.env.PUBLIC_WORK_MODE : null,
    publicMarketEntryMode: isPublicMarketEntryMode(process.env.PUBLIC_MARKET_ENTRY_MODE)
      ? process.env.PUBLIC_MARKET_ENTRY_MODE
      : null,
    legalReviewConfirmed: confirmed("LEGAL_REVIEW_CONFIRMED"),
    publicCompanyDetailsConfirmed: confirmed("PUBLIC_COMPANY_DETAILS_CONFIRMED"),
    mediaGuidesEnabled: process.env.NEXT_PUBLIC_SHOW_MEDIA_GUIDES === "true",
    indexingRequested: process.env.RELEASE_INDEXING_ENABLED === "true",
    contactFormRequested: process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true",
    previewDeployment: isPreviewDeployment(),
    previewContactBindingsConfirmed: process.env.PREVIEW_CONTACT_BINDINGS_CONFIRMED === "true"
  };
}

export function getEffectiveWorkMode(config = getReleaseConfig()): PublicWorkMode {
  return config.publicWorkMode ?? (config.profile === "production" ? "hidden" : "scenarios");
}

export function getEffectiveMarketEntryMode(config = getReleaseConfig()): PublicMarketEntryMode {
  const requested = config.publicMarketEntryMode;
  if (!requested) return config.profile === "production" ? "hidden" : "coordination";
  if (requested === "partnered" && !hasPartneredMarketEntryNetwork) return "coordination";
  return requested;
}

export function getReleaseGateInputs(config = getReleaseConfig()): ReleaseGateInputs {
  return {
    productionProfileConfigured: config.configuredProfile === "production",
    portfolioReady: config.publicWorkMode === "portfolio",
    legalIdentityComplete: Boolean(company.legalEntityMode) && hasCompleteCompanyConfiguration(),
    legalReviewConfirmed: config.legalReviewConfirmed,
    publicDetailsConfirmed: config.publicCompanyDetailsConfirmed,
    privacyApproved: isPrivacyNoticeApproved(),
    termsApproved: areWebsiteTermsApproved(),
    approvedMediaConfirmed: process.env.APPROVED_MEDIA_CONFIRMED === "true",
    publicCaseEvidenceConfirmed: process.env.PUBLIC_CASE_EVIDENCE_CONFIRMED === "true",
    contactChannelsConfirmed: process.env.CONTACT_CHANNELS_CONFIRMED === "true",
    productionUrlReady: isHttpsProductionUrl(company.websiteDomain),
    indexingRequested: config.indexingRequested,
    previewDeployment: config.previewDeployment,
    contactFormRequested: config.contactFormRequested,
    turnstileSiteKeyConfigured: Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()),
    contactDeliveryVerified: process.env.CONTACT_DELIVERY_VERIFIED === "true",
    previewContactBindingsConfirmed: config.previewContactBindingsConfirmed,
    analyticsRequested: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
    analyticsProviderConfigured: Boolean(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.trim()),
    analyticsPropertyConfigured: Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim()),
    analyticsPrivacyApproved: process.env.NEXT_PUBLIC_ANALYTICS_PRIVACY_APPROVED === "true"
  };
}

export function isProductionReleaseReady(config = getReleaseConfig()) {
  return isSitePublicationReady(getReleaseGateInputs(config));
}

export function getProductionReadiness(config = getReleaseConfig()) {
  const gates = getReleaseGateInputs(config);
  const legalIdentityReady = isLegalIdentityReady(gates);
  const sitePublicationReady = isSitePublicationReady(gates);
  return {
    productionReady: sitePublicationReady,
    sitePublicationReady,
    identityReady: gates.legalIdentityComplete,
    legalReady: legalIdentityReady,
    legalIdentityReady,
    previewDeployment: config.previewDeployment,
    indexingAllowed: sitePublicationReady && gates.indexingRequested,
    organizationSchemaAllowed: sitePublicationReady,
    contactFormAllowed: isContactFormReady(gates),
    analyticsAllowed: isAnalyticsReady(gates)
  };
}

export function isIndexingAllowed(config = getReleaseConfig()) {
  return getProductionReadiness(config).indexingAllowed;
}

export function isContactFormExposed(config = getReleaseConfig()) {
  return getProductionReadiness(config).contactFormAllowed;
}

export type WorkPresentation = {
  navigationLabel: Record<"en" | "zh", string>;
  pageTitle: Record<"en" | "zh", string>;
  description: Record<"en" | "zh", string>;
  sectionHeading: Record<"en" | "zh", string>;
  ctaLabel: Record<"en" | "zh", string>;
  metadataTitle: Record<"en" | "zh", string>;
};

const hiddenPresentation: WorkPresentation = {
  navigationLabel: { en: "Work", zh: "案例" },
  pageTitle: { en: "Work", zh: "案例" },
  description: { en: "This section is not published.", zh: "此栏目尚未发布。" },
  sectionHeading: { en: "Work", zh: "案例" },
  ctaLabel: { en: "Explore work", zh: "查看案例" },
  metadataTitle: { en: "Work | Venus Bridge", zh: "案例｜Venus Bridge" }
};

const scenarioPresentation: WorkPresentation = {
  navigationLabel: { en: "Production Scenarios", zh: "制作场景" },
  pageTitle: { en: "Common UK Production Scenarios", zh: "常见英国制作场景" },
  description: {
    en: "See how campaigns, talent, events and local delivery can be organised for different UK briefs.",
    zh: "了解广告、人才、活动与本地执行如何围绕不同英国项目需求被组织。"
  },
  sectionHeading: { en: "Production scenarios", zh: "制作场景" },
  ctaLabel: { en: "Explore scenarios", zh: "查看制作场景" },
  metadataTitle: {
    en: "UK Production Scenarios | Venus Bridge",
    zh: "英国制作场景｜Venus Bridge"
  }
};

const portfolioPresentation: WorkPresentation = {
  navigationLabel: { en: "Portfolio", zh: "作品集" },
  pageTitle: { en: "Selected Portfolio", zh: "精选作品集" },
  description: {
    en: "Verified, anonymised and confidential work that meets Venus Bridge evidence requirements.",
    zh: "符合 Venus Bridge 证据要求的已公开及客户保密项目。"
  },
  sectionHeading: { en: "Selected Portfolio", zh: "精选作品集" },
  ctaLabel: { en: "Explore Portfolio", zh: "查看作品集" },
  metadataTitle: { en: "Portfolio | Venus Bridge", zh: "作品集｜Venus Bridge" }
};

export function getWorkPresentation(mode = getReleaseConfig().publicWorkMode): WorkPresentation {
  if (mode === "portfolio") return portfolioPresentation;
  if (mode === "hidden") return hiddenPresentation;
  return scenarioPresentation;
}
