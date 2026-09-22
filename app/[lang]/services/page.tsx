import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceComparison, DeliverableWorkbench } from "@/components/sections/CommercialSections";
import { commercial } from "@/content/commercial";
import { isSupportedLocale, withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/services",
    title:
      lang === "zh"
        ? "英国市场准备、启动与合作推进服务 | Venus Bridge"
        : "UK Market Entry, Launch & Partnership Services | Venus Bridge",
    description:
      lang === "zh"
        ? "比较三种独立服务的主要交付、所需信息与职责，查看市场简报、启动项目板和跟进记录的格式示意。"
        : "Compare three independent engagements, their deliverables, inputs and responsibilities. See illustrative market briefs, launch boards and follow-up records."
  });
}
export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const zh = lang === "zh";
  return (
    <>
      <section className="commercial-hero bg-ink pt-[76px] text-pearl lg:pt-[88px]">
        <Container className="py-12 lg:py-16">
          <Eyebrow className="text-champagne">{zh ? "服务与交付" : "SERVICES & DELIVERABLES"}</Eyebrow>
          <h1 className="commercial-hero-title mt-6 max-w-4xl">
            {zh ? "选对当前阶段的服务。" : "Choose the work you need next."}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-pearl/80">
            {zh
              ? "市场判断、启动项目或合作推进，可独立开展。先选需要回答的问题，再约定具体交付。"
              : "Market assessment, a launch programme or partnership follow-up. Start with the decision you need to make and agree a defined piece of work."}
          </p>
        </Container>
      </section>
      <ServiceComparison language={lang} />
      <DeliverableWorkbench language={lang} />
      <Section className="bg-pearl">
        <Container>
          <Eyebrow>{zh ? "范围与责任" : "SCOPE & RESPONSIBILITY"}</Eyebrow>
          <h2 className="commercial-heading mt-5">
            {zh ? "把工作与责任一起约定。" : "Agree the work and who owns it."}
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <p
              id="brand-communication"
              className="scroll-mt-28 border-t border-ink/20 pt-5 text-base leading-7"
            >
              <strong>{zh ? "品牌与传播支持" : "Brand & communication"}</strong>
              <br />
              {zh
                ? "按需安排本地化表达、演示材料、摄影与影片。"
                : "Localised messaging, presentation assets, photography and film where needed."}
            </p>
            <p id="local-delivery" className="scroll-mt-28 border-t border-ink/20 pt-5 text-base leading-7">
              <strong>{zh ? "本地项目交付" : "Local delivery"}</strong>
              <br />
              {zh
                ? "按约定协调场地、会议、展会与现场日程。"
                : "Agreed venue, meeting, exhibition and on-site schedule coordination."}
            </p>
          </div>
          <dl className="responsibility-ledger mt-8">
            {(zh
              ? [
                  ["Venus Bridge", "需求梳理、表达、项目协调与约定交付。"],
                  ["客户", "提供产品事实、素材权限、决策与审批。"],
                  ["按需专业方", "承担法律、税务、合规及认证等专业意见与责任。"]
                ]
              : [
                  ["Venus Bridge", "Brief, messaging, project coordination and agreed deliverables."],
                  ["Client", "Product facts, asset permissions, decisions and approvals."],
                  [
                    "Appointed specialists",
                    "Legal, tax, compliance and certification advice and professional responsibility."
                  ]
                ]
            ).map(([owner, role]) => (
              <div key={owner}>
                <dt>{owner}</dt>
                <dd>{role}</dd>
              </div>
            ))}
          </dl>
          <div id="process" className="mt-8 scroll-mt-28 border-l-2 border-champagne pl-5">
            <h3 className="text-xl font-medium">{zh ? "启动与验收" : "Commissioning & acceptance"}</h3>
            <p className="mt-3 text-base leading-7">
              {zh
                ? "简报 → 确认范围、时间与费用 → 交付与反馈。启动前确认审批人、验收标准、素材权限和外部依赖。"
                : "Brief → Agree scope, timing and fee → Delivery and feedback. Confirm approvers, acceptance criteria, usage rights and external dependencies before work begins."}
            </p>
          </div>
          <p className="mt-6 text-base leading-7 text-ink/70">
            {zh
              ? "外部参与取决于匹配度、意愿与必要审批；不保证引荐、销售、投资或报道。合作推进有明确期限，不构成无限期销售代理。"
              : "External participation depends on fit, interest and required approvals. Introductions, sales, investment and coverage are not guaranteed. Partnership development has an agreed term; it is not open-ended sales representation."}
          </p>
        </Container>
      </Section>
      <Section className="bg-porcelain">
        <Container>
          <h2 className="commercial-heading">
            {zh ? "还不确定从哪项开始？" : "Not sure which engagement fits?"}
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink/70">
            {zh
              ? "说明产品、目标与时间，我们先判断需要哪项工作。"
              : "Share your product, objective and timing so we can assess the work needed."}
          </p>
          <ButtonLink className="mt-7" href={withLanguage("/contact?intent=company#company", lang)} showArrow>
            {commercial.companyCta[lang]}
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
