import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const read = (path) => fs.readFileSync(path, "utf8");
const source = read("content/portfolio.ts");
const exports = {};
vm.runInNewContext(
  ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }
  }).outputText,
  {
    exports,
    require: (path) => {
      assert.equal(path, "@/content/portfolio-media.generated.json");
      return JSON.parse(read("content/portfolio-media.generated.json"));
    }
  }
);
const projects = exports.publishedPortfolioProjects;
const corporate = [
  "byd-bd11-london",
  "changan-europe-launch-2025",
  "geely-london-brand-launch",
  "catl-open-day-2025",
  "leapmotor-iaa-2023",
  "agibot-london-launch"
];

test("twelve bilingual narratives preserve publication gates and put corporate cases first", () => {
  assert.equal(projects.length, 12);
  assert.deepEqual(
    Array.from(projects.slice(0, 6), (p) => p.slug),
    corporate
  );
  for (const p of projects) {
    for (const lang of ["En", "Zh"]) {
      for (const field of ["context", "projectChallenge", "roleStatement", "execution", "projectValue"])
        assert.ok(p[field + lang]?.trim(), `${p.slug}: ${field}${lang}`);
      assert.equal(p["continuedValue" + lang].length, 1);
    }
    assert.ok(p.websiteUseApproved && p.mediaRightsApproved && p.copyrightApproved && p.legalApproved);
    assert.ok(projects.some((next) => next.slug === exports.getNextPortfolioProject(p).slug));
  }
  for (const field of ["contextEn", "contextZh", "projectChallengeEn", "projectChallengeZh"])
    assert.equal(new Set(projects.slice(0, 6).map((p) => p[field])).size, 6);
});

test("roles remain production contributions; value never becomes an invented measured outcome", () => {
  const allowed = new Set([
    "visual-documentation",
    "content-production",
    "editorial-selection",
    "local-production",
    "location-coordination"
  ]);
  for (const p of projects) {
    assert.ok(p.scope.every((scope) => allowed.has(scope)));
    if (p.slug !== "london-automotive-brand-film") assert.ok(!p.scope.includes("location-coordination"));
    const copy = [
      p.projectValueEn,
      p.projectValueZh,
      p.executionEn,
      p.executionZh,
      ...p.continuedValueEn,
      ...p.continuedValueZh
    ].join(" ");
    assert.doesNotMatch(copy, /\d+\s*(?:%|leads|orders|sales|张|线索|订单)/i);
    assert.doesNotMatch(copy, /(?:we|our team) (?:curated|organised|hosted|secured|brokered)/i);
    assert.equal(p.observedOutcomes, undefined);
  }
  const detail = read("components/sections/PortfolioProjectDetail.tsx");
  assert.doesNotMatch(detail, /media\.length|caseChallenge\(|Outputs \/ Outcomes/);
  assert.match(detail, /Potential use/);
  assert.match(detail, /Selected team experience/);
  assert.match(detail, /\/contact\?intent=company/);
});

test("event identity, series boundaries and cultural taxonomy remain explicit", () => {
  const changan = projects.find((p) => p.slug === "changan-europe-launch-2025");
  assert.equal(changan.location, "Mainz, Germany");
  assert.equal(changan.sortDate, "2025-03-21");
  for (const file of [
    "content/media/presentation-profiles.json",
    "content/media/image-selection-scores.json",
    "scripts/import-portfolio-media.mjs"
  ])
    assert.doesNotMatch(read(file), /Changan[^\n]*Munich|慕尼黑长安/);
  assert.doesNotMatch(
    [changan.titleEn, changan.contextEn, changan.roleStatementEn, ...changan.media.map((m) => m.altEn)].join(
      " "
    ),
    /Munich|IAA/
  );
  for (const slug of ["beauty-fashion-brand-content", "european-road-lifestyle"])
    assert.equal(projects.find((p) => p.slug === slug).contentType, "portfolio-series");
  assert.doesNotMatch(
    projects.find((p) => p.slug === "european-road-lifestyle").titleEn,
    /Programme|Campaign/
  );
  assert.equal(
    exports.commercialCaseCategories["institutional-talent"].en,
    "Culture, Talent & Brand Experiences"
  );
  const fashion = projects.find((p) => p.slug === "london-fashion-week-2025");
  assert.match(fashion.titleEn, /Editorial Portraits/);
  assert.match(
    projects.find((p) => p.slug === "london-automotive-brand-film").roleStatementEn,
    /Selected team experience in UK location coordination/
  );
});
