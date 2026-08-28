import Link from "next/link";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import { getProofPresentation, homepageProofProjects } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

export function HomepageSelectedWork({ language }: { language: Language }) {
  const zh = language === "zh";
  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-2">
      {homepageProofProjects.map((project, index) => {
        const cover = project.media.find((media) => media.category === "cover") ?? project.media[0];
        const proof = getProofPresentation(project);
        return (
          <article key={project.slug} className={index === 0 ? "lg:row-span-2" : ""}>
            <Link
              href={withLanguage(`/work/${project.slug}`, language)}
              className="group grid h-full bg-pearl"
            >
              <PortfolioImage
                media={cover}
                language={language}
                className={index === 0 ? "aspect-[16/11] lg:min-h-[540px]" : "aspect-[16/8]"}
                sizes="(min-width:1024px) 50vw, 100vw"
                priority={index === 0}
              />
              <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-end lg:p-7">
                <div>
                  <p className="text-xs uppercase tracking-editorial text-champagne">
                    {proof.businessObjective[language]}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium transition-colors group-hover:text-champagne">
                    {zh ? project.titleZh : project.titleEn}
                  </h3>
                  <p className="mt-3 text-sm text-ink/55">
                    {[project.location, project.year].filter(Boolean).join(" · ")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink/55">
                    {(zh ? project.venusRoleZh : project.venusRoleEn)[0]}
                  </p>
                </div>
                <span className="inline-flex min-h-11 items-center text-sm font-semibold">
                  {zh ? "查看证明 →" : "View proof →"}
                </span>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
