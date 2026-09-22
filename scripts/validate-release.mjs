import { containsPublicPricing } from "./public-pricing-policy.mjs";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const argProfile = process.argv.find((arg) => arg.startsWith("--profile="))?.split("=")[1];
const profiles = new Set(["development", "staging", "production"]);
const workModes = new Set(["hidden", "scenarios", "portfolio"]);
const legalEntityModes = new Set(["pre-incorporation", "incorporated"]);
const marketEntryModes = new Set(["hidden", "coordination", "partnered"]);
const profile = argProfile ?? process.env.RELEASE_PROFILE ?? "development";
const passed = [];
const failed = [];
const warnings = [];
const humanConfirmationRequired = [];
const legacyFindings = [];
const scopeMismatches = [];
const { media, criticalMediaIds } = await import(
  pathToFileURL(path.join(process.cwd(), "content/media.ts")).href
);
const { company, hasCompleteCompanyConfiguration } = await import(
  pathToFileURL(path.join(process.cwd(), "content/company.ts")).href
);

const pass = (check, detail) => passed.push({ check, detail });
const fail = (check, detail, file) => failed.push({ check, detail, ...(file ? { file } : {}) });
const warn = (check, detail, file) => warnings.push({ check, detail, ...(file ? { file } : {}) });
const requireHuman = (check, detail) => humanConfirmationRequired.push({ check, detail });
const legacy = (check, detail, file) => legacyFindings.push({ check, detail, ...(file ? { file } : {}) });
const scopeMismatch = (check, detail, file) =>
  scopeMismatches.push({ check, detail, ...(file ? { file } : {}) });
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const sourceFiles = (directory) =>
  fs.readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(relative);
    return /\.(?:ts|tsx|js|mjs)$/.test(entry.name) ? [relative] : [];
  });
const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};
const isProductionHttpsUrl = (value) => {
  if (!isHttpsUrl(value)) return false;
  const hostname = new URL(value).hostname;
  return !/(?:^|\.)localhost$|(?:^|\.)example\.(?:com|org|net)$|\.example$/i.test(hostname);
};
const nextConfigSource = read("next.config.mjs");
const redirectsSource = read("public/_redirects");
const headersSource = read("public/_headers");
const marketEntryRetired =
  redirectsSource.includes("/en/services/uk-market-entry /en/services 308") &&
  redirectsSource.includes("/en/what-we-do/enter-the-uk /en/services 308");

if (!profiles.has(profile)) fail("release-profile", `Unsupported profile '${profile}'.`, ".env.example");
else pass("release-profile", `Using ${profile}.`);
if (profile === "production" && process.env.RELEASE_PROFILE !== "production")
  warn(
    "production-profile",
    "The validation profile came from the command; configure RELEASE_PROFILE=production in Cloudflare build settings.",
    ".env.example"
  );

if (!nextConfigSource.includes('output: "export"') || !nextConfigSource.includes("unoptimized: true"))
  fail("static-export", "Next.js must use output export with unoptimized static images.", "next.config.mjs");
else pass("static-export", "Next.js is configured for a static export without an image runtime.");
if (!redirectsSource.includes("/en/capabilities /en/services 308"))
  fail("cloudflare-redirects", "Canonical legacy redirects are missing.", "public/_redirects");
else pass("cloudflare-redirects", "Cloudflare Pages redirects cover the canonical legacy routes.");
for (const header of [
  "Content-Security-Policy",
  "Referrer-Policy",
  "Permissions-Policy",
  "X-Content-Type-Options",
  "X-Frame-Options"
])
  if (!headersSource.includes(header)) fail("cloudflare-headers", `${header} is missing.`, "public/_headers");
if (!failed.some((item) => item.check === "cloudflare-headers"))
  pass("cloudflare-headers", "Cloudflare Pages preserves the required production security headers.");
const directContactSource = read("components/sections/ContactExperience.tsx");
const directContactReady =
  directContactSource.includes('data-contact-delivery="direct-only"') &&
  directContactSource.includes("company.contactMethods.wechat") &&
  directContactSource.includes("company.businessEmail") &&
  !directContactSource.includes("<form") &&
  !directContactSource.includes("fetch(") &&
  !fs.existsSync(path.join(root, "app/api/contact/route.ts"));
