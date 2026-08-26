import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

test("primary navigation reflects the commercial architecture", async () => {
  const navigation = await source("content/navigation.ts");
  const primaryBlock = navigation.match(/export const primaryNav = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
  for (const label of ["How We Help", "Industries", "Solutions", "Proof", "Why Venus", "Contact"])
    assert.match(primaryBlock, new RegExp(label));
  assert.doesNotMatch(primaryBlock, /Insights/);
});

test("four customer situations map to four distinct routes", async () => {
  const content = await source("content/commercial-architecture.ts");
  for (const id of ["exploring", "preparing", "presence", "delivery"])
    assert.match(content, new RegExp(`id: "${id}"`));
  for (const route of [
    "/what-we-do/enter-the-uk",
    "/what-we-do/launch-in-the-uk",
    "/what-we-do/building-uk-presence",
    "/what-we-do/create-in-the-uk"
  ])
    assert.match(content, new RegExp(route));
});

test("solutions distinguish developing brand support from core execution", async () => {
  const content = await source("content/commercial-architecture.ts");
  assert.match(content, /Brand & Localisation/);
  assert.match(content, /Developing capability/);
  assert.equal((content.match(/Core delivery/g) ?? []).length, 3);
  assert.doesNotMatch(content, /proprietary market-entry methodology/i);
});

test("entertainment and technology retain capability without invented endorsement", async () => {
  const content = await source("content/information-architecture.ts");
  assert.match(content, /Concert, stage and backstage content/);
  assert.match(content, /AI and technology product demonstrations/);
  assert.match(content, /Access to academic experts and research networks is subject to project fit/);
  for (const claim of [
    "University-backed",
    "Supported by UK universities",
    "Official university partner",
    "高校官方背书",
    "独家高校资源"
  ])
    assert.doesNotMatch(content, new RegExp(claim, "i"));
});

test.skip("legacy expertise URLs redirect to canonical industry URLs without loops", async () => {
  const config = (await import(new URL("../next.config.mjs", import.meta.url))).default;
  const redirects = await config.redirects();
  assert.ok(redirects.every((redirect) => redirect.permanent === true));
  assert.ok(
    redirects.some(
      (redirect) =>
        redirect.source.includes("/expertise/:sector") && redirect.destination.includes("/industries/:sector")
    )
  );
  const sources = new Set(redirects.map((redirect) => redirect.source));
  assert.ok(redirects.every((redirect) => !sources.has(redirect.destination)));
});

test.skip("sitemap contains canonical commercial routes and no legacy expertise routes", async () => {
  const sitemap = await source("app/sitemap.ts");
  for (const route of [
    "/what-we-do/building-uk-presence",
    "/services",
    "/industries",
    "/industries/entertainment-culture",
    "/industries/technology-ai-research"
  ])
    assert.match(sitemap, new RegExp(route));
  assert.doesNotMatch(sitemap, /"\/expertise/);
  assert.doesNotMatch(sitemap, /caseStudies|roadshowCaseStudies/);
});

test.skip("proof tiers fail closed and homepage uses the three approved execution cases", async () => {
  const portfolio = await source("content/portfolio.ts");
  const earlyProof = await source("components/sections/HomepageEarlyProof.tsx");
  const homepage = await source("components/sections/HomepageSelectedWork.tsx");
  const detail = await source("components/sections/PortfolioProjectDetail.tsx");
  assert.match(portfolio, /ProofTier = "strategic" \| "execution" \| "capability"/);
  assert.equal((portfolio.match(/tier: "strategic"/g) ?? []).length, 0);
  assert.match(portfolio, /london-automotive-brand-film/);
  assert.match(portfolio, /changan-europe-launch-2025/);
  assert.match(portfolio, /byd-bd11-london/);
  assert.match(portfolio, /homepageEarlyProofProjects/);
  assert.match(portfolio, /catl-open-day-2025/);
  assert.match(earlyProof, /SELECTED EXECUTION EXPERIENCE/);
  assert.doesNotMatch(earlyProof, /proof\.label/);
  assert.match(homepage, /getProofPresentation/);
  assert.doesNotMatch(homepage, /proof\.label/);
  assert.doesNotMatch(homepage, /clientName/);
  assert.doesNotMatch(detail, /project\.clientName/);
  assert.match(detail, /proof\.tier === "execution" \? <JsonLd/);
  assert.doesNotMatch(portfolio, /\b(?:ROI|sales uplift|market impact|campaign outcome|reach result)\b/i);
});

test.skip("homepage implements the approved commercial sequence without an Insights section", async () => {
  const page = await source("app/[lang]/page.tsx");
  assert.ok(page.indexOf("<HomepageEarlyProof") < page.indexOf("START WITH YOUR SITUATION"));
  for (const marker of [
    "START WITH YOUR SITUATION",
    "PLAN THE FIRST MOVE",
    "SOLUTIONS",
    "SELECTED WORK",
    "HOW WE WORK",
    "LOCAL EXECUTION ENGINE",
    "BUILT AROUND THE BRIEF",
    "INDUSTRY PRIORITIES",
    "START WITH FIT"
  ])
    assert.match(page, new RegExp(marker));
  assert.match(page, /<HomepageExpertise/);
  assert.doesNotMatch(page, /INSIGHTS/);
});

test.skip("contact offers a low-friction fit request and a separate execution brief", async () => {
  const experience = await source("components/sections/ContactExperience.tsx");
  const forms = await source("components/sections/CommercialContactForms.tsx");
  const validation = await source("lib/contact/validation.ts");
  assert.match(experience, /Request a 20-minute UK Fit Call/);
  assert.match(experience, /Send an Execution Brief/);
  assert.match(experience, /No complete brief needed/);
  assert.match(experience, /checking fit and agreeing the most practical next step/);
  for (const field of [
    "companyWebsite",
    "ukStage",
    "deliverables",
    "channels",
    "localNeeds",
    "usage",
    "approvalOwner"
  ])
    assert.match(forms, new RegExp(field));
  assert.match(forms, /Not sure yet/);
  assert.doesNotMatch(forms, /name="role"/);
  assert.doesNotMatch(forms, /name="mainUncertainty"/);
  assert.match(validation, /enquiryType === "quick" && !data\.email/);
  assert.doesNotMatch(validation, /enquiryType === "quick" && !data\.timing/);
});

test("future products and Insights remain gated instead of being presented as mature", async () => {
  const architecture = await source("content/commercial-architecture.ts");
  const navigation = await source("content/navigation.ts");
  const homepage = await source("app/[lang]/page.tsx");
  const sitemap = await source("app/sitemap.ts");
  assert.match(architecture, /status: "build-first"/);
  assert.equal((architecture.match(/status: "pilot-first"/g) ?? []).length, 2);
  assert.match(architecture, /Available for selected projects, subject to fit/);
  assert.doesNotMatch(navigation, /Insights/);
  assert.doesNotMatch(homepage, /INSIGHTS/);
  assert.doesNotMatch(sitemap, /insights/);
});
