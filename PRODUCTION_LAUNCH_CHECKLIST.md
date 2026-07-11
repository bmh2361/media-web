# Production Launch Checklist

## Automated Technical Gates

- [ ] `npm run format:check`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run validate:content`
- [ ] `npm test`
- [ ] `npm run validate:release:staging`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm audit --omit=dev` assessed
- [ ] `npm run validate:release:production` passes with protected production configuration

## Human Approval Gates

- [ ] Legal review of Privacy and Terms
- [ ] Public company and leadership details confirmed
- [ ] Client evidence and disclosure permission confirmed for every portfolio case
- [ ] Media rights and logo permission confirmed for every public asset
- [ ] Production contact webhook delivery tested manually
- [ ] Final desktop and mobile browser review completed

Do not mark a human gate complete from source code or CI alone.
