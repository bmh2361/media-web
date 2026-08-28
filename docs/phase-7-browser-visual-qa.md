# Phase 7 Browser Visual QA

## Coverage and result

The production build was tested in Chromium, Firefox and WebKit at:

- 320 x 568
- 360 x 800
- 375 x 812
- 390 x 844
- 430 x 932
- 768 x 1024
- 1024 x 768
- 1280 x 800
- 1440 x 900
- 1920 x 1080

The three-engine audit completed 81 route, viewport and interaction checks with zero remaining issues. A second Chromium visual audit covered 15 key routes across all ten viewports: 150 combinations, zero remaining failures.

Evidence is stored in:

- `audit/phase-7-browser-qa/results.json`
- `audit/phase-7-browser-qa/*.png`
- `audit/final-pass/audit.json`
- `audit/final-pass/*-viewport.png`
- `audit/final-pass/*-full.png`

## Automated checks

- HTTP status
- horizontal overflow
- one H1 and one main landmark
- missing alt text
- console and page errors
- mobile menu open and Escape close
- language switch with query preservation
- broken images
- forbidden staging labels
- representative screenshots

## Findings and corrections

1. The first 320 px audit found 9-20 px horizontal overflow on both Contact routes. The grid children now allow min-width shrinkage, and the business email wraps safely. The complete 150-combination audit then passed.
2. Reusing one page for rapid Firefox route changes allowed late prefetch errors to be attributed to the next route. Each audited route now uses an isolated page; the errors did not recur.
3. Menu-close checks initially ran before Firefox and WebKit completed the exit animation. The audit now waits for the user-visible dialog to detach.
4. Language-switch verification now waits for navigation and confirms that `brief=quick` is preserved.
5. Screenshot capture now waits for the settled motion state, producing comparable Chromium, Firefox and WebKit evidence.

## Manual visual judgement

- English and Chinese homepage hero line breaks remain intentional at 390 and 1440 widths.
- Chinese headline density remains controlled and does not collide with the media composition.
- The 320 px Contact form, cards, fields and footer remain within the viewport after correction.
- Mobile service-page hierarchy remains readable without relying on hover.
- The desktop hero remains balanced between editorial headline and production-frame media.
- Placeholder media is visually coherent but still limits authentic production credibility; it is a launch blocker, not a visual QA pass condition.

## Remaining device risk

Automated browser engines do not replace testing on physical iOS Safari and Android Chrome. Final device checks should cover browser chrome resizing, virtual keyboard behaviour, safe-area insets, back navigation and scroll restoration after the production domain and final media are installed.
