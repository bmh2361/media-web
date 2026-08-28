# Analytics and Conversion Measurement Plan

## Decision

The site now has a provider-neutral, privacy-gated event architecture. No third-party analytics product, script, cookie, or production property ID is installed or fabricated. `NEXT_PUBLIC_ANALYTICS_ENABLED`, provider, property ID, and privacy approval must all be supplied before a provider adapter may transmit data.

The internal `venus-bridge:measurement` browser event remains available for automated contract testing even while transmission is disabled. Its `enabled` field is false in development by default; no network request or analytics storage occurs.

## Event taxonomy

- `page_view`
- `discuss_project_click`
- `contact_start`
- `contact_step_complete`
- `contact_submit_success`
- `contact_submit_failure`
- `case_view`
- `case_detail_open`
- `companies_cta_click`
- `partners_cta_click`
- `language_switch`
- `contact_intent` (supporting funnel context)

Allowed contextual properties include `path`, `locale`, attribution source, allow-listed UTM fields, `case_slug`, `category`, `cta_location`, `contact_type`, `step_number`, destination, and a controlled failure class.

Never transmit name, email, phone, organisation, project description, objectives, free text, form payloads, or other personal information.

## Funnel

```text
page_view
  → discuss_project_click
    → contact_start
      → contact_step_complete 1
      → contact_step_complete 2
      → contact_step_complete 3
        → contact_submit_success | contact_submit_failure
```

## Production enablement

HUMAN ACTION REQUIRED: PRODUCTION ANALYTICS PROVIDER AND ID.

1. Select one provider; do not install multiple products.
2. Obtain privacy/legal approval and determine whether prior consent is required.
3. Configure a provider adapter to consume only the allow-listed custom event contract.
4. Add the production property ID as `NEXT_PUBLIC_ANALYTICS_ID`; never place secrets in public variables.
5. Update CSP only for the exact approved script/connect origins.
6. Keep Preview and Development transmission disabled.
7. Verify events in the provider’s debug view and inspect payloads for personal data before enabling production collection.
8. Update the Privacy Notice with the approved provider, purpose, retention and consent behaviour.

Status: EVENT ARCHITECTURE IMPLEMENTED; EXTERNAL COLLECTION BLOCKED PENDING HUMAN PROVIDER/PRIVACY DECISION.
