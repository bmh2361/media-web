import { notFound } from "next/navigation";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { company, isPrivacyNoticeApproved } from "@/content/company";
// Requires legal review before launch against the final controller, processor and retention arrangements.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/privacy",
    title: lang === "zh" ? "隐私说明 | Venus Bridge Media" : "Privacy Notice | Venus Bridge Media",
    description:
      lang === "zh"
        ? "了解项目咨询信息的收集与使用方式。"
        : "How project-enquiry information is collected and used."
  });
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params,
    zh = lang === "zh";
  if (!isSupportedLocale(lang)) notFound();
  const approved = isPrivacyNoticeApproved();
  return (
    <section className="bg-pearl pt-36">
      <article className="container-x max-w-4xl pb-28">
        <p className="text-xs uppercase tracking-editorial text-slate">
          {zh ? "隐私说明" : "Privacy notice"}
        </p>
        <h1 className="editorial-heading mt-5 font-semibold">
          {zh ? "项目咨询信息" : "Project enquiry information"}
        </h1>
        <p className="mt-5 text-sm text-slate" data-legal-status={company.legalApprovalStatus}>
          {approved
            ? `${zh ? "生效日期" : "Effective"}: ${company.privacyEffectiveDate}`
            : zh
              ? "当前为发布前审核版本；生产发布需补充生效日期与控制者信息。"
              : "Pre-release review version. An effective date and final controller details are required for production."}
        </p>
        {approved && company.legalEntityMode === "incorporated" ? (
          <p className="mt-8 text-lg leading-8 text-ink/70">
            {zh ? "信息控制者：" : "Data controller: "}
            {company.privacyControllerName} · {company.registeredOffice}
          </p>
        ) : approved ? (
          <p className="mt-8 text-lg leading-8 text-ink/70">
            {zh ? "本网站由 Venus Bridge 运营。" : "This website is operated under the name Venus Bridge."}
          </p>
        ) : null}
        {(zh
          ? [
              "我们可能收集姓名、公司、工作邮箱、联系方式、项目范围、日期、地点、相关商业条件及您主动提供的其他信息。",
              "这些信息用于回复询盘、评估项目、准备方案与协调资源。若未来配置在线提交，信息可能传至网站运营方指定的工作流供应商。",
              "我们不会通过分析属性传递个人信息。请勿在初次咨询中提交不必要的敏感或机密材料。",
              "如需了解或更正已提交的项目信息，请通过网站公布的联系邮箱与我们沟通。"
            ]
          : [
              "We may collect your name, organisation, work email, contact details, project scope, dates, location, relevant commercial parameters and other information you choose to provide.",
              "This information is used to respond to enquiries, assess projects, prepare proposals and coordinate resources. If online delivery is configured in future, information may be sent to the website operator’s designated workflow provider.",
              "Personal information is not placed in analytics attributes. Please do not submit unnecessary sensitive or confidential material in an initial enquiry.",
              "To ask about or correct submitted project information, contact us through the email published on this website."
            ]
        ).map((x) => (
          <p key={x} className="mt-8 text-lg leading-8 text-ink/70">
            {x}
          </p>
        ))}
        {approved ? (
          <p className="mt-8 text-lg leading-8 text-ink/70">
            {zh ? "隐私联系：" : "Privacy contact: "}
            <a className="text-blue" href={`mailto:${company.privacyContact}`}>
              {company.privacyContact}
            </a>
          </p>
        ) : null}
      </article>
    </section>
  );
}
