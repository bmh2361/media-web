# Phase 9 — Venus Bridge Media brand refresh

Date: 17 July 2026  
Scope: brand replacement, logo system, Header, homepage Hero, SEO, accessibility, performance and responsive QA.

## Outcome

The public site now presents **Venus Bridge Media** as a London-based bilingual creative production, talent and UK execution company. The old public FrameBridge identity has been removed, the four supplied logo artworks have been converted into a governed web asset system, and the homepage Hero has been rebuilt around a business-relevant Production System Canvas.

The codebase is buildable and staging-ready. Production remains deliberately fail-closed until real company, legal, contact, media and release confirmations are supplied.

## 1. Source logo audit and mapping

The four source files in `D:\media pics\media logo` were inspected by pixels and metadata rather than by filename. Source files were not changed.

| Source                                         | Metadata                      | Pixel finding                                                   | Semantic role           | Primary web output                                          |
| ---------------------------------------------- | ----------------------------- | --------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------- |
| `ChatGPT Image 2026年7月17日 19_52_01 (1).png` | PNG, 1254×1254, RGB, no alpha | VB monogram; grey/white checkerboard baked into pixels          | Mark                    | `/brand/venus-bridge-media/vbm-monogram-gold.png`           |
| `ChatGPT Image 2026年7月17日 19_52_01 (2).png` | PNG, 1448×1086, RGB, no alpha | Monogram and Venus Bridge Media name on opaque ivory            | Name lockup             | `/brand/venus-bridge-media/vbm-lockup-name.png`             |
| `ChatGPT Image 2026年7月17日 19_52_02 (3).png` | PNG, 1448×1086, RGB, no alpha | Name with `BRIDGING VISION. ELEVATING BRANDS.` on opaque ivory  | Tagline lockup          | `/brand/venus-bridge-media/vbm-lockup-tagline.png`          |
| `ChatGPT Image 2026年7月17日 19_52_02 (4).png` | PNG, 1448×1086, RGB, no alpha | Complete name and slogan lockup; checkerboard baked into pixels | Full transparent lockup | `/brand/venus-bridge-media/vbm-lockup-full-transparent.png` |

None of the supplied PNGs contained an alpha channel. The processor removes ivory/white/checker pixels into real alpha, trims excess canvas, retains the original proportions, adds controlled safe space, and produces 1×/2× and dark-surface variants. Edges were visually inspected after processing. No low-resolution SVG tracing was used.

The approved name artwork also supplies a derived horizontal Header wordmark at `/brand/venus-bridge-media/vbm-wordmark-name.png`; it is a crop of the supplied artwork, not a redrawn logo. App icons and favicon derivatives are included. Full dimensions, alpha status and byte sizes are recorded in `public/brand/venus-bridge-media/asset-report.json`.

The process is reproducible with `node scripts/process-venus-brand-assets.mjs` and uses the direct Sharp development dependency. Runtime code contains no absolute source-drive path.

## 2. Final logo paths

- Mark: `/brand/venus-bridge-media/vbm-monogram-gold.png` and `@2x`
- Name lockup: `/brand/venus-bridge-media/vbm-lockup-name.png` and `@2x`
- Tagline lockup: `/brand/venus-bridge-media/vbm-lockup-tagline.png` and `@2x`
- Full transparent lockup: `/brand/venus-bridge-media/vbm-lockup-full-transparent.png` and `@2x`
- Header wordmark: `/brand/venus-bridge-media/vbm-wordmark-name.png` and `@2x`
- Dark-surface lockups: matching `-dark` and `-dark@2x` files
- Icons: `/brand/venus-bridge-media/vbm-favicon-64.png`, `vbm-app-icon-192.png`, `vbm-app-icon-512.png`

All displayed logo dimensions are explicit. Header assets use `next/image`, priority only where justified, responsive `sizes`, and accessible brand naming.

## 3. Brand replacement and system

