import assert from "node:assert/strict";
import fs from "node:fs/promises";
import test from "node:test";
import { publicCommercialCaseNarratives } from "../content/evidence/public-case-narratives.ts";
import { publicCaseSourceManifest } from "../content/evidence/public-case-sources.ts";

const coreSlugs = [
  "byd-bd11-london",
  "geely-london-brand-launch",
  "changan-europe-launch-2025",
  "catl-open-day-2025",
  "leapmotor-iaa-2023",
  "agibot-london-launch"
];

test("all six commercial cases carry the required bilingual narrative fields", () => {
  assert.deepEqual(Object.keys(publicCommercialCaseNarratives).sort(), [...coreSlugs].sort());
  for (const slug of coreSlugs) {
    const item = publicCommercialCaseNarratives[slug];
    for (const field of [
      "marketMoment",
      "projectObjective",
      "verifiedVenusRole",
      "verifiedOutputs",
      "verifiedResult",
      "claimBoundary"
    ])
      assert.ok(item[field], `${slug}: ${field}`);
    for (const value of [
      item.marketMoment.text,
      item.whyItMattered.text,
      item.projectObjective.text,
      item.verifiedVenusRole.text,
      item.verifiedResult.text,
      item.claimBoundary
    ])
      assert.ok(value.en?.trim() && value.zh?.trim(), `${slug}: bilingual parity`);
  }
});

test("every rendered claim has a registered source and UNVERIFIED claims cannot publish", () => {
  const sources = new Map(
    publicCaseSourceManifest.flatMap((entry) => entry.sources.map((source) => [source.id, source]))
  );
  for (const [slug, item] of Object.entries(publicCommercialCaseNarratives)) {
    const claims = [
      item.marketMoment,
      item.whyItMattered,
      item.projectObjective,
      item.challenge,
      item.verifiedVenusRole,
      ...item.verifiedOutputs,
      item.verifiedResult,
      ...(item.subsequentDevelopment ? [item.subsequentDevelopment] : [])
    ];
    for (const claim of claims) {
      assert.notEqual(claim.classification, "UNVERIFIED", `${slug}: unverified public claim`);
      assert.ok(claim.sourceIds.length, `${slug}: source required`);
      for (const sourceId of claim.sourceIds) assert.ok(sources.has(sourceId), `${slug}: ${sourceId}`);
    }
  }
});

test("subsequent developments require the bilingual no-attribution disclaimer", () => {
  for (const item of Object.values(publicCommercialCaseNarratives)) {
    if (!item.subsequentDevelopment) continue;
    assert.equal(item.subsequentDevelopment.classification, "SUBSEQUENT_PUBLIC_DEVELOPMENT");
    assert.match(item.subsequentDisclaimer.en, /not presented as an outcome attributable to Venus Bridge/i);
    assert.match(item.subsequentDisclaimer.zh, /不作为可归因于 Venus Bridge 的项目成果/);
  }
});

test("work hierarchy keeps creative cases outside Tier 1 and uses a Europe-safe taxonomy", async () => {
  const portfolio = await fs.readFile(new URL("../content/portfolio.ts", import.meta.url), "utf8");
  assert.match(portfolio, /const workTier = commercialNarrative \? 1/);
  assert.match(portfolio, /spec\.slug === "london-automotive-brand-film" \? 2 : 3/);
  assert.match(portfolio, /commercialNarrative\?\.geography/);
  assert.match(portfolio, /engagementType/);
});

test("homepage and Work previews lead commercial cases with market moment before verified role", async () => {
  const [home, index, work] = await Promise.all([
    fs.readFile(new URL("../components/sections/Phase5Homepage.tsx", import.meta.url), "utf8"),
    fs.readFile(new URL("../components/sections/CommercialCaseIndex.tsx", import.meta.url), "utf8"),
    fs.readFile(new URL("../components/sections/PortfolioWork.tsx", import.meta.url), "utf8")
  ]);
  assert.match(home, /marketMomentLabel/);
  assert.match(home, /Verified role/);
  assert.ok(index.indexOf("Market moment") < index.indexOf("Verified Venus Bridge role"));
  assert.match(work, /Commercial Case Studies/);
  assert.match(work, /Local Brand & Production Execution/);
  assert.match(work, /Creative & Cultural Experience/);
});

test("core cases retain explicit role boundaries and avoid unsupported commercial delivery", () => {
  const forbidden =
    /Venus Bridge (?:secured|generated|sold|built the dealer|delivered market entry|acquired distributors)/i;
  for (const item of Object.values(publicCommercialCaseNarratives)) {
    const publicText = JSON.stringify(item);
    assert.doesNotMatch(publicText, forbidden);
    assert.ok(item.whatVenusBridgeDidNotDo.length >= 3);
  }
});
