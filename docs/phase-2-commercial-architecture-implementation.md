# Phase 2 — Commercial Architecture Implementation

## 1. Executive Summary

Phase 2 has moved Venus Bridge Media from a broad production-led website into a clearer commercial system for Chinese companies planning work in the UK.

The public position is now:

> UK Brand, Launch & Local Execution Partner for Chinese Companies

The implementation is organised around four customer situations, four solution areas, evidence-based proof tiers, a five-stage delivery sequence and two genuinely different conversion routes. The architecture remains execution-led: market exploration and readiness are customer problems Venus Bridge Media can help structure, not a claim that the company is a full-service or regulated market-entry consultancy.

The release review found no critical truth, contact-contract or routing issue. Production code, formatting, linting, TypeScript, tests and the Next.js production build pass. Runtime browser validation was unavailable in the current audit environment and is recorded as a limitation, not a build failure.

Release assessment: **YES WITH GATED FEATURES**.

## 2. Files Changed

### Homepage

- `app/[lang]/page.tsx`
- `components/sections/Hero.tsx`
- `components/sections/HomepageSelectedWork.tsx`
- `components/sections/ProductionProcess.tsx`
- `content/pages/home.ts`

### Commercial architecture

- `content/commercial-architecture.ts`
- `components/sections/CommercialArchitecturePages.tsx`
- `app/[lang]/what-we-do/page.tsx`
- `app/[lang]/what-we-do/building-uk-presence/page.tsx`
- `app/[lang]/services/page.tsx`
- `app/[lang]/about/page.tsx`

### Navigation

- `content/navigation.ts`
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `app/[lang]/layout.tsx`

### Proof

- `content/portfolio.ts`
- `components/sections/HomepageSelectedWork.tsx`
- `components/sections/PortfolioWork.tsx`
- `components/sections/PortfolioProjectDetail.tsx`
- `app/[lang]/work/page.tsx`

### Industries

- `app/[lang]/industries/page.tsx`
- `app/[lang]/industries/[sector]/page.tsx`
- `components/sections/InformationArchitecturePages.tsx`
- `components/sections/CapabilityExpertisePages.tsx`

Existing dedicated Automotive and Fashion, Beauty & Apparel industry pages remain in place. The dynamic industry route now generates only Entertainment & Culture and Technology, AI & Research, avoiding duplicate static definitions.

### Contact

- `app/[lang]/contact/page.tsx`
- `components/sections/ContactExperience.tsx`
- `components/sections/CommercialContactForms.tsx`
- `lib/contact/validation.ts`

The existing protected API and delivery chain remain in use:

- `app/api/contact/route.ts`
- `lib/contact/rate-limit.ts`
- `lib/contact/config.ts`
- `lib/contact/send.ts`

### SEO and routing

- `next.config.mjs`
- `app/sitemap.ts`
- metadata in the new and rewritten pages

### Tests

- `tests/content-contract.test.mjs`
- `tests/phase-12-ia.test.mjs`

Existing truth and release tests in `tests/market-entry.test.mjs`, `tests/phase-13-media.test.mjs`, `tests/portfolio.test.mjs` and the remaining suite were retained.

## 3. Commercial Architecture Implemented

### Customer Situation architecture

The public journey starts from four situations:

1. Exploring the UK
2. Preparing a UK Launch
3. Building UK Presence
4. Ready for Local Delivery

Each situation states the client signal, the decision to make and a relevant next route. The former three-path production taxonomy still supports delivery pages, but it no longer defines the top-level customer decision model.

### Solution architecture

Four solution areas are implemented:

1. Brand & Localisation — developing capability
2. Launch & Activation — core delivery
3. Creative Production — core delivery
4. Local Delivery — core delivery

Creator and talent support remains a cross-cutting execution capability. Specialist knowledge input remains dependency-led and project-specific.

Three focused product concepts are modelled without being presented as mature offers:

- UK Market Entry Diagnostic — build first; selected projects subject to fit
- Launch Readiness — pilot first
- Localisation Review — pilot first

They are not promoted in primary navigation and have no public price claims.

### Proof tiers

The Proof system separates:

- Tier 1 — Strategic Case
- Tier 2 — Execution Case
- Tier 3 — Capability Evidence

The presentation helper fails closed: only a specifically approved execution set receives Tier 2; remaining portfolio records receive Tier 3. There is no automatic path to Tier 1.

### Dual conversion

The Contact experience now offers two independent paths:

- Request a 20-minute UK Fit Call
- Send an Execution Brief

The two routes have different intent, fields, validation and payload context.

### Capability boundaries

Capability media is still separate from Work projects. Entertainment, creator, concert, celebrity, fashion and technology material is not upgraded because a visual asset is public. Institution records remain subject to the existing relationship, wording, approval-evidence, public and logo-use gates.

