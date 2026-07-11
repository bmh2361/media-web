import type { LocalisedString } from "@/content/types";

export type SeoRecord = {
  title: LocalisedString;
  description: LocalisedString;
  ogSubtitle: LocalisedString;
  canonicalPath: string;
};

export const seoContent: Record<string, SeoRecord> = {
  home: {
    title: { en: "FrameBridge Studio", zh: "镜桥创意" },
    description: {
      en: "UK production, talent and innovation delivery.",
      zh: "英国制作、人才与创新活动执行。"
    },
    ogSubtitle: { en: "UK production, talent and innovation", zh: "英国制作、人才与创新" },
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
    title: { en: "Concept Project Models", zh: "概念项目模式" },
    description: { en: "Illustrative project planning models.", zh: "项目规划示例。" },
    ogSubtitle: { en: "Illustrative, not client portfolio evidence", zh: "概念示例，不是客户作品集证据" },
    canonicalPath: "/work"
  }
};
