# Contact Production Delivery Audit

## Commercial critical path

```text
ContactExperience
  → client/native validation
  → POST /api/contact (JSON)
  → content type and 25 KB request limit
  → exact origin/referer allow-list
  → distributed rate limit and duplicate detection
  → schema, enums, honeypot, completion-time and consent validation
  → signed HTTPS webhook with request ID
  → one retry for transient provider failure
  → success only after provider 2xx
```

Endpoint: `POST /api/contact`.

Required production configuration: `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET`, `CONTACT_ALLOWED_ORIGINS`, `RATE_LIMIT_PROVIDER=distributed`, distributed adapter URL/token, and the verified notification owner. Optional operational routing fields are documented in `.env.example`.

## Validation and abuse controls

- Unknown fields and malformed JSON are rejected.
- Required fields, email format, enums, lengths, consent, and per-intent requirements are checked server-side.
- A hidden website honeypot and minimum 2.5-second completion time reject basic automation.
- Payload size is capped before and after JSON parsing.
- Production origin validation fails closed.
- Production rate limiting fails closed unless a distributed adapter is configured.
- Duplicate fingerprints return 429.
- Provider failures return safe 502/503 responses; visitors never receive a false success state or stack trace.
- Failure logs contain request ID, reason and enquiry type, not the submitted personal data.

## Exercised failure matrix

The controlled local delivery suite covers valid English, valid Chinese, special characters, empty optional fields, missing required data, invalid email, overlong description, consent missing, honeypot, repeated submission, malformed JSON, disallowed origin, provider/API failure, browser network failure, signed delivery, retry behaviour, English success/failure UI, and Chinese success UI.

The three-step mobile interface submits the same `ContactPayload` and same endpoint as desktop; it does not maintain a separate delivery path.

## Production limitation

No real webhook, shared limiter, notification destination, deployed origin, or inbox was available during this audit. A local mock 2xx proves the application contract, not real commercial receipt.

CONTACT PRODUCTION DELIVERY: HUMAN VERIFICATION REQUIRED.

Exact procedure:

1. Configure the approved HTTPS webhook, HMAC secret, exact canonical origin(s), notification destination, and distributed limiter in the deployment provider.
2. Deploy a preview with production-equivalent server configuration but noindex behaviour.
3. Set `CONTACT_LIVE_TEST_ORIGIN` to that preview and `CONTACT_LIVE_TEST_EMAIL` to an owned test address.
4. Run `npm run verify:contact:production -- --confirm-live-test`.
5. Match the returned request ID in webhook logs, verify the HMAC signature, confirm the business notification arrived, and confirm duplicate protection returned 429.
6. Force the downstream workflow to fail and verify a safe visitor error plus an operational alert/log.
7. Only then set `CONTACT_DELIVERY_VERIFIED=true` and `DISTRIBUTED_RATE_LIMIT_VERIFIED=true`.

Launch status: BLOCKED until this procedure passes.
