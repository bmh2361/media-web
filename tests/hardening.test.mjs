import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import test from "node:test";
import { promisify } from "node:util";
import { handleContactRequest, validateContactPayload } from "../functions/api/contact.ts";
import {
  isAnalyticsReady,
  isContactFormReady,
  isLegalIdentityReady,
  isSitePublicationReady
} from "../lib/release-policy.ts";

const read = (file) => fs.readFile(new URL(`../${file}`, import.meta.url), "utf8");
const execFileAsync = promisify(execFile);
const now = Date.now();
const validPayload = {
  intent: "company",
  name: "Test Person",
  company_or_organisation: "Test Company",
  role_or_title: "Director",
  work_email: "person@business.test",
  market_or_location: "United Kingdom",
  goal_and_timing: "Assess the next stage this quarter",
  project_summary: "A sufficiently detailed initial project summary for validation.",
  consent: true,
  website: "",
  started_at: now - 5000,
  turnstile_token: "verified-token"
};

test("contact payload accepts only the controlled intent and schema", () => {
  assert.equal(validateContactPayload(validPayload, now).ok, true);
  assert.equal(validateContactPayload({ ...validPayload, intent: "unknown" }, now).ok, false);
  assert.equal(validateContactPayload({ ...validPayload, extra: "value" }, now).ok, false);
});

test("client intent preselection validates query input and falls back to other", async () => {
  const form = await read("components/sections/EnquiryForm.tsx");
  assert.match(form, /intents\.includes\(requested as Intent\)/);
  assert.match(form, /: "other"/);
  assert.match(form, /new URLSearchParams\(window\.location\.search\)/);
});

test("contact payload rejects honeypot, too-fast and stale submissions", () => {
  assert.equal(validateContactPayload({ ...validPayload, website: "spam" }, now).ok, false);
  assert.equal(validateContactPayload({ ...validPayload, started_at: now - 100 }, now).ok, false);
  assert.equal(validateContactPayload({ ...validPayload, started_at: now - 90_000_000 }, now).ok, false);
});

const makeEnvironment = () => {
  const dedupe = new Map();
  return {
    CONTACT_FORM_ENABLED: "true",
    CONTACT_PRIVACY_PROCESSING_APPROVED: "true",
    CONTACT_PUBLIC_IDENTITY_CONFIRMED: "true",
    CONTACT_DELIVERY_VERIFIED: "true",
    CONTACT_CHANNELS_CONFIRMED: "true",
    CONTACT_ALLOWED_ORIGINS: "https://www.venusbridge.co.uk",
    CONTACT_WEBHOOK_URL: "https://workflow.vendor.test/enquiry",
    CONTACT_WEBHOOK_SECRET: "test-secret",
    TURNSTILE_SECRET_KEY: "turnstile-secret",
    CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
    CONTACT_DEDUPLICATION: {
      get: async (key) => dedupe.get(key) ?? null,
      put: async (key, value) => dedupe.set(key, value)
    }
  };
};

const makeRequest = (body = JSON.stringify(validPayload), headers = {}) =>
  new Request("https://www.venusbridge.co.uk/api/contact", {
    method: "POST",
    body,
    headers: {
      "content-type": "application/json",
      origin: "https://www.venusbridge.co.uk",
      "cf-connecting-ip": "192.0.2.1",
      ...headers
    }
  });

test("contact endpoint rejects disallowed origins and malformed JSON without stack leakage", async () => {
  const env = makeEnvironment();
  const originResponse = await handleContactRequest(
    makeRequest(undefined, { origin: "https://evil.test" }),
    env
  );
  assert.equal(originResponse.status, 403);
  const malformed = await handleContactRequest(makeRequest("{"), env);
  assert.equal(malformed.status, 400);
  assert.doesNotMatch(await malformed.text(), /stack|functions[\\/]api/i);
});

