# Phase 3.4 Final Report

## Release decision

**NOT RELEASE READY — HUMAN INPUT REQUIRED.** The canonical application, content, media, responsive layout, accessibility checks, build and controlled Contact delivery chain pass. Production remains deliberately fail-closed because the approved domain, company/legal record, live delivery configuration, distributed rate limiting, direct contact channels and required human confirmations have not been supplied.

## Strategic and commercial result

- Strategic position: unchanged. International credibility and UK execution remain primary; premium creative production and project delivery remain secondary.
- Homepage architecture and navigation: preserved.
- Priority evidence: BYD London, London automotive film, Changan, CATL and Leapmotor now expose evidence-supported Objective, Execution and Evidence Created fields. Unknown deliverables, commercial use and outcomes remain omitted.
- Public client identity: shown only when `clientNamePublic` is true.
- Institutional capability: preserved and fail-closed. A complete future Level A data contract and intake are ready, but no named case is published because no record currently passes every gate.
- Accountability: role-based ownership remains public; a named leadership profile still requires human identity, biography, portrait and approval.

## Contact release audit

The UI/API contract mismatch that rejected a quick enquiry without a Company value was fixed. Controlled end-to-end delivery passed for a valid submission, an empty optional Company, invalid input, honeypot input, disallowed origin, provider failure, English success/error states, Chinese success, request identifiers and HMAC signatures.

This verifies the code path, not a live production destination. Production still requires an approved HTTPS webhook, allowed origins, notification destination, monitored failure handling, a verified distributed rate-limit adapter and a live delivery test. No approved email, telephone, WhatsApp or WeChat fallback was supplied.

## Validator result

The validator now reports three distinct classes:

1. `failedChecks`: blockers on the canonical production surface.
2. `legacyFindings`: governance that must be resolved before permanently redirected market-entry content can be reactivated.
3. `scopeMismatches`: retired/noncanonical checks, including old media placeholders, the old scenario registry and a social confirmation with no current public consumer.

With `PUBLIC_WORK_MODE=portfolio` in a controlled invocation, the validator recognises all **9 canonical governed portfolio records**. Canonical portfolio and capability manifests pass their public-path, bilingual-alt and publication-rights checks. The normal production invocation still fails with **19 human/configuration blockers**, reduced from the Phase 3.3 baseline of 28 without weakening a canonical safety gate.

## Verification

| Check                              | Result                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------- |
| TypeScript                         | PASS                                                                    |
| ESLint                             | PASS                                                                    |
| Unit tests                         | 100 passed, 0 failed, 11 skipped                                        |
| Contact delivery assertions        | 11 passed                                                               |
| Content validator                  | PASS                                                                    |
| Staging media validator            | PASS                                                                    |
| Pricing/truth validator            | PASS                                                                    |
| Production build                   | PASS, 88 static pages generated                                         |
| Phase 3.4 canonical runtime matrix | PASS: 16 EN/ZH routes × 5 viewports = 80 combinations                   |
| WCAG A/AA runtime scans            | PASS: 32 route/viewport scans                                           |
| Browser inspection                 | PASS for Home, BYD detail, Institutional capability and Chinese Contact |
| Production release validator       | FAIL as designed: 19 human/configuration blockers                       |

The old all-phase Playwright suite was also sampled. Its About tests still expect pre-Phase-3.3 headings and CTA labels and therefore fail against the current frozen page. This is classified as a legacy test-scope mismatch, not a canonical runtime defect. The dedicated Phase 3.4 matrix is current and passed.

## Canonical blockers

- Deployment: `RELEASE_PROFILE=production` and an approved `PUBLIC_WORK_MODE` decision.
- Domain: approved HTTPS `NEXT_PUBLIC_SITE_URL`.
- Contact: live HTTPS webhook, allowed production origins, notification destination and verified live delivery.
- Rate limiting: configured and verified distributed adapter.
- Company/legal: legal name, company number, registered office, privacy and terms effective dates, plus approved privacy/terms review states.
- Human release sign-off: legal review, public company details, contact delivery, approved media, public case evidence and contact channels.
- Direct fallback: approved business email and/or other public channel data.

## Evidence still needed

The highest-value missing evidence is a client-approved, commercially complete UK case record—preferably BYD London or the London automotive film—with the original brief, exact contracted scope, real deliverables, approved usage channels and any provable repeat/follow-up value.

The next new commercial proof to acquire should be a permissioned UK institutional/expert engagement that satisfies Level A evidence: named participant and institution, verified relationship type, programme, Venus Bridge role, date/location, contribution, approved wording and publication permission. Participation must never be presented as endorsement.

## Files changed in Phase 3.4

- `.env.example`
- `lib/contact/validation.ts`
- `scripts/test-contact-delivery.mjs`
- `scripts/validate-release.mjs`
- `content/portfolio.ts`
- `components/sections/PortfolioProjectDetail.tsx`
- `tests/market-entry.test.mjs`
- `tests/phase-3-repositioning.test.mjs`
- `tests/phase-3-4-release-readiness.test.mjs`
- `e2e/phase-3-4-release-readiness.spec.ts`
- `docs/phase-3-4-release-readiness-plan.md`
- `docs/phase-3-4-human-release-inputs.md`
- `docs/phase-3-4-priority-case-evidence-requests.md`
- `docs/institutional-project-evidence-intake.md`
- `docs/phase-3-4-leadership-profile-input.md`
- `docs/phase-3-4-final-report.md`

Phase 3.4 stops here. No redesign or further strategic repositioning was started.
