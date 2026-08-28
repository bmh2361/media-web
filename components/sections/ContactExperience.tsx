"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Language } from "@/lib/i18n";
import { trackMeasurement } from "@/lib/measurement";

type Status = "idle" | "sending" | "success" | "error";
type Intent = "company" | "partner" | "other";

const companyStages = [
  ["exploring", "正在探索英国 / 欧洲", "Exploring the UK / Europe"],
  ["launch-exhibition", "筹备发布或展会", "Preparing a launch or exhibition"],
  ["buyers-partners", "寻找买家 / 合作方", "Looking for buyers / partners"],
  ["operating-locally", "已经在当地运营", "Already operating locally"],
  ["local-execution", "需要本地执行", "Need local execution"],
  ["other", "其他", "Other"]
] as const;

const collaboratorTypes = [
  ["university-research", "高校与研究机构", "University or research institution"],
  ["industry-organisation", "行业组织", "Industry organisation"],
  ["event-exhibition", "活动与展览", "Event or exhibition organisation"],
  ["business-professional-services", "商业与专业服务", "Business or professional services"],
  ["media-editorial", "媒体与编辑", "Media or editorial"],
  ["creator-talent", "创作者与人才", "Creator or talent"],
  ["venue", "场地", "Venue"],
  ["creative-production", "创意与制作", "Creative or production"],
  ["other", "其他", "Other"]
] as const;

