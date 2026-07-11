# FrameBridge Studio Repository Audit

Audit date: 2026-07-11  
Scope: read-only code, repository, command, and attempted local-browser audit. The only file created during this audit is this report. No source, configuration, dependency manifest, or content file was modified.

## A. Executive Summary

**Launch readiness: not ready for a public marketing launch.**

The application has a structured bilingual App Router layout, typed case records, a centralized media registry, a contact route with basic validation, and a CI workflow that uses `npm ci`. The strongest implementation evidence is the explicit concept-case disclosure model and the source-level use of locale-aware route helpers.

The weakest areas are material: every live visual slot currently resolves to a local abstract placeholder, all six case studies are explicitly illustrative concepts, the Events responsibility matrix is generated from list position rather than factual responsibility data, and the test suite does not include E2E, responsive, browser, or accessibility coverage. The public Terms page itself says it requires company/legal review.

**Overall risk: High.** The site should not launch as a finished media-production marketing website until real approved media and case evidence are supplied, the factual responsibility matrix is replaced, and legal/business approval has occurred. Browser route, accessibility, and responsive verification could not be completed because `npm ci` failed with an OS lock and left the local dependency toolchain incomplete.

## B. Command Results

| Command                       | Status / exit code           | Warnings / errors                                                                            | Notes                                                                                                                                                                            |
| ----------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`                      | Failed / 1 (twice)           | `EPERM -4048` unlinking `node_modules/@next/swc-win32-x64-msvc/next-swc.win32-x64-msvc.node` | A process owning PID 6292 remained listening on port 3000. The install partially removed local binaries. This is an environment limitation, not evidence of a lockfile mismatch. |
| `npm run format:check`        | Failed / 1                   | `prettier` not recognized after failed install                                               | Not a source-format result for the current audit environment.                                                                                                                    |
| `npm run lint`                | Failed / 1                   | `eslint` not recognized after failed install                                                 | Not a source-lint result for the current audit environment.                                                                                                                      |
| `npx tsc --noEmit`            | Blocked / no final exit code | `npx` requested installation of unrelated `tsc@2.0.4`; request was cancelled                 | Local TypeScript binary was unavailable after failed install. It was not replaced during audit.                                                                                  |
| `npm run validate:content`    | Passed / 0                   | None                                                                                         | Reported 6 cases, 24 independent case-media IDs, and local placeholder files present. It does not validate real assets or every registry reference.                              |
| `npm test`                    | Passed / 0                   | None                                                                                         | 3 Node source-text contract tests passed. No skipped tests reported.                                                                                                             |
| `npm run test:e2e`            | Failed / 1                   | Missing script `test:e2e`                                                                    | No Playwright/E2E configuration was found.                                                                                                                                       |
| `npm run build`               | Failed / 1                   | `next` not recognized after failed install                                                   | No current-audit production build result is available. A prior build artifact existed but cannot prove the current working tree.                                                 |
| `npm audit --audit-level=low` | Failed / 1                   | 2 moderate vulnerabilities: transitive `postcss <8.5.10` under `next`                        | `npm audit fix --force` proposes a breaking downgrade to `next@9.3.3`; no remediation was performed.                                                                             |

### Browser and environment limitations

- Opening `http://localhost:3000/en` returned HTTP 500 with a Next/Jest-worker process exception after the partial install. No page HTML or screenshot was accepted as audit evidence.
- PID 6292 was still listening on port 3000. Its owner was not terminated because it was outside this audit's controlled terminal.
- Consequently, HTTP route status, generated HTML lang/H1/main counts, desktop/mobile interaction, axe, Lighthouse, screenshots, 200% zoom, and actual horizontal-overflow checks are **Requires browser verification**, not passes.

## C. Launch Blockers

| ID          | Confirmed P0 blocker                                                                                                                              | Evidence                                                                                                                            | Required release decision                                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CONTENT-001 | The live media registry points all case and newly designed page slots to abstract placeholder SVGs, while every case is `concept`/`illustrative`. | [content/media.ts](content/media.ts), [content/cases/index.ts](content/cases/index.ts), and the only public media assets inventory. | Supply rights-cleared, approved real visuals and confirm which real/anonymised cases may be shown before presenting the site as a production portfolio. |

## D. Severity-Ranked Findings

### CONTENT-001

**Severity:** P0 - launch blocker  
**Confidence:** Confirmed  
**Category:** Content integrity / media  
**Location:** [content/media.ts](content/media.ts), [content/cases/index.ts](content/cases/index.ts), [public/media/placeholders](public/media/placeholders)  
**Evidence:** All six records are constructed with `status: "concept"` and `disclosureLevel: "illustrative"`; their `heroMediaId` and `mediaIds` map to the five local placeholder SVGs. Production, Talent, Research, Events, Agency, and homepage slots also use the same placeholders. The public asset inventory contains five placeholder SVGs plus only `framebridge-og.jpg` and unused `framebridge-hero.png`.  
**Impact:** A visitor cannot inspect actual FrameBridge work; a media company portfolio appears unfinished. This fails the requested media-led page experience regardless of the accurate concept label.  
**How to reproduce:** Inspect any registry `src`, or render any page once dependencies are restored; MediaSlot resolves to `/media/placeholders/*.svg`.  
**Recommended fix:** Obtain company-approved, rights-cleared image/video assets; map every active slot to a real source; keep concept labels only for cases that remain hypothetical; add release validation that rejects placeholders in production.  
**Launch blocking:** Yes.

