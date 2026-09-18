# VENUS_WORK_COMMERCIAL_NARRATIVE_V2

Review date: 18 September 2026. Scope: the twelve public Work cases, shared previews, taxonomy and metadata. No legal identity, contact details, deployment configuration or unrelated system changed.

## Repository and release basis

- Repository: `bmh2361/media-web`; origin uses HTTPS.
- Initial checkout: `codex/venus-english-hardening`, clean, SHA `6c4044779acff9e37faa3b4b67dd57b1a7f29d4a`.
- Implementation base: remote default/release branch `main`, SHA `ba17849ed3dbd408b750ad03196c7c373e8bd246`. A separate worktree and `codex/venus-work-narrative-v2` branch preserve the original checkout and its unpublished work.
- Actual configuration: Next.js static export; Cloudflare headers and redirects; existing Cloudflare Pages check on the base commit succeeded for project `venus-bridge`. The live Work page also serves the base narrative through Cloudflare. GitHub's branch endpoint reported `main` unprotected. No deployment account settings were changed.

## Editorial decisions

| Case                      | Commercial narrative                                                 | Contribution retained                                                    |
| ------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| BYD BD11                  | Electric mobility in British public transport                        | Launch photography and product/event context                             |
| Changan                   | Brand architecture and product range in a European introduction      | Launch photography across presentations and displays                     |
| Geely                     | A British introduction connecting design, brand and EX5              | Design presentation, product and audience photography                    |
| CATL                      | Battery technology in Europe's mobility discussion                   | Technical presentation and event photography                             |
| Leapmotor                 | Product and brand within a European industry exhibition              | Exhibition photography, not stand design or management                   |
| AGIBOT                    | Connecting embodied-intelligence explanations with tangible products | Technology presentation and display photography                          |
| London automotive film    | British locations as part of the product story                       | Existing recorded UK location coordination and visual production         |
| Wang Linkai               | Overseas performance identity and cultural relevance                 | Live photography and editorial selection                                 |
| Yue Yunpeng               | Chinese-language performance in a London setting                     | Live-performance photography                                             |
| London Fashion Week       | London editorial fashion expression                                  | Portrait photography and selection; no runway/backstage production claim |
| Beauty & fashion          | Product, people and styling across consumer content                  | Separate works in a portfolio series                                     |
| European road & lifestyle | European automotive lifestyle and local context                      | Separate location works; no ongoing programme asserted                   |

Representative changes:

- BYD: vehicle/venue photography and an image-count outcome become a public-transport market moment, a specific communication challenge, a clear team role and potential use in later product conversations.
- Changan: generic Munich launch coverage becomes the multi-brand Mainz introduction, with corrected event metadata and a distinction between the brand's market plan and team content production.
- AGIBOT: two robots and landscape/portrait formats become the relationship between technical explanation and tangible product display, without commercial-deployment or buyer-validation claims.

The existing typed content remains the single source. Two required challenge fields replace archetype-generated challenges. Existing context, execution, role, project value and continued-value fields carry the copy. The unused eight-section structure arrays and outcome image-count option were removed with their renderer. No outcome metric or speculative outcome field was added. Scope/capability arrays and publication/rights gates remain unchanged. Image counts are removed from the narrative and outcome data; media inventory counts remain technical inventory only.

The shared template has market/content context, contribution, delivery/value and a future-project CTA, interleaved with the existing media layouts. Cards show project focus and team contribution separately on both viewport modes. Stable category IDs now have market launch, exhibition, cultural and localisation labels. The existing six-company-first ordering and all twelve slugs remain intact. Shared portfolio data updates homepage references and detail metadata, Open Graph descriptions and CreativeWork descriptions together.

## Sources and attribution

Public sources were read in full for the relevant event passages. They establish event/company context, never the team's commission or wider duties:

