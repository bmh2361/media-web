# WEIRIC & CO. transaction enablement integration

Date: 2026-09-28. Baseline: 2eb0dbe0ed75d38ad84030c4fcfb5999d5b5a1d4, matching local main and origin/main. Before editing, the public Home, Companies and Partners pages were checked in both languages with a real browser; all returned HTTP 200 and retained the European Times module, Route 04 framework and media-platform category.

WEIRIC factual source: [WEIRIC official website](https://weiric.com/), reviewed before editing. Its public description supports asset-backed liquidity around industrial operating assets, plant/utility/energy systems and cross-border asset pools. The relationship itself is supplied by the user's brief. No inference is made about committed capital, fund size, banking status or financing approval.

## A. Audit and files changed

Actual route architecture: Home → Phase5Homepage.tsx with content/phase5.ts; Companies and Partners → Phase5AudiencePages.tsx; How We Work → app/[lang]/how-we-work/page.tsx; Contact → app/[lang]/contact/page.tsx and ContactExperience.tsx. Language uses the existing en/zh model. The homepage taxonomy is a title-only six-item array; Partners has six titles plus the separate media-platform row. Shared Container/Eyebrow/Section establish the current editorial design. EuropeanMediaCollaboration is specific to media and remains untouched; the old collaborators registry remains empty and permission-gated. No authorised WEIRIC logo is used.

Changed files:

- content/transaction-enablement.ts — matching EN/ZH copy and official external URL.
- components/sections/TransactionEnablement.tsx — server-rendered transaction context and specialist relationship.
- components/sections/Phase5AudiencePages.tsx — insertion after pipeline, updated partner category and optional desktop explanation.
- content/phase5.ts — homepage category title in both languages.
- app/[lang]/how-we-work/page.tsx — specialist-entry paragraph only.
- app/[lang]/contact/page.tsx — transaction-support example added to Goal only.
- tests/transaction-enablement.test.mjs — server-rendered copy, qualification, safe external link and bilingual record parity.
- e2e/transaction-enablement.spec.ts — routes, placement, taxonomy, responsiveness, screenshots, keyboard, popup and no-JS coverage.
- audit/transaction-enablement/relationship-wording.csv — complete keyword-occurrence review.
- docs/weiric-transaction-enablement.md — this report.

## B. Exact Companies placement

Inside the existing exhibition-to-pipeline section: immediately after the three-item Before / On the ground / After list, immediately before LOCAL TEAM CAPABILITY. The new section is not adjacent to Route 04 or its four-part framework. No major page sections are rearranged. New semantic section marker: data-transaction-enablement; the following local-team block is marked data-local-team-capability for placement regression checks.

## C. Final English Transaction Enablement copy

Eyebrow: WHEN OPPORTUNITY BECOMES A TRANSACTION

Headline: Real opportunities sometimes need capital and structure to move forward.

As buyer interest develops into a real commercial opportunity, the constraint may shift from market access to transaction execution.

Where an industrial or asset-intensive opportunity requires capital structuring, specialist financing relationships, ownership solutions or transaction support, Venus Bridge can coordinate relevant professional capability around the commercial objective.

Relationship label: SELECTED SPECIALIST RELATIONSHIP

Name: WEIRIC & CO.

Category: Asset-Backed Liquidity & Transaction Structuring

For selected industrial and asset-intensive situations, WEIRIC structures around mission-critical operating assets, including production systems, energy and utility assets and cross-border asset portfolios where conventional financing may not provide the required flexibility.

Within relevant Venus Bridge-led opportunities, this specialist capability can be introduced where capital timing, asset structure or transaction complexity becomes material to moving the commercial opportunity forward.

Link: Visit WEIRIC & CO. ↗ — https://weiric.com/

Qualification: Any financing or transaction structure is independently assessed and agreed by the relevant specialist.

Mobile context, replacing the two longer paragraphs below 768px: When buyer interest becomes a real industrial or asset-intensive opportunity, Venus Bridge can coordinate relevant capital, ownership and transaction specialists around the commercial objective.

Mobile specialist description, replacing the longer description and connection line: For selected industrial and asset-intensive situations, WEIRIC structures around mission-critical operating assets where capital timing, ownership or cross-border complexity calls for a tailored approach.

## D. Final Chinese Transaction Enablement copy

Eyebrow: 当商业机会进入交易阶段

Headline: 真实机会有时需要资本与交易结构，才能继续向前。

当买家兴趣逐渐转化为真实商业机会，项目的关键问题也可能从“如何进入市场”转向“如何完成交易”。

对于部分工业、设备及资产型项目，如涉及资本结构、融资资源、资产安排或其他专业交易支持，Venus Bridge 可围绕具体商业目标协调相应专业能力，帮助机会继续向实际交易推进。

Relationship label: 专业合作关系

Name: WEIRIC & CO.

Category: 资产支持型流动性与交易结构

针对部分工业及资产型项目，WEIRIC 围绕具有关键运营价值的资产设计交易结构，包括工业生产系统、能源与公用设施以及跨境资产组合等，在传统融资框架难以充分覆盖的情况下提供更具针对性的结构方案。

在适合的 Venus Bridge 商业项目中，当资本时点、资产结构或交易复杂度开始影响项目推进时，可按项目需要引入这一专业能力。

Link: 了解 WEIRIC & CO. ↗ — https://weiric.com/

Qualification: 任何融资或交易结构，均由相关专业机构独立评估并协商确定。

Mobile context, replacing the two longer paragraphs below 768px: 当买家兴趣转化为真实工业或资产型机会，Venus Bridge 可围绕商业目标，协调资本、资产安排与专业交易支持，帮助项目继续推进。

Mobile specialist description, replacing the longer description and connection line: 针对部分工业及资产型项目，WEIRIC 围绕关键运营资产，在资本时点、资产安排或跨境结构需要专门处理时，设计有针对性的交易方案。

## E. Relationship wording and hierarchy

SELECTED SPECIALIST RELATIONSHIP / 专业合作关系. Typography-only WEIRIC & CO.; no logo assets downloaded or recreated. The transaction headline is larger than the WEIRIC name. Venus Bridge coordinates professional capability around the commercial objective; WEIRIC enters selected opportunities when the structure requires it. The independent-assessment qualification stays visible at every width. The official external link has target=\_blank, rel=noopener noreferrer and a screen-reader new-tab announcement. Optional tags were omitted to avoid repeating the asset list and increasing mobile density.

## F. Homepage taxonomy before → after

Professional Services → Capital, Legal & Professional Services.

专业服务 → 资本、法律与专业服务.

The existing six-category grid remains title-only; no description, WEIRIC banner, hero, logo or new homepage section is introduced.

## G. Partners taxonomy before → after

Professional Services / 专业服务机构 → Capital, Legal & Professional Services / 资本、法律与专业服务.

The existing seven-category order is preserved: Universities & Researchers; Industry Specialists; Capital, Legal & Professional Services; Creators & Talent; Venues & Event Operations; Local Delivery Specialists; Media & Editorial Platforms.

Optional explanation, visible from 768px to avoid an overly tall mobile half-width card:

Capital, transaction, legal, compliance and specialist advisers involved where a genuine commercial opportunity requires them.

当真实商业机会进入更具体的交易阶段时，根据需要引入资本、交易、法律、合规及其他专业机构。

The Media & Editorial Platforms row and its description are unchanged.

## H. How We Work

Only WHEN SPECIALISTS ENTER changed. Understand, Design, Activate, Deliver and Follow Through remain the same five stages, including the previous editorial and credibility references. No WEIRIC promotion appears on this page.

Researchers, industry specialists, capital and professional advisers, editorial platforms, venues, creative teams, talent or local logistics join only where they strengthen the commercial result, working around the same objective, scope and coordination route.

研究人员、行业专家、资本与专业顾问、媒体平台、场地、创意团队、人才或本地执行能力，仅在有助于商业结果时加入，并围绕同一目标、范围与协调路径协作。

## I. Contact

The page uses direct email/WeChat and four briefing examples, not a project form. Only the Goal example changed:

Launch, partnership, credibility, activation, local execution or transaction support.

发布、合作、建立信誉、活动、本地执行或交易支持。

No fields, application workflow or submission mechanism added.

## J–N. Required confirmations

- NEW PAGE CREATED: NO.
- PRIMARY NAVIGATION CHANGED: NO.
- WEIRIC CASE STUDY CREATED: NO.
- VENUS BRIDGE PRESENTED AS LENDER: NO.
- WEIRIC PRESENTED AS GUARANTEED FUNDING SOURCE: NO.

No changes to About, Work, primary navigation, footer, SEO metadata or structured data. No pricing, fund/balance-sheet claims or financial-service application funnel.

## O. European Times regression

PASS. EuropeanMediaCollaboration.tsx, content/market-credibility.ts, MarketVoiceCoverage.tsx and content/market-coverage.ts are unchanged. Route 04 and all four framework descriptions remain intact. The existing bilingual market-credibility E2E suite is run alongside the new tests; its placement, links, publication gating and no-JS checks remain active.

## P. EN/ZH parity and strategic perception

PASS for matching category names, placement, coordination model, relationship qualification, link behavior, five process stages and Contact goal.

Editorial review, not a claim of external user research:

- Chinese industrial company: PASS — specialist coordination continues after real buyer interest and pipeline development.
- UK/European buyer: PASS — the opportunity determines the professional relationships required.
- Capital/professional partner: PASS — the context is a Venus Bridge-led industrial opportunity with specific timing/asset/transaction requirements, rather than a general finance-lead funnel.
- General visitor: PASS — the market-entry, commercial relationship and local-execution model remains primary; no new visible finance service or navigation item.

## Copy audit

The requested English phrases were searched case-insensitively across tracked and new non-ignored text files before this report was generated; Loan and Lender used word boundaries to avoid matching unrelated words such as download. All 36 matching lines across 17 files are listed with reasons in ../audit/transaction-enablement/relationship-wording.csv.

Only two matches are in application/content source: content/roadshows.ts uses “Investor & Strategic Partner Roadshow Production” and “Potential strategic partners” for pre-existing roadshow participants. They do not describe WEIRIC or its relationship to Venus Bridge and were retained within the focused scope. Other matches are historical audit/documentation quotations and regression assertions. The new public transaction copy contains none of the prohibited labels or guarantees.

## Q. Mobile screenshots

Directory: ../audit/transaction-enablement/. Both en and zh have companies, home and partners captures at 375, 390 and 430 pixels. Screenshot-only styling hides the fixed page header so it does not cover the captured section; production styling is unchanged.

## R. Tablet and desktop screenshots

The same bilingual companies, home and partners captures are available at 768 and 1440 pixels. Images are local audit artefacts ignored by the existing Git rules.

## S. Targeted tests

Initial affected-route suite: 16 passed, including European Times regression. Unit suite: 132 passed, 11 existing skips. Build: 97 static pages. Keyboard Tab/Shift+Tab/Enter, safe popup with no opener, accessible external-link name, no-JS content, qualification visibility, hydration/console behavior and no horizontal overflow checked. Final full-suite results follow below.

## T. Full E2E

218 passed, 68 existing skips, 0 failures (8.1 minutes). All original tests remain active with their existing skip rules. European Times regression and the new transaction tests passed in both desktop and mobile projects. Lint, typecheck, formatting, content validation, staging validation and git diff --check passed.

This release uses the existing GitHub main → Cloudflare Pages publication flow. Final hosting/CI status and direct live-domain verification are reported in the delivery message.
