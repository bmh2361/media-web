export type ReleaseGateInputs = {
  productionProfileConfigured: boolean;
  portfolioReady: boolean;
  legalIdentityComplete: boolean;
  legalReviewConfirmed: boolean;
  publicDetailsConfirmed: boolean;
  privacyApproved: boolean;
  termsApproved: boolean;
  approvedMediaConfirmed: boolean;
  publicCaseEvidenceConfirmed: boolean;
  contactChannelsConfirmed: boolean;
  productionUrlReady: boolean;
  indexingRequested: boolean;
  previewDeployment: boolean;
  contactFormRequested: boolean;
  turnstileSiteKeyConfigured: boolean;
  contactDeliveryVerified: boolean;
  previewContactBindingsConfirmed: boolean;
  analyticsRequested: boolean;
  analyticsProviderConfigured: boolean;
  analyticsPropertyConfigured: boolean;
  analyticsPrivacyApproved: boolean;
};

type LegalIdentityInputs = Pick<
  ReleaseGateInputs,
  | "legalIdentityComplete"
  | "legalReviewConfirmed"
  | "publicDetailsConfirmed"
  | "privacyApproved"
  | "termsApproved"
>;
type AnalyticsInputs = Pick<
  ReleaseGateInputs,
  | "analyticsRequested"
  | "analyticsProviderConfigured"
  | "analyticsPropertyConfigured"
  | "analyticsPrivacyApproved"
>;

export function isLegalIdentityReady(input: LegalIdentityInputs) {
  return Boolean(
    input.legalIdentityComplete &&
      input.legalReviewConfirmed &&
      input.publicDetailsConfirmed &&
      input.privacyApproved &&
      input.termsApproved
  );
}

export function isSitePublicationReady(input: ReleaseGateInputs) {
  return Boolean(
    input.productionProfileConfigured &&
      input.portfolioReady &&
      isLegalIdentityReady(input) &&
      input.approvedMediaConfirmed &&
      input.publicCaseEvidenceConfirmed &&
      input.contactChannelsConfirmed &&
      input.productionUrlReady &&
      !input.previewDeployment
  );
}

export function isContactFormReady(input: ReleaseGateInputs) {
  return Boolean(
    input.contactFormRequested &&
      isLegalIdentityReady(input) &&
      input.contactChannelsConfirmed &&
      input.turnstileSiteKeyConfigured &&
      input.contactDeliveryVerified &&
      (!input.previewDeployment || input.previewContactBindingsConfirmed)
  );
}

export function isAnalyticsReady(input: AnalyticsInputs) {
  return Boolean(
    input.analyticsRequested &&
      input.analyticsProviderConfigured &&
      input.analyticsPropertyConfigured &&
      input.analyticsPrivacyApproved
  );
}
