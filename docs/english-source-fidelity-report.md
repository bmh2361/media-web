# English source-fidelity report

## Decision

Chinese remains authoritative. The mandatory register was applied in this order: legal-strength corrections, terminology, page-level meaning, then British commercial copy quality. Existing Chinese characters and punctuation in the governed public source files are compared to `HEAD` by `scripts/export-bilingual-copy.mjs`; gated new form copy and removed unapproved dormant identity wording are reported separately rather than treated as edits to the authoritative page baseline.

`audit/english-hardening/final/visible-copy.json` and `rendered-bilingual-copy.md` contain 21 canonical EN/ZH route pairs. `changed-strings.json` accounts for all 119 professional review rows, including source-fidelity, terminology and copy-quality entries. Every current visible element sequence has EN/ZH path and responsive-variant parity. The attached rendered baseline came from the live deployment and is retained as evidence; differences in responsive duplicate extraction and current dormant/retired surface structure are labelled “not directly comparable”, not misreported as Chinese edits.

## Material corrections

- `服务承诺` is now **service commitment**. “Service guarantee” is absent from governed public English.
- `合作协议` is **cooperation agreement**, and the Terms sentence preserves **agreed by both parties**.
- Privacy uses company, commercial terms or conditions, online submission and transmit; translation correction does not set legal approval.
- `机械执行` is mechanically following, `中欧沟通` is China–Europe communication, `中英双语沟通` is bilingual Chinese–English communication, and `拓展` is grow/expand rather than activate.
- Market judgement, local partner coordination, project plan, visual documentation, launch context and UK/European settings retain the Chinese commitment and evidence boundary.
- Visual-documentation cases were not upgraded into market-entry, buyer-engagement, partnership or outcome claims.

The automated check records 12 required rendered phrases and 22 prohibited mistranslations in `forbidden-phrase-results.json`. It scans active public content, metadata/structured data, current OG text and active tests while excluding historical baseline and archived audit evidence, and fails when the final bilingual path audit or governed Chinese-source comparison fails.
