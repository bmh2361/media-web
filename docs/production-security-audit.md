# Production Security Audit

## Scope and result

This is a practical public-site review, not a penetration test. `npm audit --omit=dev` reports zero known production dependency vulnerabilities at the audit date. The current direct versions include Next.js 15.5.23 and Sharp 0.35.3 with patched Nanoid/PostCSS overrides.

No committed secret value was found by a targeted repository scan. `.env*` is ignored except `.env.example`, whose values are blank. No secret value is reproduced in this report.

## Application exposure

- Contact accepts JSON only and caps the declared and parsed request at 25 KB.
- Exact origin/referer validation fails closed in production.
- Unknown schema fields, invalid enums, overlong strings, malformed JSON, honeypot submissions, too-fast submissions and missing consent are rejected.
- IPs and payloads are hashed before limiter use; production requires a distributed adapter.
- Webhook requests have a UUID and optional HMAC-SHA256 signature; production validation requires the secret.
- Provider failures are retried once and logged without full enquiry content.
- `JsonLd` is the only `dangerouslySetInnerHTML` use; it serialises owned objects and escapes `<` to prevent script termination/injection.
- No dynamic open redirect, `eval`, or `new Function` use was found in public application code.

## Headers

`next.config.mjs` emits:

- Content-Security-Policy
- `X-Content-Type-Options: nosniff`
- strict-origin-when-cross-origin Referrer Policy
- restrictive Permissions Policy
- frame denial through CSP and `X-Frame-Options`
- HSTS for the production release profile

The CSP permits only self-hosted resources plus required data/blob image/media/font cases. Development alone allows `unsafe-eval`; production does not. `unsafe-inline` remains for Next.js scripts/styles and must not be removed without nonce/hash migration testing.

## Remaining controls

- Configure and verify the distributed limiter; memory mode is not production-safe.
- Confirm HSTS only after HTTPS and every intended subdomain are valid.
- Add exact analytics script/connect origins only if an approved provider is enabled.
- Configure deployment/runtime alerts and access control in the hosting account.
- Rotate immediately if any real credential has ever been committed outside the audited tree/history; history-level secret scanning remains an owner/platform action.

Status: CODE/DEPENDENCY PASS; PRODUCTION SECRET, LIMITER, TLS AND PLATFORM CONTROLS REQUIRE HUMAN CONFIGURATION.