- Public `FRAMEBRIDGE`, `FrameBridge`, old metadata, schema, contact protocol names, Footer branding, alt text and navigation labels were replaced.
- Internal legacy property keys such as `frameBridgeRole` remain because they are non-public schema identifiers; renaming them would add migration risk without changing the website brand.
- Central configuration is in `lib/brand/venusBridgeMedia.ts`.
- Reusable `BrandLogo`, `BrandMark` and `BrandLockup` components govern mark/name/tagline/full-transparent and light/dark usage.
- Sampled logo gold is `#cca672`. Core surfaces are rich black `#0a0b0d`, graphite `#15171a` and soft ivory `#f4f0e8`. Darker functional gold and stone values are used on light surfaces to meet WCAG contrast without altering the logo artwork.
- Gold is limited to identity, small labels, lines, CTA state and the bridge path; no large metallic or gold-gradient surface was introduced.
- Public legal wording is exact: “Venus Bridge Media is a trading name of Vivian Adventure Ltd.” / “Venus Bridge Media 为 Vivian Adventure Ltd 旗下业务品牌。”

## 4. Header

- Desktop: 80px dark integrated Header, supplied mark plus horizontal wordmark, restrained navigation, gold current-state line, language switch and `Start a Project` / `提交项目` CTA.
- Mobile: 72px Header with monogram only, language switch and menu; the expanded dialog shows the complete tagline lockup and slogan.
- Scrolled state adds a translucent dark surface, light blur and fine border.
- Keyboard Escape, focus return and focus trapping are implemented. Interactive targets are at least 44×44px.
- Opening mark and Footer use their appropriate variants rather than repeating every logo on one page.

## 5. Hero design and copy

No approved public Hero photography was available. The old unrelated placeholder geometry was therefore replaced with a **Production System Canvas** containing four connected capability nodes:

1. Campaign Content
2. Talent & Casting
3. Events & Experiences
4. UK Production

The supplied monogram becomes a low-contrast structural watermark and its bridge curve becomes the connecting production path. Only three production tokens remain: location, aspect ratio and delivery state. No flags, globe network or fake client media were introduced.

The desktop Hero uses a balanced 12-column 6/6 structure. Mobile becomes natural document flow with the canvas after the copy. The headline is one fluid text string—there are no authored line fragments.

English copy:

- `LONDON-BASED · BILINGUAL · UK DELIVERY`
- `Creative production, talent and UK execution — coordinated from London.`
- `For Chinese brands, agencies and international teams delivering campaigns, content, events and on-the-ground production across the UK.`
- `Start a UK project` / `Explore capabilities`

Chinese copy:

- `伦敦本地 · 中英双语 · 英国交付`
- `从伦敦出发，统筹创意制作、人才与英国本地执行。`
- `服务中国品牌、代理与国际团队，完成广告内容、人才统筹、活动执行及英国本地制作。`
- `提交英国项目` / `查看服务能力`

English and Chinese use separate `clamp()`, line-height and max-width rules. Automated line-count tests enforce no more than four desktop English lines, three desktop Chinese lines and five mobile lines.

## 6. Homepage continuity

The sections below the Hero now continue the black/ivory editorial rhythm, fine champagne details and commercial outcome language. Four primary capabilities lead the page; Research & Innovation remains a specialist secondary capability rather than a fifth equal homepage pillar. Unapproved media remains explicitly governed as production scenarios/placeholders and is not presented as client work.

## 7. Motion and performance

- First-visit overlay resolves in 410ms; it never blocks interaction for 1.5s.
- Bridge drawing and node activation complete within the requested 900–1200ms envelope; there is no infinite floating or large parallax.
- `prefers-reduced-motion` immediately presents the completed static state.
- The H1 is server-visible immediately and is not hidden pending hydration, reducing Slow 4G LCP from 2612ms to 680ms in the project audit.
- Opening the mobile menu prefetches the visible Work destination, reducing the audited route transition from 853ms to 492ms without adding initial-page prefetch cost.
- Final performance audit: LCP 680ms on 390px Slow 4G/4× CPU, CLS 0.00009, INP 48ms, route transition 492ms, 0 visible overflow and 0 broken images. All configured budgets pass.

## 8. SEO and accessibility