## 4. Homepage Before → After

### Before

The homepage led with three production routes and moved quickly into a broad list of work, expertise and company benefits. It described what Venus Bridge Media could produce, but gave a Chinese decision team limited help in recognising its current UK business situation.

### After

The homepage now follows a commercial decision sequence:

1. Hero positioning
2. Customer Situations
3. Demand Creation
4. Solutions
5. Proof by business objective
6. Define → Connect → Plan → Execute → Learn
7. Local Execution Engine
8. Production & Talent Network
9. Industry priorities and four visual expertise entries
10. Insights gate — hidden because the content threshold is not met
11. Dual conversion

This changes the logic from “choose a service” to “recognise the current decision, understand the delivery risk, see the relevant solution and evidence, then choose the right next step.”

## 5. Conversion Changes

### UK Fit Call

Public wording is:

- English: **Request a 20-minute UK Fit Call**
- Chinese: **申请 20 分钟英国市场沟通**

No Calendly, Cal.com or other real scheduling integration exists in the repository. The interface therefore makes a request and explicitly does not claim an instant booking.

Fields include name, company, role, company website, current UK stage, objective, timing, main uncertainty, email, optional additional contact and privacy consent.

### Execution Brief

Fields include name, company, objective, location, date, deliverables, channels, talent/venue/event needs, usage, approval owner, optional project link, email, optional additional contact and privacy consent.

### Payload and security review

Both forms submit JSON to the existing `/api/contact` endpoint. Payload enums, required fields and server validation align:

- Fit Call uses internal `enquiryType: "quick"` and `projectType: "other"`.
- Execution Brief uses internal `enquiryType: "full"` and `projectType: "commercial"`.
- Both use `market: "uk"` and an allowed industry value.
- Execution Brief sends the valid `production` service key.

The API retains:

- content-type enforcement
- request-size limits
- exact allowed-field validation
- origin/referer checks
- IP/fingerprint rate limiting
- honeypot validation
- minimum completion-time validation
- consent validation
- signed webhook delivery when a secret is configured
- bounded retry and timeout behaviour
- non-sensitive request IDs in success and error responses

Success and failure states are bilingual and accessible through `aria-live`. Form controls use explicit or containing labels. No file or identity-document upload was added.

The delivery system sends the validated payload to the configured signed webhook. Final notification/email formatting is an operational responsibility of that configured endpoint; it was not fabricated in the frontend.

## 6. Proof Governance

### Tier 1 — Strategic Case

Current count: **0**

Tier 1 requires objective, challenge, role, execution, outcome and business value evidence. No current record has been upgraded. Zero is an intentional truth-preserving result.

### Tier 2 — Execution Case

Current count: **5**

- CATL Open Day 2025, Munich
- BYD BD11 Double-Decker Bus Launch, London
- Changan European Brand Launch 2025, Munich
- Leapmotor at IAA Mobility 2023, Munich
- London Automotive Brand Story Film

These records are limited to confirmable context, scope, execution role, location and supported visual facts. They do not claim ROI, sales impact, reach, market impact or campaign outcome.

### Tier 3 — Capability Evidence

Current Work-record count: **4**

- European Automotive Road & Lifestyle Content
- Teal Editorial Fashion Series
- Commercial Fashion & Apparel Image Series
- Creative Beauty & Makeup Image Series

Tier 3 project surfaces do not display client fields and do not emit `CreativeWork` schema. Separate Entertainment and Technology capability-media collections remain outside Work entirely.

## 7. Truth & Claim Controls

### Market Entry

Market Entry remains an exploration, readiness and coordination problem. Professional legal, tax, compliance and regulated work is assigned to independent advisers appointed for the project. Existing hidden/coordination/partnered release modes and partnered-mode verification checks remain intact.

### Universities and institutions

The institution relationship data is currently empty. A relationship appears only when all required public wording, relationship type, approval evidence, public status and logo-use approval fields pass. No university logo wall or endorsement statement is rendered.

### Specialists

Public wording only states that Venus Bridge Media can define a dependency and coordinate appropriately qualified independent advisers appointed for a project. It does not claim a vetted, certified, fixed or official partner ecosystem.

### Europe

The core position is UK-specific. Existing European project locations can be stated as project facts, but the architecture does not claim a Europe-wide delivery or partner network.

### Entertainment and talent

Entertainment, celebrity, concert, creator and talent media remains capability evidence. It is not a public talent roster, a team directory or proof of client management.

### Case outcomes

Unknown briefs, quantities, commercial arrangements, reach, outcomes and business value are omitted. Capability Evidence cannot be promoted to a case solely because a logo, person or event appears in an image.

## 8. Routes and Navigation Changes

