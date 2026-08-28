"use client";

import { cloneElement, isValidElement, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { brand } from "@/content/brand";
import type { Language } from "@/lib/i18n";

export function QuickEnquiryForm({ language }: { language: Language }) {
  const zh = language === "zh";
  const [startedAt] = useState(Date.now());
  const [state, setState] = useState<"idle" | "sending" | "success" | "fallback" | "error">("idle");
  const [errorReference, setErrorReference] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const input =
    "min-h-[50px] w-full rounded-[10px] border border-ink/20 bg-pearl px-4 py-3 text-base outline-none transition hover:border-ink/40 focus:border-blue focus:ring-2 focus:ring-blue/15";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};
    for (const key of ["name", "summary", "consent"]) {
      const value = key === "consent" ? data.get(key) : String(data.get(key) ?? "").trim();
      if (!value) nextErrors[key] = "required";
    }
    const email = String(data.get("email") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    if (!email && !contact) nextErrors.contact = "required";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "invalid";
    if (String(data.get("summary") ?? "").trim().length < 10) nextErrors.summary = "too_short";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${Object.keys(nextErrors)[0]}`)?.focus()
      );
      return;
    }
    setErrors({});
    setState("sending");
    const payload = {
      enquiryType: "quick",
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      contact: data.get("contact"),
      projectType: "other",
      industry: "other",
      market: "other",
      location: data.get("location"),
      projectDate: data.get("projectDate"),
      services: [],
      summary: data.get("summary"),
      consent: data.get("consent") === "on",
      website: data.get("website"),
      startedAt
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = await response.json();
      setErrorReference(body.requestId ?? "");
      if (response.ok) {
        setState("success");
        return;
      }
      if (body.error === "validation") setErrors(body.fields);
      setState(body.error === "not_configured" ? "fallback" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "success")
    return (
      <div className="border-l-2 border-blue bg-white p-8">
        <h2 className="text-3xl font-semibold">{zh ? "咨询已提交" : "Your enquiry has been received"}</h2>
        <p className="mt-5 leading-7 text-ink/70">
          {zh
            ? "我们会先审核项目目标与时间，再回复下一步所需信息。"
            : "We will review the objective and timing, then reply with the next information needed."}
        </p>
      </div>
    );

  const errorText = (key: string) => {
    const code = errors[key];
    if (!code) return "";
    if (code === "invalid") return zh ? "请输入有效的工作邮箱。" : "Enter a valid work email.";
    if (code === "too_short")
      return zh ? "请至少提供 10 个字符的需求说明。" : "Add at least 10 characters about what you need.";
    return zh ? "请填写此项。" : "Complete this field.";
  };

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="grid gap-5 rounded-[16px] border border-ink/10 bg-white p-6 md:grid-cols-2 md:p-9"
    >
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="border-l border-red-700 pl-4 text-sm text-red-700 md:col-span-2">
          {zh ? "请检查标记的字段。" : "Review the marked fields."}
        </p>
      )}
      <Field id="name" label={zh ? "姓名" : "Name"} error={errorText("name")}>
        <input className={input} id="name" name="name" autoComplete="name" />
      </Field>
      <Field id="company" label={zh ? "公司或机构（选填）" : "Company or organisation (optional)"}>
        <input className={input} id="company" name="company" autoComplete="organization" />
      </Field>
      <Field
        id="email"
        label={
          zh ? "邮箱（微信或 WhatsApp 已填写时选填）" : "Email (optional if WeChat or WhatsApp is provided)"
        }
        error={errorText("email")}
      >
        <input className={input} id="email" name="email" type="email" autoComplete="email" />
      </Field>
      <Field
        id="contact"
        label={
          zh ? "微信或 WhatsApp（邮箱已填写时选填）" : "WeChat or WhatsApp (optional if email is provided)"
        }
        error={errorText("contact")}
      >
        <input className={input} id="contact" name="contact" autoComplete="tel" />
      </Field>
      <Field id="location" label={zh ? "项目地点（选填）" : "Project location (optional)"}>
        <input className={input} id="location" name="location" />
      </Field>
      <Field id="projectDate" label={zh ? "目标日期（选填）" : "Target date (optional)"}>
        <input className={input} id="projectDate" name="projectDate" type="date" />
      </Field>
      <Field
        id="summary"
        label={zh ? "需要我们做什么？" : "What do you need?"}
        error={errorText("summary")}
        wide
      >
        <textarea className={`${input} min-h-36`} id="summary" name="summary" />
      </Field>
      <label className="flex gap-3 text-sm md:col-span-2">
        <input
          id="consent"
          type="checkbox"
          name="consent"
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>
          {zh
            ? "我同意 Venus Bridge Media 使用以上信息评估并跟进本次咨询。"
            : "I consent to Venus Bridge Media using this information to assess and follow up this enquiry."}
          {errors.consent && (
            <span id="consent-error" className="mt-1 block text-red-700">
              {errorText("consent")}
            </span>
          )}
        </span>
      </label>
      <div className="hidden" aria-hidden>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {state === "fallback" && (
        <p role="alert" className="text-sm text-ink/70 md:col-span-2">
          {zh
            ? "在线提交尚未配置，信息未发送。"
            : "Online delivery is not configured, so your information was not sent."}{" "}
          <a className="text-blue" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
        </p>
      )}
      {state === "error" && Object.keys(errors).length === 0 && (
        <p role="alert" className="text-sm text-red-700 md:col-span-2">
          {zh
            ? "暂时无法提交。请稍后重试，或通过邮箱联系工作室。"
            : "The enquiry could not be delivered. Try again shortly or contact the studio by email."}
          {errorReference ? ` ${zh ? "参考编号" : "Reference"}: ${errorReference}` : ""}
        </p>
      )}
      <div className="md:col-span-2">
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending"
            ? zh
              ? "提交中…"
              : "Submitting…"
            : zh
              ? "发送快速咨询"
              : "Send quick enquiry"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  wide,
  children
}: {
  id: string;
  label: string;
  error?: string;
  wide?: boolean;
  children: React.ReactElement<{ "aria-describedby"?: string; "aria-invalid"?: boolean }>;
}) {
  const control = isValidElement(children)
    ? cloneElement(children, {
        "aria-describedby": error ? `${id}-error` : undefined,
        "aria-invalid": Boolean(error)
      })
    : children;
  return (
    <div className={`grid gap-2 ${wide ? "md:col-span-2" : ""}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {control}
      {error && (
        <span id={`${id}-error`} className="text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  );
}
