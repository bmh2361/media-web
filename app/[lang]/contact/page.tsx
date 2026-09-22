import { notFound } from "next/navigation";
import { ContactExperience } from "@/components/sections/ContactExperience";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { company } from "@/content/company";
import { commercial } from "@/content/commercial";
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
        ? "沟通英国市场项目或商业需求 | Venus Bridge"
        : "Discuss a UK Market Project or Technology Requirement | Venus Bridge",
    description:
      lang === "zh"
        ? "中国企业、英国与欧洲商业需求方、专业执行合作方，分别提交清楚的项目背景与需求。"
        : "Contact routes for Chinese technology companies, UK and European commercial requirements, and professional delivery partners."
  });
}
export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const zh = lang === "zh";
  const routes = [
    {
      id: "company",
      title: commercial.companyCta[lang],
      audience: zh ? "中国科技与工业企业" : "Chinese technology & industrial companies",
      fields: zh
        ? [
            "公司",
            "产品 / 技术",
            "目标市场",
            "希望实现的目标",
            "目标时间",
            "现有英国 / 欧洲活动",
            "公司网站",
            "姓名 / 职务",
            "联系方式",
            "意向服务（市场准备 / 启动项目 / 合作推进）",
            "预算或项目规模（选填）"
          ]
        : [
            "Company",
            "Product / technology",
            "Target market",
            "What are you trying to achieve?",
            "Target timing",
            "Existing UK / European activity",
            "Company website",
            "Name / role",
            "Contact information",
            "Engagement of interest (readiness / launch / development)",
            "Indicative budget / project scale (optional)"
          ]
    },
    {
      id: "demand",
      title: commercial.demandCta[lang],
      audience: zh ? "英国与欧洲企业及研究团队" : "UK & European companies and research teams",
      fields: zh
        ? [
            "机构",
            "需求 / 问题",
            "产品 / 技术类别",
            "地区 / 应用地点",
            "合作方向（分销 / 采购 / 试点 / 研究 / 其他）",
            "时间",
            "姓名 / 职务",
            "联系方式"
          ]
        : [
            "Organisation",
            "Requirement / problem",
            "Product / technology category",
            "Geography / application location",
            "Interest (distribution / procurement / pilot / research / other)",
            "Timing",
            "Name / role",
            "Contact information"
          ]
    },
    {
      id: "specialist",
      title: commercial.specialistCta[lang],
      audience: zh ? "专业与执行合作方" : "Professional & delivery partners",
      fields: zh
        ? ["机构", "所在地", "专业能力", "相关行业", "通常承担的项目角色", "姓名 / 职务", "联系方式"]
        : [
            "Organisation",
            "Location",
            "Capability",
            "Relevant sectors",
            "Typical project role",
            "Name / role",
            "Contact information"
          ]
    }
  ];
  return (
    <>
      <section
        className="commercial-hero bg-ink pt-[76px] text-pearl lg:pt-[88px]"
        data-contact-grammar="conversation"
      >
        <Container className="grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <Eyebrow className="text-champagne">
              {zh ? "从具体需求开始" : "START WITH A CLEAR REQUIREMENT"}
            </Eyebrow>
            <h1 className="commercial-hero-title mt-6">
              {zh ? "告诉我们，你需要推进什么。" : "Tell us what you need to move forward."}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-pearl/80">
              {zh
                ? "选择下面对应的路径。邮件会带上所需信息提纲，你也可以复制提纲通过微信发送。先判断项目是否匹配，再讨论范围与报价。"
                : "Choose a route below. Your email opens with a short brief to complete; you can also copy the prompts into WeChat. We assess project fit first, then discuss scope and fees."}
            </p>
            <nav
              aria-label={zh ? "选择联系路径" : "Choose a contact route"}
              className="mt-7 flex flex-wrap gap-3"
            >
              {routes.map((route) => (
                <a
                  key={route.id}
                  href={`#${route.id}`}
                  className="inline-flex min-h-11 items-center border border-pearl/30 px-4 py-3 text-sm hover:bg-pearl hover:text-ink"
                >
                  {route.audience}
                </a>
              ))}
            </nav>
          </div>
          <div className="lg:col-span-5 lg:self-center">
            <ContactExperience language={lang} />
          </div>
        </Container>
      </section>
      <section className="bg-porcelain py-12 lg:py-16">
        <Container>
          {routes.map((route, index) => {
            const body = route.fields.map((field) => `${field}: `).join("\r\n\r\n");
            const mailto = `mailto:${company.businessEmail}?subject=${encodeURIComponent(`Venus Bridge — ${route.title}`)}&body=${encodeURIComponent(body)}`;
            return (
              <article
                key={route.id}
                id={route.id}
                className="grid scroll-mt-28 gap-8 border-t border-ink/20 py-10 lg:grid-cols-12"
                data-contact-route={route.id}
              >
                <div className="lg:col-span-5">
                  <Eyebrow>
                    0{index + 1} · {route.audience}
                  </Eyebrow>
                  <h2 className="commercial-heading mt-5">{route.title}</h2>
                  <a
                    href={mailto}
                    className="mt-7 inline-flex min-h-12 items-center bg-ink px-6 py-4 text-sm font-medium text-pearl hover:bg-graphite"
                    data-enquiry-email={route.id}
                  >
                    {zh ? "打开邮件并填写需求" : "Open email with this brief"} →
                  </a>
                  <p className="mt-4 max-w-md text-sm leading-7 text-ink/65">
                    {zh
                      ? "此链接打开你的邮件应用，不会自动发送。若无法打开，请复制本页提纲发至下方邮箱或微信。"
                      : "This opens your email app; it does not send automatically. If it does not open, copy these prompts and send them by email or WeChat."}
                  </p>
                  <a
                    href={`mailto:${company.businessEmail}`}
                    className="mt-3 inline-block min-h-11 break-all py-2 text-sm underline underline-offset-4"
                  >
                    {company.businessEmail}
                  </a>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <h3 className="text-sm font-semibold">
                    {zh ? "请在消息中说明" : "Include in your message"}
                  </h3>
                  <ul className="mt-4 grid gap-x-7 sm:grid-cols-2">
                    {route.fields.map((field) => (
                      <li key={field} className="border-b border-ink/10 py-3 text-base leading-7 text-ink/75">
                        {field}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
          <p className="max-w-3xl border-t border-ink/20 pt-6 text-sm leading-7 text-ink/65">
            <a href={`/${lang}/privacy`} className="underline underline-offset-4">
              {zh ? "隐私说明" : "Privacy notice"}
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
