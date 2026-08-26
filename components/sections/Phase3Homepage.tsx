import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { EditorialScene, type EditorialSceneMedia } from "@/components/sections/phase32c/EditorialScene";
import { HomeHeroExperience, type HomeHeroScene } from "@/components/sections/phase32c/HomeHeroExperience";
import { OutcomeMediaExperience, type OutcomeScene } from "@/components/sections/phase32c/OutcomeMediaExperience";
import { CapabilityIndexHero } from "@/components/sections/phase32c/CapabilityIndexHero";
import { capabilityMediaById, type CapabilityMedia } from "@/content/capability-media";
import { phase3 } from "@/content/phase3";
import { findPortfolioProject, getProofPresentation, type PortfolioProject } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

const earlyProofSlugs = ["byd-bd11-london", "london-automotive-brand-film", "changan-europe-launch-2025", "catl-open-day-2025"];
const selectedWorkSlugs = ["byd-bd11-london", "changan-europe-launch-2025", "wang-linkai-london-concert"];

const requiredCapabilityMedia = (id: string) => {
  const media = capabilityMediaById(id);
  if (!media || !media.websiteUseApproved || !media.mediaRightsApproved || !media.copyrightApproved) {
    throw new Error(`Phase 3.2C media ${id} is not publication-ready.`);
  }
  return media;
};

const projectScene = (project: PortfolioProject, category: "hero" | "cover" | "gallery" = "hero"): EditorialSceneMedia => ({
  kind: "portfolio",
  media: project.media.find((item) => item.category === category) ?? project.media[0]
});
const capabilityScene = (media: CapabilityMedia): EditorialSceneMedia => ({ kind: "capability", media });

