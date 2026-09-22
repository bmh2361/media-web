import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");

test("Phase 3.2C pre-implementation evidence is complete", async () => {
  for (const path of [
    "docs/phase-3-2c-full-portfolio-visual-audit.md",
    "docs/phase-3-2c-media-strategy-matrix.md",
    "docs/phase-3-2c-client-language-audit.md",
    "docs/phase-3-2c-page-hero-system.md",
    "docs/phase-3-2c-page-purpose-map.md",
    "docs/phase-3-2c-experience-redesign-plan.md"
  ])
    assert.ok((await source(path)).length > 800, path);
  const inventory = JSON.parse(
    await source("audit/phase-3-2c/pre-implementation/public-media-inventory.json")
  );
  assert.equal(inventory.reviewSourcePhotographs, 107);
  const audit = await source("docs/phase-3-2c-full-portfolio-visual-audit.md");
  assert.match(audit, /91 distinct photographic moments/);
});

test("selected capability media is rights-approved and publication-safe", async () => {
  const manifest = JSON.parse(await source("content/capability-media.generated.json"));
  const selected = [
    "vbm-002",
    "vbm-003",
    "vbm-005",
    "vbm-013",
    "vbm-014",
    "vbm-015",
    "vbm-018",
    "vbm-019",
    "vbm-023",
    "vbm-024"
  ];
  for (const id of selected) {
    const media = manifest.records.find((record) => record.id === id);
    assert.ok(media, id);
    assert.equal(media.websiteUseApproved, true, id);
    assert.equal(media.mediaRightsApproved, true, id);
    assert.equal(media.copyrightApproved, true, id);
  }
});

test("homepage has eight chapters and an accessible manual media rail", async () => {
  const homepage = await source("components/sections/Phase3Homepage.tsx");
  const hero = await source("components/sections/phase32c/HomeHeroExperience.tsx");
  const css = await source("app/globals.css");
  assert.equal((homepage.match(/data-home-section=/g) ?? []).length, 8);
  assert.doesNotMatch(hero, /setInterval|6800/);
  assert.match(hero, /data-home-media-rail/);
  assert.match(hero, /ArrowLeft.*ArrowRight/);
  assert.match(hero, /onPointerDown/);
  assert.match(hero, /onPointerUp/);
  assert.match(hero, /aria-current/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /phase32c-scene-in/);
});

test("canonical pages have distinct public-facing experience grammars", async () => {
  const home = await source("components/sections/phase32c/HomeHeroExperience.tsx");
  const capabilities = await source("components/sections/phase32c/CapabilityIndexHero.tsx");
  const work = await source("app/[lang]/work/page.tsx");
  const about = await source("app/[lang]/about/page.tsx");
  const contact = await source("app/[lang]/contact/page.tsx");
  assert.match(home, /data-phase32c-home-hero/);
  assert.match(capabilities, /data-phase32c-capability-index/);
  assert.match(work, /data-work-hero/);
  assert.match(about, /data-about-chapter="why"/);
  assert.match(contact, /data-contact-grammar="conversation"/);
});

test("public surfaces remove internal proof vocabulary", async () => {
  const files = [
    "components/sections/Phase3Homepage.tsx",
    "components/sections/Phase3Capabilities.tsx",
    "components/sections/PortfolioWork.tsx",
    "components/sections/PortfolioProjectDetail.tsx",
    "app/[lang]/about/page.tsx",
    "app/[lang]/contact/page.tsx",
    "content/phase3.ts"
  ];
  const joined = (await Promise.all(files.map(source))).join("\n");
  assert.doesNotMatch(
    joined,
    /Proof before explanation|Execution Cases|Capability Evidence|Evidence Boundary|Relationship & Knowledge Proof|Process Proof|Visual Proof|Adjacent proof|Direct proof/
  );
});

test("case details retain the shared narrative and data-driven visual system", async () => {
  const detail = await source("components/sections/PortfolioProjectDetail.tsx");
  for (const marker of [
    "Project Context",
    "Delivery",
    "Actual Team Role",
    "Project Imagery",
    "Your Next Project",
    "Responsibilities, collaborators and deliverables are agreed for the new project",
    'data-case-section="related"',
    "Next project"
  ])
    assert.match(detail, new RegExp(marker));
  assert.match(detail, /data-editorial-media-blocks/);
  assert.match(detail, /data-evidence-level/);
});

test("institutional engagements stay empty-safe and do not invent public proof", async () => {
  const component = await source("components/sections/phase32c/SelectedEngagements.tsx");
  const capabilities = await source("components/sections/Phase3Capabilities.tsx");
  assert.match(component, /if \(!records\.length\) return null/);
  assert.match(capabilities, /<SelectedEngagements records=\{\[\]\}/);
  assert.doesNotMatch(
    capabilities,
    /Oxford|Cambridge|Imperial|Leading British Professor|World-Class Institution/
  );
});
