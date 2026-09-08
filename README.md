# Venus Bridge website

Bilingual Next.js 15 App Router site for **Venus Bridge · Global Partnerships**. It is statically exported to Cloudflare Pages; optional enquiry delivery uses a Cloudflare Pages Function and is disabled unless every legal, identity, delivery and anti-abuse gate is configured.

## Local commands

Use Node.js 22 and npm 10 or newer.

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run validate:content
npm run audit:english-fidelity
npm test
npm run build
npm run export:bilingual-copy
npm run validate:redirects
npm run validate:og
npm run test:e2e
```

`npm run build` runs the deterministic OG generator and `next build`. Cloudflare Pages must use that command and publish `out/`. The Next.js build uses `output: "export"`; no Next.js server or `app/api` route exists.

## Release and indexing

Copy `.env.example` to `.env.local` only for local work. Never commit values. `npm run readiness:report` lists missing owner inputs; `npm run readiness:production` is the strict protected gate. Production metadata, robots, sitemap and Organization schema fail closed until `isSitePublicationReady()` and the indexing request pass. Legal identity, optional form exposure and optional analytics use the separate `isLegalIdentityReady()`, `isContactFormReady()` and `isAnalyticsReady()` predicates. Disabling the form or analytics does not disable indexing. Non-production builds and Cloudflare preview branches are noindex. `functions/_middleware.ts` also adds `X-Robots-Tag: noindex, nofollow` on `*.pages.dev`, including Function responses.

The root redirect remains temporary (`307`) because `/` is a language-entry decision, while retired public routes use direct permanent (`308`) language-preserving destinations. Validate the generated matrix after every build.

## Contact delivery

Direct email and WeChat remain available in every build. The structured form is compiled into Contact only when `NEXT_PUBLIC_CONTACT_FORM_ENABLED`, legal/identity readiness, the Turnstile site key, confirmed channels and verified delivery all pass. `/api/contact` is implemented by `functions/api/contact.ts` and fails closed unless the runtime has:

- the variables documented in `.env.example`;
- a Cloudflare Rate Limiting binding named `CONTACT_RATE_LIMITER`;
- a KV namespace binding named `CONTACT_DEDUPLICATION`;
- an HTTPS signed delivery webhook and an exact origin allowlist.

The endpoint enforces JSON/body limits, a strict schema, sanitisation, honeypot/timing checks, Turnstile verification, HMAC signing and safe errors. Cloudflare Rate Limiting provides best-effort distributed abuse protection; Workers KV provides best-effort duplicate suppression, not atomic or exactly-once delivery. The signed receiver receives a stable `idempotency_key` and must perform final deduplication. The Function does not log enquiry data. A real receipt test is a manual owner action and must use an authorised destination. Preview form delivery also fails closed unless both build-time and runtime preview-binding confirmations are explicit.

## Measurement

Components emit only allowlisted non-sensitive events through `lib/measurement.ts`. Delivery remains a no-op unless an approved adapter, provider ID and privacy approval are configured. Form values, full referrers and contact identifiers are forbidden analytics properties.

## Content and evidence

Chinese is the authoritative source. `combined.md` and `issues.md` are preserved as dated evidence under `audit/english-hardening/baseline/`; the final 21-route visible-copy export is generated under `audit/english-hardening/final/`. Existing portfolio records keep their evidence boundaries. The future commercial intake schema in `content/evidence/case-evidence.ts` does not relabel historic visual-documentation cases.

Current operational documents are the owner checklists and hardening reports named in `docs/production-owner-actions.md`. Older `docs/phase-*` files are retained as historical audit evidence; they are not current deployment instructions.

## Deployment and rollback

Use the protected production-readiness workflow before a Cloudflare production deployment. Deploy this hybrid static export plus root `functions/api/contact.ts` through Cloudflare Pages Git integration or Wrangler so `/api/contact` is installed as a Pages Function; dashboard drag-and-drop is not supported for this build. Generated `out/_routes.json` includes only `/api/contact` in the Function surface and leaves `/en`, `/zh`, `/_next/static/*`, `/media/*` and `/og/*` static. After deployment, run the read-only post-deploy smoke workflow against the real HTTPS origin, then complete the manual legal, contact receipt and social-preview checks. Roll back by selecting the last verified Cloudflare Pages deployment; do not change DNS or indexing flags as an improvised rollback.
