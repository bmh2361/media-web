# Venus Bridge final pre-launch technical release audit

## Release verdict

Technical readiness: **7.6/10**. Application architecture, build quality, responsive behaviour, accessibility, metadata structure and contact implementation are strong. The production deployment is **not releasable yet** because its explicit environment/legal/contact gates are unconfigured, four high-severity dependency findings remain, and the social image route contains obsolete content.

Contact form classification: **CONFIGURATION REQUIRED**.

## Architecture inventory

- Framework: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion and Cobe.
- Rendering: statically generated bilingual pages/cases, dynamic Contact API and OG image route, production redirects and release-profile behaviour.
- Canonical IA: Home, Companies, Partners, Work, How We Work, About, Contact, Privacy, Terms in English/Chinese plus 12 bilingual case details.
- Content: typed page/case/team/company/release registries; generated media manifests; explicit case publication/evidence gates.
- Media: Next Image plus art-directed WebP/AVIF/mobile/thumb variants; release validation separates canonical from retired assets.
- Forms: client form → same-origin `/api/contact` → validated/signed webhook workflow.
- SEO: central metadata builder, canonical/hreflang, dynamic sitemap/robots, Organization/Service/Breadcrumb structured data and generated OG cards.
- Safety: CSP, referrer policy, permissions policy, nosniff, frame denial; HSTS in production.

The repository contains numerous retired source pages/components. Permanent redirects and release gates keep these out of the canonical public journey. This increases maintenance surface but is not a public IA defect.

## Command/test results

| Check | Result | Evidence / interpretation |
|---|---|---|
| `npm run typecheck` | **PASS** | No TypeScript errors. |
| `npm run lint` | **PASS** | No warnings under `--max-warnings=0`. |
| `npm test` | **PASS** | 121 passed, 0 failed, 11 conditional/historical skips (132 total). Node emits a non-blocking `MODULE_TYPELESS_PACKAGE_JSON` warning for TS module loading. |
| `npm run validate:content` | **PASS** | Content contracts satisfied. |
| `npm run validate:pricing` | **PASS** | No public pricing exposure. |
| `npm run validate:release:staging` | **PASS with warnings** | Missing explicit Work mode, site URL, contact webhook, legal values, allowed origins, shared limiter and six human confirmations. |
| `npm run validate:release:production` | **FAIL** | 19 failed checks, grouped below into identity/indexing, legal, contact infrastructure and human release confirmation gates. |
| `npm run validate:media:production` | **FAIL, noncanonical scope only** | Five placeholders exist only on retired/redirected sources; validator classifies them as scope mismatches and not canonical blockers. |
| `npm run test:contact` | **PASS** | 11 assertions; EN success/failure, ZH success, invalid payload, honeypot, bad origin, provider failure, request IDs and webhook signatures. Audit selectors were updated to the current form; production code unchanged. |
| `npm run test:e2e` | **PARTIAL: 92 passed / 13 failed / 53 skipped** | Canonical release, a11y, cases, motion and responsive tests pass. 12 failures assert obsolete approved copy/visual headings; one screenshot audit expects a desktop-only row at 320 px. P2 test debt, not a reproduced canonical defect. |
| Independent rendered audit | **PASS** | 126 canonical route/viewport results; 0 route failures, 0 broken images, 0 serious/critical Axe findings, 0 metadata-structure problems. |
| `npm run build` | **PASS** | Optimised production build compiled, type/lint stage passed, 100 static pages generated. Warning: an Edge runtime page disables static generation for that route; expected for dynamic OG/API behaviour. |
| `npm audit --omit=dev` | **FAIL** | 4 high, 0 critical; patched versions available. |

## Production release-gate failures

The validator reports 19 individual checks. They should be closed as four operational groups, not treated as 19 independent design defects.

