# Visual architecture correction audit

Date: 2026-08-25

## Why this correction was required

The preceding visual-architecture pass applied a single preservation strategy to three different page roles. It placed media inside dark stages, used `contain` or natural-ratio imagery inside fixed presentation areas, and combined primary/supporting images in Work previews. The result protected complete source frames but diminished the photography through letterboxing, nested framing, black matte areas and uneven split compositions.

This correction replaces that generic rule with page-specific decisions:

- About establishes identity and operating logic through typography only.
- The homepage presents a deliberately narrow set of landscape commercial images directly, with minimal controls.
- The Work index uses exactly one explicit representative cover per project.
- Work detail pages retain the complete editorial media system and mixed-ratio galleries.

## Patterns removed

- The project image, media import and portfolio lookup were removed from the About opening.
- The homepage variable-width multi-image stage, graphite wrapper, internal padding, fixed visual heights, `contain` treatment and toolbar-like lower panel were removed.
- Portrait imagery was removed from the homepage hero set.
- Work-index `previewSupportingMediaId` rendering, two-image grids, portrait/landscape split stages and black preview canvas were removed.
- Work metadata no longer sits in a large black panel. It uses the page background, fine rules and normal ink hierarchy.
- Mobile Work previews no longer open a black card; they reveal one cover on a subtle porcelain field.

## About opening

The opening is a compact typographic composition with a 12-column desktop grid. The headline occupies columns 1–7 and the supporting statement occupies columns 9–12 with a restrained vertical rule. Chinese uses three intentional line groups so responsive wrapping cannot accidentally produce a fourth line. The operating sequence is a single horizontal rule-based element at the lower boundary, without cards or vertical boxes.

The section targets approximately 66–68svh, including the navigation offset. Primary content begins after a controlled 7vh top interval rather than being vertically centred.

## Homepage hero media audit

Only five approved landscape assets are used. Each was visually reviewed at source scale and selected for clear commercial context, readable subjects and compatibility with direct full-width display.

| Order | Asset                                   | Resolution | Subject and reason                                                                                     |
| ----- | --------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| 01    | `changan-europe-launch-2025-03-gallery` | 952×536    | AVATR vehicle and attendees in a recognisable European launch setting; strong central product context. |
| 02    | `catl-open-day-2025-01-hero`            | 952×536    | CATL stage, audience and event identity in one complete landscape frame.                               |
| 03    | `geely-london-brand-launch-01-hero`     | 1440×1080  | Speaker, audience, GEELY identity and design presentation; strong launch evidence.                     |
| 04    | `agibot-london-launch-01-hero`          | 1600×1067  | Speakers and AGIBOT Product Launch screen; strong technology-event context.                            |
| 05    | `london-automotive-brand-film-01-hero`  | 952×536    | Recognisable London street, vehicle and campaign title; clear UK brand evidence.                       |

All render with intrinsic width/height. There is no fixed dark image stage, `object-fit: contain`, letterboxing or portrait accommodation. Previous/next, pointer swipe/drag and Left/Right keyboard input remain available, but controls are unboxed and subordinate to the image.

## Work index cover audit

`previewMediaId` is the explicit index-cover field. It is independent of `heroMediaId` and the project gallery. Selection was based on visual review, not source order alone.

