export type ApprovalStatus = "pending" | "approved";
export const legalEntityModes = ["pre-incorporation", "incorporated"] as const;
export type LegalEntityMode = (typeof legalEntityModes)[number];

export type CompanyConfiguration = {
  legalEntityMode: LegalEntityMode | null;
  legalName: string | null;
  privacyControllerName: string | null;
  tradingName: string;
  companyNumber: string | null;
  registeredOffice: string | null;
  businessEmail: string;
  contactMethods: {
    phone: string | null;
    whatsapp: string | null;
    wechat: string | null;
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

export const company: CompanyConfiguration = {
  legalEntityMode: legalEntityModes.includes(process.env.LEGAL_ENTITY_MODE as LegalEntityMode)
    ? (process.env.LEGAL_ENTITY_MODE as LegalEntityMode)
    : null,
  legalName: value(process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME),
  privacyControllerName: value(process.env.NEXT_PUBLIC_PRIVACY_CONTROLLER_NAME),
  tradingName: "Venus Bridge Media",
  companyNumber: value(process.env.NEXT_PUBLIC_COMPANY_NUMBER),
  registeredOffice: value(process.env.NEXT_PUBLIC_REGISTERED_OFFICE),
  businessEmail: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "venusbridge.co.uk@gmail.com",
  contactMethods: {
    phone: value(process.env.NEXT_PUBLIC_BUSINESS_PHONE),
    whatsapp: value(process.env.NEXT_PUBLIC_WHATSAPP),
    wechat: value(process.env.NEXT_PUBLIC_WECHAT) || "Venusbridge"
  },
  websiteDomain: process.env.NEXT_PUBLIC_SITE_URL || "https://www.venusbridge.com",
  socialProfiles: {
    linkedin: value(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    instagram: value(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    wechat: value(process.env.NEXT_PUBLIC_WECHAT_PROFILE)
  },
  privacyContact: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "venusbridge.co.uk@gmail.com",
  legalApprovalStatus: process.env.NEXT_PUBLIC_LEGAL_APPROVAL_STATUS === "approved" ? "approved" : "pending",
  termsApprovalStatus: process.env.NEXT_PUBLIC_TERMS_APPROVAL_STATUS === "approved" ? "approved" : "pending",
  privacyEffectiveDate: value(process.env.NEXT_PUBLIC_PRIVACY_EFFECTIVE_DATE),
  termsEffectiveDate: value(process.env.NEXT_PUBLIC_TERMS_EFFECTIVE_DATE)
};

export function hasCompleteCompanyConfiguration() {
  const hasRequiredIdentity =
    company.legalEntityMode === "pre-incorporation" ||
    (company.legalEntityMode === "incorporated" &&
      company.legalName &&
      company.privacyControllerName &&
      company.companyNumber &&
      company.registeredOffice);
  return Boolean(
    hasRequiredIdentity &&
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
    !isPlaceholderPublicValue(company.businessEmail) && process.env.CONTACT_CHANNELS_CONFIRMED === "true"
  );
}

export function isPrivacyNoticeApproved() {
  return Boolean(
    hasCompleteCompanyConfiguration() &&
      company.legalApprovalStatus === "approved" &&
      process.env.LEGAL_REVIEW_CONFIRMED === "true" &&
      process.env.PUBLIC_COMPANY_DETAILS_CONFIRMED === "true"
  );
}

export function areWebsiteTermsApproved() {
  return Boolean(
    hasCompleteCompanyConfiguration() &&
      company.termsApprovalStatus === "approved" &&
      process.env.LEGAL_REVIEW_CONFIRMED === "true" &&
      process.env.PUBLIC_COMPANY_DETAILS_CONFIRMED === "true"
  );
}
