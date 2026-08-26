# Phase 2.6 — Proof-First Conversion Refinement

## 1. What changed

Phase 2.6 made three focused production changes without reopening the approved positioning or extending the service architecture:

1. Added a compact real-project proof layer directly after the homepage Hero.
2. Rewrote and reduced homepage copy that read like internal governance or consultancy process documentation.
3. Reduced the UK Fit Call to a short relevance-and-next-step request while preserving the detailed Execution Brief.

No Phase 3 work, Insights, pricing, scheduling integration, university claims, new services or new imagery were added.

## 2. Homepage copy reduction

The visible explanatory load was reduced by approximately 20–25% across the affected homepage sections. The reduction is structural rather than a mechanical word-count cut:

- Customer Situations now shows one decision sentence per situation instead of separate signal and decision paragraphs.
- Demand Creation was rewritten as four concrete planning questions rather than risk-heavy consultancy language.
- Public solution status labels were removed while their internal data remains intact.
- The Deep Proof disclosure paragraph and the proprietary-methodology disclaimer were removed from the homepage.
- The Network section changed from two long explanatory paragraphs to three resource categories and one short boundary sentence.
- Dual-conversion copy was shortened.

The Hero positioning and existing commercial architecture remain unchanged.

## 3. Early Proof implementation

`HomepageEarlyProof` now renders immediately after the Hero whenever public Work is enabled. It uses the existing premium system:

- one dominant approved project image;
- concise location, year, commercial context and one confirmed Venus role;
- two compact text references;
- restrained borders, dark editorial background and no additional card language;
- links to the existing real-project routes.

This is deliberately one visual beat rather than a second case-study grid. The later `HomepageSelectedWork` section remains the deeper three-entry proof moment.

## 4. Proof projects selected

| Presentation      | Project                                    | Context shown                         | Confirmed role shown                 |
| ----------------- | ------------------------------------------ | ------------------------------------- | ------------------------------------ |
| Dominant visual   | Changan European Brand Launch 2025, Munich | European brand launch visual coverage | Event and brand content capture      |
| Compact reference | BYD BD11 Double-Decker Bus Launch, London  | London vehicle launch documentation   | Available on the linked project page |
| Compact reference | CATL Open Day 2025, Munich                 | Technology launch event content       | Available on the linked project page |

All three records already pass the repository’s public-project gates. No new client, outcome, role or metric was inferred from imagery.

## 5. Governance language removed from the public homepage

The public homepage no longer renders:

- `Execution Case` or `Capability Evidence`;
- `Developing capability` or `Core delivery`;
- evidence-boundary explanations;
- the proprietary-methodology disclaimer;
- the partner-logo-wall disclaimer;
- internal proof labels in project cards.

The underlying tier, approval, publication and evidence data remains in the content model and continues to govern public routes, sitemap inclusion, schema and tests.

## 6. Fit Call before → after

| Before                              | After                             |
| ----------------------------------- | --------------------------------- |
| Required role                       | Removed                           |
| Required timing                     | Optional timing                   |
| Required main uncertainty           | Removed                           |
| Separate optional contact field     | Removed from Fit Call             |
| Ten visible business/contact inputs | Seven visible inputs              |
| Diagnostic-style microcopy          | Short fit-and-next-step microcopy |
| Four stages                         | Four stages plus `Not sure yet`   |

The Fit Call now asks for:

1. Name
2. Company
3. Email
4. Company website (optional)
5. Current stage
6. UK objective
7. Timing (optional)

Server validation now requires name, company, email, current stage, objective and consent for a quick enquiry. The detailed Execution Brief still requires its delivery, channels, usage and approval fields.

## 7. CTA hierarchy changes

The dominant CTA remains `Request a 20-minute UK Fit Call`. `Send an Execution Brief` remains the secondary route. Section-level links continue to use the lighter editorial-link treatment.

The Fit Call is described as a short conversation to check relevance and agree a practical next step. It is not presented as a diagnostic, strategy workshop, consultation or instant calendar booking.

## 8. Chinese copy changes

Chinese homepage copy now uses shorter, more direct business language:

- “英国项目，常常需要更早想清楚这些事。”
- “把发布、内容和后续动作放在同一个计划里。”
- “把事情做成，主要靠这四部分。”
- “需要什么资源，就围绕项目把协作关系理顺。”
- “适合还在判断下一步的团队。”

The Fit Call now says that a complete brief is not required and asks only what the visitor wants to move forward.

## 9. English copy changes

English copy now favours concrete actions:

- `Decide what the first UK test needs to prove.`
- `Adapt China-first content for the people and setting here.`
- `Plan the launch, content and follow-up as one job.`
- `What we deliver.`
- `The right local resources, coordinated around the work.`

Internal classification and methodology language was removed from the customer-facing homepage.

## 10. Truth controls preserved

The following controls remain unchanged:

- only public, completed and approved projects can enter public Work;
- capability evidence does not become a strategic case;
- unsupported outcomes, client claims and Europe-wide claims remain prohibited;
- university and institution relationships remain gated;
- Insights remains hidden;
- market-entry professional work remains release-gated;
- the detailed Execution Brief and deeper-page responsibility boundaries remain available;
- Entertainment & Culture remains visible in the homepage expertise system.

## 11. Validation results

| Check                             | Result                                         |
| --------------------------------- | ---------------------------------------------- |
| Targeted Phase 2.6 contract tests | 32 passed, 0 failed                            |
| Full unit/content test suite      | 68 passed, 0 failed                            |
| ESLint                            | Pass, zero warnings                            |
| TypeScript                        | Pass                                           |
| Next.js production build          | Pass, 86 static pages generated                |
| Runtime visual validation         | Unavailable in the current runtime environment |

The production build completed with the existing informational Next.js warning that Edge Runtime usage disables static generation for the affected page.

## 12. Remaining non-code dependencies

- Production contact webhook, allowed origins and final delivery confirmation still require deployment configuration.
- The Fit Call remains a request rather than live scheduling; no scheduler was added in this phase.
- Browser runtime screenshots were not regenerated because the current runtime environment remains unavailable. Static validation and the production build completed successfully.
- Existing legal, public-company-detail and release-confirmation requirements remain governed by the repository’s production checklist.

## Files changed

- `app/[lang]/page.tsx`
- `components/sections/HomepageEarlyProof.tsx`
- `components/sections/HomepageSelectedWork.tsx`
- `components/sections/CommercialContactForms.tsx`
- `components/sections/ContactExperience.tsx`
- `content/commercial-architecture.ts`
- `content/portfolio.ts`
- `lib/contact/validation.ts`
- `tests/content-contract.test.mjs`
- `tests/phase-12-ia.test.mjs`
- `docs/phase-2-6-proof-first-conversion-refinement.md`
