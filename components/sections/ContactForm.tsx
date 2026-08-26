"use client";
import { cloneElement, isValidElement, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { brand } from "@/content/brand";
import type { Language } from "@/lib/i18n";
import { marketEntryNeedKeys, projectTypes, type ProjectType } from "@/lib/contact/validation";
const pathOptions: Array<{ value: ProjectType; en: string; zh: string }> = [
  { value: "commercial", en: "Create content in the UK", zh: "在英国制作内容" },
  { value: "events", en: "Launch an event or product in the UK", zh: "在英国完成活动或产品发布" },
  { value: "market-entry", en: "Enter the UK market", zh: "进入英国市场" },
  { value: "other", en: "Not sure yet", zh: "暂不确定" }
];
const industryOptions = [
  ["automotive", "Automotive", "汽车与出行"],
  ["fashion-beauty-apparel", "Fashion, Beauty & Apparel", "时尚、美妆与服装"],
  ["entertainment-culture", "Entertainment & Culture", "娱乐与文化"],
  ["technology-ai-research", "Technology, AI & Research", "科技、AI 与科研"],
  ["other", "Other", "其他"]
] as const;
const serviceLabels = {
  production: { en: "Commercial production", zh: "商业制作" },
  talent: { en: "Talent coordination", zh: "人才协调" },
  research: { en: "Research and innovation", zh: "科研与创新" },
  events: { en: "Events, exhibitions and roadshows", zh: "活动、展会与路演" },
  localisation: { en: "UK production and local execution", zh: "英国制作与本地落地执行" }
};
const marketEntryNeedLabels: Record<(typeof marketEntryNeedKeys)[number], { en: string; zh: string }> = {
  readiness: { en: "Market-entry readiness", zh: "市场进入准备" },
  "company-setup": { en: "Company setup coordination", zh: "公司设立协同" },
  "accounting-tax-referral": { en: "Accounting or tax referral", zh: "会计或税务专业对接" },
  "vat-customs-eori-referral": { en: "VAT, customs or EORI referral", zh: "VAT、海关或 EORI 专业对接" },
  "trade-mark-ip-referral": { en: "Trade mark and IP referral", zh: "商标与知识产权专业对接" },
  "marketing-claims": { en: "Marketing and claims coordination", zh: "营销与声明合规协同" },
  "data-privacy-review": { en: "Data and privacy review coordination", zh: "数据与隐私审核协同" },
  "product-compliance-referral": { en: "Product compliance referral", zh: "产品合规专业对接" },
  "uk-launch-campaign": { en: "UK launch campaign", zh: "英国市场发布传播" },
  "roadshow-launch-event": { en: "Roadshow or launch event", zh: "路演或发布活动" },
  "local-production": { en: "Local production support", zh: "英国本地制作支持" }
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
    ["venueStatus", "Venue status", "场地状态", "text"],
    ["audience", "Audience type or estimated size", "受众类型或预计规模", "text"],
    ["speakerRequirement", "Presenter or talent requirement", "主持或人才需求", "text"],
    ["mediaContent", "Photography or video requirement", "摄影或视频需求", "text"],
    ["roadshowCities", "Roadshow cities if relevant", "相关路演城市", "text"]
  ],
  agency: [
    ["whiteLabel", "White-label requirement", "白标要求", "text"],
    ["confidentiality", "Confidentiality requirement", "保密要求", "text"],
    ["approvalStructure", "Client approval structure", "客户审核结构", "text"],
    ["localScope", "Local production scope", "本地制作范围", "text"],
    ["talentRequired", "Talent requirement", "人才需求", "text"],
    ["handoff", "Asset handoff format", "素材交付格式", "text"]
  ],
  "market-entry": [
    ["currentJurisdiction", "Current company jurisdiction", "当前公司注册地", "text"],
    ["ukEntityStatus", "Existing UK entity status", "是否已建立英国实体", "text"],
    ["entryStructure", "Subsidiary, branch or undecided", "子公司、分公司或尚未决定", "text"],
    ["targetEntryDate", "Target UK entry date", "目标进入时间", "text"],
    ["plannedUkActivity", "Planned UK business activity", "英国计划开展的业务", "text"],
    ["sellsProducts", "Will you sell products?", "是否销售产品", "text"],
    ["importsGoods", "Will you import goods?", "是否进口货物", "text"],
    ["productCategory", "Product category if relevant", "相关产品类别", "text"],
    ["hiresUkStaff", "Will you hire UK staff?", "是否雇佣英国员工", "text"],
    ["needsUkMarketing", "Do you need UK marketing?", "是否需要英国营销", "text"],
    ["collectsUkData", "Will you collect UK user data?", "是否收集英国用户数据", "text"],
    ["plansRoadshow", "Are you planning a roadshow?", "是否计划举行路演", "text"],
    [
      "investorCommunication",
      "Does this involve fundraising or investor communications?",
      "是否涉及融资或投资者沟通",
      "text"
    ],
    ["appointedAdvisers", "UK advisers already appointed", "已聘请的英国律师、会计师或其他顾问", "text"],
    [
      "coordinationScope",
      "What should Venus Bridge coordinate?",
      "希望 Venus Bridge 协调哪些部分",
      "text"
    ]
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
export function ContactForm({
  language,
  initialProject,
  showMarketEntry
}: {
  language: Language;
  initialProject?: string;
  showMarketEntry: boolean;
}) {
  const zh = language === "zh",
    normalizedInitial =
      initialProject === "create-in-the-uk"
        ? "commercial"
        : initialProject === "launch-in-the-uk"
          ? "events"
          : initialProject === "enter-the-uk"
            ? "market-entry"
            : initialProject,
    initial = projectTypes.includes(normalizedInitial as ProjectType)
      ? (normalizedInitial as ProjectType)
      : "";
  const [step, setStep] = useState(1),
    [startedAt] = useState(Date.now()),
    [projectType, setProjectType] = useState(initial),
    [state, setState] = useState<"idle" | "sending" | "success" | "fallback" | "error">("idle"),
    [errorReference, setErrorReference] = useState(""),
    [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const input =
    "min-h-[50px] w-full rounded-[10px] border border-ink/20 bg-pearl px-4 py-3 text-base outline-none transition hover:border-ink/40 focus:border-blue focus:ring-2 focus:ring-blue/15";
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
    const required = ["name", "company", "email", "projectType", "industry", "market", "summary"];
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
      enquiryType: "full",
      name: fd.get("name"),
      company: fd.get("company"),
      email: fd.get("email"),
      contact: fd.get("contact"),
      projectType,
      industry: fd.get("industry"),
      market: fd.get("market"),
      location: fd.get("location"),
      projectDate: fd.get("projectDate"),
      services: fd.getAll("services"),
      marketEntryNeeds: fd.getAll("marketEntryNeeds"),
      formats: fd.get("formats"),
      summary: fd.get("summary"),
      referenceLinks: fd.get("referenceLinks"),
      commercialParameters: fd.get("commercialParameters"),
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
      setErrorReference(body.requestId ?? "");
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
          "summary",
          "projectType",
          "industry"
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
      className="grid gap-5 rounded-[16px] border border-ink/10 bg-white p-6 md:grid-cols-2 md:p-9"
      aria-describedby="form-status"
    >
      <div className="md:col-span-2">
        <div className="mb-5 grid grid-cols-2 gap-3" aria-hidden>
          <span className={`h-px ${step >= 1 ? "bg-champagne" : "bg-ink/15"}`} />
          <span className={`h-px ${step >= 2 ? "bg-champagne" : "bg-ink/15"}`} />
        </div>
        <p className="text-xs text-slate" aria-live="polite">
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
          label={zh ? "首要项目路径" : "Primary project route"}
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
            {pathOptions
              .filter((option) => showMarketEntry || option.value !== "market-entry")
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option[language]}
                </option>
              ))}
          </select>
        </F>
        <F
          id="industry"
          label={zh ? "专业领域" : "Expertise sector"}
          error={errors.industry}
          language={language}
        >
          <select className={input} id="industry" name="industry" required defaultValue="">
            <option value="" disabled>
              {zh ? "请选择" : "Select one"}
            </option>
            {industryOptions.map(([value, en, cn]) => (
              <option key={value} value={value}>
                {zh ? cn : en}
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
        {projectType === "market-entry" ? (
          <fieldset className="rounded-[12px] border border-champagne/40 bg-mist p-5 md:col-span-2">
            <legend className="px-2 text-sm font-semibold">
              {zh
                ? "需要协调的市场进入工作流（可多选）"
                : "Market-entry workstreams to coordinate (select all that apply)"}
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {marketEntryNeedKeys.map((value) => (
                <label key={value} className="flex gap-2 text-sm leading-6">
                  <input type="checkbox" name="marketEntryNeeds" value={value} />
                  {marketEntryNeedLabels[value][language]}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}
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
        <F
          id="referenceLinks"
          label={zh ? "参考链接（选填）" : "Reference links (optional)"}
          language={language}
          wide
        >
          <textarea className={`${input} min-h-24`} id="referenceLinks" name="referenceLinks" />
        </F>
        <F
          id="commercialParameters"
          label={
            zh ? "相关商业条件（选填，自由填写）" : "Relevant commercial parameters (optional, free text)"
          }
          language={language}
          wide
        >
          <textarea className={`${input} min-h-24`} id="commercialParameters" name="commercialParameters" />
        </F>
        {projectType === "market-entry" ? (
          <p className="border-l-2 border-champagne pl-4 text-sm leading-6 text-ink/65 md:col-span-2">
            {zh
              ? "请勿通过本表单发送护照、身份证、银行资料、股东敏感信息或未加密 KYC 文件。需要时，我们会在审核后提供安全传输方式。"
              : "Do not send passports, identity documents, bank details, sensitive shareholder information or unencrypted KYC files through this form. If needed, a reviewed secure transfer route will be arranged separately."}
          </p>
        ) : null}
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
              ? "我同意 Venus Bridge Media 使用以上信息评估并跟进本次项目需求。"
              : "I consent to Venus Bridge Media using this information to assess and follow up this enquiry."}
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
        {state === "error" && Object.keys(errors).length === 0 && (
          <p role="alert" className="text-sm text-red-700 md:col-span-2">
            {zh
              ? "暂时无法提交。请稍后重试，或通过邮箱联系工作室。"
              : "The brief could not be delivered. Try again shortly or contact the studio by email."}
            {errorReference ? ` ${zh ? "参考编号" : "Reference"}: ${errorReference}` : ""}
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
      <label htmlFor={id} className="text-sm font-medium">
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