export function Phase3Homepage({ language }: { language: Language }) {
  const copy = phase3[language];
  const zh = language === "zh";
  const earlyProof = earlyProofSlugs.map(findPortfolioProject).filter((project): project is PortfolioProject => Boolean(project));
  const selectedWork = selectedWorkSlugs.map(findPortfolioProject).filter((project): project is PortfolioProject => Boolean(project));
  const byd = findPortfolioProject("byd-bd11-london")!;
  const leapmotor = findPortfolioProject("leapmotor-iaa-2023")!;
  const londonFilm = findPortfolioProject("london-automotive-brand-film")!;
  const robot = requiredCapabilityMedia("vbm-003");
  const robotDisplay = requiredCapabilityMedia("vbm-002");
  const interview = requiredCapabilityMedia("vbm-024");
  const skincare = requiredCapabilityMedia("vbm-015");
  const creatorAuto = requiredCapabilityMedia("vbm-013");

  const heroScenes: HomeHeroScene[] = [
    { ...projectScene(byd, "cover"), label: zh ? "伦敦发布" : "London Launch" },
    { ...capabilityScene(robot), label: zh ? "技术" : "Technology" },
    { ...capabilityScene(interview), label: zh ? "人与合作" : "People" },
    { ...capabilityScene(skincare), label: zh ? "创意制作" : "Production" }
  ];
  const outcomes: OutcomeScene[] = copy.outcomes.items.slice(0, 3).map((item, index) => ({
    ...item,
    label: [zh ? "对谈与内容" : "Conversation & Content", zh ? "技术与行业场景" : "Technology Environment", zh ? "创作者商业内容" : "Creator Commercial Content", zh ? "英国品牌影片" : "UK Brand Film"][index]!,
    scene: [capabilityScene(interview), capabilityScene(robotDisplay), capabilityScene(skincare), projectScene(londonFilm, "gallery")][index]!
  }));
  const capabilityPreviews: Array<{ title: string; short: string; href: string; scene?: EditorialSceneMedia; label: string }> = [
    { title: copy.capabilities[1].title, short: copy.capabilities[1].short, href: copy.capabilities[1].id, label: zh ? "展会与行业现场" : "Exhibitions & Industry", scene: projectScene(leapmotor) },
    { title: copy.capabilities[3].title, short: copy.capabilities[3].short, href: copy.capabilities[3].id, label: zh ? "影片与品牌内容" : "Film & Brand Content", scene: projectScene(londonFilm) },
    { title: copy.capabilities[2].title, short: copy.capabilities[2].short, href: copy.capabilities[2].id, label: zh ? "创作者激活" : "Creator Activation", scene: capabilityScene(creatorAuto) },
    { title: copy.capabilities[0].title, short: copy.capabilities[0].short, href: copy.capabilities[0].id, label: zh ? "关系与知识" : "Relationships & Knowledge" }
  ];

  return (
    <>
      <section className="overflow-hidden bg-ink pt-[76px] text-pearl lg:pt-[88px]" data-home-section="hero">
        <Container className="grid gap-10 pb-14 pt-12 lg:min-h-[780px] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-16">
          <div className="relative z-10 lg:col-span-7 lg:pr-8">
            <div className="max-w-[900px]">
              <Eyebrow className="text-champagne">{copy.hero.eyebrow}</Eyebrow>
              <h1 className="type-display-hero zh-display-measure mt-7 max-w-[17ch]">{copy.hero.title}</h1>
              <p className="type-lede mt-8 max-w-[48rem] text-pearl/72">{copy.hero.body}</p>
              <div className="mt-10 flex flex-wrap gap-3"><ButtonLink href={withLanguage("/contact", language)} showArrow>{copy.hero.primary}</ButtonLink><ButtonLink href={withLanguage("/work", language)} variant="secondary" showArrow>{copy.hero.secondary}</ButtonLink></div>
            </div>
          </div>
          <div className="lg:col-span-5"><HomeHeroExperience scenes={heroScenes} language={language} /></div>
        </Container>
      </section>

      <Section compact className="overflow-hidden bg-pearl" data-home-section="activity">
        <Container>
          <div className="grid gap-6 border-b border-ink/15 pb-9 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7"><Eyebrow>{copy.proof.eyebrow}</Eyebrow><h2 className="editorial-heading mt-5 max-w-[15ch]">{copy.proof.title}</h2></div>
            <p className="type-body md:col-span-4 md:col-start-9">{copy.proof.body}</p>
          </div>
        </Container>
        <div className="phase32c-project-rail mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(20px,calc((100vw-1440px)/2))] pb-6">
          {earlyProof.map((project, index) => {
            const proof = getProofPresentation(project);
            return <Link key={project.slug} href={withLanguage(`/work/${project.slug}`, language)} className={`group block flex-none snap-start ${index === 0 ? "w-[88vw] md:w-[58vw] lg:w-[52vw]" : "w-[78vw] md:w-[38vw] lg:w-[32vw]"}`}>
              <EditorialScene scene={projectScene(project, "cover")} language={language} className={index === 1 ? "md:mt-16" : ""} sizes="(min-width:1024px) 52vw, (min-width:768px) 58vw, 88vw" mediaRole={index === 0 ? "proof-landscape" : "card-landscape"} />
              <div className="mt-5 grid grid-cols-[2.5rem_1fr] gap-3"><span className="text-xs text-champagne">0{index + 1}</span><div><p className="text-[10px] uppercase tracking-editorial text-slate">{proof.label[language]} · {[project.location, project.year].filter(Boolean).join(" · ")}</p><h3 className="mt-3 text-xl font-medium leading-tight group-hover:text-champagne">{zh ? project.titleZh : project.titleEn}</h3><p className="mt-3 text-sm leading-6 text-ink/60">{(zh ? project.venusRoleZh : project.venusRoleEn).join(" · ")}</p></div></div>
            </Link>;
          })}
        </div>
      </Section>

      <Section className="bg-porcelain" data-home-section="outcomes">
        <Container>
          <div className="mb-14"><Eyebrow>{copy.outcomes.eyebrow}</Eyebrow><h2 className="editorial-heading mt-5 max-w-[15ch]">{copy.outcomes.title}</h2></div>
          <OutcomeMediaExperience items={outcomes} language={language} />
        </Container>
      </Section>

      <Section className="bg-pearl" data-home-section="process">
        <Container><Eyebrow>{copy.process.eyebrow}</Eyebrow><h2 className="editorial-heading mt-5 max-w-[14ch]">{copy.process.title}</h2><ol className="mt-14 grid border-y border-ink/15 md:grid-cols-3">{copy.process.items.map((item, index) => <li key={item.title} className="min-h-72 border-b border-ink/15 py-8 md:border-b-0 md:px-8 md:first:pl-0 md:not(:last-child):border-r"><span className="text-xs text-champagne">0{index + 1}</span><h3 className="mt-14 text-2xl font-medium">{item.title}</h3><p className="mt-5 text-base leading-7 text-ink/65">{item.text}</p></li>)}</ol></Container>
      </Section>

      <Section className="bg-mist" data-home-section="selected-work">
        <Container>
          <Eyebrow>{copy.selectedWork.eyebrow}</Eyebrow><h2 className="editorial-heading mt-5 max-w-[13ch]">{copy.selectedWork.title}</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-12">
            {selectedWork.map((project, index) => {
              const span = index === 0 ? "md:col-span-8" : index === 1 ? "md:col-span-4 md:pt-28" : "md:col-span-7 md:col-start-6 md:mt-6";
              return <Link key={project.slug} href={withLanguage(`/work/${project.slug}`, language)} className={`group block ${span}`}><EditorialScene scene={projectScene(project, index === 2 ? "hero" : "cover")} language={language} sizes="(min-width:768px) 62vw, 100vw" mediaRole={index === 2 ? "proof-landscape" : "card-landscape"} /><h3 className="type-heading-card mt-5 group-hover:text-champagne">{zh ? project.titleZh : project.titleEn}</h3><p className="mt-2 text-sm text-ink/60">{zh ? project.projectTypeZh : project.projectTypeEn}</p></Link>;
            })}
          </div>
          <ButtonLink href={withLanguage("/work", language)} variant="ghost" className="mt-12" showArrow>{copy.selectedWork.link}</ButtonLink>
        </Container>
      </Section>

      <Section className="bg-ink text-pearl" data-home-section="capabilities">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><Eyebrow className="text-champagne">{copy.capabilitiesIntro.eyebrow}</Eyebrow><h2 className="editorial-heading mt-5 max-w-[14ch]">{copy.capabilitiesIntro.title}</h2></div><p className="type-body text-pearl/70 lg:col-span-4 lg:col-start-9">{copy.capabilitiesIntro.body}</p></div>
          <div className="mt-14"><CapabilityIndexHero items={capabilityPreviews.map((item) => ({ id: item.href, title: item.title, summary: item.short, scene: item.scene }))} language={language} baseHref={withLanguage("/capabilities", language)} /></div>
          <ButtonLink href={withLanguage("/capabilities", language)} variant="secondary" className="mt-10" showArrow>{copy.capabilitiesIntro.link}</ButtonLink>
        </Container>
      </Section>

      <Section className="bg-night text-pearl" data-home-section="why">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-start"><div><Eyebrow className="text-champagne">{copy.why.eyebrow}</Eyebrow><h2 className="editorial-heading mt-5 max-w-[13ch]">{copy.why.title}</h2><p className="mt-8 max-w-2xl text-lg leading-8 text-pearl/65">{copy.why.body}</p></div><ol className="border-t border-pearl/15">{copy.why.items.map((item, index) => <li key={item} className="grid grid-cols-[3rem_1fr] border-b border-pearl/15 py-6 text-lg"><span className="text-xs text-champagne">0{index + 1}</span>{item}</li>)}</ol></Container>
      </Section>

      <Section className="bg-ink text-pearl" data-home-section="cta">
        <Container className="container-standard grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><Eyebrow className="text-champagne">{copy.finalCta.eyebrow}</Eyebrow><h2 className="type-display-page zh-display-measure mt-5 max-w-[14ch]">{copy.finalCta.title}</h2><p className="type-lede mt-7 text-pearl/70">{copy.finalCta.body}</p></div><ButtonLink href={withLanguage("/contact", language)} variant="secondary" className="border-pearl/30 text-pearl hover:bg-pearl hover:text-ink" showArrow>{copy.finalCta.button}</ButtonLink></Container>
      </Section>
    </>
  );
}
