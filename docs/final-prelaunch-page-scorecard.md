# Venus Bridge final pre-launch page scorecard

Scores are 0–10 and reflect the current rendered site, not an ideal future business. “Recommended narrative” is audit guidance only; no implementation is authorised.

## Route inventory and indexing matrix

| Route group | Count | Runtime result | Indexing decision | Audit conclusion |
|---|---:|---|---|---|
| `/en`, `/zh` Home | 2 | 200 | Canonical | Keep. |
| Companies, Partners, Work, How We Work, About, Contact, Privacy, Terms | 16 | 200 | Canonical | Keep; legal/contact have P0 configuration gates. |
| Published case details | 24 (12 × 2) | 200 | Canonical | All render; all carry one H1, metadata and verified-role boundaries. |
| Root `/` | 1 | Redirects to `/en` | No separate index | Correct. |
| Capability/service/industry/expertise/talent/agency legacy families | 2-language route families | Permanent redirects, principally to Companies | Excluded from sitemap | Correct consolidation; avoid restoring duplicate IA. |
| Retired speculative Work slugs | 2-language route family | Permanent redirects to Companies/Work | Excluded | Correct truth boundary. |
| `/[lang]/media-review` | 2 | Fail-closed 404 unless explicitly enabled outside production | Noindex | Correct internal-tool protection. |
| Invalid locale `/fr` | 1 sampled | 404 | Noindex | Correct, but generic 404 is weak. |
| Unknown case | 1 sampled | 404 | Noindex | Correct, but generic 404 is weak. |
| `/robots.txt` | 1 | 200; currently `Disallow: /` | Must change only with production profile | P0 configuration blocker. |
| `/sitemap.xml` | 1 | 200; 42 canonical URLs | Publish when release profile/work mode are final | Structurally correct. |

No broken canonical links, orphan canonical pages or duplicate canonical journeys were found. Source pages that remain in the build are neutralised by permanent redirects or release gates.

## Major page scorecard

| Page | Purpose | Commercial clarity | Visual | Conversion | Trust | Mobile | Overall | Classification |
|---|---|---:|---:|---:|---:|---:|---:|---|
| Home | Establish ICP, outcome, proof and routes | 9.0 | 9.2 | 8.6 | 8.0 | 8.7 | **8.7** | Keep architecture; minor polish only after data. |
| For Companies | Sell the buyer situations and delivery model | 9.1 | 8.8 | 8.8 | 8.0 | 8.8 | **8.7** | Keep as primary outbound landing page. |
| For Partners | Explain relevance, role and coordination | 8.6 | 8.7 | 8.4 | 7.2 | 8.7 | **8.3** | Keep; future partner proof needed. |
| Case Studies index | Prove real market activity and verified roles | 7.8 | 9.1 | 8.1 | 8.4 | 8.5 | **8.4** | Keep ordering/filter system. |
| Case details (average) | Context, verified role, delivery and outputs | 7.2 | 8.8 | 7.7 | 8.5 | 8.8 | **8.2** | Keep truth architecture; acquire better outcomes. |
| How We Work | Reduce execution/process uncertainty | 8.8 | 8.6 | 8.4 | 8.5 | 8.7 | **8.6** | Keep as sales follow-up asset. |
| About | Explain model, reach, disciplines and people | 8.7 | 9.1 | 8.0 | 8.6 | 8.8 | **8.7** | Keep; verify credentials/release confirmations. |
| Contact | Qualify three intent types and submit | 8.5 | 8.3 | 7.0 | 6.2 | 8.7 | **7.6** | Implementation good; production configuration/fallback required. |
| Privacy | Explain enquiry data use | 5.0 | 7.7 | n/a | 2.5 | 8.5 | **5.2** | P0 legal configuration/review. |
| Terms | Bound website claims and project scope | 5.5 | 7.7 | n/a | 3.0 | 8.5 | **5.5** | P0 legal configuration/review. |
| 404 | Recover invalid navigation | 2.0 | 2.0 | 1.0 | 3.0 | 5.0 | **2.6** | P2 branded recovery later. |

## Page-by-page audit

### Home

- **Purpose:** answer who, what, when, why, proof and next step for a cold Chinese B2B buyer while preserving a partner route.
- **Strengths:** the first viewport names UK/Europe, Chinese companies, local judgement/execution and the “before full local team” value; real project proof appears immediately after the hero; buying situations are unusually recognisable; primary and secondary CTAs are distinct.
- **Weaknesses:** proof is visually strong but commercially narrower than the promise; the mobile page is long; current OG sharing destroys the on-page positioning.
- **P0:** social preview and global release configuration.
- **P1:** proof gap and analytics.
- **P2:** evidence-led length optimisation only after behavioural data.
- **Freeze:** hero positioning/CTA hierarchy, early proof order, buying-situation section, four-route model, final CTA.
- **Next action:** fix off-page release/share layers; do not rewrite the hero again.

