# VENUS BRIDGE FINAL PRE-LAUNCH WEBSITE AUDIT

Audit date: 24 August 2026  
Mode: audit only; production code/content/design unchanged  
Evidence: repository review, production build, browser inspection, 126-route rendered audit, 36 major-page screenshots, Lighthouse, Axe, unit/E2E/contact/release/media/security checks and external benchmark review.

## 1. Executive Verdict

The current website is strategically and visually good enough to launch. It clearly positions Venus Bridge as a flexible UK/European market execution and local delivery layer for Chinese companies—not primarily as a photographer, event agency, talent broker or generic consultant. Within the first viewport, the visitor can identify audience, geography, local execution value, real proof and a next step. Companies, Partners, How We Work and About each have a distinct commercial role and are credible sales-enablement assets.

It is **not ready to publish today** because five tightly defined release blockers remain outside the core page design: production domain/indexing/identity variables are missing; Privacy and Terms visibly remain pre-release; contact delivery is not configured or live-verified; four high-severity dependency findings have available patches; and generated social cards still communicate the obsolete creative/talent positioning and call real Work conceptual.

Biggest strength: the site now connects concrete buying situations to one differentiated operating model, with unusually strong bilingual and editorial execution.

Biggest weakness: the proof library is honest but commercially narrower than the promise. Most cases prove photography, documentation or visual assets in real UK/European settings, not market validation, buyer/distributor engagement, partnerships or measurable follow-through.

Most important commercial problem: a skeptical B2B buyer can understand the offer but cannot yet see enough evidence that broader commercial outcomes have occurred.

Most important design problem: none merits redesign. The only material visual-content defect is the off-page OG card system; the default 404 is a P2 polish gap.

Most important technical problem: production release configuration and legal/contact operations are incomplete, compounded by known high dependency advisories.

What must not change: the audience-led navigation, homepage hero/early proof/buying triggers, Companies proposition, real-only Work architecture, How We Work stages, About globe/team system, and Contact intent/form semantics. Further pre-launch rewriting would create more regression risk than value.

## 2. Release Recommendation

## RELEASE AFTER P0 + SELECTED P1

Close P0-01 to P0-05. Before active outbound, also implement privacy-reviewed conversion measurement and a monitored Contact fallback/realistic response expectation. Do not hold release for future testimonials, metrics or commercial cases; start the evidence-acquisition programme immediately and publish facts only as they become approvable.

## 3. Current Brand Perception

Desired perception is strong: UK market execution partner 9.0/10; China–UK commercial operating partner 8.8; integrated local delivery team 9.0; premium professional-services firm 8.8. Unwanted perception remains moderate for photography company 5.5, creative agency 4.8 and event agency 4.2 because the archive’s outcomes are primarily visual documentation/assets. Resource broker 2.8, generic consultancy 3.0, talent broker 1.8 and university intermediary 1.7 are well controlled.

The page-level category is correct. The social-preview category is wrong and must be fixed.

## 4. Primary Buyer Assessment

A founder, CEO, CMO or overseas-business leader can quickly recognise:

- UK/Europe entry, launch, exhibition and local-team needs;
- buyer/distributor/partner and credibility situations;
- one China-aware local team coordinating action rather than separate suppliers;
- benefits of speed, reduced complexity, local judgement, continuity and reusable assets;
- real projects and verified responsibilities;
- the route to a qualified conversation.

They will still ask reasonable questions: what exact scope Venus Bridge owned beyond imagery, what commercial result followed, how large/available the team is, what the contracting entity is, how quickly Venus Bridge responds, and which buyer/partner engagements can be referenced. These belong in operational proof and proposal conversations, not another homepage rewrite.

## 5. Homepage Audit

Commercial clarity 9.0; design 9.2; conversion 8.6; mobile 8.7.

