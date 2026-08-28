# Sitewide desktop editorial grid audit

## Executive summary

The audit covered Home, Companies, Partners, How We Work and About at 1440 and 1600px, with Case Studies visually checked as a protected page. Twenty-five ordinary section headings were measured. Their average line count fell from **4.32 to 2.68**, and the number running to five or more lines fell from **9 to 0**. Heroes, the About geography/globe chapter, closing conversion compositions, navigation, Contact, Case Studies and mobile architecture were preserved.

Before/after screenshots are stored in `audit/desktop-editorial-grid/before/` and `audit/desktop-editorial-grid/after/`. Mobile regression captures are stored in `audit/desktop-editorial-grid/mobile-regression/`.

## Headline inventory findings

- **Home:** two audience-value headings formed five- and six-line towers; two prior composition changes also displaced ordinary model and process headings from the shared left spine.
- **Companies:** four consecutive ordinary headings used near-identical narrow measures and four-line stacking.
- **Partners:** the partners-receive statement reached six lines; adjacent headings repeated the same narrow measure.
- **How We Work:** two ordinary statements reached six lines, while the process title used a deliberately compact but overly restrictive measure.
- **About:** four ordinary headings reached five or six lines, creating the highest concentration of vertical headline towers.
- **Case Studies:** the existing evidence-led composition remained coherent and was not changed.

## Repeated narrow-heading patterns

The repeated pattern was eyebrow + 11–15ch heading + full-width or multi-column system below. It made structurally different chapters read like the same template and increased vertical section height without adding hierarchy. The issue was measure, not typography scale or whitespace itself.

## Desktop headline system

Three desktop-only roles now begin at 1200px:

| Role | Measure | Use |
| --- | ---: | --- |
| Compact | 18ch | Split proof, sticky process and constrained two-column statements |
| Standard | 22ch | Most ordinary section headings |
| Wide | 26ch | Longer editorial statements with a broad content field |

Existing body-copy measures remain unchanged (`type-body` max-width 44rem and `type-lede` max-width 46rem). This keeps reading lengths controlled without creating another token layer.

## Page-by-page corrections

### Home

- Restored “Four routes…” and “Make the market moment…” to the established left editorial spine.
- Widened the two audience-value headings, the expertise heading and the exhibition-process statement.
- Preserved the hero, Real Projects, five-situation architecture, dark index, conversion section and all existing motion.

### Companies

- Applied standard or wide measures to the opportunity, solution-route, client-benefit and exhibition-pipeline headings.
- Preserved every list, grid, body paragraph, CTA and media relationship.

### Partners

- Widened the capability, partner-value and process headings.
- Preserved the intentional final media/text split and its offset heading anchor.

### How We Work

- Widened the responsibility, desktop process, market-moment and specialist-capability headings.
- Preserved the sticky process architecture, stage order, mobile indexed story and closing conversion composition.

### About

- Widened the why, operating-model, team, specialist and accountability headings.
- Rebalanced the operating-model desktop grid from 4/7 to 5/6 columns so the headline and capability list share the field more evenly.
- Preserved the compact opening, geography/globe chapter, team profile architecture and closing conversion section.

## Headline-anchor logic

Ordinary section headings use the shared left container spine. Offsets remain only where another compositional element justifies them: the Home journeys context split, Partners closing media/text split, About hero and closing conversion composition, and the geography/globe chapter. No headings are centred by default.

## Protected elements

- **Heroes changed:** 0
- **Body copy changed in this pass:** 0
- **Mobile architecture changed:** 0
- **Case Studies changed:** 0
- **Contact changed:** 0
- **New media or motion added:** 0

## Mobile regression

The measure roles are enclosed in `@media (min-width: 1200px)`. Visual captures and automated overflow checks passed at 390, 430 and 768px across all five altered pages. The existing mobile headline measures, stacking, sticky story, rails, navigation, motion and touch behavior remain intact.

## Quantitative before/after

| Metric | Before | After |
| --- | ---: | ---: |
| Ordinary section headings measured | 25 | 25 |
| Average headline lines | 4.32 | 2.68 |
| Headings at 5+ lines | 9 | 0 |
| Ordinary headings outside 2–4 lines | 0 | 0 |

The reduction comes from width and grid composition only; font sizes and approved copy were not reduced.

## Optional refinements

No further sitewide recomposition is recommended before release. The About globe statement remains intentionally compact within its immersive visual chapter and should not be normalized into the ordinary heading system.
