import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");

test("one canonical dataset governs case publication, order, categories and relationships", async () => {
  const portfolio = await source("content/portfolio.ts");
  assert.match(portfolio, /const specs: Spec\[\]/);
  assert.match(portfolio, /sortOrder: commercialOrder\.indexOf\(spec\.slug\) \+ 1/);
  assert.match(portfolio, /evidenceLevel/);
  assert.match(portfolio, /scope: CaseScope\[\]/);
  assert.match(portfolio, /publicStatus: "published"/);
  assert.match(portfolio, /evidenceStatus === "verified"/);
  assert.match(portfolio, /websiteUseApproved/);
  assert.match(portfolio, /publishedPortfolioProjects/);
  assert.match(portfolio, /homepagePortfolioProjects = publishedPortfolioProjects/);
  assert.match(portfolio, /getNextPortfolioProject/);
  for (const category of [
    "market-presence",
    "industry-credibility",
    "institutional-talent",
    "brand-evidence"
  ])
    assert.match(portfolio, new RegExp(category));
});

test("homepage and Work consume the canonical published collection without duplicate case lists", async () => {
  const homepage = await source("components/sections/Phase5Homepage.tsx");
  const work = await source("components/sections/PortfolioWork.tsx");
  assert.match(homepage, /homepagePortfolioProjects/);
  assert.match(homepage, /homepagePortfolioProjects\.slice\(0, 3\)\.map/);
  assert.equal((homepage.match(/data-phase5-section=/g) ?? []).length, 9);
  assert.match(work, /publishedPortfolioProjects/);
  assert.match(work, /CommercialCaseIndex/);
  assert.doesNotMatch(work, /universityTalentCases|commercial-evidence/);
});

test("case archive rows are accessible links with filters and a non-following desktop preview", async () => {
  const index = await source("components/sections/CommercialCaseIndex.tsx");
  assert.match(index, /data-case-row/);
  assert.match(index, /href=\{withLanguage\(`\/work\/\$\{project\.slug\}`/);
  assert.match(index, /aria-pressed/);
  assert.match(index, /onMouseEnter/);
  assert.match(index, /onFocus/);
  assert.match(index, /lg:grid-cols-\[minmax\(0,54fr\)_minmax\(0,46fr\)\]/);
  assert.match(index, /useReducedMotion/);
  assert.match(index, /padStart\(2, "0"\)/);
  assert.match(index, /will not appear as public cases until verified/);
  assert.doesNotMatch(index, /clientX|clientY|mousemove|pointermove/i);
});

test("case routes, metadata and sitemap are published-only and case-specific", async () => {
  const route = await source("app/[lang]/work/[slug]/page.tsx");
  const sitemap = await source("app/sitemap.ts");
  const seo = await source("lib/seo.ts");
  assert.match(route, /publishedPortfolioProjects/);
  assert.match(route, /findPublishedPortfolioProject/);
  assert.match(route, /commercialCaseCategories\[project\.category\]/);
  assert.match(route, /ogImage: getProjectCover\(project\)\?\.publicPath/);
  assert.match(sitemap, /publishedPortfolioProjects/);
  assert.match(seo, /ogImage\?: string/);
  assert.match(seo, /resolvedOgImage/);
});

test("detail pages use data-driven editorial blocks and chronological next-project navigation", async () => {
  const detail = await source("components/sections/PortfolioProjectDetail.tsx");
  for (const section of [
    "hero",
    "objective",
    "challenge",
    "responsibility",
    "first-evidence",
    "structure",
    "visual-evidence",
    "outputs",
    "related"
  ])
    assert.match(detail, new RegExp(`data-case-section=\\"${section}\\"`));
  for (const number of ["01", "02", "03"])
    assert.match(detail, new RegExp(`>\\s*${number}(?:\\s*·)?|eyebrow=\\"${number}\\"`));
  assert.match(detail, /data-editorial-media-blocks/);
  assert.match(detail, /getNextPortfolioProject/);
  assert.match(detail, /EditorialBlock/);
});

test("audience pages link to evidence while About avoids a duplicate case-study module", async () => {
  const audiences = await source("components/sections/Phase5AudiencePages.tsx");
  const about = await source("app/[lang]/about/page.tsx");
  for (const category of ["market-presence", "industry-credibility", "brand-evidence"])
    assert.match(audiences, new RegExp(`/work\\?category=${category}`));
  assert.doesNotMatch(about, /publishedPortfolioProjects|AboutProjectProof|View case/);
});
