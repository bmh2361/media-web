# Portfolio commercial repositioning

Scope: `media-web`, based on commit `b0e3a4e`. Local implementation; no production publication performed.

## Publication update: 28 September 2026

Following the owner's request, Wang Linkai / Xiao Gui and Yue Yunpeng have been withdrawn from the public portfolio. **The current published collection contains 10 cases.** Both language detail routes and sitemap entries are excluded, related/next-case navigation uses the remaining collection, and the empty cultural filter is hidden. Historical records and original assets are retained privately. The other ten cases keep their content, imagery and relative order.

The sections below document the preceding 12-case narrative rewrite; the two cultural entries are historical audit records, not current public listings. The owner has authorised committing this repositioning and removal to GitHub `main`.

Withdrawal verification: the new desktop/mobile regression failed against the preceding 12-case build, then passed against the rebuilt 10-case site. Final full E2E: **202 passed, 0 failed, 68 existing skips** (6.3 minutes). Unit tests: **127 passed, 11 existing skips**. Build: **97 static pages**, excluding the four withdrawn bilingual detail pages. Lint, TypeScript, formatting and diff whitespace checks passed. Screenshots in the linked directory have been refreshed for the ten-case collection.

## Public narrative and evidence

All 12 published projects have been rewritten in English and Chinese. The Work overview now describes Venus Bridge as a UK-based market entry, commercial partnership and local execution platform. The archive title is **Selected UK & European Market Experience / 英国及欧洲市场项目经验**.

Project context, names, dates, locations and existing participation records were checked against `content/portfolio.ts`, the asset manifest, presentation profiles, the importer, `docs/portfolio-content-review.md`, `docs/portfolio-missing-information.md` and the previous narrative audit. Existing source references in the previous audit support event identity and context; they are not treated as evidence of a direct client appointment. No new external research or external factual claims were required.

Outcomes describe the observable market setting and local presentation established by each programme. They are qualitative editorial interpretations, not measured commercial uplift. Copy does not claim sales, contracts, distributor appointments, named introductions, investment, official status or exclusive partnerships. Team participation is consistently attributed as support or contribution. Two independent selections remain selections, not invented single-client campaigns. Missing dates remain missing.

| Project (existing URL retained)                       | Commercial framing                                           | Outcome focus                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| BYD BD11, London                                      | Chinese EV technology in British public transport            | A specific UK zero-emission mobility context                   |
| Changan, Mainz                                        | Multi-brand European market introduction                     | Shared platform connecting group, brands and vehicles          |
| Geely, London                                         | UK brand introduction and EX5                                | Physical UK presence connecting brand and model                |
| CATL, Munich                                          | Battery innovation within a European industrial ecosystem    | Technical proposition connected with local mobility priorities |
| Leapmotor, IAA Mobility                               | Chinese EV positioning on an international industry platform | A visible place in the European automotive conversation        |
| AGIBOT, London                                        | Embodied AI made locally understandable                      | Technical explanation and real robotics in a UK setting        |
| BYD, UK localisation (formerly automotive film title) | UK location coordination and local brand presentation        | Product identity grounded in everyday British environments     |
| Wang Linkai, London                                   | Cross-border cultural identity and audience encounter        | A concrete overseas expression of the artist’s identity        |
| Yue Yunpeng, London                                   | Chinese-language culture within a UK setting                 | A local point of contact with overseas audiences               |
| London fashion                                        | Consumer-market localisation                                 | Recognisable London context for fashion presentation           |
| Beauty and fashion selection                          | Product, people and retail context                           | Clearer relationship between products and intended audiences   |
| European mobility selection                           | Vehicles within local roads and cities                       | European sense of place and everyday mobility relevance        |

## Information architecture

- Desktop preview and mobile expanded preview: category, title, location/year, **Market Context / 市场背景**, **Our Role / 我们的参与**, **Market Outcome / 市场结果**. The outcome has greater type weight and a distinct border.
- Detail: **01 The Market Context**, **02 The Client Objective**, **03 Our Role**, **04 Local Execution**, **05 Market Outcome**, **06 Why It Matters**, followed by the original images and a market-entry cooperation invitation.
- Case metadata, Open Graph and structured-data descriptions use the same objective, role and outcome fields. Homepage case excerpts reuse the canonical summaries.
- Chinese copy is written for market entry and local execution, rather than translated production terminology.

