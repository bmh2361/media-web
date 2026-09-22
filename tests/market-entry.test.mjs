import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import test from "node:test";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");
const execFileAsync = promisify(execFile);

test("market entry supports hidden, coordination and partnered modes with a conservative default", async () => {
  const release = await source("lib/release.ts");
  assert.match(release, /\["hidden", "coordination", "partnered"\]/);
  assert.match(release, /config\.profile === "production" \? "hidden" : "coordination"/);
  assert.match(release, /requested === "partnered" && !hasPartneredMarketEntryNetwork/);
  assert.match(await source(".env.example"), /PUBLIC_MARKET_ENTRY_MODE=/);
});

test.skip("market entry is a core client route while professional work remains release-gated", async () => {
  assert.match(await source("content/information-architecture.ts"), /Enter the UK Market/);
  assert.match(await source("app/sitemap.ts"), /\/what-we-do\/enter-the-uk/);
  assert.match(await source("content/navigation.ts"), /\/what-we-do\/enter-the-uk/);
  assert.match(await source("components/sections/ContactForm.tsx"), /Enter the UK market/);
  assert.match(await source("app/api/contact/route.ts"), /getEffectiveMarketEntryMode\(\) === "hidden"/);
});

test("retired partnered copy remains governed without blocking the canonical release surface", async () => {
  const content = await source("content/market-entry.ts");
  assert.match(content, /marketEntryPartners: MarketEntryPartner\[\] = \[\]/);
  assert.match(content, /qualificationsVerified/);
  assert.match(content, /insuranceVerified/);
  assert.match(content, /dataSharingTermsApproved/);
  assert.match(content, /logoPermission/);
  const result = await execFileAsync(
    process.execPath,
    ["scripts/validate-release.mjs", "--profile=production"],
    {
      cwd: new URL("../", import.meta.url),
      env: { ...process.env, RELEASE_PROFILE: "production", PUBLIC_MARKET_ENTRY_MODE: "partnered" }
    }
  ).catch((error) => error);
  assert.notEqual(result.code, 0);
  assert.match(result.stdout, /legacyFindings/);
  assert.match(result.stdout, /Partner records remain governed/);
  assert.doesNotMatch(result.stdout, /Partnered mode requires at least one fully verified/);
});

test("legacy market entry redirects to canonical services and excludes professional claims", async () => {
  const page = await source("app/[lang]/services/uk-market-entry/page.tsx");
  const content = await source("content/market-entry.ts");
  assert.match(page, /redirect\(withLanguage\("\/services"/);
  assert.doesNotMatch(page, /LegalService|AccountingService|FinancialService|InvestmentService/);
  for (const value of [
    "guaranteed compliance",
    "guaranteed registration",
    "guaranteed bank account",
    "legal advice by Venus Bridge",
    "legal advice by Venus Bridge Media",
    "fully compliant marketing",
    "legally approved by us"
  ])
    assert.doesNotMatch(content, new RegExp(value, "i"));
});

test("contact captures market-entry context without identity document uploads", async () => {
  const form = await source("components/sections/ContactForm.tsx");
  const validation = await source("lib/contact/validation.ts");
  assert.match(validation, /marketEntryNeedKeys/);
  assert.match(validation, /investorCommunication/);
  assert.match(form, /Market-entry workstreams to coordinate/);
  assert.match(form, /Do not send passports, identity documents, bank details/);
  assert.doesNotMatch(form, /type="file"/);
  assert.doesNotMatch(validation, /passport|identityDocument|bankDetails|kycFile/i);
});

test("four roadshow concepts remain scenarios and investor communications are blocked", async () => {
  const roadshows = await source("content/roadshows.ts");
  for (const type of ["brand-launch", "investor-partner", "product-buyer", "innovation-industry"])
    assert.match(roadshows, new RegExp(`scenarioType: "${type}"`));
  assert.equal((roadshows.match(/publicStatus: "scenario"/g) ?? []).length, 4);
  assert.match(roadshows, /type: "financial-promotion"[\s\S]{0,180}status: "blocked"/);
  assert.match(roadshows, /blocksProductionRelease: true/);
  assert.match(roadshows, /blocksCampaignRelease: true/);
  assert.match(roadshows, /status: "concept"/);
  assert.match(roadshows, /It is not completed client work/);
});

test("official sources carry review dates and stale sources are release-gated", async () => {
  const content = await source("content/market-entry.ts");
  const validator = await source("scripts/validate-release.mjs");
  for (const authority of ["Companies House", "HMRC", "ICO", "ASA_CAP", "FCA", "UKIPO"])
    assert.match(content, new RegExp(`authority: "${authority}"`));
  assert.match(content, /lastCheckedAt/);
  assert.match(content, /nextReviewAt/);
  assert.match(validator, /expiredReviewDates/);
  assert.match(validator, /market-entry-source-review/);
});