### For Companies

- **Purpose:** sell to founders, overseas leaders and lean Europe/UK teams.
- **Strengths:** explicitly covers validation, buyers, distributors, launches, exhibitions, local credibility and small-team capacity; moves from triggers to action, benefits and an exhibition example; strong page to send after outreach.
- **Weaknesses:** commercial proof below the claims is still inherited from the photography-heavy case library; procurement still needs a scoped proposal rather than relying on the site.
- **P0:** none page-specific beyond global gates.
- **P1:** future commercial evidence.
- **P2:** none requiring launch delay.
- **Freeze:** hero, “when the opportunity needs to move,” benefit trio, exhibition-before/during/after narrative, CTA.
- **Next action:** use in outbound and record objections; do not add a service catalogue.

### For Partners

- **Purpose:** attract relevant UK/EU institutions and specialists without making Venus Bridge look like a broker.
- **Strengths:** commercial context precedes categories; value is clear (relevant opportunities, scope, bilingual coordination, one interface); responsibilities remain project-specific; no university-logo theatre or implied endorsement.
- **Weaknesses:** there is no partner-side evidence or quote; “opportunity” remains theoretical for a skeptical high-reputation organisation.
- **P0:** none page-specific.
- **P1:** future approved partner proof.
- **P2:** none; avoid adding defensive disclaimers unless a real ambiguity appears.
- **Freeze:** hero framing, categories-after-goal order, value section, project-flow explanation, partner-intent CTA.
- **Next action:** collect one real partner outcome; do not create a generic partner directory.

### Case Studies index

- **Purpose:** convert claims into verified real work.
- **Strengths:** leading automotive/technology cases establish serious contexts; filters use commercial situations rather than arbitrary creative disciplines; titles, geography, year, client/public status and roles are clear; mobile cards are readable.
- **Weaknesses:** later concert/fashion/beauty work increases photography-company perception; offscreen filter choices have a weak continuation cue; the preview/list structure creates one duplicated BYD H2 in rendered semantics.
- **P0:** social preview falsely calls Work conceptual.
- **P1:** portfolio evidence mix.
- **P2:** filter affordance and repeated narrative formula.
- **Freeze:** ordering, real-only publication gate, commercial filters, desktop preview/mobile card switch.
- **Next action:** keep current archive; future commercial cases should displace—not cosmetically relabel—the weaker perception drivers.

### How We Work

- **Purpose:** explain ownership from goal through local action and follow-through.
- **Strengths:** commercially sequenced rather than an internal agency process; five stages answer before/on-ground/after; makes the “one local team” distinction explicit; supports discovery/proposal conversations.
- **Weaknesses:** some language overlaps Home (“goal,” “local action,” “follow-through”), but here it is definitive and appropriate.
- **P0/P1:** none page-specific.
- **P2:** do not shorten without evidence of abandonment.
- **Freeze:** entire stage model and goal-determines-capability section.
- **Next action:** use as a sales-enablement link.

### About

- **Purpose:** make the operating model and people believable.
- **Strengths:** strongest pure design page; clear origin/reach story; globe is semantically backed by SVG/text and reduced-motion fallback; five named, responsibility-led profiles; roles expand accessibly; distinguishes core direction from project specialist capability.
- **Weaknesses:** strong credentials require owner records; some prospects may still ask about employment status/team size, which is better handled in conversation than with defensive copy.
- **P0:** global identity/legal confirmation.
- **P1:** none if credentials are confirmed.
- **P2:** none; do not add office markers or logo walls.
- **Freeze:** hero, “Why we exist,” globe composition, five-discipline system, responsibility-led team cards, specialist-depth and continuity sections.
- **Next action:** confirm every title/biography/media approval and leave the design alone.

### Contact

- **Purpose:** qualify company, partner and other enquiries while preserving a real success state.
- **Strengths:** serious prospects know what to share; intent tabs are clear; required fields are proportionate for B2B; consent is explicit; labels/touch sizes/mobile layout pass; server-side validation, origin, honeypot, rate limiting and signed webhook exist; UI never shows fake success.
- **Weaknesses:** production transport is not configured; no response expectation or fallback channel; Organisation is API-optional in a legacy quick-path audit but required in the current company UI, a deliberate qualification choice.
- **P0:** delivery/configuration.
- **P1:** fallback and response expectation.
- **P2:** none before operational decisions.
- **Freeze:** intent segmentation, field order, consent, real success/error semantics.
- **Next action:** configure, submit live, verify receipt and add approved fallback/SLA.

