# Phase 13 final report

## Executive summary

Phase 13 introduces a separate Capability Media system for 24 approved visual assets, completes the Entertainment & Culture and Technology, AI & Research expertise pages, adds targeted media to all three client paths, upgrades the four homepage expertise cards, and preserves Work as a verified-project-only surface.

## Design decisions

- Entertainment uses a portrait-led asymmetric hero and a B2B production structure rather than a celebrity gallery.
- Technology leads with robotics, intelligent products, demonstrations, expert content and industry launches.
- Research & Innovation is a compact secondary editorial statement with no university case grid or endorsement language.
- About Us is deliberately text-, responsibility- and brand-led. No artist, model, guest or synthetic employee image is used.
- Enter the UK Market uses one editorial location-production image and remains process-led.

## Truth and release boundaries

Capability media can appear in heroes, service modules and Selected Visual Experience, but it does not create a Work detail route, client metadata, outcomes, metrics, sitemap entries or CreativeWork schema. Case conversion requires the facts listed in `phase-13-capability-to-case-gaps.md`.

## SEO and accessibility

The two new expertise routes use localized titles and descriptions, canonical URLs, hreflang alternates, breadcrumbs, Service structured data, Open Graph metadata and objective bilingual alt text. Brand names visible inside images are not promoted into metadata or alt text.

## Media performance

All 24 review assets have AVIF, WebP, JPEG fallback, mobile AVIF/WebP and thumbnail derivatives. The component uses explicit dimensions, responsive sizes, priority/fetch priority only for hero media, native lazy loading for other assets, separate mobile sources and desktop/mobile focal positions.

## Production blockers

- No new capability collection can become a named Work case until project facts and delivery evidence are supplied.
- No institution logo can publish until a complete relationship record and approval evidence exist.
- No named team profile or team photograph can publish until identity, role, biography, real imagery and public approval are complete.
- Production environment variables and existing release-profile checks remain outside this content phase.

## Verification results

- `npm run format`: passed.
- `npm run format:check`: passed.
- `npm run lint`: passed with zero warnings.
- `npm run typecheck`: passed.
- `npm test`: 53 passed, 0 failed.
- `npm run build`: passed; 80 static pages generated.
- Browser matrix: 84 checks across English and Chinese, seven core routes and widths 320, 390, 768, 1024, 1440 and 1920; zero overflows and zero broken images.
- Expertise-page media audit: zero repeated capability-media IDs per page and zero browser console warnings or errors.
- Media Review: 24 assets rendered, 16 marked for public use, zero broken images.
- Screenshot set: 29 required viewport captures plus one diagnostic comparison capture in `audit/phase-13-browser/`.

See the media import, placement, institution and capability-gap reports for the complete asset-level record.
