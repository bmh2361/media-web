# Production Deployment Architecture

## Decision

No production hosting configuration, project binding, deployment workflow, or confirmed hostname exists in the repository. The technically preferred launch path is a managed native Next.js deployment, with Vercel Pro as the reference implementation for this commercial site. This is a recommendation, not an account-level change.

Vercel is the lowest-change option because it natively supports the current App Router build, route handlers, generated Open Graph images, `next/image` optimisation/CDN delivery, preview deployments, environment scoping, custom domains, HTTPS, and deployment rollback. The Hobby plan is described by Vercel as personal/non-commercial; a business launch should use an appropriate commercial plan and confirm current usage-based transfer, image transformation, and function costs.

Official references:

- https://vercel.com/docs/frameworks/full-stack/nextjs
- https://vercel.com/docs/image-optimization
- https://vercel.com/docs/cli/rollback
- https://vercel.com/pricing

Cloudflare Workers is a possible alternative, but it currently requires an adapter/runtime migration and compatibility validation. That is unnecessary launch risk for this already-approved Next.js 15 release. A self-hosted Node server is compatible but would transfer CDN, image cache, TLS, health, scaling, logging, and rollback ownership to the operator.

## Current application requirements

- Framework: Next.js 15.5.23 App Router, React 19, TypeScript.
- Rendering: statically generated bilingual pages and portfolio routes, dynamic `/api/contact`, metadata routes, and an Edge Open Graph image route.
- Image delivery: local public WebP/AVIF variants plus Next Image optimisation.
- Server runtime: required. Static export is rejected because it would remove the Contact route handler and native image/runtime behaviour.
- Media: versioned files in `public/media`; future portfolio growth increases repository/build/CDN volume.
- Persistence: none in the application. Contact delivery is delegated to a signed HTTPS webhook; rate limiting requires a distributed external adapter in production.

## Production topology

```text
Canonical HTTPS host
  → managed CDN / edge cache
    → Next.js static and dynamic routes
      → image optimisation/cache
      → /api/contact
        → distributed rate limiter
        → signed HTTPS contact webhook
          → owned notification/workflow destination
```

## Required deployment settings

- Connect the reviewed release repository and production branch.
- Use the repository `npm run build` command and supported Node runtime.
- Store every `.env.example` production value in encrypted environment settings; never commit values.
- Separate Preview and Production environments. Preview must remain noindex.
- Set one real `NEXT_PUBLIC_SITE_URL` canonical origin and redirect the other apex/www hostname to it with a permanent redirect.
- Enable automatic HTTPS and validate the full certificate chain.
- Retain immutable deployment history and record the last known-good deployment ID.
- Apply budget alerts for transfer, image transformations, and function usage.
- Keep media filenames immutable or purge transformed-image caches when replacing content in place.

## Cache and error behaviour

Static assets and hashed Next.js assets are CDN-cacheable. HTML/route handling remains under Next.js defaults. Contact responses are dynamic and must not be cached. Error logs must retain request IDs without enquiry payloads. Security headers are emitted by `next.config.mjs`; HSTS is enabled only for a production release profile.

## Status

Architecture: DECIDED.

Production deployment, domain, HTTPS, redirects, environment variables, preview validation, and rollback exercise: HUMAN ACTION REQUIRED.
