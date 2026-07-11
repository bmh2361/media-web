# FrameBridge Studio

## Release Profiles

`RELEASE_PROFILE` is server-side only. Development defaults to `development`; the dedicated production validator never treats a missing profile as production-ready.

- `development`: placeholders and replacement guides are permitted.
- `staging`: concept models and placeholders are permitted, but public pages must not expose editorial notes.
- `production`: requires a HTTPS public URL, HTTPS webhook, HTTPS allowed origins, legal/company/contact confirmations, no development guides, and no critical placeholder media.

`PUBLIC_WORK_MODE=concept-models` is the current honest public mode. `portfolio` is blocked until at least one eligible published or anonymised record has client-approved or publicly-verifiable evidence. See [CASE_EVIDENCE_REQUIREMENTS.md](CASE_EVIDENCE_REQUIREMENTS.md).

Media records declare publication status (`placeholder`, `illustrative`, `approved`, or `restricted`) plus rights/source information. See [MEDIA_REPLACEMENT_CHECKLIST.md](MEDIA_REPLACEMENT_CHECKLIST.md).

## Validation

```powershell
npm run validate:release:staging
npm run validate:release:production
npm run test:e2e
```

The production command is expected to fail until protected production configuration and human approvals exist. Do not send a real enquiry in automation; the final production webhook delivery test is manual. See [PRODUCTION_LAUNCH_CHECKLIST.md](PRODUCTION_LAUNCH_CHECKLIST.md).

# FrameBridge Studio website

Bilingual Next.js 15 App Router website for FrameBridge Studio / 镜桥创意, covering UK commercial production, talent coordination, research and innovation, events, exhibitions, and agency support.

## Requirements and commands

Use Node.js 20 LTS or newer and npm 10 or newer.

```bash
npm ci
npm run dev
npm run format:check
npm run lint
npm run typecheck
npm run build
```

## Environment

Copy `.env.example` to `.env.local`. `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET`, and `CONTACT_ALLOWED_ORIGINS` are server-only. `CONTACT_ALLOWED_ORIGINS` is a comma-separated allowlist of absolute browser origins and is required in production; contact requests fail closed when it is absent. Without `CONTACT_WEBHOOK_URL`, the form says the brief was not delivered and offers the central email. Keep `NEXT_PUBLIC_SHOW_MEDIA_GUIDES` disabled in production. `NEXT_PUBLIC_SITE_URL` is public and controls the canonical origin.

## Bilingual content and media

Language routes live under `app/[lang]`; typed content is under `content/pages`; shared identity values are in `content/brand.ts`; route helpers are in `lib/i18n.ts`. English renders as `en-GB`, Chinese as `zh-CN`.

All media resolves through `content/media.ts`. Replace a slot by updating its stable ID there rather than editing page markup. Local abstract placeholders live under `public/media/placeholders`.

## Contact and deployment

The browser posts to `app/api/contact/route.ts`; validation, JSON content-type checks, origin controls, spam controls and size limits are server-side. Data is forwarded only when the webhook is configured. The bundled in-memory rate limiter is development and best-effort protection only in serverless deployments; use shared durable rate-limit storage for production enforcement.

Before launch: run every command above after `npm ci`; configure the site URL and webhook; disable media guides; verify approved media and case disclosures; obtain legal review of Privacy and Terms; review `npm audit`; and smoke-test both languages, sitemap, robots, keyboard navigation and the contact fallback.