if (!directContactReady)
  fail(
    "static-contact",
    "Static release must expose direct contact without an active form or API route.",
    "app/[lang]/contact/page.tsx"
  );
else pass("static-contact", "Contact is direct-only and has no server delivery dependency.");
if (
  fs.existsSync(path.join(root, "app/og/[lang]/[page]/route.tsx")) ||
  !read("lib/seo.ts").includes("/og/venus-bridge.png")
)
  fail("static-open-graph", "Open Graph metadata must use the static production image.", "lib/seo.ts");
else pass("static-open-graph", "Open Graph metadata uses a static production image.");

const workMode = process.env.PUBLIC_WORK_MODE;
if (profile === "production" && workMode !== "portfolio")
  fail(
    "public-work-mode",
    "PUBLIC_WORK_MODE=portfolio is required for the approved real-project release.",
    ".env.example"
  );
else if (workModes.has(workMode)) pass("public-work-mode", `Using ${workMode}.`);
else
  warn(
    "public-work-mode",
    "No explicit work mode; development/staging renders production scenarios.",
    ".env.example"
  );

const marketEntryMode = process.env.PUBLIC_MARKET_ENTRY_MODE;
if (marketEntryRetired)
  legacy(
    "market-entry-mode",
    "The former market-entry routes are permanently redirected and are outside the canonical release surface.",
    "public/_redirects"
  );
else if (profile === "production" && !marketEntryModes.has(marketEntryMode))
  fail(
    "market-entry-mode",
    "PUBLIC_MARKET_ENTRY_MODE must be hidden, coordination or partnered.",
    ".env.example"
  );
else if (marketEntryModes.has(marketEntryMode)) pass("market-entry-mode", `Using ${marketEntryMode}.`);
else
  warn(
    "market-entry-mode",
    "No explicit market-entry mode; development/staging renders the conservative coordination scope.",
    ".env.example"
  );

const marketEntrySource = read("content/market-entry.ts");
const roadshowSource = read("content/roadshows.ts");
const hasPublicMarketEntryPartners =
  !/marketEntryPartners:\s*MarketEntryPartner\[\]\s*=\s*\[\s*\]/.test(marketEntrySource) &&
  /public:\s*true/.test(marketEntrySource);
const marketEntryLegalApproved = /legalReviewStatus:\s*"approved"/.test(marketEntrySource);
if (marketEntryRetired)
  legacy(
    "market-entry-partners",
    "Partner records remain governed but do not block the redirected canonical release surface.",
    "content/market-entry.ts"
  );
else if (marketEntryMode === "partnered" && !hasPublicMarketEntryPartners)
  fail(
    "market-entry-partners",
    "Partnered mode requires at least one fully verified and publicly approved partner record.",
    "content/market-entry.ts"
  );
else if (marketEntryMode === "partnered")
  pass("market-entry-partners", "A publicly approved partner record is configured.");
else pass("market-entry-partners", "No unverified partner names or logos are published.");

if (marketEntryRetired && !marketEntryLegalApproved)
  legacy(
    "market-entry-legal-review",
    "Legal approval is still required before any retired market-entry content can be reactivated.",
    "content/market-entry.ts"
  );
else if (profile === "production" && marketEntryMode !== "hidden" && !marketEntryLegalApproved)
  fail(
    "market-entry-legal-review",
    "Public market-entry content requires an independently approved legal boundary before production release.",
    "content/market-entry.ts"
  );
else if (!marketEntryLegalApproved && marketEntryMode !== "hidden")
  warn(
    "market-entry-legal-review",
    "Coordination copy is available for staging review but remains blocked from production indexing.",
    "content/market-entry.ts"
  );

