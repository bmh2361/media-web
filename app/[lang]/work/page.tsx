import { LockKeyhole } from "lucide-react";
import { WorkFilterGrid } from "@/components/sections/WorkFilterGrid";
import { workPage } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = workPage[lang];

  return buildMetadata({
    lang,
    path: "/work",
    title: `${copy.title} | Work`,
    description: copy.intro,
    keywords: [
      "UK campaign production case studies",
      "London event photography",
      "UK product video",
      "Chinese brand overseas content",
      "creator campaign UK"
    ]
  });
}

export default async function WorkPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = workPage[lang];

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 text-pearl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_8%,rgba(216,199,162,0.22),transparent_26rem),radial-gradient(circle_at_18%_10%,rgba(111,183,255,0.18),transparent_24rem)]" />
        <div className="container-x relative grid gap-10 pb-24 lg:grid-cols-[1fr_24rem] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">{copy.eyebrow}</p>
            <h1 className="editorial-heading mt-5 max-w-5xl font-semibold text-balance">{copy.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-pearl/68">{copy.intro}</p>
          </div>
          <div className="rounded-lg border border-pearl/12 bg-pearl/[0.05] p-6 backdrop-blur-md">
            <LockKeyhole size={22} className="text-champagne" />
            <p className="mt-5 text-sm leading-6 text-pearl/66">{copy.confidentialNote}</p>
          </div>
        </div>
      </section>

      <section className="section-y bg-porcelain">
        <div className="container-x">
          <WorkFilterGrid language={lang} copy={copy} />
        </div>
      </section>
    </>
  );
}
