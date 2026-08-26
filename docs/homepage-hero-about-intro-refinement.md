# Homepage Hero + About Us Intro Refinement

## Outcome

The homepage now opens with a more decisive brand statement while preserving clear UK/European relevance and local execution. The About opening now functions as a composed editorial frame rather than a large text-and-whitespace field.

## Headline evaluation

Twelve English directions were assessed for clarity, premium tone, rhythm, visual line breaks and commercial authority.

| Option | Clarity | Premium tone | Rhythm / line breaks | Decision |
| --- | ---: | ---: | ---: | --- |
| Advance your next UK or European market move with people on the ground. | 9 | 8.5 | 8 | Clear, but remains service-led. |
| Put your next UK or European market move in local hands. | 8 | 8 | 8.5 | Risks implying simple outsourcing. |
| Move your UK or European plans forward with a team on the ground. | 9 | 8 | 8.5 | Strong but still functional. |
| Turn your next UK or European move into credible local action. | 9 | 8 | 7.5 | Clear, but noun-heavy. |
| Make your next UK or European market move real on the ground. | 9 | 8 | 8 | Direct but slightly blunt. |
| Give your next UK or European market move local momentum. | 8.5 | 9 | 9 | Elegant, but “give” feels less authoritative. |
| Take your next UK or European market move further, with the right team on the ground. | 8.5 | 9 | 7 | Too long for the composition. |
| Build real local momentum behind your next UK or European market move. | 9 | 9 | 7.5 | Strong meaning, long visual measure. |
| Move from market ambition to local action in the UK and Europe. | 9 | 8.5 | 8.5 | Credible but more consultancy-like. |
| Where your next UK or European market move becomes local action. | 8.5 | 9 | 8.5 | Editorial, but less decisive. |
| Advance your UK or European ambitions where it matters: on the ground. | 8 | 9.5 | 8.5 | Premium, but slightly rhetorical. |
| **Move your UK or European ambitions forward—on the ground.** | **9.5** | **9.5** | **9.5** | **Selected: concise, decisive and visually strong without overclaiming.** |

Selected Chinese direction:

> 让你的英国与欧洲市场行动，在本地真正向前推进。

This is independently written around actual in-market progress. It avoids a literal translation of “ambitions” and uses the more commercially natural 市场行动.

## Homepage refinement

- Replaced the functional “build your next market move” sentence with a shorter, more authoritative statement.
- Tightened the supporting copy into a validation → engagement → launch/exhibition → local momentum sequence.
- Recast the operating line as three controlled editorial statements: China-side understanding, market judgement and one local team carrying the work forward.
- Narrowed body measures, improved CTA spacing and balanced the headline measure.
- Added a fine restrained frame around the existing real-project visual and a slight desktop offset. The imagery, motion system and interaction remain unchanged.
- Preserved company-project discussion as the primary CTA, Case Studies as secondary and the partner route as tertiary.

## About opening refinement

- Preserved the established strategic headline in both languages.
- Added an indexed top rail to establish the section as an intentional editorial opening.
- Added one subtle vertical grid rule on desktop to create tension between statement and operating logic.
- Rewrote the supporting paragraph around headquarters intent becoming coordinated local market action.
- Added a compact three-stage operating frame: headquarters intent, UK/European market judgement and coordinated local action.
- Added a restrained route rail connecting China-side context, UK/Europe coordination and local execution.
- On mobile, the same index, rule, operating frame and route rail remain visible in a deliberate stacked composition; the design does not collapse into an unstructured text column.
- No new imagery, animation, decorative illustration, service list or large copy block was introduced.

## QA

- Browser review: English and Chinese homepage and About opening.
- Width coverage: 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 pixels.
- Homepage checks: headline breaks, supporting-copy measure, CTA hierarchy, image framing and text/image balance.
- About checks: first-section structure, desktop tension, mobile stacking, transition to the second section and bilingual rhythm.
- Accessibility checks: one H1, semantic ordered list, labelled operating frame, keyboard menu behavior, focus restoration, automated serious/critical findings and reduced motion.
- Responsive checks: no horizontal overflow across the tested range.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS with zero warnings.
- `npm test`: PASS — 121 passed, 0 failed, 11 conditional/historical skips.
- Focused production-browser regression: PASS — 52 passed, 0 failed, 28 intentional project-specific skips.
- `npm run build`: PASS — optimized production build generated 100 static pages.

## Files changed

- `content/phase5.ts`
- `components/sections/Phase5Homepage.tsx`
- `app/[lang]/about/page.tsx`
- `e2e/brand-refresh.spec.ts`
- `docs/homepage-hero-about-intro-refinement.md`

Visual QA captures were written to `audit/` for the refined English/Chinese homepage and About mobile openings.
