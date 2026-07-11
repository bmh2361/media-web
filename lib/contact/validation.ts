export const projectTypes = [
  "commercial",
  "video",
  "talent",
  "research",
  "events",
  "agency",
  "other"
] as const;
export type ProjectType = (typeof projectTypes)[number];
export const serviceKeys = ["production", "talent", "research", "events", "localisation"] as const;
export const marketKeys = ["uk", "china", "international", "other"] as const;
export const budgetKeys = ["under-10k", "10k-25k", "25k-50k", "50k-plus", "to-discuss"] as const;
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
  events: ["eventFormat", "audience", "venueStatus", "speakerRequirement", "stageAv", "mediaContent"],
  agency: ["whiteLabel", "confidentiality", "approvalStructure", "localScope", "talentRequired", "handoff"],
  other: ["additionalDetail"]
};
export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  contact?: string;
  projectType: ProjectType;
  market: (typeof marketKeys)[number];
  location?: string;
  projectDate?: string;
  budget?: (typeof budgetKeys)[number];
  services: string[];
  formats?: (typeof formatKeys)[number];
  summary: string;
  source?: string;
  consent: boolean;
  website?: string;
  startedAt: number;
  adaptive?: Record<string, string>;
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
    "company",
    "email",
    "contact",
    "projectType",
    "market",
    "location",
    "projectDate",
    "budget",
    "services",
    "formats",
    "summary",
    "source",
    "consent",
    "website",
    "startedAt",
    "adaptive"
  ]);
  if (Object.keys(x).some((k) => !allowed.has(k))) errors.form = "invalid";
  const s = (k: string, max = 500) => {
    const value = typeof x[k] === "string" ? (x[k] as string).trim() : "";
    if (value.length > max) errors[k] = "too_long";
    return value;
  };
  const projectType = x.projectType as ProjectType;
  if (!projectTypes.includes(projectType)) errors.projectType = "invalid";
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
    name: s("name", 100),
    company: s("company", 150),
    email: s("email", 200),
    contact: s("contact", 100),
    projectType,
    market: enumValue("market", marketKeys),
    location: s("location", 150),
    projectDate: s("projectDate", 50),
    budget: x.budget ? enumValue("budget", budgetKeys) : undefined,
    services: Array.isArray(services) ? (services as (typeof serviceKeys)[number][]) : [],
    formats: x.formats ? enumValue("formats", formatKeys) : undefined,
    summary: s("summary", 4000),
    source: s("source", 150),
    consent: x.consent === true,
    website: s("website", 200),
    startedAt: Number(x.startedAt) || 0,
    adaptive: adaptiveInput
      ? Object.fromEntries(
          Object.entries(adaptiveInput as Record<string, string>).map(([key, value]) => [key, value.trim()])
        )
      : undefined
  };
  if (!data.name) errors.name = "required";
  if (!data.company) errors.company = "required";
  if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "invalid";
  if (!data.market) errors.market = "required";
  if (data.summary.length < 20) errors.summary = "too_short";
  if (!data.consent) errors.consent = "required";
  if (data.website) errors.form = "invalid";
  if (!data.startedAt || Date.now() - data.startedAt < 2500) errors.form = "too_fast";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
