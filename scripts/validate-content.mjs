import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const casesSource = read("content/cases/index.ts");
const mediaSource = read("content/media.ts");
const homepageSource = read("app/[lang]/page.tsx");
const casePageSource = read("app/[lang]/work/[slug]/page.tsx");
const eventsSource = read("components/sections/experiences/EventsExhibitionsExperience.tsx");
const agencySource = read("components/sections/experiences/AgencySupportExperience.tsx");
const responsibilitiesSource = read("content/responsibilities.ts");
const termsSource = read("app/[lang]/terms/page.tsx");
const aboutSource = read("content/pages/about.ts");
const serviceProofSource = read("content/service-proof.ts");
const errors = [];

const slugMatches = [...casesSource.matchAll(/slug:\s*"([a-z0-9-]+)"/g)];
const records = slugMatches.map((match, index) =>
  casesSource.slice(match.index, slugMatches[index + 1]?.index)
);
const slugs = slugMatches.map((match) => match[1]);
const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
if (slugs.length !== 6) errors.push(`Expected six case records; found ${slugs.length}.`);
if (duplicateSlugs.length) errors.push(`Duplicate case slugs: ${[...new Set(duplicateSlugs)].join(", ")}.`);

const longFields = ["challenge", "objective", "outcome", "clientNeed", "frameBridgeRole", "visualDirection"];
const arrayFields = ["productionScope", "deliverables", "formats", "usageContext", "constraints"];
const fieldValue = (record, field) => {
  const match = record.match(new RegExp(`${field}:\\s*l\\(\\s*"([^"]+)"`));
  return match?.[1] || "";
};
const arrayValue = (record, field) => {
  const match = record.match(
    new RegExp(
      `${field}:\\s*\\[([\\s\\S]*?)\\],\\s*(?:formats|usageContext|constraints|location|market|visualDirection|cta|relatedIndustries)`
    )
  );
  return match?.[1].replace(/\s+/g, " ").trim() || "";
};
const duplicateValues = (values) => values.filter((value, index) => value && values.indexOf(value) !== index);

for (const [index, record] of records.entries()) {
  const slug = slugs[index];
  if (!record.includes('status: "concept"') && !casesSource.includes('status: "concept"'))
    errors.push(`${slug}: missing status.`);
  if (!record.includes('evidenceState: "unverified"') && !casesSource.includes('evidenceState: "unverified"'))
    errors.push(`${slug}: missing evidence state.`);
  for (const field of [...longFields, ...arrayFields])
    if (!fieldValue(record, field) && !arrayValue(record, field)) errors.push(`${slug}: missing ${field}.`);
  if (/\b(completed project|delivered for|client result|achieved)\b/i.test(record))
    errors.push(`${slug}: concept record uses completed-project language.`);
}
for (const field of longFields) {
  const duplicates = duplicateValues(records.map((record) => fieldValue(record, field)));
  if (duplicates.length)
    errors.push(`Duplicate long case field ${field}: ${[...new Set(duplicates)].join(" | ")}.`);
}
for (const field of arrayFields) {
  const duplicates = duplicateValues(records.map((record) => arrayValue(record, field)));
  if (duplicates.length) errors.push(`Repeated case ${field} array across records.`);
}

const illegalEvidence = [
  { status: "published", evidence: "unverified" },
  { status: "anonymised", evidence: "unverified" },
  { status: "published", evidence: "company-confirmed" },
  { status: "published", evidence: "unverified" }
];
for (const rule of illegalEvidence) {
  if (
    new RegExp(`status:\\s*"${rule.status}"[\\s\\S]{0,250}?evidenceState:\\s*"${rule.evidence}"`).test(
      casesSource
    ) &&
    !casesSource.includes("evidenceException")
  )
    errors.push(
      `${rule.status} cases require stronger evidence than ${rule.evidence}, unless an evidenceException is documented.`
    );
}
if (
  /disclosureLevel:\s*"named"[\s\S]{0,250}?evidenceState:\s*"unverified"/.test(casesSource) &&
  !casesSource.includes("evidenceException")
)
  errors.push(
    "Named cases require client-approved or publicly-verifiable evidence, unless an evidenceException is documented."
  );
if (!mediaSource.includes("CaseMediaId")) errors.push("Typed case media IDs missing.");
if (!mediaSource.includes("poster: string")) errors.push("Video poster requirement missing.");
if (!(mediaSource.match(/alt:/g) || []).length) errors.push("Media alt text missing.");
for (const file of [
  "case-study.svg",
  "video-placeholder.svg",
  "hero-cinematic.svg",
  "service-production.svg",
  "industry-editorial.svg"
]) {
  if (!fs.existsSync(path.join(root, "public/media/placeholders", file)))
    errors.push(`Missing local media file: ${file}.`);
}
if (homepageSource.includes("workPage") || homepageSource.includes("work.cases"))
  errors.push("Homepage must use canonical case records.");
if (!casePageSource.includes("Concept Project Model") || !casePageSource.includes("概念项目模式"))
  errors.push("Concept case metadata does not use the required disclosure terminology.");
for (const service of ["commercial", "talent", "research", "events", "agency"]) {
  if (!serviceProofSource.includes(`${service}: {`))
    errors.push(`Missing service-specific proof for ${service}.`);
}
for (const field of [
  "clientProblem",
  "capabilities",
  "deliverables",
  "dependencies",
  "approvals",
  "frameBridge",
  "client",
  "nextStep",
  "relatedModels"
]) {
  if (!serviceProofSource.includes(`${field}:`)) errors.push(`Service proof missing ${field}.`);
}
const vagueCaseTerms =
  /\b(high-quality|premium|seamless|compelling|engaging|impactful|end-to-end|bespoke|tailored|comprehensive|creative excellence|strong visual identity|professional execution)\b|高质量|高端|无缝|有吸引力|有影响力|一站式|定制化|全方位|专业执行|高级质感/i;
if (vagueCaseTerms.test(casesSource) || vagueCaseTerms.test(serviceProofSource))
  errors.push("Case or service proof uses a prohibited vague claim without operational detail.");
if (
  !responsibilitiesSource.includes("eventResponsibilityRows") ||
  !responsibilitiesSource.includes("agencyResponsibilityRows")
)
  errors.push("Explicit responsibility records missing.");
if (/index\s*%/.test(eventsSource) || /index\s*%/.test(agencySource))
  errors.push("Responsibility ownership must not derive from list indexes.");
if (/launch-readiness text|上线准备文本/.test(termsSource))
  errors.push("Public Terms contains an internal editorial marker.");
if (/require company confirmation|需经公司确认/.test(aboutSource))
  errors.push("Public About content contains an internal confirmation marker.");
if (process.env.VALIDATE_CONTENT_TEST_INJECT_VIOLATION) errors.push("Injected content-contract violation.");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Content validation passed: ${slugs.length} governed case records, distinct commercial fields, and public disclosure checks.`
);