### UX-001

**Severity:** P1 - serious issue  
**Confidence:** Confirmed  
**Category:** Business information accuracy  
**Location:** [components/sections/experiences/EventsExhibitionsExperience.tsx](components/sections/experiences/EventsExhibitionsExperience.tsx), responsibility matrix section  
**Evidence:** The matrix emits `R`, `A`, `C`, `R` for every deliverable and varies the FrameBridge value only with `index % 2`. It has no underlying responsibility data, no legend, and no required `Speaker or partner` column.  
**Impact:** It can communicate invented obligations to prospects and does not meet the required responsibility-matrix specification.  
**How to reproduce:** Read the matrix loop; changing the order of `copy.deliverables` changes stated accountability.  
**Recommended fix:** Model responsibility per row in typed content; render a legend and all five required responsibility parties; use a mobile card/accordion representation after browser testing.  
**Launch blocking:** No, but must be resolved before sales use of the Events page.

### FORM-001

**Severity:** P1 - serious issue  
**Confidence:** Confirmed  
**Category:** Accessibility / form  
**Location:** [components/sections/ContactForm.tsx](components/sections/ContactForm.tsx), `F` helper and input fields  
**Evidence:** Fields set `aria-invalid`, and `F` creates `id="${id}-error"`, but the name, company, email, market, and summary controls do not set matching `aria-describedby`. Only consent explicitly sets it.  
**Impact:** Screen-reader users are not programmatically associated with the field-level error after server validation.  
**How to reproduce:** Submit invalid form data, then inspect accessibility tree for `#email` or `#summary`; the error element is not in its described-by relation.  
**Recommended fix:** Add `aria-describedby={error ? `${id}-error` : undefined}` to every field through the shared field helper or a field-props pattern, and rerun axe/manual screen-reader testing.  
**Launch blocking:** No.

### FORM-002

**Severity:** P1 - serious issue  
**Confidence:** Confirmed  
**Category:** Contact routing  
**Location:** [app/[lang]/work/[slug]/page.tsx](app/[lang]/work/[slug]/page.tsx), case CTA; [components/sections/ContactForm.tsx](components/sections/ContactForm.tsx), initial project coercion  
**Evidence:** The AI case's first pillar is `technology-content`. The case CTA serializes it as `?project=technology-content`; `ContactForm` accepts only `commercial|video|talent|research|events|agency|other` and silently defaults unknown values to `commercial`.  
**Impact:** The “Plan a Similar Project” CTA for the AI case opens the wrong preselected form type.  
**How to reproduce:** Navigate to `/en/work/ai-product-video-uk-market`, follow the CTA, and inspect the select's selected option after runtime restoration. Source-level path proves the mismatch.  
**Recommended fix:** Use an explicit case-pillar-to-contact-project mapping and test each preselection route.  
**Launch blocking:** No.

### SEC-001

**Severity:** P1 - serious issue  
**Confidence:** Confirmed  
**Category:** Contact API security  
**Location:** [app/api/contact/route.ts](app/api/contact/route.ts), origin branch; [lib/contact/rate-limit.ts](lib/contact/rate-limit.ts)  
**Evidence:** Origin/referer enforcement runs only when `NEXT_PUBLIC_SITE_URL` is set. If it is missing, all origins proceed. Rate limiting uses a process-local `Map`; the source comment states it is best effort in serverless deployments.  
**Impact:** A production deployment missing one environment variable has no origin check, and multi-instance/serverless traffic can bypass the intended global 5-per-10-minute limit.  
**How to reproduce:** Read the `if (expected && ...)` condition and deploy multiple instances; each instance gets an independent store. Do not send live test submissions.  
**Recommended fix:** Treat absent public origin as a server configuration error, validate `Content-Type`, and use durable/shared rate-limit storage or document the reduced protection clearly.  
**Launch blocking:** No, but high priority before exposing the contact endpoint.

### LEGAL-001

**Severity:** P1 - serious issue  
**Confidence:** Requires legal review  
**Category:** Legal content  
**Location:** [app/[lang]/privacy/page.tsx](app/[lang]/privacy/page.tsx) and [app/[lang]/terms/page.tsx](app/[lang]/terms/page.tsx)  
**Evidence:** Privacy source comments that it requires legal review against final controller, processor, and retention arrangements. Terms publicly states: “This is launch-readiness text and requires review by the company or its legal adviser.” No retention period, controller identity, processor details, or final contact-rights workflow is specified.  
**Impact:** Public legal notices are knowingly provisional and may not reflect the actual webhook processor or data-handling arrangement.  
**How to reproduce:** Read both pages/source; compare to the configured eventual webhook and company legal information.  
**Recommended fix:** Obtain company/legal approval, replace provisional public wording with final approved notices, and align disclosures to real processor, retention, and cross-border-transfer facts.  
**Launch blocking:** Requires legal release approval.

