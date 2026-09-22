# Commercial rebuild — owner review

Base: origin/main b0e3a4e. Local branch: codex/venus-commercial-rebuild. No push or deployment.

## Claim decisions (before publication)

| Claim area                                         | Classification                           | Implementation                                                                                                                 |
| -------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Brand / event participation                        | B: verified participation                | Keep the canonical project's actual photographic / production role; never imply representation or wider commercial leadership. |
| Market readiness, launch and follow-up offers      | C: capability                            | Scope, outputs, responsibility, timing and fee agreed per project; no invented past results.                                   |
| UK-led, selected European projects                 | A: current positioning supplied by owner | Replace broad UK-and-Europe operating-platform language.                                                                       |
| Future buyers, distributors, pilot customers       | D: development direction                 | Start from requirements and fit; do not describe an existing guaranteed network.                                               |
| University / expert engagement                     | C: capability                            | Subject to fit, availability and required approval; not endorsement or guaranteed access.                                      |
| Minghan's degree                                   | A: corrected in owner brief              | Chemical & Process Engineering; machine-learning research in industrial sensing.                                               |
| Royal Academy of Engineering GTV recipient wording | E: unsupported exact wording             | Removed; the prior issue registry already required owner confirmation.                                                         |
| Sales, investment and buyer outcomes               | E unless separately evidenced            | No historical outcome invented. Future public fields require a source, verification, public approval and both languages.       |
| Contact address                                    | A: existing configured public address    | Reuse company.businessEmail and configured WeChat; no new domain address invented.                                             |

Eight claim families removed or qualified: broad European coverage; automatic buyer access; blanket stakeholder inclusion; institutional endorsement/access; implied market-entry work in historical case categories; outsourced sales representation; Minghan's degree; RAEng/GTV wording. These are families, not a count of string replacements.

## Factual inconsistencies

- Old home hero hard-coded Changan as Munich, while the latest main case record says Mainz, 21 March 2025. Hero now reads the case location directly.
- Team copy said an AI PhD; corrected using the owner's current instruction, without adding an institution or award.
- RAEng/GTV wording remained public despite docs/final-prelaunch-issue-registry.md recording it as requiring owner confirmation. Removed until exact wording is substantiated.
- No verified branded email configuration was found; retain the existing Gmail fallback and allow the established configuration to supply a verified replacement.
- No WFT source file accompanied the brief; only the before/during/after model described by the owner was used. No WFT relationships or results were imported.

## Acceptance

A robotics founder can find Readiness, its market-entry brief and first-action plan on Home and Services. An exhibition marketing lead sees the primary Launch & Partnership Programme with before/during/after outputs. A distributor gets a requirements-first commercial route. A researcher gets a technical collaboration route explicitly excluding endorsement. A specialist sees scope, responsibilities, approvals, timing and terms.

All existing 12 published project/series records retain their source content and rights gates. Historical fashion and culture remain in the archive; they no longer define the homepage focus. Future commercial evidence is optional and empty by default. Internal evidence source identifiers are not rendered.

Legacy source components for earlier site phases remain in the repository; they are outside the canonical routes and have not been broadly refactored.

Review screenshots: test-results/commercial-review/. Validation logs: tmp/commercial-review/.

## Verification results

- `npm test`: 130 passed; 11 existing skipped; 0 failed (141 total).
- `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run validate:content`, `npm run validate:pricing`: passed.
- `npm run build`: passed; 101 static pages generated.
- `npm run test:e2e -- e2e/commercial-rebuild.spec.ts`: 40 passed across desktop and touch projects. Covers EN/ZH at 375, 390, 430, 768, 1024, 1440 and 1536px; eight routes; canonical/hreflang; contact templates; navigation; redirects; five personas; normal and reduced motion; accessibility on core conversion pages.
- `npm run validate:release:staging`: passed.
- `npm run validate:release:production`: fails on 11 existing local production configuration/approval requirements (work mode, legal entity mode, legal dates/approvals and five owner confirmations). No values were invented to bypass them. Page, redirect, contact, media and pricing checks pass.
- Historical E2E suites tied to earlier page architectures were not run as a full CI suite; the targeted commercial suite above covers this rebuild. Full CI is not claimed.
- `git diff --check`: passed.

Local preview: http://127.0.0.1:3110/en and /zh. All changes remain uncommitted for owner review.