| Project                      | Candidate reviewed                  | Orientation / resolution | Main subject and safe area                                                              | Selected cover                            | Reason                                                                                        |
| ---------------------------- | ----------------------------------- | ------------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| BYD BD11 London              | Hero and landscape sequence         | Landscape, 952×540       | Full red bus with venue and people; product remains clear to all edges                  | `byd-bd11-london-01-hero`                 | Strongest immediate product and UK launch reference.                                          |
| Changan European launch      | Hero, cover and launch gallery      | Landscape, 952×536       | Vehicle centred with attendees around it; no crop required                              | `changan-europe-launch-2025-03-gallery`   | Best balance of product visibility and launch context.                                        |
| Geely London launch          | Landscape hero and two portraits    | Landscape, 1440×1080     | Speaker left, GEELY screen right, audience foreground                                   | `geely-london-brand-launch-01-hero`       | Replaces the portrait/split preview with a complete branded event scene.                      |
| CATL Open Day                | Seven landscape frames              | Landscape, 952×536       | Stage identity and audience contained within frame                                      | `catl-open-day-2025-01-hero`              | Most recognisable overview of the project.                                                    |
| Leapmotor at IAA             | Seven landscape frames              | Landscape, 952×538       | Exhibition stand and covered vehicles with overhead brand mark                          | `leapmotor-iaa-2023-01-hero`              | Establishes industry and exhibition context immediately.                                      |
| AGIBOT London launch         | Landscape stage and two portraits   | Landscape, 1600×1067     | Speakers and product-launch identity across the wide screen                             | `agibot-london-launch-01-hero`            | Removes the portrait/small-landscape split and gives one strong technical-event frame.        |
| London automotive brand film | Seven landscape frames              | Landscape, 952×536       | London bus, street and campaign title with safe full-frame composition                  | `london-automotive-brand-film-01-hero`    | Clearest UK-located brand-film reference.                                                     |
| Wang Linkai London concert   | Landscape finale and two portraits  | Landscape, 1600×1000     | Performers and audience form a complete concert finale                                  | `wang-linkai-london-concert-01-hero`      | Replaces portrait pairing with the most recognisable live-event context.                      |
| Yue Yunpeng London live      | Two stage landscapes                | Landscape, 1440×1080     | Performers and red stage identity remain complete                                       | `yue-yunpeng-london-live-01-hero`         | Stronger contextual overview without crop.                                                    |
| London Fashion Week          | Two full-length portraits           | Portrait, 1440×1920      | Subject occupies lower-right with architectural context; full figure must remain intact | `london-fashion-week-2025-01-hero`        | Strongest editorial frame; handled as a dedicated narrow portrait, never paired.              |
| Beauty & fashion content     | Square, portraits and one landscape | Landscape, 1000×852      | Talent, product and PHYSIOGEL identity all readable                                     | `beauty-fashion-brand-content-05-gallery` | More commercially representative than the former generic square portrait.                     |
| European road lifestyle      | Seven automotive portraits          | Portrait, 1075×1571      | Vehicle occupies lower third with road and sky context                                  | `european-road-lifestyle-01-hero`         | Best complete environmental automotive composition; no credible landscape alternative exists. |

## Work preview behaviour

- Desktop remains a text-led index with a sticky right preview.
- Hover, focus and row-button click update the single cover and metadata with a 220ms crossfade; the last selection persists.
- Landscape covers use the full preview width with intrinsic height.
- Portrait covers use 68% of the preview width with a 68vh maximum. Remaining area is normal page whitespace, not a black canvas.
- Mobile uses one disclosure at a time and shows the same single explicit cover.
- Filtering resets the active cover to the first project in the filtered set.

## Detail-page boundary

No detail-page media, layout block, route, taxonomy or verified project copy was removed. Mixed portrait/landscape galleries remain available only where users have chosen to inspect the complete case.

## Responsive and accessibility rules

- Desktop 1440, 1280 and 1024: 12-column About composition, two-region homepage, sticky Work preview.
- Tablet 768: compact typographic About flow, direct homepage media, inline Work disclosures.
- Mobile 430 and 390: no About image, full-width landscape homepage image, swipe gesture, and one inline Work cover.
- Controls retain 44px targets, accessible names and keyboard operation.
- Case selection uses `aria-pressed`; mobile disclosure uses `aria-expanded` and `aria-controls`.
- Reduced-motion keeps preview state changes immediate and avoids animated traversal.

## Remaining constraints

- London Fashion Week and European Road are portrait-only selections; intentional ivory whitespace is used around them in desktop preview.
- Homepage source widths of 952px are sufficient for their rendered half-page footprint but should not be enlarged beyond the current responsive container.
