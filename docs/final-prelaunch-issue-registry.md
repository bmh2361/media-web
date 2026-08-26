# Venus Bridge final pre-launch issue registry

Audit date: 24 August 2026  
Scope: current repository and production build, English and Chinese canonical routes  
Decision rule: fix the smallest set of issues that materially affects truth, trust, conversion or release safety.

## Counts and decision

| Severity | Count | Release implication |
|---|---:|---|
| P0 | 5 | Must be closed before public release. |
| P1 | 4 | Selected P1s should be closed before active outbound; proof gaps require future real evidence. |
| P2 | 7 | Important polish; none justifies delaying release alone. |
| P3 | 5 | Monitor or leave alone. |

Recommended verdict: **RELEASE AFTER P0 + SELECTED P1**. The selected pre-outbound P1s are analytics and a visible contact fallback/response expectation. P1 proof gaps cannot be solved honestly with more copy and should become a content-acquisition programme.

## P0 — release blockers

| ID | Route / component | Persona | Problem | Evidence | Business consequence | Recommended direction | Impact / effort / risk | Owner decision | Screenshot / code |
|---|---|---|---|---|---|---|---|---|---|
| P0-01 | Global release configuration | All; search; sales | Production identity and indexing are not configured. The current build falls back to `.example` canonical/email values, `robots.txt` disallows all crawling, metadata is `noindex`, Work fails closed in production unless its mode is chosen, and Organization schema depends on the missing identity. | `validate:release:production` failed; local `robots.txt` is `Disallow: /`; Lighthouse SEO 69 only because the page is blocked from indexing; 42 sitemap URLs otherwise render. | A public deployment could be non-indexable, advertise invalid contact/domain data, hide Work, and emit incomplete structured data. | Supply and validate `RELEASE_PROFILE=production`, real HTTPS site URL, business/privacy email, explicit `PUBLIC_WORK_MODE`, contact/social URLs as approved, and all release confirmations; rebuild and inspect the public hostname. | Commercial High / User High / Small–Medium / Low. **Fix now.** | Choose the final domain, Work mode and approved public channels. | `content/company.ts`, `lib/release.ts`, `lib/seo.ts`, `app/robots.ts`, `.env.example` |
| P0-02 | `/en/privacy`, `/zh/privacy`, `/en/terms`, `/zh/terms`, footer | Procurement; legal; serious buyer | Legal hygiene is visibly unfinished. Privacy and Terms label themselves pre-release; effective dates, registered office, company number, controller details and approvals are absent from runtime configuration. The footer names Vivian Adventure Ltd but the legal pages cannot render a complete entity record. | Production validation failed the legal/company gates. Rendered legal pages display “Pre-release review version”; privacy contact falls back to `privacy@venusbridgemedia.example`. | Immediate trust and procurement failure; personal-data collection should not go live against visibly unfinished notices. | Obtain appropriate professional review; configure exact legal entity details, effective dates and approval flags; verify bilingual rendering and footer consistency. This is hygiene identification, not legal advice. | Commercial High / User High / Small / Low. **Fix now.** | Confirm the exact controller/entity, address, company number, dates and approved wording. | `en-privacy-desktop.png`, `en-terms-desktop.png`; `app/[lang]/privacy/page.tsx`, `app/[lang]/terms/page.tsx`, `lib/brand/venusBridgeMedia.ts` |
| P0-03 | `/api/contact`, `/contact` | Prospects; sales; privacy | The form implementation works, but production delivery is unconfigured: no real webhook, allowed-origin list, distributed rate limiter or live-delivery confirmation. | Updated audit harness passed 11/11 checks in EN/ZH, including real success/error states, origin rejection, honeypot, validation, provider failure and signed webhook payloads. Production release validation still fails the delivery/origin/adapter gates. | Enquiries may fail or be rate-limited inconsistently after deployment; false confidence in a locally working form could lose leads. | Configure HTTPS delivery, secret/signature verification, production origins and shared rate limiting; submit from the deployed domain and confirm receipt, retry/alerting and retention handling before setting `CONTACT_DELIVERY_VERIFIED=true`. | Commercial High / User High / Medium / Medium. **Fix now.** | Select the production workflow provider and operational owner. | `en-contact-mobile.png`; `app/api/contact/route.ts`, `lib/contact/*`, `scripts/test-contact-delivery.mjs` |
| P0-04 | Runtime dependencies | All; security | Four high-severity dependency findings remain: direct Next 15.5.20, direct Sharp 0.34.5, transitive Nanoid and PostCSS. Fixes are available. | `npm audit --omit=dev`: 4 high, 0 critical. Next advisories include DoS and SSRF fixed in 15.5.21; Sharp/libvips requires >=0.35.0; Nanoid/PostCSS fixes are available through dependency refresh. | Known public security exposure and avoidable launch risk. | Upgrade Next to at least 15.5.21 and Sharp to a patched release, refresh the lockfile, then rerun audit, unit, E2E, contact and build checks. Do not use a blind force-upgrade without regression testing. | Commercial High / User High / Small–Medium / Medium. **Fix now.** | None unless deployment constraints prevent patched versions. | `package.json`, `package-lock.json` |
| P0-05 | `/og/[lang]/[page]` social cards | Chinese buyer; sales; partner | Generated social previews contradict the current site. Non-Work cards say “Creative production, talent and UK execution”; Work is labelled “Concept Project Model / Illustrative project planning” although it now contains real approved cases; Chinese non-Work cards retain English supporting copy. Titles are raw lowercase route slugs. | Direct browser inspection of `/og/en/home`; all four sampled endpoints returned valid PNGs but obsolete content. | Links shared in WeChat, LinkedIn, email or messaging reintroduce creative-agency perception and can misstate real work as conceptual. | Align OG titles and bilingual descriptors with each page’s current metadata and real/verified Work status; visually QA Home, Companies, Work and About in both languages. | Commercial High / User High / Small / Low. **Fix now.** | Approve the final short share-card line. | `app/og/[lang]/[page]/route.tsx` |

