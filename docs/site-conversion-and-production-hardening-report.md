# Site conversion and production hardening report

## Implemented

- Source-faithful British English corrections across core and case routes, backed by a prohibited/required phrase audit and 21-route visible-copy export.
- Central brand/legal configuration and a structured but incomplete legal-content model; owner-empty builds remain pending.
- Direct contact plus a disabled-by-default accessible enquiry form and Cloudflare Pages Function with strict validation, Turnstile, origin/body controls, best-effort distributed abuse protection, best-effort KV duplicate suppression, stable receiver idempotency keys, HMAC delivery and safe errors.
- Separate site-publication, legal-identity, optional-contact and optional-analytics predicates. Form or analytics availability cannot change indexing. Preview builds fail closed to noindex and require explicit isolated bindings before form exposure.
- One-hop redirects with generated matrix, 42 versioned route/language OG cards, and allowlisted no-op-by-default measurement adapter.
- Shareable validated Work category queries with refresh and browser Back restoration while preserving the existing mobile activation algorithm.
- Future evidence intake, CI English/redirect/OG/audit/readiness checks, Dependabot, CodeQL and a read-only post-deploy smoke workflow.

## Intentionally not completed

No legal facts, legal approval, delivery receipt, analytics provider, Search Console/Bing verification, social platform preview, real-user CWV result or production deployment was invented. Local default builds are non-indexable by design; the real production index state must not change until protected Cloudflare variables pass strict readiness.

Fonts were not bundled because no approved licensed source was supplied. Historic audit documents were retained in place to avoid breaking references; README identifies them as historical rather than current operational instructions.
