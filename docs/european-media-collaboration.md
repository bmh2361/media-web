# European Times collaboration & market credibility integration

Date: 2026-09-28. Relationship wording is based on the user's explicit confirmation of an established collaboration. The official website https://www.oushinet.com/ identifies the platform; it is not independent evidence of the collaboration. No authorised logo or verified published Venus Bridge coverage was found in the repository.

## Pre-edit audit

Home: app/[lang]/page.tsx → Phase5Homepage.tsx, bilingual copy in content/phase5.ts. Companies and Partners: app/[lang] routes → Phase5AudiencePages.tsx. How: app/[lang]/how-we-work/page.tsx. About: app/[lang]/about/page.tsx. Work: PortfolioWork / CommercialCaseIndex and canonical content/portfolio.ts. Header and Footer consume phase5Navigation. Shared Section, Container and Eyebrow preserve existing spacing, typography and responsive conventions. Legacy collaborators remain permission-gated and empty; this collaboration does not populate a logo wall. Existing Route 04 contained photography/film/project-record language.

## A. Files changed

- content/market-credibility.ts — bilingual relationship, Route 04 and framework copy.
- content/market-coverage.ts — empty verified-publication dataset and typed article fields.
- components/sections/EuropeanMediaCollaboration.tsx — server-rendered two-column homepage module.
- components/sections/MarketVoiceCoverage.tsx — hidden-when-empty, published-only, maximum-three article component.
- components/sections/Phase5Homepage.tsx — two component insertion points.
- content/phase5.ts — matching Route 04 name in both languages.
- components/sections/Phase5AudiencePages.tsx — Companies Route 04, four-part framework, Partners seventh category.
- app/[lang]/how-we-work/page.tsx — light Activate and Follow Through copy updates; five stages retained.
- e2e/homepage-desktop-composition.spec.ts — semantic section selectors preserve original geometry checks after insertion.
- e2e/market-credibility.spec.ts — bilingual placement, keyboard, external link, no-JS, responsive and screenshot checks.
- tests/market-coverage.test.mjs — real render checks for empty/draft exclusion, three-item limit and bilingual fields.
- audit/market-credibility/remaining-wording.csv — every tracked-file keyword match with a retention reason.
- docs/european-media-collaboration.md — this report.

## B. Exact homepage placement

Immediately after data-phase5-section=model (WHAT WE HELP MAKE HAPPEN), immediately before data-phase5-section=value (LOCAL CAPABILITY). The future coverage component sits after compound (VALUE THAT CONTINUES, including accountability) and before cta.

## C. Final English homepage copy

Eyebrow: EUROPEAN MEDIA COLLABORATION

Headline: From market presence to market credibility.

Body: Venus Bridge works with established European media platforms to extend selected market-entry activity into credible public visibility, industry dialogue and longer-term market assets.

Featured relationship: EUROPEAN TIMES · OUSHINET

Sublabel: European Media Collaboration

Supporting copy: Supporting selected executive interviews, corporate stories, industry commentary and China–Europe market narratives where they reinforce a wider market objective.

Labels: Executive Interviews / Industry Commentary / Corporate Stories / European Market Coverage

External link: https://www.oushinet.com/; target=\_blank, rel=noopener noreferrer, accessible new-tab announcement. Below 768px the long body paragraph is hidden; headline, identity, supporting explanation and labels remain.

## D. Final Chinese homepage copy

Eyebrow: 欧洲媒体合作

Headline: 从市场落地，到形成持续的市场公信力。

Body: Venus Bridge 与欧洲本地媒体平台建立合作，在与企业市场目标相关的情况下，将英国及欧洲市场行动进一步连接到企业采访、产业观点、企业故事与市场传播，让一次市场进入行动沉淀为更长期的市场影响力与商业资产。

Featured relationship: 欧洲时报 · 欧时网

Sublabel: 欧洲媒体合作

Supporting copy: 围绕企业国际化、高管访谈、产业观点、中欧商业故事及英国与欧洲市场实践开展相关内容合作。

Labels: 企业专访 / 产业观点 / 企业故事 / 欧洲市场传播

External link: https://www.oushinet.com/; target=\_blank, rel=noopener noreferrer, accessible new-tab announcement. Below 768px the long body paragraph is hidden; headline, identity, supporting explanation and labels remain.

