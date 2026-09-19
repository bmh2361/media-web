import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { EditorialScene, type EditorialSceneMedia } from "@/components/sections/phase32c/EditorialScene";
import { HomeHeroExperience, type HomeHeroScene } from "@/components/sections/phase32c/HomeHeroExperience";
import { capabilityMediaById } from "@/content/capability-media";
import { phase4 } from "@/content/phase4";
import { findPortfolioProject, getProofPresentation, type PortfolioProject } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

const projectSlugs = [
  "byd-bd11-london",
  "changan-europe-launch-2025",
  "catl-open-day-2025",
  "leapmotor-iaa-2023"
];
const selectedSlugs = ["byd-bd11-london", "changan-europe-launch-2025", "london-automotive-brand-film"];
const projectScene = (
  project: PortfolioProject,
  category: "hero" | "cover" | "gallery" = "hero"
): EditorialSceneMedia => ({
  kind: "portfolio",
  media: project.media.find((item) => item.category === category) ?? project.media[0]
});
const capabilityScene = (id: string): EditorialSceneMedia => {
  const media = capabilityMediaById(id);
  if (!media?.websiteUseApproved || !media.mediaRightsApproved || !media.copyrightApproved)
    throw new Error(`Phase 4 media ${id} is not publication-ready.`);
  return { kind: "capability", media };
};

