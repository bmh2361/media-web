import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");
const execFileAsync = promisify(execFile);

test("all required page media IDs remain registered", async () => {
  const media = await source("content/media.ts");
  const required = [
    "home-hero-primary",
    "production-hero",
    "talent-hero",
    "research-hero",
    "events-hero",
    "agency-hero"
  ];
  for (const id of required) assert.match(media, new RegExp(`"${id}"`));
});

test("metadata keeps language alternates and 1200 by 630 Open Graph images", async () => {
  const seo = await source("lib/seo.ts");
  assert.match(seo, /"en-GB"/);
  assert.match(seo, /"zh-CN"/);
  assert.match(seo, /width: 1200/);
  assert.match(seo, /height: 630/);
});

test("the homepage uses explicit bilingual headline lines", async () => {
  const home = await source("content/pages/home.ts");
  assert.equal((home.match(/titleLines:/g) ?? []).length, 2);
  assert.doesNotMatch(await source("components/sections/Hero.tsx"), /splitHeadline/);
});

test("canonical cases provide disclosure and contact compatibility helpers", async () => {
  const cases = await source("content/cases/index.ts");
  assert.match(cases, /getCaseDisclosureLabel/);
  assert.match(cases, /getCaseProjectType/);
  assert.match(cases, /"technology-content": "video"/);
  assert.doesNotMatch(await source("app/[lang]/page.tsx"), /workPage|work\.cases/);
  assert.match(cases, /evidenceState: "unverified"/);
  assert.match(await source("content/types.ts"), /EvidenceState/);
});

test("language switch contract preserves the current localized route and query", async () => {
  const i18n = await source("lib/i18n.ts");
  assert.match(i18n, /switchLanguagePath/);
  assert.match(i18n, /search\.replace/);
  assert.match(await source("components/layout/Footer.tsx"), /LanguageSwitcher/);
});

test("responsibility ownership is authored as content instead of index-derived markup", async () => {
  const responsibilities = await source("content/responsibilities.ts");
  assert.match(responsibilities, /eventResponsibilityRows/);
  assert.match(responsibilities, /agencyResponsibilityRows/);
  assert.doesNotMatch(
    await source("components/sections/experiences/EventsExhibitionsExperience.tsx"),
    /index\s*%/
  );
  assert.doesNotMatch(
    await source("components/sections/experiences/AgencySupportExperience.tsx"),
    /index\s*%/
  );
});

test("content validator enforces the release content contract", async () => {
  const { stdout } = await execFileAsync(process.execPath, ["scripts/validate-content.mjs"], {
    cwd: new URL("../", import.meta.url)
  });
  assert.match(stdout, /Content validation passed/);
});

test("content validator rejects an injected contract violation", async () => {
  await assert.rejects(
    execFileAsync(process.execPath, ["scripts/validate-content.mjs"], {
      cwd: new URL("../", import.meta.url),
      env: { ...process.env, VALIDATE_CONTENT_TEST_INJECT_VIOLATION: "1" }
    }),
    /Injected content-contract violation/
  );
});

test("each existing service pillar has an operational proof record", async () => {
  const proof = await source("content/service-proof.ts");
  for (const service of ["commercial", "talent", "research", "events", "agency"])
    assert.match(proof, new RegExp(`${service}: \\{`));
  for (const field of [
    "clientProblem",
    "capabilities",
    "deliverables",
    "dependencies",
    "approvals",
    "frameBridge",
    "client",
    "nextStep",
    "relatedModels"
  ])
    assert.match(proof, new RegExp(`${field}:`));
});