## E. Companies Route 04 before → after

Before EN: Credibility, Content & Market Assets. “Expert, university or creator engagement where relevant, plus photography, film, interviews and project records.” “Leave with assets that support sales, communications and follow-up.”

Before ZH: 行业影响力、内容与市场资产。“在适用时组织专家、高校、创作者、摄影、影片、采访与项目记录。”“留下可用于销售、传播和后续跟进的资产。”

After EN: **Market Credibility & Strategic Communications**

Build the public and institutional credibility that helps a company become understood, recognised and taken seriously in a new market.

Depending on the commercial objective, this may include executive interviews, industry commentary, media engagement, expert participation, corporate narratives and reusable market-facing assets.

Turn market activity into credibility that continues beyond the event.

After ZH: **市场公信力与战略传播**

让企业进入英国与欧洲后，不只是“出现”，而是逐渐被当地市场理解、识别并建立可信度。

根据商业目标，可组合企业高管采访、产业观点、媒体沟通、专家参与、企业国际化故事及可持续使用的市场材料。

让一次市场行动沉淀为能够持续服务商业发展的市场公信力。

## F. Four-part capability framework

Within the existing Companies solution-routes section, directly below the unchanged four-route grid. The numbered 04 continuation keeps the framework tied to Route 04 without making every route card excessively tall.

1. **Executive Voice** — Help founders, executives, international business leaders and technical experts communicate a credible perspective to a UK / European audience through interviews, founder profiles, expert commentary and market-entry perspectives.

1. **高管表达** — 帮助创始人、高管、国际业务负责人及技术专家，面向英国与欧洲受众表达可信的观点，可采用高管访谈、创始人故事、专家评论与市场进入观察等形式。

1. **Industry Narrative** — Translate technology, industrial strength and market ambition into a locally relevant narrative: why it matters to the European market, what differentiates the company and how it fits the industry and commercial context.

1. **产业叙事** — 将企业技术、产业实力与市场目标转化为具有当地相关性的叙事：为什么与欧洲市场有关，技术差异在哪里，以及如何融入行业与商业语境。

1. **Media Engagement** — Media collaboration includes European Times · Oushinet. Where editorial and commercial relevance align, Venus Bridge can connect suitable corporate stories, executive perspectives and market developments with established European media environments.

1. **媒体沟通** — 媒体合作包括欧洲时报 · 欧时网。在编辑主题与商业目标相匹配的情况下，Venus Bridge 将合适的企业故事、高管观点与市场实践连接到欧洲本地媒体环境。

1. **Commercial Reuse** — A credible interview, market story or expert contribution becomes part of a wider European commercial narrative. Subject to agreed usage, it can support buyer follow-up, distributor and institutional conversations, exhibitions, websites, LinkedIn, stakeholder materials and China-side communication.

1. **商业复用** — 可信的采访、市场故事或专家观点，应成为企业欧洲商业叙事的一部分。在约定使用范围内，可持续服务买家跟进、经销商与机构沟通、展会、企业官网、LinkedIn、利益相关方材料及中国总部沟通。

## G. Partners category

Seventh category, full-width editorial row below the existing six categories; fits both the existing two-column mobile and three-column desktop grids. It remains broader than any one institution.

**Media & Editorial Platforms** — Relevant editorial, interview and market-story environments where the subject, audience and wider commercial objective genuinely align.

**媒体与编辑平台** — 围绕具有真实市场价值的企业议题、行业观点与跨境商业故事，在内容主题、受众与市场目标匹配的情况下开展合作。

## H. Market Voice & Coverage status

Prepared but hidden. Zero verified live items found; production array remains empty. No placeholder cards or section heading are rendered. Future items support status, bilingual type/headline/person-or-company, publication, real date and original external URL. Drafts never render; published items are capped at three. Test-only example.org fixtures never enter production data. Adding an item requires manual verification of its publication, URL, date, relevance and usage permission.

## I–L. Scope confirmations

- NEW PAGE CREATED: NO.
- PRIMARY NAV CHANGED: NO.
- EUROPEAN TIMES ADDED AS CASE STUDY: NO.
- FAKE MEDIA COVERAGE CREATED: NO.