The current sequence—proposition, early real proof, buyer recognition, four routes, flexible local layer, partner pathway, specialist capability, exhibition continuity, differentiation/value and CTA—is coherent. Real cases appearing before abstract services is a major strength. The hero’s “on the ground” formulation is premium without being vague, and the local-team gap is a defensible buying insight.

The mobile page is long and several ideas recur, but each has a different sales role. No section should be removed before analytics demonstrates low value. Freeze hero, proof, triggers, routes and final CTA. Correct the social card; do not revise the visible hero again.

## 6. Companies Audit

Overall 8.7. This page actually sells. It explicitly covers validation, launches, exhibitions, buyers, distributors, partnerships, credibility and lean local teams, then translates those triggers into actions and benefits. It is the best primary follow-up page after outbound.

Its weakness is inherited proof, not copy: the page promises commercial work that current cases only partly demonstrate. Keep the page and acquire stronger evidence.

## 7. Partners Audit

Overall 8.3. A UK/EU organisation understands why Venus Bridge may contact it, what opportunities may look like, what Venus Bridge coordinates and what the partner gains. Commercial context precedes categories, preventing a broker/directory feel. Language avoids formal-partnership or endorsement inflation.

The missing layer is a real partner-side quote/case/repeat signal. Acquire one with consent; do not add logos or more disclaimers pre-launch.

## 8. Case Studies Audit

Index 8.4; case-detail average 8.2; commercial quality 7.4. All 12 published cases and 24 bilingual routes render, remain truth-gated and explain context, verified role, delivery and outputs. BYD, Changan, Geely, CATL, Leapmotor and AGIBOT create a credible automotive/technology lead set. London Automotive Brand Film broadens production capability.

Wang Linkai, Yue Yunpeng, London Fashion Week and Beauty/Fashion are strong creative proof but increase photography-company perception. Keep them lower in the archive; future commercial cases should supersede them naturally. Do not relabel visual outputs as commercial outcomes.

No active case image is broken, badly cropped or launch-blocking. Exact case scores and recommendations are in `final-prelaunch-page-scorecard.md`.

## 9. How We Work Audit

Overall 8.6. The page is commercially useful rather than process theatre: one local team, five stages, the value after the live moment and capability selected by goal. It answers ownership and follow-through objections and can be sent after an initial call. Freeze the stage model.

## 10. About Audit

Overall 8.7. About is the strongest visual narrative: cross-border operating team, why local action must serve one goal, China-to-London-to-Europe reach, five disciplines, named responsibility-led profiles, specialist depth and continuity. The globe is sophisticated, responsive, reduced-motion safe and semantically backed; cities are project geography, not office claims.

All five portraits lazy-load correctly. Owner confirmation is required for titles, biographies, degrees and referenced programmes, but the copy distinguishes prior background from Venus Bridge work. Freeze the page after confirmations.

## 11. Contact Audit

Page/form design is strong. Company, partner and other intents are clear; fields qualify without demanding a finished brief; consent and status are accessible; mobile is excellent. Server validation, origin checking, honeypot, rate limiting, signed webhook, request IDs and real error semantics exist. The audit passed all 11 EN/ZH delivery assertions.

Production classification is **CONFIGURATION REQUIRED**: real webhook, origin list, shared limiter and live receipt are missing. Add one approved fallback and truthful response expectation after channels are final.

## 12. Chinese-Site Audit

Chinese buyer clarity 8.8; copy 8.6. The Chinese site is commercially natural rather than literal: it uses 市场验证、买家、经销商、渠道、展会、发布、本地团队、本地执行、商务对接 and 后续跟进 in recognisable contexts. Headline length and wrapping hold across mobile/tablet/desktop. Navigation and page order mirror English without translationese-heavy explanation.

The major Chinese defect is social sharing: non-Work OG supporting text remains English and Work is mislabelled as conceptual. Legal Chinese pages are visibly pre-release. Fix both before release.

## 13. Conversion Audit

