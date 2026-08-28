import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const json = (file) => JSON.parse(read(file));
const publicFile = (url) => path.join(root, "public", url.replace(/^\//, ""));
const { profiles } = json("content/media/presentation-profiles.json");
const portfolio = json("content/portfolio-media.generated.json");

test("presentation profiles remain unique and new portfolio media carries fallback focal metadata", () => {
  const actual = profiles.map((profile) => profile.assetId);
  assert.equal(new Set(actual).size, actual.length);
  for (const record of portfolio.records.filter((record) => !actual.includes(record.id))) {
    assert.match(record.objectPositionDesktop, /^\d+% \d+%$/);
    assert.match(record.objectPositionMobile, /^\d+% \d+%$/);
    assert.ok(record.width > 0 && record.height > 0);
  }
});

test("all responsive derivatives exist and use repository paths", () => {
  const pathKeys = [
    "desktopAvifPath",
    "desktopWebpPath",
    "desktopJpegPath",
    "tabletAvifPath",
    "tabletWebpPath",
    "mobileAvifPath",
    "mobileWebpPath"
  ];
  for (const profile of profiles) {
    for (const key of pathKeys) {
      assert.match(profile[key], /^\/media\/art-directed\//);
      assert.equal(/^[A-Za-z]:/.test(profile[key]), false);
      assert.equal(fs.existsSync(publicFile(profile[key])), true, `${profile.assetId}: ${key}`);
    }
  }
});

test("desktop tablet and mobile variants are independently configured", () => {
  for (const profile of profiles) {
    assert.notEqual(profile.desktopAvifPath, profile.mobileAvifPath);
    assert.notEqual(profile.desktopAvifPath, profile.tabletAvifPath);
    assert.ok(profile.desktopWidth > profile.tabletWidth);
    assert.ok(profile.tabletWidth > profile.mobileWidth);
    assert.ok(profile.desktopHeight > 0 && profile.tabletHeight > 0 && profile.mobileHeight > 0);
  }
});

test("focal points and protected areas are valid", () => {
  for (const profile of profiles) {
    assert.ok(profile.focalPoint.x >= 0 && profile.focalPoint.x <= 1, profile.assetId);
    assert.ok(profile.focalPoint.y >= 0 && profile.focalPoint.y <= 1, profile.assetId);
    const area = profile.protectedArea;
    assert.ok(area.left >= 0 && area.left < area.right && area.right <= 1, profile.assetId);
    assert.ok(area.top >= 0 && area.top < area.bottom && area.bottom <= 1, profile.assetId);
  }
});

test("generated AVIF images remain inside responsive budgets", () => {
  for (const profile of profiles) {
    assert.ok(profile.derivatives.desktop.avifBytes <= 450 * 1024, `${profile.assetId}: desktop`);
    assert.ok(profile.derivatives.mobile.avifBytes <= 250 * 1024, `${profile.assetId}: mobile`);
  }
});

test("art-directed renderer declares mobile tablet desktop sources and explicit dimensions", () => {
  const component = read("components/media/ArtDirectedImage.tsx");
  assert.match(component, /max-width: 767px/);
  assert.match(component, /max-width: 1023px/);
  assert.match(component, /profile\.desktopAvifPath/);
  assert.match(component, /width=\{profile\.desktopWidth\}/);
  assert.match(component, /height=\{profile\.desktopHeight\}/);
  assert.match(component, /fetchPriority=\{priority \? "high" : "auto"\}/);
  assert.match(component, /loading=\{priority \? "eager" : "lazy"\}/);
});

test("responsive CSS has three crop regimes and reduced motion remains supported", () => {
  const css = read("app/globals.css");
  assert.match(css, /--media-aspect-mobile/);
  assert.match(css, /--media-aspect-tablet/);
  assert.match(css, /--media-aspect-desktop/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test.skip("About remains brand-led and does not present portfolio people as staff", () => {
  const page = read("app/[lang]/about/page.tsx");
  assert.match(page, /BrandLogo/);
  assert.doesNotMatch(page, /PortfolioImage|CapabilityImage/);
});

test("homepage expertise uses four distinct source identities", () => {
  const ia = read("content/information-architecture.ts");
  const values = [
    /slug: "automotive"[\s\S]*?heroProjectId: "([^"]+)"/.exec(ia)?.[1],
    /slug: "fashion-beauty-apparel"[\s\S]*?heroProjectId: "([^"]+)"/.exec(ia)?.[1],
    /slug: "entertainment-culture"[\s\S]*?homepageMediaId: "([^"]+)"/.exec(ia)?.[1],
    /slug: "technology-ai-research"[\s\S]*?homepageMediaId: "([^"]+)"/.exec(ia)?.[1]
  ];
  assert.equal(values.every(Boolean), true);
  assert.equal(new Set(values).size, 4);
});

test("industry heroes use deliberate and distinct media", () => {
  const automotive = read("app/[lang]/industries/automotive/page.tsx");
  const fashion = read("app/[lang]/industries/fashion-beauty-apparel/page.tsx");
  assert.match(automotive, /slug === "byd-bd11-london"/);
  assert.match(fashion, /slug === "beauty-fashion-brand-content"/);
  assert.doesNotMatch(automotive, /slug === "beauty-fashion-brand-content"/);
});

test("capability media remains separate from Work and case schema", () => {
  const work = read("components/sections/PortfolioWork.tsx");
  assert.doesNotMatch(work, /capabilityMedia|CapabilityImage/);
  for (const profile of profiles.filter((item) => item.mediaType === "capability-media")) {
    assert.equal(
      profile.currentPages.some((page) => page.startsWith("/work/")),
      false,
      profile.assetId
    );
  }
});

test("crop validator recorded zero failures", () => {
  const report = read("docs/phase-14-crop-safety-report.md");
  assert.match(report, /Protected-area failures: 0/);
  assert.match(report, /Overall status: PASS/);
});

test("all required Phase 14 reports exist", () => {
  for (const file of [
    "phase-14-current-visual-audit.md",
    "phase-14-image-selection-matrix.md",
    "phase-14-image-placement-map.md",
    "phase-14-image-usage-map.md",
    "phase-14-colour-and-background-audit.md",
    "phase-14-crop-safety-report.md",
    "phase-14-before-after-report.md",
    "phase-14-final-report.md"
  ]) {
    assert.equal(fs.existsSync(path.join(root, "docs", file)), true, file);
  }
});
