# Real Media Performance Test

## Test setup

Phase 7 uses generated performance-only fixtures. They are not public content or portfolio evidence.

- 2400 x 3000 desktop hero: 5.11 MB
- 1440 x 1920 mobile hero: 1.90 MB
- 2400 x 1350 poster: 2.19 MB
- twelve 1800 x 1200 gallery assets: about 1.42 MB each
- simulated eight-second video payload: 2.4 MB at an assumed 2.4 Mbps

Commands:

```bash
npm run generate:performance-fixtures
npm run audit:performance
```

The browser audit replaces staging media requests with these deliberately heavy fixtures. It measures LCP, CLS, lab interaction latency, long tasks, long-task duration, transfer size, JavaScript transfer, heap use, scroll frame timing, route response and a controlled video-payload fetch.

## Results

| Scenario                  |      LCP |     CLS | Lab INP |  Route | Scroll p95 | Long tasks | JS heap |                   Fixture load |
| ------------------------- | -------: | ------: | ------: | -----: | ---------: | ---------: | ------: | -----------------------------: |
| Fast desktop              | 1,084 ms | 0.00017 |   32 ms |  58 ms |    18.0 ms |          0 | 8.19 MB | 27.79 MB images + 2.4 MB video |
| Mid-range laptop          | 1,548 ms | 0.00021 |   32 ms | 102 ms |    17.8 ms | 2 / 178 ms | 8.20 MB | 27.79 MB images + 2.4 MB video |
| Mid-range mobile, slow 4G | 3,388 ms |       0 |   80 ms | 682 ms |    19.7 ms | 3 / 514 ms | 8.42 MB | 18.91 MB images + 2.4 MB video |
| Reduced data and motion   | 1,904 ms |       0 |   64 ms | 278 ms |    22.8 ms | 4 / 518 ms | 6.98 MB | 23.16 MB images + 2.4 MB video |

JavaScript transfer remained about 199-203 KB. CLS and route responsiveness passed in all scenarios. The slow-4G mobile LCP exceeded the 3,000 ms target by 388 ms.

## Identified regression and fix

The first audit only intercepted Next image-optimizer URLs, while the current SVG staging assets load directly. The harness was corrected to intercept both optimized image requests and direct staging/demo media paths. It now records 13-17 substituted image requests per scenario.

The audit also now records trusted user interaction, scroll frame timing, JS heap use and the controlled video payload rather than reporting only navigation timing.

## Required final-media budgets

- mobile hero still: normally 240 KB or less
- desktop hero still: normally 350 KB or less
- poster: 250 KB or less
- responsive gallery candidate: 220 KB or less
- short muted preview: 2.5 MB or less, with poster-first loading
- avoid loading below-fold gallery media before it approaches the viewport

## Remaining risks

- Slow-4G mobile LCP currently misses the target under deliberately heavy media.
- Playwright route fulfilment does not reproduce CDN cache behaviour, real video decoding, colour profiles or codec startup.
- Lab INP is a controlled interaction sample, not field Core Web Vitals data.
- Repeat the audit with approved final files, production image optimisation and the real CDN before launch.
