import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(
  await readFile(path.join(root, "content", "capability-media.generated.json"), "utf8")
);
const records = manifest.records;
const kb = (value) => `${Math.round(value / 1024)} KB`;
const unusedReason = {
  "vbm-012":
    "Creator close-up overlaps the stronger commercial-content selection and reads too much like a personal portrait.",
  "vbm-013": "Automotive lifestyle context could imply an unsupported client or campaign relationship.",
  "vbm-015": "Beauty campaign portrait is redundant beside the stronger product-led selection.",
  "vbm-016":
    "Lifestyle beauty portrait is visually repetitive and not needed for the current page hierarchy.",
  "vbm-017": "Makeup portrait is better covered by the existing verified fashion and beauty collection.",
  "vbm-018":
    "Retail display is less useful for explaining entertainment or technology production capability.",
  "vbm-019": "Product portrait repeats the beauty-led visual language already represented elsewhere.",
  "vbm-022":
    "Artist editorial is held back to avoid an entertainment page that feels like a celebrity gallery."
};

const mediaRows = records
  .map(
    (item) =>
      `| ${item.id} | ${item.category} | ${item.usedPublicly ? item.actualPages.join(", ") : "Not used"} | ${kb(item.webReadyBytes)} | ${kb(item.webpBytes)} | ${kb(item.avifBytes)} | ${kb(item.mobileBytes)} | ${kb(item.thumbnailBytes)} |`
  )
  .join("\n");
const imported = records.filter((item) => item.usedPublicly);
const unused = records.filter((item) => !item.usedPublicly);

await writeFile(
  path.join(root, "docs", "phase-13-media-import-report.md"),
  `# Phase 13 media import report

## Summary

- Source package scanned: 24 unique assets.
- Duplicate binary sources removed upstream: 1.
- Assets imported into the responsive capability-media library: 24.
- Assets selected for public page use: ${imported.length}.
- Assets visible only in the development media review: ${unused.length}.
- Runtime references to absolute D: paths: none.
- Source status: capability media; all records remain \`caseReady: false\`.

## Import and optimisation

| ID | Category | Public assignment | Web-ready source | WebP | AVIF | Mobile WebP | Thumbnail |
|---|---|---|---:|---:|---:|---:|---:|
${mediaRows}

## Public page allocation

- Entertainment & Culture: ${records
    .filter((item) => item.actualPages.includes("entertainment-culture"))
    .map((item) => item.id)
    .join(", ")}.
- Technology, AI & Research: ${records
    .filter((item) => item.actualPages.includes("technology-ai-research"))
    .map((item) => item.id)
    .join(", ")}.
- Create in the UK: ${records
    .filter((item) => item.actualPages.includes("create-in-the-uk"))
    .map((item) => item.id)
    .join(", ")}.
- Launch in the UK: ${records
    .filter((item) => item.actualPages.includes("launch-in-the-uk"))
    .map((item) => item.id)
    .join(", ")}.
- Enter the UK Market: ${records
    .filter((item) => item.actualPages.includes("enter-the-uk"))
    .map((item) => item.id)
    .join(", ")}.
- Homepage Expertise: ${records
    .filter((item) => item.actualPages.includes("homepage-expertise"))
    .map((item) => item.id)
    .join(", ")}.

## Unused on public pages

${unused.map((item) => `- **${item.id}** — ${unusedReason[item.id]}`).join("\n")}

Every unused asset remains available in the development-only media review for later reassessment.
`
);

await writeFile(
  path.join(root, "docs", "phase-13-capability-to-case-gaps.md"),
  `# Phase 13 capability-to-case gaps

All 24 new assets are approved for website use as capability media. None is automatically a Work project or a client case.

## Collections best suited to future case conversion

| Collection | Current treatment | Missing project facts |
|---|---|---|
| Live Performance | Selected Visual Experience | Project name; client or responsible subject; date; venue; Venus Bridge role; final deliverables; publication or delivery evidence |
| Creator Commercial Content | Production Capability | Client or brand authority; brief; date and location; usage; actual production scope; approved deliverables; publication evidence |
| Interview & Editorial | Selected Visual Experience | Interview subject authority; production date; location; camera/light/sound scope; final edit list; published output |
| AI Product & Robotics | Production Capability | Product owner; engagement basis; brief; event or location; actual role; deliverables; approved publication evidence |
| Expert & Industry Content | Selected Visual Experience | Speaker or organisation authority; event facts; whether interview or stage presentation; actual production scope; delivered outputs |
| Technology Launch & Exhibition | Production Capability | Event owner; project date and location; delivery responsibility; launch or exhibition outputs; delivery evidence |

## Required intake before Work publication

The user must provide the project name, client or subject, date, location, Venus Bridge's actual responsibilities, final deliverables, and publication or delivery evidence. Client naming, outcomes, metrics and structured CreativeWork data remain blocked until those facts pass the existing public case gate.
`
);

