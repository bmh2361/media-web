# Privacy and Cookie Launch Audit

## Current behaviour

- Contact requires purpose-specific consent before submission.
- The Privacy page explains the enquiry categories, response/project-assessment purpose, abuse prevention, workflow-provider transfer, analytics PII exclusion and a route for correction requests.
- Terms state that site material is not a binding proposal, guarantee, endorsement or agreement.
- No analytics provider, marketing pixel, advertising script, embedded tracker, or non-essential cookie is currently enabled.
- The measurement event bus does not transmit data while no provider adapter is installed.
- No cookie is written by the application. The only browser storage found is functional `sessionStorage` used to remember the opening-sequence state for the current tab; it is not used for cross-session identification, advertising or analytics.

Cookie consent status: NOT REQUIRED for the current no-tracking implementation.

## Human/legal gates

The current Privacy and Terms pages deliberately display pre-release status until the legal entity, controller, registered office, public emails, effective dates and approval flags are supplied. Codex has not converted these drafts into legal advice.

LEGAL REVIEW REQUIRED before production.

If analytics is enabled later:

1. Determine whether the selected provider uses cookies/local storage or otherwise requires consent in the target jurisdictions.
2. Prevent its script and network calls before valid consent where required.
3. Add a restrained preference control only when legally/technically required.
4. Update the Privacy Notice with provider, purpose, retention, transfer and opt-out/withdrawal information.
5. Re-run payload inspection to ensure enquiry data and free text never enter analytics.

Status: TECHNICAL COOKIE BEHAVIOUR PASS WHILE ANALYTICS IS DISABLED; PRIVACY AND TERMS REQUIRE HUMAN LEGAL REVIEW.
