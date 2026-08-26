# Phase 3.2C-R before/after audit

Date: 2026-08-13  
Scope: visual composition, typography, media layout, spacing and responsive behaviour only  
Frozen throughout: production strategy, navigation, content architecture, copy, CTA architecture and source media

## Evidence set

The audit covers 13 representative public pages in English and Chinese where applicable: the five canonical pages and three representative English case studies. Every audited page was captured at 1440, 1280, 768 and 390 pixels.

- Baseline: `audit/phase-3-2c-r/before/` (52 full-page captures)
- First recovery pass: `audit/phase-3-2c-r/pass-1/` (52 full-page captures)
- Second recovery pass: `audit/phase-3-2c-r/pass-2/` (52 full-page captures)
- Final confirmation: `audit/phase-3-2c-r/final/` (52 full-page captures plus nine close-ups)

## Homepage

Before, media dimensions were largely source-driven and display typography used one-off page clamps. The media stack therefore changed rhythm according to the underlying asset rather than the role of the image. Repeated proof modules also accumulated excess vertical distance.

After, the unchanged content uses a shared display, heading, lede, body and label hierarchy; hero, proof, card and mosaic media use explicit role-based ratios; and section spacing follows the shared container and spacing systems. The English page height at 1440 reduced from approximately 9,871 to 9,475 pixels, and at 390 from approximately 12,453 to 11,978 pixels. No copy, sequence, CTA or source media changed.

## Capabilities

Before, generated contain derivatives could create neutral padding when the same asset was required to behave as a cover image. Mobile and tablet media roles were repetitive, creator imagery was source-ratio dependent, and the long page lacked enough distinction between proof, card and landscape imagery.

After, cover contexts use approved unpadded sources, while media roles establish a stable visual hierarchy across hero, landscape proof, portrait proof and card usage. Creator tiles now maintain a stable role-led frame. The English page height at 1440 reduced from approximately 11,742 to 11,381 pixels, and at 390 from approximately 14,081 to 13,486 pixels. The capability architecture and wording remain unchanged.

## Work

Before, the 390-pixel hero placed two landscape images into squeezed equal columns, weakening the lead proof. Featured work rows also created a looser-than-needed cadence.

After, the mobile hero has one dominant proof image and two supporting images, with the existing four-image composition retained at larger breakpoints. Featured rows use the same content and order with a tighter, vertically aligned cadence and explicit portrait/landscape roles. The English page height at 1440 reduced from approximately 6,837 to 6,242 pixels, and at 390 from approximately 8,175 to 7,449 pixels.

## About

Before, the Chinese hero headline fragmented into too many short lines and the proof image used a source-driven frame. In the first recovery pass, a retained minimum height on the proof image caused the image to exceed its grid column and cover adjacent text; this was found in the live viewport review and corrected before the second pass.

After, the Chinese display measure forms an intentional two-line desktop composition, the proof block respects its grid, and section headings, body text and media use the shared systems. The sticky process treatment was removed in the final confirmation pass so the full-page composition remains stable without repeated fixed imagery. Approximate page height reduced from 5,021 to 4,503 pixels in English at 1440 and from 4,644 to 4,121 pixels in Chinese. Content and ordering remain unchanged.

## Contact

Before, the display type and form proportions were isolated page decisions, including an arbitrary two-column ratio.

After, the unchanged form uses the shared typography and a standard 4/8 split on the 12-column grid. Field order, labels, destinations and CTA behaviour are unchanged. Page height remains materially similar because the content itself was not compressed.

## Representative case studies

### CATL event

The event case remained compositionally stable. Its headings, narrative measure and galleries now use the shared hierarchy and explicit proof roles without changing any evidence or copy.

### Changan automotive launch

Before, the art-directed desktop derivative contained baked-in neutral padding. Applying cover at runtime could not remove those bands because they were part of the generated image.

After, cover roles select the approved unpadded source, eliminating the neutral bands while retaining the registered focal treatment and the same image. The case hero is now a continuous landscape proof at every audited breakpoint.

### Teal portrait series

Before, the mobile art-directed derivative introduced a large beige blank area and portrait media inherited inconsistent source ratios.

After, portrait proof roles preserve useful portrait composition and cover contexts use the clean approved source. No blank panel or broken media remains in the audited captures.

## Iteration record

1. Recovery pass 1 standardised the typography, container, grid, spacing and media-role foundations and exposed the About proof overflow during live visual review.
2. Recovery pass 2 corrected the overflow and verified all 52 page/breakpoint combinations, including English and Chinese typography.
3. Final confirmation removed the remaining sticky full-page artefact and re-captured all 52 combinations plus targeted close-ups.

## Final defect position

- P0: 0 before; 0 after.
- P1: 8 before; 0 after.
- Remaining P2 observations: the fourth homepage activity item remains swipe/scroll dependent at narrow widths, and the Capabilities page remains intentionally long and content-dense at 390 pixels. Neither is a broken or ambiguous composition.

The final screenshots show no blank or broken media, unresolved duplicate-media problem, column overlap, clipped typography or unintended source-padding band.
