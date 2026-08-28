import { notFound } from "next/navigation";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { areWebsiteTermsApproved, company } from "@/content/company";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/terms",
    title: lang === "zh" ? "网站条款 | Venus Bridge Media" : "Website Terms | Venus Bridge Media",
    description: lang === "zh" ? "Venus Bridge Media网站使用说明。" : "Venus Bridge Media website-use terms."
  });
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params,
    zh = lang === "zh";
  if (!isSupportedLocale(lang)) notFound();
  const approved = areWebsiteTermsApproved();
  return (
    <section className="bg-pearl pt-36">
      <article className="container-x max-w-4xl pb-28">
        <p className="text-xs uppercase tracking-editorial text-slate">{zh ? "网站条款" : "Website terms"}</p>
        <h1 className="editorial-heading mt-5 font-semibold">
          {zh ? "网站内容与项目咨询" : "Website content and project enquiries"}
        </h1>
        <p className="mt-5 text-sm text-slate" data-legal-status={company.termsApprovalStatus}>
          {approved
            ? `${zh ? "生效日期" : "Effective"}: ${company.termsEffectiveDate}`
            : zh
              ? "当前为发布前审核版本；生产发布需补充正式公司信息与生效日期。"
              : "Pre-release review version. Final company details and an effective date are required for production."}
        </p>
        <p className="mt-8 text-lg leading-8 text-ink/70">
          {zh
            ? "网站内容用于介绍能力与项目形式，不构成正式提案、服务承诺、机构背书或合作协议。具体范围、责任、商业条款、权利与审批以双方书面项目文件为准。"
            : "Website content describes capabilities and project formats. It is not a formal proposal, service guarantee, institutional endorsement or binding project agreement. Scope, responsibilities, commercial terms, rights and approvals must be confirmed in written project documentation."}
        </p>
        {approved ? (
          <p className="mt-8 text-lg leading-8 text-ink/70">
            {company.legalName}
            {company.companyNumber ? ` · ${company.companyNumber}` : ""}
            {company.registeredOffice ? ` · ${company.registeredOffice}` : ""}
          </p>
        ) : null}
      </article>
    </section>
  );
}
