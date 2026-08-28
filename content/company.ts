export type ApprovalStatus = "pending" | "approved";

export type CompanyConfiguration = {
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
  legalName: value(process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME),
  privacyControllerName: value(process.env.NEXT_PUBLIC_PRIVACY_CONTROLLER_NAME),
  tradingName: "Venus Bridge Media",
  companyNumber: value(process.env.NEXT_PUBLIC_COMPANY_NUMBER),
  registeredOffice: value(process.env.NEXT_PUBLIC_REGISTERED_OFFICE),
  businessEmail: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "contact@venusbridgemedia.example",
  contactMethods: {
    phone: value(process.env.NEXT_PUBLIC_BUSINESS_PHONE),
    whatsapp: value(process.env.NEXT_PUBLIC_WHATSAPP),
    wechat: value(process.env.NEXT_PUBLIC_WECHAT)
  },
  websiteDomain: process.env.NEXT_PUBLIC_SITE_URL || "https://venusbridgemedia.example",
  socialProfiles: {
    linkedin: value(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    instagram: value(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    wechat: value(process.env.NEXT_PUBLIC_WECHAT_PROFILE)
  },
  privacyContact: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "privacy@venusbridgemedia.example",
  legalApprovalStatus: process.env.NEXT_PUBLIC_LEGAL_APPROVAL_STATUS === "approved" ? "approved" : "pending",
  termsApprovalStatus: process.env.NEXT_PUBLIC_TERMS_APPROVAL_STATUS === "approved" ? "approved" : "pending",
  privacyEffectiveDate: value(process.env.NEXT_PUBLIC_PRIVACY_EFFECTIVE_DATE),
  termsEffectiveDate: value(process.env.NEXT_PUBLIC_TERMS_EFFECTIVE_DATE)
};

export function hasCompleteCompanyConfiguration() {
  return Boolean(
    company.legalName &&
      company.privacyControllerName &&
      company.companyNumber &&
      company.registeredOffice &&
      process.env.NEXT_PUBLIC_BUSINESS_EMAIL &&
      process.env.NEXT_PUBLIC_PRIVACY_EMAIL &&
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
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL &&
      !isPlaceholderPublicValue(company.businessEmail) &&
      process.env.CONTACT_CHANNELS_CONFIRMED === "true"
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