### Privacy and Terms

- **Purpose:** minimum professional/legal hygiene.
- **Strengths:** concise, bilingual, readable and appropriately avoids overpromising; consent purpose aligns broadly with enquiry handling.
- **Weaknesses:** explicitly pre-release, incomplete identity/dates/contact; not ready for public data collection.
- **P0:** complete and professionally review configuration/writing.
- **Freeze:** visual simplicity; do not turn into marketing pages.

### 404

- **Purpose:** recover invalid routes.
- **Strengths:** correct HTTP 404.
- **Weaknesses:** default Next page, English-only, no header, recovery or brand.
- **P2:** create a minimal branded recovery route later.

## Homepage section map

| Current section | Purpose / persona | Actual message | Clarity | Importance | Visual | Decision | Reason |
|---|---|---|---:|---|---:|---|---|
| Hero | Cold Chinese CEO/CMO | Move UK/Europe ambition forward locally with one China-aware delivery team | 9.4 | Critical | 9.2 | **Keep** | Primary question is answered in one viewport. |
| Real projects | Skeptical buyer | Work exists in recognisable UK/EU brand settings; roles are visible | 8.5 | Critical | 9.3 | **Keep** | Proof appears early and corrects consultancy abstraction. |
| When companies bring us in | Buyer recognition | Five concrete triggers, including small local team | 9.3 | Critical | 8.5 | **Keep** | Best sales-recognition section. |
| Four routes | Buyer/scoper | Validation, relationships, live activity and lasting assets | 8.7 | High | 8.7 | **Keep** | Compresses breadth without a service catalogue. |
| Local capability | Lean Europe/UK leader | Delivery layer before full local hiring | 9.1 | High | 8.6 | **Keep** | Core differentiator. |
| Partner proposition card | UK/EU partner | Relevant, contextualised opportunities and one interface | 8.5 | Medium | 8.8 | **Keep** | Enables second audience without stealing hero priority. |
| Capability around goal | Buyer/procurement | Expertise is assembled around the project | 8.0 | Medium | 8.2 | **Minor polish only** | Useful scope signal; similar concept recurs elsewhere. |
| Exhibition to pipeline | Exhibition buyer | Value should exist before, during and after the moment | 9.0 | High | 8.6 | **Keep** | Strong trigger-to-continuity story. |
| Why Venus Bridge | Buyer/procurement | One joined-up route reduces complexity and preserves continuity | 8.5 | High | 8.4 | **Monitor** | Valuable, but partially repeats Local capability. Use analytics before merging. |
| Value that continues | Skeptical buyer | Relationships, learning and approved content remain useful | 8.2 | Medium | 8.2 | **Minor polish only** | Truth-safe, but evidence is not yet commercial. |
| Final CTA | Qualified buyer/partner | State what needs to happen; choose company or organisation path | 9.0 | Critical | 9.0 | **Keep** | Clear and appropriately low-friction. |

No homepage section currently merits “remove” or “needs restructure.” The only plausible later merge is Local capability + Why Venus Bridge, contingent on real usage data.

## Current vs recommended narrative by main page

| Page | Current narrative | Recommended narrative |
|---|---|---|
| Home | Proposition → real proof → recognition → routes → delivery layer/partner route → expertise → exhibition continuity → differentiation → CTA | **Keep current.** Consider one evidence-led compression only after analytics. |
| Companies | Market-entry proposition → triggers → assembled actions → benefits → exhibition continuity → CTA | **Keep current.** Future cases should be linked contextually when commercial proof exists. |
| Partners | Partner opportunity → who fits → partner value → coordination flow → CTA | **Keep current.** Insert one approved proof item later, not more categories. |
| Work | Real-project proposition → commercial filter → ordered archive → detail narratives | **Keep current.** Let future higher-value cases change the mix organically. |
| How We Work | Goal → accountable team → five stages → after-value → capability → CTA | **Keep current.** This is the definitive process explanation. |
| About | Team proposition → why/local purpose → geographic bridge → disciplines → people → specialist depth → continuity → CTA | **Keep current.** No restructure. |
| Contact | Context → what to share → intent → qualified form → status | Add operational response/fallback information after configuration; keep form architecture. |

## Case-by-case commercial and visual audit

Photography-agency risk is scored 10 = strongest unwanted perception.

