import { notFound } from "next/navigation";
import { ContactExperience } from "@/components/sections/ContactExperience";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/contact",
    title:
      lang === "zh"
        ? "沟通英国与欧洲市场计划 | Venus Bridge"
        : "Discuss Your UK & European Plans | Venus Bridge",
    description:
      lang === "zh"
        ? "告诉我们市场、目标、时间和已经确定的条件；我们会判断是否匹配并建议下一步。"
        : "Share the market, goal, timing and anything already committed. We will assess the fit and suggest the most useful next step."
  });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const zh = lang === "zh";
  return (
    <>
      <section className="bg-ink pt-[76px] text-pearl lg:pt-[88px]" data-contact-grammar="conversation">
        <Container className="container-editorial editorial-grid gap-y-12 py-14 md:py-16 lg:items-center lg:py-20">
          <div className="lg:col-span-7">
            <Eyebrow className="text-champagne">{zh ? "开始沟通" : "START A CONVERSATION"}</Eyebrow>
            <h1 className="mt-6 max-w-[10ch] text-[clamp(3rem,6vw,5.75rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
              {zh ? "从一次沟通开始。" : "Start a conversation."}
            </h1>
            <p className="type-lede text-pearl/68 mt-7 max-w-[39rem]">
              {zh
                ? "告诉我们您希望在英国或欧洲实现什么。我们会帮助判断合适的下一步、本地合作伙伴与执行路径。"
                : "Tell us what you’re trying to achieve in the UK or Europe. We’ll help identify the right next step, local partners and execution path."}
            </p>
            <p className="mt-5 text-sm text-pearl/50">
              {zh ? "不需要完整方案。" : "You don’t need a finished brief."}
            </p>
          </div>
          <div className="lg:col-span-5 lg:pl-6">
            <ContactExperience language={lang} />
          </div>
        </Container>
      </section>
      <section className="bg-porcelain py-12 md:py-14 lg:py-16" aria-labelledby="contact-start-details">
        <Container className="container-editorial">
          <p id="contact-start-details" className="text-xs uppercase tracking-editorial text-champagne">
            {zh ? "开始沟通所需信息" : "WHAT HELPS US START"}
          </p>
          <ol className="mt-7 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {(zh
              ? [
                  ["市场", "英国、欧洲或具体城市。"],
                  ["目标", "发布、合作、建立信誉、活动或本地执行。"],
                  ["时间", "目标日期或决策窗口。"],
                  ["已有条件", "已确定的合作伙伴、场地、代理机构或资源。"]
                ]
              : [
                  ["Market", "UK, Europe or a specific city."],
                  ["Goal", "Launch, partnership, credibility, activation or local execution."],
                  ["Timing", "Target date or decision window."],
                  ["Existing commitments", "Partners, venues, agencies or resources already involved."]
                ]
            ).map(([title, description], index) => (
              <li
                key={title}
                className="border-b border-ink/15 py-6 sm:px-6 sm:first:pl-0 lg:border-r lg:px-7 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="text-xs tabular-nums text-champagne">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 text-base font-semibold text-ink">{title}</h2>
                <p className="mt-3 max-w-[17rem] text-sm leading-6 text-ink/60">{description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