| Route or feature                          | Treatment                                                                     |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| `/[lang]`                                 | Rewritten around the commercial decision sequence                             |
| `/[lang]/what-we-do`                      | Kept; rewritten as the Customer Situation hub                                 |
| `/[lang]/what-we-do/create-in-the-uk`     | Kept; maps to Ready for Local Delivery                                        |
| `/[lang]/what-we-do/launch-in-the-uk`     | Kept; maps to Preparing a UK Launch                                           |
| `/[lang]/what-we-do/enter-the-uk`         | Kept; maps to Exploring the UK                                                |
| `/[lang]/what-we-do/building-uk-presence` | Added                                                                         |
| `/[lang]/services`                        | Kept; public label and page meaning are Solutions                             |
| `/[lang]/industries`                      | Canonical industry taxonomy                                                   |
| `/[lang]/industries/*`                    | Canonical industry detail routes                                              |
| `/[lang]/expertise`                       | Legacy route redirected to `/industries`                                      |
| `/[lang]/expertise/:sector`               | Legacy routes redirected to `/industries/:sector`                             |
| `/[lang]/work`                            | URL kept; public label and page meaning are Proof                             |
| `/[lang]/contact`                         | Kept; rewritten around dual conversion                                        |
| Insights                                  | Architecture allowed but public navigation, homepage and sitemap remain gated |

The redirect set contains no self-referential source/destination pair. The sitemap contains canonical commercial and industry routes, not redirect-only Expertise routes. English and Chinese locale prefixes and existing metadata alternate generation remain intact.

## 9. Validation Results

| Validation                 | Result                                    |
| -------------------------- | ----------------------------------------- |
| Prettier / `format:check`  | PASS                                      |
| ESLint                     | PASS                                      |
| TypeScript                 | PASS                                      |
| Node test suite            | PASS — 68 passed, 0 failed                |
| Next.js production build   | PASS                                      |
| Static generation          | PASS — 86 pages generated                 |
| `git diff --check`         | PASS; only repository line-ending notices |
| Runtime browser validation | UNAVAILABLE                               |

Runtime note:

> Runtime browser validation unavailable in current audit environment.

Port 3000 had no listening service. In accordance with the closeout constraint, no additional detached, background-process or repeated localhost troubleshooting was performed.

### Test-integrity review

The Phase 2 test changes updated assertions that were tied to the superseded navigation and route taxonomy. They did not remove the underlying truth controls.

The suite still verifies:

- completion, approval, media-rights, legal and evidence gates for real cases
- capability media does not enter Work or sitemap
- capability pages do not become public talent rosters
- empty institution data renders no relationship section
- institution logos require complete approval records
- unsupported university endorsement wording is absent
- partnered Market Entry fails closed without verified records
- regulated/professional work remains release-gated
- concept and unapproved work stays hidden
- public pricing and package claims are absent

Phase 2 additionally verifies:

- Tier 1 currently has zero promoted records
- Tier 3 surfaces do not read project client fields
- capability evidence does not emit project schema
- unsupported outcome language is absent from portfolio data
- Fit Call wording is a request, not a fake booking
- future products remain build-first or pilot-first
- Insights remains absent from navigation, homepage and sitemap

## 10. Remaining Commercial Dependencies

- Named product owner and operating process for the three focused product concepts
- Internal pricing and approval model before any commercial publication
- Pilot clients and pilot evidence for Launch Readiness and Localisation Review
- Complete case facts for any future Tier 1 promotion: objective, challenge, role, execution, outcome and business value
- Client/publication permissions for future cases
- At least six reviewed, useful and attributable Insights articles before opening that gate
- Complete relationship and logo-use approvals before publishing any partner or institution
- A real scheduling integration before changing “Request” to “Book”
- Confirmed production webhook destination and notification workflow

## 11. Remaining Technical Risks

1. Runtime visual and interactive browser validation could not be completed in the current audit environment. Static responsive review found no obvious fixed-width, grid-collapse, form-labelling, heading or horizontal-overflow issue in the Phase 2 components.
2. Contact delivery depends on production configuration for `CONTACT_WEBHOOK_URL`, allowed origins, the optional signing secret and notification destination. The code fails closed when delivery is not configured, but a live provider round trip requires those operational secrets.
3. The repository contains a large pre-existing multi-phase dirty working tree. `git diff --check` is clean, but release management should commit or otherwise isolate the intended multi-phase source state before deployment.

No critical application-code issue remains from the Phase 2 closeout review.

## 12. Ready for Production?

**YES WITH GATED FEATURES**

The implemented and public parts are release-ready at code level. The following remain intentionally gated:

- Insights
- mature claims for the three focused product concepts
- Tier 1 strategic cases
- unverified partner or institution relationships
- unverified team members
- any booking wording that would require a real scheduling integration

Browser validation being unavailable does not change the production-build result. Production deployment still requires the normal environment, contact-delivery and release-confirmation configuration.
