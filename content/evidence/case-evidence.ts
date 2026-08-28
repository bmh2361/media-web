export const evidenceLevels = [
  "A_DIRECT_VERIFIED",
  "B_ADJACENT_OPERATING_PROOF",
  "C_OPERATING_CAPABILITY_NO_PUBLIC_CASE",
  "D_ASPIRATIONAL"
] as const;

export const proofTypes = ["VISUAL", "RELATIONSHIP", "PROCESS"] as const;
export const caseMaturityStates = ["PRIVATE", "ANONYMOUS_PUBLIC", "NAMED_PUBLIC", "FEATURED"] as const;
export const trustDimensions = ["ACCESS", "ORCHESTRATION", "EXECUTION"] as const;

export const evidenceCapabilities = [
  "Institutional & Expert Collaboration",
  "Industry Presence & Events",
  "Creators, Talent & Cultural Partnerships",
  "Creative Production & Brand Assets"
] as const;

export const commercialProjectTypes = [
  "International Credibility Project",
  "UK Industry Presence Project",
  "International Brand Activation",
  "UK Brand Content Production"
] as const;

export const customerOutcomeTags = [
  "International Credibility",
  "Industry Presence",
  "Product / Brand Launch",
  "Institutional Engagement",
  "Expert Engagement",
  "Creator Activation",
  "Talent-Led Production",
  "International Brand Content",
  "Executive / Thought Leadership Content",
  "Local UK Execution"
] as const;

export const projectFormats = [
  "Technology Exhibition",
  "Trade Show",
  "Product Launch",
  "Academic Exchange",
  "Institutional Visit",
  "Expert Roundtable",
  "Executive Interview",
  "Creator Campaign",
  "Brand Activation",
  "Talent Production",
  "Commercial Photography",
  "Brand Film",
  "Industry Event",
  "Corporate Event",
  "Research / Industry Exchange"
] as const;

export const institutionRelationshipLevels = [
  "university-formal-collaboration",
  "faculty-or-department-collaboration",
  "individual-academic-participation",
  "research-group-interaction",
  "campus-visit",
  "hired-venue",
  "academic-speaker-participation",
  "independent-expert-activity",
  "public-event-attendance",
  "none",
  "unknown"
] as const;

export const creatorRelationshipTypes = [
  "paid-collaboration",
  "commissioned-production",
  "organic-appearance",
  "event-attendance",
  "brand-partnership",
  "talent-booking",
  "creator-campaign",
  "affiliate-activity",
  "pr-gifting",
  "none",
  "unknown"
] as const;

export type ApprovalState = "approved" | "not-approved" | "not-required" | "unknown";
export type OwnerApprovalStatus = "approved" | "pending" | "rejected" | "unknown";
export type EvidenceLevel = (typeof evidenceLevels)[number];
export type ProofType = (typeof proofTypes)[number];
export type CaseMaturityState = (typeof caseMaturityStates)[number];
export type TrustDimension = (typeof trustDimensions)[number];
export type EvidenceCapability = (typeof evidenceCapabilities)[number];
export type CommercialProjectType = (typeof commercialProjectTypes)[number];
export type CustomerOutcomeTag = (typeof customerOutcomeTags)[number];
export type ProjectFormat = (typeof projectFormats)[number];
export type InstitutionRelationshipLevel = (typeof institutionRelationshipLevels)[number];
export type CreatorRelationshipType = (typeof creatorRelationshipTypes)[number];
export type EvidenceStrength = "hero" | "core" | "supporting" | "visual" | "archive";
export type EvidenceLanguage = "en" | "zh";
export type LocalisedEvidenceText = Partial<Record<EvidenceLanguage, string>>;

export type EvidenceParticipant = {
  internalName: string;
  publicName: string | null;
  role: string | null;
  identityType: "academic" | "expert" | "creator" | "talent" | "executive" | "speaker" | "other";
  relationshipType: CreatorRelationshipType | "not-applicable";
};

export type EvidenceInstitution = {
  internalName: string;
  publicName: string | null;
  relationshipLevel: InstitutionRelationshipLevel;
  institutionRole: string | null;
  participantRole: string | null;
  formalAgreement: ApprovalState;
  logoPermission: ApprovalState;
  approvedInstitutionWording: string | null;
};

