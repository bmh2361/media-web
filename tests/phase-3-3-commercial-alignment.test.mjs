import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");

test("homepage proof is geographically explicit and begins with real UK work", async () => {
  const page = await source("components/sections/Phase3Homepage.tsx");
  const copy = await source("content/phase3.ts");
  assert.match(page, /earlyProofSlugs = \["byd-bd11-london", "london-automotive-brand-film", "changan-europe-launch-2025", "catl-open-day-2025"\]/);
  assert.match(page, /project\.location/);
  assert.doesNotMatch(copy, /SELECTED UK ACTIVITY/);
  assert.match(copy, /Real UK and European work, precisely located/);
});

test("all public portfolio records appear in the Work index", async () => {
  const work = await source("components/sections/PortfolioWork.tsx");
  const portfolio = await source("content/portfolio.ts");
  for (const slug of [
    "byd-bd11-london",
    "london-automotive-brand-film",
    "changan-europe-launch-2025",
    "catl-open-day-2025",
    "leapmotor-iaa-2023",
    "european-road-lifestyle",
    "wang-linkai-london-concert",
    "geely-london-brand-launch",
    "yue-yunpeng-london-live",
    "london-fashion-week-2025",
    "agibot-london-launch",
    "beauty-fashion-brand-content"
  ]) assert.match(portfolio, new RegExp(slug));
  assert.match(work, /publishedPortfolioProjects/);
  assert.match(work, /CommercialCaseIndex/);
});

test("case detail omits unknown outputs while canonical data preserves the truth boundary", async () => {
  const detail = await source("components/sections/PortfolioProjectDetail.tsx");
  const portfolio = await source("content/portfolio.ts");
  assert.doesNotMatch(detail, /deliverables\?\.length \? deliverables : roles/);
  assert.doesNotMatch(detail, /Public record boundary/);
  assert.doesNotMatch(detail, /scopeBoundary/);
  assert.match(portfolio, /scopeBoundaryEn: series \? boundary\.seriesEn : boundary\.caseEn/);
  assert.match(portfolio, /scopeBoundaryZh: series \? boundary\.seriesZh : boundary\.caseZh/);
});

test("institutional proof remains fail-closed", async () => {
  const capability = await source("components/sections/Phase3Capabilities.tsx");
  const registry = await source("content/institution-relationships.json");
  assert.equal(JSON.parse(registry).length, 0);
  assert.match(capability, /No named institutional project currently passes every public evidence gate/);
  assert.match(capability, /SelectedEngagements records=\{\[\]\}/);
});

test("Phase 3.3 evidence, gap, release and IA records exist", async () => {
  for (const path of [
    "docs/phase-3-3-institutional-evidence-register.md",
    "docs/phase-3-3-case-evidence-gap-register.md",
    "docs/phase-3-3-release-gate-triage.md",
    "docs/phase-3-3-commercial-ia-plan.md"
  ]) assert.ok((await source(path)).length > 800, `${path} should be substantive`);
});
