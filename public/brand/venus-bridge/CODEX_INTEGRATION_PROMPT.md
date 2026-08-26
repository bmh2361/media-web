# VENUS BRIDGE — BRAND IDENTITY ASSET INTEGRATION

## Scope
Integrate the owner-approved Venus Bridge logo assets from this folder into the existing website.
This is a brand-asset integration pass, **not a redesign**.

Before editing, inspect:
- current Header / Navigation brand component
- opening identity / route-transition branding
- Footer
- favicon / manifest / Apple icon
- OG/social-card branding
- any existing monogram or text-based Venus Bridge Media marks

Read `README.md` in this asset folder first.

## Critical brand interpretation
The supplied artwork contains:
- `VENUS BRIDGE`
- descriptor: `GLOBAL PARTNERSHIPS`
- VB monogram
- circular VB monogram
- horizontal lockup

Treat **VENUS BRIDGE** as the visual customer-facing brand.

Do **not** infer that “GLOBAL PARTNERSHIPS” is the legal company name.
Do not replace legal entity / Privacy / Terms / company-number configuration.
Do not change verified legal/trading identity without owner-approved production facts.

## Asset selection
Use the assets semantically:

### Dark desktop header
Prefer:
`webp/venus-bridge-horizontal-lockup-white.webp`
or PNG when transparency fidelity requires it.

If the full horizontal lockup is visually too wide at the current navigation height,
use:
`webp/venus-bridge-monogram-white.webp`
plus the existing accessible text strategy only if needed.

### Light header state
Use the black equivalent.

### Mobile navigation
Prefer the standalone monogram.
Do not force the full horizontal wordmark into a narrow mobile header.

### Footer
Replace any temporary/generated VB logo treatment with the supplied approved mark.
Preferred on dark background:
`venus-bridge-horizontal-lockup-white`
Evaluate `primary-stack-white` only if it improves the existing footer composition without enlarging the footer.

### Opening identity
If an opening brand mark already exists, replace only the mark itself with the supplied VB monogram.
Preserve timing, reduced-motion and transition behavior.
Do not create a new intro sequence.

### favicon / manifest / Apple icon
Use `/favicon/venus-bridge-icon-*` and `favicon.ico`.
Verify crisp rendering at 16/32/48 and mobile saved-site sizes.

### OG cards
Use the monogram or horizontal lockup only as a restrained identity mark.
Do not let the logo dominate the commercial title.
Preserve the recently corrected EN/ZH OG copy.

## Do not do
- do not redraw or reinterpret the monogram
- do not auto-trace into a low-quality SVG
- do not alter letter spacing inside the supplied raster lockups
- do not add gold gradients, glow, shadow or 3D effects
- do not put the circular logo everywhere
- do not replace commercial headlines with the logo
- do not modify Homepage information architecture
- do not redesign About
- do not modify Case Study architecture
- do not modify How We Work
- do not change navigation labels
- do not change commercial positioning
- do not globally replace `Venus Bridge Media` where it is part of legal/approved configuration

## Visual hierarchy
The logo is identity, not content.

The current website remains:
commercial proposition → proof → buyer recognition → solution → evidence → CTA.

Do not turn the homepage into a branding splash page.

## Size and clear space
Audit the intrinsic dimensions and render with `object-fit: contain`.
Do not crop any logo.
Do not stretch.
Maintain optical clear space around all marks.

Header target:
- visually understated
- readable at normal laptop scale
- secondary to navigation and CTA
- premium rather than oversized

## Performance
Use the smallest appropriate asset.
Do not load the large primary stacked mark where a monogram is enough.
Preserve Next/Image optimization where appropriate.
Avoid layout shift.

## Accessibility
Every decorative logo variant should either:
- use appropriate empty alt if redundant with adjacent brand text, or
- use concise alt such as `Venus Bridge`.

Do not create duplicate screen-reader brand announcements.

## Responsive QA
Inspect:
- 390
- 430
- 768
- 1024
- 1440
- 1920

Verify:
- header logo is never crushed or clipped
- horizontal lockup does not collide with navigation
- mobile uses the compact mark
- footer remains balanced
- opening identity remains centred
- Chinese/English navigation both fit
- no CLS / document overflow

## Dark/light QA
Explicitly verify:
- white mark on black/dark
- black mark on ivory/light

Never use black-on-dark or white-on-light.

## Final implementation preference
Minimise the number of different lockups shown on one page.

Recommended system:
1. Header desktop: horizontal lockup
2. Header mobile: monogram
3. Opening identity: monogram / circular monogram
4. Footer: horizontal lockup
5. Favicon: monogram
6. OG: restrained monogram

This creates consistency without logo repetition.

## Required final response

# VENUS BRIDGE BRAND ASSET INTEGRATION COMPLETED

Brand assets detected:
[list]

Header desktop:
[asset]

Header mobile:
[asset]

Footer:
[asset]

Opening identity:
[asset / unchanged]

Favicon:
[asset]

OG branding:
[asset / unchanged]

Legal identity changed:
NO

Commercial positioning changed:
NO

Homepage architecture changed:
NO

About redesigned:
NO

Responsive QA:
[PASS / FAIL]

Dark/light QA:
[PASS / FAIL]

Accessibility:
[PASS / FAIL]

TypeScript:
[PASS / FAIL]

Lint:
[PASS / FAIL]

Tests:
[result]

Production build:
[PASS / FAIL]

Files changed:
[list]

## Final principle
Integrate the new identity so the website looks as if this logo system had always belonged to it.
Do not make the website look “more branded” by simply making the logo larger.