### TEST-001

**Severity:** P1 - serious issue  
**Confidence:** Confirmed  
**Category:** Test coverage / CI  
**Location:** [package.json](package.json), [tests/content-contract.test.mjs](tests/content-contract.test.mjs), [.github/workflows/ci.yml](.github/workflows/ci.yml)  
**Evidence:** `npm run test:e2e` does not exist. The only test command runs three source-text tests. CI has no E2E, responsive, route smoke, browser, or accessibility job.  
**Impact:** Required interactions including language switching, mobile menu, work filters, contact validation, reduced motion, no overflow, and actual routes can regress undetected.  
**How to reproduce:** Run `npm run test:e2e`; npm reports Missing script. Inspect CI steps.  
**Recommended fix:** Add browser tests and automated accessibility checks in a future implementation; do not treat source-text tests as UI verification.  
**Launch blocking:** No, but all browser checks remain unverified.

### I18N-001

**Severity:** P2 - material improvement  
**Confidence:** Confirmed  
**Category:** Internationalisation  
**Location:** [components/sections/experiences/CommercialProductionExperience.tsx](components/sections/experiences/CommercialProductionExperience.tsx), deliverable wall  
**Evidence:** The deliverable array is hardcoded in English: `Hero stills`, `Vertical 9:16`, `Portrait 4:5`, `Landscape 16:9`, `Interview cutdowns`, `Social clips`, regardless of `language`.  
**Impact:** `/zh/services/commercial-production` contains a prominent untranslated content block, conflicting with the bilingual product requirement.  
**How to reproduce:** Render the Chinese route after dependencies are restored or inspect the unconditional string array.  
**Recommended fix:** Move these labels into typed localized content.  
**Launch blocking:** No.

### SEO-001

**Severity:** P2 - material improvement  
**Confidence:** Confirmed  
**Category:** SEO / social  
**Location:** [lib/seo.ts](lib/seo.ts), [public/images/framebridge-og.jpg](public/images/framebridge-og.jpg)  
**Evidence:** All metadata calls use a single hardcoded `/images/framebridge-og.jpg`; source has no page-level OG mapping. The 1200x630 file exists, but it is the same for every route.  
**Impact:** Shared service, work, and case links cannot show relevant media despite the requested per-page OG mapping.  
**How to reproduce:** Inspect `buildMetadata`; it does not accept an OG media argument.  
**Recommended fix:** Map approved per-page OG media in content or generate approved image responses; retain 1200x630 dimension validation.  
**Launch blocking:** No.

### SEO-002

**Severity:** P2 - material improvement  
**Confidence:** Confirmed  
**Category:** Structured data / navigation  
**Location:** [lib/structured-data.ts](lib/structured-data.ts), [components/sections/experiences/ServicePageShell.tsx](components/sections/experiences/ServicePageShell.tsx)  
**Evidence:** Visual service breadcrumbs exist, but structured data exports only Organization/ProfessionalService and Service. There is no `BreadcrumbList` generator or use.  
**Impact:** The required JSON-LD breadcrumbs are absent for service and case pages.  
**How to reproduce:** Search schema types and `JsonLd` uses; no `BreadcrumbList` occurs.  
**Recommended fix:** Add typed breadcrumb schema from the same route data as visual breadcrumbs.  
**Launch blocking:** No.

### UX-002

**Severity:** P2 - material improvement  
**Confidence:** Confirmed  
**Category:** Page differentiation  
**Location:** [app/[lang]/industries/page.tsx](app/[lang]/industries/page.tsx)  
**Evidence:** All six industries map through one identical `section` template with four text cells and generic links; no industry-specific media/layout component is selected.  
**Impact:** The stated Fashion/Technology/Automotive/Research/Entertainment/Consumer differentiated layouts are not implemented.  
**How to reproduce:** Inspect the single `c.groups.map` branch.  
**Recommended fix:** Implement page-specific variants from structured industry content, with a shared mobile vertical fallback.  
**Launch blocking:** No.

### MEDIA-001

**Severity:** P2 - material improvement  
**Confidence:** Confirmed  
**Category:** Media validation / accessibility  
**Location:** [scripts/validate-content.mjs](scripts/validate-content.mjs), [components/media/MediaSlot.tsx](components/media/MediaSlot.tsx)  
**Evidence:** Validator uses regexes and only checks five placeholder files, case count/status text, existence of the type text, and occurrence of `alt:`. It does not enumerate registry IDs, validate every case reference, inspect actual dimensions, reject production placeholders, or validate nonempty localized alt text. `MediaSlot` replaces errors with a labelled gradient `div`, with no diagnostic signal.  
**Impact:** A missing/incorrect future real asset can deploy without a meaningful validation failure or operational signal.  
**How to reproduce:** Read validator conditions and MediaSlot `onError`.  
**Recommended fix:** Add registry-driven validation and a production placeholder prohibition; preserve a user-safe fallback while emitting monitored diagnostics.  
**Launch blocking:** No.

