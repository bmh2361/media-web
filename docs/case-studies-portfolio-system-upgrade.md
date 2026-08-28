# Case Studies & Portfolio System Upgrade

## Removed projects

The previous public records `teal-editorial-series`, `commercial-fashion-styling`, and `creative-beauty-makeup` are no longer part of the canonical project dataset or active media manifest. Their localized URLs permanently redirect to `/[lang]/work`. Active capability and industry references now use the new portfolio records.

## New projects

Six supplied groups were integrated from `D:\media web\作品集`, comprising 20 source images and responsive WebP/AVIF derivatives. Project titles and slugs are:

- Wang Linkai (Xiao Gui) London Concert 2026 — `wang-linkai-london-concert`
- Geely London Brand Launch 2025 — `geely-london-brand-launch`
- Yue Yunpeng London Live 2025 — `yue-yunpeng-london-live`
- London Fashion Week 2025 — Editorial & Event Content — `london-fashion-week-2025`
- AGIBOT London Launch — `agibot-london-launch`
- Selected Beauty & Fashion Brand Content — `beauty-fashion-brand-content`

AGIBOT styling was checked against the official brand site. Geely's title/date/context were checked against Geely Auto's official 23 October 2025 UK launch release. No year was assigned to AGIBOT because the supplied evidence did not verify one.

## Chronology

`sortOrder` is the canonical display order. `sortDate` is present only for dated projects and never derives from filesystem metadata. The order is Wang Linkai 2026; Geely, Changan, CATL, Yue Yunpeng and London Fashion Week 2025; Leapmotor 2023; then undated individual records BYD, AGIBOT and London Automotive Brand Film; followed by the undated/mixed portfolio series Beauty & Fashion and European Automotive Asset Programme.

## Taxonomy

The public filter set is All / Market Presence / Industry Credibility / Institutions & Talent / Brand Evidence. Chinese labels are 全部 / 市场落地 / 行业背书 / 机构与人才合作 / 品牌内容资产. Each project also declares `contentType: "case-study" | "portfolio-series"`.

## Media audit

All 20 supplied images were inspected in a contact sheet at `audit/case-studies-portfolio-upgrade/new-portfolio-contact-sheet.png` and checked for orientation, subject placement and grouping. The active manifest records dimensions, orientation, bilingual alt text, responsive paths and desktop/mobile focal positions.

Cover decisions:

- Wang Linkai: red-lit performer portrait; strongest immediate identity and portrait preview fit.
- Geely: EX5 presentation/crowd portrait; communicates the launch more directly than the speaker-only landscape.
- Yue Yunpeng: wide stage group; both people and event branding remain legible.
- London Fashion Week: outdoor reflected editorial portrait; distinctive composition and adequate crop space.
- AGIBOT: humanoid robot portrait with `contain`; avoids cutting the robot and makes the subject unmistakable.
- Beauty & Fashion: square pink beauty-device image; clear product/people balance and stable 4:5 preview crop.

## Layout system

Detail pages are driven by explicit `ProjectLayoutBlock` arrays rather than index-based CSS. Supported blocks are `full`, `pair`, `offset`, `triptych`, `portrait-focus`, and `text-media`. Case studies retain objective, setting, responsibility, execution, evidence and disclosure architecture. Portfolio series use a lighter series statement, curation, selected-content and boundary architecture. Empty optional fields are not fabricated.

## Individual project layouts

- Wang Linkai: full wide finale + equal portrait pair.
- Geely: full design-presentation context + portrait event pair.
- Yue Yunpeng: equal two-image stage pair.
- London Fashion Week: two-column portrait focus.
- AGIBOT: full technical presentation + equal robot portrait pair.
- Beauty & Fashion: text-media introduction + 5/7 product/lifestyle pair + triptych + offset retail close.
- Retained seven-image cases use deliberate full, pair and triptych sequences; London Automotive Brand Film adds an offset frame.

## Responsive

The desktop index keeps the list/preview relationship at `lg` and above. The preview is absent on mobile/tablet, so it cannot become a sticky obstruction. Pointer hover and keyboard focus both update the active cover; filters reset to the first eligible project. Detail blocks collapse to single-column flows where needed, while portrait pairs remain balanced from tablet widths.

## QA

Automated coverage includes canonical dataset integrity, publication gating, redirects, sitemap/metadata, media existence/budgets, bilingual alt text, explicit editorial blocks, one chronological next project, keyboard preview, mobile preview removal and responsive overflow/broken-image checks. Validation commands: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and targeted Playwright production tests.
