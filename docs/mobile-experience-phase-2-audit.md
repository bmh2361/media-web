# Mobile Experience Phase 2 Audit

## Executive assessment

Mobile Experience Phase 2 is ready for production. The final sign-off reviewed eight English routes at 360, 375, 390, 393, 430, and 768px; five major Chinese entry routes at 390 and 430px; and all eight routes at protected desktop widths of 1280 and 1440px.

The final site no longer reads as a uniformly stacked mobile document. Strong media, dark/light chapters, three bounded scroll-linked journeys, a touch-led case archive, a phone Team rail, and a progressive Contact form create a clear hierarchy without introducing scroll interception or excessive motion.

Final evidence is stored in `audit/mobile-experience-phase-2/final-signoff/`:

- 48 English mobile full-page screenshots.
- 10 Chinese parity full-page screenshots.
- 16 protected-desktop screenshots.
- 14 live interaction-state screenshots.
- Per-width metrics and route comparison sheets.

Stitched full-page capture can duplicate fixed/sticky layers or omit an off-screen horizontal layer. Those capture artifacts were checked against live viewport states and automated interaction coverage before classification; they are not site defects.

## Phase 2 objectives

- Replace the dominant floating progress control with a quiet edge rail.
- Restrict continuous scroll-linked storytelling to Companies, Partners, and How We Work.
- Increase mobile compositional variety without redesigning the approved site.
- Make Case Studies feel editorial and visual rather than database-like.
- Shorten Team and Contact on phones while preserving semantics and data behavior.
- Preserve native scrolling, reduced motion, accessibility, performance, and desktop composition.

All objectives are met.

## Mobile architecture changes

- Safe-area-aware 44px edge progress rail with compact transient count feedback.
- Three Intersection Observer/native-scroll indexed journeys.
- Homepage staged hero, large media, horizontal proof rails, compact grids, and deliberate dark/light chapters.
- Single-active Case preview driven by reading position, tap, and focus; editorial text filters replace pill-like mobile controls.
- Phone-only semantic Team scroll-snap rail with visible next-card edge and progress.
- Three-step Contact presentation over the original fields, validation, payload, endpoint, consent, and state.
- Mobile-only full-bleed media and chapter rules, with protected desktop at 1200px and above.

## Visual QA findings

Release gates passed at 360, 375, 390, 393, 430, and 768px. All audited pages have deliberate section rhythm, stable gutters, readable typography, complete imagery, controlled endings, and no positive horizontal overflow.

Issue classification:

- P0: none.
- P1: Case preview copy clipped at the left edge inside its animated full-width wrapper — corrected.
- P1: automatic edge-rail context label obscured process, Team, and Contact content during normal scrolling — corrected.
- P2: none left requiring release action.
- P3: Richard Bussmann's current portrait source remains below the preferred future-resolution standard; this predates Phase 2 and is not a release blocker.

## Issues corrected during final sign-off

1. Case preview inner padding now aligns copy with the animated parent's visible boundary at phone widths. Representative bus, event/stage, and vehicle imagery was rechecked after the correction.
2. Automatic edge feedback now shows only a 64×34px count tag for 800ms. The full section label is reserved for direct rail focus, where it is constrained and truncated. This preserves orientation without covering content.
3. The complete mobile and Chinese evidence matrix was regenerated after both corrections.

## Page-by-page assessment

### Home

PASS. The hero has strong text/media balance, visible primary actions, and an early meaningful carousel image. Large proof media, horizontal rails, compact grids, and chapter-color changes prevent the post-hero page from becoming repetitive. Carousel framing, crop, metadata, and gold progress remain restrained.

### Companies

PASS. The opportunity journey is clearly differentiated from quieter commercial proof. Repeated numbered content is broken by media, dark chapters, compact grids, and a distinct active-state narrative.

### Partners

PASS. Partner types and opportunity categories remain calm while the five-stage process carries the dynamic emphasis. The page has clear commercial progression and no excessive animation density.

### Case Studies

PASS. One active project receives a large representative cover and concise Venus Bridge role; inactive rows remain scannable. The horizontal editorial filter is discoverable without pill UI or awkward wrapping. Multiple image subjects and crops were reviewed.

### Case Detail

PASS. Identity, hero, metadata, responsibility, strategy, image sequence, outcomes, and next-case transition form a coherent editorial narrative. Different media ratios render without persistent empty frames; live viewport review confirmed that blank areas seen during stitched lazy-load capture were capture artifacts.

### How We Work

PASS. Understand, Design, Activate, Deliver, and Follow Through read as a process evolving through scroll. Current state is dominant, previous/future states remain understandable, progress is visible, and sticky context remains bounded with native scrolling.

### About