test("contact endpoint verifies Turnstile, signs delivery and deduplicates", async () => {
  const env = makeEnvironment();
  const deliveries = [];
  const fetcher = async (input, init) => {
    if (String(input).includes("turnstile")) return Response.json({ success: true });
    deliveries.push({ input: String(input), init });
    return new Response(null, { status: 202 });
  };
  const accepted = await handleContactRequest(makeRequest(), env, fetcher);
  assert.equal(accepted.status, 202);
  assert.match(deliveries[0].init.headers["x-venus-bridge-signature"], /^sha256=[a-f0-9]{64}$/);
  assert.match(deliveries[0].init.headers["x-venus-bridge-idempotency-key"], /^[a-f0-9]{64}$/);
  const delivered = JSON.parse(deliveries[0].init.body);
  assert.equal(delivered.idempotency_key, deliveries[0].init.headers["x-venus-bridge-idempotency-key"]);
  assert.equal(delivered.request_id, deliveries[0].init.headers["x-venus-bridge-request-id"]);
  assert.doesNotMatch(deliveries[0].init.body, /turnstile_token|started_at/);
  const duplicate = await handleContactRequest(makeRequest(), env, fetcher);
  assert.equal(duplicate.status, 409);
});

test("delivery failure returns a retryable error and the client resets the consumed Turnstile token", async () => {
  const env = makeEnvironment();
  const response = await handleContactRequest(makeRequest(), env, async (input) =>
    String(input).includes("turnstile")
      ? Response.json({ success: true })
      : new Response(null, { status: 502 })
  );
  assert.equal(response.status, 502);
  const form = await read("components/sections/EnquiryForm.tsx");
  assert.match(form, /resetTurnstile\(\)/);
  assert.match(form, /turnstile\?\.reset\(\)/);
});

test("a post-delivery KV failure is operationally signalled without telling the user delivery failed", async () => {
  const env = makeEnvironment();
  env.CONTACT_DEDUPLICATION.put = async () => {
    throw new Error("KV unavailable");
  };
  const originalError = console.error;
  const signals = [];
  console.error = (...args) => signals.push(args);
  try {
    const response = await handleContactRequest(makeRequest(), env, async (input) =>
      String(input).includes("turnstile")
        ? Response.json({ success: true })
        : new Response(null, { status: 202 })
    );
    assert.equal(response.status, 202);
    assert.equal((await response.json()).ok, true);
    assert.equal(signals[0][0], "contact_deduplication_write_failed");
  } finally {
    console.error = originalError;
  }
});

test("contact endpoint fails closed without required abuse-protection bindings", async () => {
  const env = makeEnvironment();
  delete env.CONTACT_RATE_LIMITER;
  const response = await handleContactRequest(makeRequest(), env);
  assert.equal(response.status, 503);
});

test("preview contact endpoint requires explicit safe preview bindings", async () => {
  const env = makeEnvironment();
  const request = new Request("https://feature.pages.dev/api/contact", {
    method: "POST",
    body: JSON.stringify(validPayload),
    headers: { "content-type": "application/json", origin: "https://www.venusbridge.co.uk" }
  });
  assert.equal((await handleContactRequest(request, env)).status, 503);
  env.CONTACT_PREVIEW_RUNTIME_APPROVED = "true";
  const response = await handleContactRequest(request, env, async (input) =>
    String(input).includes("turnstile")
      ? Response.json({ success: true })
      : new Response(null, { status: 202 })
  );
  assert.equal(response.status, 202);
});

test("contact endpoint enforces body, rate and Turnstile failure boundaries", async () => {
  const env = makeEnvironment();
  const oversized = await handleContactRequest(makeRequest(undefined, { "content-length": "20000" }), env);
  assert.equal(oversized.status, 413);
  env.CONTACT_RATE_LIMITER = { limit: async () => ({ success: false }) };
  const limited = await handleContactRequest(makeRequest(), env);
  assert.equal(limited.status, 429);
  env.CONTACT_RATE_LIMITER = { limit: async () => ({ success: true }) };
  const unverified = await handleContactRequest(makeRequest(), env, async () =>
    Response.json({ success: false })
  );
  assert.equal(unverified.status, 403);
  assert.doesNotMatch(await unverified.text(), /stack|secret|project_summary/i);
});

