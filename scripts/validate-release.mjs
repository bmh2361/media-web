import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const argProfile = process.argv.find((arg) => arg.startsWith("--profile="))?.split("=")[1];
const profiles = new Set(["development", "staging", "production"]);
const workModes = new Set(["concept-models", "portfolio"]);
const profile = argProfile ?? process.env.RELEASE_PROFILE ?? "development";
const passed = [];
const failed = [];
const warnings = [];
const humanConfirmationRequired = [];

const pass = (check, detail) => passed.push({ check, detail });
const fail = (check, detail, file) => failed.push({ check, detail, ...(file ? { file } : {}) });
const warn = (check, detail, file) => warnings.push({ check, detail, ...(file ? { file } : {}) });
const requireHuman = (check, detail) => humanConfirmationRequired.push({ check, detail });
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};
const isHttpsOrigin = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.origin === value.replace(/\/$/, "");
  } catch {
    return false;
  }
};

if (!profiles.has(profile)) fail("release-profile", `Unsupported profile '${profile}'.`, ".env.example");
else pass("release-profile", `Using ${profile}.`);

const workMode = process.env.PUBLIC_WORK_MODE;
if (profile === "production" && !workModes.has(workMode))
  fail("public-work-mode", "PUBLIC_WORK_MODE must be concept-models or portfolio.", ".env.example");
else if (workModes.has(workMode)) pass("public-work-mode", `Using ${workMode}.`);
else
  warn(
    "public-work-mode",
    "No explicit work mode; development/staging renders concept models.",
    ".env.example"
  );

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const webhook = process.env.CONTACT_WEBHOOK_URL;
const origins = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
for (const [key, value, predicate, description] of [
  ["NEXT_PUBLIC_SITE_URL", siteUrl, isHttpsUrl, "an absolute HTTPS URL"],
  ["CONTACT_WEBHOOK_URL", webhook, isHttpsUrl, "an absolute HTTPS URL"]
]) {
  if (profile === "production" && !predicate(value))
    fail("configuration", `${key} must be ${description}.`, ".env.example");
  else if (value && predicate(value)) pass("configuration", `${key} is structurally valid.`);
  else warn("configuration", `${key} is not configured for ${profile}.`, ".env.example");
}

if (profile === "production") {
  if (!origins.length)
    fail(
      "contact-origins",
      "CONTACT_ALLOWED_ORIGINS must contain one or more HTTPS origins.",
      ".env.example"
    );
  else if (origins.some((origin) => !isHttpsOrigin(origin) || new URL(origin).hostname === "localhost"))
    fail(
      "contact-origins",
      "Every production contact origin must be an HTTPS non-localhost origin.",
      ".env.example"
    );
  else pass("contact-origins", `${origins.length} HTTPS production origin(s) configured.`);
} else if (!origins.length)
  warn("contact-origins", "No contact origins configured outside production.", ".env.example");

for (const key of [
  "LEGAL_REVIEW_CONFIRMED",
  "PUBLIC_COMPANY_DETAILS_CONFIRMED",
  "CONTACT_DELIVERY_VERIFIED"
]) {
  if (profile === "production" && process.env[key] !== "true") {
    fail("human-confirmation", `${key}=true is required in production.`, ".env.example");
    requireHuman(key, "Set only after the corresponding review or live delivery test is complete.");
  } else if (process.env[key] === "true") pass("human-confirmation", `${key} is confirmed.`);
  else requireHuman(key, "Not required for staging validation; required for production release.");
}

if (profile === "production" && process.env.NEXT_PUBLIC_SHOW_MEDIA_GUIDES === "true")
  fail("media-guides", "NEXT_PUBLIC_SHOW_MEDIA_GUIDES must not be true in production.", ".env.example");
else pass("media-guides", "Development media guides are not enabled for this validation.");

const casesSource = read("content/cases/index.ts");
const mediaSource = read("content/media.ts");
const publicSources = [
  "content/cases/index.ts",
  "content/pages/industries.ts",
  "content/pages/work.ts",
  "content/service-proof.ts",
  "content/brand.ts"
];
const publicMarkers =
  /TODO|FIXME|needs confirmation|requires review|before launch|add later|placeholder copy|dummy content|待确认|待补充|上线前审阅|后续添加|占位文案|内部备注/i;
for (const file of publicSources) {
  if (publicMarkers.test(read(file)))
    fail("public-content", "Internal editorial marker found in public content record.", file);
}
if (!failed.some((item) => item.check === "public-content"))
  pass("public-content", "No prohibited editorial markers in checked public content records.");

const conceptCases = (casesSource.match(/status:\s*"concept"/g) ?? []).length;
const evidenceStates = [...casesSource.matchAll(/evidenceState:\s*"([^"]+)"/g)].map((match) => match[1]);
const eligibleEvidence = evidenceStates.filter(
  (state) => state === "client-approved" || state === "publicly-verifiable"
).length;
if (profile === "production" && workMode === "portfolio" && eligibleEvidence === 0)
  fail(
    "case-evidence",
    "Portfolio mode requires at least one published or anonymised case with eligible evidence.",
    "content/cases/index.ts"
  );
else if (workMode === "concept-models" || !workMode)
  pass("case-evidence", `${conceptCases || 6} concept model record(s) remain disclosed as illustrative.`);
else pass("case-evidence", `${eligibleEvidence} record(s) have portfolio-eligible evidence.`);

if (/Concept Project Model|概念项目模式/.test(casesSource))
  pass("concept-disclosure", "Concept disclosure labels are present.");
else
  fail(
    "concept-disclosure",
    "Concept records need disclosure labels and metadata.",
    "content/cases/index.ts"
  );

const hasMediaContract =
  /export type MediaPublicationStatus/.test(mediaSource) &&
  /publicationStatus: item\.publicationStatus \?\? "placeholder"/.test(mediaSource) &&
  /rightsState: item\.rightsState \?\? "not-applicable"/.test(mediaSource) &&
  /sourceType: item\.sourceType \?\? "placeholder"/.test(mediaSource) &&
  /pageUsage: item\.pageUsage \?\? \["unassigned"\]/.test(mediaSource);
if (!hasMediaContract)
  fail(
    "media-publication",
    "Every active media record must normalize publication, rights, source, and page usage metadata.",
    "content/media.ts"
  );
else
  pass(
    "media-publication",
    "Every active media record normalizes publication, rights, source, and page usage metadata."
  );
const criticalSection =
  mediaSource.match(/const criticalMediaIds = new Set<MediaId>\(\[([\s\S]*?)\]\);/)?.[1] ?? "";
const criticalPlaceholders = (criticalSection.match(/"/g) ?? []).length / 2;
if (profile === "production" && criticalPlaceholders)
  fail(
    "critical-media",
    `${criticalPlaceholders} critical public media record(s) are still placeholders.`,
    "content/media.ts"
  );
else if (criticalPlaceholders)
  warn(
    "critical-media",
    `${criticalPlaceholders} critical placeholder record(s) are allowed only outside production.`,
    "content/media.ts"
  );
else pass("critical-media", "No critical placeholder media detected.");

const report = {
  profile,
  publicWorkMode: workMode ?? null,
  passedChecks: passed,
  failedChecks: failed,
  warnings,
  humanConfirmationRequired
};
console.log(JSON.stringify(report, null, 2));
if (profile === "production" && failed.length) process.exitCode = 1;