## P1 — high commercial impact

| ID | Route / component | Persona | Problem | Evidence | Business consequence | Recommended direction | Impact / effort / risk | Owner decision | Screenshot / code |
|---|---|---|---|---|---|---|---|---|---|
| P1-01 | `/work` and 12 cases | CEO; overseas director; procurement | The case library proves real UK/European presence and strong visual delivery, but mostly proves photography/documentation rather than market validation, buyer/distributor engagement, partnership formation or commercial follow-through. | 12/12 cases are truth-gated and role-specific; most roles are documentation/content. Outcomes are usually approved images or assets; no quantified pipeline, buyer, distributor, repeat-engagement or market-decision evidence is public. | The promise is broader than the available proof. A skeptical buyer may conclude “strong photographer/event documenter” rather than “commercial operating partner.” | Do not inflate current cases. Keep ordering led by BYD/Changan/Geely/CATL/Leapmotor/AGIBOT and deliberately collect commercial evidence on future engagements. | Commercial High / User High / Large real-world effort / Low website risk. **Start after launch; monitor sales objections.** | Decide which future projects may collect/approve commercial outcomes. | `en-work-desktop.png`; `content/portfolio.ts` |
| P1-02 | Global measurement | Founder; sales; marketing | No analytics, consent-mode, event or conversion implementation is present. A lone `data-analytics` attribute is not measurement. | Repository search found no provider/init/events; no form-success, intent, case-view or CTA measurement. | Active outbound cannot distinguish good traffic from poor messaging or identify conversion leakage; optimisation remains opinion-led. | Add privacy-reviewed, low-data measurement for page/locale, audience CTA, case engagement, contact intent and confirmed form success. Never place enquiry PII in analytics. | Commercial High / User Low / Medium / Medium. **Fix before active outbound if feasible.** | Select provider, retention, consent and reporting owner. | `components/sections/ContactForm.tsx`; privacy notice |
| P1-03 | `/contact`, footer | Serious prospect | No visible response-time expectation or public fallback channel appears on Contact. On provider failure the user is only asked to retry; the footer exposes no usable business email in the audited configuration. | Rendered Contact form and source inspection. Success says only “we will respond”; failure says “Please try again.” | A high-value prospect cannot judge follow-up or recover from a failed form, creating preventable lead loss. | After production channels are approved, add a truthful response expectation and one monitored fallback business email or contact route. Do not promise a timeframe operations cannot meet. | Commercial High / User High / Small / Low. **Selected fix before outbound.** | Approve monitored channel and service level. | `en-contact-mobile.png`; `components/sections/ContactExperience.tsx`, `components/layout/Footer.tsx` |
| P1-04 | `/partners` and proof system | UK/EU partners | The partner proposition is unusually clear, but it has no partner-side proof: no named partner example, approved quote, repeat-collaboration signal or documented partner outcome. | Page explains relevance, scope, bilingual coordination and responsibility; current case library is buyer/project-led and contains no partner testimonial. | Reputable institutions/specialists may still hesitate to risk their name or time with a young intermediary. | Keep current cautious language. Acquire one approved partner-side case or quote through real delivery; do not add logo walls or implied affiliations. | Commercial Medium–High / User Medium / Large real-world effort / Low. **After launch.** | Decide consent and attribution policy for partners. | `en-partners-desktop.png`; `content/institutions.ts`, `content/collaborators.ts` |

