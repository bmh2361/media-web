"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/i18n";
import { trackMeasurement } from "@/lib/measurement";

const intents = ["company", "partner", "other"] as const;
type Intent = (typeof intents)[number];
type FormState = "idle" | "sending" | "success" | "error";

export function EnquiryForm({
  language,
  fallbackEmail,
  turnstileSiteKey
}: {
  language: Language;
  fallbackEmail: string;
  turnstileSiteKey: string;
}) {
  const [intent, setIntent] = useState<Intent>("other");
  const [state, setState] = useState<FormState>("idle");
  const [requestId, setRequestId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAt = useRef(Date.now());
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const zh = language === "zh";

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("intent");
    const selected: Intent = intents.includes(requested as Intent) ? (requested as Intent) : "other";
    setIntent(selected);
    trackMeasurement("contact_view", { contact_intent: selected });
  }, []);

  const fieldClass =
    "mt-2 min-h-12 w-full border border-ink/20 bg-white px-3 py-3 text-base text-ink outline-none focus:border-champagne focus:ring-2 focus:ring-champagne/25";
  const errorMessage = zh ? "请检查此字段。" : "Please check this field.";

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackMeasurement("contact_start", { contact_intent: intent });
  }

  function validate(form: FormData) {
    const next: Record<string, string> = {};
    for (const key of [
      "name",
      "company_or_organisation",
      "role_or_title",
      "work_email",
      "market_or_location",
      "goal_and_timing",
      "project_summary"
    ]) {
      if (!String(form.get(key) ?? "").trim()) next[key] = "required";
    }
    const email = String(form.get("work_email") ?? "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.work_email = "invalid";
    if (String(form.get("project_summary") ?? "").trim().length < 20) next.project_summary = "too_short";
    if (form.get("consent") !== "on") next.consent = "required";
    return next;
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    setState("sending");
    const payload = {
      intent,
      name: form.get("name"),
      company_or_organisation: form.get("company_or_organisation"),
      role_or_title: form.get("role_or_title"),
      work_email: form.get("work_email"),
      market_or_location: form.get("market_or_location"),
      goal_and_timing: form.get("goal_and_timing"),
      project_summary: form.get("project_summary"),
      consent: form.get("consent") === "on",
      website: form.get("website"),
      started_at: startedAt.current,
      turnstile_token: form.get("cf-turnstile-response")
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as { requestId?: string; error?: string };
      setRequestId(result.requestId ?? "");
      if (!response.ok) throw new Error(result.error || "delivery");
      setState("success");
      trackMeasurement("contact_submit_success", { contact_intent: intent });
      formRef.current?.reset();
    } catch (error) {
      setState("error");
      const safeClass =
        error instanceof Error && error.message === "rate_limited" ? "rate_limited" : "delivery";
      trackMeasurement("contact_submit_failure", { contact_intent: intent, error_class: safeClass });
    }
  }

  if (state === "success") {
    return (
      <div className="border border-ink/15 bg-white p-6" role="status">
        <h3 className="text-xl font-semibold">{zh ? "咨询已提交" : "Enquiry submitted"}</h3>
        <p className="mt-3 text-sm leading-6 text-ink/65">
          {zh
            ? "我们会直接审核每一项咨询，并回复最有用的下一步。"
            : "Every enquiry is reviewed directly. We will respond with the most useful next step."}
        </p>
        {requestId ? (
          <p className="mt-3 text-xs text-ink/50">
            {zh ? "参考编号" : "Reference"}: {requestId}
          </p>
        ) : null}
      </div>
    );
  }

  const fields = [
    ["name", zh ? "姓名" : "Name", "text", 100],
    ["company_or_organisation", zh ? "公司或机构" : "Company or organisation", "text", 150],
    ["role_or_title", zh ? "职位" : "Role or title", "text", 120],
    ["work_email", zh ? "工作邮箱" : "Work email", "email", 200],
    ["market_or_location", zh ? "市场或地点" : "Market or location", "text", 160],
    ["goal_and_timing", zh ? "目标与时间" : "Goal and timing", "text", 500]
  ] as const;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <form
        ref={formRef}
        className="border-t border-ink/15 pt-6"
        onSubmit={submit}
        onFocus={markStarted}
        noValidate
      >
        <fieldset>
          <legend className="text-sm font-semibold">{zh ? "咨询类型" : "Enquiry type"}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {intents.map((value) => (
              <label
                key={value}
                className="inline-flex min-h-11 items-center gap-2 border border-ink/20 px-3"
              >
                <input
                  type="radio"
                  name="intent"
                  value={value}
                  checked={intent === value}
                  onChange={() => {
                    setIntent(value);
                    trackMeasurement("contact_intent", { contact_intent: value });
                  }}
                />
                {value === "company"
                  ? zh
                    ? "企业"
                    : "Company"
                  : value === "partner"
                    ? zh
                      ? "合作方"
                      : "Partner"
                    : zh
                      ? "其他"
                      : "Other"}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {fields.map(([name, label, type, maxLength]) => (
            <label key={name} className={name === "goal_and_timing" ? "sm:col-span-2" : undefined}>
              <span className="text-sm font-medium">{label}</span>
              <input
                className={fieldClass}
                type={type}
                name={name}
                maxLength={maxLength}
                aria-invalid={Boolean(errors[name])}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
              />
              {errors[name] ? (
                <span id={`${name}-error`} className="mt-1 block text-sm text-red-700">
                  {errorMessage}
                </span>
              ) : null}
            </label>
          ))}
        </div>
        <label className="mt-5 block">
          <span className="text-sm font-medium">{zh ? "项目概述" : "Project summary"}</span>
          <textarea
            className={`${fieldClass} min-h-32`}
            name="project_summary"
            maxLength={3000}
            aria-invalid={Boolean(errors.project_summary)}
            aria-describedby={errors.project_summary ? "project_summary-error" : undefined}
          />
          {errors.project_summary ? (
            <span id="project_summary-error" className="mt-1 block text-sm text-red-700">
              {errorMessage}
            </span>
          ) : null}
        </label>
        <div className="absolute -left-[10000px]" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-ink/65">
          <input className="mt-1" type="checkbox" name="consent" aria-invalid={Boolean(errors.consent)} />
          <span>
            {zh
              ? "我同意 Venus Bridge 使用这些信息回复本次咨询。"
              : "I agree that Venus Bridge may use this information to respond to this enquiry."}
          </span>
        </label>
        {errors.consent ? <p className="mt-1 text-sm text-red-700">{errorMessage}</p> : null}
        <div className="cf-turnstile mt-5" data-sitekey={turnstileSiteKey} data-theme="light" />
        <button
          type="submit"
          className="mt-6 min-h-12 bg-ink px-6 text-sm font-semibold text-pearl disabled:opacity-50"
          disabled={state === "sending"}
        >
          {state === "sending" ? (zh ? "正在提交…" : "Submitting…") : zh ? "提交咨询" : "Submit enquiry"}
        </button>
        <div className="mt-4 min-h-6 text-sm" role="status" aria-live="polite">
          {state === "error" ? (
            <p className="text-red-700">
              {zh
                ? "暂时无法安全提交。请改用邮箱联系："
                : "We could not submit this safely. Please use email instead: "}
              <a className="underline" href={`mailto:${fallbackEmail}`}>
                {fallbackEmail}
              </a>
              {requestId ? ` · ${zh ? "参考编号" : "Reference"}: ${requestId}` : ""}
            </p>
          ) : null}
        </div>
      </form>
    </>
  );
}
