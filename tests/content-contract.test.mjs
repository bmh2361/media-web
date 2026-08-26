import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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

test("the homepage uses fluid bilingual headlines without forced line fragments", async () => {
  const home = await source("content/pages/home.ts");
  const hero = await source("components/sections/Hero.tsx");
  assert.doesNotMatch(home, /titleLines:/);
  assert.match(home, /Your UK brand, launch and local execution partner\./);
  assert.match(home, /中国企业在英国的品牌、发布与本地执行伙伴。/);
  assert.match(hero, /text-balance/);
  assert.doesNotMatch(hero, /splitHeadline|titleLines/);
});

test("approved Venus Bridge brand variants resolve from the canonical asset package", async () => {
  const config = await source("lib/brand/venusBridgeMedia.ts");
  for (const variant of ["mark", "name", "tagline", '"full-transparent"'])
    assert.match(config, new RegExp(`${variant}:`));
  assert.match(config, /name: "Venus Bridge"/);
  assert.doesNotMatch(config, /\/brand\/venus_bridge_brand_assets\//);
  for (const asset of [
    "public/brand/venus-bridge/webp/venus-bridge-monogram-white.webp",
    "public/brand/venus-bridge/webp/venus-bridge-horizontal-lockup-white.webp",
    "public/brand/venus-bridge/webp/venus-bridge-horizontal-lockup-black.webp",
    "public/brand/venus-bridge/favicon/venus-bridge-icon-192.png",
    "public/brand/venus-bridge/favicon/venus-bridge-icon-512.png"
  ]) await access(new URL(asset, root));
});

test("public brand surfaces no longer render the previous brand name", async () => {
  const files = [
    "components/layout/Header.tsx",
    "components/layout/Footer.tsx",
    "components/motion/OpeningSequenceProvider.tsx",
    "components/sections/Hero.tsx",
    "content/brand.ts",
    "lib/seo.ts",
    "lib/structured-data.ts"
  ];
  for (const file of files) assert.doesNotMatch(await source(file), /FrameBridge|FRAMEBRIDGE/, file);
});

test("canonical cases provide disclosure and contact compatibility helpers", async () => {
  const cases = await source("content/cases/index.ts");
  assert.match(cases, /getCaseDisclosureLabel/);
  assert.match(cases, /getCaseProjectType/);
  assert.match(cases, /"technology-content": "video"/);
  assert.doesNotMatch(await source("app/[lang]/page.tsx"), /workPage|work\.cases/);
  assert.match(cases, /evidenceState: "unverified"/);
  assert.match(await source("content/types.ts"), /EvidenceState/);
  assert.match(await source("content/types.ts"), /"verified" \| "anonymised" \| "confidential" \| "concept"/);
  assert.match(cases, /clientNameDisclosure: "withheld"/);
  assert.match(cases, /mediaApproval: "placeholder"/);
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

test("public source contains no pricing, package or predefined range language", async () => {
  const files = [
    "components/sections/ContactForm.tsx",
    "components/sections/QuickEnquiryForm.tsx",
    "lib/contact/validation.ts",
    "content/site.ts",
    "content/service-proof.ts",
    "app/[lang]/privacy/page.tsx",
    "app/[lang]/terms/page.tsx"
  ];
  const prohibited =
    /\b(?:pricing|prices?|packages?|budgets?|starting from)\b|(?:报价|价格|预算|套餐|起价|费用|价位|收费)/i;
  for (const file of files) assert.doesNotMatch(await source(file), prohibited, file);
});

test("phase 7 media manifest supports production replacement governance", async () => {
  const media = await source("content/media.ts");
  for (const field of [
    "MediaApprovalStatus",
    "mobileSource",
    "approvalStatus",
    "projectId",
    "clientApprovalRequired",
    "assetPriority",
    "focalPoint",
    "captions",
    "transcript"
  ])
    assert.match(media, new RegExp(field));
  assert.match(media, /criticalMediaGovernance/);
  assert.match(await source("components/media/MediaSlot.tsx"), /item\.mobileSource/);
  assert.doesNotMatch(await source("components/media/MediaSlot.tsx"), /poster=\{item\.poster \?\?/);
});

test("real project governance fails closed for unapproved records", async () => {
  const template = await source("content/cases/template.ts");
  assert.match(template, /verified projects require approved project media/);
  assert.match(template, /verified projects require a confirmed project date/);
  assert.match(template, /anonymised projects cannot expose a client display name/);
  assert.match(template, /confidential projects must withhold the client name/);
  assert.match(template, /concept projects require bilingual public disclosure/);
});

test("company, legal and indexing configuration is centralised", async () => {
  const company = await source("content/company.ts");
  for (const field of [
    "legalName",
    "companyNumber",
    "registeredOffice",
    "privacyContact",
    "legalApprovalStatus",
    "termsApprovalStatus",
    "privacyEffectiveDate",
    "termsEffectiveDate"
  ])
    assert.match(company, new RegExp(field));
  assert.match(await source("lib/seo.ts"), /indexable/);
  assert.match(await source("app/robots.ts"), /disallow: "\/"/);
});

test.skip("work publishing keeps only approved portfolio records in the public route", async () => {
  const release = await source("lib/release.ts");
  const sitemap = await source("app/sitemap.ts");
  const workPage = await source("app/[lang]/work/page.tsx");
  const casePage = await source("app/[lang]/work/[slug]/page.tsx");
  assert.match(release, /\["hidden", "scenarios", "portfolio"\]/);
  assert.match(release, /profile === "production" \? "hidden" : "scenarios"/);
  assert.match(sitemap, /workMode === "hidden" \? \[\] : portfolioProjects/);
  assert.match(workPage, /mode === "hidden"\) notFound/);
  assert.match(casePage, /allowIndex: process\.env\.RELEASE_PROFILE === "production"/);
  assert.match(casePage, /portfolioProjects/);
  assert.doesNotMatch(casePage, /caseStudies|Production Scenario/);
});

test("UK Fit Call and Execution Brief use distinct required fields", async () => {
  const validation = await source("lib/contact/validation.ts");
  const forms = await source("components/sections/CommercialContactForms.tsx");
  assert.match(validation, /enquiryType === "quick" && !data\.email/);
  assert.match(validation, /enquiryType === "full" && !data\.company/);
  assert.doesNotMatch(validation, /enquiryType === "quick" && !data\.role/);
  assert.doesNotMatch(validation, /enquiryType === "quick" && !data\.timing/);
  assert.doesNotMatch(validation, /enquiryType === "quick" && !data\.mainUncertainty/);
  assert.match(validation, /!data\.deliverables/);
  assert.match(forms, /Company website \(optional\)/);
  assert.match(forms, /Not sure yet/);
  assert.doesNotMatch(forms, /name="role"/);
  assert.doesNotMatch(forms, /name="mainUncertainty"/);
  assert.match(forms, /Approval owner/);
});

test("production requires distributed rate limiting and complete human confirmations", async () => {
  const rateLimit = await source("lib/contact/rate-limit.ts");
  const releaseValidator = await source("scripts/validate-release.mjs");
  assert.match(rateLimit, /interface RateLimitAdapter/);
  assert.match(rateLimit, /DistributedRateLimitAdapter/);
  assert.match(releaseValidator, /distributedRateLimitConfigured/);
  for (const key of [
    "APPROVED_MEDIA_CONFIRMED",
    "PUBLIC_CASE_EVIDENCE_CONFIRMED",
    "SOCIAL_PROFILES_CONFIRMED",
    "CONTACT_CHANNELS_CONFIRMED"
  ])
    assert.match(releaseValidator, new RegExp(key));
});

test.skip("Why Venus navigation and About page keep bilingual accountability copy", async () => {
  const navigation = await source("content/navigation.ts");
  const footer = await source("components/layout/Footer.tsx");
  const page = await source("app/[lang]/about/page.tsx");
  const copy = await source("content/pages/about.ts");
  assert.match(navigation, /en: "Why Venus", zh: "为什么选择我们"/);
  assert.match(footer, /\["Why Venus", "为什么选择我们", "\/about"\]/);
  assert.match(page, /About Venus Bridge \| China–UK & Europe Market Execution/);
  assert.match(page, /关于 Venus Bridge \| 中国企业英国与欧洲市场执行/);
  assert.match(copy, /London production, local talent and bilingual delivery/);
  assert.match(copy, /以伦敦本地团队，统筹创意制作、人才资源与中英双语交付。/);
  assert.doesNotMatch(copy, /关于镜桥/);
});

test("team publishing uses supplied facts, colour portraits and accountable capability framing", async () => {
  const team = await source("content/team.ts");
  const component = await source("components/sections/AboutTeam.tsx");
  const profileIndex = await source("components/team/TeamProfileIndex.tsx");
  assert.match(team, /\.filter\(\(member\) => member\.public && member\.approved\)/);
  for (const name of ["Vivian", "Fei Cao", "Minghan", "Patrick Lenihan", "Richard Bußmann"])
    assert.match(team, new RegExp(name));
  for (const portrait of [
    "vivian-wang.jpg",
    "fei-cao.jpg",
    "minghan-bao.jpg",
    "patrick-lenihan.png",
    "richard-bussmann.png"
  ])
    assert.match(team, new RegExp(portrait));
  assert.doesNotMatch(
    team,
    /imageTreatment: "mono"|Vivian Adventure|world-leading|unparalleled|renowned|prestigious/i
  );
  assert.match(team, /relationship: "project-network"/);
  assert.match(profileIndex, /publicTeamMembers\.map/);
  assert.match(profileIndex, /member\.focalPoint/);
  assert.match(component, /ONE CAPABILITY SYSTEM/);
});

test("real case publishing requires completion, public approval, media rights, legal approval and evidence", async () => {
  const types = await source("content/types.ts");
  const cases = await source("content/cases/index.ts");
  const template = await source("content/cases/template.ts");
  for (const field of [
    "CaseDeliveryStatus",
    "CasePublicStatus",
    "EvidenceRecord",
    "clientApproval",
    "mediaRightsApproved",
    "legalApproved"
  ])
    assert.match(types, new RegExp(field));
  assert.match(cases, /caseStudy\.deliveryStatus === "completed"/);
  assert.match(cases, /caseStudy\.publicStatus === "public"/);
  assert.match(cases, /record\.verified && record\.approvedForPublic/);
  assert.match(template, /incomplete or awaiting-approval work cannot be public/);
  assert.match(template, /concept projects must remain hidden from the real portfolio/);
});

test.skip("Fashion, Beauty & Apparel is the primary sector and jewellery is adjacent only", async () => {
  const industries = await source("content/information-architecture.ts");
  const page = await source("app/[lang]/expertise/[sector]/page.tsx");
  const sitemap = await source("app/sitemap.ts");
  assert.match(industries, /Fashion, Beauty & Apparel/);
  assert.match(industries, /时尚、美妆与服装/);
  assert.doesNotMatch(industries, /Fashion, Beauty & Jewellery|时尚、美妆与珠宝/);
  assert.match(page, /getExpertiseSector/);
  assert.match(sitemap, /\/industries\/fashion-beauty-apparel/);
});
