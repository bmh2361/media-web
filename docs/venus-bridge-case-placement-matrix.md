# Case Placement Matrix / 案例放置矩阵

This matrix describes where a case belongs **after** it passes the production gate. It does not declare any candidate to be a completed public case.

## Release classification

| Class                            | Meaning                                                                                      | Public treatment                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| A — Completed and approved       | Delivered, evidence complete, client/media/legal approval recorded                           | May enter portfolio after automated gate passes               |
| B — Completed, awaiting approval | Delivery is complete but one or more approvals/evidence items are missing                    | Private only; may be prepared but not rendered                |
| C — In progress                  | Contracted or actively delivering                                                            | Hidden; no outcome language                                   |
| D — Lead / quote / discussion    | Opportunity, enquiry, quotation or unconfirmed direction                                     | Never a case study                                            |
| E — Concept scenario             | Illustrative planning model, not client work                                                 | May appear only in Scenario mode with disclosure              |
| F — Not suitable for publication | Confidential, rights-restricted, consumer work misaligned to B2B, or reputational/legal risk | Keep internal; do not anonymise merely to bypass restrictions |

## Current repository classification

| Candidate                               | Current classification | Evidence-based reason                                                                             | Next decision required                                                              |
| --------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Six records in `content/cases/index.ts` | E — Concept            | All are explicitly `deliveryStatus: concept`, hidden from portfolio and have no approved evidence | Keep as scenarios until replaced by separate real records                           |
| Chinese artist concert imagery          | Unconfirmed / hidden   | Direction is known, but artist, official role, event, media and publication approval are absent   | Confirm completed status, official relationship and rights; then classify A, B or F |
| Founder/brand interview, two-camera 4K  | Unconfirmed / hidden   | Technical direction is described, but client, date, final edit, delivery and approval are absent  | Confirm delivery and approval; likely B until evidence is supplied                  |
| Goodwood/automotive event directions    | Unconfirmed / hidden   | Brief explicitly warns that some may be quotations or candidates                                  | Separate completed work from D-class leads before any web copy                      |
| Fashion/beauty/apparel production       | Unconfirmed / hidden   | Capabilities are known but B2B versus consumer projects and rights are not classified             | Identify completed B2B projects; consumer work cannot be relabelled                 |
| Brand events, exhibitions and PR        | Unconfirmed / hidden   | No project-level client/date/role/approval records exist                                          | Complete one intake per delivered event                                             |
| Bilingual agency/UK execution           | Unconfirmed / hidden   | An anonymous format is possible, but a real delivered brief and agency consent are still required | Request permission for an anonymised operational case                               |

## Placement matrix

| Destination                      | Best case mix                                                                                  | What the case must prove                                                          | Media priority                                             | Do not place                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| Homepage                         | One strongest brand/artist production; one event/exhibition; one interview/technology project  | Breadth across content, live delivery and specialist communication                | One strong cover each; maximum three cases                 | Six to eight weak cases, leads or concept models presented as work      |
| Creative & Commercial Production | Campaign, concert imagery, founder interview, short-form or multi-format delivery              | Production role, crew/scope, formats, review and handoff                          | Final frames plus controlled BTS                           | Personal photography relabelled as a commercial campaign                |
| Talent, Casting & Styling        | Casting, presenter, makeup/hair, wardrobe, artist styling or event talent coordination         | Selection criteria, usage, booking role and on-set responsibility                 | Approved talent/BTS only                                   | Private roster, contact details or unapproved faces                     |
| Events, PR & Exhibitions         | Brand event, exhibition, concert, interview programme, livestream or event documentation       | Venue/supplier/talent/media interfaces and event outputs                          | Wide event frame, working frame, final output              | Quoted events, unconfirmed official status or audience claims           |
| UK Production & Agency Support   | Chinese-agency UK delivery, white-label production, supplier/venue/crew coordination           | Local responsibility, confidentiality, approval route and handoff                 | Anonymous BTS or non-client-identifying operational detail | End-client name/logo without agency permission                          |
| Fashion, Beauty & Apparel        | Apparel campaign, lookbook, beauty launch, casting/styling, social or overseas visual material | How product, model, makeup, hair, wardrobe, location and formats were coordinated | Campaign hero, BTS, vertical/horizontal outputs            | Jewellery as the primary sector, or consumer portraits described as B2B |
| Automotive                       | Automotive event, presenter/live assignment, vehicle content or client programme               | Access, safety, presenter, production role and delivered media                    | Vehicle/event context plus published output                | Goodwood or brand names attached to a lead/quote                        |
| Technology & AI                  | Founder interview, AI product explanation, demo, technical exhibition or expert interview      | Claim review, speaker role, formats and approval route                            | Interview/demo frame and public evidence                   | Unsupported technical results or institutional endorsement              |
| Events / Culture / Entertainment | Concert media, cultural launch, stage/interview/public programme                               | Official relationship, talent/venue permissions, capture and turnaround           | Stage, backstage and final approved publication            | Artist name or music footage without rights                             |
| About Us                         | One or two short proof points only                                                             | Method and accountability, not volume                                             | Authentic team-at-work or production-prep images           | Full portfolio grid or unsupported headline metrics                     |
| Contact                          | No case required; optional one-line reassurance only                                           | Confidential, practical intake and response route                                 | None required                                              | Case carousel that distracts from enquiry                               |

## Recommended first three evidence packages

1. **Founder or brand interview** — potentially the cleanest route to show commercial production, two-camera capture, audio, long-form and social cutdowns. Confirm whether editing was delivered.
2. **Completed live event or concert** — strongest proof of London access and live coordination, but only after official role, talent, venue and music/media rights are approved.
3. **Anonymised agency or UK execution project** — strongest proof of the B2B operating model. It still requires agency permission and a real delivery/evidence record.

Fashion/apparel and automotive should follow when B2B status and rights are clearer; they should not be rushed merely to fill sector pages.

## Production gate

A case is eligible only when:

- `deliveryStatus === "completed"`;
- `publicStatus === "public"`;
- legacy disclosure status is `verified` or `anonymised`;
- client, media-rights and legal approvals are all true;
- project date, bilingual brief, role and deliverables are complete;
- at least one evidence record is both verified and approved for public use;
- project media is approved and disclosure permission is recorded.

`in-progress`, `lead`, `completed-awaiting-approval` and `concept` records cannot pass the public portfolio gate.