- [BYD Europe: BD11 global debut](https://bydeurope.com/article/464), dated 21 May 2024: UK-specific vehicle and London Bus Museum introduction.
- [Changan: Sharing the Future European launch](https://www.globalchangan.com/newsroom/changan-automobile-launches-changan-deepal-and-avatr-in-europe-ushering-in-a-new-era-of-evs.html), dated 21 March 2025: Mainz; CHANGAN, DEEPAL and AVATR. Project image 06 visibly carries Sharing the Future; image 07 carries AVATR; the broader series shows the brand/product presentation. These align with the official launch and support correcting Munich to Mainz and the artificial September sort date to 21 March. Public alt text and shared event imagery descriptions were corrected; original source filenames remain untouched provenance. This is not an IAA case.
- [Geely: EX5 UK introduction](https://www.geely.com/en/news/2025/geely-debuts-ex5-uk), dated 23 October 2025: London brand introduction and EX5. The local media shows Geely Global Design and EX5. Later sales/network targets are omitted.
- [CATL: Shenxing Pro at Open Day](https://www.catl.com/en/news/6527.html), dated 7 September 2025: battery safety, lifespan, range and charging in European mobility. The local series shows Wave Cell + CTB and No Propagation 3.0, consistent with the release. The artificial July sort date is corrected; performance numbers, investment and partner results are omitted.
- [IAA Mobility 2023 visitor guide](https://www.iaa-mobility.com/visitor-guide-2023): Munich industry/exhibition setting. No visitor totals or lead-generation outcomes are borrowed.

Internal checks included the original media sets/contact sheets, supplied source-package rules and empty intake template, existing evidence/gap registers and original company/individual portfolio PDFs. Existing website prose was not treated as independent proof. The source package explicitly distinguishes image permission from proof of a client relationship, scope or outcome.

No newly verified curation, event ownership, agenda design, invitation, buyer introduction or partnership duty was found. The UK film retains location coordination/local production already present in the project scope; fresh commissioning or delivery records were not found, so this is not reported as a newly verified expansion. The original individual PDF includes a different BYD 2024 film with a production-company credit. Its frames do not establish a match to the current website film, so that credit and date were not transferred. No private PDF or contact information is included in this change.

The public presentation uses selected team experience rather than implying that the current Venus Bridge entity contracted every historic project. Exact commissioning parties and the brand/company chronology are not independently established by the supplied materials. Brand names remain Project / Brand references, not client endorsements. Fashion-week photographs show editorial portraits, not an official show-production appointment. The two mixed series remain explicitly separate works.

Remaining gaps: original commission/brief, precise responsibility beyond the recorded contribution, delivery/publication/use records, measured effects and historic contracting identity. No metrics, testimonials, channel agreements, institutional endorsement, official status, first-UK-entry claim or ongoing cross-border contract was added. Potential use is labelled as such and separated from the available project material.

## Verification

Regression coverage includes all 24 detail routes, English/Chinese field parity, unique corporate context/challenges, unchanged role categories and rights gates, Mainz metadata, portfolio-series boundaries, filters, related links, contact CTA, canonical/hreflang and matching metadata/OG/JSON-LD descriptions. Browser checks use the repository's static-export Playwright harness on desktop and mobile, including image loading and horizontal overflow. Existing accessibility and media checks remain in place.

Old eight-section/copy assertions were updated to the new structure. A pre-existing Windows line-ending issue in the media test was corrected by normalising CRLF in the source read, retaining both image-selection assertions. The historical eleven skipped unit tests were not enabled or counted as passed. Final command results, pushed SHA and deployment state are recorded in the delivery message after verification; no production approvals or environment values are manufactured.

Confirmed local results:

- `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run validate:content`: PASS.
- `npm test`: 125 passed, 11 existing skips, zero failures.
- `npm run build`: PASS; 98 static pages generated.
- `npm run validate:release:staging`, `npm run validate:media`: PASS.
- `npm run validate:image-crops`: PASS; 249 responsive crops across 83 assets. Generated report formatting was not included in the change.
- An independent comparison with the base confirmed unchanged slugs, scope/capability arrays, content types, category IDs, layouts, hero/preview choices and rights/approval flags for all twelve cases.
- `npm run validate:release:production`: FAIL in the local environment because genuine production configuration and confirmation values are absent (Work/legal mode, policy effective dates, legal status and owner confirmations). These were not supplied or overridden. This result is separate from the existing Cloudflare deployment outcome.

The first full browser run had 193 passes, 68 configured skips and one stale CATL copy assertion. The assertion was updated to the new role sentence, preserving hover/focus behaviour checks. The final build and full rerun verify the resulting change; see final delivery results.

Final full browser rerun: PASS — 194 passed, 68 configured skips, zero failures (npm run test:e2e -- --workers=2). All twelve cases in both languages passed on desktop and mobile. English/Chinese representative screenshots, including Chinese mobile text sections, were visually reviewed. Final static build: PASS.