The primary journey is sound: Home recognition/proof → Companies or Case → How/About confidence → intent-qualified Contact → real provider success. CTA frequency is appropriate and company/partner paths remain distinct.

Material friction is off-page/social mispositioning, incomplete contact operations, no fallback/response expectation, proof breadth and no analytics. The form itself is not overlong for a serious B2B enquiry.

## 14. Design Audit

Premium design 9.0. Typography hierarchy, 12-column grid, black/ivory/gold palette, rules, labels, negative space and asymmetry form a consistent editorial system. Page-to-page rhythm is controlled and the site avoids template iconography, excessive gradients or generic glass cards.

Inter/Noto Sans SC are named but not bundled, creating cross-device fallback variance (P2). No other pre-launch visual-system change has evidence behind it.

## 15. Responsive Audit

Mobile 8.7. Independent checks cover 390/768/1440 for all canonical routes; regression checks additionally cover 320/375/430/1024/1280/1920 where relevant. No document overflow, broken grid, broken media, CTA wrapping failure or Chinese line failure was reproduced. Contained horizontal tabs/filters and intentional globe clipping do not widen the page.

The default 404 is English-only and unbranded. This is P2.

## 16. Media Audit

Media now leads with serious automotive, robotics, launch, exhibition and stakeholder contexts. Visual quality and art direction are high; responsive variants and crop decisions are mature. Creative material remains strategically useful for beauty/fashion/entertainment prospects but should not move upward in global proof ordering.

Five placeholder assets flagged by production validation belong only to retired/redirected surfaces and should not delay canonical release. Never reactivate those routes without a new audit.

## 17. Motion Audit

Motion is restrained and purposeful. The opening sequence resolves, page transitions preserve accessibility, case preview supports keyboard focus, mobile avoids hover dependency and reduced-motion behaviour passes. The globe’s finite route story, SVG/WebGL fallback and modest particle system feel premium rather than gimmicky. Freeze motion.

## 18. Trust & Truth Audit

Trust is 7.4 today, rising materially when legal/contact configuration is complete. Strengths are named real projects, verified-role wording, real media, named team, legal trading-name statement and avoidance of unsupported metrics/partnership logos.

Trust blockers are the pre-release legal pages, `.example` fallbacks, unverified contact transport and obsolete share cards. Proof gaps remain for buyer/distributor results, partner/institution delivery, quantified follow-through and testimonials. Copy cannot solve them.

Truth gate categories:

- **Verified / low risk:** published cases/media/roles as represented in code, subject to retained approval records.
- **Requires owner confirmation:** legal entity details; every team title/biography/degree/programme; all release/media/case confirmations.
- **Ambiguous if over-interpreted:** institutional and specialist capability categories; current UI correctly avoids formal-partnership claims.
- **Not claimed and should remain absent:** revenue/pipeline/meeting/attendance/ROI outcomes without evidence.

## 19. SEO / Accessibility / Performance

SEO architecture is correct: unique metadata, canonical, three hreflangs, 42-url sitemap, one H1, internal links, icons and guarded schema. SEO score is 69 only because current release profile deliberately blocks indexing; production configuration is P0. Social cards are a separate P0 content defect.

Accessibility is 9.7: Lighthouse 100 mobile/desktop; 0 serious/critical Axe findings in 54 major-page scans; semantic landmarks, labels, focus, alt text, reduced motion and keyboard navigation pass.

Performance is 9.0: Lighthouse desktop 100 (LCP 0.7 s, CLS 0) and mobile 93 (LCP 3.2 s, TBT 20 ms, CLS 0). Estimated mobile image savings are ~22 KB. Optimise after real-host measurement, not by redesigning.

## 20. Technical Release Readiness

TypeScript, lint, unit tests, content, pricing, Contact and production build pass. Full E2E is 92 passed, 53 skipped and 13 failed; failures are stale historical assertions, while canonical release/a11y/responsive/case tests pass. Update audit/test debt after launch.