## P2 — important polish

| ID | Route / component | Problem and evidence | Direction | Impact / effort / risk |
|---|---|---|---|---|
| P2-01 | 404 / invalid locale / unknown case | Framework-default white 404 has no Venus Bridge navigation, language or recovery link. See `en-404-mobile.png`. | Add a minimal branded bilingual recovery page in a later polish pass. | User Medium / Small / Low. **After launch.** |
| P2-02 | Global typography | CSS names Inter and Noto Sans SC but no font is imported or bundled, so rendering depends on device-installed fonts and may fall back to Arial/YaHei. | Bundle or deliberately accept a tested system stack; test Windows, macOS, Android and Chinese devices. | User Medium / Small–Medium / Medium. **After launch.** |
| P2-03 | Historical regression suite | Full E2E: 92 passed, 53 skipped, 13 failed. Twelve failures assert obsolete approved copy/visual states; one screenshot test expects a desktop row at a mobile width. Canonical release tests pass. | Update only stale test expectations/tooling after launch; keep current canonical regression coverage intact. | User Low / Small / Low. **After launch.** |
| P2-04 | Homepage mobile performance | Lighthouse mobile 93: LCP 3.2 s, CLS 0, TBT 20 ms; estimated image savings ~22 KB. Desktop performance 100. | Recompress the cited BYD mobile image/brand mark and profile LCP after real CDN deployment. Avoid redesign. | User Medium / Small / Low. **After launch or with P0 deployment QA.** |
| P2-05 | Home length / repetition | The 390 px full page is ~13,500 px. “local action/execution,” joined-up route and follow-through recur across several sections. Each section is clear, but the total asks a cold mobile visitor to read a long sales narrative. | Do not restructure pre-launch. Use analytics/session evidence to test whether “Local capability” and “Why Venus Bridge” can be tightened or merged later. | User Medium / Medium / High regression risk. **Monitor.** |
| P2-06 | `/work` filters and hero scene tabs | Contained horizontal controls extend beyond the viewport at 390/768. Document width remains correct and touch scrolling works, but later options have a weak visual affordance that more choices exist. | Add a restrained overflow cue only if usability evidence shows missed filters; do not replace the filter architecture. | User Medium / Small / Medium. **Monitor / minor polish.** |
| P2-07 | Case narrative repetition | Repeated “approved public images/assets,” role and value formulations are truth-safe but make cases feel templated when read in sequence. | Improve only when distinct facts are approved; never vary wording merely to disguise the same evidence level. | Commercial Medium / Medium / Medium. **After new evidence.** |

## P3 — optional / do not prioritise

