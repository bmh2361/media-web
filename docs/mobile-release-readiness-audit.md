# Mobile release-readiness audit

## Route inventory and audit scope

The canonical public sitemap contains nine route types in each language:

1. Home (`/[lang]`)
2. For Companies (`/[lang]/companies`)
3. For Partners (`/[lang]/partners`)
4. Case Studies (`/[lang]/work`)
5. How We Work (`/[lang]/how-we-work`)
6. About Us (`/[lang]/about`)
7. Contact (`/[lang]/contact`)
8. Privacy (`/[lang]/privacy`)
9. Terms (`/[lang]/terms`)

Six representative case-detail compositions were audited in both languages at every required viewport:

- BYD BD11 London — standard multi-image launch case
- CATL Open Day — industry-event case
- Wang Linkai London Concert — short talent/event case
- London Fashion Week — portrait editorial case
- Selected Beauty & Fashion Brand Content — mixed portfolio series
- London Automotive Brand Film — mixed-ratio film sequence

All canonical routes were inspected at 360×800, 390×844, 430×932 and 768×1024. The desktop regression pass covered 1440px and the About-specific 1600×900, 1440×900, 1366×768 and 1280×800 targets. Screenshots are stored under `audit/mobile-release/before` and `audit/mobile-release/after`.

## Problems discovered

- About Section 01 retained a viewport-linked desktop minimum height.
- About Section 02 measured roughly 718–737px on protected desktop widths because of oversized inherited section padding and internal margins.
- Several repeated mobile information rows inherited 160–320px desktop minimum heights, making long pages feel mechanically stacked.
- English display headings used the same 48px mobile floor as shorter Chinese headings, producing unnecessarily tall five-to-six-line compositions on narrow screens.
- The contact consent checkbox itself measured below the preferred touch target even though its surrounding label remained clickable.
- The mobile navigation already locked body scrolling and trapped focus, but lacked overscroll containment and safe-area-aware bottom padding.
- The mobile expanded Case Studies record repeated its title and location beneath the cover.
- Secondary text on About and Case Studies used opacity tokens that failed the serious automated color-contrast gate.
- Identical `app/favicon.ico` and `public/favicon.ico` files competed for `/favicon.ico`, producing a development route conflict.

## Mobile design changes

### Responsive architecture and spacing

- Moved repeated card and process-row minimum heights to the `lg` breakpoint on Home, Companies, Partners, How We Work and case-detail strategy rows.
- Reduced mobile-only 56px content-to-grid gaps to 40px on repeated editorial systems while preserving desktop spacing at `lg`.
- Kept the established 20px mobile gutter supplied by `container-x` and the existing 72px major-section rhythm.
- Kept Case Studies as a tap-to-expand inline mobile index with one cover and one expanded record.
- Removed repeated project title/location copy from the expanded mobile record while retaining its verified role and full-case link.

### Typography

- Added an English-only mobile `type-display-page` token using `clamp(2.5rem, 10.8vw, 2.875rem)` and a 1.0 line height.
- Reduced the mobile floor of the long English About headline without changing its approved wording or desktop size.
- Allowed audience and How We Work tablet headlines a wider 18ch measure, returning to the approved 15ch desktop measure at `lg`.

### Navigation and touch accessibility

- Confirmed the mobile menu uses a 44px control, focuses the first link, traps Tab, closes on Escape, restores focus and locks body scroll.
- Added `overscroll-contain` and safe-area-aware bottom padding to the `100dvh` menu panel.
- Enlarged the consent checkbox to 24px and its label row to a 44px minimum target.
- Raised affected About and Case Studies secondary-text contrast without changing hierarchy or layout.

### Images and performance

- No crop changes were required: audited case, homepage and team imagery retained faces, vehicles, products, signage and stage context.
- The homepage LCP image uses a 900px mobile derivative for a roughly 350–390px rendered width; no 3000–5000px source is selected on mobile.
- Existing art-directed mobile files, `sizes`, eager LCP loading and lazy below-fold loading were retained.

### Motion and interaction

- Homepage media retains manual controls and touch swipe.
- Case preview information is available by tap; no meaningful mobile content depends on hover.
- Existing `prefers-reduced-motion` handling remains in navigation, opening, page transitions, team details and media controls.

## Second-pass checks

- No accidental horizontal overflow on any audited route or representative case template.
- No broken images after route transitions settled.
- One main region and one footer per stable page.
- Mobile form controls render at 16px or above, preventing iOS input zoom.
- Footer remains a deliberate two-column mobile navigation group with 44px links.
- Team order remains: 包铭涵 博士, Vivian Wang, Richard, Patrick, Dr. Fei Cao. Portrait crops remained clear and compact.
- The redundant public favicon copy was removed; the canonical App Router favicon remains and the optimized build completes without a route conflict.
- Production browser console checks on Home, About, Contact and Case Studies returned no warnings or errors.
- TypeScript, lint and 121 unit tests passed. The optimized Next.js build generated all 101 static pages. The focused production E2E pass completed with 35 passes and 13 intentional project skips; its two discovered contrast failures were corrected and both desktop/mobile accessibility reruns passed.

## Remaining risks

- Full performance scoring should still be repeated against the final production hostname/CDN because local development timing does not model CDN caching or real mobile networks.
- Contact delivery depends on production environment configuration and should remain covered by the separate release/configuration checks.
- The globe is intentionally deferred below the first About chapters; its real-device GPU cost remains the main non-LCP mobile performance item to monitor.
