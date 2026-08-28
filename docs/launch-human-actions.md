# Launch Human Actions

Only actions requiring account access, legal/business authority, real delivery, physical hardware or underlying rights records appear here.

## 1. Review and checkpoint the release candidate

- [ ] Complete
- WHY: the current Git tree contains extensive approved but uncommitted/untracked work; an immutable release cannot be identified safely.
- EXACT ACTION: review the full tree, commit the approved release on `main` (or the owner-designated production branch), then create annotated tag `v1.0.0-rc1` without rewriting history.
- EXPECTED RESULT: one commit SHA and tag reproduce the candidate.
- HOW TO VERIFY: clean `git status`, `git show v1.0.0-rc1`, and a fresh checkout passes the Phase 6 validation commands.

## 2. Create and configure production hosting

- [ ] Complete
- WHY: no hosting project, CI/CD binding or production deployment exists in the repository.
- EXACT ACTION: create a commercial managed Next.js project (Vercel Pro is the reference path), connect the reviewed repository/branch, set the supported Node/build settings, and enable preview plus production deployments.
- EXPECTED RESULT: immutable preview URL, build logs, deployment history and rollback control.
- HOW TO VERIFY: deploy the tagged candidate, record deployment ID and complete one rollback rehearsal.

## 3. Confirm canonical domain, DNS and HTTPS

- [ ] Complete
- WHY: no production hostname or DNS access is available to Codex.
- EXACT ACTION: choose apex or www as canonical; configure both DNS names, redirect the secondary to the canonical in one permanent hop, issue HTTPS certificates, and set `NEXT_PUBLIC_SITE_URL` to the canonical origin.
- EXPECTED RESULT: both hosts are HTTPS; one serves and the other permanently redirects; no mixed content.
- HOW TO VERIFY: inspect certificates and run requests against Home, canonical tags, robots, sitemap, OG URLs and `/api/contact` from the real host.

## 4. Supply company identity and legal approvals

- [ ] Complete
- WHY: legal name, company number, registered office, controller, public emails, dates and approvals are intentionally blank/pending.
- EXACT ACTION: obtain qualified review; configure every `NEXT_PUBLIC_*` company/legal field in `.env.example`, set approval statuses/dates, then set `LEGAL_REVIEW_CONFIRMED=true` and `PUBLIC_COMPANY_DETAILS_CONFIRMED=true` only after approval.
- EXPECTED RESULT: Privacy, Terms, footer and Organization schema display truthful final identity.
- HOW TO VERIFY: review English/Chinese live pages and run `npm run validate:release:production`.

## 5. Configure and verify Contact delivery

- [ ] Complete
- WHY: customer enquiries are the P0 commercial path and no real provider/receipt was available.
- EXACT ACTION: configure approved webhook URL/secret, notification destination, exact HTTPS origins, distributed limiter URL/token, and failure alert. Run the controlled live script and verify request ID, signature, notification receipt, duplicate 429 and forced failure alert.
- EXPECTED RESULT: real enquiries arrive once, failures are visible, and visitors never receive false success.
- HOW TO VERIFY: follow `docs/contact-production-delivery-audit.md`; only then set `CONTACT_DELIVERY_VERIFIED=true` and `DISTRIBUTED_RATE_LIMIT_VERIFIED=true`.

## 6. Confirm public case evidence and media rights

- [ ] Complete
- WHY: repository flags cannot substitute for source contracts, licences and client/subject approvals.
- EXACT ACTION: review every public case, logo, brand reference, event image and Team portrait against retained evidence/releases; remove any unsupported item; set `PUBLIC_CASE_EVIDENCE_CONFIRMED=true` and `APPROVED_MEDIA_CONFIRMED=true` only after review.
- EXPECTED RESULT: every public claim and media asset has an accountable approval record.
- HOW TO VERIFY: sign the truth/rights gate against the production preview and retain an owner record.

## 7. Confirm public contact channels

- [ ] Complete
- WHY: public business/privacy emails and optional social/contact profiles are placeholders or blank.
- EXACT ACTION: configure owned business and privacy emails plus only approved contact/social profiles; set `CONTACT_CHANNELS_CONFIRMED=true`.
- EXPECTED RESULT: visitors have a real fallback channel and structured data contains no invented profile.
- HOW TO VERIFY: send and receive from each published channel and inspect Footer, Contact, Privacy and Organization schema.

## 8. Choose analytics and consent position

- [ ] Complete
- WHY: event instrumentation exists but no provider, property ID, privacy approval or consent decision exists.
- EXACT ACTION: choose one provider; obtain property ID and legal/privacy decision; implement/approve the provider adapter and consent gate if required; configure `NEXT_PUBLIC_ANALYTICS_PROVIDER`, `NEXT_PUBLIC_ANALYTICS_ID`, approval and enabled flags.
- EXPECTED RESULT: only allow-listed non-sensitive events reach the production property, and local/preview traffic does not pollute it.
- HOW TO VERIFY: provider debug view shows the documented funnel and payload inspection shows no name, email, organisation or free text.

## 9. Configure monitoring and operational ownership

- [ ] Complete
- WHY: deployment, runtime, uptime and Contact alerts require external accounts and named responders.
- EXACT ACTION: assign deployment/contact owners; enable failed-build and 5xx alerts; create an alert on `contact_delivery_failed`; add uptime checks for Home, Contact, robots and sitemap; document escalation.
- EXPECTED RESULT: failures generate actionable notifications before customers report them.
- HOW TO VERIFY: trigger one test alert for each channel and record acknowledgement.

## 10. Run production-preview SEO/social validation

- [ ] Complete
- WHY: final canonicals, redirects, robots, sitemap and share cache depend on the real HTTPS host.
- EXACT ACTION: inspect all metadata on the preview; after production gates are configured verify robots allows public routes, sitemap uses the canonical host, and share Home/Companies/Work/About/Case links through LinkedIn, WhatsApp and WeChat.
- EXPECTED RESULT: correct English/Chinese titles, descriptions and 1200×630 images; no preview URL is indexed.
- HOW TO VERIFY: use platform debuggers where available and record screenshots/URLs.

## 11. Perform real-device testing

- [ ] Complete
- WHY: Codex cannot truthfully certify physical iOS/Android behaviour.
- EXACT ACTION: complete every checkbox in `docs/real-device-launch-checklist.md` on a real iPhone/Safari and Android/Chrome, including Contact keyboard/success/failure.
- EXPECTED RESULT: signed device matrix with no P0/P1 issue.
- HOW TO VERIFY: tester, device/OS/browser and evidence are recorded.

## 12. Measure production Core Web Vitals

- [ ] Complete
- WHY: CDN/TTFB, field INP and final mobile LCP cannot be proven locally.
- EXACT ACTION: run preview Lighthouse cold/warm mobile tests, identify the LCP request, then enable field Web Vitals monitoring after launch.
- EXPECTED RESULT: LCP trends toward <2.5 s, CLS <0.1 and INP <200 ms or a documented remediation owner exists.
- HOW TO VERIFY: retain reports and production field dashboard screenshots.
