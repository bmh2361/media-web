# Case Study Media Presentation Audit

## Original problem

The index and detail templates treated portrait, landscape, square, people, product and stage photographs too uniformly. Fixed aspect wrappers and default cover behaviour removed context and promoted some detail frames beyond their narrative importance.

## Preview system

The preview now separates a stable, dark outer stage from a ratio-aware inner frame. Per-project `previewMediaId` and `previewPresentation` select one of `full-bleed-safe`, `landscape-contained`, `portrait-contained`, `square-contained`, or `panoramic`. Contained media uses deliberate dark negative space, while copy sits below the image. The initial and next two previews are preloaded. Hover and keyboard focus share the same restrained 300ms opacity/scale transition and active row state. Mobile removes the sticky panel and renders a natural-ratio cover inside each row.

## Hero system

`heroMediaId` is independent of preview media. `wide`, `cinematic`, `portrait`, `editorial-split`, `natural`, and `contained` are data-level hero modes. Wide imagery stays wide without a universal ratio; portrait and editorial-split modes pair contextual typography with a complete, narrower photograph. The hero loads eagerly and uses known source dimensions.

## Gallery system

The gallery is an editorial sequence, not a set of image cards. Hero media is not immediately repeated. Source ratios are preserved, portrait/landscape mixtures use the 12-column grid without equal-height forcing, details render smaller, and closing images regain scale. Two-image and seven-image projects follow different rhythms. There is no masonry, default carousel, blur-fill, fake full bleed, or universal fixed-height gallery.

## Media data architecture

Each project now exposes `previewMediaId`, `heroMediaId`, `previewPresentation`, `heroLayout`, and a `mediaDecisions` record for every approved asset. Each decision records narrative role, safe-crop permission, natural/contain gallery fit, grid width, maximum display width, focal point and optional desktop/mobile focal overrides. The responsive focal values are translated into the art-directed image component's `object-position` variables instead of scattered CSS rules.

## Project-by-project decisions

All 12 project contact sheets and 62 sources were visually inspected. The exhaustive decisions and asset limitations are recorded in [case-study-media-audit.md](./case-study-media-audit.md). The key correction is Wang Linkai: the wide audience-facing finale is now the hero, the complete portrait is the preview, and the tighter stage frame is a small detail. Geely, Changan, BYD and Leapmotor use vehicle-aware hero/preview pairs. Fashion, AGIBOT, beauty and European road imagery use portrait or editorial-split treatments rather than landscape banners.

## Responsive art direction

Index screenshots were reviewed at 1440, 1024, 768 and 390. Every project hero plus first and last gallery placement was captured at 1440 and 390. Desktop uses the sticky preview only at `lg`; tablet/mobile use inline covers. Hero splits stack naturally on narrow screens, and all gallery media retains its source ratio. The data model supports distinct desktop/mobile focal points only where required, avoiding unnecessary configuration.

## Performance

Preview preloading is limited to the first three likely items. Hero images are priority-loaded; gallery images remain lazy. `sizes` reflects actual column width. Known width/height metadata reserves natural-ratio image space, and the fixed preview stage prevents state-switch layout movement. Medium-resolution sources have explicit display-width caps.

## QA

- Generated 12 internal project contact sheets and a 62-record source inventory.
- Captured four index breakpoints and six required active preview states.
- Captured hero, first-gallery and last-gallery compositions for all 12 projects at desktop and mobile.
- Checked faces, performers, robots, beauty products, cars and buses for unintentional crop.
- Screenshot sheets: `audit/case-study-media-presentation/screenshots/`.
- Development inventory generator: `scripts/audit-case-study-media.mjs`.
- Screenshot capture: `e2e/case-study-media-screenshot-audit.spec.ts`.

Release verification is completed through type checking, linting, unit/media validation, Playwright screenshot QA and a production build.
