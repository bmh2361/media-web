# Phase 14 final report

## Executive summary

Phase 14 rescans 803 raster files, scores 285 source candidates and creates 83 public presentation profiles. Every profiled public asset receives independent desktop, tablet and mobile AVIF/WebP derivatives plus a desktop JPEG fallback.

## System delivered

- One Art Direction data model for case and capability media.
- Subject-specific ratios, focal points, protected areas, backgrounds and overlay rules.
- Product, vehicle, group, interview and technology media fail safe to contain when a cover crop would breach the protected area.
- Capability and case publication boundaries remain unchanged.

## Media audit and selection

- 803 raster files scanned: 322 curated-library images, 49 Codex-ready capability files and 432 repository media files.
- 261 curated manifest records and all 24 capability records scored.
- 285 candidate records use the required 25/25/20/15/15 commercial, visual, crop, brand and uniqueness framework.
- 83 public assets receive presentation profiles: 67 case-media assets and 16 public capability-media assets.
- 581 responsive public derivative files generated: desktop/tablet/mobile AVIF and WebP plus desktop JPEG fallback.
- Capability imagery remains excluded from Work, project schema and case metadata.

## Art-direction system

`ArtDirectedImage` now supplies a shared `<picture>` implementation for portfolio and capability media. Each profile records:

- subject type;
- focal point and protected area;
- desktop, tablet and mobile aspect ratio;
- device-specific AVIF/WebP source;
- background treatment and overlay permission;
- objective bilingual alt text;
- case-media or capability-media status.

Safe cover is used only when the protected region remains in frame. Products, technology devices, vehicles, groups, interview scenes and portrait subjects otherwise fall back to a deliberate editorial matte.

## Page outcomes

- **Home:** four expertise cards keep distinct source identities; Selected Work remains limited to released projects.
- **Create / Launch / Enter:** imagery is routed by production meaning, not as a repeated industry gallery.
- **Automotive:** the expertise hero now uses the London vehicle-launch image rather than a wide presentation screen.
- **Fashion, Beauty & Apparel:** the hero now uses a commercially legible fashion portrait rather than a distant architectural frame.
- **Entertainment & Culture:** the asymmetric performance hero remains explicitly capability media and does not imply artist representation.
- **Technology, AI & Research:** AI products and robotics dominate; research remains a secondary text-led capability.
- **Work and case pages:** responsive project heroes and galleries use the same crop-safety model; no capability media enters Work.
- **About:** brand, responsibilities and delivery model replace unsupported team photography.

## Colour and background system

No global colour filter is applied. The presentation registry selects from rich black, graphite, soft ivory, warm neutral, cool neutral and image-derived muted tokens. Dark stage imagery, warm fashion portraits and cool technology products retain their own colour character while sitting within the black, ivory and champagne brand system.

## Image performance

- Maximum desktop AVIF: 183 KB, below the 450 KB hero ceiling and 250 KB standard-image ceiling.
- Maximum mobile AVIF: 87 KB, below the 250 KB mobile-hero ceiling and 100 KB thumbnail reference.
- Desktop, tablet and mobile source paths are distinct for every profiled asset.
- Browser verification found 0 responsive source-selection mismatches.

The aggregate derivative library is larger than the original selected-source set because it contains three device sizes in two modern formats plus JPEG fallbacks; each request downloads only the matching source.

## Accessibility and SEO

- All image elements retain non-empty, objective bilingual alt text.
- Priority media use eager loading and high fetch priority; supporting media remain lazy.
- Width, height and sizes are explicit.
- Entertainment and Technology keep their existing bilingual metadata, canonical, hreflang, breadcrumbs and WebPage/Service schema.
- Reduced-motion CSS remains active and is covered by automated tests.

## Verification

- `npm run format`: PASS.
- `npm run format:check`: PASS.
- `npm run lint`: PASS with zero warnings.
- `npm run typecheck`: PASS.
- `npm test`: PASS, 66/66 tests.
- `npm run validate:image-crops`: PASS, 249/249 crops.
- `npm run build`: PASS; 80 static pages generated.
- Browser matrix: PASS, 150 checks across 25 routes and six widths; 0 overflow, 0 broken images, 0 repeated content media and 0 art-direction source mismatches.

## Browser screenshots

- 50 before screenshots: `audit/phase-14-browser/before`.
- 83 after screenshots: `audit/phase-14-browser/after`.
- English core pages and representative event, road, fashion and beauty cases: 390, 768, 1440 and 1920 pixels.
- Chinese core pages: 390 and 1440 pixels.
- Development media-review page: 1440 pixels.

## Phase 14 files

Primary implementation files:

- `components/media/ArtDirectedImage.tsx`
- `components/media/PortfolioImage.tsx`
- `components/media/CapabilityImage.tsx`
- `components/sections/PortfolioProjectDetail.tsx`
- `content/media/presentation.ts`
- `content/media/presentation-profiles.json`
- `content/media/image-selection-scores.json`
- `content/information-architecture.ts`
- `app/globals.css`
- `scripts/phase14-media-audit.mjs`
- `scripts/validate-image-crops.ts`
- `tests/phase-14-image-system.test.mjs`
- `tests/phase-13-media.test.mjs`
- `package.json`
- `public/media/art-directed/**`
- `audit/phase-14-source-inventory.json`
- `audit/phase-14-browser/**`
- the eight `docs/phase-14-*.md` reports.

## Production blockers

No Phase 14 image-system blocker remains. The media-review page is deliberately unavailable when `RELEASE_PROFILE=production`; it was verified with the staging/review flags and is not indexed. Standard deployment environment, contact-delivery and organisational release gates remain outside this visual phase and must still be satisfied by the existing production checklist.

Final command and browser results are appended after the implementation pass.