1. **Identity/indexing/profile:** `RELEASE_PROFILE=production`; explicit `PUBLIC_WORK_MODE`; real HTTPS `NEXT_PUBLIC_SITE_URL`; public case/media/channel confirmations.
2. **Legal/company:** legal name, company number, registered office, privacy/terms effective dates, approval statuses, legal/public-company confirmations.
3. **Contact delivery:** HTTPS webhook, allowed origins, verified live receipt, distributed rate limiter and operational confirmation.
4. **Human gates:** approved media, public case evidence and contact channels confirmed by responsible owner.

Current fail-closed behaviour is good: robots disallows crawling, metadata is noindex and production Work would hide without an explicit choice. It prevents accidental exposure but must not be mistaken for launch readiness.

## Dependency/security audit

| Package | Finding | Minimum direction |
|---|---|---|
| Next 15.5.20 (direct) | High findings including App Router DoS and SSRF; other cache/image/function advisories; fixed in 15.5.21 for the relevant branch. | Upgrade to >=15.5.21, then regression test. |
| Sharp 0.34.5 (direct dev/runtime image dependency) | Inherited libvips high advisories; patched at >=0.35.0. | Upgrade to a supported patched Sharp version; validate image build/OG. |
| Nanoid <=3.3.17 (transitive) | Generator loop/DoS advisories. | Refresh dependency tree to patched version. |
| PostCSS <=8.5.22 within dependency tree | Source-map path/file disclosure advisories. | Refresh through patched Next/dependency lock resolution. |

Security headers are otherwise well considered. After upgrade, rerun `npm audit --omit=dev`, build, canonical E2E, contact delivery and image/OG tests.

## Form and contact delivery trace

```text
ContactExperience
  → POST /api/contact (JSON, same origin)
    → content-length <= 25 KB
    → origin allow-list
    → request fingerprint/rate limit
    → honeypot + schema validation
    → signed HTTPS webhook delivery
      → response.ok: real success state and form reset
      → provider/error: safe API error and visible failure state
```

Strengths:

- real success only follows provider success;
- server-side validation does not trust the client;
- origin enforcement, honeypot and rate limiting exist;
- webhook payloads carry request IDs and SHA-256 signatures;
- API logs avoid dumping enquiry PII;
- EN/ZH UI success and error states were exercised;
- consent is required and purpose-specific.

Production gaps:

- no configured provider URL/secret in the audited environment;
- no production allowed origins;
- in-memory limiter is unsuitable across multiple instances;
- no deployed-domain receipt/retry/alert verification;
- no public fallback contact/response expectation;
- legal notice/data-flow review incomplete.

Classification remains **CONFIGURATION REQUIRED**, not broken.

## SEO and social audit

### Passed architecture

- unique titles/descriptions for all major pages and cases;
- one H1 and one main landmark per canonical route;
- canonical URLs and `en-GB`/`zh-CN`/`x-default` hreflang on all 126 checks;
- 42-entry canonical sitemap when Work is published;
- invalid locale/unknown case return 404;
- legacy families permanently redirect to the canonical Companies/Work architecture;
- metadata includes OG/Twitter cards;
- manifest, favicon and Apple icon are present;
- structured-data helpers exist and Organization schema is guarded by complete production identity;
- SEO terms align with UK/Europe market entry, buyer/distributor engagement, launches and local execution.

### Blockers/findings

- current release profile intentionally produces noindex and `Disallow: /`; Lighthouse SEO 69 is entirely explained by “page blocked from indexing” in the scored SEO audits;
- fallback canonical and public emails use `.example` until configured;
- OG cards are technically valid PNGs but semantically obsolete/misleading (P0-05);
- Work social card incorrectly says concept despite real cases;
- Chinese share cards are not consistently Chinese;
- Organization schema cannot be trusted until company configuration is complete.

WeChat rendering cannot be guaranteed locally; once the real HTTPS domain is public, send test links through WeChat and verify title, description, image cache and Chinese copy. Do not infer mainland hosting requirements from this audit.

## Lighthouse and performance

Lighthouse 13.4.1 completed and wrote JSON reports; the CLI returned exit 1 only because Windows denied deletion of its temporary Chrome folder after report generation.