| Case | Industry / geography | Apparent objective | Role clarity | Commercial relevance | Proof | Image / crop | Narrative | Outcome | Photo risk | Classification / recommendation |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| BYD BD11 Double-Decker Bus Launch | Automotive / London | Establish UK launch presence | 9 | 8.5 | 8.5 | 9.2 / 9.0 | 8.3 | 6.5 | 4 | **Hero B2B. Keep first.** Strong UK/product/audience context; collect post-launch use/outcome if approvable. |
| Changan European Brand Launch 2025 | Automotive / Munich | European launch visibility | 9 | 8.4 | 8.3 | 9.1 / 9.0 | 8.2 | 6.3 | 4 | **Hero B2B.** Strong stage, vehicles and guests. |
| Geely London Brand Launch 2025 | Automotive / London | UK market-presence evidence | 9 | 8.3 | 8.3 | 8.8 / 8.8 | 8.2 | 6.3 | 4 | **Hero B2B.** Recognisable product/presentation context. |
| CATL Open Day 2025 | Automotive/energy / Munich | Professional stakeholder communications | 9 | 8.2 | 8.2 | 8.8 / 8.8 | 8.2 | 6.2 | 4 | **Hero/supporting B2B.** Good industry credibility; commercial follow-through absent. |
| Leapmotor at IAA Mobility 2023 | Automotive / Munich | European exhibition presence | 9 | 8.0 | 8.2 | 9.0 / 8.8 | 8.0 | 6.2 | 4 | **Strong supporting.** Best exhibition trigger proof. |
| AGIBOT London Launch | Robotics / London | London product-launch evidence | 9 | 8.3 | 8.1 | 8.5 / 8.4 | 8.0 | 6.0 | 4 | **Strong supporting.** Valuable technology/robotics relevance. |
| London Automotive Brand Film | Automotive / UK | Localised international brand imagery | 8.5 | 8.4 | 7.8 | 9.0 / 8.8 | 8.2 | 6.5 | 5 | **Hero/supporting.** Broader coordination/production role, but outcome still assets. |
| European Automotive Asset Programme | Automotive / Europe | European road/lifestyle asset programme | 8.0 | 6.8 | 7.0 | 9.1 / 8.9 | 7.5 | 5.8 | 7 | **Strong creative support.** Do not promote above real launch/exhibition cases. |
| Wang Linkai London Concert 2026 | Entertainment / London | Reusable live-performance record | 9.0 | 5.5 | 7.7 | 8.8 / 8.7 | 7.8 | 5.8 | 8 | **Creative credibility.** Keep lower in archive. |
| Yue Yunpeng London Live 2025 | Entertainment / London | Concise two-image performance record | 9.0 | 4.8 | 7.0 | 7.8 / 7.8 | 7.2 | 5.0 | 9 | **Weak commercial support.** Deprioritise naturally as new cases arrive. |
| London Fashion Week 2025 | Fashion / London | Editorial fashion evidence | 8.8 | 4.8 | 6.8 | 8.4 / 8.2 | 7.2 | 5.0 | 9 | **Creative credibility.** Keep below B2B cases. |
| Selected Beauty & Fashion Brand Content | Beauty/fashion / UK | Demonstrate content formats | 8.5 | 4.3 | 6.5 | 8.7 / 8.5 | 7.0 | 4.8 | 10 | **Creative credibility.** Useful for relevant prospects, not a corporate lead case. |

### Case image audit

- All published case images loaded successfully; no missing alt attributes, broken images, visible crop failures or document overflow were found across 24 case URLs at 390/768/1440.
- Art direction supplies WebP, AVIF, mobile and thumbnail variants with responsive `sizes`; case heroes use natural/contained treatment where crop safety is uncertain.
- The largest active portfolio files are still modest (examples: `geely-london-brand-launch/01-hero.webp` ~172 KB; `european-road-lifestyle/05-gallery.webp` ~185 KB). The largest 243 KB `teal-editorial-series/03-gallery.webp` belongs to a retired/noncanonical collection.
- The principal media problem is strategic balance, not technical image quality: automotive/event imagery communicates real international activity; concert/fashion/beauty imagery increases creative/photography perception when encountered in sequence.
- Exact public paths are recorded in `content/portfolio-media.generated.json`; no individual active file requires pre-launch replacement.

## Responsive evidence

- Independent audit: 126 results (42 canonical URLs × 390/768/1440), 0 failures, 0 broken images, 0 serious/critical accessibility findings, 0 metadata-structure failures.
- Existing regression coverage additionally exercised 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 depending on page/spec.
- 36 lazy-load-complete major-page captures: `audit/final-prelaunch/{en|zh}-{page}-{mobile|desktop}.png`.
- Contained horizontal controls and the clipped About globe do not widen the document; they are composition/interaction choices, not broken responsive layout.

