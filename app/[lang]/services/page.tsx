import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CommercialProcess, Engagements } from "@/components/sections/CommercialSections";
import { isSupportedLocale } from "@/lib/i18n";
import { commercial } from "@/content/commercial";
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
        ? "三个明确的项目：英国市场与合作准备、市场启动与合作、持续合作推进。聚焦人工智能、能源与智慧基础设施、出行与汽车技术。"
        : "Three scoped engagements: UK market readiness, launch and partnership programmes, and continued partnership development. Priority areas include AI, energy and smart infrastructure, and mobility technology."
  });
}
export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const zh = lang === "zh";
  return (
    <>
      <section className="commercial-hero bg-ink pt-[76px] text-pearl lg:pt-[88px]">
        <Container className="grid gap-x-12 py-14 lg:grid-cols-12 lg:items-end lg:py-20">
          <Eyebrow className="text-champagne lg:col-span-12">
            {zh ? "服务与交付" : "SERVICES & DELIVERABLES"}
          </Eyebrow>
          <h1 className="commercial-hero-title mt-6 lg:col-span-7">
            {zh ? "围绕商业目标，购买一项明确的工作。" : "A defined engagement around your market objective."}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-pearl/80 lg:col-span-5">
            {zh
              ? "从判断是否进入英国，到筹备发布与展会，再到后续合作推进。每项服务都以明确的问题、范围和输出为基础，按项目报价。"
              : "From deciding whether to enter the UK, to preparing a launch or exhibition, to following up potential partnerships. Each engagement starts with a defined question, scope and outputs, priced for the project."}
          </p>
        </Container>
      </section>
      <Engagements language={lang} detailed />
      <Section className="bg-pearl">
        <Container>
          <div id="priority-areas" className="mb-14 scroll-mt-28">
            <Eyebrow>{zh ? "技术优先领域" : "TECHNOLOGY PRIORITIES"}</Eyebrow>
            <h2 className="commercial-heading mt-5">
              {zh ? "聚焦科技与产业创新" : "Technology & Industrial Innovation"}
            </h2>
            <ol className="mt-6 space-y-3 text-lg leading-8">
              {commercial.sectors[lang].map((sector, index) => (
                <li key={sector}>
                  {index + 1}. {sector}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-7 text-ink/70">{commercial.adjacent[lang]}</p>
            <p className="mt-3 text-sm leading-7 text-ink/70">
              {zh
                ? "这些是评估项目需求的优先方向，并非已完成相关行业部署的声明。"
                : "These priorities guide assessment of project briefs; they are not claims of completed sector deployments."}
            </p>
          </div>
          <Eyebrow>{zh ? "按需配置的支持能力" : "SUPPORT WITHIN THE AGREED SCOPE"}</Eyebrow>
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            <article id="brand-communication" className="scroll-mt-28 border-t border-ink/20 pt-6">
              <h2 className="text-2xl font-medium">
                {zh ? "品牌与传播支持" : "Brand & Communication Support"}
              </h2>
              <p className="mt-5 text-base leading-8 text-ink/70">
                {zh
                  ? "产品表达、本地化文案、演示材料、采访、摄影、影片与内容素材，为具体受众和使用场景服务。创作者及素材使用权限按项目确认。"
                  : "Product messaging, localised copy, presentation materials, interviews, photography, film and communication assets for a defined audience and use. Creator participation and usage rights are agreed for each project."}
              </p>
            </article>
            <article id="local-delivery" className="scroll-mt-28 border-t border-ink/20 pt-6">
              <h2 className="text-2xl font-medium">{zh ? "本地项目交付" : "Local Project Delivery"}</h2>
              <p className="mt-5 text-base leading-8 text-ink/70">
                {zh
                  ? "会议、场地、活动、演示、团队与现场日程协调。供应商、技术支持、审批和专业依赖纳入执行计划；监管意见由相应专业方出具。"
                  : "Meeting, venue, event, demonstration, crew and on-site schedule coordination. Suppliers, technical support, approvals and specialist dependencies are built into the delivery plan. Regulated advice comes from the relevant qualified provider."}
              </p>
            </article>
          </div>
        </Container>
      </Section>
      <CommercialProcess language={lang} />
    </>
  );
}
