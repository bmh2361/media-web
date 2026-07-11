# Release Readiness Report

Generated: 2026-07-11

## Decision

**Not ready for a public production portfolio launch.**

The release candidate is technically suitable for controlled staging review. Production publication remains blocked by business-content, legal, and contact-delivery prerequisites listed below. This is not a claim that those prerequisites have been completed.

## Verified Technical Gates

| Check                          | Result                                                                              |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| `npm.cmd run format:check`     | Pass                                                                                |
| `npm.cmd run lint`             | Pass with zero warnings                                                             |
| `npm.cmd run typecheck`        | Pass                                                                                |
| `npm.cmd run validate:content` | Pass: 6 governed case records                                                       |
| `npm.cmd test`                 | Pass: 9 tests                                                                       |
| `npm.cmd run build`            | Pass: 45 static pages generated                                                     |
| Browser verification           | Pass on desktop `1440x1000` and mobile `390x844` for key English and Chinese routes |
| `npm.cmd audit --omit=dev`     | 2 moderate vulnerabilities remain; see P2                                           |

The root route returns the intended `307` redirect to `/en`. It is not evaluated as a content page.

## Route, SEO, And Content Verification

Machine-readable results are in `audit/route-report.json` and `audit/case-report.json`.

- All 38 non-root routes checked returned `200`, with exactly one `main` and one `h1`.
- Six negative routes returned `404`: four invalid-locale routes and two unknown case slugs. No `500` responses were observed.
- Sitemap returned `200` with 38 URLs, no API URLs, no invalid-locale URLs, and no artificial `lastmod` values.
- Checked routes have language-specific `html lang`, canonical URLs, `en-GB`/`zh-CN`/`x-default` alternates, Open Graph images, and parseable JSON-LD.
- No checked public route contained editorial-marker, development-guide, or unexpected-English-UI findings after rendered-text inspection.
- All six Work records are explicitly disclosed as unverified, illustrative concept project models. Both language routes returned `200`; evidence rules passed and no unsupported completed-project claim was detected.

## Contact Endpoint Verification

The production server was tested only with a local origin allowlist and no webhook configuration. No real enquiry was sent.

| Scenario                                 | Observed result                                                       |
| ---------------------------------------- | --------------------------------------------------------------------- |
| Valid structured request with no webhook | `503 not_configured`                                                  |
| `text/plain` request                     | `415 unsupported_media_type`                                          |
| Malformed JSON                           | `400 invalid_json`                                                    |
| Oversized body                           | `413 payload_too_large`                                               |
| Unknown field                            | `400 validation`                                                      |
| Invalid enum                             | `400 validation`                                                      |
| Disallowed origin                        | `403 invalid_request`                                                 |
| Honeypot / too-fast submission           | `400 validation`                                                      |
| Duplicate submission                     | `429 duplicate`                                                       |
| Distinct valid requests from one IP      | first five `503 not_configured`, sixth and seventh `429 rate_limited` |

The localized client form was also checked for empty-field validation, localized invalid-email feedback, focus on the first invalid field, restoration to the correct step after a server validation error, and a required project-type selection. The Chinese budget labels no longer duplicate the optional "to discuss" value.

## Accessibility And Responsive Checks

- The tested key pages had one `main` landmark and one `h1` at both viewport sizes.
- No horizontal document overflow was detected on the tested desktop or mobile routes.
- The skip link receives focus.
- The Work filter exposes and updates a single `aria-pressed` selection.
- The footer language switch preserves the current path and query: `/zh/contact?project=video` becomes `/en/contact?project=video`.

These targeted checks are not a WCAG conformance audit.

## Remaining Issues

### P0 - Public portfolio evidence is not ready

All six Work entries are concept models with unverified evidence, not completed client projects. Do not represent them as client portfolio evidence. Replace concept media and copy with approved, rights-cleared assets and verified case records before making that claim.

### P1 - Production contact delivery is unverified

`CONTACT_WEBHOOK_URL` and the production `CONTACT_ALLOWED_ORIGINS` configuration must be set, then verified against the real production origin and receiving system. The current safe behavior is to reject otherwise-valid submissions with `503 not_configured`.

### P1 - Legal and leadership information require confirmation

Privacy and Terms require legal review against the final controller, processors, retention, and contact details. Any leadership/contact profile details must be confirmed before publication.

### P2 - Dependency vulnerability remains

`npm audit --omit=dev` reports two moderate PostCSS XSS advisories through Next.js. The suggested automated remediation would force a breaking downgrade to `next@9.3.3`; it was not applied. Assess and perform a supported Next.js update separately.

### P3 - Rate limiting is process-local

The contact rate limiter is best-effort and in-memory. It is suitable for the stated local behavior but does not provide shared distributed enforcement across serverless instances.

## Required Launch Checklist

1. Configure a verified contact webhook and production `CONTACT_ALLOWED_ORIGINS`; complete a real production delivery test.
2. Supply approved media and verified client-case evidence before presenting Work as completed portfolio work.
3. Obtain legal review and finalize Privacy/Terms details.
4. Confirm leadership and public contact-profile information.
5. Assess a supported Next.js dependency update that resolves the PostCSS audit finding without a forced downgrade.