Production validation fails 19 explicit values/confirmations grouped into identity/indexing, legal/company, contact infrastructure and owner gates. `npm audit --omit=dev` reports four high findings (Next, Sharp, Nanoid, PostCSS dependency paths). Patch and retest before release.

## 21. P0 Issues

1. Production domain/profile/indexing/Work/channel configuration.
2. Final legal entity, dates, notices and approvals.
3. Production Contact webhook/origins/shared rate limit/live verification.
4. Four high dependency vulnerabilities.
5. Obsolete/misleading bilingual social preview cards.

Full impact/effort/owner/evidence detail: `final-prelaunch-issue-registry.md`.

## 22. P1 Issues

1. Commercial case proof is narrower than the proposition.
2. No analytics or conversion measurement.
3. No Contact response expectation or fallback.
4. No partner-side case/quote/outcome.

Fix measurement and fallback before or at outbound start. Treat the other two as future real-world evidence acquisition.

## 23. P2 Issues

1. Generic default 404.
2. Device-dependent unbundled font stack.
3. Stale historical E2E assertions.
4. Mobile LCP/image micro-optimisation.
5. Long/repetitive Home narrative (monitor, do not pre-emptively restructure).
6. Weak continuation cue for horizontally contained filters/tabs.
7. Truth-safe but templated case narrative repetition.

## 24. P3 / Do Not Prioritise

- retired-only placeholder media;
- stale internal README/phase documents;
- intentional About globe edge clipping;
- public pricing (correctly absent);
- a blog/insight library without authoritative content ownership.

## 25. Sections That Should Be Frozen

Freeze:

- global IA/navigation labels and primary CTA;
- Home hero, early proof, buying triggers, four routes and final CTA;
- Companies hero/trigger/benefit/exhibition structure;
- Partners commercial-context/value/flow structure;
- Work real-only evidence gate, ordering, filters and responsive interactions;
- case verified-role and non-overclaim guardrails;
- How We Work five stages;
- About hero, globe, capability system and profiles;
- Contact intent tabs, fields, consent and real status logic;
- colour/grid/component/motion/reduced-motion system.

## 26. Top 10 Highest-ROI Improvements

1. Configure real domain/release/work/indexing identity.
2. Complete and review legal/company/privacy/terms data.
3. Configure and live-test Contact transport/origins/shared limiter.
4. Patch Next/Sharp/dependency advisories and retest.
5. Correct all EN/ZH social preview cards.
6. Add monitored Contact fallback and truthful response expectation.
7. Add privacy-reviewed CTA/case/form-success measurement.
8. Establish future case evidence capture at contract/project-close.
9. Acquire one approved partner proof item and one commercial-outcome case.
10. After launch data only: assess 404/font/image/filter/Home compression polish.

## 27. Recommended Next Phase

Run a **release-closure phase**, not another redesign:

1. owner supplies approved production, legal, contact and truth-gate values;
2. engineering patches dependencies, configures deployment/contact and corrects social cards;
3. sales/operations approves fallback/SLA and measurement events;
4. QA reruns the full release checklist on the real HTTPS hostname, including search/indexing, WeChat/LinkedIn cards and live enquiry receipt;
5. publish only when all five P0s are closed;
6. begin active outbound and collect analytics/objections;
7. operate the future evidence-acquisition plan so real commercial cases gradually strengthen the archive.

Do not implement broad copy, page-order, component, CSS, motion or image changes in that phase.

## Supporting documents

- `docs/final-prelaunch-issue-registry.md`
- `docs/final-prelaunch-page-scorecard.md`
- `docs/final-prelaunch-commercial-audit.md`
- `docs/final-prelaunch-visual-ux-audit.md`
- `docs/final-prelaunch-technical-release-audit.md`
- `audit/final-prelaunch/rendered-route-audit.json`
- `audit/final-prelaunch/` screenshot set

