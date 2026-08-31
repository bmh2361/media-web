# Contact form owner activation checklist

The direct email and WeChat fallback is the only active delivery path until every item below is completed.

- [ ] Complete and legally review aligned EN/ZH Privacy and Terms notices.
- [ ] Confirm public legal identity and controller configuration.
- [ ] Confirm the public business/privacy email and WeChat channel.
- [ ] Create Turnstile keys for the real and preview hostnames; store the secret only in Cloudflare.
- [ ] Configure an HTTPS workflow endpoint and HMAC secret; verify signature checking at the receiver.
- [ ] Set an exact `CONTACT_ALLOWED_ORIGINS` allowlist.
- [ ] Bind Cloudflare Rate Limiting as `CONTACT_RATE_LIMITER` and KV as `CONTACT_DEDUPLICATION`.
- [ ] Configure the receiver to perform final deduplication using the signed stable `idempotency_key`; KV is only best-effort duplicate suppression and is not atomic or exactly-once.
- [ ] Set Function runtime gates `CONTACT_FORM_ENABLED`, `CONTACT_DELIVERY_VERIFIED` and `CONTACT_CHANNELS_CONFIRMED` only after a controlled receipt test.
- [ ] Set build gates `NEXT_PUBLIC_CONTACT_FORM_ENABLED` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, rebuild and inspect both languages.
- [ ] Test validation, keyboard focus, Turnstile, duplicate/rate failure, safe fallback and authorised receipt without using real customer data.
- [ ] Confirm retention, deletion, processor and international-transfer wording with legal counsel.
- [ ] If the form is required on a preview, use isolated test destinations and set both `PREVIEW_CONTACT_BINDINGS_CONFIRMED` and `CONTACT_PREVIEW_BINDINGS_CONFIRMED`; otherwise keep it hidden and fail-closed.

Cloudflare Rate Limiting and Workers KV provide best-effort distributed abuse protection and best-effort duplicate suppression. They do not provide exact distributed limiting, strict global duplicate prevention or exactly-once delivery. Do not log enquiry bodies or send a real enquiry from CI. Roll back by disabling the public and runtime form gates; direct contact remains available and site indexing is unchanged.