const completeGateInput = {
  productionProfileConfigured: true,
  portfolioReady: true,
  legalIdentityComplete: true,
  legalReviewConfirmed: true,
  publicDetailsConfirmed: true,
  privacyApproved: true,
  termsApproved: true,
  approvedMediaConfirmed: true,
  publicCaseEvidenceConfirmed: true,
  contactChannelsConfirmed: true,
  productionUrlReady: true,
  indexingRequested: true,
  previewDeployment: false,
  contactFormRequested: false,
  contactPrivacyProcessingApproved: false,
  contactPublicIdentityConfirmed: false,
  turnstileSiteKeyConfigured: false,
  contactDeliveryVerified: false,
  previewContactBuildApproved: false,
  analyticsRequested: false,
  analyticsProviderConfigured: false,
  analyticsPropertyConfigured: false,
  analyticsPrivacyApproved: false
};

test("scenario A: site publication is independent of disabled form and analytics", () => {
  assert.equal(isLegalIdentityReady(completeGateInput), true);
  assert.equal(isSitePublicationReady(completeGateInput), true);
  assert.equal(isContactFormReady(completeGateInput), false);
  assert.equal(isAnalyticsReady(completeGateInput), false);
  assert.equal(isSitePublicationReady({ ...completeGateInput, contactDeliveryVerified: false }), true);
});

test("scenario B: incomplete contact infrastructure does not change publication", () => {
  const input = {
    ...completeGateInput,
    contactFormRequested: true,
    contactPrivacyProcessingApproved: true,
    contactPublicIdentityConfirmed: true,
    turnstileSiteKeyConfigured: true,
    contactDeliveryVerified: false
  };
  assert.equal(isSitePublicationReady(input), true);
  assert.equal(isContactFormReady(input), false);
});

test("scenario C: previews are noindex and forms require explicit safe bindings", () => {
  const preview = {
    ...completeGateInput,
    previewDeployment: true,
    contactFormRequested: true,
    contactPrivacyProcessingApproved: true,
    contactPublicIdentityConfirmed: true,
    turnstileSiteKeyConfigured: true,
    contactDeliveryVerified: true
  };
  assert.equal(isSitePublicationReady(preview), false);
  assert.equal(isContactFormReady(preview), false);
  assert.equal(isContactFormReady({ ...preview, previewContactBuildApproved: true }), true);
});

test("scenario D: incomplete legal identity fails publication closed", () => {
  const incomplete = { ...completeGateInput, legalIdentityComplete: false };
  assert.equal(isLegalIdentityReady(incomplete), false);
  assert.equal(isSitePublicationReady(incomplete), false);
  assert.equal(isContactFormReady({ ...incomplete, contactFormRequested: true }), false);
});

test("release, SEO and schema consume the separated fail-closed gates", async () => {
  const [release, seo, schema, robots, sitemap] = await Promise.all(
    ["lib/release.ts", "lib/seo.ts", "lib/structured-data.ts", "app/robots.ts", "app/sitemap.ts"].map(read)
  );
  for (const predicate of [
    "isSitePublicationReady",
    "isLegalIdentityReady",
    "isContactFormReady",
    "isAnalyticsReady"
  ]) {
    assert.match(release, new RegExp(predicate));
  }
  assert.match(seo, /isIndexingAllowed/);
  assert.match(schema, /getProductionReadiness/);
  assert.match(robots, /isIndexingAllowed/);
  assert.match(sitemap, /isIndexingAllowed/);
});

test("form activation cannot contradict future-conditional Privacy copy", async () => {
  const release = await read("lib/release.ts");
  assert.match(release, /approvedCurrentFormPrivacyVersion: string \| null = null/);
  assert.match(release, /Boolean\(approvedCurrentFormPrivacyVersion\)/);
});

test("Cloudflare routes source exposes only /api/contact to Functions", async () => {
  const routes = JSON.parse(await read("public/_routes.json"));
  assert.deepEqual(routes.include, ["/api/contact"]);
  for (const route of ["/en", "/en/*", "/zh", "/zh/*", "/_next/static/*", "/media/*", "/og/*"])
    assert.ok(routes.exclude.includes(route));
  assert.equal(await fs.stat(new URL("../functions/api/contact.ts", import.meta.url)).then(() => true), true);
});

