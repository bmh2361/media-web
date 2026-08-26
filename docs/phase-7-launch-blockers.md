# Phase 7 Launch Blockers

Production publication remains blocked by:

1. Thirteen critical media assets remain placeholders and are not approved.
2. Six public project records remain clearly disclosed concept models; no verified portfolio evidence exists.
3. `RELEASE_PROFILE=production`, `PUBLIC_WORK_MODE` and the canonical HTTPS production domain are unset.
4. The production contact webhook, signature secret, notification route and allowed HTTPS origins are not configured.
5. A controlled live delivery test to the real production destination has not completed.
6. Legal company name, company number and registered office are missing.
7. Privacy and Terms approval statuses and effective dates are missing.
8. Legal, public-company-detail and contact-delivery human confirmation flags remain unset.
9. Final mobile hero media has not been compressed and retested against the 3,000 ms slow-4G LCP target.
10. The process-local rate limiter is not suitable for a multi-instance or serverless production deployment.

## Intentional production failures

`npm run validate:release:production` currently fails with 28 actionable checks. `npm run validate:media:production` lists all thirteen unapproved critical media IDs and their routes.

Do not:

- mark placeholders approved
- invent company details
- enable portfolio mode without evidence
- set legal confirmation flags before review
- treat the local mock webhook test as a real customer-delivery test
- publish heavy final media without the production CDN retest
