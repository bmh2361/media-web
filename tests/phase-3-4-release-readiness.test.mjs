import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");

test("the static release exposes direct contact without a server submission path", async () => {
  const contact = await source("components/sections/ContactExperience.tsx");
  assert.match(contact, /data-contact-delivery="direct-only"/);
  assert.match(contact, /company\.contactMethods\.wechat/);
  assert.match(contact, /mailto:\$\{CONTACT_EMAIL\}/);
  assert.doesNotMatch(contact, /<form|fetch\(|\/api\/contact/);
});

test("production validation separates canonical blockers from retired findings", async () => {
  const validator = await source("scripts/validate-release.mjs");
  assert.match(validator, /marketEntryRetired/);
  assert.match(validator, /legacyFindings/);
  assert.match(validator, /scopeMismatches/);
  assert.match(validator, /content\/portfolio-media\.generated\.json/);
  assert.match(validator, /content\/capability-media\.generated\.json/);
  assert.match(validator, /canonicalPortfolioRecords/);
});

test("five priority cases deepen only supported execution evidence", async () => {
  const portfolio = await source("content/portfolio.ts");
  for (const slug of [
    "byd-bd11-london",
    "london-automotive-brand-film",
    "changan-europe-launch-2025",
    "catl-open-day-2025",
    "leapmotor-iaa-2023"
  ]) {
    const start = portfolio.indexOf(`slug: "${slug}"`);
    const end = portfolio.indexOf("publicProject({", start + 1);
    const record = portfolio.slice(start, end === -1 ? undefined : end);
    assert.match(record, /objectiveEn:/, `${slug} needs a supported objective`);
    assert.match(record, /executionEn:/, `${slug} needs supported execution detail`);
    assert.match(record, /evidenceCreatedEn:/, `${slug} needs evidence-created detail`);
    assert.doesNotMatch(record, /deliverablesEn:/, `${slug} must not invent deliverables`);
    assert.doesNotMatch(record, /commercialUseEn:/, `${slug} must not invent commercial use`);
    assert.doesNotMatch(
      record,
      /observedOutcomes(?:En|Zh):|conversionRate:|salesGrowth:/,
      `${slug} must not invent outcomes`
    );
    assert.match(
      await source("components/sections/PortfolioProjectDetail.tsx"),
      /Responsibilities, collaborators and deliverables are agreed for the new project/
    );
    assert.doesNotMatch(
      await source("components/sections/PortfolioProjectDetail.tsx"),
      /Potential use|Relevance to Future Projects/
    );
  }
});

test("institutions and talent work is published only through verified portfolio records", async () => {
  const portfolio = await source("content/portfolio.ts");
  const registry = JSON.parse(await source("content/institution-relationships.json"));
  assert.match(portfolio, /InstitutionalEvidenceContext/);
  assert.match(portfolio, /"institutional-talent"/);
  assert.match(portfolio, /evidenceStatus: "verified"/);
  assert.deepEqual(registry, []);
});

test("Phase 3.4 human input and evidence records are substantive", async () => {
  for (const path of [
    "docs/phase-3-4-release-readiness-plan.md",
    "docs/phase-3-4-human-release-inputs.md",
    "docs/phase-3-4-priority-case-evidence-requests.md",
    "docs/institutional-project-evidence-intake.md",
    "docs/phase-3-4-leadership-profile-input.md",
    "docs/phase-3-4-final-report.md"
  ])
    assert.ok((await source(path)).length > 700, `${path} should be substantive`);
});
