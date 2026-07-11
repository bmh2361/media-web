import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageIntro } from "@/components/sections/PageIntro";
import { pageCopy, ui } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const copy = pageCopy.contact[lang];

  return buildMetadata({
    lang,
    path: "/contact",
    title: lang === "zh" ? `${copy.title} | 联系` : `${copy.title} | Contact`,
    description: copy.intro,
    keywords: ["UK production brief", "London production partner", "Chinese brand UK shoot"]
  });
}

export default async function ContactPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: Language }>;
  searchParams: Promise<{ project?: string }>;
}) {
  const { lang } = await params;
  const copy = pageCopy.contact[lang];
  const { project } = await searchParams;

  return (
    <>
      <PageIntro eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <section className="container-x grid gap-8 pb-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid content-start gap-4">
          <a
            href="mailto:hello@framebridge.studio"
            className="flex items-center gap-4 rounded-lg border border-ink/10 bg-white/70 p-6 text-lg font-semibold transition hover:border-blue"
          >
            <Mail size={20} />
            hello@framebridge.studio
          </a>
          <div className="flex items-center gap-4 rounded-lg border border-ink/10 bg-white/70 p-6 text-lg font-semibold">
            <MapPin size={20} />
            {ui[lang].contactLocation}
          </div>
        </div>
        <ContactForm language={lang} initialProject={project} />
      </section>
    </>
  );
}