### A11Y-001

**Severity:** P2 - material improvement  
**Confidence:** Requires browser verification  
**Category:** Diagram accessibility  
**Location:** [components/sections/ResourceMap.tsx](components/sections/ResourceMap.tsx)  
**Evidence:** The SVG has a generic `aria-label`, but no `desc`, no programmatic reference to the visible conceptual-map caption, and `motion.line` elements are not explicitly `aria-hidden`. Text is `fontSize="3"` in a `viewBox="0 0 100 100"`.  
**Impact:** Screen-reader explanation and mobile text legibility need real browser/assistive-tech verification; the current accessible name lacks the relationship/coordination narrative.  
**How to reproduce:** Run axe and inspect at 390px after restoring the local server.  
**Recommended fix:** Use `aria-labelledby`/`aria-describedby` tied to a richer text description, hide decorative lines, and verify readable sizing on mobile.  
**Launch blocking:** No.

### PERF-001

**Severity:** P2 - material improvement  
**Confidence:** Confirmed  
**Category:** Dependency security  
**Location:** [package-lock.json](package-lock.json)  
**Evidence:** `npm audit --audit-level=low` reports two moderate vulnerabilities for transitive `postcss <8.5.10` under installed Next.  
**Impact:** Dependency risk must be triaged before production deployment.  
**How to reproduce:** Run the recorded audit command after a clean install.  
**Recommended fix:** Investigate a compatible Next/PostCSS update path; do not use the suggested forced breaking downgrade without review.  
**Launch blocking:** No.

### ARCH-001

**Severity:** P2 - material improvement  
**Confidence:** Confirmed  
**Category:** Content architecture / dead code  
**Location:** [content/site.ts](content/site.ts), [content/pages/home.ts](content/pages/home.ts), [content/cases/index.ts](content/cases/index.ts)  
**Evidence:** `content/site.ts` still contains legacy `home`, `caseStudies`, `services`, `industries`, `process`, `proofStrip`, and `talentCards` alongside active page-specific content. The active home imports `homeContent`; case routes import `content/cases`. Multiple sources duplicate brand/service/industry/case concepts.  
**Impact:** Content drift can create contradictory copy or categories without compiler failure.  
**How to reproduce:** Compare exports/imports; static usage search finds multiple definitions but no app imports for several legacy sections.  
**Recommended fix:** Establish one typed source of truth per concern and remove/migrate verified unused legacy exports in a separate change.  
**Launch blocking:** No.

### MOTION-001

**Severity:** P3 - polish / maintainability  
**Confidence:** Confirmed  
**Category:** Motion system  
**Location:** [components/layout/Header.tsx](components/layout/Header.tsx), [components/Reveal.tsx](components/Reveal.tsx), [components/sections/ProcessTimeline.tsx](components/sections/ProcessTimeline.tsx), [components/sections/ServicesStory.tsx](components/sections/ServicesStory.tsx)  
**Evidence:** Raw `[0.22, 1, 0.36, 1]` arrays and literal durations remain after `lib/motion.ts` introduced tokens.  
**Impact:** The stated centralized motion-token policy is incomplete; future animation changes can drift.  
**How to reproduce:** Search for the raw cubic-bezier tuple.  
**Recommended fix:** Migrate these components to named tokens and remove unused token aliases only after usage review.  
**Launch blocking:** No.

### PERF-002

**Severity:** P3 - polish / maintainability  
**Confidence:** Requires browser verification  
**Category:** Mobile performance  
**Location:** [components/layout/Header.tsx](components/layout/Header.tsx), [components/media/MediaSlot.tsx](components/media/MediaSlot.tsx)  
**Evidence:** Fixed scrolled header/mobile navigation use `backdrop-blur-2xl`; the mobile panel also scrolls. Media guide captions use blur.  
**Impact:** Likely composite/GPU cost on low-end mobile hardware, but no device profile was available to measure it.  
**How to reproduce:** Profile menu opening and scrolling on a low-end Android/iPhone with performance tools.  
**Recommended fix:** Test first; use a solid mobile fallback or lower blur only if metrics show a problem.  
**Launch blocking:** No.

### CSS-001

**Severity:** P3 - polish / compatibility  
**Confidence:** Highly likely  
**Category:** CSS compatibility  
**Location:** [app/globals.css](app/globals.css), `.technical-grid`  
**Evidence:** Uses `mask-image` without a `-webkit-mask-image` counterpart.  
**Impact:** The intended grid fade may render differently in Safari versions requiring the prefix.  
**How to reproduce:** Compare current Research styling in supported Safari versions once local runtime is restored.  
**Recommended fix:** Add the vendor-prefixed equivalent and browser-test it.  
**Launch blocking:** No.

## E. Page-by-Page Audit