| Previous category                     | New English category             | Chinese          |
| ------------------------------------- | -------------------------------- | ---------------- |
| Market Entry & Brand Launches         | Market Entry & Launch            | 市场进入与发布   |
| Exhibitions & Industry Engagement     | Industry & Ecosystem Engagement  | 产业与生态交流   |
| Culture, Talent & Brand Experiences   | Culture & Audience Engagement    | 文化与受众连接   |
| Brand Localisation & Campaign Content | Localisation & Market Activation | 本地化与市场落地 |

The cultural category deliberately does not imply formal partnerships that the project records do not establish. Category keys and membership remain stable. Scope/capability labels now describe market-facing presentation and local execution; the per-case participation boundaries remain equivalent, including location coordination only where it already existed.

## Changes and preservation

Production files:

- `content/portfolio.ts`: 12 complete bilingual narratives, outcomes and strategic relevance, category and participation labels.
- `content/phase5.ts`: homepage introduction to the case collection.
- `components/sections/CommercialCaseIndex.tsx`: desktop and mobile preview hierarchy.
- `components/sections/PortfolioProjectDetail.tsx`: six-part narrative and commercial CTA.
- `components/sections/PortfolioWork.tsx`: archive title.
- `app/[lang]/work/page.tsx`: positioning, metadata and cooperation invitation.
- `app/[lang]/work/[slug]/page.tsx`: consistent outcome-led metadata and structured-data descriptions.
- `content/portfolio-media.generated.json`, `content/media/presentation-profiles.json`, `scripts/import-portfolio-media.mjs`, `scripts/import-case-study-upgrade-media.mjs`: remove image-making phrasing from affected alternative text and its source definitions. Images are unchanged.

Tests changed: `tests/portfolio-market-positioning.test.mjs` (new regression), `work-commercial-narrative-v2.test.mjs`, `case-study-commercial-redesign.test.mjs`, `phase-3-2c-experience.test.mjs`, `phase-3-4-release-readiness.test.mjs`, `phase-3-repositioning.test.mjs`; browser tests `work-commercial-narrative-v2.spec.ts`, `case-studies-portfolio-upgrade.spec.ts`, `commercial-evidence-university.spec.ts`, `editorial-copy-ux.spec.ts`, `motion-correction.spec.ts`.

Baseline comparison confirms all 12 URLs, identities, dates, order, category membership, image files, layouts, crops and publication gates match HEAD. No design-system, routing, responsive interaction or core architecture rewrite was made. No new test skips were added.

## Residual wording audit

The repository-wide, case-insensitive tracked-text audit is retained in [the full occurrence list](../audit/market-repositioning/residual-source-wording.txt) and [the per-file inventory](../audit/market-repositioning/residual-files.tsv). It covers source, historical reports, fixtures, scripts and assets, excluding Git internals and dependency/build output.

The final source inventory contains 959 matching lines across 143 files outside the current portfolio copy: 566 in historical documentation/audits, 296 in other content registries, and 97 in other routes, components, scripts, tests, assets and utilities. These are an inventory of retained source terms, not 959 visible portfolio occurrences. The new regression test and this report also intentionally quote forbidden terms; neither is website copy.

No matches remain in the canonical project data or Work overview/detail components for photography, videography, filming, camera, shooting, content capture/documentation, event documentation, content/creative/local production, 摄影, 拍摄, 影像制作, 影视制作 or 作品集. Rendered public copy, metadata and image alternative text are also checked by browser regression tests.

Retained occurrences elsewhere:

- Historical `docs/` and `audit/` reports retain original evidence and previous copy, including the superseded narrative audit. They are not rendered as current case copy.
- Retired industry/service pages and older components retain historical service language. Existing redirects send industry routes to the current Companies journey. Rewriting those separate service surfaces is outside this portfolio-only change.
- Current partner-service copy in `Phase5AudiencePages.tsx` mentions photography and film as supporting services. It is outside the Work portfolio and is identified here rather than silently changing another audience page.
- Asset import/inventory data, source filenames, archived source paths, technical identifiers and old URLs remain intact. For example, `london-automotive-brand-film` stays in the URL to preserve existing links; its displayed title and narrative are market-focused.
- Regression patterns intentionally contain forbidden terms to prevent their reintroduction. Rendering/camera terminology in the globe component describes graphics, not a commercial service.

