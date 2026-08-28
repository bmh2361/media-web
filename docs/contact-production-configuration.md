# Contact Production Configuration

## Required environment

| Variable                           | Purpose                                          |
| ---------------------------------- | ------------------------------------------------ |
| `CONTACT_WEBHOOK_URL`              | Primary validated brief destination              |
| `CONTACT_WEBHOOK_SECRET`           | HMAC signature secret                            |
| `CONTACT_ALLOWED_ORIGINS`          | Exact allowed production origins                 |
| `CONTACT_NOTIFICATION_DESTINATION` | Non-secret routing label or internal destination |
| `NEXT_PUBLIC_SITE_URL`             | Canonical production domain                      |
| `CONTACT_ERROR_MONITORING_DSN`     | Optional server-side monitoring destination      |
| `CONTACT_CRM_WEBHOOK_URL`          | Optional secondary CRM integration               |
| `CONTACT_EMAIL_PROVIDER`           | Optional provider identifier                     |
| `CONTACT_FILE_UPLOAD_PROVIDER`     | Optional future upload provider                  |

Do not commit secret values.

## Delivery behaviour

- Server validation rejects unknown fields and invalid enums.
- Honeypot and minimum-completion-time checks run before delivery.
- Origin/referer validation fails closed in production.
- Payload size is limited.
- Duplicate and rate-limit checks run before provider delivery.
- Webhooks receive an HMAC signature and request identifier.
- Retry occurs once for transient server/provider failures.
- Logs contain request ID, failure reason and enquiry type, not the full payload.
- Users receive a safe error and reference ID.

## End-to-end test

Run `npm run test:contact` after `npm run build`.

The test uses a local mock endpoint and verifies:

- valid Quick Enquiry;
- valid Full Project Brief;
- invalid payload;
- honeypot rejection;
- origin rejection;
- provider failure and retry;
- browser confirmation state;
- browser-visible failure state;
- request ID and signature delivery.

A passing local test does not prove the real production destination works. Set `CONTACT_DELIVERY_VERIFIED=true` only after a controlled live test.

## Remaining production decision

The in-memory rate limiter is not globally shared. Use durable storage for multi-instance or serverless production.
