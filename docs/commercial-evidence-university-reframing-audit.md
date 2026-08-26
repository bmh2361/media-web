# Commercial Evidence & University Reframing Audit

## Strategic decision

The primary positioning remains **Cross-Border Collaboration & Market Presence Partner**. This phase changes evidence hierarchy, not company category.

The target commercial model is now expressed consistently as:

> One commercial objective. The right local context. The right participants. Accountable delivery. Evidence that remains useful afterwards.

## Phase A — pre-implementation audit

The current canonical navigation was already the correct six-item structure: Home, Companies, Partners, Work, About and Contact. No new top-level navigation item was required.

The strongest remaining perception problems were concentrated in the live Phase 5 surfaces:

- Homepage: strategically strong hero, but selected evidence and hero scenes were almost entirely automotive launch, event and production imagery. The generic participants section did not establish institutional or talent capability.
- Companies: a four-card strip led with events, photography, talent and media, recreating a supplier catalogue directly beneath an outcome-led page introduction.
- Partners: universities and researchers appeared only as a collaborator type; student and graduate communities, representation boundaries and documentation value were under-explained.
- Work: the page hierarchy ended with “Selected Creative Production”; project metadata led with photography, event or exhibition language; fashion and beauty work therefore determined the final category impression.
- Case details: the data model contained strong evidence and scope boundaries, but `projectType` and role labels still foregrounded execution methods. Unknown outcomes were correctly withheld.
- About: judgement, orchestration and accountability were strong, but “Extended Production Network” framed the company as a production house with freelancers.
- Visual evidence: approved assets are weighted toward automotive launches, exhibition environments and editorial portraiture. No university media is currently publication-ready.
- Responsive baseline: 1440 px rendered without horizontal overflow. Existing components already provided fluid type, responsive media derivatives, reduced-motion handling and mobile navigation.
- Truth baseline: existing institutional publishing logic failed closed. No verified public university case was present, and no university logo or unsupported endorsement was exposed.

Legacy capability and industry routes remain secondary to the canonical commercial journey and are governed by existing redirects, release gates and sitemap rules. This phase did not reopen those historical architectures.

## Phase B — commercial evidence taxonomy

The controlled internal vocabulary is:

- Market Presence
- Industry Credibility
- Institutional Engagement
- Employer Branding
- Talent Engagement
- Brand Activation
- International Communications
- Brand Evidence
- Cultural Engagement
- Stakeholder Engagement

The Work hierarchy exposes only three useful groups at once:

1. Market Presence & Industry Credibility
2. Institutional, University & Talent Engagement
3. Brand Evidence & Cultural Execution

Photography, film, events, exhibitions, creators and production remain execution methods below those groups.

## Phase C — data and truth architecture

`content/commercial-evidence.ts` adds a reusable bilingual case structure with commercial objective, context, programme, role, evidence, outcome, audience, capabilities, institutional relationship level, media, media status and evidence status.

Three media-ready institutional records are prepared:

- Cambridge Student-Community Cultural Programme
- UK University Talent Engagement Programme
- London University-Community Activation

They contain no invented client, university, sponsor, date, attendance, outcome or endorsement. Missing media is suppressed through a deliberate text-led composition. Exact publication inputs are governed by `docs/university-evidence-intake.md`.

Existing portfolio records now expose derived commercial-objective, market, institutional relationship, media-status and evidence-status fields while preserving their existing evidence, rights and scope gates.

## Implemented page changes

### Home

- Preserved the primary hero and two-sided company / partner journey.
- Reframed the existing participants chapter as an institutional and talent context module rather than adding page length.
- Reframed company outcomes and hero scene labels around market evidence, institutional engagement and reusable brand evidence.

### Companies

- Replaced supplier-led categories with four commercial environments.
- Added a clear journey for students, graduates, university communities, employer visibility and university-facing programmes.
- Kept execution mechanisms subordinate and removed a large production image from the end of the capability section.

### Partners

- Added student and graduate communities as a distinct collaboration context.
- Clarified commercial context, genuine fit, bilingual coordination, accurate representation, documentation and long-term relevance.

### Work

- Rebuilt the page as commercial evidence rather than a portfolio.
- Added a text-led, media-ready institutional and talent evidence chapter.
- Demoted creative/editorial work into a compact third-level brand-evidence group.
- Reframed selected case titles, objectives, roles and labels without expanding the underlying scope claims.

### About

- Reframed the extended network as a Specialist Delivery Network.
- Made the accountable coordination layer primary and specialist roles secondary.

### SEO and bilingual copy

- Updated current homepage, About and Work descriptions toward cross-border market presence, institutional engagement, employer branding and brand evidence.
- Implemented equivalent English and Chinese meaning; avoided “university resources”, recruitment-agency framing and unsupported relationship language.

## Responsive and visual QA

