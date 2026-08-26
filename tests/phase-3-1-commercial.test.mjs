import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");

test("Phase 3.1 defines exactly four commercial project types with buying fields", async () => {
  const content = await source("content/phase3.ts");
  const titles = ["International Credibility Project", "UK Industry Presence Project", "International Brand Activation", "UK Brand Content Production"];
  for (const title of titles) assert.match(content, new RegExp(title));
  assert.equal(titles.filter((title) => content.includes(title)).length, 4);
  for (const field of ["objective:", "activity:", "outputs:", "capabilities:", "proof:"])
    assert.ok((content.match(new RegExp(field, "g")) ?? []).length >= 8);
  assert.doesNotMatch(content, /Gold|Platinum|Starting from|Book Strategy Session|Get Started/i);
});

test("project-type rendering exposes objective activity outputs capabilities and proof", async () => {
  const page = await source("components/sections/Phase3Capabilities.tsx");
  for (const marker of ["programme.objective", "programme.activity", "programme.outputs", "programme.capabilities", "programme.proof"])
    assert.match(page, new RegExp(marker.replace(".", "\\.")));
  assert.match(page, /`\/work\/\$\{programme\.proof\.slug\}`/);
});

test("Work is driven by the ordered published commercial case dataset", async () => {
  const work = await source("components/sections/PortfolioWork.tsx");
  const portfolio = await source("content/portfolio.ts");
  assert.match(portfolio, /sortOrder: commercialOrder\.indexOf\(spec\.slug\) \+ 1/);
  assert.match(work, /publishedPortfolioProjects/);
  assert.match(work, /CommercialCaseIndex/);
  assert.doesNotMatch(work, /Execution Case|Capability Evidence|Proves/);
});

test("Level D claims remain non-public and institutional wording remains conditional", async () => {
  const content = await source("content/phase3.ts");
  assert.match(content, /institutional-endorsement[\s\S]*NOT_SAFE_TO_PUBLISH[\s\S]*public: false/);
  assert.match(content, /full-market-entry[\s\S]*NOT_SAFE_TO_PUBLISH[\s\S]*public: false/);
  assert.match(content, /May include a legitimate expert conversation/);
  assert.doesNotMatch(content, /top universities|exclusive expert network|academic endorsement|university endorsement package/i);
});

test("homepage stays at eight sections without overloading capability cards", async () => {
  const page = await source("components/sections/Phase3Homepage.tsx");
  assert.equal((page.match(/data-home-section=/g) ?? []).length, 8);
  assert.doesNotMatch(page, /item\.examples\.slice\(0, 3\)/);
});

test("contact stays low-friction and routes company, partner and other intent", async () => {
  const contact = await source("components/sections/ContactExperience.tsx");
  for (const label of ["Company project", "Introduce an organisation", "Institutional or other enquiry", "Collaborator type"])
    assert.match(contact, new RegExp(label.replace("/", "\\/")));
  assert.match(contact, /name="objective"/);
  assert.doesNotMatch(contact, /budget|pricing|package/i);
});

test("Phase 3.1 governance and owner reports exist", async () => {
  for (const path of ["docs/phase-3-1-commercial-audit.md", "docs/phase-3-1-proof-matrix.md", "docs/phase-3-1-owner-evidence-pipeline.md", "docs/phase-3-1-release-owner-checklist.md", "docs/phase-3-1-persona-commercial-test.md"])
    assert.ok((await source(path)).length > 500, `${path} should contain a substantive record`);
});
