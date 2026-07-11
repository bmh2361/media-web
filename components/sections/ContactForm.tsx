"use client";
import { cloneElement, isValidElement, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { brand } from "@/content/brand";
import type { Language } from "@/lib/i18n";
import { projectTypes, type ProjectType } from "@/lib/contact/validation";
const typeLabels = {
  en: [
    "Commercial campaign or photography",
    "Video or brand film",
    "Models, talent or creators",
    "Research or academic collaboration",
    "Technology event or exhibition",
    "Agency or white-label support",
    "Other"
  ],
  zh: [
    "商业广告或摄影",
    "视频或品牌影片",
    "模特、人才或创作者",
    "科研或学术协作",
    "科技活动或展会",
    "代理或白标支持",
    "其他"
  ]
};
const serviceLabels = {
  production: { en: "Commercial production", zh: "商业制作" },
  talent: { en: "Talent coordination", zh: "人才协调" },
  research: { en: "Research and innovation", zh: "科研与创新" },
  events: { en: "Events and exhibitions", zh: "活动与展会" },
  localisation: { en: "UK localisation and agency support", zh: "英国本地化与代理支持" }
};
const adaptive: Record<ProjectType, Array<[string, string, string, string]>> = {
  commercial: [
    ["contentType", "Content type", "内容类型", "text"],
    ["shootDays", "Number of shoot days", "拍摄天数", "number"],
    ["locationStatus", "Location status", "场地状态", "text"],
    ["talentRequired", "Talent required", "是否需要人才", "text"],
    ["stylingRequired", "Styling required", "是否需要造型", "text"],
    ["usageChannels", "Usage channels", "使用渠道", "text"]
  ],
  video: [
    ["videoFormat", "Video format", "视频形式", "text"],
    ["shootDays", "Number of shoot days", "拍摄天数", "number"],
    ["usageChannels", "Usage channels", "使用渠道", "text"]
  ],
  talent: [
    ["talentCategory", "Talent category", "人才类别", "text"],
    ["peopleCount", "Number of people", "人数", "number"],
    ["ageRange", "Age range if relevant", "相关年龄范围", "text"],
    ["languageSkills", "Language and skills", "语言与技能", "text"],
    ["usageTerritory", "Usage territory", "使用地区", "text"],
    ["usageChannels", "Usage channels", "使用渠道", "text"],
    ["usageDuration", "Usage duration", "使用期限", "text"]
  ],
  research: [
    ["technicalField", "Technical field", "技术领域", "text"],
    ["collaborationFormat", "Collaboration format", "协作形式", "text"],
    ["expertType", "Desired expert type", "期望专家类型", "text"],
    ["confidentiality", "Public or confidential", "公开或保密", "text"],
    ["institutionType", "Institution type", "机构类型", "text"],
    ["filmingEvent", "Filming or event requirement", "拍摄或活动需求", "text"]
  ],
  events: [
    ["eventFormat", "Event format", "活动形式", "text"],
    ["audience", "Estimated audience", "预计受众规模", "number"],
    ["venueStatus", "Venue status", "场地状态", "text"],
    ["speakerRequirement", "Speaker requirement", "嘉宾需求", "text"],
    ["stageAv", "Stage, AV and exhibition requirements", "舞台、视听与展陈需求", "text"],
    ["mediaContent", "Media content requirement", "媒体内容需求", "text"]
  ],
  agency: [
    ["whiteLabel", "White-label requirement", "白标要求", "text"],
    ["confidentiality", "Confidentiality requirement", "保密要求", "text"],
    ["approvalStructure", "Client approval structure", "客户审核结构", "text"],
    ["localScope", "Local production scope", "本地制作范围", "text"],
    ["talentRequired", "Talent requirement", "人才需求", "text"],
    ["handoff", "Asset handoff format", "素材交付格式", "text"]
  ],
  other: [["additionalDetail", "Additional project detail", "补充项目需求", "text"]]
};
const messages = {
  en: {
    required: "Please complete the required field.",
    invalid: "Please enter a valid work email.",
    too_short: "Please provide a little more detail about the project.",
    too_long: "This entry is too long.",
    form: "Please review the fields marked below.",
    too_fast: "Please wait a moment and review the brief before submitting."
  },
  zh: {
    required: "请填写此必填项。",
    invalid: "请输入有效的工作邮箱。",
    too_short: "请补充更多项目需求信息。",
    too_long: "填写内容过长。",
    form: "请检查下方标记的字段。",
    too_fast: "请稍候并检查项目需求后再提交。"
  }
};
const budgetOptions = {
  en: [
    ["under-10k", "Under GBP 10k"],
    ["10k-25k", "GBP 10k-25k"],
    ["25k-50k", "GBP 25k-50k"],
    ["50k-plus", "GBP 50k+"],
    ["to-discuss", "To discuss"]
  ],
  zh: [
    ["under-10k", "低于 GBP 10k"],
    ["10k-25k", "GBP 10k-25k"],
    ["25k-50k", "GBP 25k-50k"],
    ["50k-plus", "GBP 50k+"],
    ["to-discuss", "待讨论"]
  ]
} as const;
export function ContactForm({ language, initialProject }: { language: Language; initialProject?: string }) {
  const zh = language === "zh",
    initial = projectTypes.includes(initialProject as ProjectType) ? (initialProject as ProjectType) : "";
  const [step, setStep] = useState(1),
    [startedAt] = useState(Date.now()),
    [projectType, setProjectType] = useState(initial),
    [state, setState] = useState<"idle" | "sending" | "success" | "fallback" | "error">("idle"),
    [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const input =
    "w-full border border-ink/20 bg-pearl px-4 py-3 text-sm outline-none focus:border-blue focus:ring-2 focus:ring-blue/20";
  function clearError(name: string) {
    setErrors((current) => {
      if (!current[name]) return current;
      const remaining = { ...current };
      delete remaining[name];
      return remaining;
    });
  }
  function focusField(name: string) {
    requestAnimationFrame(() => {
      const field = formRef.current?.querySelector<HTMLElement>(`#${name}`);
      field?.scrollIntoView({ block: "center", behavior: "smooth" });
      field?.focus();
    });
  }
  function validateStepOne(form: HTMLFormElement) {
    const values = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const required = ["name", "company", "email", "projectType", "market", "summary"];
    for (const name of required) if (!String(values.get(name) ?? "").trim()) nextErrors[name] = "required";
    const email = String(values.get("email") ?? "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "invalid";
    if (
      String(values.get("summary") ?? "").trim().length > 0 &&
      String(values.get("summary") ?? "").trim().length < 20
    )
      nextErrors.summary = "too_short";
    return nextErrors;
  }
  function goNext() {
    const form = formRef.current;
    if (!form) return;
    const nextErrors = validateStepOne(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      focusField(Object.keys(nextErrors)[0]);
      return;
    }
    setErrors({});
    setStep(2);
    requestAnimationFrame(() =>
      form.querySelector<HTMLElement>('[data-step="2"] input, [data-step="2"] textarea')?.focus()
    );
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget),
      adaptiveData = Object.fromEntries(
        adaptive[(projectType || "commercial") as ProjectType].map(([k]) => [k, String(fd.get(k) ?? "")])
      );
    const payload = {
      name: fd.get("name"),
      company: fd.get("company"),
      email: fd.get("email"),
      contact: fd.get("contact"),
      projectType,
      market: fd.get("market"),
      location: fd.get("location"),
      projectDate: fd.get("projectDate"),
      budget: fd.get("budget"),
      services: fd.getAll("services"),
      formats: fd.get("formats"),
      summary: fd.get("summary"),
      source: fd.get("source"),
      consent: fd.get("consent") === "on",
      website: fd.get("website"),
      startedAt,
      adaptive: adaptiveData
    };
    try {
      const r = await fetch("/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload)
        }),
        body = await r.json();
      if (r.ok) {
        setState("success");
        return;
      }
      if (body.error === "validation") {
        setErrors(body.fields);
        setState("error");
        const key = Object.keys(body.fields)[0];
        const fieldStep = [
          "name",
          "company",
          "email",
          "market",
          "location",
          "projectDate",
          "budget",
          "summary",
          "projectType"
        ].includes(key)
          ? 1
          : 2;
        setStep(fieldStep);
        focusField(key);
      } else setState(body.error === "not_configured" ? "fallback" : "error");
    } catch {
      setState("error");
    }
  }
  if (state === "success")
    return (
      <div className="border-l-2 border-blue bg-white p-8">
        <h2 className="text-3xl font-semibold">{zh ? "项目需求已提交" : "Your brief has been received"}</h2>
        <p className="mt-5 leading-7 text-ink/70">
          {zh
            ? "我们会先评估项目范围、所需资源与英国本地执行条件，再与您确认下一步。"
            : "We will review the project scope, required resources and UK execution requirements before responding."}
        </p>
      </div>
    );
  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      onChange={(event) => {
        const target = event.target;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLSelectElement ||
          target instanceof HTMLTextAreaElement
        )
          clearError(target.name);
      }}
      className="grid gap-5 border border-ink/10 bg-white/70 p-6 md:grid-cols-2"
      aria-describedby="form-status"
    >
      <div className="md:col-span-2">
        <p className="text-xs uppercase tracking-editorial text-slate" aria-live="polite">
          {step === 1
            ? zh
              ? "第 1 步，共 2 步：项目基础信息"
              : "Step 1 of 2: Project basics"
            : zh
              ? "第 2 步，共 2 步：项目详细需求"
              : "Step 2 of 2: Project requirements"}
        </p>
        <h2 className="mt-2 text-2xl font-semibold">
          {step === 1
            ? zh
              ? "项目基础信息"
              : "Project basics"
            : zh
              ? "项目详细需求"
              : "Project requirements"}
        </h2>
      </div>
      {Object.keys(errors).length > 0 && (
        <div
          id="form-status"
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          className="border-l border-red-700 pl-4 text-sm text-red-700 md:col-span-2"
        >
          <p>{zh ? "请检查表单中的错误后重试。" : "Please review the form errors and try again."}</p>
          <ul className="mt-2 grid gap-1">
            {Object.keys(errors)
              .filter((key) => key !== "form")
              .map((key) => (
                <li key={key}>
                  <button type="button" className="underline" onClick={() => focusField(key)}>
                    {zh ? `查看 ${key} 字段错误` : `Review ${key} field error`}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
      <div data-step="1" className={`${step === 1 ? "contents" : "hidden"}`}>
        <F id="name" label={zh ? "姓名" : "Name"} error={errors.name} language={language}>
          <input
            className={input}
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
          />
        </F>
        <F
          id="company"
          label={zh ? "公司或机构" : "Company or organisation"}
          error={errors.company}
          language={language}
        >
          <input
            className={input}
            id="company"
            name="company"
            autoComplete="organization"
            required
            aria-invalid={Boolean(errors.company)}
          />
        </F>
        <F id="email" label={zh ? "工作邮箱" : "Work email"} error={errors.email} language={language}>
          <input
            className={input}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
          />
        </F>
        <F id="contact" label={zh ? "电话或微信（选填）" : "Phone or WeChat (optional)"} language={language}>
          <input className={input} id="contact" name="contact" autoComplete="tel" />
        </F>
        <F
          id="projectType"
          label={zh ? "项目类型" : "Project type"}
          error={errors.projectType}
          language={language}
        >
          <select
            className={input}
            id="projectType"
            name="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as ProjectType)}
            required
            aria-invalid={Boolean(errors.projectType)}
          >
            <option value="" disabled>
              {zh ? "请选择" : "Select one"}
            </option>
            {projectTypes.map((x, i) => (
              <option key={x} value={x}>
                {typeLabels[language][i]}
              </option>
            ))}
          </select>
        </F>
        <F id="market" label={zh ? "目标市场" : "Target market"} error={errors.market} language={language}>
          <select
            className={input}
            id="market"
            name="market"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.market)}
          >
            <option value="" disabled>
              {zh ? "请选择" : "Select one"}
            </option>
            <option value="uk">{zh ? "英国" : "United Kingdom"}</option>
            <option value="china">{zh ? "中国" : "China"}</option>
            <option value="international">{zh ? "国际市场" : "International"}</option>
            <option value="other">{zh ? "其他" : "Other"}</option>
          </select>
        </F>
        <F id="location" label={zh ? "意向地点" : "Preferred location"} language={language}>
          <input className={input} id="location" name="location" />
        </F>
        <F id="projectDate" label={zh ? "意向日期" : "Preferred project date"} language={language}>
          <input className={input} id="projectDate" name="projectDate" type="date" />
        </F>
        <F
          id="budget"
          label={zh ? "预算范围" : "Approximate budget"}
          error={errors.budget}
          language={language}
        >
          <select
            className={input}
            id="budget"
            name="budget"
            defaultValue=""
            aria-invalid={Boolean(errors.budget)}
          >
            <option value="">{zh ? "请选择预算范围（选填）" : "Select a range (optional)"}</option>
            {budgetOptions[language].map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </F>
        <F
          id="summary"
          label={zh ? "项目目标或概述" : "Project objective or summary"}
          error={errors.summary}
          language={language}
          wide
        >
          <textarea
            className={`${input} min-h-32`}
            id="summary"
            name="summary"
            required
            aria-invalid={Boolean(errors.summary)}
          />
        </F>
        <div className="md:col-span-2">
          <Button type="button" onClick={goNext}>
            {zh ? "下一步：详细需求" : "Next: project requirements"}
          </Button>
        </div>
      </div>
      <div data-step="2" className={`${step === 2 ? "contents" : "hidden"}`}>
        {adaptive[(projectType || "commercial") as ProjectType].map(([id, en, cn, type]) => (
          <F key={id} id={id} label={zh ? cn : en} language={language}>
            <input className={input} id={id} name={id} type={type} />
          </F>
        ))}
        <F
          id="formats"
          label={zh ? "交付形式" : "Deliverable formats"}
          error={errors.formats}
          language={language}
        >
          <select
            className={input}
            id="formats"
            name="formats"
            defaultValue=""
            aria-invalid={Boolean(errors.formats)}
          >
            <option value="">{zh ? "待讨论" : "To discuss"}</option>
            <option value="photography">{zh ? "摄影" : "Photography"}</option>
            <option value="video">{zh ? "视频" : "Video"}</option>
            <option value="mixed">{zh ? "图片与视频" : "Photography and video"}</option>
            <option value="event-assets">{zh ? "活动素材" : "Event assets"}</option>
            <option value="other">{zh ? "其他" : "Other"}</option>
          </select>
        </F>
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-semibold">{zh ? "所需服务" : "Required services"}</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {Object.entries(serviceLabels).map(([value, label]) => (
              <label key={value} className="flex gap-2 text-sm">
                <input type="checkbox" name="services" value={value} />
                {label[language]}
              </label>
            ))}
          </div>
        </fieldset>
        <F id="source" label={zh ? "如何了解到我们" : "How did you hear about us"} language={language}>
          <input className={input} id="source" name="source" />
        </F>
        <label className="flex gap-3 text-sm md:col-span-2">
          <input
            id="consent"
            type="checkbox"
            name="consent"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            {zh
              ? "我同意镜桥使用以上信息评估并跟进本次项目需求。"
              : "I consent to FrameBridge using this information to assess and follow up this enquiry."}
            {errors.consent && (
              <span id="consent-error" className="block text-red-700">
                {messages[language][errors.consent as keyof typeof messages.en]}
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
              ? "在线提交尚未配置，您的信息并未发送。"
              : "Online delivery is not configured, so your information was not sent."}{" "}
            <a className="text-blue" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
          </p>
        )}
        <div className="flex gap-3 md:col-span-2">
          <Button type="button" variant="secondary" onClick={() => setStep(1)}>
            {zh ? "返回" : "Back"}
          </Button>
          <Button type="submit" disabled={state === "sending"} data-analytics="contact-submit">
            {state === "sending"
              ? zh
                ? "提交中…"
                : "Submitting…"
              : zh
                ? "提交项目需求"
                : "Submit project brief"}
          </Button>
        </div>
      </div>
    </form>
  );
}
function F({
  id,
  label,
  error,
  language,
  wide,
  children
}: {
  id: string;
  label: string;
  error?: string;
  language: Language;
  wide?: boolean;
  children: React.ReactElement<{ "aria-describedby"?: string }>;
}) {
  const message = error ? messages[language][error as keyof typeof messages.en] : undefined;
  const control = isValidElement(children)
    ? cloneElement(children, { "aria-describedby": message ? `${id}-error` : undefined })
    : children;
  return (
    <div className={`grid gap-2 ${wide ? "md:col-span-2" : ""}`}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {control}
      {message && (
        <span id={`${id}-error`} className="text-xs text-red-700">
          ⚠ {message}
        </span>
      )}
    </div>
  );
}
