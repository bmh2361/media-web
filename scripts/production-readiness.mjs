import {
  isAnalyticsReady,
  isContactFormReady,
  isLegalIdentityReady,
  isSitePublicationReady
} from "../lib/release-policy.ts";

const strict = process.argv.includes("--strict");
const required = [
  "RELEASE_PROFILE",
  "LEGAL_ENTITY_MODE",
  "PUBLIC_WORK_MODE",
  "LEGAL_REVIEW_CONFIRMED",
  "PUBLIC_COMPANY_DETAILS_CONFIRMED",
  "APPROVED_MEDIA_CONFIRMED",
  "PUBLIC_CASE_EVIDENCE_CONFIRMED",
  "CONTACT_CHANNELS_CONFIRMED",
  "PRIVACY_NOTICE_COMPLETE",
  "TERMS_NOTICE_COMPLETE",
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_PRIVACY_CONTROLLER_NAME",
  "NEXT_PUBLIC_BUSINESS_EMAIL",
  "NEXT_PUBLIC_PRIVACY_EMAIL",
  "NEXT_PUBLIC_LEGAL_APPROVAL_STATUS",
  "NEXT_PUBLIC_TERMS_APPROVAL_STATUS",
  "NEXT_PUBLIC_PRIVACY_EFFECTIVE_DATE",
  "NEXT_PUBLIC_TERMS_EFFECTIVE_DATE"
];
const exact = {
  RELEASE_PROFILE: "production",
  PUBLIC_WORK_MODE: "portfolio",
  LEGAL_REVIEW_CONFIRMED: "true",
  PUBLIC_COMPANY_DETAILS_CONFIRMED: "true",
  APPROVED_MEDIA_CONFIRMED: "true",
  PUBLIC_CASE_EVIDENCE_CONFIRMED: "true",
  CONTACT_CHANNELS_CONFIRMED: "true",
  PRIVACY_NOTICE_COMPLETE: "true",
  TERMS_NOTICE_COMPLETE: "true",
  NEXT_PUBLIC_LEGAL_APPROVAL_STATUS: "approved",
  NEXT_PUBLIC_TERMS_APPROVAL_STATUS: "approved"
};
const missing = required.filter((key) => !process.env[key]?.trim());
const invalid = Object.entries(exact)
  .filter(([key, expected]) => process.env[key]?.trim() && process.env[key] !== expected)
  .map(([key, expected]) => ({ key, expected, actual: process.env[key] }));
if (process.env.LEGAL_ENTITY_MODE === "incorporated") {
  for (const key of [
    "NEXT_PUBLIC_LEGAL_COMPANY_NAME",
    "NEXT_PUBLIC_COMPANY_NUMBER",
    "NEXT_PUBLIC_REGISTERED_OFFICE"
  ])
    if (!process.env[key]?.trim()) missing.push(key);
}
const indexingRequested = process.env.RELEASE_INDEXING_ENABLED === "true";
const previewDeployment =
  process.env.RELEASE_PROFILE !== "production" ||
  !process.env.CF_PAGES_BRANCH?.trim() ||
  process.env.CF_PAGES_BRANCH !== (process.env.CF_PAGES_PRODUCTION_BRANCH?.trim() || "main");
const formRequested = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";
const formMissing = formRequested
  ? [
      "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
      "CONTACT_FORM_ENABLED",
      "CONTACT_DELIVERY_VERIFIED",
      "CONTACT_ALLOWED_ORIGINS",
      "CONTACT_WEBHOOK_URL",
      "CONTACT_WEBHOOK_SECRET",
      "TURNSTILE_SECRET_KEY"
    ].filter((key) => !process.env[key]?.trim())
  : [];
