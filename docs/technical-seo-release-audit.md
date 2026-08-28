# Technical SEO Release Audit

## Architecture

All canonical bilingual routes use the shared `buildMetadata` contract with intentional title, description, self-canonical, `en-GB`, `zh-CN`, `x-default`, Open Graph and Twitter metadata. Case details use approved representative covers where available. `<html lang>` is `en-GB` or `zh-CN` through the locale layout.

The metadata/robots gate is deliberately fail-closed: pages are noindex and `robots.txt` disallows crawling until the full production release configuration passes. This prevents a preview or incomplete release from entering search results.

## Indexable production surface

- Home
- Companies
- Partners
- Case Studies and governed published case details
- How We Work
- About
- Contact
- Privacy and Terms
- English and Chinese equivalents

Retired service, industry, expertise, talent, agency and legacy case routes permanently redirect to canonical pages. API routes, media review, invalid locales, unknown cases, previews, and incomplete release profiles are not indexable.

## Robots and sitemap

`app/robots.ts` allows the public site and disallows `/api/` only after `isProductionReleaseReady()` passes; otherwise it disallows all. `app/sitemap.ts` is generated from canonical route data and `publishedPortfolioProjects`, so future approved case additions are included automatically. Work is removed when public Work mode is hidden.

## International SEO

Each locale canonicalises to itself. Every canonical page exposes reciprocal English/Chinese alternates and English `x-default`. No locale is canonicalised to the other. Invalid locale routes return 404.

## Structured data

- Guarded Organization/ProfessionalService data publishes only when identity is safe.
- Case details now expose truthful `CreativeWork` plus machine-readable Home → Case Studies → Project breadcrumbs.
- Existing service/breadcrumb schemas remain on applicable legacy surfaces but those routes redirect under the approved IA.
- No reviews, ratings, awards, employee counts, revenue, founding claims, or unverified social profiles are fabricated.

## Content semantics

Canonical release E2E verifies one main landmark and one H1. Important case content is server-rendered and crawlable. Links are semantic, media registries require bilingual alt text, and no important canonical content depends on hover.

## Remaining launch gates

- Real canonical hostname and HTTPS.
- Complete approved company identity before Organization schema can publish.
- `RELEASE_PROFILE=production`, `PUBLIC_WORK_MODE=portfolio`, and all evidence/media/legal/contact confirmations.
- Public inspection of the deployed robots, sitemap, canonical/hreflang and social cards.
- Submit the production sitemap to Google Search Console and Bing Webmaster Tools after launch ownership is established.

Status: IMPLEMENTATION PASS; PRODUCTION INDEXABILITY BLOCKED BY HUMAN CONFIGURATION.
