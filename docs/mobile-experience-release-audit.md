# Mobile experience release audit

## Audited pages and experience map

| Page | Sequence |
| --- | --- |
| Home | Hero `REVEAL` → carousel `MEDIA / INTERACTIVE` → projects `PROOF` → capabilities `REVEAL` → CTA |
| Companies | Hero `REVEAL / MEDIA` → opportunity journey `STICKY` → solution routes `STATIC` → benefits `PROOF` → CTA |
| Partners | Hero `REVEAL / MEDIA` → partner types `STATIC` → value `PROOF` → project process `STICKY` → CTA |
| Case Studies | Intro `REVEAL` → filters `INTERACTIVE` → project rows `INTERACTIVE / MEDIA` → footer |
| Case Detail | Identity `REVEAL` → hero `MEDIA` → context `STATIC` → evidence `MEDIA / TRANSITION` → outcomes → next project CTA |
| How We Work | Hero `REVEAL / MEDIA` → responsibility `PROOF` → journey `STICKY` → timing `STATIC` → CTA |
| About | Identity `REVEAL` → operating frame `STICKY` → context `LOW` → globe `MEDIA` → team `INTERACTIVE / REVEAL` → CTA |
| Contact | Hero `REVEAL` → form `TRANSITION / INTERACTIVE` → footer |

English and Chinese home/About entry paths are included in viewport QA.

## Changes made

- Added a mobile-only shared section observer and compact tappable progress navigation.
- Added a 56px scroll threshold for the compact 64px mobile header state.
- Redesigned the mobile menu as a numbered, progressively revealed full-screen navigation with preserved focus behavior.
- Added centralized mobile motion tokens.
- Added four reusable short sticky indexed stories.
- Integrated the homepage carousel with a timed active gold bar while preserving swipe and autoplay behavior.
- Added touch-responsive case preview reveal and removed the generic plus/minus appearance.
- Added selected full-bleed case-detail media moments.
- Added staged team portrait and role-first copy reveals.
- Added restrained contact-form reveal without animating individual fields.
- Retained the existing short page transition.

## Performance implications

- No new dependency.
- No continuous RAF loop or smooth-scroll interception.
- Section and reveal state use Intersection Observer plus a passive visibility fallback.
- New client code is shared and compact; the indexed story does not import Motion.
- Animation properties are limited to transform, opacity, and small clip paths.

## Accessibility

- Mobile menu remains a labeled modal dialog with focus management, Escape dismissal, trigger restoration, scroll lock, and visible language control.
- Section markers have accessible labels and current-step state.
- Case and team disclosures retain `aria-expanded` and controlled content relationships where applicable.
- All touch controls retain at least 44px hit areas.
- Reading and screen-reader order is unchanged.
- Reduced-motion users receive fully visible content with continuous and reveal motion removed.

## Animation-density review

| Area | Density |
| --- | --- |
| Hero entry | HIGH |
| Supporting editorial sections | LOW |
| Indexed journeys | MEDIUM |
| Proof grids | LOW |
| Case archive | MEDIUM |
| Case-detail media | MEDIUM |
| Team | MEDIUM |
| Contact form | LOW |
| Closing CTA | LOW |

No page consists entirely of high-motion sections.

## Remaining weaknesses

- The current Richard Bussmann portrait source remains below the future team-image resolution recommendation; this is not introduced by the mobile pass.
- Route transitions remain a short crossfade rather than shared-element transitions because the project is on Next.js 15 and no second transition dependency was justified.
- Real-device hardware testing remains advisable after deployment even though equivalent touch viewports and reduced-motion states are covered locally.

## Release checks

- Production build, lint, and TypeScript validation: PASS.
- Unit suite: 121 passed, 11 skipped.
- Targeted production E2E suite: 10 passed, including mobile interaction and protected-desktop regression checks.
- Mobile viewport coverage at 360, 375, 390, 393, 430, 768, and 1024px: PASS.
- Page coverage for Home, Companies, Partners, Case Studies, Case Detail, How We Work, About, and Contact: PASS.
- English and Chinese Home/About entry paths: PASS.
- Production browser console: PASS with no page errors in the audited routes.
- Desktop protection at 1280 and 1440px: PASS; no material layout change observed.
- Bundle impact: no new dependency; shared first-load bundle remains 103 kB, with approximately 1 kB added to the newly interactive journey routes and no material change to Home or About.
- Rendered evidence is stored in `audit/mobile-experience/baseline/` and `audit/mobile-experience/final/`.
