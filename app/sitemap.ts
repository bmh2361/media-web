import type { MetadataRoute } from "next";
import { brand } from "@/content/brand";
import { publishedPortfolioProjects } from "@/content/portfolio";
import { getEffectiveWorkMode } from "@/lib/release";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const workMode = getEffectiveWorkMode();
  const pages = [
    "",
    "/companies",
    "/partners",
    "/work",
    "/how-we-work",
    "/about",
    "/contact",
    "/privacy",
    "/terms"
  ];
  if (workMode === "hidden") pages.splice(pages.indexOf("/work"), 1);

  const routes = ["en", "zh"].flatMap((lang) =>
    pages.map((path) => ({
      url: `${brand.domain}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7
    }))
  );
  const projects = ["en", "zh"].flatMap((lang) =>
    (workMode === "hidden" ? [] : publishedPortfolioProjects).map((project) => ({
      url: `${brand.domain}/${lang}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  );
  return [
    ...routes,
    ...projects,
    ...["radar", "privacy", "terms"].map((path) => ({
      url: `${brand.domain}/${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.5
    }))
  ];
}
