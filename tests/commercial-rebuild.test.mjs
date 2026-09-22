import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";
import vm from "node:vm";
const read = (path) => fs.readFileSync(path, "utf8");
const load = (path) => {
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(read(path), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
    }).outputText,
    { exports }
  );
  return exports;
};
const { publicCommercialEvidence } = load("content/cases/commercial-template.ts");
const approved = {
  text: { en: "A documented follow-up meeting", zh: "已记录的跟进会议" },
  evidenceSource: "Internal approved record 001",
  verified: true,
  approvedForPublic: true
};
test("future commercial evidence omits absent, unverified, private and unsourced claims", () => {
  assert.equal(publicCommercialEvidence().length, 0);
  for (const record of [
    { ...approved, verified: false },
    { ...approved, approvedForPublic: false },
    { ...approved, evidenceSource: " " },
    { ...approved, text: { en: "Present", zh: "" } }
  ])
    assert.equal(publicCommercialEvidence({ outcome: record }).length, 0);
  const result = publicCommercialEvidence({ meetingStatus: approved });
  assert.equal(result.length, 1);
  assert.equal(result[0].key, "meetingStatus");
  assert.equal(result[0].text.en, approved.text.en);
  assert.equal("evidenceSource" in result[0], false, "internal source identifiers must not become public");
});
test("new service architecture preserves all legacy redirects without chains or missing anchors", () => {
  const rules = read("public/_redirects")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.split(/\s+/));
  const sources = new Set(rules.map(([from]) => from));
  const serviceSource =
    read("app/[lang]/services/page.tsx") + read("components/sections/CommercialSections.tsx");
  for (const [from, to] of rules) {
    if (from === "/") continue;
    assert.equal(sources.has(to.split("#")[0]), false, `${from} has a redirect chain`);
    if (to.includes("#")) {
      const anchor = to.split("#")[1];
      assert.ok(
        serviceSource.includes(`id="${anchor}"`) || ["launch", "readiness", "development"].includes(anchor),
        `${from}: missing ${anchor}`
      );
    }
  }
  for (const lang of ["en", "zh"]) assert.equal(sources.has(`/${lang}/services`), false);
});
test("engagements and partner tracks have substantive bilingual scope", () => {
  const { commercial, engagements, partnerTracks } = load("content/commercial.ts");
  assert.equal(engagements.length, 3);
  assert.equal(partnerTracks.length, 3);
  for (const lang of ["en", "zh"]) {
    assert.equal(commercial.steps[lang].length, 5);
    for (const offer of engagements) {
      assert.ok(offer.title[lang]);
      assert.ok(offer.scope[lang].length >= 4);
      assert.ok(offer.outputs[lang].length >= 3);
    }
  }
  assert.match(engagements[1].title.en, /Launch & Partnership/);
  assert.match(partnerTracks[1].body.en, /not brand endorsement/);
  assert.match(partnerTracks[2].body.en, /commercial terms/);
});

test("pricing checks allow scoped fees and client budget prompts but reject published prices", async () => {
  const { containsPublicPricing } = await import("../scripts/public-pricing-policy.mjs");
  for (const value of [
    "Indicative budget / project scale (optional)",
    "预算或项目规模（选填）",
    "按项目报价，确认范围、职责和费用。",
    "Scope and fees agreed for each project."
  ])
    assert.equal(containsPublicPricing(value), false, value);
  for (const value of ["From £2,000", "USD 500 prices", "500英镑", "固定套餐", "Pricing packages", "起价"])
    assert.equal(containsPublicPricing(value), true, value);
});