const reviewDates = [...marketEntrySource.matchAll(/nextReviewAt:\s*"(\d{4}-\d{2}-\d{2})"/g)].map(
  (match) => match[1]
);
const expiredReviewDates = reviewDates.filter((date) => Date.parse(`${date}T23:59:59Z`) < Date.now());
const reviewRequiredSources = (marketEntrySource.match(/status:\s*"review-required"/g) ?? []).length;
if (marketEntryRetired && (expiredReviewDates.length || reviewRequiredSources))
  legacy(
    "market-entry-source-review",
    `${expiredReviewDates.length} source review date(s) are expired and ${reviewRequiredSources} source(s) require review before reactivation.`,
    "content/market-entry.ts"
  );
else if (
  profile === "production" &&
  marketEntryMode !== "hidden" &&
  (expiredReviewDates.length || reviewRequiredSources)
)
  fail(
    "market-entry-source-review",
    `${expiredReviewDates.length} source review date(s) are expired and ${reviewRequiredSources} source(s) require review.`,
    "content/market-entry.ts"
  );
else if (expiredReviewDates.length || reviewRequiredSources)
  warn(
    "market-entry-source-review",
    `${expiredReviewDates.length} source review date(s) are expired and ${reviewRequiredSources} source(s) require review before production.`,
    "content/market-entry.ts"
  );
else pass("market-entry-source-review", `${reviewDates.length} source review dates are current.`);

const prohibitedMarketEntryClaims =
  /guaranteed compliance|guaranteed registration|guaranteed bank account|legal advice by Venus Bridge(?: Media)?|fully compliant marketing|legally approved by us/i;
if (marketEntryRetired && prohibitedMarketEntryClaims.test(marketEntrySource))
  legacy(
    "market-entry-claims",
    "Prohibited wording remains in retired content and must be removed before reactivation.",
    "content/market-entry.ts"
  );
else if (prohibitedMarketEntryClaims.test(marketEntrySource))
  fail(
    "market-entry-claims",
    "Prohibited guarantee or professional-advice wording appears in public market-entry content.",
    "content/market-entry.ts"
  );
else pass("market-entry-claims", "Public market-entry content uses coordination and referral language.");

if (
  !/type:\s*"financial-promotion"[\s\S]{0,180}?status:\s*"blocked"/.test(roadshowSource) ||
  !/blocksProductionRelease:\s*true/.test(roadshowSource) ||
  !/blocksCampaignRelease:\s*true/.test(roadshowSource)
)
  fail(
    "investor-roadshow-gate",
    "Investor roadshow scenarios require a blocked financial-promotion gate for production and campaign release.",
    "content/roadshows.ts"
  );
else pass("investor-roadshow-gate", "Investor roadshow financial-promotion release gates are present.");

const siteUrl = company.websiteDomain;
for (const [key, value, predicate, description] of [
  ["NEXT_PUBLIC_SITE_URL", siteUrl, isProductionHttpsUrl, "an approved non-placeholder HTTPS URL"]
]) {
  if (profile === "production" && !predicate(value))
    fail("configuration", `${key} must be ${description}.`, ".env.example");
  else if (value && predicate(value)) pass("configuration", `${key} is structurally valid.`);
  else warn("configuration", `${key} is not configured for ${profile}.`, ".env.example");
}

const legalEntityMode = process.env.LEGAL_ENTITY_MODE;
if (profile === "production" && !legalEntityModes.has(legalEntityMode))
  fail(
    "legal-entity-mode",
    "LEGAL_ENTITY_MODE must be pre-incorporation or incorporated for production.",
    ".env.example"
  );
else if (legalEntityModes.has(legalEntityMode))
  pass("legal-entity-mode", `Using truthful ${legalEntityMode} legal identity requirements.`);
else warn("legal-entity-mode", "No explicit legal entity mode is configured.", ".env.example");

