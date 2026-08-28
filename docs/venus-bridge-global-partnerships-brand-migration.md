# Venus Bridge Global Partnerships brand migration

## Previous public identity

The website previously mixed the public master brand `Venus Bridge Media` with a broader market-entry, partnerships and local-execution proposition. That naming made a real production capability appear to define the whole company.

## New brand architecture

- Master brand: **VENUS BRIDGE**
- Descriptor: **GLOBAL PARTNERSHIPS**
- Commercial proposition: helping Chinese companies build relevant market relationships, credible presence and accountable local execution across the UK and Europe
- Legal identity: separately controlled by release configuration

## Strategic rationale

Creative and media production remain important, but they sit inside a broader cross-border commercial partnerships and market-execution model. The new architecture makes buyer, distributor, industry and specialist relationships visible without presenting Venus Bridge as a directory, broker or introductions business.

## Public naming changes

The pre-migration audit found 130 source lines containing `Venus Bridge Media` across `app`, `components`, `content` and `lib`. After classification, 109 public-identity source lines were migrated to `Venus Bridge`; 21 protected source lines remain, containing 25 exact bilingual/string occurrences.

Changed public identity surfaces include metadata titles, Open Graph site identity, manifest/application name, Organization and Service schema names, breadcrumbs, case attribution, responsibility labels, current brand components, Footer copyright and general EN/ZH body usage.

## Legal identity unchanged areas

| Protected area                     | Remaining source lines | Reason                                                                  |
| ---------------------------------- | ---------------------: | ----------------------------------------------------------------------- |
| Company configuration              |                      1 | Approved trading identity remains configuration-controlled              |
| Footer approved legal statement    |                      2 | Explicit trading-name relationship to the configured legal entity       |
| Brand legal statement              |                      2 | Legal/trading reference, not public master-brand copy                   |
| Privacy and Terms metadata         |                      3 | Kept with the current legal surface pending owner-approved legal change |
| Consent interfaces                 |                      7 | Existing privacy/processing consent language remains legally stable     |
| Regulated market-entry disclaimers |                      4 | Scope and liability attribution retained                                |
| Legacy About legal description     |                      2 | Explicit historical/current B2B trading-brand description               |

No legal entity, privacy controller, company number, registered office, contracting identity or legal approval gate was changed.

## “Media” occurrences retained intentionally

The public-copy audit retains 32 English-token source lines where `media` describes a real capability, channel, audience, evidence class or deliverable. These include social and paid media, media capture, media interviews, media areas, media assets, capability media and Creative/Media production contexts. Technical media types, variables, paths and governance fields are outside this copy count.

No retained occurrence describes Venus Bridge as a media company, photography company or media agency.

## Logo integration

The approved package is now available from the canonical root `public/brand/venus-bridge/`. The former underscore-named source package remains untouched for traceability, while all production references use the canonical path.

## Header

Desktop retains the approved horizontal white lockup on the dark Header. Mobile retains the compact white VB monogram. Header height, navigation labels and CTA hierarchy are unchanged.

## Footer

The approved horizontal lockup remains the primary identity. The concise commercial description continues to explain market validation, relevant relationships and integrated execution. The legal statement remains a separate configuration-gated layer; the general copyright identity now uses `Venus Bridge`.

## About

The page architecture, globe and team grid are unchanged. Two EN/ZH paragraphs were refined to explain that Venus Bridge is a cross-border commercial partnerships and market-execution team, that the commercial objective determines which relationships matter, and that execution and follow-through remain central.

## Metadata / SEO

The Open Graph site name, application/manifest name, metadata suffixes on current and retained routes, breadcrumbs and schema public organization name now use `Venus Bridge`. SEO continues to target UK and European market entry, buyer/partner engagement and local execution rather than the broad descriptor alone.

## OG

OG cards retain the approved horizontal identity lockup and page-specific EN/ZH commercial titles. The descriptor remains visually subordinate to the commercial headline.

## Chinese site

Normal prose now uses `Venus Bridge`. The About refinement uses natural `跨境商业合作`, `商业关系`, `本地交付` and `市场结果` language without turning the brand into a `资源对接平台`.

## Accessibility

PASS. Header and Footer lockups retain concise accessible naming, the opening mark remains inside its existing hidden overlay semantics, and no heading or navigation structure was changed. The complete E2E suite, including axe checks on canonical commercial pages, reported no accessibility failures.

## Responsive QA

PASS. Live production-build QA covered 390, 430, 768, 1024, 1440 and 1920 px in English and Chinese. Mobile/tablet widths use the approved monogram, desktop widths use the horizontal lockup, the Footer remains balanced, OG renders at 1200 × 630, and document overflow remained zero.

## Verification

- TypeScript: pass
- Lint: pass
- Unit/contract tests: 121 passed, 11 expected skips
- Full E2E: 109 passed, 57 expected project-specific skips
- Staging release validation: pass
- Production media validation: pass
- Content and pricing validation: pass
- Contact delivery/signing harness: pass
- Dependency audit: 0 vulnerabilities
- Production build: pass, 101 static pages generated
- Production release validation: intentionally fail-closed on missing owner-supplied deployment, legal and contact confirmations

## Files changed

See the final implementation response and repository diff. Changes are limited to brand configuration, public identity strings, approved asset paths, focused About copy, tests, validation rules and documentation.

## Remaining owner confirmation

- Confirm any future legal change from the configured `Venus Bridge Media` trading identity before changing Privacy, Terms, consent or regulated-scope wording.
- Provide the original designer vector master before any large-format or print adaptation.
- Confirm production domain and email migration separately if the owner intends to move away from current `venusbridgemedia` addresses; this phase does not infer that operational change.
