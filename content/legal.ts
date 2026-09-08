import { company, areWebsiteTermsApproved, isPrivacyNoticeApproved } from "@/content/company";

export type BilingualLegalText = { en: string; zh: string };
export type LegalField<T> = {
  value: T | null;
  sourceApproved: boolean;
};

export type PrivacyNoticeConfiguration = {
  controllerIdentity: LegalField<string>;
  purposes: LegalField<BilingualLegalText[]>;
  lawfulBases: LegalField<BilingualLegalText[]>;
  dataCategories: LegalField<BilingualLegalText[]>;
  recipientsAndProcessors: LegalField<BilingualLegalText[]>;
  retention: LegalField<BilingualLegalText[]>;
  internationalTransfers: LegalField<BilingualLegalText[]>;
  dataSubjectRights: LegalField<BilingualLegalText[]>;
  icoComplaintRoute: LegalField<BilingualLegalText>;
  contactDetails: LegalField<string>;
  effectiveDate: LegalField<string>;
  versionHistory: LegalField<Array<{ version: string; effectiveDate: string }>>;
};

const unapproved = <T>(): LegalField<T> => ({ value: null, sourceApproved: false });
const approvedValue = <T>(value: T | null): LegalField<T> => ({
  value,
  sourceApproved: Boolean(value)
});

// Missing legal content stays explicitly unresolved. Approved bilingual source
// must be added before any of these sections can be rendered publicly.
export const privacyNotice: PrivacyNoticeConfiguration = {
  controllerIdentity: approvedValue(company.privacyControllerName),
  purposes: unapproved(),
  lawfulBases: unapproved(),
  dataCategories: unapproved(),
  recipientsAndProcessors: unapproved(),
  retention: unapproved(),
  internationalTransfers: unapproved(),
  dataSubjectRights: unapproved(),
  icoComplaintRoute: unapproved(),
  contactDetails: approvedValue(company.privacyContact),
  effectiveDate: approvedValue(company.privacyEffectiveDate),
  versionHistory: unapproved()
};

export function getLegalReadiness() {
  return {
    translationCorrected: true,
    companyFactsConfigured: Boolean(company.legalEntityMode && company.privacyControllerName),
    completePrivacyNoticeSupplied: process.env.PRIVACY_NOTICE_COMPLETE === "true",
    completeTermsNoticeSupplied: process.env.TERMS_NOTICE_COMPLETE === "true",
    legalReviewConfirmed: process.env.LEGAL_REVIEW_CONFIRMED === "true",
    privacyApproved: isPrivacyNoticeApproved(),
    termsApproved: areWebsiteTermsApproved()
  };
}
