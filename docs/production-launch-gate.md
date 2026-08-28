# Production Launch Gate

Assessment date: 26 August 2026  
Decision: **NOT READY FOR PRODUCTION**

| Gate             | Status       | Blocker                                                                                                                                           | Human action                                                                                         | Severity      |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------- |
| Deployment       | BLOCKED      | No production project, immutable deployment ID, CI binding or rollback rehearsal.                                                                 | Create the managed Next.js project, deploy the tagged candidate and record build/rollback evidence.  | P0            |
| Contact delivery | BLOCKED      | Real provider/inbox receipt, forced-failure alert and production distributed limiter are unverified. Local contract passes 19/19.                 | Configure credentials/limiter; witness EN/ZH receipt, duplicate defence and a forced failure alert.  | P0            |
| SEO              | BLOCKED      | Local metadata/robots/sitemap/schema pass, but canonical host and production approvals are absent; indexing remains fail-closed.                  | Configure the real origin and release flags; rerun the production validator and inspect live output. | P0 dependency |
| Analytics        | BLOCKED      | No approved provider adapter, property ID or consent decision.                                                                                    | Choose/approve one provider or formally launch with analytics disabled.                              | P1            |
| Performance      | BLOCKED      | Home-to-Work measured 922 ms on emulated slow 4G against an 800 ms local route budget; field data is absent.                                      | Optimise or accept with named owner/deadline; verify preview and field vitals.                       | P1            |
| Security         | PASS         | Application controls and zero production dependency vulnerabilities pass locally; live platform controls remain part of Deployment/Contact gates. | Verify TLS, headers, secret injection and distributed limiting on the live host.                     | P0 dependency |
| Privacy / legal  | BLOCKED      | Legal identity, dates, public emails and qualified approval are incomplete. No non-essential tracking is active.                                  | Complete legal review and configure only approved details/statuses.                                  | P1            |
| Domain / HTTPS   | BLOCKED      | Canonical apex/www choice, DNS, certificate, redirect and mixed-content state cannot be verified.                                                 | Configure and test both hostnames and the single canonical HTTPS redirect.                           | P0            |
| Links / errors   | PASS         | None locally. Internal crawl and bilingual branded generic 404 pass.                                                                              | Check live external destinations and redirects on preview.                                           | P2            |
| Accessibility    | PASS         | No serious/critical automated findings in settled desktop/mobile states.                                                                          | Complete physical assistive-technology/device spot checks.                                           | P2            |
| Monitoring       | BLOCKED      | No external uptime/runtime/contact alert or named responder has been tested.                                                                      | Configure alerts, ownership and test acknowledgements.                                               | P1            |
| Rollback         | BLOCKED      | Runbook exists; release tag, immutable deployment and drill do not.                                                                               | Tag the candidate and record one rollback rehearsal.                                                 | P1            |
| Real-device      | HUMAN TEST   | Physical iOS Safari and Android Chrome evidence is unavailable.                                                                                   | Complete and sign the real-device checklist.                                                         | P1            |
| Truth / rights   | HUMAN REVIEW | Repository registries are internally consistent; source contracts, approvals and releases were unavailable.                                       | Review retained evidence and sign the truth/rights gate; remove unsupported material.                | P0            |

## P0 blockers

1. Review/commit the candidate and create an immutable `v1.0.0-rc1` checkpoint.
2. Create the production host and verify deployment, TLS, canonical redirect and rollback.
3. Configure a production distributed Contact limiter and signed webhook delivery.
4. Prove real English and Chinese enquiries reach the intended destination exactly once and forced provider failure alerts an owner.
5. Complete legal/company identity and public-channel approvals.
6. Sign the commercial truth/media-rights gate against source evidence.
7. Run `npm run validate:release:production` until it has no failed checks.

## Remaining priorities

- P1: 922 ms slow-4G route budget, analytics decision, external monitoring, rollback drill, production performance/social preview and physical-device QA.
- P2: live external-link confirmation and assistive-technology spot checks.
- P3: post-launch field-informed optimisation only; no speculative redesign.

The launch owner may change the decision to `READY` only when every P0 is PASS, human evidence is attached, and each remaining P1 has an explicit owner. Until then robots and release validation must remain fail-closed.
