"use client";

export type MeasurementEventName =
  | "page_view"
  | "case_view"
  | "case_detail_open"
  | "discuss_project_click"
  | "companies_cta_click"
  | "partners_cta_click"
  | "language_switch"
  | "contact_intent"
  | "contact_start"
  | "contact_step_complete"
  | "contact_submit_success"
  | "contact_submit_failure";

type MeasurementProperties = Record<string, string | number | boolean | undefined>;

const enabled =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" &&
  process.env.NEXT_PUBLIC_ANALYTICS_PRIVACY_APPROVED === "true" &&
  Boolean(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.trim()) &&
  Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim());

const clean = (value: string | null) => value?.trim().slice(0, 120) || undefined;

function context() {
  const url = new URL(window.location.href);
  const locale = url.pathname.split("/")[1] === "zh" ? "zh" : "en";
  const referrer = document.referrer ? new URL(document.referrer) : null;
  const source = !referrer
    ? "direct"
    : referrer.origin === url.origin
      ? "internal"
      : "referral";
  return {
    path: url.pathname,
    locale,
    source,
    utm_source: clean(url.searchParams.get("utm_source")),
    utm_medium: clean(url.searchParams.get("utm_medium")),
    utm_campaign: clean(url.searchParams.get("utm_campaign"))
  };
}

export function trackMeasurement(name: MeasurementEventName, properties: MeasurementProperties = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("venus-bridge:measurement", {
      detail: { enabled, name, properties: { ...context(), ...properties } }
    })
  );
}
