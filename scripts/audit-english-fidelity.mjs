import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const finalDirectory = path.join(root, "audit", "english-hardening", "final");
const visibleCopyPath = path.join(finalDirectory, "visible-copy.json");
const changedStringsPath = path.join(finalDirectory, "changed-strings.json");
const forbiddenResultsPath = path.join(finalDirectory, "forbidden-phrase-results.json");
const activePublicSources = [
  "app/[lang]/about/page.tsx",
  "app/[lang]/contact/page.tsx",
  "app/[lang]/how-we-work/page.tsx",
  "app/[lang]/privacy/page.tsx",
  "app/[lang]/terms/page.tsx",
  "app/[lang]/work/page.tsx",
  "components/globe/CrossBorderGlobe.tsx",
  "components/layout/Footer.tsx",
  "components/sections/AboutTeam.tsx",
  "components/sections/Phase5AudiencePages.tsx",
  "components/sections/PortfolioProjectDetail.tsx",
  "content/brand.ts",
  "content/company.ts",
  "content/phase5.ts",
  "content/portfolio.ts",
  "content/team.ts"
];
const metadataAndSchemaSources = [
  "lib/seo.ts",
  "lib/structured-data.ts",
  ...fs
    .readdirSync(path.join(root, "app", "[lang]"), { recursive: true })
    .filter((file) => /page\.tsx$/.test(file))
    .map((file) => path.join("app", "[lang]", file))
];
const activeTestSources = ["tests", "e2e"].flatMap((directory) =>
  fs
    .readdirSync(path.join(root, directory), { recursive: true })
    .filter((file) => /\.(?:mjs|ts|tsx)$/.test(file))
    .map((file) => path.join(directory, file))
);
const scopes = {
  activePublicContent: activePublicSources,
  metadataAndStructuredData: [...new Set(metadataAndSchemaSources)],
  currentOgText: ["audit/og-card-inventory.json"],
  activeTests: activeTestSources
};
const prohibited = [
  "service guarantee",
  "binding project agreement",
  "China-to-Europe translation",
  "Bilingual China-to-Europe communication",
  "rather than simply translating headquarters instructions",
  "London-side visual documentation",
  "exhibition and press context",
  "validate, enter and activate in the UK and Europe",
  "online delivery is configured",
  "commercial parameters",
  "Personal information is not placed in analytics attributes",
  "final controller details are required for production",
  "Final company details and an effective date",
  "Venus Bridge Media",
  "buyer meetings; opportunity framing",
  "live decisions",
  "immediate decisions",
  "One commercial lead",
  "European-facing asset set",
  "UK-facing visual record",
  "London recognition",
  "Editorial fashion evidence"
];
const requiredRendered = [
  "service commitment",
  "cooperation agreement",
  "agreed by both parties",
  "validate, enter and grow in the UK and Europe",
  "Bilingual Chinese–English communication",
  "China–Europe communication",
  "on-site visual documentation in London",
  "on-the-ground judgement",
  "real-time judgement",
  "official company details",
  "online submission",
  "commercial terms or conditions"
];

const report = JSON.parse(fs.readFileSync(visibleCopyPath, "utf8"));
const renderedEnglish = report.routes
  .flatMap((route) => route.rows.map((row) => row.en))
  .join("\n")
  .toLowerCase();
const failures = [];
const requiredResults = requiredRendered.map((phrase) => {
  const present = renderedEnglish.includes(phrase.toLowerCase());
  if (!present) failures.push(`Missing required rendered phrase: ${phrase}`);
  return { phrase, present };
});
const forbiddenResults = prohibited.map((phrase) => {
  const occurrences = [];
  for (const [scope, files] of Object.entries(scopes)) {
    for (const file of files) {
      const absolute = path.join(root, file);
      if (!fs.existsSync(absolute)) continue;
      if (fs.readFileSync(absolute, "utf8").toLowerCase().includes(phrase.toLowerCase())) {
        occurrences.push({ scope, file: file.replaceAll("\\", "/") });
      }
    }
  }
  if (occurrences.length) failures.push(`Prohibited phrase in active scope: ${phrase}`);
  return { phrase, pass: occurrences.length === 0, occurrences };
});
if (report.chineseSourceBaseline === "UNKNOWN") failures.push("CHINESE_SOURCE_BASELINE = UNKNOWN");
if (report.chineseSourceStatus === "CHANGED_UNRECORDED")
  failures.push(`Unrecorded Chinese source changes: ${report.unrecordedChineseSourceChanges.join(", ")}`);
for (const route of report.routes) {
  if (!route.pathParity) failures.push(`Visible element path mismatch: ${route.route}`);
}
const changedStrings = JSON.parse(fs.readFileSync(changedStringsPath, "utf8"));
if (changedStrings.professionalReviewRowsAccountedFor !== 119) {
  failures.push(
    `Expected 119 professional review rows, found ${changedStrings.professionalReviewRowsAccountedFor}.`
  );
}
fs.writeFileSync(
  forbiddenResultsPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      scopes,
      prohibitedPhraseCount: prohibited.length,
      requiredRenderedPhraseCount: requiredRendered.length,
      requiredRenderedResults: requiredResults,
      forbiddenPhraseResults: forbiddenResults,
      failures
    },
    null,
    2
  )}\n`
);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `English fidelity validation passed: ${requiredRendered.length} rendered requirements, ${prohibited.length} prohibited phrases and 119 professional review rows.`
);