await writeFile(
  path.join(root, "docs", "phase-13-institution-logo-status.md"),
  `# Phase 13 institution logo status

- Pending institution-logo directory: empty apart from intake documentation and template data.
- Publishable institution records: 0.
- Records missing relationship information: 0 active records; the supplied template is intentionally incomplete and not imported as content.
- Publicly blocked logos: all future logos until every gate passes.

Required gates are \`logoUseApproved === true\`, \`public === true\`, non-empty bilingual public wording, a non-empty relationship type, and non-empty approval evidence.

The technology page conditionally uses **Academic & Research Connections / 学术、科研与产业联系** only when at least one record passes every gate. With the current empty configuration, the entire section is omitted with no empty state. It is never titled “Official Partners” or “University Partners” by default.
`
);

await writeFile(
  path.join(root, "docs", "phase-13-image-placement-map.md"),
  `# Phase 13 image placement map

| Surface | Primary media | Supporting media | Intent |
|---|---|---|---|
| Homepage Automotive | Existing verified automotive hero | None | Launch scale and automotive production |
| Homepage Fashion, Beauty & Apparel | Existing verified fashion hero | None | Editorial craft and styling |
| Homepage Entertainment & Culture | vbm-021 | None | Distinct editorial artist visual without reusing the expertise hero |
| Homepage Technology, AI & Research | vbm-002 | None | Robotics and intelligent-product context |
| Entertainment hero | vbm-020 | vbm-007 | Asymmetric portrait-led editorial hero with live context |
| Entertainment capability modules | vbm-006, vbm-011, vbm-014, vbm-024, vbm-023, vbm-008, vbm-009 | — | Live performance, commercial creator content, interviews and cultural programmes |
| Technology hero | vbm-003 | vbm-001 | Product-first robotics visual hierarchy |
| Technology capability modules | vbm-001, vbm-002, vbm-003, vbm-004, vbm-005, vbm-010 | — | AI products, expert content and launches |
| Create in the UK | vbm-023 | vbm-011, vbm-024, vbm-001, vbm-014 | Production method, interviews, demonstrations and multi-format work |
| Launch in the UK | vbm-010 | vbm-007, vbm-004, vbm-006, vbm-003 | Stage, performance, speakers and demonstrations |
| Enter the UK Market | vbm-023 | None | One restrained UK location-production image; no gallery |
| About Us | Brand logo and graphic system | None | No people imagery until genuine team photography is approved |

Each public image uses a desktop AVIF/WebP/JPEG set, separate mobile AVIF/WebP files, a thumbnail, bilingual objective alt text and explicit desktop/mobile object positions.
`
);

await writeFile(
  path.join(root, "docs", "phase-13-final-report.md"),
  `# Phase 13 final report

## Executive summary

Phase 13 introduces a separate Capability Media system for 24 approved visual assets, completes the Entertainment & Culture and Technology, AI & Research expertise pages, adds targeted media to all three client paths, upgrades the four homepage expertise cards, and preserves Work as a verified-project-only surface.

## Design decisions

- Entertainment uses a portrait-led asymmetric hero and a B2B production structure rather than a celebrity gallery.
- Technology leads with robotics, intelligent products, demonstrations, expert content and industry launches.
- Research & Innovation is a compact secondary editorial statement with no university case grid or endorsement language.
- About Us is deliberately text-, responsibility- and brand-led. No artist, model, guest or synthetic employee image is used.
- Enter the UK Market uses one editorial location-production image and remains process-led.

## Truth and release boundaries

Capability media can appear in heroes, service modules and Selected Visual Experience, but it does not create a Work detail route, client metadata, outcomes, metrics, sitemap entries or CreativeWork schema. Case conversion requires the facts listed in \`phase-13-capability-to-case-gaps.md\`.

## SEO and accessibility

The two new expertise routes use localized titles and descriptions, canonical URLs, hreflang alternates, breadcrumbs, Service structured data, Open Graph metadata and objective bilingual alt text. Brand names visible inside images are not promoted into metadata or alt text.

## Media performance

All 24 review assets have AVIF, WebP, JPEG fallback, mobile AVIF/WebP and thumbnail derivatives. The component uses explicit dimensions, responsive sizes, priority/fetch priority only for hero media, native lazy loading for other assets, separate mobile sources and desktop/mobile focal positions.

## Production blockers

- No new capability collection can become a named Work case until project facts and delivery evidence are supplied.
- No institution logo can publish until a complete relationship record and approval evidence exist.
- No named team profile or team photograph can publish until identity, role, biography, real imagery and public approval are complete.
- Production environment variables and existing release-profile checks remain outside this content phase.

See the media import, placement, institution and capability-gap reports for the complete asset-level record. Test and browser evidence is recorded in the final task handoff after execution.
`
);

console.log("Generated five Phase 13 reports.");
