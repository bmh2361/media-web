import Link from "next/link";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import { getProofPresentation, homepageEarlyProofProjects } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

export function HomepageEarlyProof({ language }: { language: Language }) {
  const zh = language === "zh";
  const [featured, ...references] = homepageEarlyProofProjects;

  if (!featured) return null;

  const cover = featured.media.find((media) => media.category === "cover") ?? featured.media[0];
  const featuredProof = getProofPresentation(featured);

  return (
    <section className="border-y border-champagne/20 bg-ink text-pearl">
      <div className="container-x grid gap-6 py-8 lg:grid-cols-[1.45fr_.55fr] lg:items-stretch">
        <Link
          href={withLanguage(`/work/${featured.slug}`, language)}
          className="group grid overflow-hidden border border-pearl/15 sm:grid-cols-[1.25fr_.75fr]"
        >
          <PortfolioImage
            media={cover}
            language={language}
            className="aspect-[16/10] sm:aspect-auto sm:min-h-72"
            sizes="(min-width:1024px) 48vw, (min-width:640px) 62vw, 100vw"
          />
          <div className="flex flex-col justify-between gap-8 p-6">
            <div>
              <p className="text-xs uppercase tracking-editorial text-champagne">
                {zh ? "部分执行经验" : "SELECTED EXECUTION EXPERIENCE"}
              </p>
              <h2 className="mt-5 text-3xl font-medium leading-tight">
                {zh ? featured.titleZh : featured.titleEn}
              </h2>
              <p className="mt-4 text-sm text-pearl/55">
                {[featured.location, featured.year].filter(Boolean).join(" · ")}
              </p>
            </div>
            <div>
              <p className="text-sm leading-6 text-pearl/70">{featuredProof.businessObjective[language]}</p>
              <p className="mt-2 text-sm leading-6 text-pearl/55">
                {zh ? featured.participationSummaryZh : featured.participationSummaryEn}
              </p>
              <span className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-champagne">
                {zh ? "查看项目 →" : "View project →"}
              </span>
            </div>
          </div>
        </Link>

        <div className="grid border-y border-pearl/15">
          {references.map((project) => {
            const proof = getProofPresentation(project);
            return (
              <Link
                key={project.slug}
                href={withLanguage(`/work/${project.slug}`, language)}
                className="group flex flex-col justify-center border-b border-pearl/15 py-6 last:border-b-0 lg:px-6"
              >
                <p className="text-xs uppercase tracking-editorial text-champagne">
                  {proof.businessObjective[language]}
                </p>
                <h3 className="mt-3 text-xl font-medium transition-colors group-hover:text-champagne">
                  {zh ? project.titleZh : project.titleEn}
                </h3>
                <p className="mt-3 text-sm text-pearl/50">
                  {[project.location, project.year].filter(Boolean).join(" · ")}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
