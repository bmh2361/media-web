# Final verification results — 2026-08-31

Implementation branch: `codex/venus-english-hardening`.

| Command | Result |
| --- | --- |
| `npm run format:check` | PASS after generated performance evidence was excluded from formatting |
| `npm run lint` | PASS, 0 warnings |
| `npm run typecheck` | PASS |
| `npm run validate:content` | PASS; 6 governed case records |
| `npm test` | PASS; 144 tests: 133 passed, 11 skipped, 0 failed |
| `npm run build` | PASS; 98 static pages; 42 deterministic OG cards generated |
| `npm run export:bilingual-copy` | PASS; 21 canonical bilingual route pairs |
| `npm run audit:english-fidelity` | PASS; 8 required and 14 prohibited phrase checks, governed Chinese source unchanged, current EN/ZH visible paths aligned |
| `npm run validate:redirects` | PASS; 61 rules, one hop, no loops/chains/missing targets/anchors |
| `npm run validate:og` | PASS; 42 cards at 1200 × 630 |
| `npm run validate:release:staging` | PASS with owner/legal/analytics warnings only |
| `npm run test:e2e` | PASS; 258 tests: 190 passed, 68 skipped, 0 failed in 6.3 minutes |
| `npm run audit:performance` | PASS; 4 scenarios, 0 threshold violations |
| `npm audit --omit=dev` | PASS; 0 vulnerabilities |

The first final performance attempt failed before measurement because the pre-existing script used `next start`, which is incompatible with `output: "export"`. The harness was corrected to use `scripts/serve-static-export.mjs`, then rerun successfully. This failure was an audit-harness defect, not hidden.

Final synthetic performance evidence (`audit/performance/phase-7-results.json`): desktop LCP 100 ms, CLS 0.000130, INP 16 ms, route transition 49 ms; laptop LCP 384 ms, CLS 0.000185, INP 24 ms, transition 80 ms; 390 px slow-4G LCP 940 ms, CLS 0, INP 128 ms, transition 499 ms; 390 px reduced-data/motion LCP 932 ms, CLS 0.000211, INP 120 ms, transition 118 ms. Every scenario reported zero visible overflow and zero broken images. These are local synthetic results, not real-user CWV.

Strict production readiness intentionally fails without owner values. Local/preview output is noindex, the form is not exposed, legal approval remains pending, and analytics delivery remains disabled.
