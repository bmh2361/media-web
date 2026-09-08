# Production owner actions

These are the unresolved facts/configuration between implementation review and production enablement.

1. Complete `docs/legal-and-identity-owner-actions.md`, `docs/privacy-information-required.md` and `docs/terms-information-required.md`; obtain aligned bilingual legal approval.
2. Configure protected Cloudflare variables from `.env.example`, including production branch context. Run `npm run readiness:production`; do not set indexing true until the independent site-publication and legal-identity predicates pass. Optional form and analytics state must not be used to change indexing.
3. Decide whether to activate the form. If yes, complete `docs/contact-form-owner-activation-checklist.md`, Cloudflare Rate Limiting, Workers KV and an authorised receipt test. Treat them as best-effort distributed abuse protection and best-effort duplicate suppression; configure final receiver deduplication with the stable `idempotency_key`. A custom-domain mailbox is optional but must not be claimed until configured.
4. Decide whether to activate measurement and complete `docs/analytics-owner-activation-checklist.md`.
5. Review media/case evidence confirmations and the future acquisition plan; do not convert the plan into public claims.
6. Deploy through Cloudflare Pages Git integration or Wrangler, not dashboard drag-and-drop, so the root Pages Function and `out/_routes.json` are applied. Then run the read-only real-host smoke task and manually verify apex/www behaviour, canonical/hreflang, robots/sitemap, schema, core OG images, legal state, 404, console and broken images.
7. Complete and record LinkedIn, WeChat and WhatsApp preview checks.
8. Configure Search Console/Bing only after indexing is intentionally enabled; record verification rather than inferring it.
9. Enable repository secret scanning and branch/environment protection in GitHub settings. Make the repository private or split internal evidence/docs if owners require confidentiality; code cannot change repository visibility.
10. Retain the last verified Cloudflare deployment for rollback and record the deployment identifier.

Current implementation recommendation: owner configuration is still required; production and live verification are not complete.
