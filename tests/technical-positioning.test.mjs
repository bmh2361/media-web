import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import test from "node:test";
const load = (file) => {
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
    }).outputText,
    { exports }
  );
  return exports;
};
const { teamMembers } = load("content/team.ts");
const minghan = teamMembers.find((member) => member.slug === "minghan");

test("Minghan has an engineering doctorate and a personally endorsed Global Talent visa", () => {
  assert.match(minghan.credential.en, /PhD in Chemical & Process Engineering, University of Leeds/);
  assert.match(
    minghan.credential.en,
    /Global Talent Visa holder, endorsed by the Royal Academy of Engineering/
  );
  assert.match(minghan.credential.zh, /利兹大学化学与过程工程博士/);
  assert.match(minghan.credential.zh, /英国皇家工程院背书全球人才签证持有人/);
  const copy = JSON.stringify(minghan);
  assert.doesNotMatch(
    copy,
    /PhD[ ·in]*Artificial Intelligence|Royal Academy of Engineering GTV Global Talent recipient|Royal Academy of Engineering-certified|皇家工学院/
  );
  assert.match(minghan.expertiseSummary.en, /multiphase-flow measurement/);
  assert.match(minghan.expertiseSummary.en, /railway microgrid research/);
});

test("Minghan leads energy and applied AI with client-facing industrial expertise", () => {
  assert.equal(minghan.role.en, "Co-Founder · Energy, AI & Technology Strategy");
  assert.equal(minghan.specialism.en, "Energy systems, applied AI & industrial technology");
  assert.equal(minghan.specialism.zh, "能源系统、应用人工智能与工业技术");
  assert.deepEqual(
    Array.from(minghan.expertise, (item) => item.en),
    ["Energy Systems", "Applied AI", "Industrial Technology", "Technical Commercialisation"]
  );
  assert.match(minghan.clientValue.en, /UK commercial, research and industry stakeholders/);
  assert.doesNotMatch(
    JSON.stringify(minghan),
    /AI workflows|Technical governance|Technology Strategy & Architecture/
  );
});

test("personal research and visa endorsement are distinct from company delivery and endorsement", () => {
  assert.match(minghan.expertiseSummary.en, /personal research experience, not Venus Bridge client delivery/);
  assert.match(minghan.credential.en, /personal visa endorsement, not an endorsement of Venus Bridge/);
  assert.match(minghan.credential.zh, /不代表对 Venus Bridge 的背书/);
  for (const member of teamMembers.filter((member) => member.slug !== "minghan"))
    assert.doesNotMatch(JSON.stringify(member), /Royal Academy|皇家工程院/);
  for (const file of [
    "content/portfolio.ts",
    "content/brand.ts",
    "lib/structured-data.ts",
    "lib/brand/venusBridgeMedia.ts"
  ])
    assert.doesNotMatch(fs.readFileSync(file, "utf8"), /Royal Academy|皇家工程院/);
});

test("priority hierarchy is focused and the European route starts with the requirement", () => {
  const { commercial, partnerTracks } = load("content/commercial.ts");
  assert.deepEqual(Array.from(commercial.sectors.en), [
    "AI, Robotics & Intelligent Systems",
    "Energy & Smart Infrastructure",
    "Mobility & Automotive Technology"
  ]);
  assert.match(commercial.adjacent.en, /clear UK market-entry fit/);
  assert.match(
    commercial.demandIntroduction.en,
    /Start with the UK or European requirement, then assess whether/
  );
  assert.match(
    partnerTracks[0].body.en,
    /whether a relevant Chinese technology or company is worth progressing/
  );
});
