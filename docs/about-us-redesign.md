# About Us redesign

Implemented and reviewed on 2026-08-23 for `/en/about` and `/zh/about` only. The shared header, mobile navigation and footer were touched only to change the English page label from **About** to **About Us**.

## Before

The previous About page had three structural weaknesses:

- The globe was a small, isolated data-visualisation. It did not give Beijing → London → Europe a clear hierarchy, did not justify WebGL as a signature moment, and did not have a robust low-motion/failure story.
- The team was a generic 3 + 2 directory. Mixed editorial, passport and square portrait sources were exposed at equal scale, and the layout did not communicate one accountable team.
- The page repeated the same heading, paragraph and grid/table composition. Specialist capability, operating responsibility and handover were explained in several similarly weighted blocks, while real work had insufficient visual presence.

The redesign replaces that structure rather than reskinning it.

## References

Nine current globe references were reviewed before implementation:

1. COBE v2.0.1
2. three-globe
3. r3f-globe
4. react-globe.gl
5. shehzadres/Webgl-Data-Globe
6. Magic UI Globe
7. Aceternity GitHub Globe
8. GitHub's production globe engineering articles
9. globe.gl

The per-reference techniques, strengths, weaknesses, performance implications, reuse decision and licence are recorded in [about-us-globe-reference-audit.md](./about-us-globe-reference-audit.md).

## Final editorial architecture

The page now has nine deliberately unequal chapters:

1. **Identity** — a light, asymmetrical About Us hero.
2. **Why we exist** — a stone chapter defining the fragmentation problem.
3. **Geography** — the full-dark signature Beijing → London → Europe experience.
4. **Operating model** — five connected functions in a continuous hairline sequence.
5. **People** — the editorial team profile index.
6. **Specialist depth** — a dark typographic network, not a box catalogue.
7. **Real work** — one large verified media panel with a three-project index.
8. **Accountability** — one consolidated four-principle closing structure.
9. **Next step** — one decisive dark CTA with only “Discuss a Project” and “See How We Work”.

This creates light → stone → dark → light → dark → media → light → dark rhythm while retaining the established porcelain, mist, ink, pearl and champagne tokens.

## Globe

### Chosen technology

The implementation uses pinned `cobe@2.0.1` as a progressively loaded dotted land renderer, with an owned SVG great-circle route layer, DOM labels, a semantic legend and an always-present SVG fallback.

COBE was selected because the story needs a fixed art-directed point of view and nine locations, not political boundary detail or unrestricted exploration. It provides a restrained point-cloud sphere for approximately 5.9 KiB gzip. The owned overlay provides route-specific weight, exact one-shot timing, label collision decisions and a complete no-WebGL state that COBE's native global arc settings cannot provide.

R3F + Three + three-globe was rejected because country polygons, lighting and orbital control did not add enough commercial meaning to justify a much larger dependency graph and continuous scene lifecycle. Magic UI was not copied because its current wrapper targets COBE's older render API and its continuous high-DPR rotation has documented performance concerns. Aceternity source was not reused because its visual language is too dense and its component licence is custom rather than MIT.

### Art direction and camera

- Fixed conceptual camera centre: approximately 52°E / 34°N.
- Desktop sphere diameter: 62–68vw with an 860px cap, intentionally right-weighted and partially cropped where useful.
- Visual treatment: matte ink sphere, warm dotted cartography, very low atmosphere, champagne route and node accents, no stars, latitude cage, country fill, neon or permanent spin.
- Primary route: Beijing → London, 1.45px overlay stroke and 2.35s desktop / 1.9s mobile one-shot draw.
- Secondary routes: London → Paris, Berlin, Brussels, Rome, Madrid, Amsterdam and Vienna, 0.78px and 42% visual prominence, sequentially staggered.
- Desktop labels: Beijing, London, Paris, Berlin, Rome and Madrid where collision-free; the legend names all seven European capitals.
- Mobile labels: Beijing and London only. Paris, Berlin and Rome retain the quieter route context; the complete Europe set remains in the readable legend.

The locations use the requested verified coordinates. Copy explicitly states that the cities describe project geography and market context, not offices, permanent teams or formal partners.

### Choreography

Desktop sequence:

1. quiet sphere
2. Beijing origin at 80ms
3. primary connection from 360ms
4. European context from 2.8s
5. settled and static at 4.2s

Mobile uses a shorter 3.3s sequence (60ms / 280ms / 2.15s stage thresholds), reduced route/label density and shorter route transitions. Profiling showed that 6,800 samples are sufficient for the deliberately sparse cartography at every width, so desktop also uses that restrained tier. SVG route animations use a pausable CSS timeline so leaving the viewport or hiding the page pauses both camera progression and active route drawing without desynchronising the story. Reduced motion skips the sequence and shows the completed static network immediately.

