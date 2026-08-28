import { notFound } from "next/navigation";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { fashionBeautyApparelContent } from "@/content/pages/fashion-beauty-apparel";
import { portfolioProjects } from "@/content/portfolio";
import { isSupportedLocale, type Language, withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getEffectiveMarketEntryMode } from "@/lib/release";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/industries/fashion-beauty-apparel",
    title:
      lang === "zh"
        ? "伦敦时尚、美妆与服装制作｜Venus Bridge"
        : "Fashion, Beauty & Apparel Production in London | Venus Bridge",
    description:
      lang === "zh"
        ? "在伦敦统筹时尚、美妆与服装广告拍摄、模特选角、妆发造型、场地、社交内容与中英双语英国制作。"
        : "London production for fashion, beauty and apparel campaigns, coordinating casting, makeup, hair, wardrobe, locations and bilingual UK delivery.",
    keywords: ["fashion production London", "beauty campaign production UK", "apparel lookbook production"]
  });
}

export default async function FashionBeautyApparelPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const language: Language = lang;
  const copy = fashionBeautyApparelContent[language];
  const zh = language === "zh";
  const showMarketEntry = getEffectiveMarketEntryMode() !== "hidden";
  const projects = portfolioProjects.filter((project) => project.sector === "fashion-beauty-apparel");
  const heroProject = projects.find((project) => project.slug === "beauty-fashion-brand-content")!;
  const editorialHero = heroProject.media.find((media) => media.category === "hero")!;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          lang: language,
          items: [
            { name: "Venus Bridge", path: "/" },
            { name: zh ? "行业" : "Industries", path: "/industries" },
            {
              name: zh ? "时尚、美妆与服装" : "Fashion, Beauty & Apparel",
              path: "/industries/fashion-beauty-apparel"
            }
          ]
        })}
      />

      <section className="relative overflow-hidden bg-ink pt-[72px] text-pearl lg:pt-20">
        <Container className="relative grid gap-10 py-16 lg:min-h-[650px] lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:py-20">
          <div>
            <Eyebrow className="text-champagne">{copy.eyebrow}</Eyebrow>
            <h1 className="mt-6 max-w-[16ch] text-balance text-[clamp(2.8rem,5.3vw,5.6rem)] font-medium leading-[1.01] tracking-[-.045em]">
              {copy.title}
            </h1>
            <p className="text-pearl/68 mt-8 max-w-2xl text-lg leading-8">{copy.intro}</p>
            <p className="mt-8 border-l border-champagne/60 pl-5 text-sm leading-7 text-pearl/55">
              {copy.adjacent}
            </p>
          </div>
          <PortfolioImage
            media={editorialHero}
            language={language}
            className="aspect-[4/5] max-h-[680px]"
            sizes="(min-width:1024px) 55vw, 100vw"
            priority
          />
        </Container>
      </section>

      <Section className="bg-pearl">
        <Container>
          <Eyebrow>{zh ? "商业制作能力" : "Commercial production capability"}</Eyebrow>
          <h2 className="editorial-heading mt-5 max-w-[14ch]">
            {zh
              ? "从服装廓形到妆面细节，画面服务于品牌传播。"
              : "From garment shape to makeup detail, imagery is built for brand communication."}
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {projects.map((project) => {
              const cover = project.media.find((media) => media.category === "cover") ?? project.media[0];
              return (
                <article key={project.slug}>
                  <PortfolioImage
                    media={cover}
                    language={language}
                    className="aspect-[4/5]"
                    sizes="(min-width:768px) 33vw, 100vw"
                  />
                  <h3 className="mt-5 text-2xl font-medium">{zh ? project.titleZh : project.titleEn}</h3>
                  <p className="mt-4 text-sm leading-6 text-ink/60">
                    {(zh ? project.venusRoleZh : project.venusRoleEn).join(" · ")}
                  </p>
                  <ButtonLink
                    href={withLanguage(`/work/${project.slug}`, language)}
                    variant="ghost"
                    className="mt-5 px-0"
                    showArrow
                  >
                    {zh ? "查看制作经验" : "View production experience"}
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-porcelain">
        <Container>
          <Eyebrow className="text-champagne">{zh ? "制作需求" : "Production requirements"}</Eyebrow>
          <div className="bg-ink/12 mt-6 grid gap-px lg:grid-cols-2">
            <ListSection index="01" title={copy.needsTitle} items={copy.needs} />
            <ListSection index="02" title={copy.coordinateTitle} items={copy.coordinate} />
          </div>
        </Container>
      </Section>

      <Section className="bg-pearl">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Eyebrow className="text-champagne">03 / {copy.deliverablesTitle}</Eyebrow>
            <h2 className="editorial-heading mt-5 max-w-[11ch]">{copy.deliverablesTitle}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/65">{copy.deliverablesIntro}</p>
          </div>
          <BulletList items={copy.deliverables} />
        </Container>
      </Section>

      <Section className="bg-mist">
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Eyebrow className="text-champagne">04 / {copy.inputsTitle}</Eyebrow>
            <h2 className="editorial-heading mt-5 max-w-[11ch]">{copy.inputsTitle}</h2>
          </div>
          <BulletList items={copy.inputs} />
        </Container>
      </Section>

      <Section className="bg-ink text-pearl">
        <Container className="grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow className="text-champagne">{zh ? "启动制作" : "Start production"}</Eyebrow>
            <h2 className="editorial-heading mt-5 max-w-[13ch]">{copy.ctaTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/65">{copy.ctaText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href={withLanguage("/contact?project=commercial&brief=full", language)}
              className="bg-champagne text-ink hover:bg-pearl"
              showArrow
            >
              {copy.cta}
            </ButtonLink>
            {showMarketEntry ? (
              <ButtonLink
                href={withLanguage("/services/uk-market-entry", language)}
                className="border border-pearl/25 bg-transparent text-pearl hover:border-champagne"
                showArrow
              >
                {zh ? "英国市场进入协同" : "UK market-entry coordination"}
              </ButtonLink>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}

function ListSection({ index, title, items }: { index: string; title: string; items: readonly string[] }) {
  return (
    <article className="bg-porcelain p-6 sm:p-9">
      <span className="text-xs text-champagne">{index}</span>
      <h2 className="mt-8 text-3xl font-medium">{title}</h2>
      <BulletList items={items} className="mt-8" />
    </article>
  );
}

function BulletList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`grid gap-0 border-t border-ink/15 ${className}`}>
      {items.map((item) => (
        <li key={item} className="border-b border-ink/15 py-4 text-base leading-7 text-ink/70">
          {item}
        </li>
      ))}
    </ul>
  );
}