| ID | Scope | Finding | Recommendation |
|---|---|---|---|
| P3-01 | Five legacy placeholder media records | Production media validation flags five placeholders, but release validation classifies all as noncanonical/redirected scope mismatches. | Do not delay release. Do not reactivate those routes until media and claims are revalidated. |
| P3-02 | README and internal historical docs | Several internal references retain old production/creative positioning and phase language. They are not public. | Clean only when repository handoff creates real confusion. |
| P3-03 | About globe clipping | The globe intentionally extends ~6 px beyond the desktop frame and left at tablet; document width remains exact and visuals are composed correctly. | Keep as-is. A global `overflow-x: clip` prevents page spill. |
| P3-04 | Public pricing | No pricing appears and pricing validation passes. | Do not add public pricing for variable B2B scopes. |
| P3-05 | Insights/blog | Mature benchmarks use insight libraries, but launching a thin or generic blog would lower credibility. | Add only when Venus Bridge has authoritative, maintained market knowledge and an owner. |

## Truth gate for owner review

| Claim area | Status | Current control | Owner action |
|---|---|---|---|
| Published brands/projects and media | **Verified / low risk in code**, subject to real-world approval records | Each published case is marked verified, client/legal/media-rights approved; roles avoid event ownership and measured-outcome claims. | Reconfirm `PUBLIC_CASE_EVIDENCE_CONFIRMED` and preserve approval records. |
| Vivian Adventure Ltd trading-name statement | **Requires owner confirmation** | Hard-coded in footer/brand and About. | Match exactly to registry/legal review and configured legal details. |
| Team titles, biographies, degrees and prior-company/programme references | **Requires owner confirmation** | Profiles are `public` and `approved`; prior work is attributed as background, not Venus Bridge work. | Retain supporting records and individual approval; confirm title/employment status before release. |
| Royal Academy of Engineering GTV wording | **Requires owner confirmation** | Attributed to the supplied record in Dr. Minghan Bao’s biography. | Confirm the exact programme/recipient wording. |
| Huawei Seeds for the Future | **Low–medium risk, carefully qualified** | Explicitly states programme participation, not employment. | Keep only with participant approval/evidence. |
| Cities on globe | **Verified as geography, not offices** | Text describes project reach/context; only London is framed as delivery centre. | Keep semantics; do not add office language without premises. |
| Universities, researchers, experts and institutions | **Ambiguous if inferred as formal partnerships** | Current canonical pages use capability categories, project-fit language and no logo wall. | Confirm every named future relationship; do not imply endorsement/access. |
| Buyer/distributor/partner engagement capability | **Capability claim; proof incomplete** | Framed as a service/buying situation, not a guaranteed result. | Do not add outcomes until a real engagement can be published. |
| Quantified outcomes, pipeline, revenue, meetings or reach | **Not claimed** | Case guardrails explicitly avoid unsupported metrics. | Keep absent until evidence exists. |

## Defensive microcopy classification

| Instance | Class | Decision |
|---|---|---|
| Terms: site content is not a proposal, guarantee, endorsement or binding agreement | A — legally/professionally necessary | Keep after review. |
| Privacy: do not submit sensitive/confidential material | A | Keep; align with live data flow. |
| Case role limitation: documentation does not imply event ownership, wider strategy or measured outcomes | A/B — truth necessary; repeated because every case must stand alone | Keep. If later shortened, preserve the same boundary through structured “verified role / not claimed” semantics. |
| Huawei programme is not employment | B — truth necessary and appropriately placed in biography | Keep while that credential remains public. |
| Dormant capability pages’ repeated non-partnership/talent/endorsement notes | C on canonical journey because routes redirect; A/B if ever reactivated | Do not spend time now; re-audit before reactivation. |

## Highest-ROI closure order

1. Configure real production identity, legal details and release profile.
2. Patch vulnerable dependencies and rerun the complete gate.
3. Configure and live-test contact delivery, origins and shared rate limiting.
4. Correct all bilingual social preview cards.
5. Add a monitored fallback and truthful response expectation.
6. Add privacy-reviewed conversion measurement.
7. Begin evidence acquisition for commercial and partner outcomes; do not rewrite current truth-safe cases.