| Page                  | Source evidence                                                                                                                                      | Audit result                                                                                                                                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage              | [app/[lang]/page.tsx](app/[lang]/page.tsx), [Hero](components/sections/Hero.tsx), [StickyStory](components/motion/StickyStory.tsx)                   | Explicit title lines and mobile hero MediaSlot exist in source. Selected work has a Featured/Supporting grid and concept labels. All displayed media remains placeholder. Scroll active-state and mobile layout require browser verification. |
| Services              | [app/[lang]/services/page.tsx](app/[lang]/services/page.tsx), [content/pages/services.ts](content/pages/services.ts)                                 | Five advertised pillars and routes exist. Talent/Agency intentionally route outside `/services`; consistent but creates a mixed URL taxonomy.                                                                                                 |
| Commercial Production | [CommercialProductionExperience](components/sections/experiences/CommercialProductionExperience.tsx)                                                 | Structurally distinct hero, objective, disciplines, storyboard, format wall, CTA. No selected cases or process/handoff section; all media placeholders; Chinese format labels are English.                                                    |
| Talent                | [TalentExperience](components/sections/experiences/TalentExperience.tsx)                                                                             | Anonymous cards, shortlist, rights categories and CTA exist. No fake names found. Media placeholders; hover/contact-sheet behavior and mobile usability require browser verification.                                                         |
| Research & Innovation | [ResearchInnovationExperience](components/sections/experiences/ResearchInnovationExperience.tsx), [ResourceMap](components/sections/ResourceMap.tsx) | Illustrative resource-map wording and approval note exist; no fake university names/logos found. Diagram mobile and AT accessibility remain unverified.                                                                                       |
| Events & Exhibitions  | [EventsExhibitionsExperience](components/sections/experiences/EventsExhibitionsExperience.tsx)                                                       | Format, architecture, run-of-show, conceptual layout label, and table exist. Matrix is synthetic (UX-001); horizontal mobile table needs browser verification.                                                                                |
| Agency Support        | [AgencySupportExperience](components/sections/experiences/AgencySupportExperience.tsx)                                                               | White-label boundary, scope, handoff, and CTA are present. No absolute confidentiality/guarantee claim found in the component; actual contractual wording requires company/legal approval.                                                    |
| Industries            | [app/[lang]/industries/page.tsx](app/[lang]/industries/page.tsx)                                                                                     | Six requested sectors exist, each with challenge/capability/format/deliverable. All use one identical text layout; requested per-sector visual variation is incomplete.                                                                       |
| Work                  | [app/[lang]/work/page.tsx](app/[lang]/work/page.tsx), [WorkFilterGrid](components/sections/WorkFilterGrid.tsx)                                       | Filters exclude empty options by deriving available pillars from cases; each card shows `Concept example`. Interaction, focus, and overflow require browser verification.                                                                     |
| Case details          | [app/[lang]/work/[slug]/page.tsx](app/[lang]/work/[slug]/page.tsx), [content/cases/index.ts](content/cases/index.ts)                                 | Details consistently frame cases as hypothetical concepts. AI CTA preselection is wrong (FORM-002).                                                                                                                                           |
| About                 | [app/[lang]/about/page.tsx](app/[lang]/about/page.tsx), [content/pages/about.ts](content/pages/about.ts)                                             | Uses OperationalProof and buyer-route CTAs. Claims such as “trusted UK-based specialists” require company evidence.                                                                                                                           |
| Contact               | [app/[lang]/contact/page.tsx](app/[lang]/contact/page.tsx), [ContactForm](components/sections/ContactForm.tsx)                                       | Two-step client form and fallback exist. Field-error association and case preselection defects identified; no live webhook submission was sent.                                                                                               |
| Privacy               | [app/[lang]/privacy/page.tsx](app/[lang]/privacy/page.tsx)                                                                                           | Provisional notice; legal finalization required.                                                                                                                                                                                              |
| Terms                 | [app/[lang]/terms/page.tsx](app/[lang]/terms/page.tsx)                                                                                               | Publicly declares itself launch-readiness text needing legal/company review.                                                                                                                                                                  |

## F. Case-Study Integrity Table

| Slug                                 | Status / disclosure    | Language consistency | Media validity        | Copy tense         | Evidence requirement / issue                                |
| ------------------------------------ | ---------------------- | -------------------- | --------------------- | ------------------ | ----------------------------------------------------------- |
| `london-celebrity-event-coverage`    | concept / illustrative | en+zh fields present | Typed placeholder IDs | hypothetical/could | Real event permission/media and company approval required.  |
| `fashion-campaign-production-london` | concept / illustrative | en+zh fields present | Typed placeholder IDs | hypothetical/could | Approved campaign media and disclosure decision required.   |
| `ai-product-video-uk-market`         | concept / illustrative | en+zh fields present | Typed placeholder IDs | hypothetical/could | Contact CTA sends invalid `technology-content` project key. |
| `beauty-creator-content-sprint`      | concept / illustrative | en+zh fields present | Typed placeholder IDs | hypothetical/could | Approved creator/media rights required.                     |
| `automotive-event-presenter-support` | concept / illustrative | en+zh fields present | Typed placeholder IDs | hypothetical/could | Approved vehicle/event/media rights required.               |
| `jewellery-editorial-shoot`          | concept / illustrative | en+zh fields present | Typed placeholder IDs | hypothetical/could | Approved product/editorial rights required.                 |