| Profile | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile | 93 | 100 | 100 | 69 | 0.9 s | 3.2 s | 20 ms | 0 | 0.9 s |
| Desktop | 100 | 100 | 100 | 69 | 0.2 s | 0.7 s | 0 ms | 0 | 0.4 s |

Mobile improvement estimate: ~17 KB from the BYD Home proof image and ~5 KB from the monogram; legacy JS ~12 KB and unused JS/CSS are modest. Forced reflow was ~30 ms unattributed plus a negligible code-referenced call. These are P2.

The older real-media fixture stress test reported mobile route transition 829 ms, three visible-overflow elements and reduced-motion CLS 1. Investigation found:

- “overflow” elements are contained horizontally scrolling scene/filter controls; document width remains exactly viewport width;
- canonical Lighthouse CLS is 0 in both profiles;
- responsive/reduced-motion release tests pass;
- therefore the fixture CLS=1 is a harness/simulation artefact unless reproduced on the deployed site.

First-load JavaScript from the build is ~102 KB shared; Home ~128 KB, About ~168 KB and Work ~191 KB. These are reasonable for the visual systems, with Work and About the heaviest interactive routes.

## Image performance

- Next image optimisation and explicit responsive variants are used.
- Hero/priority images are limited; below-the-fold case/team assets lazy-load.
- Natural aspect-ratio paths prevent unsafe forced crops.
- No layout-shift or broken-image failure was reproduced.
- No oversized multi-megabyte canonical transfer was found; largest public source variants sampled were under ~250 KB, and the largest belonged to retired content.
- Do not bulk recompress or change formats before measuring the real CDN/host. Apply only the Lighthouse-cited small savings later.

## Accessibility and manual UX checks

- Axe: 0 serious/critical findings across all major EN/ZH pages at 390/768/1440.
- Lighthouse Accessibility: 100 mobile/desktop.
- Semantic landmarks, one H1, language tags, link/button names, alt text, form labels and live status pass.
- Mobile menu keyboard/Escape/focus restoration passes.
- Case index is keyboard operable; mobile does not depend on hover.
- Reduced-motion skips the opening sequence and completes globe narrative.
- CSP/security controls do not generate runtime exceptions in the production build.

P2 residual: default 404 is English-only and has no recovery link.

## Console, hydration and resources

Independent audit found no browser console errors or page exceptions. It recorded canceled `_rsc` prefetch requests when each isolated browser context closed; these are `net::ERR_ABORTED` prefetch cancellations, not user-visible resource failures. No hydration or React warnings appeared in the rendered run.

## Release checklist

Before release:

1. Patch dependencies and achieve a clean/accepted production audit.
2. Supply the final HTTPS domain and release/work mode.
3. Supply legal entity, registry/address, emails, dates and approvals; obtain appropriate review.
4. Configure webhook secret/URL, allowed origins and distributed rate limiting.
5. Complete a deployed-domain successful and provider-failure contact test; verify operational receipt and alerting.
6. Correct and visually inspect eight key OG cards (Home/Companies/Work/About × EN/ZH).
7. Set owner confirmations only after underlying records are checked.
8. Rebuild; rerun typecheck, lint, unit, content, pricing, production release/media, audit, contact and focused canonical E2E.
9. Inspect public `robots.txt`, sitemap, canonical/hreflang, schema, icons and real-host redirects.
10. Test sharing in WeChat/LinkedIn and submit one monitored real enquiry.

After release:

- add privacy-reviewed analytics/conversion measurement;
- update stale historical E2E assertions;
- add a branded 404;
- evaluate font bundling and small image savings;
- monitor real LCP/INP/CLS and contact delivery.

## Audit artifacts

- `audit/final-prelaunch/rendered-route-audit.json` — 126 route/viewport records and summary.
- `audit/final-prelaunch/lighthouse-home-mobile.json`.
- `audit/final-prelaunch/lighthouse-home-desktop.json`.
- `audit/final-prelaunch/*.png` — 36 major-page captures plus 404 evidence.
- `audit/final-prelaunch/run-rendered-audit.mjs` and `capture-evidence.mjs` — audit-only tooling.

