# Phase 3.2C-R Typography System

## Purpose

This system standardises the existing typography without changing approved copy. It separates hierarchy from page-specific composition so English and Chinese can keep the same commercial emphasis with language-appropriate line breaks.

## Typeface and weight

- English: Inter, Helvetica Neue, Arial, sans-serif.
- Chinese: Noto Sans SC, PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif.
- Display and headings: 500 English; 600 Chinese.
- Body and labels: 400–500.
- No additional typefaces are introduced.

## Scale

| Token                  | Intended use                                   | English size / line height                       | Chinese size / line height            | Measure                                                   |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------ | ------------------------------------- | --------------------------------------------------------- |
| `type-display-hero`    | Home hero and primary campaign statement       | `clamp(3.25rem, 6.1vw, 7.25rem)` / 0.92          | `clamp(3rem, 5vw, 5.9rem)` / 1.04     | 14–16ch EN; 15–18ch ZH                                    |
| `type-display-page`    | Capabilities, Work, About, Contact and case H1 | `clamp(3rem, 5.3vw, 6.4rem)` / 0.94              | `clamp(2.8rem, 4.6vw, 5.5rem)` / 1.06 | 13–16ch EN; 15–18ch ZH                                    |
| `type-heading-section` | Major H2                                       | `clamp(2.4rem, 3.9vw, 4.75rem)` / 1.01           | `clamp(2.2rem, 3.4vw, 4.1rem)` / 1.12 | 12–16ch                                                   |
| `type-heading-card`    | H3, project and capability titles              | `clamp(1.5rem, 2vw, 2.25rem)` / 1.12             | `clamp(1.45rem, 1.8vw, 2rem)` / 1.22  | 18–26ch                                                   |
| `type-lede`            | Hero and section lead copy                     | `clamp(1.05rem, .45vw + .95rem, 1.25rem)` / 1.65 | same size / 1.8                       | 34–42rem                                                  |
| `type-body`            | Narrative and card body                        | 1rem / 1.7                                       | 1rem / 1.8                            | 36–44rem                                                  |
| `type-label`           | Eyebrows, metadata and indices                 | .75rem / 1.4                                     | .75rem / 1.5                          | uppercase and tracked in EN; no artificial tracking in ZH |

## Line-break rules

- Display copy uses balanced wrapping where supported.
- English displays use negative tracking only at display sizes; body text has normal tracking.
- Chinese displays use strict line breaking, no negative tracking and no uppercase transformation.
- Chinese display measures are deliberately wider than the former 11ch treatment to avoid one-character columns.
- Manual line breaks are not added to approved copy.

## Responsive rules

- 390: display tokens use their minimum size; heading measures fill the available content width.
- 768: page display remains distinct from section display; no desktop-only 7–9rem jumps.
- 1280 and 1440: maximum sizes are capped so layout width, not viewport width alone, controls the hierarchy.
- Display sizes never determine media height. Media roles define the composition independently.

## Application map

- Home hero: `type-display-hero`.
- Canonical page and case heroes: `type-display-page`.
- Major chapter headings and final CTA: `type-heading-section` or `type-display-page` when the CTA is the primary page close.
- Project/capability cards: `type-heading-card`.
- Hero and chapter introductions: `type-lede`.
- Facts, narrative and captions: `type-body` plus `type-label`.

## Spacing relationship

- Label → heading: 24px.
- Heading → lead: 28–32px.
- Lead → CTA: 32–40px.
- Section heading block → content: 48–64px.
- Card media → title: 20–24px.

These relationships use the shared spacing scale and replace page-specific visual guesses.