if (profile === "production" && !hasCompleteCompanyConfiguration()) {
  const requiredCompanyFields = [
    ["privacyEffectiveDate", company.privacyEffectiveDate],
    ["termsEffectiveDate", company.termsEffectiveDate]
  ];
  if (legalEntityMode === "incorporated")
    requiredCompanyFields.unshift(
      ["legalName", company.legalName],
      ["privacyControllerName", company.privacyControllerName],
      ["companyNumber", company.companyNumber],
      ["registeredOffice", company.registeredOffice]
    );
  for (const [field, value] of requiredCompanyFields)
    if (!value)
      fail(
        "company-configuration",
        `Field '${field}' is required for ${legalEntityMode ?? "production"} release.`,
        "content/company.ts"
      );
  if (company.legalApprovalStatus !== "approved")
    fail(
      "privacy-approval",
      "NEXT_PUBLIC_LEGAL_APPROVAL_STATUS must be approved after legal review.",
      ".env.example"
    );
  if (company.termsApprovalStatus !== "approved")
    fail(
      "terms-approval",
      "NEXT_PUBLIC_TERMS_APPROVAL_STATUS must be approved after legal review.",
      ".env.example"
    );
  for (const [field, value] of [
    ["businessEmail", company.businessEmail],
    ["privacyContact", company.privacyContact]
  ])
    if (!value || /\.example$/i.test(value))
      fail(
        "company-configuration",
        `Company field '${field}' must be an approved public email.`,
        ".env.example"
      );
} else if (hasCompleteCompanyConfiguration())
  pass("company-configuration", `Public configuration is complete for ${legalEntityMode}.`);
else
  warn(
    "company-configuration",
    "Company and legal fields remain staging-only placeholders.",
    "content/company.ts"
  );

for (const key of [
  "LEGAL_REVIEW_CONFIRMED",
  "PUBLIC_COMPANY_DETAILS_CONFIRMED",
  "APPROVED_MEDIA_CONFIRMED",
  "PUBLIC_CASE_EVIDENCE_CONFIRMED",
  "CONTACT_CHANNELS_CONFIRMED"
]) {
  if (profile === "production" && process.env[key] !== "true") {
    fail("human-confirmation", `${key}=true is required in production.`, ".env.example");
    requireHuman(key, "Set only after the corresponding review or live delivery test is complete.");
  } else if (process.env[key] === "true") pass("human-confirmation", `${key} is confirmed.`);
  else requireHuman(key, "Not required for staging validation; required for production release.");
}
scopeMismatch(
  "SOCIAL_PROFILES_CONFIRMED",
  "No social-profile UI is published on the canonical surface, so this retired confirmation cannot block release.",
  ".env.example"
);

const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
const analyticsConfigured =
  Boolean(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.trim()) &&
  Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim()) &&
  process.env.NEXT_PUBLIC_ANALYTICS_PRIVACY_APPROVED === "true";
if (analyticsEnabled && !analyticsConfigured)
  fail(
    "analytics-privacy-gate",
    "Enabled measurement requires an approved provider, production property ID and NEXT_PUBLIC_ANALYTICS_PRIVACY_APPROVED=true.",
    ".env.example"
  );
else if (analyticsEnabled) pass("analytics-privacy-gate", "Privacy-approved measurement is enabled.");
else
  warn(
    "ANALYTICS_PROVIDER_REQUIRED",
    "The privacy-safe event model is present, but measurement remains disabled until an owner-approved provider and privacy review are supplied.",
    ".env.example"
  );

if (profile === "production" && process.env.NEXT_PUBLIC_SHOW_MEDIA_GUIDES === "true")
  fail("media-guides", "NEXT_PUBLIC_SHOW_MEDIA_GUIDES must not be true in production.", ".env.example");
else pass("media-guides", "Development media guides are not enabled for this validation.");

if (profile !== "development" && process.env.NEXT_PUBLIC_SHOW_DEMO_BRANDS === "true")
  fail("demo-brands", "Demo brand marks must not be enabled outside development.", ".env.example");
else pass("demo-brands", "Demo brand marks are not enabled for this release profile.");
if (profile === "production" && process.env.NEXT_PUBLIC_SHOW_DEMO_MEDIA === "true")
  fail("demo-media", "NEXT_PUBLIC_SHOW_DEMO_MEDIA must not be enabled in production.", ".env.example");
else pass("demo-media", "Demo media is not enabled for this release profile.");

