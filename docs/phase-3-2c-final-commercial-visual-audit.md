# Phase 3.2C Final Commercial & Visual Audit

Date: 2026-08-13  
Runtime reviewed: local production build  
Canonical scope: Home, Capabilities, Work, About, Contact and three representative case pages in English and Chinese

## Delivered experience

The strategic category, core logic, four capabilities, four commercial project types, navigation and CTA architecture remain unchanged. The redesign changes how the existing strategy is experienced:

- Home retains eight chapters but now opens with a four-scene, slow editorial media system and a broader activity rail.
- Capabilities uses an interactive index and four different chapter grammars: institutional report, industry sequence, creator campaign wall and production-output sequence.
- Work opens as a named-project mosaic, then separates four featured projects from a restrained supporting selection without public evidence tiers.
- Case pages select cinematic, portrait-editorial or split heroes from governed project media.
- About is an editorial rationale supported by real working environments rather than a team wall.
- Contact is a minimal conversation-first page with three required inputs and optional commercial context.

No new client, institutional relationship, endorsement, outcome or project was invented. Capability-only media remains visually useful without becoming a named case.

## Adversarial visual review

| Question                                                          | Result                   | Evidence                                                                                                                                                                                                                     |
| ----------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expensive or simply empty?                                        | PASS                     | Large type is paired with real environments, deliberate borders, asymmetry and controlled media density. Empty space performs hierarchy rather than substituting for content.                                                |
| Understandable without every paragraph?                           | PASS                     | Hero propositions, numbered capability labels, project titles, contextual media and short role lines communicate the structure at scan speed.                                                                                |
| Does automotive dominate?                                         | IMPROVED                 | Automotive still supplies the strongest named launch cases, but Home now leads with industry, robotics, people and creator-product production; Capabilities gives technology and creator work substantial independent space. |
| Is technology / innovation visible?                               | PASS                     | Robotics leads one Home hero scene and an outcome, while CATL, Leapmotor, the robot exhibition and an industry-design talk form a technology-rich Industry chapter.                                                          |
| Is creator / talent visible?                                      | PASS                     | Product-led creator media, fashion retail, Teal, beauty and interview content are framed as activation, casting and commercial production rather than a roster.                                                              |
| Does fashion look commercially relevant?                          | PASS                     | Fashion and beauty are paired with product, styling, campaign, retail and deliverable language.                                                                                                                              |
| Does institutional capability feel credible without fake imagery? | PASS                     | The chapter is intentionally text-first, explains formats and process, states the endorsement boundary once and renders no invented engagement.                                                                              |
| Does Work create desire rather than feel like a database?         | PASS                     | Four large alternating features and a five-project supporting edit replace proof-tier groups, tags and governance labels.                                                                                                    |
| Do Capabilities feel like repeated templates?                     | PASS                     | Each capability has a distinct interaction and visual rhythm.                                                                                                                                                                |
| Does About feel human and specific?                               | PASS                     | A real UK location-production moment and real technology environment support a London-based China/UK rationale without presenting a fake team.                                                                               |
| Does every major page have its own grammar?                       | PASS                     | Home multi-scene; Capabilities index; Work mosaic; About manifesto; Contact conversation; case adaptive evidence hero.                                                                                                       |
| Would a serious Chinese CEO understand the opportunity?           | PASS                     | English and Chinese both lead with objectives, credible environments, local delivery and assets that continue serving commercial conversations.                                                                              |
| Would this support a £5k–£50k+ discussion?                        | PASS WITH EVIDENCE LIMIT | Production range and delivery credibility support the conversation. Named commercial outcomes and permissioned institutional engagements remain owner-supplied evidence opportunities.                                       |

## Buyer test

| Buyer                                        | Recognition test                                                                            | Result |
| -------------------------------------------- | ------------------------------------------------------------------------------------------- | ------ |
| Chinese AI / robotics company                | Technology environments, industry presence, expert possibilities, content execution         | PASS   |
| Automotive / energy company                  | Launches, large events, exhibitions, executive/stakeholder content                          | PASS   |
| Fashion / beauty brand                       | Creator, talent, styling, production and activation                                         | PASS   |
| Technology company seeking expert engagement | Credible formats, confidentiality maturity, coordination without false institutional claims | PASS   |
| Chinese marketing director                   | Overseas activity plus China-useful commercial assets                                       | PASS   |

