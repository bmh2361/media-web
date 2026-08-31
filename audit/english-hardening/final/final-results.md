# Final verification results — 2026-08-31

Implementation branch: `codex/venus-english-hardening`.

| Command | Result |
| --- | --- |
| `npm run format:check` | PASS |
| `npm run lint` | PASS, 0 warnings |
| `npm run typecheck` | PASS |
| `npm run validate:content` | PASS; 6 governed case records |
| `npm test` | PASS; 150 tests: 139 passed, 11 skipped, 0 failed |
| `npm run build` | PASS; 98 static pages; 42 deterministic OG cards; `out/_routes.json` verified |
| `npm run export:bilingual-copy` | PASS; 21 canonical bilingual route pairs; 119 professional review rows accounted for |
| `npm run audit:english-fidelity` | PASS; 12 required rendered phrases and 22 prohibited mistranslations; governed Chinese source unchanged; current EN/ZH visible paths aligned |
| `npm run validate:redirects` | PASS; 61 rules, one hop |
| `npm run validate:og` | PASS; 42 cards at 1200 × 630; all reviewed in the retained contact sheet |
| `npm run validate:release:staging` | PASS; 20 checks passed, 0 failed, 4 warnings, 5 human confirmations pending, 4 retired findings and 3 scope mismatches |
| owner-empty `npm run readiness:production` | EXPECTED FAIL; exit 1, all four predicates false, indexing/schema/form disabled, 18 owner inputs missing |
| isolated complete `npm run readiness:production` | PASS; exit 0, publication/legal/indexing/schema true; optional form and analytics false |
| `npm run test:e2e` | PASS; 258 tests: 190 passed, 68 skipped, 0 failed in 5.8 minutes |
| `npm audit --omit=dev` | PASS; 0 vulnerabilities |

The retained performance evidence from the preceding hardening pass is local synthetic data, not real-user Core Web Vitals; performance was not part of this correction rerun.

Strict production readiness intentionally fails without owner values. The isolated complete test used test-only `.test` identity values and no form or analytics secrets. The branch was fetched and cleanly rebased onto `origin/main` at `ba17849`; `origin/main` is an ancestor and the branch is ahead 1, behind 0. No push, deployment or merge was performed.
