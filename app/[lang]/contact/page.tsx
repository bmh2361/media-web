import { notFound } from "next/navigation";
import { ContactExperience } from "@/components/sections/ContactExperience";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { company, hasApprovedPublicBusinessEmail } from "@/content/company";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({ lang, path: "/contact", title: lang === "zh" ? "沟通英国与欧洲市场计划 | Venus Bridge" : "Discuss Your UK & European Plans | Venus Bridge", description: lang === "zh" ? "告诉我们市场、目标、时间和已经确定的条件；我们会判断是否匹配并建议下一步。" : "Share the market, goal, timing and anything already committed. We will assess the fit and suggest the most useful next step." });
}

export default async function ContactPage({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ intent?: string }> }) {
  const { lang } = await params;
  const { intent } = await searchParams;
  if (!isSupportedLocale(lang)) notFound();
  const zh = lang === "zh";
  return (
    <>
      <section className="bg-ink pt-28 text-pearl" data-contact-grammar="conversation">
        <Container className="py-20 lg:min-h-[620px] lg:py-28">
          <Eyebrow className="text-champagne">{zh ? "开始沟通" : "START A CONVERSATION"}</Eyebrow>
          <h1 className="type-display-page zh-display-measure mt-7 max-w-[13ch]">{zh ? "告诉我们，英国或欧洲需要发生什么。" : "Tell us what needs to happen in the UK or Europe."}</h1>
          <p className="type-lede mt-10 text-pearl/65">{zh ? "不需要完整方案。请说明市场、目标、时间和已经确定的条件；我们会判断是否匹配并建议最有用的下一步。" : "You do not need a finished brief. Share the market, goal, timing and anything already committed; we will assess the fit and suggest the most useful next step."}</p>
        </Container>
      </section>
      <section className="bg-porcelain py-16 lg:py-28">
        <Container className="container-standard grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:pt-3"><p className="text-xs uppercase tracking-editorial text-champagne">{zh ? "可以提供的信息" : "WHAT TO SHARE"}</p><p className="type-body mt-6 text-ink/65">{zh ? "例如：英国市场进入、买家或经销商对接、发布、展会、合作项目或本地执行需求。" : "For example: UK market entry, buyer or distributor engagement, a launch, exhibition, partnership or local execution need."}</p></div>
          <div className="lg:col-span-8"><ContactExperience language={lang} initialIntent={intent === "partner" ? "partner" : intent === "other" ? "other" : "company"} fallbackEmail={hasApprovedPublicBusinessEmail() ? company.businessEmail : null} /></div>
        </Container>
      </section>
    </>
  );
}