export type EvidenceEvent = {
  internalName: string;
  publicName: string | null;
  city: string | null;
  country: string | null;
  eventContext: string | null;
  boothLaunchActivationScope: string | null;
  staffing: string | null;
  talent: string | null;
  creator: string | null;
  executiveContent: string | null;
  photography: string | null;
  video: string | null;
  stakeholderContent: string | null;
  chinaFacingOutputs: string | null;
  clientFacingDeliverables: string | null;
};

export type EvidenceMedia = {
  assetId: string;
  filename: string;
  kind: "image" | "video" | "document" | "press" | "screenshot" | "event-evidence" | "other";
  evidentialFunction: string;
  rightsStatus: ApprovalState;
  publicUseStatus: ApprovalState;
};

export type CaseEvidenceRecord = {
  identity: {
    caseId: string;
    slug: string;
    maturityState: CaseMaturityState;
    language: EvidenceLanguage[];
    publicTitle: LocalisedEvidenceText;
    internalTitle: string;
    clientName: string | null;
    clientVisibility: "named" | "anonymised" | "confidential" | "unknown";
    projectDate: string | null;
    location: string | null;
    country: string | null;
    projectType: ProjectFormat | "UNKNOWN";
    industry: string | null;
  };
  commercialObjective: {
    clientObjective: LocalisedEvidenceText;
    businessContext: LocalisedEvidenceText;
    commercialProblem: LocalisedEvidenceText;
    desiredOutcome: LocalisedEvidenceText;
    primaryOutcomes: CustomerOutcomeTag[];
  };
  projectActivity: {
    ukActivity: LocalisedEvidenceText;
    engagementFormat: ProjectFormat[];
    participants: EvidenceParticipant[];
    institutions: EvidenceInstitution[];
    events: EvidenceEvent[];
    talent: EvidenceParticipant[];
    creators: EvidenceParticipant[];
    experts: EvidenceParticipant[];
    venues: string[];
    productionElements: string[];
  };
  venusBridgeRole: {
    venusRole: LocalisedEvidenceText;
    scope: LocalisedEvidenceText;
    coordinationRole: LocalisedEvidenceText;
    productionRole: LocalisedEvidenceText;
    relationshipRole: LocalisedEvidenceText;
    whatWeDidNotDo: LocalisedEvidenceText;
  };
  outputs: {
    deliverables: LocalisedEvidenceText[];
    contentOutputs: LocalisedEvidenceText[];
    eventOutputs: LocalisedEvidenceText[];
    relationshipOutputs: LocalisedEvidenceText[];
    brandAssets: LocalisedEvidenceText[];
  };
  capabilityMapping: {
    capabilities: EvidenceCapability[];
    commercialProjectTypes: CommercialProjectType[];
  };
  evidenceGovernance: {
    evidenceLevel: EvidenceLevel;
    proofTypes: ProofType[];
    trustDimensions: TrustDimension[];
    verificationNotes: string[];
  };
  rightsAndClaims: {
    clientNameApproved: ApprovalState;
    clientLogoApproved: ApprovalState;
    institutionNameApproved: ApprovalState;
    institutionLogoApproved: ApprovalState;
    participantNameApproved: ApprovalState;
    participantImageApproved: ApprovalState;
    creatorIdentityApproved: ApprovalState;
    venueIdentityApproved: ApprovalState;
    eventNameApproved: ApprovalState;
    mediaRightsApproved: ApprovalState;
    casePublicationApproved: ApprovalState;
    approvedPublicWording: LocalisedEvidenceText;
    claimRestrictions: string[];
    verificationNotes: string[];
    ownerApprovalStatus: OwnerApprovalStatus;
    relationshipLevel: InstitutionRelationshipLevel;
    institutionRole: string | null;
    participantRole: string | null;
    formalAgreement: ApprovalState;
    logoPermission: ApprovalState;
    approvedInstitutionWording: string | null;
    creatorRelationshipType: CreatorRelationshipType;
  };
  media: {
    heroMedia: EvidenceMedia[];
    galleryMedia: EvidenceMedia[];
    video: EvidenceMedia[];
    documents: EvidenceMedia[];
    pressEvidence: EvidenceMedia[];
    screenshots: EvidenceMedia[];
    eventEvidence: EvidenceMedia[];
    supportingAssets: EvidenceMedia[];
  };
  conversionRole: {
    homepageProofEligible: boolean;
    selectedWorkEligible: boolean;
    capabilityProofEligible: boolean;
    programmeProofEligible: boolean;
    workIndexEligible: boolean;
    dedicatedCaseStudyEligible: boolean;
    contactPreCTAEligible: boolean;
    archiveOnly: boolean;
  };
  evidenceStrength: {
    heroEvidence: boolean;
    coreEvidence: boolean;
    supportingEvidence: boolean;
    visualEvidence: boolean;
    archive: boolean;
  };
};