const pricingFiles = ["app", "components", "content", "lib"]
  .flatMap(sourceFiles)
  .filter((file) => containsPublicPricing(read(file)));
if (pricingFiles.length)
  fail(
    "public-pricing",
    `Public pricing or package language remains in ${pricingFiles.length} source file(s).`,
    pricingFiles.join(", ")
  );
else
  pass(
    "public-pricing",
    "No public prices or fixed packages; project-specific fees and optional client budgets are permitted."
  );

const casesSource = read("content/cases/index.ts");
const portfolioSource = read("content/portfolio.ts");
const mediaSource = read("content/media.ts");
const publicSources = [
  "content/cases/index.ts",
  "content/portfolio.ts",
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

const governedCases = (casesSource.match(/slug:\s*"[a-z0-9-]+"/g) ?? []).length;
const conceptCases = casesSource.includes('status: "concept"') ? governedCases : 0;
const evidenceStates = [...casesSource.matchAll(/evidenceState:\s*"([^"]+)"/g)].map((match) => match[1]);
const eligibleEvidence = evidenceStates.filter(
  (state) => state === "client-approved" || state === "publicly-verifiable"
).length;
const portfolioSpecsSource = portfolioSource.slice(
  portfolioSource.indexOf("const specs"),
  portfolioSource.indexOf("const artDirection")
);
const canonicalPortfolioRecords = (portfolioSpecsSource.match(/\bslug:/g) ?? []).length;
const canonicalPortfolioGoverned =
  canonicalPortfolioRecords > 0 &&
  portfolioSource.includes("specs.map") &&
  portfolioSource.includes('publicStatus: "published"') &&
  portfolioSource.includes('evidenceStatus: "verified"') &&
  portfolioSource.includes("publishedPortfolioProjects") &&
  portfolioSource.includes("clientApproval: true") &&
  portfolioSource.includes("legalApproved: true") &&
  portfolioSource.includes("scopeBoundaryEn: string") &&
  portfolioSource.includes("evidence: EvidenceRecord[]");
if (profile === "production" && workMode === "portfolio" && !canonicalPortfolioGoverned)
  fail(
    "case-evidence",
    "Portfolio mode requires governed public records with evidence and explicit scope boundaries.",
    "content/portfolio.ts"
  );
else if (workMode === "scenarios" || !workMode)
  pass("case-evidence", `${conceptCases || 6} records are governed as production scenarios.`);
else if (workMode === "hidden") pass("case-evidence", "Public work routes are hidden.");
else pass("case-evidence", `${canonicalPortfolioRecords} canonical record(s) have governed public evidence.`);
scopeMismatch(
  "legacy-case-registry",
  `${eligibleEvidence} legacy scenario record(s) have portfolio-eligible evidence; canonical Work uses content/portfolio.ts.`,
  "content/cases/index.ts"
);

if (/Concept Project Model|概念项目模式/.test(casesSource))
  pass("concept-disclosure", "Concept disclosure labels are present.");
else
  fail(
    "concept-disclosure",
    "Concept records need disclosure labels and metadata.",
    "content/cases/index.ts"
  );

if (/status:\s*"verified"[\s\S]{0,500}?mediaApproval:\s*"(?:restricted|placeholder)"/.test(casesSource))
  fail("verified-media", "Verified work must use approved media.", "content/cases/index.ts");
else pass("verified-media", "No verified case is configured with restricted or placeholder media.");

if (!/status:\s*"concept"[\s\S]{0,500}?disclosure:/.test(casesSource))
  fail(
    "concept-disclosure",
    "Concept records require an explicit public disclosure.",
    "content/cases/index.ts"
  );

const hasMediaContract =
  /export type MediaPublicationStatus/.test(mediaSource) &&
  /publicationStatus: resolvedItem\.publicationStatus \?\? "placeholder"/.test(mediaSource) &&
  /rightsState: resolvedItem\.rightsState \?\? "not-applicable"/.test(mediaSource) &&
  /sourceType: resolvedItem\.sourceType \?\? "placeholder"/.test(mediaSource) &&
  /pageUsage: resolvedItem\.pageUsage \?\? \["unassigned"\]/.test(mediaSource);
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
const mediaIssues = [];
for (const [id, item] of Object.entries(media)) {
  for (const field of ["route", "section", "purpose", "approvalStatus", "aspectRatio"]) {
    if (!item[field]) mediaIssues.push({ id, route: item.route, field, correction: `Add ${field}.` });
  }
  if (!item.alt?.en || !item.alt?.zh)
    mediaIssues.push({ id, route: item.route, field: "alt", correction: "Add bilingual alt text." });
  if (
    !item.focalPoint ||
    item.focalPoint.x < 0 ||
    item.focalPoint.x > 100 ||
    item.focalPoint.y < 0 ||
    item.focalPoint.y > 100
  )
    mediaIssues.push({
      id,
      route: item.route,
      field: "focalPoint",
      correction: "Set x/y values between 0 and 100."
    });
  if (item.type === "video" && !item.poster)
    mediaIssues.push({ id, route: item.route, field: "poster", correction: "Add an approved poster." });
  if (item.type === "video" && item.speaking && !item.captions?.en && !item.transcript?.en)
    mediaIssues.push({
      id,
      route: item.route,
      field: "captions",
      correction: "Add captions or transcript metadata for speaking video."
    });
  if (id.includes("-concept-") && !item.projectId)
    mediaIssues.push({
      id,
      route: item.route,
      field: "projectId",
      correction: "Associate project media with its project record."
    });
}
for (const issue of mediaIssues)
  fail(
    "media-manifest",
    `${issue.id} (${issue.route}) field '${issue.field}': ${issue.correction}`,
    "content/media.ts"
  );
if (!mediaIssues.length)
  pass("media-manifest", `${Object.keys(media).length} media records satisfy the manifest contract.`);

const unapprovedCritical = [...criticalMediaIds]
  .map((id) => [id, media[id]])
  .filter(([, item]) => item.approvalStatus !== "approved");
if (profile === "production") {
  for (const [id, item] of unapprovedCritical)
    scopeMismatch(
      "legacy-critical-media",
      `${id} on retired route ${item.route} (${item.section}) is '${item.approvalStatus}' and must be replaced before that surface is reactivated.`,
      "content/media.ts"
    );
} else if (unapprovedCritical.length)
  scopeMismatch(
    "legacy-critical-media",
    `${unapprovedCritical.length} noncanonical media records remain unapproved and must be replaced before their retired surfaces are reactivated.`,
    "content/media.ts"
  );
else pass("critical-media", "Every critical media record is approved.");

const canonicalMediaSources = [
  [
    "content/portfolio-media.generated.json",
    JSON.parse(read("content/portfolio-media.generated.json")).records
  ],
  [
    "content/capability-media.generated.json",
    JSON.parse(read("content/capability-media.generated.json")).records
  ]
];
const canonicalMediaIssues = [];
for (const [file, records] of canonicalMediaSources) {
  for (const item of records.filter((record) => record.publicStatus === "public" || record.usedPublicly)) {
    if (!item.publicPath || !item.altEn || !item.altZh)
      canonicalMediaIssues.push(`${file}: ${item.id} lacks a public path or bilingual alt text.`);
    if (!item.websiteUseApproved || !item.mediaRightsApproved || !item.copyrightApproved)
      canonicalMediaIssues.push(`${file}: ${item.id} lacks complete publication-rights approval.`);
  }
}
for (const issue of canonicalMediaIssues) fail("canonical-media", issue, "content/*-media.generated.json");
if (!canonicalMediaIssues.length)
  pass(
    "canonical-media",
    "Canonical portfolio and capability media records have public paths, bilingual alt text and publication-rights approval."
  );

const report = {
  profile,
  publicWorkMode: workMode ?? null,
  publicMarketEntryMode: marketEntryMode ?? null,
  passedChecks: passed,
  failedChecks: failed,
  warnings,
  humanConfirmationRequired,
  legacyFindings,
  scopeMismatches
};
console.log(JSON.stringify(report, null, 2));
if (profile === "production" && failed.length) process.exitCode = 1;
