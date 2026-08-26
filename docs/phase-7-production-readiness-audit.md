# Phase 7 Production Readiness Audit

Date: 2026-07-16

## Launch blockers

| Issue                                         | Evidence                                                  | Required correction                                                         |
| --------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| Thirteen critical media slots are unapproved  | `content/media.ts` critical manifest                      | Supply rights-cleared media, bilingual alt text, crops, credit and approval |
| No verified portfolio project exists          | Six records are `concept`                                 | Onboard at least one evidence-backed project before enabling portfolio mode |
| Production contact delivery is not configured | Webhook, origins and live-delivery confirmation are unset | Configure and run the real delivery test                                    |
| Legal company identity is incomplete          | Legal name, company number and registered office are null | Confirm company data and approval status                                    |
| Privacy and terms are unapproved              | Effective dates and approval flags are pending            | Obtain legal approval and set final dates                                   |
| Production environment is incomplete          | Domain and `RELEASE_PROFILE=production` are unset         | Configure the approved production environment                               |

## High priority

| Issue                   | Finding                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| Final-media performance | Heavy-media testing found a 3,388 ms slow-4G mobile LCP against the 3,000 ms target                   |
| Video governance        | The registry supports posters, captions and transcripts, but no final videos are registered           |
| Rate limiting           | Current adapter is process-local and should be replaced for distributed/serverless deployment         |
| Error monitoring        | Request identifiers and safe logging exist; a real monitoring destination remains unconfigured        |
| Company consistency     | Footer, legal pages, metadata and structured data now share configuration, but real values are absent |
| Browser coverage        | Automated QA passed; physical iOS Safari and Android Chrome remain launch-device checks               |

## Medium priority

| Issue                    | Finding                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| Motion repetition        | Editorial curtain reveals remain common; dominant page ideas should remain distinct                    |
| Work credibility         | Concept disclosures are strong, but authentic production credibility depends on real approved evidence |
| Mobile landscape         | Short-height and tablet widths passed; physical-device browser chrome and keyboard behaviour remain    |
| Final crop art direction | Current focal points are safe defaults until approved imagery is supplied                              |
| LOCALISE terminology     | Phase 7 copy now emphasises UK production and local execution, but final sales review is required      |

## Optional refinement

- Add approved social profiles to organisation schema.
- Add project-specific Open Graph imagery after media approval.
- Connect a durable CRM or email provider after the primary webhook is proven.
- Add file upload only after privacy, security and retention requirements are agreed.

## Staging-only content

- placeholder and illustrative media;
- demo media under explicit development mode;
- six concept project models;
- unapproved legal copy;
- fallback public company identity;
- no live contact destination;
- no production indexing.

## Motion review

The current timing hierarchy is coherent. The main refinements are:

- keep the homepage as the most cinematic route;
- keep Work focused on discovery and media replacement;
- avoid adding pointer or sticky effects to service pages that already have a dominant visual system;
- stop ambient motion under reduced motion and when off-screen;
- keep route feedback immediate and non-blocking.
