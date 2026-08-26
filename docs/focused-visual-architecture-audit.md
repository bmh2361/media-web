# Focused visual architecture audit

Date: 2026-08-25

## Scope and original problems

The pass covered the homepage hero media module, About hero, core-team index, Work index, shared portfolio-image presentation, responsive interaction and reduced-motion behaviour.

- The About hero used a tall text-only composition. It communicated the operating model but provided no visible evidence of work on the ground.
- The operating sequence was split between a vertical list and a second three-cell footer, which weakened the intended headquarters → market judgement → local action narrative.
- Core-team source order did not match the required public hierarchy, and the six-column desktop grid treated all five people as peers instead of establishing a two-person leadership row.
- The homepage hero media module showed one fixed frame at a time, auto-advanced on desktop and hid its controls visually. The module therefore supplied neither an editorial rail nor meaningful manual navigation.
- Work previews used a uniform 440–680px cover stage, including forced 4:3 cover crops on mobile. Portrait and square evidence was made to behave like landscape imagery.
- Work hover/focus changed the sticky preview and persisted, but click immediately navigated instead of selecting context. Mobile exposed a linked card rather than an inline, one-at-a-time preview.

## Decisions

### About hero

- Desktop uses an asymmetric 7/5 editorial grid inside a 76–80svh minimum-height chapter rather than a full-screen hero.
- The visual is approved project evidence from the Geely London launch. It uses the media's intrinsic ratio (`natural`) and carries project place/year metadata.
- DOM and mobile reading order is label, headline, explanatory copy, evidence image, then the operating sequence.
- The operating sequence is one integrated three-part horizontal rule on larger screens and a vertical sequence on small screens.

### Team hierarchy

- Semantic/source order is: Dr. Minghan Bao (包铭涵 博士), Vivian Wang, Dr. Richard Bußmann, Dr. Patrick Lenihan, Dr. Fei Cao.
- Desktop row one is 6 + 6 columns; row two is 4 + 4 + 4 columns.
- Tablet/mobile preserve the same DOM order. Existing approved names, roles, credentials and biographies were not rewritten.

### Homepage media rail

- Five approved execution images are used: Changan Munich launch, CATL Munich stakeholder setting, London automotive brand film, London Fashion Week editorial, and AGIBOT London launch.
- All slides share a responsive visual height, while slide width is calculated from each source image's intrinsic width/height. Landscape and portrait evidence therefore remain visibly different.
- Navigation is manual only: visible previous/next controls, keyboard Left/Right, mouse/pen drag, native trackpad horizontal scroll, and native touch swipe/momentum with mandatory snap.
- The rail leaves trailing space and uses a narrow viewport so the next item edge remains discoverable. Active state is exposed with `aria-current` and the count is announced in a polite live region.
- Autoplay and continuous scale animation were removed. Reduced-motion switches programmatic movement from smooth to immediate.

### Work index

- The text-led desktop list remains primary. Hover, focus and row-button click select the preview; the latest selection persists after pointer exit. A separate arrow link opens the case.
- The right column remains sticky. Preview changes use a 220ms opacity transition (0ms under reduced motion).
- Primary and supporting evidence now render at intrinsic ratios. No preview uses forced `cover`, a uniform aspect ratio or the former slow zoom.
- Filters select the first valid preview in the filtered result and close any mobile expansion.
- Under the desktop breakpoint, each row is a disclosure button. One inline preview can be open at a time, with a separate full-case link. No functionality depends on hover.

## Preview media audit

The recommendation below applies to the selected Work-index preview, not every image in the case-study gallery. `Natural` means intrinsic ratio with no crop; paired previews preserve both source ratios inside the editorial grid.

