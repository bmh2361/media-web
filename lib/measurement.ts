"use client";

import { isAnalyticsReady } from "@/lib/release-policy";

export const measurementEventNames = [
  "page_view",
  "language_switch",
  "companies_cta_click",
  "partners_cta_click",
  "case_view",
  "case_detail_open",
  "contact_view",
  "contact_intent",
  "contact_start",
  "contact_submit_success",
  "contact_submit_failure",
  "email_click",
  "wechat_copy"
] as const;
export type MeasurementEventName = (typeof measurementEventNames)[number];

export const measurementPropertyNames = [
  "path",
  "locale",
  "source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "cta_location",
  "case_slug",
  "case_category",
  "contact_intent",
  "error_class"
] as const;
type MeasurementPropertyName = (typeof measurementPropertyNames)[number];
type MeasurementProperties = Partial<Record<MeasurementPropertyName, string>>;
type MeasurementInput = Record<string, string | number | boolean | undefined>;

export type MeasurementRecord = {
  name: MeasurementEventName;
  properties: MeasurementProperties;
};

export interface MeasurementAdapter {
  deliver(record: MeasurementRecord): void;
}

class EventBusAdapter implements MeasurementAdapter {
  deliver(record: MeasurementRecord) {
    window.dispatchEvent(new CustomEvent("venus-bridge:measurement", { detail: record }));
  }
}

const providerConfigured = isAnalyticsReady({
  analyticsRequested: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
  analyticsProviderConfigured: Boolean(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.trim()),
  analyticsPropertyConfigured: Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim()),
  analyticsPrivacyApproved: process.env.NEXT_PUBLIC_ANALYTICS_PRIVACY_APPROVED === "true"
});
const adapter: MeasurementAdapter | null = providerConfigured ? new EventBusAdapter() : null;
const allowedProperties = new Set<string>(measurementPropertyNames);

const clean = (value: unknown) => {
  if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") return undefined;
  const text = String(value).trim().slice(0, 120);
  if (!text || /@|\b(?:name|email|phone|wechat|company)=/i.test(text)) return undefined;
  return text;
};

export function sanitiseMeasurementProperties(input: MeasurementInput) {
  const safe: MeasurementProperties = {};
  for (const [key, value] of Object.entries(input)) {
    if (!allowedProperties.has(key)) continue;
    const cleaned = clean(value);
    if (cleaned) safe[key as MeasurementPropertyName] = cleaned;
  }
  if (safe.locale && safe.locale !== "en" && safe.locale !== "zh") delete safe.locale;
  if (safe.source && !["direct", "internal", "referral"].includes(safe.source)) delete safe.source;
  if (safe.contact_intent && !["company", "partner", "other"].includes(safe.contact_intent)) {
    delete safe.contact_intent;
  }
  return safe;
}

function browserContext(): MeasurementProperties {
  const url = new URL(window.location.href);
  let source = "direct";
  if (document.referrer) {
    try {
      source = new URL(document.referrer).origin === url.origin ? "internal" : "referral";
    } catch {
      source = "referral";
    }
  }
  return sanitiseMeasurementProperties({
    path: url.pathname,
    locale: url.pathname.split("/")[1] === "zh" ? "zh" : "en",
    source,
    utm_source: url.searchParams.get("utm_source") ?? undefined,
    utm_medium: url.searchParams.get("utm_medium") ?? undefined,
    utm_campaign: url.searchParams.get("utm_campaign") ?? undefined
  });
}

export function trackMeasurement(name: MeasurementEventName, properties: MeasurementInput = {}) {
  if (typeof window === "undefined" || !adapter) return;
  adapter.deliver({
    name,
    properties: { ...browserContext(), ...sanitiseMeasurementProperties(properties) }
  });
}