## Perception assessment

| Perception                        | Final result |
| --------------------------------- | ------------ |
| Market-entry consultancy          | VERY LOW     |
| Generic consultancy               | LOW          |
| Photography studio                | LOW          |
| Model agency                      | LOW          |
| Generic event supplier            | LOW          |
| Premium B2B partner               | HIGH         |
| Programme orchestrator            | HIGH         |
| Technology / innovation relevance | HIGH         |
| Creative execution credibility    | HIGH         |
| Institutional potential           | CREDIBLE     |
| Commercial desire                 | HIGH         |

## Media balance

- 1,073 public image files were inventoried.
- 107 highest-fidelity source photographs were visually reviewed, representing 91 distinct photographic moments.
- 87 logical photographic masters are now used across public routes: 67 portfolio masters, 16 previously active capability masters and four newly surfaced creator/product masters.
- Nine existing capability images were newly selected for high-level canonical presentation; four of those had not previously been publicly rendered.
- Fifty-nine non-evidence images are rejected from commercial surfaces: 52 demo files, five placeholders and two unrelated legacy scaffold images.
- Strongest newly surfaced category: robotics and technology exhibition environments.
- Most underused remaining category: live-performance and cultural-event imagery; it remains supporting-only because its commercial role is less explicit.

## Responsive, interaction and runtime evidence

Evidence is stored under `audit/phase-3-2c/`:

- 64 responsive route screenshots: 40 canonical EN/ZH page views plus 24 EN/ZH representative case views at 1440, 1280, 768 and 390 px.
- Nine focused states: alternate Home hero, capability-index focus, institutional chapter, technology/industry chapter, creator/talent chapter, creative-production chapter, featured Work and EN/ZH mobile menus.
- 40 programmatic canonical checks recorded in `responsive-qa.json`: zero horizontal overflow, zero broken images, one H1 per page and zero missing alt attributes.
- Mobile Home remained on the selected static technology scene after 7.2 seconds; no distracting mobile cycle occurred.
- Browser console errors/warnings: zero.

## Engineering validation

| Validation                 | Result                                                                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript                 | PASS                                                                                                                                    |
| ESLint                     | PASS                                                                                                                                    |
| Unit tests                 | PASS — 101 tests, 90 passed and 11 intentionally skipped by existing release gates                                                      |
| Phase 3.2C E2E             | PASS — four relevant checks passed across desktop/mobile; two project-specific tests intentionally skipped outside their target project |
| Production build           | PASS — 88 static pages generated; canonical first-load JavaScript 105–129 kB                                                            |
| Content / claim validation | PASS                                                                                                                                    |
| Media / rights validation  | PASS — 83 governed records in the existing staging manifest                                                                             |
| Responsive crop validation | PASS — 249 crops across 83 art-directed assets                                                                                          |
| Pricing-removal validation | PASS                                                                                                                                    |
| Accessibility              | PASS — canonical EN/ZH pages and three case modes have zero moderate-or-higher Axe findings; mobile menu focus restores on Escape       |
| Performance                | PASS — 866,575 B initial encoded resources, 188,582 B scripts, 536,451 B images, one priority image and one rendered Home hero scene    |
| Runtime visual validation  | PASS                                                                                                                                    |

The pre-existing broad E2E command still contains superseded Phase 2 route and copy assertions and timed out after encountering those failures. Phase 3.2C therefore has its own canonical production suite. Updating or retiring the superseded specs is P1 test-maintenance work, not a Phase 3.2C production defect.

## Remaining priorities and owner evidence

Remaining P0: none within the Phase 3.2C scope.

Remaining P1:

- Update or retire superseded legacy E2E specifications.
- Add permissioned project outcomes/results where clients approve precise publication.
- Activate `SelectedEngagements` only when an anonymous or named institutional record passes evidence, rights and owner approval.

Production release still requires the existing owner confirmations and environment configuration: legal review, public company details, contact delivery, approved media, public case evidence, social profiles, contact channels, production site URL/origins and distributed rate limiting. These are release gates; they are not bypassed by this redesign.

## Recommended Phase 3.2D

Permissioned outcome evidence and institutional engagement activation: add approved result statements, anonymous engagement records and named relationships only where the existing evidence schema, rights and owner gates permit publication.