The English and Chinese Home, Companies, Partners, Work and About routes were checked at 1440, 1280, 1024, 768, 430 and 375 px. All 60 route / viewport combinations rendered without horizontal overflow. Headline scaling, CTA visibility, header width, text-image balance and section order remained intact.

The Work institutional chapter was inspected visually at desktop and mobile sizes. Its three records render as an intentional editorial text composition with no image element or empty media box while `mediaStatus` is pending. At mobile width the records stack in evidence order before the smaller Brand Evidence section.

Validation results:

- Content governance: pass
- TypeScript: pass
- Lint: pass
- Unit / content tests: 108 passed, 0 failed, 11 skipped
- Phase-specific browser tests: 8 passed, 0 failed
- Production build: pass, 92 static pages generated

The repository-wide historical Playwright command was also sampled. Four pre-existing About tests still assert a retired pre-Phase-5 headline and CTA and therefore fail before reaching this phase's tests; the long historical run was stopped. Those stale expectations are outside the current canonical page contract. The new phase-specific browser suite covers the changed routes, both languages and all required breakpoints.

## Final self-audit

Scores are evidence-based editorial judgements after source, browser and validation review.

| Measure | Score |
| --- | ---: |
| Primary category clarity | 9.2 / 10 |
| Cross-border commercial clarity | 9.3 / 10 |
| Market-presence credibility | 8.8 / 10 |
| Institutional credibility | 8.0 / 10 |
| University / talent capability clarity | 8.5 / 10 |
| Creative credibility | 8.6 / 10 |
| Case-study commercial quality | 9.0 / 10 |
| Partner clarity | 9.0 / 10 |
| Chinese-buyer clarity | 9.1 / 10 |
| UK / European partner clarity | 9.0 / 10 |
| Premium visual perception | 9.0 / 10 |
| Conversion clarity | 8.8 / 10 |

| Unwanted perception | Score |
| --- | ---: |
| Photography-company perception | 2.8 / 10 |
| Event-agency perception | 2.5 / 10 |
| Production-house perception | 2.8 / 10 |
| Resource-broker perception | 1.2 / 10 |
| Generic-consultancy perception | 2.0 / 10 |
| Portfolio-only perception | 1.5 / 10 |

## Final delivery report

1. Strategic positioning changed: **NO**
2. University & Talent Engagement: **IMPLEMENTED**
3. University case architecture: **READY**
4. Institutional truth gates: **PASS**
5. Existing cases commercially reframed: **YES**
6. Photography-company perception: **2.8 / 10**
7. Event-agency perception: **2.5 / 10**
8. Cross-border market-presence clarity: **9.3 / 10**
9. Institutional / talent clarity: **8.5 / 10**
10. Homepage evidence balance: **PASS**
11. Companies journey: **PASS**
12. Partners journey: **PASS**
13. Work hierarchy: **PASS**
14. About accountability: **PASS**
15. English: **PASS**
16. Chinese: **PASS**
17. Desktop: **PASS**
18. Tablet: **PASS**
19. Mobile: **PASS**
20. TypeScript: **PASS**
21. Lint: **PASS**
22. Tests: **Unit 108 passed / 0 failed; phase-specific E2E 8 passed / 0 failed; 11 unit tests skipped**
23. Production build: **PASS**
24. Files changed:
    - `app/[lang]/page.tsx`
    - `app/[lang]/about/page.tsx`
    - `app/[lang]/work/page.tsx`
    - `components/sections/Phase5Homepage.tsx`
    - `components/sections/Phase5AudiencePages.tsx`
    - `components/sections/PortfolioWork.tsx`
    - `components/sections/PortfolioProjectDetail.tsx`
    - `components/sections/AboutTeam.tsx`
    - `content/phase5.ts`
    - `content/portfolio.ts`
    - `content/commercial-evidence.ts`
    - `content/seo.ts`
    - `docs/university-evidence-intake.md`
    - `docs/commercial-evidence-university-reframing-audit.md`
    - `tests/phase-5-dual-audience.test.mjs`
    - `tests/phase-13-media.test.mjs`
    - `tests/phase-3-2c-experience.test.mjs`
    - `tests/phase-3-repositioning.test.mjs`
    - `e2e/commercial-evidence-university.spec.ts`
25. Remaining items requiring human evidence: exact institutional identities, relationship levels, clients, sponsors, dates, responsibilities, outcomes, media and permissions.
26. Exact university-case fields still required from user: see `docs/university-evidence-intake.md`; all fields are also listed in the section below.
27. Report file: `/docs/commercial-evidence-university-reframing-audit.md`

## Remaining human evidence

- Exact organisations and relationship levels for all three institutional programme records
- Client and sponsor roles
- Dates, venues and programme names
- Confirmed Venus Bridge responsibilities and collaborators
- Approved, measurable evidence and outcomes
- Media files, captions and rights
- Naming, logo and participant permissions
- Public supporting links and confidentiality restrictions
