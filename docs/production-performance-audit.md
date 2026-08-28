# Production Performance Audit

## Current architecture

- Next.js production output uses automatic route splitting and image optimisation with AVIF/WebP enabled.
- Canonical media has desktop, mobile and thumbnail variants; major components provide responsive `sizes`.
- Above-fold priority is bounded. Below-fold portfolio and Team media lazy-load.
- Homepage carousel retains a bounded current/next preload strategy rather than eagerly loading every project.
- No new third-party script, animation package, WebGL layer, scroll interception, or permanent animation-frame loop was introduced.
- Fonts use the existing approved system stack; no new remote font request or layout-shifting font loader was added.

## Existing production-mode measurements

The most recent production Lighthouse evidence records:

| Profile |   LCP | CLS | Lab interaction / TBT |
| ------- | ----: | --: | --------------------: |
| Mobile  | 3.2 s |   0 |             20 ms TBT |
| Desktop | 0.7 s |   0 |              0 ms TBT |

The heavy-media stress harness recorded 3.388 s mobile slow-4G LCP, 0 CLS, 80 ms controlled interaction latency and roughly 199–203 KB JavaScript transfer. These are lab results, not field Core Web Vitals.

The Phase 6 rerun on 26 August 2026 corrected the harness so initial-load CLS is not conflated with a later soft navigation and deliberate fixed edge controls/horizontal rails are not treated as document overflow. Its final production-build results were:

| Profile                    |    LCP |     CLS |   INP | Route transition | Overflow / broken images |
| -------------------------- | -----: | ------: | ----: | ---------------: | -----------------------: |
| Desktop 1440               |  92 ms | 0.00026 | 16 ms |            70 ms |                    0 / 0 |
| Laptop 1280                | 404 ms | 0.00019 | 16 ms |           203 ms |                    0 / 0 |
| Mobile 390 slow 4G         | 924 ms |       0 | 40 ms |           922 ms |                    0 / 0 |
| Mobile reduced data/motion | 916 ms | 0.00021 | 48 ms |           784 ms |                    0 / 0 |

The fixture-based LCP values are useful regression signals, not claims about the real production CDN or real portfolio payloads.

## Assessment

- CLS: PASS against the <0.1 goal.
- INP architecture: PASS in controlled interaction tests; field INP still requires real traffic.
- Desktop LCP: PASS.
- Mobile LCP: PASS in the current fixture harness; prior real-media Lighthouse evidence and final production field data still need reconciliation.
- Immediate Home-to-Work transition under emulated slow 4G: P1 issue at 922 ms against the 800 ms local budget. No visual system or approved route architecture was removed to hide this result.
- TTFB/CDN: cannot be validated until the real host, region and cache are active.
- Shared JS from the approved build remains approximately 103 KB; Work and About are the heaviest interactive routes but no launch-safe deletion was identified.

## Launch actions

1. Run Lighthouse against the production preview on representative mobile throttling after CDN caches are warm and cold.
2. Confirm the actual LCP element and its Next Image priority, `sizes`, dimensions and transferred candidate.
3. Record LCP, CLS, INP and TTFB using field monitoring after launch; do not infer INP from a single lab click.
4. Set transfer/image-transformation budget alerts on the hosting account.
5. Optimise only a reproduced LCP asset or route bottleneck; do not bulk-recompress approved imagery without evidence.

Status: ISSUES — CORE VITAL LAB BUDGETS PASS; ONE SLOW-4G ROUTE-TRANSITION BUDGET BREACH AND FIELD VERIFICATION REMAIN.
