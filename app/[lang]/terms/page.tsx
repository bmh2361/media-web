import { notFound } from "next/navigation";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/terms",
    title: lang === "zh" ? "网站条款 | 镜桥创意" : "Website Terms | FrameBridge Studio",
    description: lang === "zh" ? "镜桥创意网站使用说明。" : "FrameBridge Studio website-use terms."
  });
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params,
    zh = lang === "zh";
  if (!isSupportedLocale(lang)) notFound();
  return (
    <section className="bg-pearl pt-36">
      <article className="container-x max-w-4xl pb-28">
        <p className="text-xs uppercase tracking-editorial text-slate">{zh ? "网站条款" : "Website terms"}</p>
        <h1 className="editorial-heading mt-5 font-semibold">
          {zh ? "网站内容与项目咨询" : "Website content and project enquiries"}
        </h1>
        <p className="mt-8 text-lg leading-8 text-ink/70">
          {zh
            ? "网站内容用于介绍能力与项目形式，不构成报价、服务承诺、机构背书或正式合作协议。具体范围、责任、费用、权利与审批以双方书面项目文件为准。"
            : "Website content describes capabilities and project formats. It is not a quotation, service guarantee, institutional endorsement or binding project agreement. Scope, responsibilities, fees, rights and approvals must be confirmed in written project documentation."}
        </p>
      </article>
    </section>
  );
}