No invented client name, testimonial, achievement metric, university relationship, completed-project tense, or hardcoded false “published” label was confirmed in the six current case records.

## G. Media Integrity Table

`source exists` below means the local placeholder source exists, **not** that approved production media exists. Alt text is present in registry records; actual visual appropriateness and real-asset dimensions need company evidence.

| ID(s)                                                                                                                                           | Type / source                | Exists | Alt | Referenced status                                          | Poster / issue                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -----: | --: | ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| `event-concept-{hero,landscape,portrait,diagram}`                                                                                               | image/diagram placeholders   |    Yes | Yes | Case record                                                | Diagram uses video-placeholder SVG; all are placeholders.                 |
| `fashion-concept-{hero,landscape,portrait,diagram}`                                                                                             | image/diagram placeholders   |    Yes | Yes | Case record                                                | Same.                                                                     |
| `technology-concept-{hero,landscape,portrait,diagram}`                                                                                          | image/diagram placeholders   |    Yes | Yes | Case record                                                | Same.                                                                     |
| `beauty-concept-{hero,landscape,portrait,diagram}`                                                                                              | image/diagram placeholders   |    Yes | Yes | Case record                                                | Same.                                                                     |
| `automotive-concept-{hero,landscape,portrait,diagram}`                                                                                          | image/diagram placeholders   |    Yes | Yes | Case record                                                | Same.                                                                     |
| `jewellery-concept-{hero,landscape,portrait,diagram}`                                                                                           | image/diagram placeholders   |    Yes | Yes | Case record                                                | Same.                                                                     |
| `home-hero-primary`, `home-create`, `home-connect`, `home-activate`, `home-featured-case`, `home-supporting-case-01`, `home-supporting-case-02` | image placeholders           |    Yes | Yes | Homepage                                                   | Active, but placeholders.                                                 |
| `home-hero-secondary`                                                                                                                           | image placeholder            |    Yes | Yes | No current static source reference found                   | Unused registry record.                                                   |
| `production-hero`, `production-storyboard-01..03`                                                                                               | image placeholders           |    Yes | Yes | Commercial page                                            | Active, placeholders.                                                     |
| `production-contact-sheet-01..02`, `production-video-poster`                                                                                    | image placeholders           |    Yes | Yes | No current static source reference found                   | Unused registry records.                                                  |
| `talent-hero`, `talent-contact-sheet-01..03`, `talent-private-shortlist`                                                                        | image placeholders           |    Yes | Yes | Talent page                                                | Active, placeholders.                                                     |
| `research-hero`, `research-interview`, `research-roundtable`                                                                                    | image placeholders           |    Yes | Yes | Research page                                              | Active, placeholders.                                                     |
| `research-technical-content`, `research-resource-diagram`                                                                                       | image placeholders           |    Yes | Yes | No current static source reference found                   | Unused registry records.                                                  |
| `events-hero`, `events-floorplan`                                                                                                               | image placeholders           |    Yes | Yes | Events page                                                | Active, placeholders.                                                     |
| `events-stage`, `events-exhibition`, `events-panel`, `events-interview`                                                                         | image placeholders           |    Yes | Yes | No current static source reference found                   | Unused registry records.                                                  |
| `agency-hero`, `agency-workflow`, `agency-handoff`                                                                                              | image placeholders           |    Yes | Yes | Agency page                                                | Active, placeholders.                                                     |
| `agency-production`                                                                                                                             | image placeholder            |    Yes | Yes | No current static source reference found                   | Unused registry record.                                                   |
| `hero-cinematic`, `service-*`, `industry-*`, `case-*` legacy records                                                                            | image/video-placeholder SVGs |    Yes | Yes | Mixed; legacy sections need reference-by-reference cleanup | Some components that use them are unused; static execution not available. |

Video handling source uses `poster`, `muted`, `playsInline`, and `preload="metadata"`, but current registry slots are image/diagram placeholders rather than actual video sources. No real video poster/source was available to test.

## H. Route and SEO Matrix

Runtime HTTP/HTML fields are **not verified** because localhost returned 500 after the failed install. Source expectation comes from `[lang]` layout and `buildMetadata`.