PASS. The opening remains compact. Operating principles, the dark globe interruption, capability framing, and Team create clear rhythm. The phone Team rail exposes approximately 10% of the next card and is materially shorter than the former stacked presentation; 768px uses a balanced two-column grid.

### Contact

PASS. The three-step presentation is visually restrained and preserves entered values, validation, consent, payload, and endpoint behavior. Buttons and controls maintain touch sizing; user-facing form controls use 16px text to avoid iOS input zoom. The footer follows as a controlled closing chapter.

## Motion quality

Motion hierarchy is clear: high emphasis at the Home entry, medium emphasis for the three journeys, Case active state, Team, and Contact steps, and low emphasis elsewhere. Transitions use existing timing/easing tokens, native scroll, opacity, transform, and small clips. The result is directional and explanatory rather than decorative.

## Typography

English headlines were reviewed at all six mobile widths. Chinese Home, Companies, Work, About, and Contact were reviewed at 390 and 430px. No release-blocking orphan, collision, overflow, or semantic line break was found. Heading scale remains local and responsive rather than globally reduced.

## Mobile spatial design

Normal content follows a consistent gutter; selected media intentionally breaks it. Page rhythm alternates strong/quiet, dark/light, static/motion, and text/media chapters. Long pages remain content-led rather than padded to viewport height. Footer height ranges from 622px at 360px to 502px at 768px and remains readable.

## Accessibility

- Mobile menu retains dialog semantics, focus management, Escape dismissal, trigger restoration, and body scroll lock.
- Progress markers and stateful controls retain current/expanded/pressed semantics and at least 44px targets.
- Contact retains native validation and consent.
- Reading order remains document order.
- Reduced motion exposes all content, stops scroll-linked fills, and keeps transforms at identity.

## Performance

No dependency was added. There is no WebGL, smooth-scroll interception, or permanent animation frame loop. Intersection Observer and passive scroll work drive the shared state. The shared first-load bundle remains 103 kB; route bundle sizes are unchanged from the continuation build.

## Desktop regression

PASS at 1280 and 1440px across Home, Companies, Partners, Case Studies, Case Detail, How We Work, About, and Contact. Mobile progress is absent from desktop layout, mobile interaction presentations remain hidden, and the approved header, grids, Team, Contact, media, and footer compositions are materially unchanged.

Desktop materially changed: NO.

## Deferred items

Shared-element Case → Detail transition: **DEFERRED intentionally. Not a mobile release blocker.**

Real-device hardware testing after deployment remains advisable, particularly iOS Safari keyboard behavior and low-power motion performance. It is not a blocker for this local release gate.

## Final perception scores

| Perception | Score |
| --- | ---: |
| Commercial clarity | 9.3 / 10 |
| Premium perception | 9.1 / 10 |
| Technology perception | 8.5 / 10 |
| Editorial sophistication | 9.2 / 10 |
| Motion quality | 8.8 / 10 |
| Spatial design | 9.0 / 10 |
| Mobile usability | 9.2 / 10 |
| Touch interaction | 9.0 / 10 |
| Visual rhythm | 9.0 / 10 |
| Commercial credibility | 9.3 / 10 |

Undesirable perceptions — lower is better:

| Perception | Score |
| --- | ---: |
| PDF / document-like | 2.1 / 10 |
| Generic responsive website | 2.0 / 10 |
| Creative-agency gimmick | 1.2 / 10 |
| SaaS / app-like | 1.1 / 10 |
| Over-animated | 1.3 / 10 |

## Release recommendation

**READY FOR PRODUCTION.**

All visual, interaction, overflow, console, reduced-motion, desktop, TypeScript, ESLint, build, unit, focused Phase 2 E2E, existing mobile regression E2E, and diff-integrity gates pass. Remaining blockers: none.

## Final mobile surgical polish — 2026-08-26

- Removed the visual section-title span and focus expansion from the edge rail at mobile and tablet widths. The rail now exposes count-only visual feedback while retaining full `aria-label` and `aria-current` information on its 44px-or-larger controls.
- Reduced the strong How We Work story step field from `min(60svh, 31rem)` to `min(52svh, 27rem)`. This moves centered active content upward by approximately 32px at the requested viewports without changing sticky behavior, stage order, or native scrolling.
- Verified Understand, Activate, and Follow Through at 360×800, 375×812, 390×844, 393×852, 430×932, and 768×1024. Verified focused count-only rail states on Home, How We Work, Team, Contact, and Case Studies at phone and tablet widths.
- Verified protected desktop compositions at 1280 and 1440px. Phase 2 E2E: 14/14 passed. Mobile regression E2E: 14/14 passed.

Evidence: `audit/mobile-experience-phase-2/final-surgical-polish/`
