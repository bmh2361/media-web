import type { LocalisedString } from "@/content/types";

export type SeoRecord = {
  title: LocalisedString;
  description: LocalisedString;
  ogSubtitle: LocalisedString;
  canonicalPath: string;
};

export const seoContent: Record<string, SeoRecord> = {
  home: {
    title: { en: "Venus Bridge", zh: "Venus Bridge" },
    description: {
      en: "Cross-border collaboration, UK and European market presence, institutional engagement and reusable brand evidence.",
      zh: "跨境合作、英国与欧洲市场存在、机构与人才触达，以及可复用的海外品牌证据。"
    },
    ogSubtitle: { en: "Cross-border collaboration and market presence", zh: "跨境合作与海外市场存在" },
    canonicalPath: "/"
  },
  services: {
    title: { en: "Services", zh: "服务能力" },
    description: { en: "Production, talent and activation services.", zh: "制作、人才与活动执行服务。" },
    ogSubtitle: { en: "Plan the UK delivery route", zh: "规划英国本地执行路径" },
    canonicalPath: "/services"
  },
  industries: {
    title: { en: "Industries", zh: "行业" },
    description: { en: "Sector-specific UK execution models.", zh: "面向行业的英国本地执行模式。" },
    ogSubtitle: { en: "Six sector models", zh: "六大行业方向" },
    canonicalPath: "/industries"
  },
  work: {
    title: { en: "Commercial Evidence", zh: "商业项目证据" },
    description: {
      en: "Market presence, institutional engagement and international brand evidence from UK and European projects.",
      zh: "英国与欧洲项目中的市场存在、机构与人才触达及国际品牌证据。"
    },
    ogSubtitle: { en: "Objectives, context and accountable delivery", zh: "商业目标、当地语境与可追责交付" },
    canonicalPath: "/work"
  }
};
