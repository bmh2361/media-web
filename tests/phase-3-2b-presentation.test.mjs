import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");

test("institutional capability explains relationship and process in client language", async () => {
  const page = await source("components/sections/Phase3Capabilities.tsx");
  for (const marker of [
    "What it could involve",
    "Define the knowledge objective",
    "Design the right engagement",
    "Coordinate the engagement",
    "Document where appropriate",
    "Participation is not endorsement"
  ])
    assert.match(page, new RegExp(marker));
  assert.match(page, /<SelectedEngagements records=\{\[\]\}/);
  assert.doesNotMatch(page, /Relationship & Knowledge Proof|Process Proof/);
});

test("institutional publication boundary appears once in each language", async () => {
  const page = await source("components/sections/Phase3Capabilities.tsx");
  const english = "No named institutional project currently passes every public evidence gate";
  const chinese = "当前公开登记中没有通过全部门禁的具名机构项目";
  assert.equal(page.split(english).length - 1, 1);
  assert.equal(page.split(chinese).length - 1, 1);
});

test("no unsupported institutional imagery or invented selected engagement is published", async () => {
  const page = await source("components/sections/Phase3Capabilities.tsx");
  assert.doesNotMatch(
    page,
    /Oxford|Cambridge|Imperial|Top UK University|Leading British Professor|World-Class Institution|Elite Academic/i
  );
  assert.doesNotMatch(
    page,
    /Selected Engagements|Advanced Manufacturing × UK Research Community|Chinese Technology Company × UK Academic Experts|China–UK Industry & University Exchange/
  );
  assert.doesNotMatch(page, /university.*\.(?:jpg|jpeg|png|webp|avif)/i);
});

test("visual capabilities retain real media while public architecture stays frozen", async () => {
  const page = await source("components/sections/Phase3Capabilities.tsx");
  const homepage = await source("components/sections/Phase3Homepage.tsx");
  const phase3 = await source("content/phase3.ts");
  assert.match(page, /EditorialScene/);
  assert.doesNotMatch(page, /Visual Proof/);
  assert.equal((homepage.match(/data-home-section=/g) ?? []).length, 8);
  for (const label of ["Capabilities", "Work", "About", "Contact"]) assert.match(phase3, new RegExp(label));
  assert.doesNotMatch(phase3.match(/nav: \{[\s\S]*?\n  \},/)?.[0] ?? "", /Universities|Creators|Models/);
});

test("evidence maturity and flywheel infrastructure are ready", async () => {
  const schema = await source("content/evidence/case-evidence.ts");
  const flywheel = await source("docs/phase-3-2-evidence-flywheel.md");
  for (const state of ["PRIVATE", "ANONYMOUS_PUBLIC", "NAMED_PUBLIC", "FEATURED"])
    assert.match(schema, new RegExp(state));
  for (const proof of ["VISUAL", "RELATIONSHIP", "PROCESS"]) assert.match(schema, new RegExp(proof));
  for (const dimension of ["ACCESS", "ORCHESTRATION", "EXECUTION"])
    assert.match(schema, new RegExp(dimension));
  for (const evidence of [
    "Context image",
    "Interaction image",
    "Execution image",
    "Project description",
    "Venus Bridge role",
    "Output record",
    "Rights record",
    "Results record"
  ])
    assert.match(flywheel, new RegExp(evidence, "i"));
});
