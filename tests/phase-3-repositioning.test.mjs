import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");

test("primary navigation is flat and exposes both Phase 5 audiences", async () => {
  const header = await source("components/layout/Header.tsx");
  const copy = await source("content/phase5.ts");
  assert.match(header, /\["companies", "\/companies"\]/);
  assert.match(header, /\["partners", "\/partners"\]/);
  assert.match(header, /\["work", "\/work"\]/);
  assert.match(header, /\["about", "\/about"\]/);
  assert.match(header, /\["contact", "\/contact"\]/);
  assert.doesNotMatch(header, /megaMenus|How We Help|Industries|Solutions/);
  assert.match(copy, /Discuss a Project/);
  assert.doesNotMatch(header, /Fit Call|Execution Brief|Market Entry/);
});

test("homepage implements the required eight-section narrative", async () => {
  const page = await source("components/sections/Phase3Homepage.tsx");
  for (const marker of [
    "copy.hero",
    "copy.proof",
    "copy.outcomes",
    "copy.capabilities",
    "copy.selectedWork",
    "copy.process",
    "copy.why",
    "copy.finalCta"
  ])
    assert.match(page, new RegExp(marker));
  assert.equal((page.match(/data-home-section=/g) ?? []).length, 8);
  assert.doesNotMatch(page, /readiness|diagnostic|specialist referral|Fit Call|Execution Brief/i);
});

test("capabilities expose exactly four outcome-led pillars", async () => {
  const content = await source("content/phase3.ts");
  for (const title of [
    "Institutional & Expert Collaboration",
    "Industry Presence & Events",
    "Creators, Talent & Cultural Partnerships",
    "Creative Production & Brand Assets"
  ])
    assert.match(content, new RegExp(title.replaceAll("&", "\\&")));
  assert.equal(
    new Set(
      content.match(
        /id: "(?:institutional-expert-collaboration|industry-presence-events|creators-talent-cultural-partnerships|creative-production-brand-assets)"/g
      ) ?? []
    ).size,
    4
  );
  assert.match(content, /WHAT ARE YOU TRYING TO ACHIEVE/);
});

test("legacy commercial routes resolve through the secondary capabilities redirect and stay absent from sitemap", async () => {
  const config = (await import(new URL("../next.config.mjs", import.meta.url))).default;
  const redirects = await config.redirects();
  const sitemap = await source("app/sitemap.ts");
  for (const legacy of ["/what-we-do", "/services", "/industries", "/expertise", "/talent", "/for-agencies"])
    assert.ok(
      redirects.some((item) => item.source.includes(legacy) && item.destination.includes("/capabilities"))
    );
  assert.ok(
    redirects.some((item) => item.source.includes("/capabilities") && item.destination.includes("/companies"))
  );
  for (const route of ["/companies", "/partners", "/work", "/about", "/contact"])
    assert.match(sitemap, new RegExp(route));
  assert.doesNotMatch(sitemap, /"\/(?:what-we-do|services|industries|expertise|talent|for-agencies)/);
});

test("claim governance blocks endorsement and full market-entry claims", async () => {
  const claims = await source("content/phase3.ts");
  assert.match(claims, /institutional-endorsement[\s\S]*NOT_SAFE_TO_PUBLISH/);
  assert.match(claims, /full-market-entry[\s\S]*NOT_SAFE_TO_PUBLISH/);
  assert.match(claims, /future-specialists[\s\S]*ASPIRATIONAL/);
  assert.match(claims, /portfolio-role[\s\S]*VERIFIED/);
});

test("contact captures a simple intent-routed collaboration enquiry", async () => {
  const contact = await source("components/sections/ContactExperience.tsx");
  const validation = await source("lib/contact/validation.ts");
  for (const field of ["name", "company", "role", "email", "timing", "objective"])
    assert.match(contact, new RegExp(`name="${field}"`));
  assert.match(contact, /Send enquiry/);
  assert.match(contact, /collaboratorType/);
  assert.doesNotMatch(contact, /Fit Call|Execution Brief|ukStage/);
  assert.doesNotMatch(validation, /enquiryType === "quick" && !data\.ukStage/);
});

test("work detail uses the required truth-gated case structure", async () => {
  const detail = await source("components/sections/PortfolioProjectDetail.tsx");
  for (const marker of [
    "Project Objective",
    "Business Context",
    "Challenge",
    "Venus Bridge Role",
    "Strategy / Approach",
    "Local Delivery",
    "Outputs / Outcomes",
    "What Remained Useful",
    "Next project"
  ])
    assert.match(detail, new RegExp(marker));
  assert.match(detail, /Project \/ Brand/);
  assert.match(detail, /project\.roleStatementEn/);
  assert.match(detail, /data-editorial-media-blocks/);
  assert.doesNotMatch(detail, /Market Entry|full campaign agency/i);
});
