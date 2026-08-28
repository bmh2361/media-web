# Venus Bridge release-closure checklist

Use this checklist for the exact production deployment. A checked code item does not replace an owner or real-host check.

## Code closure

- [x] One fail-closed release-readiness decision controls metadata indexing, robots, sitemap and Organization schema.
- [x] A complete test-only production configuration passes the same validator and exposes the intended 42 canonical URLs.
- [x] Privacy/controller identity and Terms identity render only after complete configuration and approval.
- [x] Footer legal identity is configuration-driven; no unconfirmed company name is presented as approved.
- [x] Contact keeps real server validation, origin protection, honeypot, signed delivery and truthful success/error behavior.
- [x] Provider-neutral distributed rate-limit adapter exists and fails closed in production when missing.
- [x] Guarded real-host Contact verification command exists and never sets `CONTACT_DELIVERY_VERIFIED`.
- [x] One fallback email renders only after channel confirmation.
- [x] Non-time-specific response expectation is visible in EN/ZH.
- [x] Privacy-gated, PII-free measurement event model exists; no provider was invented.
- [x] EN/ZH Home, Companies, Work and About OG cards carry current positioning and real-project language.
- [x] Next 15.5.23, Sharp 0.35.3, Nanoid 3.3.18 and PostCSS 8.5.26 resolve cleanly.

## Owner configuration

- [ ] Final HTTPS hostname supplied in `NEXT_PUBLIC_SITE_URL`.
- [ ] `RELEASE_PROFILE=production` and `PUBLIC_WORK_MODE=portfolio` set.
- [ ] Exact legal entity, privacy controller, number, registered office, emails and effective dates supplied.
- [ ] Final bilingual Privacy and Terms reviewed and approval flags set from retained evidence.
- [ ] Public case/media/channel confirmations completed from retained evidence.
- [ ] Approved Contact workflow, signing secret and exact allowed origins configured.
- [ ] Shared limiter provider selected, adapter configured and multi-instance behavior verified.
- [ ] Monitored fallback inbox confirmed.
- [ ] Analytics provider/privacy/retention/consent decision completed, or measurement deliberately left disabled.

## Automated release commands

Run from the repository root with the final deployment environment loaded:

```text
npm run typecheck
npm run lint
npm test
npm run validate:content
npm run validate:pricing
npm run validate:release:production
npm run validate:media:production
npm run test:contact
npm run test:e2e
npm run build
npm audit --omit=dev
```

Required results:

- [ ] production release validation: zero failed checks;
- [x] production media validation: pass, with five explicit retired/noncanonical reuse warnings accepted;
- [x] dependency audit: 0 critical, 0 high, 0 total;
- [x] typecheck, lint, unit, Contact and production build pass;
- [x] full local production E2E rerun: 105 passed, 53 intentionally skipped, 0 failed;
- [ ] no unexpected console, hydration or resource errors on the real host.

## Real-host browser QA

Check EN/ZH at 390, 430, 768, 1024, 1440 and 1920 px:

- [ ] Home
- [ ] Companies
- [ ] Work
- [ ] representative automotive case
- [ ] How We Work
- [ ] About
- [ ] Contact
- [ ] Privacy
- [ ] Terms

For every route confirm one main/one H1, no document overflow, no broken media, correct navigation, canonical/hreflang, index/follow state, keyboard focus and no console/hydration errors. Confirm reduced-motion opening, Work and About globe behavior.

## Contact production verification

- [ ] Run `npm run verify:contact:production -- --confirm-live-test` with the exact HTTPS origin and monitored test inbox.
- [ ] First controlled enquiry accepted.
- [ ] Duplicate request rejected by the distributed limiter.
- [ ] Request ID found in the approved workflow.
- [ ] Webhook signature validated.
- [ ] Notification and failure alerting observed.
- [ ] Retention/deletion handling matches the approved Privacy notice.
- [ ] Only then set `CONTACT_DELIVERY_VERIFIED=true` and rerun production validation/build.

## Search and sharing

- [ ] `/robots.txt` allows `/`, blocks `/api/`, and names the final sitemap/host.
- [ ] `/sitemap.xml` contains exactly the intended 42 EN/ZH canonical URLs.
- [ ] Public pages emit `index, follow`; no accidental `.example` value remains.
- [ ] Organization schema contains the approved entity only.
- [ ] EN/ZH Home, Companies, Work and About previews pass on LinkedIn.
- [ ] EN/ZH Home, Companies, Work and About previews pass on WeChat.

## Go/no-go

Do not release if any of the following remains true:

- Contact is not live-verified;
- Privacy or Terms still show pre-release status;
- any public identity/contact/canonical value uses `.example`;
- robots or metadata unintentionally blocks indexing;
- a high or critical compatible-fix vulnerability remains;
- OG cards are misleading or the live platforms show stale/mismatched previews.

Current decision: **RELEASE READY AFTER OWNER CONFIG**. Repeat the checked automated suite on the real deployment configuration before release.
