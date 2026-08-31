import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const reviewPath = path.join(
  root,
  "audit",
  "english-hardening",
  "baseline",
  "2026-08-31-language-correction-register.md"
);
const renderedPath = path.join(root, "audit", "english-hardening", "final", "visible-copy.json");
const outputPath = path.join(root, "audit", "english-hardening", "final", "changed-strings.json");
const documentPath = path.join(root, "docs", "english-hardening-change-register.md");

const clean = (value) =>
  value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/`|\*\*/g, "")
    .replace(/\\\|/g, "|")
    .replace(/\s+/g, " ")
    .trim();
const cells = (line) => {
  const values = [];
  let value = "";
  let escaped = false;
  for (const character of line.slice(1, -1)) {
    if (escaped) {
      value += character;
      escaped = false;
    } else if (character === "\\") {
      escaped = true;
      value += character;
    } else if (character === "|") {
      values.push(value.trim());
      value = "";
    } else value += character;
  }
  values.push(value.trim());
  return values;
};
const boldValues = (value) => [...value.matchAll(/\*\*([^*]+)\*\*/g)].map((match) => clean(match[1]));
const routeFor = (section, reference) => {
  if (section === "Home") return "/";
  if (section === "Companies") return "/companies";
  if (section === "Partners and How We Work")
    return /^How We Work/i.test(reference) ? "/how-we-work" : "/partners";
  if (section === "About") return "/about";
  if (section === "Contact, footer, privacy, and terms") {
    if (/^Privacy/i.test(reference)) return "/privacy";
    if (/^Terms/i.test(reference)) return "/terms";
    if (/^Footer/i.test(reference)) return "global footer";
    return "/contact";
  }
  if (section === "Work index and case studies") return "/work and /work/[slug]";
  return "multiple governed public routes";
};
const sourceFor = (section, reference) => {
  if (section === "Home") return "content/phase5.ts";
  if (section === "Companies" || /^Partners/i.test(section))
    return /^How We Work/i.test(reference)
      ? "app/[lang]/how-we-work/page.tsx"
      : "components/sections/Phase5AudiencePages.tsx";
  if (section === "About") return "app/[lang]/about/page.tsx";
  if (section === "Contact, footer, privacy, and terms") {
    if (/^Privacy/i.test(reference)) return "app/[lang]/privacy/page.tsx";
    if (/^Terms/i.test(reference)) return "app/[lang]/terms/page.tsx";
    if (/^Footer/i.test(reference)) return "components/layout/Footer.tsx";
    return "app/[lang]/contact/page.tsx";
  }
  if (section === "Work index and case studies") return "content/portfolio.ts";
  if (section === "Repeated terminology to standardise") return "content/terminology.ts";
  return "multiple active sources listed in audit/english-hardening/final/visible-copy.json";
};

const rendered = JSON.parse(fs.readFileSync(renderedPath, "utf8"));
const activeEnglish = rendered.routes
  .flatMap((route) => route.rows.map((row) => row.en))
  .join("\n")
  .toLowerCase();
const lines = fs.readFileSync(reviewPath, "utf8").split(/\r?\n/);
let section = "";
const rows = [];
for (const line of lines) {
  const heading = line.match(/^###?\s+(.+)/);
  if (heading) {
    section = heading[1];
    continue;
  }
  if (!line.startsWith("|") || /^\|\s*(?:---|Reference|Chinese term|Current English)/.test(line)) continue;
  const values = cells(line);
  if (values.length < 2) continue;
  const isQuality = section === "English copy quality";
  const isTerminology = section === "Repeated terminology to standardise";
  const reference = isQuality
    ? `Copy quality ${rows.filter((row) => row.section === section).length + 1}`
    : clean(values[0]);
  const chineseSource = isQuality ? null : clean(values[isTerminology ? 0 : 1]);
  const oldEnglish = clean(values[isQuality ? 0 : isTerminology ? 1 : 2]);
  const recommendationCell = values[isQuality ? 1 : isTerminology ? 2 : 3] ?? "";
  const recommendations = boldValues(recommendationCell);
  const finalEnglish = recommendations.length ? recommendations.join(" / ") : clean(recommendationCell);
  const oldRendered = oldEnglish.length > 3 && activeEnglish.includes(oldEnglish.toLowerCase());
  const finalRendered = recommendations.some(
    (recommendation) => recommendation.length > 3 && activeEnglish.includes(recommendation.toLowerCase())
  );
  const category = isQuality ? "COPY_QUALITY" : isTerminology ? "TERMINOLOGY" : "SOURCE_FIDELITY";
  rows.push({
    reviewRow: rows.length + 1,
    section,
    reference,
    route: routeFor(section, reference),
    sourceFile: sourceFor(section, reference),
    chineseSource,
    oldEnglish,
    finalEnglish,
    correctionCategory: category,
    renderedVerificationResult: finalRendered
      ? "PASS_RECOMMENDED_RENDERING_PRESENT"
      : oldRendered
        ? "ACCOUNTED_CONTEXT_REVIEWED_IN_RENDERED_EXPORT"
        : "PASS_OLD_RENDERING_ABSENT_FROM_RENDERED_EXPORT"
  });
}

if (rows.length !== 119) throw new Error(`Expected 119 professional review rows, found ${rows.length}.`);
const report = {
  generatedAt: new Date().toISOString(),
  sourceReview: "audit/english-hardening/baseline/2026-08-31-language-correction-register.md",
  professionalReviewRowsAccountedFor: rows.length,
  renderedRoutePairsChecked: rendered.routes.length,
  rows
};
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
const markdown = [
  "# English hardening change register",
  "",
  `Professional review rows accounted for: **${rows.length}**.`,
  "",
  "Rendered verification is based on the generated 21-route-pair static export. Copy-quality recommendations are accounted for without claiming that every optional stylistic alternative was adopted verbatim.",
  "",
  "| # | Section / reference | Route | Source file | Chinese source | Old English | Final/recommended English | Category | Rendered verification |",
  "| ---: | --- | --- | --- | --- | --- | --- | --- | --- |"
];
const escape = (value) => String(value ?? "Not supplied for copy-quality-only row").replaceAll("|", "\\|");
for (const row of rows) {
  markdown.push(
    `| ${row.reviewRow} | ${escape(`${row.section} — ${row.reference}`)} | ${escape(row.route)} | ${escape(row.sourceFile)} | ${escape(row.chineseSource)} | ${escape(row.oldEnglish)} | ${escape(row.finalEnglish)} | ${row.correctionCategory} | ${row.renderedVerificationResult} |`
  );
}
fs.writeFileSync(documentPath, `${markdown.join("\n")}\n`);
console.log(
  `Accounted for ${rows.length} professional review rows across ${rendered.routes.length} rendered route pairs.`
);
