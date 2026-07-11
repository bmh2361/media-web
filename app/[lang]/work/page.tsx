import { LockKeyhole } from "lucide-react";
import { notFound } from "next/navigation";
import { WorkFilterGrid } from "@/components/sections/WorkFilterGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { workContent } from "@/content/pages/work";
import { isSupportedLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getReleaseConfig, getWorkPresentation } from "@/lib/release";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  const presentation = getWorkPresentation();

  return buildMetadata({
    lang,
    path: "/work",
    title: presentation.metadataTitle[lang],
    description: presentation.description[lang],
    keywords: [
      "UK campaign production case studies",
      "London event photography",
      "UK product video",
      "Chinese brand overseas content",
      "creator campaign UK"
    ]
  });
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const release = getReleaseConfig();
  const presentation = getWorkPresentation(release.publicWorkMode);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          lang,
          items: [
            { name: "FrameBridge Studio", path: "/" },
            { name: presentation.pageTitle[lang], path: "/work" }
          ]
        })}
      />
      <section className="relative overflow-hidden bg-ink pt-36 text-pearl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_8%,rgba(216,199,162,0.22),transparent_26rem),radial-gradient(circle_at_18%_10%,rgba(111,183,255,0.18),transparent_24rem)]" />
        <div className="container-x relative grid gap-10 pb-24 lg:grid-cols-[1fr_24rem] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">
              {presentation.navigationLabel[lang]}
            </p>
            <h1 className="editorial-heading mt-5 max-w-5xl text-balance font-semibold">
              {presentation.pageTitle[lang]}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-pearl/70">{presentation.description[lang]}</p>
          </div>
          <div className="rounded-lg border border-pearl/10 bg-pearl/[0.05] p-6 backdrop-blur-md">
            <LockKeyhole size={22} className="text-champagne" />
            <p className="mt-5 text-sm leading-6 text-pearl/70">
              {release.publicWorkMode === "portfolio"
                ? presentation.description[lang]
                : workContent[lang].disclosure}
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-porcelain">
        <div className="container-x">
          <h2 className="sr-only">{presentation.sectionHeading[lang]}</h2>
          <WorkFilterGrid language={lang} mode={release.publicWorkMode ?? "concept-models"} />
        </div>
      </section>
    </>
  );
}
