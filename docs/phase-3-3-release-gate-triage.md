# Phase 3.3 Release-Gate Triage

Date: 18 August 2026  
Validator: `npm run validate:release:production`  
Baseline: 14 passed checks, 28 failed checks, 7 human confirmations required

## Canonical release blockers

| Gate                                       | Count | Why it blocks                                                                                                         | Safe resolution                                                                                                |
| ------------------------------------------ | ----: | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Production profile and public Work mode    |     2 | Indexing and real-work visibility must be explicit                                                                    | Set deployed `RELEASE_PROFILE=production` and choose `PUBLIC_WORK_MODE=portfolio` after final content approval |
| Canonical site URL                         |     1 | Canonical/OG metadata cannot use an unknown origin                                                                    | Supply the final HTTPS domain                                                                                  |
| Contact delivery, origin and rate limiting |     3 | The form cannot be treated as production-ready without a live destination, allowed origins and distributed throttling | Supply HTTPS webhook, test delivery, configure origins and a verified distributed adapter                      |
| Legal/company identity and approvals       |     9 | Legal name, number, office, policy dates and approvals are owner/legal facts                                          | Owner/legal counsel must supply and approve values; do not fabricate defaults                                  |
| Human release confirmations                |     7 | Each represents a completed review or live verification                                                               | Set only after the corresponding evidence, legal, contact, media and channel check is complete                 |

## Retired or cross-system gates

| Gate                                              | Count | Status                                                                                                                  | Triage                                                                                                                                                                                               |
| ------------------------------------------------- | ----: | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Market-entry mode, legal review and source review |     3 | Legacy routes redirect to canonical Capabilities; no dedicated market-entry page is public                              | Keep the conservative source system gated. Do not let its partnership language leak into canonical pages. Decide separately whether the retired subsystem should remain in the production validator. |
| Legacy critical media records                     |     5 | The current Phase 3 canonical pages use approved portfolio/capability media; flagged IDs belong to earlier page systems | Verify route reachability, then either replace assets for any still-reachable consumer or scope the validator to canonical consumers. Do not mark placeholders approved.                             |

## Phase 3.3 code/config decision

- No production secret, legal fact, company identity, contact endpoint or human confirmation is added to source control.
- Public pages continue to fail closed around unapproved institution records.
- Canonical copy is aligned to the current real-work portfolio, while legacy market-entry claims remain redirected and gated.
- The production validator is expected to remain red until owner, legal and infrastructure inputs arrive.

## HUMAN DATA REQUIRED

Final HTTPS domain; legal company details; privacy/terms effective dates and approvals; contact webhook and allowed origins; distributed rate-limit configuration; verified direct contact channels; social profiles; release confirmation for current portfolio evidence and media.
