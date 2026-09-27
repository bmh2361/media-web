import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const exports = {};
vm.runInNewContext(
  ts.transpileModule(fs.readFileSync("content/portfolio.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true }
  }).outputText,
  {
    exports,
    require: () => JSON.parse(fs.readFileSync("content/portfolio-media.generated.json", "utf8"))
  }
);

test("every public case has distinct bilingual market outcomes and strategic relevance", () => {
  const projects = exports.publishedPortfolioProjects;
  assert.equal(projects.length, 10);
  for (const language of ["En", "Zh"]) {
    for (const field of ["marketOutcome", "strategicRelevance"]) {
      for (const project of projects) assert.ok(project[field + language]?.trim(), project.slug);
      assert.equal(new Set(projects.map((project) => project[field + language])).size, 10);
    }
    for (const project of projects) {
      const copy = [
        "title",
        "eventName",
        "projectType",
        "participationSummary",
        "context",
        "objective",
        "roleStatement",
        "execution",
        "marketOutcome",
        "strategicRelevance"
      ].map((field) => project[field + language]);
      copy.push(...project["role" + language], ...project.media.map((media) => media["alt" + language]));
      copy.push(...project.capabilities, ...project.services);
      assert.doesNotMatch(
        copy.join(" "),
        /photograph|videograph|filming|content (?:capture|production|documentation)|event documentation|摄影|拍摄|影视制作|现场记录|作品集/i,
        project.slug
      );
      assert.doesNotMatch(
        copy.join(" "),
        /official partner|exclusive partner|appointed by|官方合作伙伴|独家合作|\d+\s*(?:%|leads|orders|sales|订单|线索)/i,
        project.slug
      );
    }
  }
});
