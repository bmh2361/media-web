import type { Language } from "@/lib/i18n";
import type { MediaId } from "@/content/media";

export type Localized<T> = Record<Language, T>;
export type LocalisedString = Localized<string>;
export type CaseStatus = "published" | "anonymised" | "concept";
export type DisclosureLevel = "named" | "confidential" | "illustrative";
export type EvidenceState = "unverified" | "company-confirmed" | "client-approved" | "publicly-verifiable";
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
  disclosureLevel: DisclosureLevel;
  evidenceState: EvidenceState;
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