const hasText = (value: LocalisedEvidenceText) =>
  Object.values(value).some((entry) => Boolean(entry?.trim()));

const allMedia = (record: CaseEvidenceRecord) => Object.values(record.media).flat();

const hasPublicPlacement = (record: CaseEvidenceRecord) =>
  Object.entries(record.conversionRole).some(([key, value]) => key !== "archiveOnly" && value);

export function validateCaseEvidence(record: CaseEvidenceRecord): string[] {
  const errors: string[] = [];
  const id = record.identity.caseId || record.identity.slug || "UNKNOWN";
  if (!record.identity.caseId.trim()) errors.push("caseId is required.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.identity.slug))
    errors.push(`${id}: slug must use lowercase kebab-case.`);
  if (!record.identity.language.length) errors.push(`${id}: at least one language is required.`);
  if (!record.evidenceGovernance.proofTypes.length)
    errors.push(`${id}: at least one proof type is required.`);
  if (!record.evidenceGovernance.trustDimensions.length)
    errors.push(`${id}: at least one trust dimension is required.`);
  if (!record.capabilityMapping.capabilities.length)
    errors.push(`${id}: at least one existing capability mapping is required.`);
  if (record.commercialObjective.primaryOutcomes.length > customerOutcomeTags.length)
    errors.push(`${id}: outcome tags exceed the controlled taxonomy.`);

  const publicPlacement = hasPublicPlacement(record);
  if (record.identity.maturityState === "PRIVATE" && publicPlacement)
    errors.push(`${id}: private evidence cannot receive a public placement.`);
  if (record.identity.maturityState !== "PRIVATE" && !publicPlacement)
    errors.push(`${id}: a public maturity state requires at least one public placement.`);
  if (
    publicPlacement &&
    ["C_OPERATING_CAPABILITY_NO_PUBLIC_CASE", "D_ASPIRATIONAL"].includes(
      record.evidenceGovernance.evidenceLevel
    )
  )
    errors.push(`${id}: Level C or D evidence cannot receive a public case placement.`);
  if (publicPlacement) {
    if (record.rightsAndClaims.casePublicationApproved !== "approved")
      errors.push(`${id}: public placement requires case publication approval.`);
    if (record.rightsAndClaims.mediaRightsApproved !== "approved")
      errors.push(`${id}: public placement requires approved media rights.`);
    if (record.rightsAndClaims.ownerApprovalStatus !== "approved")
      errors.push(`${id}: public placement requires owner approval.`);
    if (!hasText(record.rightsAndClaims.approvedPublicWording))
      errors.push(`${id}: public placement requires approved public wording.`);
  }

  if (
    record.identity.clientVisibility === "named" &&
    record.rightsAndClaims.clientNameApproved !== "approved"
  )
    errors.push(`${id}: a named client requires client-name approval.`);
  if (record.identity.maturityState === "ANONYMOUS_PUBLIC") {
    if (record.identity.clientVisibility !== "anonymised")
      errors.push(`${id}: anonymous-public evidence must use anonymised client visibility.`);
    const exposedPeople = [
      ...record.projectActivity.participants,
      ...record.projectActivity.talent,
      ...record.projectActivity.creators,
      ...record.projectActivity.experts
    ].some((participant) => Boolean(participant.publicName?.trim()));
    const exposedInstitutions = record.projectActivity.institutions.some((institution) =>
      Boolean(institution.publicName?.trim())
    );
    if (exposedPeople || exposedInstitutions)
      errors.push(`${id}: anonymous-public evidence cannot expose participant or institution names.`);
  }
  if (["NAMED_PUBLIC", "FEATURED"].includes(record.identity.maturityState)) {
    if (record.identity.clientVisibility !== "named")
      errors.push(`${id}: named-public or featured evidence requires named client visibility.`);
    if (record.rightsAndClaims.clientNameApproved !== "approved")
      errors.push(`${id}: named-public or featured evidence requires client-name approval.`);
  }
  if (
    record.identity.maturityState === "FEATURED" &&
    !record.conversionRole.homepageProofEligible &&
    !record.conversionRole.selectedWorkEligible
  )
    errors.push(`${id}: featured evidence requires an approved homepage placement.`);
  if (record.rightsAndClaims.institutionNameApproved === "approved") {
    if (!record.rightsAndClaims.institutionRole?.trim())
      errors.push(`${id}: an approved institution name requires its exact role.`);
    if (!record.rightsAndClaims.approvedInstitutionWording?.trim())
      errors.push(`${id}: an approved institution name requires approved institution wording.`);
  }
  if (
    record.rightsAndClaims.relationshipLevel === "university-formal-collaboration" &&
    record.rightsAndClaims.formalAgreement !== "approved"
  )
    errors.push(`${id}: formal university collaboration requires an approved formal agreement.`);
  if (
    record.rightsAndClaims.creatorIdentityApproved === "approved" &&
    ["unknown", "none"].includes(record.rightsAndClaims.creatorRelationshipType)
  )
    errors.push(`${id}: an approved creator identity requires the relationship type.`);
  if (record.rightsAndClaims.eventNameApproved === "approved" && !record.projectActivity.events.length)
    errors.push(`${id}: an approved event name requires an event record.`);

  const strengths = Object.values(record.evidenceStrength).filter(Boolean).length;
  if (strengths !== 1)
    errors.push(`${id}: exactly one primary evidence-strength classification is required.`);
  if (record.evidenceStrength.archive !== record.conversionRole.archiveOnly)
    errors.push(`${id}: archive strength and archive-only placement must agree.`);
  if (record.conversionRole.archiveOnly && publicPlacement)
    errors.push(`${id}: archive-only evidence cannot also have public placement.`);
  if (record.media.heroMedia.length > 1) errors.push(`${id}: only one hero media asset is allowed.`);
  if (allMedia(record).some((asset) => !asset.evidentialFunction.trim()))
    errors.push(`${id}: every media asset requires an evidential function.`);
  if (publicPlacement && allMedia(record).some((asset) => asset.publicUseStatus !== "approved"))
    errors.push(`${id}: public placement cannot use unapproved media.`);

  if (record.conversionRole.dedicatedCaseStudyEligible) {
    if (!hasText(record.commercialObjective.clientObjective))
      errors.push(`${id}: a dedicated case requires a clear objective.`);
    if (!hasText(record.projectActivity.ukActivity))
      errors.push(`${id}: a dedicated case requires a clear UK activity.`);
    if (!hasText(record.venusBridgeRole.venusRole))
      errors.push(`${id}: a dedicated case requires a clear Venus Bridge role.`);
    if (!record.outputs.deliverables.length)
      errors.push(`${id}: a dedicated case requires concrete deliverables.`);
  }
  return errors;
}

export function defineCaseEvidence(record: CaseEvidenceRecord): CaseEvidenceRecord {
  const errors = validateCaseEvidence(record);
  if (errors.length) throw new Error(errors.join("\n"));
  return record;
}

export function validateEvidenceRegister(records: CaseEvidenceRecord[]): string[] {
  const errors = records.flatMap(validateCaseEvidence);
  const ids = records.map((record) => record.identity.caseId);
  const slugs = records.map((record) => record.identity.slug);
  if (new Set(ids).size !== ids.length) errors.push("Evidence register contains duplicate case IDs.");
  if (new Set(slugs).size !== slugs.length) errors.push("Evidence register contains duplicate slugs.");
  if (records.filter((record) => record.conversionRole.homepageProofEligible).length > 4)
    errors.push("Homepage Early Proof is limited to four eligible cases.");
  if (records.filter((record) => record.conversionRole.selectedWorkEligible).length > 6)
    errors.push("Homepage Selected Work is limited to six eligible cases.");
  return errors;
}