export function ContactExperience({
  language,
  initialIntent = "company",
  fallbackEmail
}: {
  language: Language;
  initialIntent?: Intent;
  fallbackEmail: string | null;
}) {
  const zh = language === "zh";
  const [intent, setIntent] = useState<Intent>(initialIntent);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt] = useState(() => Date.now());
  const contactStarted = useRef(false);

  function trackStart() {
    if (contactStarted.current) return;
    contactStarted.current = true;
    trackMeasurement("contact_start", { intent });
  }

  function completeStep(stepNumber: number, nextStep: number) {
    trackMeasurement("contact_step_complete", { contact_type: intent, step_number: stepNumber });
    setStep(nextStep);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const invalid = form.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      ":invalid"
    );
    if (invalid) {
      const invalidStep = Number(
        invalid.closest<HTMLElement>("[data-contact-step]")?.dataset.contactStep ?? 3
      );
      setStep(invalidStep);
      window.setTimeout(() => {
        invalid.reportValidity();
        invalid.focus();
      }, 0);
      return;
    }
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const objective = value("objective");
    const partnerContext =
      intent === "partner"
        ? [
            `Collaborator type: ${value("collaboratorType")}`,
            `Relevant China-related projects: ${value("relevantProjects")}`
          ].join("\n")
        : "";
    const companyContext = intent === "company" ? `Business situation: ${value("businessStage")}` : "";
    const summary = [objective, companyContext, partnerContext].filter(Boolean).join("\n\n");
    trackMeasurement("contact_step_complete", { contact_type: intent, step_number: 3 });
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          enquiryType: "quick",
          name: value("name"),
          company: value("company"),
          role: value("role"),
          email: value("email"),
          projectType: intent === "partner" ? "agency" : "other",
          industry: "other",
          market: intent === "partner" ? "international" : "uk",
          services: [],
          summary,
          objective,
          timing: value("timing"),
          companyWebsite: value("companyWebsite"),
          source: `phase-5-${intent}-enquiry`,
          consent: data.get("consent") === "on",
          website: value("website"),
          startedAt
        })
      });
      setStatus(response.ok ? "success" : "error");
      trackMeasurement(response.ok ? "contact_submit_success" : "contact_submit_failure", {
        contact_type: intent,
        ...(response.ok ? {} : { error_type: "api" })
      });
      if (response.ok) form.reset();
    } catch {
      setStatus("error");
      trackMeasurement("contact_submit_failure", { contact_type: intent, error_type: "network" });
    }
  }

  const input =
    "mt-2 min-h-12 w-full rounded border border-ink/15 bg-white/75 px-4 py-3 text-base outline-none transition-[border-color,background-color,box-shadow] duration-200 ease-editorial hover:border-ink/30 focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15";
  const label = "text-sm font-medium text-ink";
  const intentLabels: Record<Intent, [string, string]> = {
    company: ["企业项目", "Company project"],
    partner: ["介绍机构", "Introduce an organisation"],
    other: ["机构或其他咨询", "Institutional or other enquiry"]
  };

  const advanceFromContext = (form: HTMLFormElement | null) => {
    const context = form?.querySelector<HTMLElement>('[data-contact-step="2"]');
    const invalid = context?.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      ":invalid"
    );
    if (invalid) {
      invalid.reportValidity();
      invalid.focus();
      return;
    }
    completeStep(2, 3);
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      onFocusCapture={trackStart}
      className="contact-conversation-form grid gap-7 border-t border-ink/15 bg-white/55 px-5 py-8 sm:px-8 sm:py-10"
      data-mobile-reveal
      data-contact-current-step={step}
    >
      <div className="contact-step-status" aria-live="polite">
        <div className="contact-step-status__rail" aria-hidden="true">
          {[1, 2, 3].map((item) => (
            <span key={item} data-active={step >= item || undefined} />
          ))}
        </div>
        <p>{String(step).padStart(2, "0")} / 03</p>
        <h2 id={`contact-step-${step}-title`}>
          {step === 1
            ? zh
              ? "我们要讨论什么？"
              : "What are we discussing?"
            : step === 2
              ? zh
                ? "接下来需要实现什么？"
                : "What needs to happen?"
              : zh
                ? "我们应该如何联系你？"
                : "How should we reach you?"}
        </h2>
      </div>

      <div className="contact-form-step" data-contact-step="1" data-active={step === 1 || undefined}>
        <fieldset>
          <legend className={label}>
            {zh ? "你希望从哪一类沟通开始？" : "Which conversation would you like to start?"}
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(Object.keys(intentLabels) as Intent[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={intent === key}
                onClick={() => {
                  setIntent(key);
                  trackMeasurement("contact_intent", { intent: key });
                }}
                className={`min-h-12 rounded border px-4 py-3 text-sm font-semibold transition ${intent === key ? "border-ink bg-ink text-pearl" : "border-ink/15 bg-white text-ink hover:border-champagne"}`}
              >
                {intentLabels[key][zh ? 0 : 1]}
              </button>
            ))}
          </div>
        </fieldset>
        <button type="button" className="contact-mobile-next" onClick={() => completeStep(1, 2)}>
          {zh ? "下一步：项目背景" : "Next: project context"}
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="contact-desktop-field-grid grid gap-5 sm:grid-cols-2">
        <div className="contact-form-step" data-contact-step="3" data-active={step === 3 || undefined}>
          <label className={label}>
            {zh ? "姓名" : "Name"}
            <input name="name" required className={input} />
          </label>
          <label className={label}>
            {zh ? "机构或公司" : "Organisation"}
            <input name="company" required className={input} />
          </label>
          <label className={label}>
            {zh ? "职位（选填）" : "Role (optional)"}
            <input name="role" className={input} />
          </label>
          <label className={label}>
            {zh ? "邮箱" : "Email"}
            <input name="email" type="email" required className={input} />
          </label>
          <label className={label}>
            {zh ? "网站（选填）" : "Website (optional)"}
            <input name="companyWebsite" type="url" className={input} />
          </label>
        </div>

        <div className="contact-form-step" data-contact-step="2" data-active={step === 2 || undefined}>
          {intent === "company" ? (
            <>
              <label className={label}>
                {zh ? "当前阶段" : "Current situation"}
                <select name="businessStage" required defaultValue="" className={input}>
                  <option value="" disabled>
                    {zh ? "请选择" : "Select one"}
                  </option>
                  {companyStages.map(([value, zhLabel, enLabel]) => (
                    <option key={value} value={value}>
                      {zh ? zhLabel : enLabel}
                    </option>
                  ))}
                </select>
              </label>
              <label className={label}>
                {zh ? "大致时间（选填）" : "Timing (optional)"}
                <input name="timing" className={input} />
              </label>
            </>
          ) : null}
          {intent === "partner" ? (
            <>
              <label className={label}>
                {zh ? "合作方类型" : "Collaborator type"}
                <select name="collaboratorType" required defaultValue="" className={input}>
                  <option value="" disabled>
                    {zh ? "请选择" : "Select one"}
                  </option>
                  {collaboratorTypes.map(([value, zhLabel, enLabel]) => (
                    <option key={value} value={value}>
                      {zh ? zhLabel : enLabel}
                    </option>
                  ))}
                </select>
              </label>
              <label className={label}>
                {zh ? "哪些中国相关项目与你们有关？" : "What kinds of China-related projects are relevant?"}
                <textarea name="relevantProjects" required rows={4} className={input} />
              </label>
            </>
          ) : null}
        </div>
      </div>

      <div className="contact-form-step" data-contact-step="2" data-active={step === 2 || undefined}>
        <label className={label}>
          {intent === "company"
            ? zh
              ? "希望在英国或欧洲实现什么？"
              : "What are you trying to achieve in the UK or Europe?"
            : intent === "partner"
              ? zh
                ? "你的机构适合参与哪些项目？"
                : "What kinds of projects would suit your organisation?"
              : zh
                ? "你希望实现或了解什么？"
                : "What are you trying to achieve or find out?"}
          <textarea name="objective" required minLength={10} rows={6} className={input} />
        </label>
        <div className="contact-mobile-actions">
          <button type="button" onClick={() => setStep(1)}>
            {zh ? "返回" : "Back"}
          </button>
          <button
            type="button"
            className="contact-mobile-next"
            onClick={(event) => advanceFromContext(event.currentTarget.form)}
          >
            {zh ? "下一步：联系方式" : "Next: contact details"}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="contact-form-step" data-contact-step="3" data-active={step === 3 || undefined}>
        <label className="hidden" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-ink/65">
          <input name="consent" type="checkbox" required className="mt-0.5 size-6 shrink-0 accent-ink" />
          <span>
            {zh
              ? "我同意 Venus Bridge Media 为回复本次咨询而处理以上信息。"
              : "I consent to Venus Bridge Media processing this information to respond to this enquiry."}
          </span>
        </label>
        <div className="contact-mobile-actions">
          <button type="button" onClick={() => setStep(2)}>
            {zh ? "返回" : "Back"}
          </button>
          <button
            type="submit"
            disabled={status === "sending"}
            className="contact-submit inline-flex min-h-12 items-center justify-center rounded bg-ink px-6 py-3 font-semibold text-pearl transition-[color,background-color,border-color,transform] duration-200 ease-editorial hover:bg-champagne hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue active:translate-y-px disabled:opacity-50"
          >
            {status === "sending" ? (zh ? "正在提交…" : "Sending…") : zh ? "提交咨询" : "Send enquiry"}
          </button>
        </div>
        <p className="text-sm text-ink/65">
          {zh
            ? "我们会直接审核每一项咨询，并回复最有帮助的下一步。"
            : "We review every enquiry directly and respond with the most useful next step."}
          {fallbackEmail ? (
            <>
              {" "}
              {zh ? "如表单无法提交，请发送邮件至" : "If the form is unavailable, email"}{" "}
              <a
                className="font-semibold text-blue underline-offset-4 hover:underline"
                href={`mailto:${fallbackEmail}`}
              >
                {fallbackEmail}
              </a>
              {zh ? "。" : "."}
            </>
          ) : null}
        </p>
        <p aria-live="polite" className="text-sm">
          {status === "success"
            ? zh
              ? "已收到，我们会审核信息后回复。"
              : "Received. We will review the information and respond."
            : status === "error"
              ? zh
                ? "暂时无法提交，请稍后重试。"
                : "We could not submit this yet. Please try again."
              : ""}
        </p>
      </div>
    </form>
  );
}
