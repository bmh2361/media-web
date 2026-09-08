"use client";

import { useState, type FormEvent, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import type { Language } from "@/lib/i18n";

type FormKind = "fit-call" | "execution";
type Status = "idle" | "sending" | "success" | "error";

export function CommercialContactForm({ language, kind }: { language: Language; kind: FormKind }) {
  const zh = language === "zh";
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt] = useState(() => Date.now());

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const fit = kind === "fit-call";
    const objective = value("objective");
    const deliverables = value("deliverables");
    const payload = {
      enquiryType: fit ? "quick" : "full",
      name: value("name"),
      company: value("company"),
      email: value("email"),
      contact: value("contact"),
      projectType: fit ? "other" : "commercial",
      industry: "other",
      market: "uk",
      location: value("location"),
      projectDate: value("projectDate"),
      services: fit ? [] : ["production"],
      summary: fit ? objective : `${objective}\n\nDeliverables: ${deliverables}`,
      referenceLinks: value("projectLink"),
      source: `contact-${kind}`,
      consent: data.get("consent") === "on",
      website: value("website"),
      startedAt,
      role: value("role"),
      companyWebsite: value("companyWebsite"),
      ukStage: value("ukStage"),
      timing: value("timing"),
      mainUncertainty: value("mainUncertainty"),
      objective,
      deliverables,
      channels: value("channels"),
      localNeeds: value("localNeeds"),
      usage: value("usage"),
      approvalOwner: value("approvalOwner")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      setStatus(response.ok ? "success" : "error");
      if (response.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded border border-ink/15 bg-white px-4 py-3 text-base outline-none transition focus:border-champagne";
  const labelClass = "text-sm font-medium text-ink";

  return (
    <form onSubmit={submit} className="grid gap-6 rounded-[14px] border border-ink/10 bg-white/70 p-5 sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={zh ? "姓名" : "Name"}
          name="name"
          required
          className={inputClass}
          labelClass={labelClass}
        />
        <Field
          label={zh ? "公司" : "Company"}
          name="company"
          required
          className={inputClass}
          labelClass={labelClass}
        />
      </div>

      {kind === "fit-call" ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={zh ? "邮箱" : "Email"}
              name="email"
              type="email"
              required
              className={inputClass}
              labelClass={labelClass}
            />
            <Field
              label={zh ? "公司网站（选填）" : "Company website (optional)"}
              name="companyWebsite"
              type="url"
              className={inputClass}
              labelClass={labelClass}
            />
          </div>
          <label className={labelClass}>
            {zh ? "当前英国市场阶段" : "Current UK stage"}
            <select name="ukStage" required className={inputClass} defaultValue="">
              <option value="" disabled>
                {zh ? "请选择" : "Select one"}
              </option>
              <option value="exploring">{zh ? "探索英国市场" : "Exploring the UK"}</option>
              <option value="preparing-launch">{zh ? "筹备英国发布" : "Preparing a UK launch"}</option>
              <option value="building-presence">{zh ? "建立英国市场存在" : "Building UK presence"}</option>
              <option value="ready-delivery">{zh ? "准备本地执行" : "Ready for local delivery"}</option>
              <option value="not-sure">{zh ? "暂时不确定" : "Not sure yet"}</option>
            </select>
          </label>
          <TextArea
            label={zh ? "希望在英国实现什么？" : "What do you want to achieve in the UK?"}
            name="objective"
            required
            className={inputClass}
            labelClass={labelClass}
          />
          <Field
            label={zh ? "大致时间（选填）" : "Timing (optional)"}
            name="timing"
            className={inputClass}
            labelClass={labelClass}
          />
        </>
      ) : (
        <>
          <TextArea
            label={zh ? "项目目标" : "Objective"}
            name="objective"
            required
            className={inputClass}
            labelClass={labelClass}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={zh ? "地点" : "Location"}
              name="location"
              required
              className={inputClass}
              labelClass={labelClass}
            />
            <Field
              label={zh ? "日期" : "Date"}
              name="projectDate"
              required
              className={inputClass}
              labelClass={labelClass}
            />
          </div>
          <TextArea
            label={zh ? "需要交付的内容" : "Deliverables"}
            name="deliverables"
            required
            className={inputClass}
            labelClass={labelClass}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={zh ? "使用渠道" : "Channels"}
              name="channels"
              required
              className={inputClass}
              labelClass={labelClass}
            />
            <Field
              label={zh ? "人才、场地或活动需求" : "Talent, venue or event needs"}
              name="localNeeds"
              className={inputClass}
              labelClass={labelClass}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={zh ? "使用范围" : "Usage"}
              name="usage"
              required
              className={inputClass}
              labelClass={labelClass}
            />
            <Field
              label={zh ? "审批负责人" : "Approval owner"}
              name="approvalOwner"
              required
              className={inputClass}
              labelClass={labelClass}
            />
          </div>
          <Field
            label={zh ? "参考链接（可选）" : "Project link (optional)"}
            name="projectLink"
            type="url"
            className={inputClass}
            labelClass={labelClass}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={zh ? "邮箱" : "Email"}
              name="email"
              type="email"
              required
              className={inputClass}
              labelClass={labelClass}
            />
            <Field
              label={zh ? "其他联系方式" : "Other contact"}
              name="contact"
              className={inputClass}
              labelClass={labelClass}
            />
          </div>
        </>
      )}

      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="flex min-h-11 items-start gap-3 text-sm leading-6 text-ink/65">
        <input name="consent" type="checkbox" required className="mt-0.5 size-6 shrink-0" />
        <span>
          {zh
            ? "我同意 Venus Bridge 为回复本次咨询而处理以上信息。"
            : "I consent to Venus Bridge processing this information to respond to this enquiry."}
        </span>
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 items-center justify-center rounded bg-ink px-6 py-3 font-semibold text-pearl transition hover:bg-champagne hover:text-ink disabled:opacity-50"
      >
        {status === "sending"
          ? zh
            ? "正在提交…"
            : "Sending…"
          : kind === "fit-call"
            ? zh
              ? "申请 20 分钟英国市场沟通"
              : "Request a 20-minute UK Fit Call"
            : zh
              ? "提交英国执行需求"
              : "Send an Execution Brief"}
      </button>
      <p aria-live="polite" className="text-sm">
        {status === "success"
          ? zh
            ? "已收到，我们会审核信息后回复。"
            : "Received. We will review the information and respond."
          : status === "error"
            ? zh
              ? "暂时无法提交，请稍后重试或使用页面上的直接联系方式。"
              : "We could not submit this yet. Please retry or use a direct contact route shown on this page."
            : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  labelClass,
  className,
  ...input
}: {
  label: string;
  labelClass: string;
  className: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={labelClass}>
      {label}
      <input {...input} className={className} />
    </label>
  );
}

function TextArea({
  label,
  labelClass,
  className,
  ...input
}: {
  label: string;
  labelClass: string;
  className: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={labelClass}>
      {label}
      <textarea {...input} rows={5} className={className} />
    </label>
  );
}
