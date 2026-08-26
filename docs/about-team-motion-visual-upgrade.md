# About, Team, Motion & Global Experience

> Historical phase record. The current About Us page implementation, WebGL decision and portrait focal points are documented in `docs/about-us-redesign.md`; where the two records differ, the newer About Us redesign record supersedes this file.

## Architecture

### Repository audit

- Production repository: `D:\media web\media-web`
- Framework: Next.js 15 App Router, React 19, TypeScript 5, Tailwind CSS 3.
- Localisation: route-level `/en` and `/zh`, typed language helpers in `lib/i18n.ts`.
- Motion: existing `framer-motion` 12 runtime with shared tokens in `lib/motion-system.ts`.
- Media: Next Image plus the existing art-directed capability and portfolio registries.
- Testing: Node contract tests, Playwright, axe, production build and existing content/release validators.
- Existing colour, type, spacing and container tokens were already centralised in `app/globals.css` and `tailwind.config.ts`.

### Information architecture

Previous public navigation:

`Home → For Companies → For Partners → Case Studies → How We Work (/about) → Contact`

New public navigation:

`Home → For Companies → For Partners → Case Studies → How We Work → About → Contact`

Route changes:

- `/en/about` and `/zh/about` now contain the company, team and cross-border identity narrative.
- `/en/how-we-work` and `/zh/how-we-work` now contain the operational project journey.
- Header, mobile navigation, footer and sitemap use the new routes.
- `/about` was retained rather than removed, so existing inbound links do not break. Its former process content was separated into the new `/how-we-work` route; there is no obsolete URL requiring a redirect.

## About

The new page is ordered as:

1. company identity;
2. why Venus Bridge exists;
3. China to London / Europe connection;
4. responsibility-led delivery system;
5. supplied core-team portraits;
6. specialist delivery network;
7. verified project evidence;
8. accountability;
9. one primary conversion action.

Team profiles are data-driven in `content/team.ts`. Optional role, positioning, responsibility, client-value, biography, expertise and experience fields render only when present. This allows later factual expansion without changing the layout.

Five supplied names and photographs are published. No role, biography, employer, education, award, office, project involvement or institutional relationship was inferred. The project-proof section refers to published team functions and existing portfolio records rather than assigning unverified individuals to cases.

## Design System

- Preserved the existing near-black, warm ivory, greige and muted champagne palette.
- Reused existing display, section, lede, body, label and bilingual type scales.
- Reused the established page gutter and wide/standard container system.
- Used matte fields, hairlines and editorial rows instead of new card styles.
- Increased low-contrast metadata uncovered by axe rather than reducing type size.
- Added About to the existing stable dark header and matched the footer hierarchy.
- Added a consistent 4px arrow response to shared editorial buttons and an animated header underline.

## Motion

The existing shared motion system remains the only runtime:

- Level 1: link underline, arrow translation and subtle portrait scale (`1.015`).
- Level 2: existing 12–24px editorial group reveals using the shared timing/easing tokens.
- Level 3: the single China-to-London route draw on About.

Page transitions remain short opacity transitions. Native scrolling remains unchanged. No smooth-scroll interception, parallax layer or continuous animation was added.

Reduced-motion strategy:

- the globe listens to native `prefers-reduced-motion` through `matchMedia`;
- route paths render immediately in their final state;
- there is no camera movement, traversal or continuous rotation;
- the existing global reduced-motion CSS continues to suppress non-essential transitions.

## Globe

Implementation: `components/globe/CrossBorderGlobe.tsx` with location data in `content/locations.ts`.

The experience uses a lightweight projected SVG sphere rather than WebGL. Latitude/longitude values are projected into the graphic at runtime, and route arcs are generated from the data. The visual is supplemental; the same location meaning is present as semantic DOM text.

Locations:

- China: cross-border origin.
- London: primary UK delivery centre, consistent with existing company content.
- Munich: published project activity supported by the CATL, Changan and Leapmotor case records. The UI explicitly states that this is not an office or permanent team.

Performance and fallback:

- no render loop, texture, WebGL context or remote asset;
- no initial-bundle Three.js dependency;
- the same SVG is the mobile and no-WebGL implementation;
- reduced motion shows the final route immediately;
- core meaning remains readable if JavaScript is delayed because the section copy and location list are DOM content.

## Open-source references reviewed

- [Motion](https://github.com/motiondivision/motion) — viewport, scroll, spring and layout-animation principles; MIT.
- [Lenis](https://github.com/darkroomengineering/lenis) — smooth-scroll and WebGL synchronisation architecture; MIT. Not installed because native scrolling already meets the requirement.
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) and Drei — React 19 compatibility and demand-render considerations; MIT. Not installed because one restrained route does not justify a 3D renderer.
- [globe.gl](https://github.com/vasturiano/globe.gl) and [react-globe.gl](https://github.com/vasturiano/react-globe.gl) — data-driven arcs, points and labels; MIT. Used as an implementation reference only.
- [r3f-scroll-rig](https://github.com/14islands/r3f-scroll-rig) and [Codrops tutorial](https://github.com/14islands/codrops-scroll-rig-tutorial) — progressive DOM/WebGL enhancement and shared-canvas architecture; ISC/MIT. Not installed because there is no shared WebGL system.
- [Theatre.js](https://github.com/theatre-js/theatre) — choreography reference; Apache-2.0 core / AGPL studio. Not installed because existing Motion tokens cover the required sequence.

Technology decision: keep the existing Motion runtime and ship a data-driven SVG. This meets the narrative and visual bar with no new dependency or WebGL failure surface.

## Media

Original files remain unchanged in `D:\media web\people`.

Optimised WebP delivery variants were produced without enlargement or face alteration:

- Vivian: 1000 × 1333, focal point 50% / 36%.
- Fei Cao: 1000 × 1333, focal point 50% / 38%.
- Minghan: 933 × 1400, focal point 50% / 31%.
- Patrick Lenihan: 933 × 1400, focal point 50% / 30%.
- Richard Bußmann: 649 × 649, focal point 50% / 43%.

All five are rendered in a consistent 4:5 frame with `next/image`, responsive `sizes`, meaningful bilingual alt text and a maximum hover scale of `1.015`. The page no longer reuses capability photography as About-page identity imagery, reducing repeated hero-level media.

## Performance

- New runtime dependencies: none.
- Removed runtime dependencies: none.
- About route code: 3.78 kB; first-load JS: 156 kB in the production build.
- How We Work route first-load JS: 111 kB.
- Five delivered portrait files total approximately 237 kB before Next Image runtime variants.
- No smooth scrolling, WebGL, 3D model, texture or continuous render loop was introduced.

## QA

Automated checks:

- TypeScript: pass.
- ESLint with zero warnings: pass.
- Node contract tests: 114 pass, 11 intentionally skipped, 0 fail.
- Production build: pass; 94 static pages generated.
- Navigation, language switching, mobile menu and route structure: pass.
- About and How We Work heading/overflow checks: pass.
- Five portrait load and crop checks: pass.
- Globe primary/secondary geography contract: pass.
- Reduced-motion final-state contract: pass.
- Axe serious/critical findings on canonical pages including About and How We Work: 0.
- Full Playwright suite: 91 pass, 49 intentionally project/viewport-skipped, 0 fail.

Visual QA:

- Core pages: Home, For Companies, For Partners, Case Studies, How We Work, About and Contact.
- Languages: EN and ZH.
- Viewports: 1440 desktop, 768 tablet, 390 mobile.
- Total combinations: 42.
- Horizontal overflow: 0.
- Broken images: 0.
- Missing alt text: 0.
- Console/page errors: 0.
- Incorrect main/H1 landmark count: 0.
- Evidence: `audit/about-team-motion-visual-upgrade/`.

Remaining factual input:

- confirmed full public name for Vivian if more than the supplied display name is intended;
- confirmed full public name for Minghan if more than the supplied display name is intended;
- approved role, responsibility, client-value statement and biography for each person;
- any approved personal case involvement that may later be connected to published projects.