if (formRequested && previewDeployment && process.env.CONTACT_PREVIEW_BINDINGS_CONFIRMED !== "true") {
  formMissing.push("CONTACT_PREVIEW_BINDINGS_CONFIRMED");
}
const legalKeys = [
  "LEGAL_ENTITY_MODE",
  "LEGAL_REVIEW_CONFIRMED",
  "PUBLIC_COMPANY_DETAILS_CONFIRMED",
  "PRIVACY_NOTICE_COMPLETE",
  "TERMS_NOTICE_COMPLETE",
  "NEXT_PUBLIC_PRIVACY_CONTROLLER_NAME",
  "NEXT_PUBLIC_BUSINESS_EMAIL",
  "NEXT_PUBLIC_PRIVACY_EMAIL",
  "NEXT_PUBLIC_LEGAL_APPROVAL_STATUS",
  "NEXT_PUBLIC_TERMS_APPROVAL_STATUS",
  "NEXT_PUBLIC_PRIVACY_EFFECTIVE_DATE",
  "NEXT_PUBLIC_TERMS_EFFECTIVE_DATE"
];
if (process.env.LEGAL_ENTITY_MODE === "incorporated") {
  legalKeys.push(
    "NEXT_PUBLIC_LEGAL_COMPANY_NAME",
    "NEXT_PUBLIC_COMPANY_NUMBER",
    "NEXT_PUBLIC_REGISTERED_OFFICE"
  );
}
const legalIdentityComplete = legalKeys.every((key) => process.env[key]?.trim());
const productionUrlReady = (() => {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || "");
    return url.protocol === "https:" && !/(?:localhost|example\.(?:com|org|net))$/i.test(url.hostname);
  } catch {
    return false;
  }
})();
const gateInputs = {
  productionProfileConfigured: process.env.RELEASE_PROFILE === "production",
  portfolioReady: process.env.PUBLIC_WORK_MODE === "portfolio",
  legalIdentityComplete,
  legalReviewConfirmed: process.env.LEGAL_REVIEW_CONFIRMED === "true",
  publicDetailsConfirmed: process.env.PUBLIC_COMPANY_DETAILS_CONFIRMED === "true",
  privacyApproved:
    legalIdentityComplete &&
    process.env.PRIVACY_NOTICE_COMPLETE === "true" &&
    process.env.NEXT_PUBLIC_LEGAL_APPROVAL_STATUS === "approved",
  termsApproved:
    legalIdentityComplete &&
    process.env.TERMS_NOTICE_COMPLETE === "true" &&
    process.env.NEXT_PUBLIC_TERMS_APPROVAL_STATUS === "approved",
  approvedMediaConfirmed: process.env.APPROVED_MEDIA_CONFIRMED === "true",
  publicCaseEvidenceConfirmed: process.env.PUBLIC_CASE_EVIDENCE_CONFIRMED === "true",
  contactChannelsConfirmed: process.env.CONTACT_CHANNELS_CONFIRMED === "true",
  productionUrlReady,
  indexingRequested,
  previewDeployment,
  contactFormRequested: formRequested,
  turnstileSiteKeyConfigured: Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()),
  contactDeliveryVerified: process.env.CONTACT_DELIVERY_VERIFIED === "true",
  previewContactBindingsConfirmed: process.env.PREVIEW_CONTACT_BINDINGS_CONFIRMED === "true",
  analyticsRequested: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
  analyticsProviderConfigured: Boolean(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.trim()),
  analyticsPropertyConfigured: Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim()),
  analyticsPrivacyApproved: process.env.NEXT_PUBLIC_ANALYTICS_PRIVACY_APPROVED === "true"
};
const legalIdentityReady = isLegalIdentityReady(gateInputs);
const sitePublicationReady = isSitePublicationReady(gateInputs);
const contactFormReady = isContactFormReady(gateInputs) && formMissing.length === 0;
const analyticsReady = isAnalyticsReady(gateInputs);
const report = {
  productionReady: sitePublicationReady,
  predicates: {
    isSitePublicationReady: sitePublicationReady,
    isLegalIdentityReady: legalIdentityReady,
    isContactFormReady: contactFormReady,
    isAnalyticsReady: analyticsReady
  },
  indexingRequested,
  previewDeployment,
  indexingAllowed: sitePublicationReady && indexingRequested,
  organizationSchemaAllowed: sitePublicationReady,
  contactFormRequested: formRequested,
  contactFormConfigurationReady: contactFormReady,
  missing: [...new Set(missing)],
  invalid,
  formMissing,
  abuseProtectionBindingsRequired: formRequested ? ["CONTACT_RATE_LIMITER", "CONTACT_DEDUPLICATION"] : []
};
console.log(JSON.stringify(report, null, 2));
if (strict && (!report.productionReady || (formRequested && !report.contactFormConfigurationReady)))
  process.exitCode = 1;