## Verification and screenshots

The new regression first failed on the missing BYD market outcome, then passed after implementation.

| Check                                                      | Final result                                                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Unit and content regression suite                          | 127 passed, 0 failed, 11 existing skips                                                          |
| Targeted browser suite (case narratives, redesign, motion) | 19 passed, 0 failed, 1 existing skip; all these tests also passed within the final full run      |
| Full E2E, first run                                        | 200 passed, 0 failed, 68 existing skips                                                          |
| Full E2E, final rebuilt version                            | **200 passed, 0 failed, 68 existing skips**, 6.8 minutes                                         |
| Production build                                           | Passed; 101 static pages generated                                                               |
| Lint, TypeScript, formatting, diff whitespace              | Passed                                                                                           |
| Content validation                                         | Passed; legacy validator covers 6 governed records, new regression covers all 12 published cases |
| Media validation                                           | Passed; 83 records                                                                               |
| Staging release validation                                 | Passed with existing environment/company/analytics warnings; no production release attempted     |
| Baseline invariants                                        | 12/12 cases preserve URLs, facts, image assets and presentation configuration                    |

The final full run followed the last image-alternative-text edits and final build. It covered both languages, all 12 detail pages at desktop/mobile/tablet widths, metadata/OG/structured-data parity, native language switching, category filters, keyboard and touch interactions, natural image loading, horizontal overflow, reduced motion, automated accessibility, and unrelated existing route regressions. No added skips or weakened timing thresholds were used.

Local preview: [Chinese Work](http://127.0.0.1:3239/zh/work) / [English Work](http://127.0.0.1:3239/en/work).

Screenshots (native site languages, no browser translation):

| Page          | English desktop                                                                      | English mobile                                                                     | Chinese desktop                                                                      | Chinese mobile                                                                     |
| ------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Work overview | [1440px](../audit/market-repositioning/screenshots/en-1440-work.png)                 | [390px](../audit/market-repositioning/screenshots/en-390-work.png)                 | [1440px](../audit/market-repositioning/screenshots/zh-1440-work.png)                 | [390px](../audit/market-repositioning/screenshots/zh-390-work.png)                 |
| BYD BD11      | [1440px](../audit/market-repositioning/screenshots/en-1440-byd-bd11-london.png)      | [390px](../audit/market-repositioning/screenshots/en-390-byd-bd11-london.png)      | [1440px](../audit/market-repositioning/screenshots/zh-1440-byd-bd11-london.png)      | [390px](../audit/market-repositioning/screenshots/zh-390-byd-bd11-london.png)      |
| CATL          | [1440px](../audit/market-repositioning/screenshots/en-1440-catl-open-day-2025.png)   | [390px](../audit/market-repositioning/screenshots/en-390-catl-open-day-2025.png)   | [1440px](../audit/market-repositioning/screenshots/zh-1440-catl-open-day-2025.png)   | [390px](../audit/market-repositioning/screenshots/zh-390-catl-open-day-2025.png)   |
| AGIBOT        | [1440px](../audit/market-repositioning/screenshots/en-1440-agibot-london-launch.png) | [390px](../audit/market-repositioning/screenshots/en-390-agibot-london-launch.png) | [1440px](../audit/market-repositioning/screenshots/zh-1440-agibot-london-launch.png) | [390px](../audit/market-repositioning/screenshots/zh-390-agibot-london-launch.png) |

The same three case details also have 768px tablet screenshots in the screenshot directory. Full-page captures are taken after image loading and after returning to the top, so the sticky header and preview transitions do not contaminate the review images.

Focused visual checks: [desktop overview](../audit/market-repositioning/screenshots/review-en-1440-work.png), [mobile overview](../audit/market-repositioning/screenshots/review-zh-390-work.png), [BYD narrative](../audit/market-repositioning/screenshots/review-en-1440-byd-bd11-london.png), [CATL narrative](../audit/market-repositioning/screenshots/review-en-1440-catl-open-day-2025.png), [AGIBOT mobile narrative](../audit/market-repositioning/screenshots/review-zh-390-agibot-london-launch.png).

Manual perception review: the overview leads with UK/European commercial positioning, previews foreground market outcomes, and representative automotive, industrial and robotics details explain local relevance and team participation. The journey no longer presents image-making or event documentation as the team's principal contribution.
