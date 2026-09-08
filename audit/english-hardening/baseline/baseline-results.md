# Baseline results — 2026-08-31

Baseline commit: `f45c974fc8df7780e4c5ebdeba6d14dc3ecb5984` on `hotfix-venusbridge-co-uk`.

| Command | Exact result before edits |
| --- | --- |
| `git status --short --branch` | Clean working tree |
| `npm ci` | Exit 0; install reported two high-severity development-dependency findings and the existing `unrs-resolver` allow-scripts warning |
| `npm run format:check` | Exit 0 |
| `npm run lint` | Exit 0 |
| `npm run typecheck` | Exit 0 |
| `npm run validate:content` | Exit 0; 6 governed case records validated |
| `npm test` | Exit 0; 133 tests: 122 passed, 11 skipped, 0 failed |
| `npm run build` | Exit 0; 98 static pages |
| `npm run test:e2e` | Exit 0; 254 tests: 186 passed, 68 skipped, 0 failed in 5.7 minutes |
| `npm audit --omit=dev` | Exit 0; 0 vulnerabilities |

The baseline architecture was a Next.js static export for Cloudflare Pages, direct-only Contact, unconditional indexing in the active SEO path, one generic OG image, and an arbitrary-property measurement bus. The historical Contact code did not provide a production-safe Pages Functions delivery path.

The supplied source evidence is preserved byte-for-byte in this directory. SHA-256: rendered bilingual baseline `C58CE8C60A91A3A84192764F32DB5D5DC69B259035E87E80C421C0F478FBE636`; correction register `BE3C7BE7A55B4A376C9D869A44DBD1D28777A18AF2992EDA2663CA71116F2376`.
