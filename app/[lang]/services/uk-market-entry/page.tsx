import { ArrowDownRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { marketEntryContent as c, marketEntryGovernance } from "@/content/market-entry";
import { isSupportedLocale, type Language, withLanguage } from "@/lib/i18n";
import { getEffectiveMarketEntryMode } from "@/lib/release";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  const mode = getEffectiveMarketEntryMode();
  return buildMetadata({
    lang,
    path: "/services/uk-market-entry",
    title:
      lang === "zh"
        ? "英国市场进入与合规协同｜Venus Bridge"
        : "UK Market Entry & Compliance Coordination | Venus Bridge",
    description:
      lang === "zh"
        ? "为中国品牌与国际团队提供英国市场进入协同，包括公司设立准备、专业机构对接、传播合规、路演及英国本地执行。"
        : "Bilingual UK market-entry coordination for Chinese brands and international teams, covering setup preparation, specialist referrals, compliance-aware communications, roadshows and local delivery.",
    allowIndex:
      mode !== "hidden" &&
      process.env.RELEASE_PROFILE === "production" &&
      marketEntryGovernance.legalReviewStatus === "approved"
  });
}

export default async function MarketEntryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const mode = getEffectiveMarketEntryMode();
  if (mode === "hidden") notFound();
  const language: Language = lang;
  const zh = language === "zh";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((item) => ({
      "@type": "Question",
      name: item.q[language],
      acceptedAnswer: { "@type": "Answer", text: item.a[language] }
    }))
  };

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          lang: language,
          name: c.title[language],
          description: c.intro[language],
          path: "/services/uk-market-entry"
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          lang: language,
          items: [
            { name: "Venus Bridge", path: "/" },
            { name: zh ? "服务" : "Services", path: "/services" },
            { name: zh ? "英国市场进入与合规协同" : "UK Market Entry", path: "/services/uk-market-entry" }
          ]
        })}
      />
      <JsonLd data={faqSchema} />

      <section className="overflow-hidden bg-ink pt-16 text-pearl">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:py-28">
          <div>
            <p className="eyebrow text-champagne">{c.eyebrow[language]}</p>
            <h1 className="editorial-heading mt-6 max-w-[15ch] text-balance">{c.title[language]}</h1>
            <p className="body-large mt-7 max-w-3xl text-pearl/70">{c.intro[language]}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={withLanguage("/contact?project=market-entry", language)}
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-champagne px-6 py-3 text-sm font-semibold text-ink transition hover:bg-pearl"
              >
                {c.primaryCta[language]} <ArrowRight size={16} />
              </Link>
              <a
                href="#coordination-scope"
                className="inline-flex min-h-12 items-center gap-3 rounded-full border border-pearl/25 px-6 py-3 text-sm font-semibold transition hover:border-champagne hover:text-champagne"
              >
                {c.secondaryCta[language]} <ArrowDownRight size={16} />
              </a>
            </div>
          </div>
          <div className="relative border border-champagne/25 bg-night p-7 lg:p-10">
            <BrandLogo variant="tagline" surface="dark" className="w-56" sizes="224px" priority />
            <p className="mt-10 text-xs uppercase tracking-editorial text-champagne">
              {zh ? "当前公开范围" : "Current public scope"}
            </p>
            <p className="mt-3 text-2xl font-medium">
              {zh ? "项目协调与专业机构转介" : "Coordination and specialist referral"}
            </p>
            <p className="mt-5 text-sm leading-7 text-pearl/65">{c.boundary[language]}</p>
          </div>
        </div>
        <div className="border-y border-champagne/20 bg-night">
          <div className="container-x py-6 text-sm leading-7 text-pearl/75">
            <strong className="font-medium text-champagne">
              {zh ? "责任边界：" : "Responsibility boundary: "}
            </strong>
            {c.boundary[language]}
          </div>
        </div>
      </section>

      <section className="section-y bg-porcelain" aria-labelledby="market-entry-route">
        <div className="container-x">
          <p className="eyebrow text-champagne">{zh ? "市场进入路径" : "Market Entry Route"}</p>
          <h2 id="market-entry-route" className="editorial-heading mt-5 max-w-[15ch]">
            {zh
              ? "从准备、审核到市场呈现，使用同一条双语路径。"
              : "One bilingual route from readiness to market presentation."}
          </h2>
          <ol className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-7">
            {c.route.map((step, index) => (
              <li key={step.en} className="min-h-32 bg-pearl p-5">
                <span className="text-xs text-champagne">0{index + 1}</span>
                <p className="mt-8 font-medium">{step[language]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="coordination-scope" className="section-y scroll-mt-24 bg-pearl">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <p className="eyebrow text-champagne">{zh ? "七个工作流" : "Seven connected workstreams"}</p>
              <h2 className="editorial-heading mt-5 max-w-[13ch]">
                {zh
                  ? "把分散的准备工作连接到正式发布。"
                  : "Connect fragmented preparation to an organised launch."}
              </h2>
            </div>
            <p className="body-large max-w-2xl text-ink/65">
              {zh
                ? "每个工作流都区分我们可以直接交付的项目管理、需要专业机构判断的事项，以及客户必须批准的最终决定。"
                : "Each workstream separates the project management we can deliver, the conclusions a specialist must make and the final decisions the client must approve."}
            </p>
          </div>
          <div className="mt-14 grid gap-5">
            {c.workflows.map((workflow, index) => (
              <article
                key={workflow.id}
                className={`grid gap-8 border-t p-6 md:p-8 lg:grid-cols-[.55fr_1.45fr] ${"featured" in workflow && workflow.featured ? "border-champagne bg-ink text-pearl" : "border-ink/15 bg-porcelain"}`}
              >
                <div>
                  <p className="text-xs text-champagne">0{index + 1}</p>
                  <h3 className="mt-5 text-3xl font-medium">{workflow.title[language]}</h3>
                  <p
                    className={`mt-5 leading-7 ${"featured" in workflow && workflow.featured ? "text-pearl/65" : "text-ink/65"}`}
                  >
                    {workflow.summary[language]}
                  </p>
                </div>
                <div className="grid gap-7 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-editorial text-champagne">
                      {zh ? "可直接协调" : "We can coordinate"}
                    </p>
                    <ul className="mt-4 grid gap-3 text-sm leading-6">
                      {workflow.direct.map((item) => (
                        <li key={item.en} className="border-current/15 border-t pt-3">
                          {item[language]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-editorial text-champagne">
                      {zh ? "典型交付" : "Typical delivery"}
                    </p>
                    <ul className="mt-4 grid gap-3 text-sm leading-6">
                      {workflow.deliverables.map((item) => (
                        <li key={item.en} className="border-current/15 border-t pt-3">
                          {item[language]}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 border-l-2 border-champagne pl-4 text-sm leading-6 opacity-70">
                      {workflow.boundary[language]}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-night text-pearl" aria-labelledby="responsibility-boundary">
        <div className="container-x">
          <p className="eyebrow text-champagne">{zh ? "责任分层" : "Responsibility layers"}</p>
          <h2 id="responsibility-boundary" className="editorial-heading mt-5 max-w-[15ch]">
            {zh ? "每一层责任都需要被明确记录。" : "Every layer of responsibility is recorded clearly."}
          </h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {c.responsibilities.map((group, index) => (
              <article key={group.title.en} className="border border-pearl/15 bg-ink p-6">
                <span className="text-xs text-champagne">0{index + 1}</span>
                <h3 className="mt-6 text-2xl font-medium">{group.title[language]}</h3>
                <ul className="mt-7 grid gap-3 text-sm leading-6 text-pearl/70">
                  {group.items.map((item) => (
                    <li key={item.en} className="border-t border-pearl/10 pt-3">
                      {item[language]}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-porcelain">
        <div className="container-x grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow text-champagne">{zh ? "发布准备板" : "Launch readiness board"}</p>
            <h2 className="editorial-heading mt-5 max-w-[13ch]">
              {zh ? "没有审批，就不进入发布。" : "No approval, no release."}
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-ink/65">
              {zh
                ? "决策、证据、专业审核、制作与发布状态分别追踪。受监管或受权利限制的内容在批准前保持阻止状态。"
                : "Decisions, evidence, specialist review, production and launch status are tracked separately. Regulated or rights-restricted material remains blocked until approved."}
            </p>
          </div>
          <div className="grid gap-px bg-ink/15 sm:grid-cols-2">
            {[
              [zh ? "决策状态" : "Decision status", zh ? "客户确认" : "Client-owned"],
              [zh ? "专业审核" : "Specialist review", zh ? "需要时独立完成" : "Independent where required"],
              [zh ? "证据状态" : "Evidence status", zh ? "声明与证据对应" : "Claims mapped to evidence"],
              [zh ? "制作状态" : "Production status", zh ? "门控后推进" : "Released through gates"],
              [zh ? "发布状态" : "Launch status", zh ? "批准后公开" : "Public only when approved"],
              [
                zh ? "资料安全" : "Document security",
                zh ? "敏感文件不进入公开表单" : "No sensitive files in public forms"
              ]
            ].map(([title, status], index) => (
              <div key={title} className="bg-pearl p-6">
                <span className="text-xs text-champagne">0{index + 1}</span>
                <h3 className="mt-6 text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm text-ink/60">{status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-pearl">
        <div className="container-x grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="eyebrow text-champagne">FAQ</p>
            <h2 className="editorial-heading mt-5 max-w-[12ch]">
              {zh ? "先把职责边界说清楚。" : "Start with a clear boundary."}
            </h2>
          </div>
          <div className="border-t border-ink/15">
            {c.faqs.map((item) => (
              <details key={item.q.en} className="group border-b border-ink/15 py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
                  {item.q[language]}
                  <span className="text-champagne transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-3 pt-4 leading-7 text-ink/65">{item.a[language]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-champagne/25 bg-ink py-16 text-pearl">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-champagne">{zh ? "开始市场进入项目" : "Start a market-entry brief"}</p>
            <h2 className="editorial-heading mt-5 max-w-[14ch]">
              {zh
                ? "把英国准备、传播与本地执行放进同一条路径。"
                : "Put UK readiness, communications and local delivery on one route."}
            </h2>
            <p className="mt-6 max-w-2xl leading-7 text-pearl/65">
              {zh
                ? "请提供目标时间、英国业务计划、产品或服务类别以及已聘专业顾问。请勿通过公开表单发送身份或银行文件。"
                : "Share the target date, intended UK activity, product or service category and any advisers already appointed. Do not send identity or banking documents through the public form."}
            </p>
          </div>
          <Link
            href={withLanguage("/contact?project=market-entry", language)}
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-champagne px-6 py-3 text-sm font-semibold text-ink"
          >
            {c.primaryCta[language]} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
