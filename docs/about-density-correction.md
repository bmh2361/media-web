# About density correction

## Scope

This pass changes only the first two About sections. The later About content, team order, commercial positioning and desktop visual system remain unchanged.

## Previous height problem

Section 01 used `lg:min-h-[calc(64svh-88px)]`. Although its rendered content was already close to the desired range, the viewport-linked minimum made the section capable of expanding for presentation effect instead of remaining content-driven.

Section 02 inherited the global `.section-y` padding. At the protected desktop widths it measured approximately 718–737px, exceeding the requested 500–650px range and creating a slide-like transition between the first two chapters.

## Corrections

- Removed the viewport-linked minimum height from Section 01.
- Retained the successful two-column headline/supporting-copy composition and compact operating-model row.
- Replaced Section 02's global viewport-responsive section padding with natural `py-16 lg:py-[4.25rem]` spacing.
- Reduced the Section 02 mobile column gap from 48px to 40px.
- Reduced the operating-factor list and closing statement margins from 36px to 28px.
- Preserved all approved copy and introduced no photography or decorative filler.

## Desktop verification

Verified in the production build at 1600×900, 1440×900, 1366×768 and 1280×800. Section 01 measured 698px, 680px, 679px and 679px respectively; Section 02 measured 652px, 684px, 684px and 716px. Both report a computed `min-height` of `0px`, so the small variations are caused by natural text wrapping rather than viewport-height expansion or clipping. Typography, rules and the approved desktop grid remain intact.

## Mobile verification

Verified at 360×800, 390×844, 430×932 and 768×1024 in Chinese and English. Both sections use natural flow, the Chinese headline retains its intended three-line rhythm, and the operating model becomes a straightforward sequential mobile composition.

The production visual pass also confirmed no horizontal overflow, broken imagery, duplicate landmarks or serious automated accessibility findings on About.