### Performance and failure strategy

- COBE is dynamically imported only when the chapter enters a 360px IntersectionObserver margin.
- No WebGL dependency is requested in the initial critical path. Production resource timing confirmed that the COBE chunk is absent at the top of the page and fetched only when the globe approaches.
- The short camera loop pauses outside the viewport and on `document.hidden`, is cancelled on cleanup, and stops permanently after the settled state.
- Route animation also pauses outside the viewport/page visibility state.
- Desktop DPR is capped at 1.1 and mobile DPR at 1.25 even on 2x/3x displays. The lower desktop tier improved measured animation frame delivery from approximately 33 fps to 58 fps while retaining the intended dotted land silhouette.
- React state changes only at five narrative stages; camera frames update COBE imperatively.
- ResizeObserver, IntersectionObservers, visibility listeners, WebGL listeners and COBE resources are cleaned up.
- Dynamic-import and globe-creation failure are caught. WebGL absence/context loss leaves the content and SVG visual intact.
- The fallback is a matte SVG sphere with restrained Eurasia/Africa land silhouettes, dotted land, the same route geometry, nodes, labels and full textual legend.

### Measured implementation impact

There was no WebGL library or globe-specific lazy chunk before this phase. The incremental dependency is isolated to one on-demand file:

| Measurement                              |                                    Result |
| ---------------------------------------- | ----------------------------------------: |
| COBE dynamic chunk                       |               12,943 B raw / 5,905 B gzip |
| About route client chunk                 |              28,107 B raw / 10,393 B gzip |
| Next build About route                   | 10.4 kB route size / 181 kB first-load JS |
| Desktop canvas ratio on a 2x display     |                                      1.10 |
| Mobile canvas ratio on a 3x display      |                                      1.25 |
| Desktop visible frame delivery           |       58.3 fps during the finite sequence |
| Mobile visible frame delivery            |       60.8 fps during the finite sequence |
| Desktop/mobile off-screen frame delivery |                           60.3 / 61.0 fps |
| Desktop/mobile settled frame delivery    |                           60.4 / 60.3 fps |
| Desktop JS heap after interaction        |      ~6.8 MB in headless Chromium profile |
| Mobile JS heap after interaction         |      ~6.7 MB in headless Chromium profile |
| Globe WebGL draws while off-screen       |                  0 during an 800ms sample |
| Globe WebGL draws after settling         |                 0 during a 1,000ms sample |

The first near-viewport WebGL setup produced one 72ms desktop / 53ms mobile long task in headless Chromium. It occurs before the section is visible because of the load margin. No long tasks were observed during the finite camera sequence, off-screen sample or settled sample. These measurements are local Chromium diagnostics rather than promises for every device.

## Team

### Layout tests

Three compositions were tested against the supplied photography:

- **A — portrait rail:** rejected. It made five portraits equally dominant and amplified the difference between one editorial portrait, three passport/headshot sources and one square source.
- **B — profile index:** selected. A single controlled editorial portrait is paired with a numbered 01–05 index on desktop/tablet. Mobile becomes five one-column editorial rows, so it never reproduces the old 3 + 2 grid or compresses five faces across the screen.
- **C — biographical rows:** rejected for the current release. The sources cannot support long repeated image rows without verified biographies, and blank/profile-placeholder copy would violate the content rule.

The selected index exposes every member and supports mouse, Tab, Home/End and arrow-key operation with canonical tab semantics. A future verified profile expands inline beneath the anchored portrait; no modal or separate page is required.

### Portrait audit

No face or identity was generated, replaced or materially altered. CSS monochrome treatment, consistent framing and per-person focal points unify the supplied photographs. Source derivatives are sized so the active layout does not force unsafe enlargement; Richard uses `contain` plus inset rather than cropping or upscaling his 649px square source.

| Person          |  Original source |   Web derivative |  Payload | Focal point | Fit/treatment  |
| --------------- | ---------------: | ---------------: | -------: | ----------- | -------------- |
| Vivian          | 1080 × 1440 JPEG | 1000 × 1333 WebP | 65,970 B | 50% / 36%   | cover / mono   |
| Fei Cao         | 1086 × 1448 JPEG | 1000 × 1333 WebP | 47,430 B | 50% / 38%   | cover / mono   |
| Minghan         | 1672 × 2508 JPEG |  933 × 1400 WebP | 53,778 B | 50% / 35%   | cover / mono   |
| Patrick Lenihan |  1024 × 1536 PNG |  933 × 1400 WebP | 42,496 B | 50% / 33%   | cover / mono   |
| Richard Bußmann |    649 × 649 PNG |   649 × 649 WebP | 27,328 B | 50% / 40%   | contain / mono |

