# Phase 3.2C-R Media Role System

## Purpose

Media is assigned by compositional role, not only by source orientation. The source registry, rights approval, focal points, protected areas and alt text remain authoritative. No new media or claims are introduced.

## Roles

| Role | Ratio | Default fit | Use | Crop rule |
| --- | --- | --- | --- | --- |
| `hero-landscape` | 2:1 desktop; 16:9 tablet; 4:3 mobile | cover | Cinematic case and page hero | Preserve protected area; crop outer environment first. |
| `hero-portrait` | 4:5 | contain or editorial cover | Fashion/people case hero | Preserve face and full silhouette where the frame permits. |
| `proof-landscape` | 16:9 | cover | Event, stage, environment and vehicle evidence | Keep stage/vehicle and any meaningful screen text inside the protected area. |
| `proof-portrait` | 4:5 | cover | People, talent, fashion and product proof | Use focal point; do not crop eyes, hands holding product or principal garment detail. |
| `card-landscape` | 4:3 | cover | Project rail and supporting cards | One subject or one readable environment per card. |
| `mosaic-fill` | parent-controlled | cover | Work and capability mosaics | Fill the grid cell; parent establishes height and span. |
| `editorial-natural` | source/profile ratio | contain | Deliberate full-image evidence where cropping would remove proof | Neutral background is allowed only when visibly intentional and proportionate. |
| `logo-mark` | natural | contain | Brand marks only | Never crop or stretch. |

## Source-selection rule

1. If the role is `cover`, use the approved unpadded source, AVIF source or mobile source and apply the registered focal position at runtime.
2. If the role is deliberately `contain`, use the registered art-directed derivative and its background treatment.
3. A derivative containing baked-in neutral padding must not be used in a cover frame.
4. Profile aspect ratios are fallbacks only. Explicit role ratios take precedence.

## Responsive rule

- Desktop may use wide cinematic and asymmetric 12-column compositions.
- Tablet keeps stable ratios and removes sticky/interactive dependencies that obscure chapter reading.
- Mobile uses one clear dominant image per proof unit; it does not squeeze two landscape subjects into unreadable half-width crops.
- Mobile source selection uses the registered mobile AVIF/WebP where available.

## Focal and protected-area rule

- Registered `objectPositionDesktop`, `objectPositionTablet` and `objectPositionMobile` remain the first crop instruction.
- Faces, products, vehicles, event screens and logos marked in protected areas must remain visible.
- Where protected text or a logo conflicts with a crop, choose `editorial-natural` rather than forcing `cover`.
- Text overlays are allowed only where the profile marks the asset as safe, or where a separate contrast overlay preserves readability without masking evidence.

## Canonical page assignments

- Home hero: `hero-landscape` inside the scene frame.
- Home activity and selected work: `card-landscape` and `proof-landscape`.
- Capabilities industry chapter: `proof-landscape`.
- Capabilities creator wall: `mosaic-fill`, with portrait-oriented subjects on taller spans.
- Work hero: one mobile `proof-landscape`; four `mosaic-fill` cells from tablet upward.
- Work featured projects: `proof-landscape`, with Teal permitted a taller editorial ratio.
- About: `hero-portrait`, `proof-landscape` and `editorial-natural` only where subject protection requires it.
- Case hero: `hero-landscape` for event/automotive; `hero-portrait` for fashion/people.
- Case gallery: orientation-aware `proof-landscape` or `proof-portrait` with approved source crops.

## Loading and failure treatment

- Above-the-fold hero media is eager/high priority.
- Below-the-fold media remains lazy loaded.
- The frame background is a transition/fallback surface, not a visible design panel after load.
- Missing media must fail visibly in validation; it must not leave an unexplained blank block in production.