- Title, description, site name, Open Graph/Twitter content, Organization JSON-LD, logo ImageObject, manifest, favicon and app icons use Venus Bridge Media.
- Language alternates and 1200×630 OG contracts remain intact.
- Header and Logo semantics include accessible brand names.
- Release matrix reports zero moderate-or-higher Axe findings on representative desktop and mobile routes.
- One `main`, one H1, a polite route announcement, skip link, language semantics, keyboard menu behavior, touch sizing and image decode are verified.

## 9. Responsive and visual QA

Automated coverage includes the required 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920 widths across the release and brand suites. Dedicated bilingual full-page captures are saved at 390, 768, 1440 and 1920. Checks cover Logo decode, Header targets, Hero line count, first-viewport CTA, menu operation and genuine element-boundary overflow.

Key captures:

- `audit/phase-9-brand/en-home-390.png`
- `audit/phase-9-brand/zh-home-390.png`
- `audit/phase-9-brand/en-home-1440.png`
- `audit/phase-9-brand/zh-home-1440.png`

Stable Playwright baselines are stored under `e2e/visual-regression.spec.ts-snapshots/` and pass on a clean rerun.

## 10. Verification results

| Command                                                                | Result                                                           |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `npm run format`                                                       | Passed                                                           |
| `npm run format:check`                                                 | Passed in final gate                                             |
| `npm run lint`                                                         | Passed, zero warnings                                            |
| `npm run typecheck`                                                    | Passed                                                           |
| `npm test`                                                             | 18/18 passed                                                     |
| `npm run build`                                                        | Passed; 48 static pages; homepage 181kB first load, 102kB shared |
| `node scripts/run-playwright-production.mjs e2e/release.spec.ts`       | 17 passed, 1 intentional desktop/mobile-only skip                |
| `node scripts/run-playwright-production.mjs e2e/brand-refresh.spec.ts` | 9 passed, 9 duplicate-project skips                              |
| `npm run test:motion`                                                  | 12 passed, 2 viewport-specific skips                             |
| `npm run test:contact`                                                 | 10 delivery/security assertions passed                           |
| `npm run audit:visual`                                                 | 4/4 passed                                                       |
| `npm run audit:performance`                                            | All budgets passed                                               |
| `npm run validate:release:staging`                                     | Passed with explicit content/config warnings                     |
| `npm run validate:release:production`                                  | Correctly blocked by missing real production inputs              |

## 11. Primary modified files

- Brand assets and processing: `scripts/process-venus-brand-assets.mjs`, `public/brand/venus-bridge-media/*`, `app/icon.png`, `app/apple-icon.png`
- Brand architecture: `lib/brand/venusBridgeMedia.ts`, `components/brand/*`, `content/brand.ts`, `content/company.ts`
- Header/Footer/opening: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/motion/OpeningSequenceProvider.tsx`
- Hero: `components/sections/Hero.tsx`, `components/sections/ProductionSystemCanvas.tsx`, `content/pages/home.ts`
- Global visual system: `app/globals.css`, `tailwind.config.ts`
- SEO/app identity: `app/[lang]/layout.tsx`, `app/manifest.ts`, `app/og/[lang]/[page]/route.tsx`, `lib/seo.ts`, `lib/structured-data.ts`
- Brand propagation: public page/content/contact files under `app`, `components`, `content`, `lib/contact` and `lib/release.ts`
- Tests and evidence: `tests/content-contract.test.mjs`, `e2e/brand-refresh.spec.ts`, `e2e/release.spec.ts`, `e2e/visual-regression.spec.ts`, `audit/phase-9-brand/*`

## 12. Required user confirmations before production

The following were not invented and still block production:

- Real HTTPS site domain and allowed contact origins.
- Real HTTPS contact delivery endpoint/secret and a production distributed rate-limit provider.
- Vivian Adventure Ltd legal name confirmation, company number, registered office, privacy effective date and terms effective date.
- Legal approval of Privacy and Terms.
- Approved public media and rights/source metadata for 13 critical Hero/industry/project slots.
- Decision for `PUBLIC_WORK_MODE`: `hidden`, `scenarios` or `portfolio`.
- Confirmation of public case evidence, social profiles and contact channels.
- The seven production human-confirmation flags only after the corresponding real-world checks are complete.

The production validator will remain red until these factual inputs are supplied; staging validation remains green.
