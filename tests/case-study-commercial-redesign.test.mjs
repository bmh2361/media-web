import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const portfolio = fs.readFileSync("content/portfolio.ts", "utf8");
const index = fs.readFileSync("components/sections/CommercialCaseIndex.tsx", "utf8");
const detail = fs.readFileSync("components/sections/PortfolioProjectDetail.tsx", "utf8");

test("case publication is gated by evidence level and a non-empty factual scope", () => {
  assert.match(portfolio, /CaseEvidenceLevel = "confirmed" \| "public-record" \| "internal-record"/);
  assert.match(portfolio, /scope: CaseScope\[\]/);
  assert.match(portfolio, /Boolean\(project\.evidenceLevel\)/);
  assert.match(portfolio, /project\.scope\.length > 0/);
});

test("all four case archetypes and capability collections are explicit", () => {
  for (const archetype of [
    "market-presence-launch",
    "industry-event-presence",
    "talent-activation",
    "brand-content-system"
  ])
    assert.match(portfolio, new RegExp(archetype));
  assert.match(detail, /Independent project experience/);
  assert.match(portfolio, /supported local brand presentation across these independent projects/);
  assert.match(portfolio, /local expression of automotive propositions across independent European settings/);
});

test("the index uses one preload and one intrinsic-ratio cover per project", () => {
  assert.doesNotMatch(index, /cases\.slice\(0, 3\)/);
  assert.match(index, /initialCover\s*\?\s*\(\s*<link\s+rel="preload"/);
  assert.doesNotMatch(index, /clamp\(440px,58vh,680px\)|aspect-\[4\/3\].*fit="cover"/);
  assert.match(index, /fit="natural"/);
  assert.match(index, /data-preview-image-count="1"/);
  assert.doesNotMatch(index, /previewSupportingMediaId|grid-cols-\[1\.35fr/);
  assert.match(index, /data-mobile-case-list/);
  assert.match(index, /aria-expanded=\{expanded\}/);
});

test("detail pages lead with commercial context, specific responsibility and separate future services", () => {
  for (const marker of [
    "The Market Context",
    "Local Execution",
    "Our Role",
    "In the Market",
    "Your Next Project",
    "partnership pathways and UK-side execution",
    'data-case-section="related"'
  ])
    assert.match(detail, new RegExp(marker));
  assert.match(detail, /Project \/ Brand/);
  assert.doesNotMatch(detail, />Client</);
  assert.match(detail, /data-evidence-level/);
});
