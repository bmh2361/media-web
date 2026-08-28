# Route, Error and Link Integrity Audit

## Error handling

- Invalid locale and unknown Case Study slugs return HTTP 404.
- A restrained bilingual locale-aware 404 now provides Home, Case Studies, Contact and alternate-language recovery paths.
- Contact validation, rate-limit, configuration and provider failures return structured safe errors without a stack trace.
- Missing Next Image assets retain framework error behaviour; canonical media validation prevents unapproved/missing paths from being marked production-ready.

## Redirects and canonical routes

Legacy capability, service, industry, expertise, agency, talent and retired case paths use permanent redirects in `next.config.mjs`. The current canonical public routes are Home, Companies, Partners, Work, How We Work, About, Contact, Privacy and Terms plus governed Case details in both languages.

## Automated link gate

Launch E2E collects internal links from every key English and Chinese route, follows redirects, and requires every destination to resolve below HTTP 400. It separately checks invalid locale/case 404 behaviour, language alternates and locale-preserving switching.

No public `#` placeholder or localhost link is part of the canonical navigation. External social links remain absent until verified values are configured.

## Production checks

- Crawl the real HTTPS host after deployment.
- Verify apex/www redirect direction has one hop.
- Recheck any configured external social/profile link.
- Treat `_rsc` prefetch cancellations caused by closing an isolated browser context as non-user-visible; investigate any other failed resource.

Status: LOCAL ROUTE ARCHITECTURE PASS; DEPLOYED-HOST CRAWL REQUIRED.
