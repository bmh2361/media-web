# Phase 6 Production Launch Audit

## Executive assessment

The codebase is substantially hardened, but the release is **NOT READY FOR PRODUCTION**. Local engineering gates pass except one P1 performance budget. Deployment, domain/HTTPS, real Contact receipt, distributed limiting, legal/rights approvals, monitoring, rollback and physical-device checks require human evidence.

## Release candidate

Recommended checkpoint: `v1.0.0-rc1`, after owner review and commit. The current `main` worktree is extensively dirty from approved accumulated work; Phase 6 did not discard, commit, tag or rewrite it. `package.json` remains `0.1.0`.

## Deployment

Managed native Next.js hosting is the appropriate architecture; Vercel Pro is the documented reference because App Router, dynamic `/api/contact`, Edge OG and runtime image optimisation must remain available. Static export is incompatible. No account, purchase or deployment was performed.

## Contact delivery

The application-side contract passes 19 assertions covering validation, international/special text, optional fields, duplicate limiting, honeypot/origin defence, provider failure, safe UI states, IDs and HMAC signatures. It is not launch-ready until a real provider/inbox, production origin, distributed limiter and alert are verified.

## SEO

Intentional titles, descriptions, self-canonicals, OG/Twitter data, route index policy, data-driven sitemap and fail-closed robots are implemented and tested. Production indexing remains disabled until the canonical host and release confirmations pass.

## International SEO

English and Chinese routes expose `en-GB`, `zh-CN` and `x-default` alternates and correct document languages. Each locale canonicalises to itself.

## Structured data

Truth-gated Organization data is retained. Published case details now add `CreativeWork` and Home → Case Studies → Project `BreadcrumbList` schema without adding visible breadcrumbs or invented facts.

## Analytics

No analytics provider or network sink exists. Emission is environment-gated on provider, ID, enablement and privacy approval. Local contract events remain observable for tests.

## Conversion measurement

The implemented taxonomy includes `page_view`, `case_view`, `case_detail_open`, `discuss_project_click`, `companies_cta_click`, `partners_cta_click`, `language_switch`, `contact_intent`, `contact_start`, `contact_step_complete`, `contact_submit_success` and `contact_submit_failure`. Payloads use controlled page/language/case/CTA/contact-step context and exclude names, email, organisation and enquiry text.

## Performance

The final production-build fixture harness reports mobile slow-4G LCP 924 ms, CLS 0, INP 40 ms, no document overflow and no broken images. Home-to-Work is 922 ms against an 800 ms route budget, so Performance remains P1. These are lab signals, not real CDN or field claims.

## Security

Production dependency audit reports zero vulnerabilities. Request-size/schema/origin/honeypot/rate/signature controls, safe errors, CSP, referrer, permissions, nosniff, frame and production-HSTS policies are present. Live TLS, platform headers, secrets and distributed limiting remain human deployment checks.

## Privacy / cookies

No non-essential analytics, marketing script or cookie is active. Functional `sessionStorage` remembers only the opening sequence for the current tab. Contact consent is required. Privacy/Terms remain drafts pending legal identity, dates, emails and qualified approval.

## Domain / HTTPS

No production hostname can be inferred safely. The owner must choose apex/www canonical form, configure both DNS names, one-hop permanent redirect, certificates, `NEXT_PUBLIC_SITE_URL`, allowed Contact origins and live mixed-content checks.

## Routes / errors / links

Internal crawling passes without broken destinations or localhost links. Generic and invalid-case 404s use restrained bilingual Home/Work/Contact/language recovery. A bilingual 500-style route error boundary is present. Contact errors do not expose stacks or report false success.

## Accessibility

Release E2E passes serious/critical axe scanning on six canonical routes in settled desktop/mobile states. Carousel ARIA, horizontal-rail keyboard access and contrast defects were corrected. Menu focus/Escape, labels, reduced motion, semantics and route announcements pass; physical AT testing remains human.

## Monitoring

The monitoring plan defines deployment, 5xx, uptime, analytics-health and exact redacted `contact_delivery_failed` signals. Accounts, alert channels and responders are unconfigured and untested.

## Rollback

The runbook identifies `main`, tagging, environment ownership and provider rollback. A real immutable deployment and drill remain required.

## Real-device verification

Automation covers required responsive widths and production browser states, but iOS Safari and Android Chrome are **HUMAN TEST REQUIRED**. No physical-device PASS is claimed.

## Commercial truth / rights

Canonical repository records are internally governed and public content validations pass. Contracts, client permissions, portrait releases, logo rights and source evidence were not available; owner sign-off is P0.

## Human actions

Twelve exact account/legal/device actions are listed in `docs/launch-human-actions.md`, each with WHY, EXACT ACTION, EXPECTED RESULT and HOW TO VERIFY.

## Remaining risks

- P0: immutable production deployment/domain/TLS; real signed Contact delivery and distributed limiting; legal/company/public-channel approvals; truth/media-rights sign-off; production validator’s 23 missing inputs.
- P1: 922 ms slow-4G route transition; analytics decision; external monitoring; rollback drill; production preview/field performance; social preview; physical devices.
- P2: live external-link confirmation and assistive-technology spot checks.
- P3: field-informed post-launch optimisation only.

## Final recommendation

**NOT READY FOR PRODUCTION.** Resolve every P0 and attach human evidence to `docs/production-launch-gate.md`; then rerun the complete validation matrix.

## Validation appendix

| Check | Result |
| --- | --- |
| TypeScript / ESLint / production build | PASS / PASS / PASS (101 static pages) |
| Unit/content suite | PASS — 121 passed, 11 skipped |
| Contact integration | PASS — 19 assertions |
| Staging release validator | PASS with documented warnings/actions |
| Production release validator | EXPECTED FAIL — 23 missing production/human inputs |
| Production dependency audit | PASS — zero vulnerabilities |
| Production-launch E2E | PASS — 16/16 |
| Phase 2 E2E | PASS — 14/14 |
| Mobile transformation regression | PASS — 14/14 |
| Release/accessibility E2E | PASS — 13 passed, 1 intentional duplicate-project skip |
| Performance audit | ISSUES — one 922 ms route-transition breach |
| `git diff --check` | PASS (line-ending notices only) |