The five derivatives total 237,002 B. Desktop portrait width is capped at 660px; Richard's inset keeps his rendered image below his 649px source width. Mobile portraits render at 112 × 144px.

### Truth and future profile architecture

Only approved names and supplied portraits are currently published. There are zero invented titles, employers, universities, awards, biographies or people-to-case assignments.

`TeamMember` is ready for verified `role`, `shortPositioning`, `projectResponsibility`, `clientValue`, `biography[]`, `expertise[]`, `selectedExperience[]`, focal point, fit and mono/colour treatment. The profile UI conditionally renders these fields only when data exists. The architecture therefore supports the required sequence:

1. background
2. responsibility at Venus Bridge
3. what that responsibility means for the client
4. selected expertise and experience

Until factual copy is approved, the page remains complete through the operating-model client-value sequence rather than personal placeholders.

## Real work and content truth

The proof chapter uses one active image and an adjacent three-project index:

- BYD BD11 Double-Decker Bus Launch, London
- Changan European Brand Launch 2025, Munich
- CATL Open Day 2025, Munich

Only rights-approved portfolio media, locations, objectives and functions in the published record are used. The component never assigns a named team member to a case. Desktop hero files are 23–88 KB; mobile alternatives are 20–75 KB, and only the active project image is mounted at a time.

Content changes:

- Removed the old small globe composition, 3 + 2 team cards and six-box specialist catalogue.
- Consolidated fragmented responsibility, judgement, approval and handover explanations into one accountability chapter.
- Reframed the generic operating content as five functions connected directly to existing client-value statements.
- Added the stronger project media/index chapter and explicit no-office/no-partner geographic note.
- Preserved the core cross-border positioning while reducing repeated explanation.
- Refined Chinese as professional business copy rather than a literal line-by-line translation.

## Responsive decisions

- **1440 / 1920:** full 12-column compositions, 92svh signature globe, 650–850px sphere target, anchored portrait and adjacent index.
- **1280 / 1024:** globe remains a full-height signature chapter; copy, legend and sphere retain separate hierarchy without overflow.
- **768:** text and globe stack vertically; the desktop profile index remains usable in an 8-column/tablet composition.
- **375 / 390 / 430:** four-column flow, cropped 128vw globe, Beijing/London labels only, five portrait rows, two-column accountability principles and one active project image.
- No tested width has horizontal document or body overflow.

## QA

### Automated checks

- TypeScript: pass (`tsc --noEmit`).
- ESLint: pass with zero warnings.
- Node content/contract suite: 114 pass, 11 intentionally skipped, 0 fail.
- Production build: pass; 94 static pages generated.
- Targeted About/IA Playwright coverage: geography hierarchy, finite sequence, viewport pause/resume, reduced motion, WebGL failure, team/project keyboard controls, EN/ZH content, shared navigation label and responsive overflow.
- Full production Playwright suite: 95 pass, 51 intentional project/viewport skips, 0 fail.
- Axe: zero violations at EN 390, EN 1440, ZH 390 and ZH 1440 after correcting tab ownership and quiet-index contrast.
- Console/page errors: zero across the final responsive screenshot matrix.

### Responsive visual review

Final production screenshots are in `audit/about-us-redesign/final/`:

| Locale        | Widths                                     | Result                                 |
| ------------- | ------------------------------------------ | -------------------------------------- |
| EN            | 375, 390, 430, 768, 1024, 1280, 1440, 1920 | Pass; no horizontal overflow           |
| ZH            | 390, 1440                                  | Pass; no horizontal overflow           |
| WebGL failure | 1440                                       | Pass; complete SVG fallback and legend |

The 1440 review confirms a 920px signature geography chapter with a deliberately framed large globe, distinct route hierarchy, editorial team composition, real image proof and consolidated accountability. Mobile retains the same story without tiny five-across portraits or a squeezed full globe.

### Performance profile

- Initial critical path: globe enhancement false and COBE chunk not requested.
- Visible: 58.3 fps desktop and 60.8 fps mobile in the local headless Chromium sample; finite camera/render sequence only, with no rotation or permanent particle loop and no animation long task.
- Off-screen during an active sequence: 60+ fps page frame delivery; narrative stage and SVG route progress hold; WebGL draw calls measured at zero.
- Settled in view: 60+ fps page frame delivery; WebGL draw calls measured at zero over one second.
- Reduced motion: completed network immediately, with no traversal or camera choreography.
- Fallback: forced WebGL failure produces no runtime error and leaves the SVG/semantic story visible.

## Human factual input still required

The only missing content is an approved factual biography pack for Vivian, Fei Cao, Minghan, Patrick Lenihan and Richard Bußmann: verified role, relevant background, project responsibility, client value, expertise and selected experience. The release deliberately hides all absent fields.
