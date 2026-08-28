# Phase 13 institution logo status

- Pending institution-logo directory: empty apart from intake documentation and template data.
- Publishable institution records: 0.
- Records missing relationship information: 0 active records; the supplied template is intentionally incomplete and not imported as content.
- Publicly blocked logos: all future logos until every gate passes.

Required gates are `logoUseApproved === true`, `public === true`, non-empty bilingual public wording, a non-empty relationship type, and non-empty approval evidence.

The technology page conditionally uses **Academic & Research Connections / 学术、科研与产业联系** only when at least one record passes every gate. With the current empty configuration, the entire section is omitted with no empty state. It is never titled “Official Partners” or “University Partners” by default.