| Route pair     | Route implementation                        | Expected lang                 | Metadata source | Canonical/hreflang source             | H1/main / OG / JSON-LD runtime result                                       |
| -------------- | ------------------------------------------- | ----------------------------- | --------------- | ------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `/`            | `(root)/page.tsx` redirect                  | N/A                           | N/A             | N/A                                   | Requires route verification.                                                |
| `/en`, `/zh`   | `[lang]/page.tsx`                           | en-GB / zh-CN                 | `buildMetadata` | `/en`/`/zh`, relative alternate paths | Requires HTML verification; home has source H1 in Hero; org JSON-LD layout. |
| `/en           | zh/services`                                | services page                 | en-GB / zh-CN   | `buildMetadata`                       | helper                                                                      | Requires HTML verification; source H1.                          |
| `/en           | zh/services/commercial-production`          | dedicated experience          | en-GB / zh-CN   | helper + Service JSON-LD              | helper                                                                      | Requires HTML verification; service JSON-LD; no BreadcrumbList. |
| `/en           | zh/talent`                                  | dedicated experience          | en-GB / zh-CN   | helper                                | helper                                                                      | Requires HTML verification; no Service JSON-LD found.           |
| `/en           | zh/services/research-innovation`            | dedicated experience          | en-GB / zh-CN   | helper + Service JSON-LD              | helper                                                                      | Requires HTML verification; no BreadcrumbList.                  |
| `/en           | zh/services/events-exhibitions`             | dedicated experience          | en-GB / zh-CN   | helper + Service JSON-LD              | helper                                                                      | Requires HTML verification; no BreadcrumbList.                  |
| `/en           | zh/for-agencies`                            | dedicated experience          | en-GB / zh-CN   | helper                                | helper                                                                      | Requires HTML verification; no Service JSON-LD found.           |
| `/en           | zh/industries`                              | industries page               | en-GB / zh-CN   | helper                                | helper                                                                      | Requires HTML verification.                                     |
| `/en           | zh/work`                                    | work page                     | en-GB / zh-CN   | helper                                | helper                                                                      | Requires HTML verification.                                     |
| `/en           | zh/work/[six slugs]`                        | static params in detail route | en-GB / zh-CN   | helper concept title                  | helper                                                                      | Requires route/HTML verification; no BreadcrumbList.            |
| `/en           | zh/about`, `/contact`, `/privacy`, `/terms` | static page routes            | en-GB / zh-CN   | helper                                | helper                                                                      | Requires HTML verification.                                     |
| `/api/contact` | POST route                                  | N/A                           | N/A             | Robots disallows `/api/`              | Requires safe API tests.                                                    |

Additional SEO facts: `metadataBase` defaults to `https://framebridge.studio`; sitemap emits 26 page URLs plus 12 case URLs; robots disallows `/api/`; OG file exists at 1200x630 and is 101,461 bytes. Icons and web manifest were not found in `app/` or `public/`.

## I. Dead-Code Inventory

Static search means no app/component import outside the defining file unless listed.

| File / export                                                                                                | Verified usage                                     | Recommendation                                                                                                          |
| ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [components/motion/ParallaxMedia.tsx](components/motion/ParallaxMedia.tsx)                                   | Definition only                                    | Verify with TypeScript after toolchain restoration, then remove if unused.                                              |
| [components/motion/SectionTransition.tsx](components/motion/SectionTransition.tsx)                           | Definition only                                    | Same.                                                                                                                   |
| [components/motion/WordMaskReveal.tsx](components/motion/WordMaskReveal.tsx)                                 | Definition only                                    | Same.                                                                                                                   |
| [components/sections/CaseStudyGrid.tsx](components/sections/CaseStudyGrid.tsx)                               | Definition only                                    | Same.                                                                                                                   |
| [components/sections/IndustryStrip.tsx](components/sections/IndustryStrip.tsx)                               | Definition only                                    | Same.                                                                                                                   |
| [components/sections/Process.tsx](components/sections/Process.tsx)                                           | Definition only                                    | Same.                                                                                                                   |
| [components/sections/ProcessTimeline.tsx](components/sections/ProcessTimeline.tsx)                           | Definition only                                    | Same.                                                                                                                   |
| [components/sections/ProofStrip.tsx](components/sections/ProofStrip.tsx)                                     | Definition only                                    | Same.                                                                                                                   |
| [components/sections/ServiceGrid.tsx](components/sections/ServiceGrid.tsx)                                   | Definition only                                    | Same.                                                                                                                   |
| [components/sections/ServicesStory.tsx](components/sections/ServicesStory.tsx)                               | Definition only                                    | Same.                                                                                                                   |
| [components/sections/TalentCards.tsx](components/sections/TalentCards.tsx)                                   | Definition only                                    | Same.                                                                                                                   |
| [components/media/MediaPlaceholder.tsx](components/media/MediaPlaceholder.tsx)                               | Alias only; active imports use it                  | Rename/migrate only after broad usage decision; it currently obscures MediaSlot identity.                               |
| [components/sections/experiences/ServicePageShell.tsx](components/sections/experiences/ServicePageShell.tsx) | Used by 3 service experiences                      | Wrapper returns only a fragment; retain only if it will own shared behavior, otherwise simplify in a separate refactor. |
| `content/site.ts` legacy exports                                                                             | Several active exports plus multiple stale exports | Split active page data from verified unused legacy data before future content edits.                                    |

## J. Claims Requiring Evidence

| Claim                                                         | Page/source                                          | Language | Evidence needed                                                | Recommendation                                                                    |
| ------------------------------------------------------------- | ---------------------------------------------------- | -------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| “trusted UK-based specialists”                                | [content/pages/about.ts](content/pages/about.ts)     | en       | Supplier/talent diligence and permission to claim relationship | Qualify or document.                                                              |
| “London-based coordination” / “伦敦本地统筹”                  | [content/pages/home.ts](content/pages/home.ts)       | en/zh    | Company operating-location evidence                            | Confirm before campaign launch.                                                   |
| “Chinese-English bilingual workflow” / “中英双语工作流程”     | homepage/brand content                               | en/zh    | Team/service evidence                                          | Confirm staffing and delivery capability.                                         |
| “UK talent and specialist network” / “英国人才与专业资源网络” | [content/pages/home.ts](content/pages/home.ts)       | en/zh    | Current supplier/talent sourcing evidence                      | Qualify as coordination access, not representation.                               |
| “快速响应”                                                    | stale [content/site.ts](content/site.ts) agency copy | zh       | Service-level response evidence                                | Remove stale copy or support it; it is not actively rendered by confirmed routes. |

