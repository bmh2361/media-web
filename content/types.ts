import type { Language } from "@/lib/i18n";
import type { MediaId } from "@/content/media";

export type Localized<T> = Record<Language, T>;
export type LocalisedString = Localized<string>;
export type CaseStatus = "verified" | "anonymised" | "confidential" | "concept";
export type DisclosureLevel = "named" | "confidential" | "illustrative";
export type EvidenceState = "unverified" | "company-confirmed" | "client-approved" | "publicly-verifiable";
export type CaseDeliveryStatus =
  | "completed"
  | "completed-awaiting-approval"
  | "in-progress"
  | "lead"
  | "concept";
export type CasePublicStatus = "hidden" | "private" | "public";
export type EvidenceRecord = {
  type: "client-approval" | "published-output" | "delivery-record" | "public-source" | "other";
  label: LocalisedString;
  sourceUrl?: string;
  verified: boolean;
  approvedForPublic: boolean;
};
export type CaseMetric = {
  label: LocalisedString;
  value: string;
  verified: boolean;
};
export type ClientNameDisclosure = "public" | "anonymised" | "withheld";
export type MediaApproval = "approved" | "restricted" | "placeholder";
export type DisclosurePermission = "approved" | "not-approved" | "not-required";
export type ClientLogoApproval = "approved" | "not-approved" | "not-applicable";
export type EvidenceException = {
  reason: string;
  approvedBy: string;
};
export type ServicePillar =
  | "commercial-production"
  | "talent"
  | "technology-content"
  | "research-innovation"
  | "events-exhibitions"
  | "agency-support";
export type CaseStudy = {
  slug: string;
  status: CaseStatus;
  deliveryStatus: CaseDeliveryStatus;
  publicStatus: CasePublicStatus;
  realProject: boolean;
  featured: boolean;
  clientDisplayName?: string;
  clientNameDisclosure: ClientNameDisclosure;
  mediaApproval: MediaApproval;
  publicDisclosurePermission: DisclosurePermission;
  clientLogoApproval: ClientLogoApproval;
  roleDisclosure: LocalisedString;
  projectDate?: string;
  outcomeEvidence?: LocalisedString[];
  disclosure?: LocalisedString;
  disclosureLevel: DisclosureLevel;
  evidenceState: EvidenceState;
  evidence: EvidenceRecord[];
  clientApproval: boolean;
  mediaRightsApproved: boolean;
  legalApproved: boolean;
  metrics?: CaseMetric[];
  evidenceException?: EvidenceException;
  title: LocalisedString;
  summary: LocalisedString;
  industry: LocalisedString;
  industryKey: string;
  servicePillars: ServicePillar[];
  projectType: LocalisedString;
  challenge: LocalisedString;
  objective: LocalisedString;
  outcome: LocalisedString;
  clientNeed: LocalisedString;
  frameBridgeRole: LocalisedString;
  productionScope: LocalisedString[];
  deliverables: LocalisedString[];
  formats: LocalisedString[];
  usageContext: LocalisedString[];
  constraints: LocalisedString[];
  location?: LocalisedString;
  market?: LocalisedString;
  visualDirection: LocalisedString;
  cta: LocalisedString;
  relatedIndustries: string[];
  mediaIds: MediaId[];
  heroMediaId: MediaId;
};
export type LinkItem = { label: string; href: string };
export type ServiceDetail = {
  eyebrow: string;
  title: string;
  intro: string;
  scope: string[];
  needs: string[];
  deliverables: string[];
  process: Array<{ title: string; text: string }>;
  relatedWork: string[];
  note?: string;
  ctaTitle: string;
  cta: string;
};

export type CapabilityMediaCategory =
  | "technology-ai-product"
  | "founder-expert-interviews"
  | "events-exhibitions-roadshows"
  | "creator-commercial-content"
  | "artist-live-performance"
  | "artist-creator-interviews"
  | "uk-local-execution";

export type CapabilityMediaCollection = {
  id: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  category: CapabilityMediaCategory;
  primaryExpertise: "entertainment-culture" | "technology-ai-research";
  relatedPaths: Array<"create-in-the-uk" | "launch-in-the-uk" | "enter-the-uk">;
  media: import("@/content/capability-media").CapabilityMedia[];
  treatment: "hero" | "editorial-grid" | "capability-strip" | "supporting-media";
  caseReady: false;
  capabilityReady: true;
  public: boolean;
};
