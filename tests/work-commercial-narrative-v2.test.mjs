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
      for (const field of [
        "title",
        "eventName",
        "context",
        "commercialObjective",
        "participationSummary",
        "roleStatement",
        "execution"
      ])
        assert.ok(p[field + lang]?.trim(), `${p.slug}: ${field}${lang}`);
      assert.equal(p["continuedValue" + lang], undefined);
      assert.equal(p["projectValue" + lang], undefined);
      assert.notEqual(p["participationSummary" + lang], p["roleStatement" + lang]);
      assert.ok(p["participationSummary" + lang].length < (lang === "En" ? 130 : 55));
    }
    assert.ok(p.websiteUseApproved && p.mediaRightsApproved && p.copyrightApproved && p.legalApproved);
    assert.ok(projects.some((next) => next.slug === exports.getNextPortfolioProject(p).slug));
  }
  for (const field of ["contextEn", "contextZh", "commercialObjectiveEn", "commercialObjectiveZh"])
    assert.equal(new Set(projects.slice(0, 6).map((p) => p[field])).size, 6);
});

test("existing scopes stay case-specific and public copy separates contribution from future services", () => {
  // These twelve historic scopes require project-specific confirmation and sources
  // before expansion. This fixture does not constrain future projects globally.
  const baselineScopes = {
    "byd-bd11-london": ["visual-documentation", "content-production"],
    "changan-europe-launch-2025": ["visual-documentation", "content-production"],
    "geely-london-brand-launch": ["visual-documentation", "content-production"],
    "catl-open-day-2025": ["visual-documentation", "content-production"],
    "leapmotor-iaa-2023": ["visual-documentation", "content-production"],
    "agibot-london-launch": ["visual-documentation", "content-production"],
    "london-automotive-brand-film": ["location-coordination", "local-production", "content-production"],
    "wang-linkai-london-concert": ["visual-documentation", "editorial-selection"],
    "yue-yunpeng-london-live": ["visual-documentation"],
    "london-fashion-week-2025": ["content-production", "editorial-selection"],
    "beauty-fashion-brand-content": ["content-production", "editorial-selection"],
    "european-road-lifestyle": ["content-production", "editorial-selection"]
  };
  for (const [slug, expected] of Object.entries(baselineScopes)) {
    const p = projects.find((item) => item.slug === slug);
    assert.deepEqual(Array.from(p.scope), expected, slug);
    const copy = [
      p.commercialObjectiveEn,
      p.commercialObjectiveZh,
      p.contextEn,
      p.contextZh,
      p.roleStatementEn,
      p.roleStatementZh,
      p.executionEn,
      p.executionZh
    ].join(" ");
    assert.doesNotMatch(copy, /\d+\s*(?:%|leads|orders|sales|张|线索|订单)/i);
    assert.doesNotMatch(copy, /(?:we|our team) (?:curated|organised|hosted|secured|brokered)/i);
    assert.doesNotMatch(copy, /不作主张|未经核实|不主张|公开记录仅支持|购买需求的验证|将于2025/);
    assert.equal(p.observedOutcomes, undefined);
    for (const gate of [
      "websiteUseApproved",
      "mediaRightsApproved",
      "copyrightApproved",
      "clientApproval",
      "legalApproved"
    ])
      assert.equal(exports.isPublishedPortfolioProject({ ...p, [gate]: false }), false, `${slug}: ${gate}`);
  }
  const detail = read("components/sections/PortfolioProjectDetail.tsx");
  assert.doesNotMatch(
    detail,
    /media\.length|caseChallenge\(|Potential use|Relevance to Future Projects|projectValue|continuedValue|capabilities.map/
  );
  assert.match(detail, /Selected team experience/);
  assert.match(detail, /Independent works/);
  assert.match(detail, /Responsibilities, collaborators and deliverables are agreed for the new project/);
  assert.match(detail, /\/contact\?intent=company/);
  assert.equal((detail.match(/project\.roleStatementEn/g) ?? []).length, 1);
  for (const file of [
    "components/sections/CommercialCaseIndex.tsx",
    "app/[lang]/work/[slug]/page.tsx",
    "components/sections/Phase5Homepage.tsx"
  ]) {
    assert.match(read(file), /participationSummaryEn/);
    assert.doesNotMatch(read(file), /roleStatement|projectValue|continuedValue/);
  }
});

test("titles, event names and genuine dates have distinct purposes", () => {
  const expected = [
    "BYD BD11｜伦敦产品发布",
    "长安汽车｜欧洲品牌发布",
    "吉利汽车｜英国品牌发布",
    "宁德时代｜慕尼黑技术发布",
    "零跑汽车｜IAA Mobility",
    "AGIBOT 智元｜伦敦产品发布"
  ];
  assert.deepEqual(
    Array.from(projects.slice(0, 6), (p) => p.titleZh),
    expected
  );
  for (const slug of [
    "wang-linkai-london-concert",
    "yue-yunpeng-london-live",
    "london-fashion-week-2025",
    "leapmotor-iaa-2023"
  ])
    assert.equal(projects.find((p) => p.slug === slug).sortDate, undefined);
  assert.match(read("content/portfolio.ts"), /a.sortOrder - b.sortOrder/);
  const work = read("app/[lang]/work/page.tsx");
  assert.ok(work.indexOf("data-work-introduction") < work.indexOf("<PortfolioWork"));
  assert.match(work, /Chinese companies on UK and European brand projects/);
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
    /UK location coordination, local production and automotive visual production/
  );
});
