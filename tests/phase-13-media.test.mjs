import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");
const manifest = JSON.parse(await source("content/capability-media.generated.json"));

test("Phase 13 manifest reads 24 unique capability assets", () => {
  assert.equal(manifest.sourceRecordCount, 24);
  assert.equal(manifest.records.length, 24);
  assert.equal(new Set(manifest.records.map((item) => item.id)).size, 24);
  assert.equal(manifest.duplicateBinaryAssetsRemoved, 1);
  for (const item of manifest.records) {
    assert.equal(item.contentRole, "capability-media");
    assert.equal(item.capabilityReady, true);
    assert.equal(item.caseReady, false);
  }
});

test("duplicates are registered once and capability media cannot enter Work or sitemap", async () => {
  const duplicate = manifest.records.find((item) => item.id === "vbm-023");
  assert.equal(duplicate.duplicateSourcePaths.length, 1);
  const portfolio = await source("content/portfolio.ts");
  const sitemap = await source("app/sitemap.ts");
  assert.doesNotMatch(portfolio, /capabilityMediaManifest|capabilityMediaCollections/);
  assert.doesNotMatch(sitemap, /capabilityMedia|media-review/);
});

test("legacy expertise routes retain controlled technology routes and retire entertainment", async () => {
  const route = await source("app/[lang]/expertise/[sector]/page.tsx");
  const pages = await source("components/sections/CapabilityExpertisePages.tsx");
  assert.match(route, /redirect/);
  assert.match(route, /technology-ai-research/);
  assert.doesNotMatch(route, /entertainment-culture|fashion-beauty-apparel/);
  assert.match(pages, /EntertainmentCulturePage/);
  assert.match(pages, /TechnologyAiResearchPage/);
  assert.match(pages, /Talent availability and usage are confirmed per project/);
  assert.match(pages, /not presented as a public talent roster/);
  assert.doesNotMatch(
    pages,
    /we (build|develop) AI models|software development services|algorithm consulting services/i
  );
});

test("research stays secondary and empty institution configuration renders no relationship section", async () => {
  const pages = await source("components/sections/CapabilityExpertisePages.tsx");
  const relationships = JSON.parse(await source("content/institution-relationships.json"));
  const institutions = await source("content/institutions.ts");
  assert.match(pages, /RESEARCH & INNOVATION · SECONDARY/);
  assert.equal(relationships.length, 0);
  for (const gate of [
    "logoUseApproved === true",
    "item.public === true",
    "publicWordingEn",
    "publicWordingZh",
    "relationshipType",
    "approvalEvidence"
  ])
    assert.ok(institutions.includes(gate), gate);
  assert.doesNotMatch(
    `${pages}\n${institutions}`,
    /University-backed|Official university partner|Supported by UK universities|高校官方背书|官方合作院校|独家高校资源/i
  );
});

test("About uses supplied team portraits and keeps the opening typographic", async () => {
  const about = `${await source("app/[lang]/about/page.tsx")}\n${await source("components/sections/AboutTeam.tsx")}\n${await source("components/team/TeamProfileIndex.tsx")}`;
  assert.match(about, /publicTeamMembers/);
  assert.match(about, /capabilitySystem/);
  assert.match(about, /SPECIALIST DEPTH/);
  assert.doesNotMatch(
    about,
    /PortfolioImage|findPublishedPortfolioProject|AboutProjectProof|data-about-chapter="real-work"/
  );
  assert.doesNotMatch(about, /CapabilityImage|talent-categories/);
});

test("homepage expertise uses four distinct visual sources", async () => {
  const content = await source("content/information-architecture.ts");
  const component = await source("components/sections/InformationArchitecturePages.tsx");
  assert.match(content, /homepageMediaId: "vbm-021"/);
  assert.match(content, /homepageMediaId: "vbm-002"/);
  assert.match(component, /findPortfolioMedia\(sector.heroProjectId\)/);
  assert.match(component, /capabilityMediaById\(sector.homepageMediaId\)/);
  assert.notEqual("vbm-021", "vbm-002");
});

test("Enter uses one editorial image instead of a repeated gallery", async () => {
  const content = (await source("content/information-architecture.ts")).replaceAll("\r\n", "\n");
  const enterBlock = content.match(/slug: "enter-the-uk"([\s\S]*?)\n  }\n\];/)?.[1] ?? "";
  assert.match(enterBlock, /mediaIds: \["vbm-023"\]/);
  assert.doesNotMatch(enterBlock, /mediaIds: \["vbm-023",/);
});

test("all image paths resolve and desktop/mobile crops and formats exist", async () => {
  for (const item of manifest.records) {
    assert.ok(item.objectPositionDesktop);
    assert.ok(item.objectPositionMobile);
    for (const path of [
      item.publicPath,
      item.avifPath,
      item.jpegPath,
      item.mobilePath,
      item.mobileAvifPath,
      item.thumbnailPath
    ])
      await access(new URL(`public${path}`, root));
    assert.ok(item.webpBytes <= 250 * 1024, item.id);
    assert.ok(item.mobileBytes <= 250 * 1024, item.id);
    assert.ok(item.thumbnailBytes <= 100 * 1024, item.id);
  }
});

test("responsive and reduced-motion safeguards cover the required range", async () => {
  const css = await source("app/globals.css");
  const component = await source("components/media/ArtDirectedImage.tsx");
  assert.match(css, /max-width: 767px/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(component, /max-width: 767px/);
  assert.match(component, /mobileAvifPath/);
  assert.match(component, /width={profile.desktopWidth}/);
  assert.match(component, /height={profile.desktopHeight}/);
});
