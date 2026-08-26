export const projectTypes = [
  "commercial",
  "video",
  "talent",
  "research",
  "events",
  "agency",
  "market-entry",
  "other"
] as const;
export type ProjectType = (typeof projectTypes)[number];
export const enquiryTypes = ["quick", "full"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];
export const serviceKeys = ["production", "talent", "research", "events", "localisation"] as const;
export const marketEntryNeedKeys = [
  "readiness",
  "company-setup",
  "accounting-tax-referral",
  "vat-customs-eori-referral",
  "trade-mark-ip-referral",
  "marketing-claims",
  "data-privacy-review",
  "product-compliance-referral",
  "uk-launch-campaign",
  "roadshow-launch-event",
  "local-production"
] as const;
export const marketKeys = ["uk", "china", "international", "other"] as const;
export const industryKeys = [
  "automotive",
  "fashion-beauty-apparel",
  "entertainment-culture",
  "technology-ai-research",
  "other"
] as const;
export const formatKeys = ["photography", "video", "mixed", "event-assets", "other"] as const;
export const adaptiveFieldKeys: Record<ProjectType, readonly string[]> = {
  commercial: [
    "contentType",
    "shootDays",
    "locationStatus",
    "talentRequired",
    "stylingRequired",
    "usageChannels"
  ],
  video: ["videoFormat", "shootDays", "usageChannels"],
  talent: [
    "talentCategory",
    "peopleCount",
    "ageRange",
    "languageSkills",
    "usageTerritory",
    "usageChannels",
    "usageDuration"
  ],
  research: [
    "technicalField",
    "collaborationFormat",
    "expertType",
    "confidentiality",
    "institutionType",
    "filmingEvent"
  ],
  events: ["eventFormat", "venueStatus", "audience", "speakerRequirement", "mediaContent", "roadshowCities"],
  agency: ["whiteLabel", "confidentiality", "approvalStructure", "localScope", "talentRequired", "handoff"],
  "market-entry": [
    "currentJurisdiction",
    "ukEntityStatus",
    "entryStructure",
    "targetEntryDate",
    "plannedUkActivity",
    "sellsProducts",
    "importsGoods",
    "productCategory",
    "hiresUkStaff",
    "needsUkMarketing",
    "collectsUkData",
    "plansRoadshow",
    "investorCommunication",
    "appointedAdvisers",
    "coordinationScope"
  ],
  other: ["additionalDetail"]
};
export type ContactPayload = {
  enquiryType: EnquiryType;
  name: string;
  company: string;
  email: string;
  contact?: string;
  projectType: ProjectType;
  industry: (typeof industryKeys)[number];
  market: (typeof marketKeys)[number];
  location?: string;
  projectDate?: string;
  services: string[];
  marketEntryNeeds?: (typeof marketEntryNeedKeys)[number][];
  formats?: (typeof formatKeys)[number];
  summary: string;
  referenceLinks?: string;
  commercialParameters?: string;
  source?: string;
  consent: boolean;
  website?: string;
  startedAt: number;
  adaptive?: Record<string, string>;
  role?: string;
  companyWebsite?: string;
  ukStage?: string;
  timing?: string;
  mainUncertainty?: string;
  objective?: string;
  deliverables?: string;
  channels?: string;
  localNeeds?: string;
  usage?: string;
  approvalOwner?: string;
};
export function validateContact(
  input: unknown
): { ok: true; data: ContactPayload } | { ok: false; errors: Record<string, string> } {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { ok: false, errors: { form: "invalid" } };
  const x = input as Record<string, unknown>,
    errors: Record<string, string> = {};
  const allowed = new Set([
    "name",
    "enquiryType",
    "company",
    "email",
    "contact",
    "projectType",
    "industry",
    "market",
    "location",
    "projectDate",
    "services",
    "marketEntryNeeds",
    "formats",
    "summary",
    "referenceLinks",
    "commercialParameters",
    "source",
    "consent",
    "website",
    "startedAt",
    "adaptive",
    "role",
    "companyWebsite",
    "ukStage",
    "timing",
    "mainUncertainty",
    "objective",
    "deliverables",
    "channels",
    "localNeeds",
    "usage",
    "approvalOwner"
  ]);
  if (Object.keys(x).some((k) => !allowed.has(k))) errors.form = "invalid";
  const s = (k: string, max = 500) => {
    const value = typeof x[k] === "string" ? (x[k] as string).trim() : "";
    if (value.length > max) errors[k] = "too_long";
    return value;
  };
  const projectType = x.projectType as ProjectType;
  if (!projectTypes.includes(projectType)) errors.projectType = "invalid";
  const enquiryType = x.enquiryType as EnquiryType;
  if (!enquiryTypes.includes(enquiryType)) errors.enquiryType = "invalid";
  const enumValue = <T extends readonly string[]>(key: string, values: T) => {
    const value = s(key, 100);
    if (!values.includes(value)) errors[key] = "invalid";
    return value as T[number];
  };
  const services = x.services;
  if (
    !Array.isArray(services) ||
    services.length > serviceKeys.length ||
    services.some((value) => !serviceKeys.includes(value as (typeof serviceKeys)[number]))
  )
    errors.services = "invalid";
  const adaptiveInput = x.adaptive;
  const marketEntryNeeds = x.marketEntryNeeds;
  if (
    marketEntryNeeds !== undefined &&
    (!Array.isArray(marketEntryNeeds) ||
      marketEntryNeeds.length > marketEntryNeedKeys.length ||
      marketEntryNeeds.some(
        (value) => !marketEntryNeedKeys.includes(value as (typeof marketEntryNeedKeys)[number])
      ))
  )
    errors.marketEntryNeeds = "invalid";
  if (projectType !== "market-entry" && Array.isArray(marketEntryNeeds) && marketEntryNeeds.length)
    errors.marketEntryNeeds = "invalid";
  const allowedAdaptiveKeys = adaptiveFieldKeys[projectType] ?? [];
  if (
    adaptiveInput !== undefined &&
    (!adaptiveInput ||
      typeof adaptiveInput !== "object" ||
      Array.isArray(adaptiveInput) ||
      Object.keys(adaptiveInput as Record<string, unknown>).some(
        (key) => !allowedAdaptiveKeys.includes(key)
      ) ||
      Object.values(adaptiveInput as Record<string, unknown>).some(
        (value) => typeof value !== "string" || value.trim().length > 300
      ))
  )
    errors.adaptive = "invalid";
  const data: ContactPayload = {
    enquiryType,
    name: s("name", 100),
    company: s("company", 150),
    email: s("email", 200),
    contact: s("contact", 100),
    projectType,
    industry: enumValue("industry", industryKeys),
    market: enumValue("market", marketKeys),
    location: s("location", 150),
    projectDate: s("projectDate", 50),
    services: Array.isArray(services) ? (services as (typeof serviceKeys)[number][]) : [],
    marketEntryNeeds: Array.isArray(marketEntryNeeds)
      ? (marketEntryNeeds as (typeof marketEntryNeedKeys)[number][])
      : undefined,
    formats: x.formats ? enumValue("formats", formatKeys) : undefined,
    summary: s("summary", 4000),
    referenceLinks: s("referenceLinks", 1500),
    commercialParameters: s("commercialParameters", 1200),
    source: s("source", 150),
    consent: x.consent === true,
    website: s("website", 200),
    startedAt: Number(x.startedAt) || 0,
    adaptive: adaptiveInput
      ? Object.fromEntries(
          Object.entries(adaptiveInput as Record<string, string>).map(([key, value]) => [key, value.trim()])
        )
      : undefined,
    role: s("role", 150),
    companyWebsite: s("companyWebsite", 500),
    ukStage: s("ukStage", 100),
    timing: s("timing", 200),
    mainUncertainty: s("mainUncertainty", 800),
    objective: s("objective", 1200),
    deliverables: s("deliverables", 1600),
    channels: s("channels", 800),
    localNeeds: s("localNeeds", 1000),
    usage: s("usage", 800),
    approvalOwner: s("approvalOwner", 200)
  };
  if (!data.name) errors.name = "required";
  if (data.enquiryType === "full" && !data.company) errors.company = "required";
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "invalid";
  if (data.enquiryType === "full" && !data.email) errors.email = "required";
  if (data.enquiryType === "quick" && !data.email) errors.email = "required";
  if (!data.objective) errors.objective = "required";
  if (data.enquiryType === "full" && !data.deliverables) errors.deliverables = "required";
  if (data.enquiryType === "full" && !data.channels) errors.channels = "required";
  if (data.enquiryType === "full" && !data.usage) errors.usage = "required";
  if (data.enquiryType === "full" && !data.approvalOwner) errors.approvalOwner = "required";
  if (data.enquiryType === "full" && !data.market) errors.market = "required";
  if (data.enquiryType === "full" && !data.industry) errors.industry = "required";
  if (data.summary.length < (data.enquiryType === "quick" ? 10 : 20)) errors.summary = "too_short";
  if (!data.consent) errors.consent = "required";
  if (data.website) errors.form = "invalid";
  if (!data.startedAt || Date.now() - data.startedAt < 2500) errors.form = "too_fast";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
