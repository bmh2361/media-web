# Phase 3.2A Case Evidence Schema

Date: 12 August 2026  
Status: internal preparation only; no public case content is generated from this schema in Phase 3.2A.

## Audit decision

The repository currently has two established models:

- `PortfolioProject` contains the nine rights-approved real projects rendered on the current Work index and case routes.
- `CaseStudy` supports a wider historical system that includes real, anonymised, confidential and illustrative scenario records.

Migrating either public model before owner evidence arrives would create risk without improving the live site. Phase 3.2A therefore adds `content/evidence/case-evidence.ts` as an import-neutral intake and governance contract above the existing models. Phase 3.2B may adapt approved evidence records into `PortfolioProject`; it must not make illustrative `CaseStudy` scenarios look like delivered work.

## Model coverage

The `CaseEvidenceRecord` contract stores:

1. identity and language;
2. client objective, business context, commercial problem and desired outcome;
3. UK activity, formats, people, institutions, events, venues and production elements;
4. precise Venus Bridge coordination, production and relationship roles, including what Venus Bridge did not do;
5. concrete content, event, relationship and brand-asset outputs;
6. mapping to the frozen four capabilities and four commercial project types;
7. Level A–D evidence governance;
8. named rights, claim restrictions, verification notes and owner approval;
9. media grouped by evidential function;
10. placement eligibility;
11. exactly one primary evidence-strength classification.

Phase 3.2B also adds three proof types (`VISUAL`, `RELATIONSHIP`, `PROCESS`), three trust dimensions (`ACCESS`, `ORCHESTRATION`, `EXECUTION`) and four maturity states (`PRIVATE`, `ANONYMOUS_PUBLIC`, `NAMED_PUBLIC`, `FEATURED`).

Missing facts remain empty, `null`, `unknown` or `UNKNOWN`. The intake layer never infers them.

## Fail-closed rules

- Level C and D records cannot receive public placements.
- Any public placement requires approved case publication, media rights, owner approval and approved public wording.
- A named client requires client-name approval.
- An approved institution name requires the exact institution role and approved institution wording.
- Formal university collaboration requires evidence of an approved formal agreement.
- An approved creator identity requires the commercial relationship type.
- An approved event name requires a structured event record.
- Exactly one of hero, core, supporting, visual or archive evidence must be selected.
- Archive classification and archive-only placement must agree.
- A case may have only one hero asset; every asset requires an evidential function.
- Dedicated-case eligibility requires a real objective, UK activity, Venus Bridge role and deliverables.
- Private evidence cannot receive public placement.
- Anonymous-public evidence must use anonymised client visibility and cannot expose participant or institution names.
- Named-public and Featured evidence require named client visibility and client-name permission.
- Featured evidence requires an approved homepage placement.
- Every record requires at least one proof type and one trust dimension.
- The register validator limits Homepage Early Proof to four eligible cases and Homepage Selected Work to six.

## Controlled internal taxonomies

The schema freezes:

- 4 capabilities;
- 4 commercial project types;
- 10 customer-outcome tags;
- 15 project formats;
- 11 institution relationship levels;
- 11 creator/talent relationship types including `none` and `unknown`.

Industry remains secondary metadata. No public filter is generated from these taxonomies.

## Institution governance

Every institution record distinguishes formal university collaboration, faculty/department work, individual academic participation, research-group interaction, a campus visit, a hired venue, academic speaking, independent expertise and public event attendance. These values are never treated as synonyms.

The claim layer separately stores `relationshipLevel`, `institutionRole`, `participantRole`, `formalAgreement`, `logoPermission` and `approvedInstitutionWording`. A professor attending is not a university partnership; a campus venue is not institutional collaboration; discussion is not endorsement.

## Creator and talent governance

Every identifiable creator or talent relationship must distinguish paid collaboration, commissioned production, organic appearance, event attendance, brand partnership, talent booking, creator campaign, affiliate activity or PR gifting. Public wording must disclose the commercial relationship accurately and must not imply independent endorsement.

Talent imagery is evidence only when it supports a client objective, concept, casting requirement, production context, Venus Bridge coordination and final asset story. It is not a public talent catalogue.

## Event and launch governance

Event records have fields for the event context, city/country, booth or activation scope, staffing, talent, creators, executive content, photography, video, stakeholder content, China-facing outputs and client-facing deliverables. Empty fields remain empty. A photography record cannot be expanded into full event ownership without verification.

## Import-neutral flow

```text
owner folders / spreadsheet / CSV / JSON / Markdown / PDF references
→ one intake record per project
→ normalise into CaseEvidenceRecord
→ validate claims, relationships, rights and evidence level
→ score and make a human placement decision
→ owner approves exact wording and media
→ Phase 3.2B adapter creates or updates a public PortfolioProject
```

Contracts and private documentary evidence are referenced internally; they are not copied into public assets by default.

For large image folders, run `npm run evidence:contact-sheet -- <input-folder> [output-folder]`. The optional internal utility creates paginated PNG sheets with thumbnails, relative filenames, dimensions and orientation. It auto-orients only generated thumbnails and never alters or copies the originals.

## Case-template readiness

The existing case route already provides a premium hero, context facts, exact role, delivered outputs, capabilities, selected media, claim boundary, contact CTA and related project. It is structurally compatible with the requested narrative, but existing records often lack verified objectives, wider activity, detailed outputs and commercial relevance. Phase 3.2A does not fabricate those sections.

When an approved evidence record is complete, the Phase 3.2B adapter may render:

`Hero → Objective → UK Activity → Venus Bridge Role → Delivered Outputs → Capabilities → Selected Evidence → Commercial Relevance → one Contact CTA`

The media target remains one hero, two to four major moments and only necessary secondary evidence.

## Public maturity progression

`PRIVATE → ANONYMOUS_PUBLIC → NAMED_PUBLIC → FEATURED`

Progression is not automatic. Each step requires the permissions and evidential completeness appropriate to that state. A case can remain anonymous permanently; a named case does not automatically deserve Featured placement.

## Work-index readiness

The current nine-case index is readable without filters. Do not add filters now. Re-evaluate only when the curated, publication-approved library is large enough that buyers cannot scan it; first prefer `Featured Work` and `All Selected Work` or subtle outcome grouping. Industry filters remain secondary and must not become the primary architecture.

## Duplicate-evidence safeguard

A case may support several placements, but each placement needs a distinct evidence angle:

- Homepage Early Proof: recognition, context and narrow verified role;
- Capability: the exact capability demonstrated;
- Project type: the buyer objective and possible engagement shape;
- Work index: concise commercial metadata;
- Case page: the complete approved narrative.

Reuse the claim source; do not repeat the same paragraph and image everywhere. Different crops are allowed only when supported by the approved media record.
