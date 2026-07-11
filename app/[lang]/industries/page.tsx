import { notFound } from "next/navigation";
import { IndustryExperience } from "@/components/sections/IndustryExperiences";
import { JsonLd } from "@/components/seo/JsonLd";
import { industriesPageCopy, industryRecords } from "@/content/pages/industries";
import { isSupportedLocale, type Language } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/industries",
    title: `${industriesPageCopy.title[lang]} | FrameBridge Studio`,
    description: industriesPageCopy.intro[lang]
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const language: Language = lang;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          lang: language,
          items: [
            { name: "FrameBridge Studio", path: "/" },
            { name: industriesPageCopy.title[language], path: "/industries" }
          ]
        })}
      />
      <section className="bg-ink pt-36 text-pearl">
        <div className="container-x pb-24">
          <p className="text-xs uppercase tracking-editorial text-champagne">
            {language === "zh" ? "行业" : "Industries"}
          </p>
          <h1 className="editorial-heading mt-5 max-w-5xl font-semibold">
            {industriesPageCopy.title[language]}
          </h1>
          <p className="mt-7 max-w-2xl text-lg text-pearl/70">{industriesPageCopy.intro[language]}</p>
        </div>
      </section>
      {industryRecords.map((record) => (
        <IndustryExperience key={record.key} record={record} language={language} />
      ))}
    </>
  );
}
