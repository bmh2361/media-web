# Venus Bridge release-closure owner actions

Status: **OWNER CONFIGURATION REQUIRED**  
Rule: do not copy the test-only values used by automated checks. Supply exact approved production facts and retain the approval evidence outside this repository.

## 1. Production identity and public mode

Owner: business owner + deployment owner

- Confirm the final HTTPS hostname and set `NEXT_PUBLIC_SITE_URL` to its origin, with no path or trailing placeholder domain.
- Set `RELEASE_PROFILE=production` only in the real production deployment.
- Set `PUBLIC_WORK_MODE=portfolio`. The release validator rejects conceptual or hidden Work modes for this approved real-project release.
- Confirm that every intended public case and its media still has current publication, rights and client/legal approval records; only then set `APPROVED_MEDIA_CONFIRMED=true` and `PUBLIC_CASE_EVIDENCE_CONFIRMED=true`.
- Confirm the one monitored public business email and any other published channels; only then set `CONTACT_CHANNELS_CONFIRMED=true`.

Do not set any confirmation merely to make validation pass.

## 2. Legal and company identity

Owner: company director + appropriately qualified reviewer

Supply the exact approved values:

- `NEXT_PUBLIC_LEGAL_COMPANY_NAME`
- `NEXT_PUBLIC_PRIVACY_CONTROLLER_NAME`
- `NEXT_PUBLIC_COMPANY_NUMBER`
- `NEXT_PUBLIC_REGISTERED_OFFICE`
- `NEXT_PUBLIC_BUSINESS_EMAIL`
- `NEXT_PUBLIC_PRIVACY_EMAIL`
- `NEXT_PUBLIC_PRIVACY_EFFECTIVE_DATE` in `YYYY-MM-DD` form
- `NEXT_PUBLIC_TERMS_EFFECTIVE_DATE` in `YYYY-MM-DD` form

After the final bilingual notices and displayed identity have been reviewed, set:

- `NEXT_PUBLIC_LEGAL_APPROVAL_STATUS=approved`
- `NEXT_PUBLIC_TERMS_APPROVAL_STATUS=approved`
- `LEGAL_REVIEW_CONFIRMED=true`
- `PUBLIC_COMPANY_DETAILS_CONFIRMED=true`

Until all of these gates are complete, Privacy and Terms deliberately retain pre-release language, legal/controller details stay hidden, structured Organization data stays absent, and the site stays noindex. This is implementation hygiene, not legal advice.

## 3. Production Contact delivery

Owner: operations owner + deployment owner

1. Select the approved workflow/email/CRM destination and configure its HTTPS endpoint as `CONTACT_WEBHOOK_URL`.
2. Generate a private signing value and configure `CONTACT_WEBHOOK_SECRET`. Verify the receiver checks `x-venus-bridge-signature` against the exact request body using HMAC-SHA256.
3. Set `CONTACT_ALLOWED_ORIGINS` to the exact comma-separated HTTPS production origins that may submit the form.
4. Select a shared/distributed rate-limit service. The repository does not choose a vendor. Configure a compatible HTTPS adapter with:
   - `RATE_LIMIT_PROVIDER=distributed`
   - `RATE_LIMIT_DISTRIBUTED_URL`
   - `RATE_LIMIT_DISTRIBUTED_TOKEN`
   - request contract: `{ key, fingerprint, limit, windowMs }`
   - response contract: `{ "ok": true }` or `{ "ok": false, "reason": "rate_limited" | "duplicate" }`
5. Verify the shared limiter across more than one deployed instance, then set `DISTRIBUTED_RATE_LIMIT_VERIFIED=true`.
6. Run the guarded live test from an authorised environment:

   ```powershell
   $env:CONTACT_LIVE_TEST_ORIGIN='https://YOUR-APPROVED-HOST'
   $env:CONTACT_LIVE_TEST_EMAIL='YOUR-MONITORED-TEST-INBOX'
   npm run verify:contact:production -- --confirm-live-test
   ```

7. Confirm the returned request ID arrived in the approved workflow, the signature was valid, the notification reached the operational owner, failure alerting works, and retention/deletion handling matches the approved Privacy notice.
8. Only after that real deployment test, set `CONTACT_DELIVERY_VERIFIED=true`.

Current status: `CONFIGURATION REQUIRED`. The local delivery harness is not a substitute for real receipt verification.

## 4. Contact fallback

The code displays one fallback email only when `NEXT_PUBLIC_BUSINESS_EMAIL` is non-placeholder and `CONTACT_CHANNELS_CONFIRMED=true`. Confirm that inbox is monitored before enabling the flag. No response-time SLA has been invented; the visible expectation is deliberately non-time-specific.

## 5. Privacy-reviewed measurement

Owner: marketing/sales owner + privacy reviewer + deployment owner

Current status: `ANALYTICS_PROVIDER_REQUIRED`.

- Select the provider, legal basis/consent behavior, retention period, access owner and reporting owner.
- Connect the approved provider to the browser event `venus-bridge:measurement`.
- Preserve the existing allowlisted event model: page path, locale, privacy-safe source classification, UTM source/medium/campaign, CTA destination, case slug/category, contact intent/start/success/error.
- Never add names, emails, organisations, form text, contact details, full referrer URLs or other free-form enquiry data.
- After privacy approval and provider integration, set `NEXT_PUBLIC_ANALYTICS_PROVIDER`, `NEXT_PUBLIC_ANALYTICS_PRIVACY_APPROVED=true`, and `NEXT_PUBLIC_ANALYTICS_ENABLED=true`.
- If measurement is not approved, leave it disabled. The release validator fails if analytics is enabled without both provider and privacy approval.

## 6. Real-host release checks

Owner: deployment owner + sales/operations owner

- Confirm DNS, TLS, `www`/apex redirects and canonical host behavior.
- Inspect `/robots.txt`, `/sitemap.xml`, canonical/hreflang, Organization schema, icons and all canonical redirects on the real hostname.
- Share EN/ZH Home, Companies, Work and About links through LinkedIn and WeChat. Confirm image, title, language and cached preview; refresh platform caches if necessary.
- Submit the controlled live enquiry and verify real receipt before public launch.
- Run the commands in `docs/release-closure-checklist.md` against the exact deployment configuration.

## Release decision

The codebase is **RELEASE READY AFTER OWNER CONFIG**. It is not authorised for public release while the current owner-empty production validator fails, legal pages remain pre-release, Contact is not live-verified, or live social previews have not been checked.
