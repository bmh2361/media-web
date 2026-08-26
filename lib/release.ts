import "server-only";

import { hasPartneredMarketEntryNetwork } from "@/content/market-entry";
import { hasCompleteCompanyConfiguration } from "@/content/company";

export const releaseProfiles = ["development", "staging", "production"] as const;
export type ReleaseProfile = (typeof releaseProfiles)[number];

export const publicWorkModes = ["hidden", "scenarios", "portfolio"] as const;
export type PublicWorkMode = (typeof publicWorkModes)[number];
export const publicMarketEntryModes = ["hidden", "coordination", "partnered"] as const;
export type PublicMarketEntryMode = (typeof publicMarketEntryModes)[number];

type ConfirmationKey =
  | "LEGAL_REVIEW_CONFIRMED"
  | "PUBLIC_COMPANY_DETAILS_CONFIRMED"
  | "CONTACT_DELIVERY_VERIFIED";

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
const isHttpsProductionOrigin = (input: string) => {
  if (!isHttpsProductionUrl(input)) return false;
  const url = new URL(input);
  return url.origin === input.replace(/\/$/, "");
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
    publicMarketEntryMode: isPublicMarketEntryMode(process.env.PUBLIC_MARKET_ENTRY_MODE)
      ? process.env.PUBLIC_MARKET_ENTRY_MODE
      : null,
    legalReviewConfirmed: confirmed("LEGAL_REVIEW_CONFIRMED"),
    publicCompanyDetailsConfirmed: confirmed("PUBLIC_COMPANY_DETAILS_CONFIRMED"),
    contactDeliveryVerified: confirmed("CONTACT_DELIVERY_VERIFIED"),
    mediaGuidesEnabled: process.env.NEXT_PUBLIC_SHOW_MEDIA_GUIDES === "true"
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

export function isProductionReleaseReady(config = getReleaseConfig()) {
  const origins = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return Boolean(
    config.configuredProfile === "production" &&
      config.publicWorkMode === "portfolio" &&
      hasCompleteCompanyConfiguration() &&
      isHttpsProductionUrl(process.env.NEXT_PUBLIC_SITE_URL) &&
      isHttpsProductionUrl(process.env.CONTACT_WEBHOOK_URL) &&
      process.env.CONTACT_WEBHOOK_SECRET?.trim() &&
      origins.length > 0 &&
      origins.every(isHttpsProductionOrigin) &&
      process.env.RATE_LIMIT_PROVIDER === "distributed" &&
      isHttpsProductionUrl(process.env.RATE_LIMIT_DISTRIBUTED_URL) &&
      process.env.RATE_LIMIT_DISTRIBUTED_TOKEN?.trim() &&
      process.env.DISTRIBUTED_RATE_LIMIT_VERIFIED === "true" &&
      process.env.LEGAL_REVIEW_CONFIRMED === "true" &&
      process.env.PUBLIC_COMPANY_DETAILS_CONFIRMED === "true" &&
      process.env.CONTACT_DELIVERY_VERIFIED === "true" &&
      process.env.APPROVED_MEDIA_CONFIRMED === "true" &&
      process.env.PUBLIC_CASE_EVIDENCE_CONFIRMED === "true" &&
      process.env.CONTACT_CHANNELS_CONFIRMED === "true"
  );
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