export function Phase4Homepage({ language }: { language: Language }) {
  const copy = phase4[language];
  const zh = language === "zh";
  const projects = projectSlugs
    .map(findPortfolioProject)
    .filter((item): item is PortfolioProject => Boolean(item));
  const selected = selectedSlugs
    .map(findPortfolioProject)
    .filter((item): item is PortfolioProject => Boolean(item));
  const byd = findPortfolioProject("byd-bd11-london")!;
  const changan = findPortfolioProject("changan-europe-launch-2025")!;
  const catl = findPortfolioProject("catl-open-day-2025")!;
  const leapmotor = findPortfolioProject("leapmotor-iaa-2023")!;
  const londonFilm = findPortfolioProject("london-automotive-brand-film")!;
  const directionScenes = [
    projectScene(catl, "cover"),
    projectScene(leapmotor),
    capabilityScene("vbm-020"),
    projectScene(londonFilm)
  ];
  const heroScenes: HomeHeroScene[] = [
    { ...projectScene(byd), label: zh ? "伦敦发布现场" : "London Launch Context" },
    { ...projectScene(leapmotor), label: zh ? "欧洲展会" : "European Exhibition" },
    { ...capabilityScene("vbm-003"), label: zh ? "技术现场" : "Technology" },
    { ...capabilityScene("vbm-024"), label: zh ? "采访与对谈" : "Interview" }
  ];

  return (
    <>
      <section className="overflow-hidden bg-ink pt-[76px] text-pearl lg:pt-[88px]" data-home-section="hero">
        <Container className="grid gap-10 pb-14 pt-11 lg:min-h-[790px] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-16">
          <div className="relative z-10 lg:col-span-7 lg:pr-6">
            <Eyebrow className="text-champagne">{copy.hero.eyebrow}</Eyebrow>
            <h1
              className={`mt-7 font-medium ${zh ? "max-w-[11em] text-[clamp(2.6rem,4vw,4.2rem)] leading-[1.1]" : "max-w-[18ch] text-[clamp(2.45rem,3.8vw,4rem)] leading-[1.02] tracking-[-.035em]"}`}
            >
              {copy.hero.title}
            </h1>
            <p className="type-lede text-pearl/72 mt-8 max-w-[49rem]">{copy.hero.body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={withLanguage("/contact", language)} showArrow>
                {copy.hero.primary}
              </ButtonLink>
              <ButtonLink
                href={withLanguage("/work", language)}
                variant="secondary"
                className="border-pearl/30 text-pearl hover:border-pearl hover:bg-pearl hover:text-ink"
                showArrow
              >
                {copy.hero.secondary}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <HomeHeroExperience scenes={heroScenes} language={language} />
          </div>
        </Container>
      </section>

      <Section compact className="overflow-hidden bg-pearl" data-home-section="early-proof">
        <Container>
          <div className="grid gap-6 border-b border-ink/15 pb-9 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>{copy.proof.eyebrow}</Eyebrow>
              <h2 className="editorial-heading mt-5 max-w-[14ch]">{copy.proof.title}</h2>
            </div>
            <p className="type-body md:col-span-4 md:col-start-9">{copy.proof.body}</p>
          </div>
        </Container>
        <div className="phase32c-project-rail mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(20px,calc((100vw-1440px)/2))] pb-6">
          {projects.map((project, index) => {
            const proof = getProofPresentation(project);
            return (
              <Link
                key={project.slug}
                href={withLanguage(`/work/${project.slug}`, language)}
                className={`group block flex-none snap-start ${index === 0 ? "w-[88vw] md:w-[56vw] lg:w-[48vw]" : "w-[78vw] md:w-[36vw] lg:w-[29vw]"}`}
              >
                <EditorialScene
                  scene={projectScene(project, index === 0 ? "hero" : "cover")}
                  language={language}
                  sizes="(min-width:1024px) 48vw, 88vw"
                  mediaRole="proof-landscape"
                />
                <p className="mt-4 text-[10px] uppercase tracking-editorial text-slate">
                  0{index + 1} · {proof.label[language]} ·{" "}
                  {[project.location, project.year].filter(Boolean).join(" · ")}
                </p>
                <h3 className="mt-2 text-xl font-medium group-hover:text-champagne">
                  {zh ? project.titleZh : project.titleEn}
                </h3>
                <p className="mt-2 text-sm text-ink/60">
                  {zh ? project.participationSummaryZh : project.participationSummaryEn}
                </p>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="bg-porcelain" data-home-section="directions">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>{copy.directions.eyebrow}</Eyebrow>
              <h2 className="editorial-heading mt-5 max-w-[15ch]">{copy.directions.title}</h2>
            </div>
            <p className="type-body lg:col-span-4 lg:col-start-9">{copy.directions.body}</p>
          </div>
          <div className="mt-14 space-y-14">
            {copy.directions.items.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-6 border-t border-ink/15 pt-6 md:grid-cols-12 md:items-center"
              >
                <div className={`md:col-span-6 ${index % 2 ? "md:order-2 md:col-start-7" : ""}`}>
                  <EditorialScene
                    scene={directionScenes[index]!}
                    language={language}
                    sizes="(min-width:768px) 50vw, 100vw"
                    mediaRole={index === 2 ? "proof-portrait" : "proof-landscape"}
                  />
                </div>
                <div
                  className={`md:col-span-5 ${index % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-8"}`}
                >
                  <span className="text-xs text-champagne">0{index + 1}</span>
                  <h3 className="mt-5 text-3xl font-medium leading-tight">{item.title}</h3>
                  <p className="mt-5 text-base leading-7 text-ink/65">{item.text}</p>
                  <p className="mt-7 text-xs uppercase tracking-editorial text-slate">{item.label}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-pearl" data-home-section="objectives">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>{copy.objectives.eyebrow}</Eyebrow>
              <h2 className="editorial-heading mt-5 max-w-[14ch]">{copy.objectives.title}</h2>
            </div>
            <p className="type-body lg:col-span-4 lg:col-start-9 lg:self-end">{copy.objectives.body}</p>
          </div>
          <ol className="mt-14 border-t border-ink/15">
            {copy.objectives.items.map((item, index) => (
              <li key={item.title} className="grid gap-5 border-b border-ink/15 py-8 md:grid-cols-12">
                <span className="text-xs text-champagne md:col-span-1">0{index + 1}</span>
                <h3 className="text-2xl font-medium md:col-span-3">{item.title}</h3>
                <div className="grid gap-5 text-sm leading-6 text-ink/65 md:col-span-8 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    [zh ? "需要" : "Need", item.need],
                    [zh ? "协调" : "Coordinate", item.coordinate],
                    [zh ? "交付" : "Deliver", item.deliver],
                    [zh ? "留下" : "Remains", item.remains]
                  ].map(([label, text]) => (
                    <p key={label}>
                      <strong className="mb-2 block text-[10px] font-medium uppercase tracking-editorial text-ink">
                        {label}
                      </strong>
                      {text}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-night text-pearl" data-home-section="credibility">
        <Container>
          <Eyebrow className="text-champagne">{copy.credibility.eyebrow}</Eyebrow>
          <h2 className="editorial-heading mt-5 max-w-[16ch]">{copy.credibility.title}</h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            {[
              { copy: copy.credibility.industry, scene: projectScene(catl, "gallery") },
              { copy: copy.credibility.scene, scene: projectScene(changan, "cover") }
            ].map((item, index) => (
              <article key={item.copy.title} className="border-t border-pearl/20 pt-6">
                <EditorialScene
                  scene={item.scene}
                  language={language}
                  sizes="(min-width:1024px) 45vw, 100vw"
                  mediaRole="proof-landscape"
                />
                <p className="mt-6 text-xs text-champagne">0{index + 1}</p>
                <h3 className="mt-4 text-3xl font-medium">{item.copy.title}</h3>
                <p className="mt-4 text-lg text-pearl/90">{item.copy.question}</p>
                <p className="mt-5 max-w-xl leading-7 text-pearl/65">{item.copy.text}</p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-pearl/15 pt-5 text-xs text-pearl/55">
                  {item.copy.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-mist" data-home-section="selected-work">
        <Container>
          <Eyebrow>{copy.work.eyebrow}</Eyebrow>
          <h2 className="editorial-heading mt-5 max-w-[14ch]">{copy.work.title}</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-12">
            {selected.map((project, index) => (
              <Link
                key={project.slug}
                href={withLanguage(`/work/${project.slug}`, language)}
                className={`group block ${index === 0 ? "md:col-span-8" : index === 1 ? "md:col-span-4 md:pt-24" : "md:col-span-7 md:col-start-6"}`}
              >
                <EditorialScene
                  scene={projectScene(project, index === 2 ? "gallery" : "hero")}
                  language={language}
                  sizes="(min-width:768px) 62vw, 100vw"
                  mediaRole="proof-landscape"
                />
                <h3 className="mt-5 text-2xl font-medium group-hover:text-champagne">
                  {zh ? project.titleZh : project.titleEn}
                </h3>
                <p className="mt-2 text-sm text-ink/60">
                  {project.location} · {zh ? project.participationSummaryZh : project.participationSummaryEn}
                </p>
              </Link>
            ))}
          </div>
          <ButtonLink href={withLanguage("/work", language)} variant="ghost" className="mt-12" showArrow>
            {copy.work.link}
          </ButtonLink>
        </Container>
      </Section>

      <Section className="bg-ink text-pearl" data-home-section="talent">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-champagne">{copy.talent.eyebrow}</Eyebrow>
            <h2 className="editorial-heading mt-5 max-w-[12ch]">{copy.talent.title}</h2>
            <p className="mt-7 text-lg leading-8 text-pearl/70">{copy.talent.body}</p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-champagne">
              {copy.talent.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <p className="mt-8 border-l border-pearl/20 pl-4 text-sm leading-6 text-pearl/50">
              {copy.talent.note}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <EditorialScene
              scene={capabilityScene("vbm-020")}
              language={language}
              className="sm:row-span-2"
              sizes="(min-width:1024px) 30vw, 50vw"
              mediaRole="proof-portrait"
            />
            <EditorialScene
              scene={capabilityScene("vbm-013")}
              language={language}
              sizes="(min-width:1024px) 25vw, 50vw"
              mediaRole="card-landscape"
            />
            <EditorialScene
              scene={capabilityScene("vbm-015")}
              language={language}
              sizes="(min-width:1024px) 25vw, 50vw"
              mediaRole="card-landscape"
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-pearl" data-home-section="media">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <EditorialScene
                scene={capabilityScene("vbm-024")}
                language={language}
                className="sm:col-span-2"
                sizes="(min-width:1024px) 52vw, 100vw"
                mediaRole="proof-landscape"
              />
              <EditorialScene
                scene={projectScene(londonFilm, "gallery")}
                language={language}
                sizes="(min-width:1024px) 25vw, 50vw"
                mediaRole="card-landscape"
              />
              <div className="flex min-h-48 items-end border border-ink/15 bg-porcelain p-6">
                <p className="text-xl font-medium leading-snug">
                  Interview → Editorial framing → Press-ready assets
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow>{copy.media.eyebrow}</Eyebrow>
            <h2 className="editorial-heading mt-5 max-w-[12ch]">{copy.media.title}</h2>
            <p className="mt-7 text-lg leading-8 text-ink/65">{copy.media.body}</p>
            <div className="mt-8 grid grid-cols-2 border-t border-ink/15 text-sm">
              {copy.media.items.map((item) => (
                <span key={item} className="border-b border-ink/15 py-4 pr-4">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-porcelain" data-home-section="system">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>{copy.system.eyebrow}</Eyebrow>
              <h2 className="editorial-heading mt-5 max-w-[16ch]">{copy.system.title}</h2>
            </div>
            <p className="type-body lg:col-span-4 lg:col-start-9 lg:self-end">{copy.system.body}</p>
          </div>
          <ol className="mt-14 grid border-y border-ink/15 md:grid-cols-4">
            {copy.system.steps.map((step, index) => (
              <li
                key={step}
                className="md:not(:last-child):border-r min-h-56 border-b border-ink/15 py-7 md:border-b-0 md:px-7 md:first:pl-0"
              >
                <span className="text-xs text-champagne">0{index + 1}</span>
                <h3 className="mt-16 text-xl font-medium leading-snug">{step}</h3>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-ink text-pearl" data-home-section="cta">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="text-champagne">{copy.cta.eyebrow}</Eyebrow>
            <h2 className="type-display-page mt-5 max-w-[14ch]">{copy.cta.title}</h2>
            <p className="type-lede mt-7 text-pearl/70">{copy.cta.body}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <ButtonLink href={withLanguage("/contact", language)} showArrow>
              {copy.cta.primary}
            </ButtonLink>
            <ButtonLink
              href={withLanguage("/work", language)}
              variant="secondary"
              className="border-pearl/30 text-pearl hover:border-pearl hover:bg-pearl hover:text-ink"
            >
              {copy.cta.secondary}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
