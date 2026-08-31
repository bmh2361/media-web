# Analytics owner activation checklist

The custom event bus and adapter interface exist; no provider is connected and custom analytics is not active.

- [ ] Approve a provider, property ID, consent/cookie position and retention settings.
- [ ] Confirm the provider can receive only the event/property allowlist in `lib/measurement.ts`.
- [ ] Implement and test the provider adapter without adding contact values or full referrers.
- [ ] Set `NEXT_PUBLIC_ANALYTICS_PROVIDER`, `NEXT_PUBLIC_ANALYTICS_ID`, `NEXT_PUBLIC_ANALYTICS_PRIVACY_APPROVED=true`, then enable `NEXT_PUBLIC_ANALYTICS_ENABLED=true`.
- [ ] Verify events in the provider’s real-time/debug view and document evidence before saying analytics is active.
- [ ] Optionally enable Cloudflare Web Analytics for basic traffic/RUM after privacy review; do not describe it as the complete custom conversion funnel unless verified.

Until these steps pass, the adapter is a deliberate no-op and readiness reports `ANALYTICS_PROVIDER_REQUIRED` through the existing release validator.