| Project | Selected preview evidence | Source ratio / subject | Crop assessment | Index mode |
| --- | --- | --- | --- | --- |
| BYD BD11 London | `byd-bd11-london-01-hero` | 952×540, vehicle / venue landscape | Wide frame is readable without crop | Natural |
| Changan European launch | `changan-europe-launch-2025-03-gallery` | 952×536, launch landscape | Stage and vehicle context should remain intact | Natural |
| Geely London launch | `geely-london-brand-launch-02-cover` + hero | 1080×1584 portrait + 1440×1080 landscape | Portrait subject is unsafe in a landscape cover | Paired natural |
| CATL Open Day | `catl-open-day-2025-01-hero` | 952×536, presentation landscape | Wide event context is already composed | Natural |
| Leapmotor at IAA | `leapmotor-iaa-2023-01-hero` | 952×538, exhibition landscape | Stand context should remain intact | Natural |
| AGIBOT London launch | `agibot-london-launch-02-cover` + hero | 1280×1920 portrait + 1600×1067 landscape | Product/speaker portrait is unsafe in 4:3 cover | Paired natural |
| London automotive brand film | `london-automotive-brand-film-01-hero` | 952×536, automotive landscape | Cinematic frame is already composed | Natural |
| Wang Linkai London concert | `wang-linkai-london-concert-02-cover` + hero | 1280×1920 portrait + 1600×1000 landscape | Performer portrait requires full-height preservation | Paired natural |
| Yue Yunpeng London live | `yue-yunpeng-london-live-01-hero` | 1440×1080, stage landscape | Existing 4:3 source can display naturally | Natural |
| London Fashion Week | hero + cover | 1440×1920 + 1279×1920, full-length portraits | Full figures are unsafe in landscape crops | Paired natural |
| Beauty & fashion content | hero + supporting | 800×800 square + approved supporting frame | Product/talent composition should not be normalised | Paired natural |
| European road lifestyle | hero + supporting | 1075×1571 portrait + approved supporting frame | Vehicle/environment framing requires original ratios | Paired natural |

## Duplication and sizing audit

- About uses Geely launch evidence, which is not one of the five homepage hero-rail frames.
- The homepage rail deliberately spans five different project contexts rather than repeating multiple images from one case.
- The homepage proof section remains a separate case-navigation module; its reuse of project families is contextual rather than a duplicate of the exact hero-rail frame.
- Source dimensions in the approved manifest range from 800px square evidence to 1600×1920 portrait evidence. Rendering sizes are capped by container/viewport size, and no new upscaling transform or generated crop was introduced.
- Shared `ArtDirectedImage` and `PortfolioImage` components remain the source of responsive AVIF/WebP delivery, alt text and presentation metadata.

## Responsive behaviour

- 1440+ and 1280: two-column homepage hero; five-item variable-width rail; 7/5 About hero; 6+6 then 4+4+4 team grid; sticky Work preview.
- 1024: desktop Work context remains available; homepage and About use the 12-column composition with restrained media heights.
- 768–1023: homepage rail is touch/trackpad scrollable; About follows document order; team becomes two columns; Work becomes inline disclosure because hover is not assumed.
- 390 and 430: controls remain 44px minimum, rail uses swipe/snap, About follows label → headline → copy → image → sequence, team is a single ordered column, and Work allows one expanded preview at a time.

## Accessibility and motion

- Rail, buttons, disclosures and case links have accessible names and keyboard focus paths.
- Active rail count uses `aria-live`; selected desktop cases use `aria-pressed`; mobile disclosures use `aria-expanded` and `aria-controls`.
- Left/Right keys operate the focused homepage rail.
- Reduced-motion removes smooth programmatic rail movement and sets preview/disclosure transition duration to zero.
- Images retain approved bilingual alt text through the shared media components.

## Known limitations

- Native browser momentum and snap physics vary slightly by operating system and input device.
- `aspect-ratio` metadata controls slide geometry; the shared art-directed derivatives remain responsible for codec and breakpoint source selection.
- This pass did not replace, retouch or regenerate approved imagery, and did not change case-study evidence claims.