test("strict production readiness permits indexing only on the configured production branch", async () => {
  const fixture = {
    ...process.env,
    RELEASE_PROFILE: "production",
    LEGAL_ENTITY_MODE: "pre-incorporation",
    PUBLIC_WORK_MODE: "portfolio",
    LEGAL_REVIEW_CONFIRMED: "true",
    PUBLIC_COMPANY_DETAILS_CONFIRMED: "true",
    APPROVED_MEDIA_CONFIRMED: "true",
    PUBLIC_CASE_EVIDENCE_CONFIRMED: "true",
    CONTACT_CHANNELS_CONFIRMED: "true",
    PRIVACY_NOTICE_COMPLETE: "true",
    TERMS_NOTICE_COMPLETE: "true",
    NEXT_PUBLIC_SITE_URL: "https://www.venusbridge.co.uk",
    NEXT_PUBLIC_PRIVACY_CONTROLLER_NAME: "fixture-controller",
    NEXT_PUBLIC_BUSINESS_EMAIL: "fixture@venusbridge.co.uk",
    NEXT_PUBLIC_PRIVACY_EMAIL: "privacy@venusbridge.co.uk",
    NEXT_PUBLIC_LEGAL_APPROVAL_STATUS: "approved",
    NEXT_PUBLIC_TERMS_APPROVAL_STATUS: "approved",
    NEXT_PUBLIC_PRIVACY_EFFECTIVE_DATE: "2026-08-31",
    NEXT_PUBLIC_TERMS_EFFECTIVE_DATE: "2026-08-31",
    RELEASE_INDEXING_ENABLED: "true",
    CF_PAGES_BRANCH: "main",
    CF_PAGES_PRODUCTION_BRANCH: "main"
  };
  const { stdout } = await execFileAsync(process.execPath, ["scripts/production-readiness.mjs", "--strict"], {
    cwd: new URL("../", import.meta.url),
    env: fixture
  });
  const report = JSON.parse(stdout);
  assert.equal(report.productionReady, true);
  assert.equal(report.indexingAllowed, true);
  const preview = JSON.parse(
    (
      await execFileAsync(process.execPath, ["scripts/production-readiness.mjs"], {
        cwd: new URL("../", import.meta.url),
        env: { ...fixture, CF_PAGES_BRANCH: "feature-preview" }
      })
    ).stdout
  );
  assert.equal(preview.indexingAllowed, false);
});

test("measurement is allowlisted and excludes sensitive contact fields", async () => {
  const measurement = await read("lib/measurement.ts");
  for (const event of ["contact_view", "contact_start", "contact_submit_success", "wechat_copy"])
    assert.match(measurement, new RegExp(`"${event}"`));
  const propertyAllowlist =
    measurement.match(/measurementPropertyNames = \[([\s\S]*?)\] as const/)?.[1] ?? "";
  for (const forbidden of ["name", "email", "company", "project_summary", "full_referrer"])
    assert.doesNotMatch(propertyAllowlist, new RegExp(`\\b${forbidden}\\b`));
  assert.match(measurement, /isAnalyticsReady/);
  assert.match(measurement, /providerConfigured \? new EventBusAdapter\(\) : null/);
});

test("future evidence classes do not relabel the existing portfolio", async () => {
  const [evidence, portfolio] = await Promise.all([
    read("content/evidence/case-evidence.ts"),
    read("content/portfolio.ts")
  ]);
  for (const classification of ["MARKET_VALIDATION", "BUYER_DISTRIBUTOR_ENGAGEMENT", "EXHIBITION_FULL_CYCLE"])
    assert.match(evidence, new RegExp(classification));
  assert.doesNotMatch(portfolio, /evidenceClass:\s*"(?:MARKET_VALIDATION|BUYER_DISTRIBUTOR_ENGAGEMENT)"/);
});
