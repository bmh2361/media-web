import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");
const manifest = JSON.parse(await source("content/portfolio-media.generated.json"));

test("portfolio imports a curated, rights-approved subset and excludes internal references", async () => {
  assert.equal(manifest.sourceRecordCount, 261);
  assert.equal(manifest.selectedAssetCount, 68);
  assert.equal(manifest.excludedInternalCount, 54);
  assert.equal(manifest.records.length, 68);
  for (const media of manifest.records) {
    assert.equal(media.websiteUseApproved, true);
    assert.equal(media.mediaRightsApproved, true);
    assert.equal(media.copyrightApproved, true);
    assert.equal(media.creditRequired, false);
    assert.equal(media.sourceCredit, null);
    assert.equal(media.publicStatus, "public");
    assert.doesNotMatch(JSON.stringify(media), /04_internal_only|internal.only|Xhouse|partner production/i);
    assert.doesNotMatch(JSON.stringify(media), /[A-Z]:\\|D:\//i);
  }
  const publicFiles = await readdir(new URL("public/media/portfolio/", root), { recursive: true });
  assert.equal(
    publicFiles.some((file) => /internal|moodboard/i.test(String(file))),
    false
  );
});

test("all portfolio derivatives exist, have bilingual alt text and meet media budgets", async () => {
  for (const media of manifest.records) {
    assert.ok(media.altEn.trim().length > 8, media.id);
    assert.ok(media.altZh.trim().length > 4, media.id);
    assert.ok(media.allowedPages.length > 0, media.id);
    for (const path of [media.publicPath, media.avifPath, media.mobilePath, media.thumbnailPath]) {
      await access(new URL(`public${path}`, root));
    }
    assert.ok(media.webpBytes <= (media.category === "hero" ? 450 : 250) * 1024, media.id);
    assert.ok(media.avifBytes <= (media.category === "hero" ? 450 : 250) * 1024, media.id);
    assert.ok(media.mobileBytes <= 250 * 1024, media.id);
    assert.ok(media.thumbnailBytes <= 100 * 1024, media.id);
    const metadata = await sharp(fileURLToPath(new URL(`public${media.publicPath}`, root))).metadata();
    assert.equal(metadata.exif, undefined, `${media.id} contains EXIF`);
    assert.equal(metadata.icc, undefined, `${media.id} contains an ICC profile`);
  }
});

test("six automotive records remain independent and every real project has a unique hero", async () => {
  const automotiveIds = [
    "catl-open-day-2025",
    "byd-bd11-london",
    "changan-europe-launch-2025",
    "leapmotor-iaa-2023",
    "london-automotive-brand-film",
    "european-road-lifestyle"
  ];
  for (const id of automotiveIds) {
    const records = manifest.records.filter((media) => media.projectId === id);
    assert.equal(records.length, 7, id);
    assert.equal(records.filter((media) => media.category === "hero").length, 1, id);
  }
  const heroPaths = manifest.records
    .filter((media) => media.category === "hero")
    .map((media) => media.publicPath);
  assert.equal(new Set(heroPaths).size, heroPaths.length);
});

test.skip("public Work contains real experience only and scenarios move to project routes", async () => {
  const content = await source("content/portfolio.ts");
  const work = await source("components/sections/PortfolioWork.tsx");
  const routes = await source("components/sections/InformationArchitecturePages.tsx");
  const detail = await source("components/sections/PortfolioProjectDetail.tsx");
  assert.equal((content.match(/section: "selected-projects"/g) ?? []).length, 3);
  assert.equal((content.match(/section: "production-experience"/g) ?? []).length, 6);
  assert.equal((content.match(/homepageFeatured: true/g) ?? []).length, 3);
  assert.match(content, /Selected Projects/);
  assert.match(content, /Production Experience/);
  assert.match(content, /Production Scenarios/);
  assert.doesNotMatch(work, /caseStudies|Production scenario/);
  assert.match(routes, /The following are capability routes, not completed client projects/);
  assert.match(detail, /Visual Production Scope/);
  assert.match(detail, /Confirmed deliverables/);
  assert.doesNotMatch(content, /deliverablesEn:\s*\[/);
  assert.doesNotMatch(
    content,
    /Full Production|Campaign Strategy|Event Management|Media Relations|Livestream/i
  );
});

test("public portfolio surfaces contain no external source label or inflated claim", async () => {
  const paths = [
    "content/portfolio.ts",
    "components/sections/PortfolioWork.tsx",
    "components/sections/PortfolioProjectDetail.tsx",
    "components/sections/HomepageSelectedWork.tsx",
    "app/[lang]/industries/automotive/page.tsx",
    "components/sections/Phase5AudiencePages.tsx",
    "components/sections/CommercialSections.tsx"
  ];
  const banned =
    /Xhouse|partner production|third-party material|external production|licensed experience|official partner|world-class|award-winning/i;
  for (const path of paths) assert.doesNotMatch(await source(path), banned, path);
});

test("talent references are anonymous booking examples and are not used as team profiles", async () => {
  const talent = await source("components/sections/experiences/TalentExperience.tsx");
  const aboutFiles = `${await source("app/[lang]/about/page.tsx")}\n${await source("components/sections/AboutTeam.tsx")}`;
  assert.match(talent, /Talent availability, usage and booking terms are confirmed for each project/);
  assert.doesNotMatch(talent, /exclusive|always available|employee|staff member/i);
  assert.doesNotMatch(aboutFiles, /talent-categories|portfolioMediaForPage\("\/talent"\)/);
});

test("sitemap indexes real projects and the development review route is absent", async () => {
  const sitemap = await source("app/sitemap.ts");
  assert.match(sitemap, /publishedPortfolioProjects/);
  assert.doesNotMatch(sitemap, /caseStudies|media-review/);
  assert.match(sitemap, /workMode === "hidden"/);
  await assert.rejects(access(new URL("app/[lang]/media-review/page.tsx", root)));
});
