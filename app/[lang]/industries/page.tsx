import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { industryTiers } from "@/content/commercial-architecture";
import { isSupportedLocale, type Language, withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/industries",
    title: lang === "zh" ? "行业重点｜Venus Bridge" : "Industry Priorities | Venus Bridge",
    description:
      lang === "zh"
        ? "以汽车与出行为核心，并在 AI 与科技、时尚与美妆、娱乐与创作者领域提供英国品牌、发布与本地执行。"
        : "UK brand, launch and local execution across a core automotive practice and selected growth sectors."
  });
}

export default async function IndustriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const language: Language = lang;
  const zh = language === "zh";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          lang: language,
          items: [
            { name: "Venus Bridge", path: "/" },
            { name: zh ? "行业" : "Industries", path: "/industries" }
          ]
        })}
      />
      <section className="bg-ink pt-16 text-pearl">
        <Container className="py-20 md:py-28">
          <Eyebrow className="text-champagne">{zh ? "行业重点" : "INDUSTRY PRIORITIES"}</Eyebrow>
          <h1 className="editorial-heading mt-6 max-w-[14ch]">
            {zh
              ? "深度来自真实执行，而不是一张无限扩张的行业清单。"
              : "Depth comes from real delivery, not an endless sector list."}
          </h1>
          <p className="body-large mt-7 max-w-2xl text-pearl/65">
            {zh
              ? "汽车与出行是当前核心行业；AI 与科技、时尚与美妆、娱乐与创作者是具备可公开能力证明的增长领域。"
              : "Automotive and mobility is the current core sector. AI and technology, fashion and beauty, and entertainment and creator work are evidenced growth areas."}
          </p>
        </Container>
      </section>
      <Section className="bg-porcelain">
        <Container className="grid gap-px bg-ink/15 lg:grid-cols-3">
          {industryTiers.map((group, index) => (
            <article key={group.tier.en} className="bg-porcelain p-7 lg:min-h-[390px]">
              <span className="text-xs text-champagne">0{index + 1}</span>
              <p className="mt-8 text-xs uppercase tracking-editorial text-ink/45">{group.tier[language]}</p>
              <div className="mt-8 grid gap-6">
                {group.items.map((item) => (
                  <EditorialLink key={item.en} href={withLanguage(item.href, language)}>
                    {item[language]}
                  </EditorialLink>
                ))}
              </div>
            </article>
          ))}
        </Container>
      </Section>
    </>
  );
}
