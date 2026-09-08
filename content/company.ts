import type { Language } from "@/lib/i18n";

export type ApprovalStatus = "pending" | "approved";
export const legalEntityModes = ["pre-incorporation", "incorporated"] as const;
export type LegalEntityMode = (typeof legalEntityModes)[number];

export type CompanyConfiguration = {
  publicBrandName: "Venus Bridge";
  descriptor: "Global Partnerships";
  legalEntityMode: LegalEntityMode | null;
  legalName: string | null;
  privacyControllerName: string | null;
  tradingNameStatement: Record<Language, string | null>;
  companyNumber: string | null;
  registeredOffice: string | null;
  businessEmail: string;
  contactMethods: {
    phone: string | null;
    whatsapp: string | null;
    wechat: string;
  };
  websiteDomain: string;
  socialProfiles: {
    linkedin: string | null;
    instagram: string | null;
    wechat: string | null;
  };
  privacyContact: string;
  legalApprovalStatus: ApprovalStatus;
  termsApprovalStatus: ApprovalStatus;
  privacyEffectiveDate: string | null;
  termsEffectiveDate: string | null;
};

const value = (input: string | undefined) => input?.trim() || null;
const isPlaceholderPublicValue = (input: string) =>
  /(?:\.example(?:$|[/:])|example\.(?:com|org|net)|localhost)/i.test(input);
const confirmed = (key: string) => process.env[key] === "true";

export const company: CompanyConfiguration = {
  publicBrandName: "Venus Bridge",
  descriptor: "Global Partnerships",
  legalEntityMode: legalEntityModes.includes(process.env.LEGAL_ENTITY_MODE as LegalEntityMode)
    ? (process.env.LEGAL_ENTITY_MODE as LegalEntityMode)
    : null,
  legalName: value(process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME),
  privacyControllerName: value(process.env.NEXT_PUBLIC_PRIVACY_CONTROLLER_NAME),
  tradingNameStatement: {
    en: value(process.env.NEXT_PUBLIC_TRADING_NAME_STATEMENT_EN),
    zh: value(process.env.NEXT_PUBLIC_TRADING_NAME_STATEMENT_ZH)
  },
  companyNumber: value(process.env.NEXT_PUBLIC_COMPANY_NUMBER),
  registeredOffice: value(process.env.NEXT_PUBLIC_REGISTERED_OFFICE),
  businessEmail: process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() || "venusbridge.co.uk@gmail.com",
  contactMethods: {
    phone: value(process.env.NEXT_PUBLIC_BUSINESS_PHONE),
    whatsapp: value(process.env.NEXT_PUBLIC_WHATSAPP),
    wechat: process.env.NEXT_PUBLIC_WECHAT?.trim() || "Venusbridge"
  },
  websiteDomain: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.venusbridge.co.uk",
  socialProfiles: {
    linkedin: value(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    instagram: value(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    wechat: value(process.env.NEXT_PUBLIC_WECHAT_PROFILE)
  },
  privacyContact: process.env.NEXT_PUBLIC_PRIVACY_EMAIL?.trim() || "venusbridge.co.uk@gmail.com",
  legalApprovalStatus: process.env.NEXT_PUBLIC_LEGAL_APPROVAL_STATUS === "approved" ? "approved" : "pending",
  termsApprovalStatus: process.env.NEXT_PUBLIC_TERMS_APPROVAL_STATUS === "approved" ? "approved" : "pending",
  privacyEffectiveDate: value(process.env.NEXT_PUBLIC_PRIVACY_EFFECTIVE_DATE),
  termsEffectiveDate: value(process.env.NEXT_PUBLIC_TERMS_EFFECTIVE_DATE)
};

export function hasConfiguredCompanyFacts() {
  if (!company.legalEntityMode) return false;
  if (company.legalEntityMode === "incorporated") {
    return Boolean(
      company.legalName && company.privacyControllerName && company.companyNumber && company.registeredOffice
    );
  }
  return Boolean(company.privacyControllerName);
}

export function hasCompleteCompanyConfiguration() {
  return Boolean(
    hasConfiguredCompanyFacts() &&
      !isPlaceholderPublicValue(company.businessEmail) &&
      !isPlaceholderPublicValue(company.privacyContact) &&
      company.privacyEffectiveDate &&
      company.termsEffectiveDate &&
      company.legalApprovalStatus === "approved" &&
      company.termsApprovalStatus === "approved"
  );
}

export function hasApprovedPublicBusinessEmail() {
  return Boolean(
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() &&
      !isPlaceholderPublicValue(company.businessEmail) &&
      confirmed("CONTACT_CHANNELS_CONFIRMED")
  );
}

export function isPrivacyNoticeApproved() {
  return Boolean(
    hasCompleteCompanyConfiguration() &&
      confirmed("PRIVACY_NOTICE_COMPLETE") &&
      confirmed("LEGAL_REVIEW_CONFIRMED") &&
      confirmed("PUBLIC_COMPANY_DETAILS_CONFIRMED")
  );
}

export function areWebsiteTermsApproved() {
  return Boolean(
    hasCompleteCompanyConfiguration() &&
      confirmed("TERMS_NOTICE_COMPLETE") &&
      confirmed("LEGAL_REVIEW_CONFIRMED") &&
      confirmed("PUBLIC_COMPANY_DETAILS_CONFIRMED")
  );
}

export function getApprovedTradingNameStatement(language: Language) {
  if (!areWebsiteTermsApproved()) return null;
  return company.tradingNameStatement[language];
}