About, Work, Contact, footer, primary navigation, URLs, metadata and structured data are unchanged. Existing market-entry SEO is preserved. No new partnership schema, logo, official/exclusive/strategic status or publication promise was introduced.

## M. Remaining wording

A case-insensitive audit across all tracked text files found 2,310 matching lines in 151 files before this report was added. See ../audit/market-credibility/remaining-wording.csv for each exact occurrence and retention reason. The audit includes historical docs, tests, import scripts and media manifests, not just visible copy. No old Route 04 title remained before this report quoted it as before/after evidence.

Retained categories: stable london-automotive-brand-film URLs and asset IDs; truthful image provenance and team experience; legacy Phase 3/4 implementations; specialised service/sector pages and existing delivery mechanisms; contact schemas; historical reports and regression fixtures. Some specialised service pages still use production vocabulary outside the focused market-entry journey; they were not rewritten or deleted. “Strategic partner” in existing roadshow content describes prospective roadshow participants, not the European Times relationship.

Current Companies Route 04 and its framework contain no photography, film, videography, media-exposure promise, guaranteed-exposure promise, official-partner claim, strategic-partner claim or PR/press-agency proposition. New copy and current core market-entry metadata introduce none of these claims. Historical warnings in documentation are not public claims.

## N. English / Chinese parity and audience review

PASS for matching placement, four labels, four Route 04 mechanisms, seven partner categories, conditional publication display and five process stages.

Editorial review (not external user research):

- Chinese technology/industrial CEO: PASS — credibility follows market entry and relationships; collaboration supplies evidence.
- Chinese international-business director: PASS — Commercial Reuse connects interviews and industry narratives to buyer/distributor follow-up and stakeholder materials.
- UK/European commercial partner: PASS — market-entry positioning and navigation remain primary; relevance determines editorial involvement.
- European media/institutional partner: PASS — editorial relevance and agreed usage are explicit; no guaranteed publication, pricing, resale packages or purchased-exposure proposition.

## O. Mobile screenshots

In ../audit/market-credibility/: en-home-375.png, en-home-390.png, en-home-430.png and corresponding zh-home files. Both languages also have route04, framework and partners screenshots at all three widths.

## P. Desktop screenshots

In the same folder: en-home-1440.png, en-route04-1440.png, en-framework-1440.png, en-partners-1440.png and corresponding zh files. Screenshots are local QA artefacts, excluded from Git by the existing image-audit ignore rules.

## Q. Targeted validation

Initial focused E2E: 10 passed, 2 existing viewport-specific skips. Includes homepage composition plus new bilingual integration checks. Keyboard Enter opens the official external target in a new tab with null opener; Tab/Shift+Tab preserve focus. No hydration or browser errors observed. No-JS pages expose the collaboration and framework. All requested widths have no horizontal overflow.

Unit suite: 129 passed, 11 existing skips. Build succeeded with 97 static pages. Lint, typecheck and repository-wide format check all passed; git diff --check passed.

## R. Full E2E

210 passed, 68 existing skips, 0 failures (6.8 minutes). Both desktop and mobile projects completed. Existing coverage was preserved; only brittle homepage section indexes became semantic selectors. The full suite includes automated accessibility checks, original case regressions and all new credibility checks.

The user approved publishing this work to GitHub main and the existing Cloudflare Pages production site on 2026-09-28.

## Publication follow-up: previous GitHub failure

The previous commit 25052e4 deployed successfully to Cloudflare Pages (deployment a7d75873-1009-410a-a274-7f7603fac8d9). GitHub CI run 36347566233 failed one E2E test: About geographic story pause/resume. Its 1,800 ms startup deadline observed the globe still in the quiet stage on the Linux runner; the other 201 tests passed and 68 were skipped. Build and all earlier checks passed.

The test now waits explicitly for the viewport observer to unpause the globe, then uses Playwright's normal bounded assertion timeout for the unchanged origin/primary stage requirement. It still verifies the paused stage and SVG stroke offset remain unchanged offscreen, explicitly checks resumption and requires the settled stage. No runtime animation code, assertion, test or failure gate was removed.

Both workflows upgrade checkout and setup-node to v5, and CI upgrades upload-artifact to v6, whose action manifests use Node 24. This addresses the separate Node 20 action-runtime deprecation warning while keeping the application's Node 22 build environment.