No confirmed occurrences of “world-class”, “industry-leading”, “award-winning”, “official university partner”, “guaranteed availability”, “nationwide coverage”, fabricated client names, or fabricated performance metrics were found in source content searched. This is a source-text result, not proof that approved company evidence exists.

## K. Recommended Remediation Order

### 1. Before launch

1. Replace active placeholders with approved rights-cleared media; obtain approval for every case disclosure and do not market concepts as completed work.
2. Replace Events synthetic responsibility letters with factual, approved ownership data including Speaker/partner.
3. Obtain company/legal approval for Privacy and Terms; remove the public provisional legal-review sentence only after approval.
4. Restore a clean environment, run `npm ci`, then rerun format, lint, TypeScript, build, complete route smoke tests, browser tests, and accessibility checks.
5. Correct invalid case-to-contact preselection and form error associations.

### 2. Before adding real media

1. Strengthen registry validation and production placeholder detection.
2. Verify alt text, crop safe areas, real dimensions, video posters, performance, and all mobile layouts.
3. Add per-page OG mappings plus favicon, apple-touch icon, and manifest.

### 3. Before marketing campaigns

1. Add E2E and accessibility CI coverage for all requested language, menu, form, filter, reduced-motion, and overflow flows.
2. Use shared durable rate limiting and fail closed when public origin configuration is absent.
3. Add JSON-LD BreadcrumbList and audit real rendered metadata with a crawler/browser.

### 4. Later optimisation

1. Consolidate content sources and remove verified dead components/records.
2. Finish motion-token migration and test backdrop blur/device performance.
3. Implement true industry-specific layouts and measured mobile matrix fallbacks.

## L. Final Verification Status

| Area                 | Status                                                                                                                                                                                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Format               | Not verified in current environment: local Prettier binary removed by failed `npm ci`.                                                                                                                                                                               |
| Lint                 | Not verified in current environment: local ESLint binary removed by failed `npm ci`.                                                                                                                                                                                 |
| TypeScript           | Not verified in current environment: local compiler unavailable; unrelated `npx tsc` install prompt declined.                                                                                                                                                        |
| Content validation   | Passed: limited placeholder/case regex validation only.                                                                                                                                                                                                              |
| Unit tests           | Passed: 3 source-text tests.                                                                                                                                                                                                                                         |
| E2E                  | Not configured; command missing.                                                                                                                                                                                                                                     |
| Build                | Not verified: local Next binary unavailable after failed `npm ci`.                                                                                                                                                                                                   |
| npm audit            | 2 moderate transitive PostCSS vulnerabilities reported.                                                                                                                                                                                                              |
| Route checks         | Not completed: localhost returned 500 in the broken dependency environment.                                                                                                                                                                                          |
| Accessibility checks | No axe tool/test configured; code review only.                                                                                                                                                                                                                       |
| Responsive checks    | No screenshots accepted; requires browser/device verification.                                                                                                                                                                                                       |
| Hygiene              | `.next`, `node_modules`, coverage, `.env*`, and `*.tsbuildinfo` are ignored. `.next` and `node_modules` exist locally but were not tracked by `git ls-files`; no `.env`, certificate, private key, or obvious secret file was found. `package-lock.json` is tracked. |

## Source-of-Truth Map

| Concern            | Current source(s)                                                                                                                                                        | Audit note                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Brand/domain/email | [content/brand.ts](content/brand.ts); domain fallback also [lib/seo.ts](lib/seo.ts); contact page hardcodes email                                                        | Domain/email have duplicate presentation sources.                                            |
| Navigation         | [content/navigation.ts](content/navigation.ts); legacy nav array in [content/site.ts](content/site.ts)                                                                   | Active header uses navigation.ts.                                                            |
| Five pillars       | [content/pages/services.ts](content/pages/services.ts), [content/navigation.ts](content/navigation.ts), [content/cases/index.ts](content/cases/index.ts), legacy site.ts | Names/routes are broadly aligned but cases retain a sixth `technology-content` taxonomy key. |
| CTA labels         | brand, navigation, page content, components                                                                                                                              | Multiple localized sources.                                                                  |
| Legal links        | Footer local `groups`, sitemap page list                                                                                                                                 | Duplicate link configuration.                                                                |
| Case studies       | [content/cases/index.ts](content/cases/index.ts), legacy case summaries in site.ts                                                                                       | Active case detail/work filter uses cases/index.                                             |
| Media              | [content/media.ts](content/media.ts)                                                                                                                                     | Central registry, but active production assets are absent.                                   |
