import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import test from "node:test";
const exports = {};
vm.runInNewContext(
  ts.transpileModule(fs.readFileSync("content/portfolio.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }
  }).outputText,
  { exports, require: () => JSON.parse(fs.readFileSync("content/portfolio-media.generated.json", "utf8")) }
);
const removed = [
  "wang-linkai-london-concert",
  "yue-yunpeng-london-live",
  "london-fashion-week-2025",
  "beauty-fashion-brand-content"
];
test("brand eligibility excludes retired cases from every public lookup without changing approval history", () => {
  for (const slug of removed) {
    const historical = exports.portfolioProjects.find((p) => p.slug === slug);
    assert.equal(historical.websiteUseApproved, true);
    assert.equal(historical.publicStatus, "published");
    assert.equal(exports.isPublishedPortfolioProject(historical), false);
    assert.equal(exports.findPortfolioProject(slug), undefined);
    assert.equal(exports.findPublishedPortfolioProject(slug), undefined);
    assert.equal(exports.findPortfolioMedia(slug), undefined);
  }
  for (const path of ["/", "/work", "/talent", "/companies", "/partners"])
    assert.ok(exports.portfolioMediaForPage(path).every((m) => !removed.includes(m.projectId)));
  assert.equal(exports.publishedPortfolioProjects.length, 8);
  assert.ok(exports.findPublishedPortfolioProject("european-road-lifestyle"));
  for (const p of exports.publishedPortfolioProjects) {
    assert.ok(!removed.includes(exports.getNextPortfolioProject(p).slug));
    assert.ok(exports.getRelatedPortfolioProjects(p).every((p) => !removed.includes(p.slug)));
  }
  assert.ok(
    exports.commercialCaseFilters.every(
      (f) => f.value === "all" || exports.publishedPortfolioProjects.some((p) => p.category === f.value)
    )
  );
});
