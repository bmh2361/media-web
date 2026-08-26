import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const portfolio = fs.readFileSync("content/portfolio.ts", "utf8");
const index = fs.readFileSync("components/sections/CommercialCaseIndex.tsx", "utf8");
const detail = fs.readFileSync("components/sections/PortfolioProjectDetail.tsx", "utf8");
const manifest = JSON.parse(fs.readFileSync("content/portfolio-media.generated.json", "utf8"));

test("all active source media have project-level art-direction decisions", () => {
  const activeRecords = manifest.records.filter((record) => record.projectId !== "talent-categories");
  assert.equal(activeRecords.length, 62);
  assert.match(portfolio, /mediaDecisions: mediaDecisionsFor\(spec\.slug, media\)/);
  assert.match(portfolio, /previewMediaId: artDirection\[spec\.slug\]\.preview/);
  assert.match(portfolio, /heroMediaId: artDirection\[spec\.slug\]\.hero/);
  assert.match(portfolio, /galleryFit: "natural"/);
});

test("preview and hero presentation are independent and responsive", () => {
  assert.match(portfolio, /export type PreviewPresentation/);
  assert.match(portfolio, /export type HeroLayout/);
  assert.match(index, /data-case-preview/);
  assert.match(index, /data-mobile-case-cover/);
  assert.match(index, /fit="natural"/);
  assert.doesNotMatch(index, /fit="cover"/);
  assert.match(index, /data-preview-image-count="1"/);
  assert.match(index, /primary\.height > primary\.width/);
  assert.doesNotMatch(index, /previewSupportingMediaId|mobileFocalPoint=/);
});

test("detail media preserves source composition instead of universal boxes", () => {
  assert.match(detail, /getProjectHero/);
  assert.match(detail, /fit="natural"/);
  assert.match(detail, /data-hero-layout/);
  assert.doesNotMatch(detail, /aspect-video/);
  assert.doesNotMatch(detail, /masonry/i);
});
