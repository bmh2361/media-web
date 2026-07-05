import type { Language } from "@/lib/i18n";

type Localized<T> = Record<Language, T>;

export type MediaId =
  | "hero-cinematic"
  | "service-creative-planning"
  | "service-commercial-photography"
  | "service-video-production"
  | "service-talent-casting"
  | "service-styling"
  | "service-event-coverage"
  | "industry-fashion"
  | "industry-jewellery"
  | "industry-beauty"
  | "industry-tech"
  | "industry-automotive"
  | "industry-lifestyle"
  | "case-london-celebrity-hero"
  | "case-fashion-campaign-hero"
  | "case-ai-product-hero"
  | "case-beauty-creator-hero"
  | "case-automotive-event-hero"
  | "case-jewellery-editorial-hero"
  | "case-supporting-1"
  | "case-supporting-2"
  | "case-supporting-3"
  | "case-video";

export const media: Record<
  MediaId,
  {
    src: string;
    alt: Localized<string>;
    replacementNote: Localized<string>;
  }
> = {
  "hero-cinematic": {
    src: "/media/placeholders/hero-cinematic.svg",
    alt: {
      en: "Cinematic placeholder for a London creative production hero visual.",
      zh: "伦敦创意制作首页主视觉占位图。"
    },
    replacementNote: {
      en: "Replace with London brand shoot, production BTS, model on set, event coverage, or abstract campaign footage.",
      zh: "建议替换为伦敦品牌拍摄、制作花絮、模特片场、活动记录或抽象广告影像。"
    }
  },
  "service-creative-planning": {
    src: "/media/placeholders/service-production.svg",
    alt: {
      en: "Placeholder for creative planning and production deck visual.",
      zh: "创意策划与制作方案视觉占位图。"
    },
    replacementNote: {
      en: "Replace with moodboard, production deck, or shoot planning material.",
      zh: "建议替换为 moodboard、制作方案或拍摄规划素材。"
    }
  },
  "service-commercial-photography": {
    src: "/media/placeholders/service-production.svg",
    alt: {
      en: "Placeholder for commercial model or product photography.",
      zh: "商业模特或产品摄影占位图。"
    },
    replacementNote: {
      en: "Replace with model/product shoot imagery.",
      zh: "建议替换为模特或产品拍摄画面。"
    }
  },
  "service-video-production": {
    src: "/media/placeholders/video-placeholder.svg",
    alt: {
      en: "Placeholder for video production camera, monitor or set.",
      zh: "视频制作、监视器或片场占位图。"
    },
    replacementNote: {
      en: "Replace with camera, monitor, set or production BTS footage.",
      zh: "建议替换为摄影机、监视器、片场或制作花絮。"
    }
  },
  "service-talent-casting": {
    src: "/media/placeholders/service-production.svg",
    alt: {
      en: "Placeholder for talent casting cards and profiles.",
      zh: "人才选角卡与资料占位图。"
    },
    replacementNote: {
      en: "Replace with anonymised model cards, silhouettes or casting interface.",
      zh: "建议替换为匿名模卡、剪影或选角界面。"
    }
  },
  "service-styling": {
    src: "/media/placeholders/industry-editorial.svg",
    alt: {
      en: "Placeholder for makeup, wardrobe and on-camera prep.",
      zh: "妆造、服装与镜头前准备占位图。"
    },
    replacementNote: {
      en: "Replace with makeup, wardrobe or on-camera prep imagery.",
      zh: "建议替换为妆造、服装或镜头前准备画面。"
    }
  },
  "service-event-coverage": {
    src: "/media/placeholders/case-study.svg",
    alt: {
      en: "Placeholder for stage, PR event or exhibition coverage.",
      zh: "舞台、公关活动或展会记录占位图。"
    },
    replacementNote: {
      en: "Replace with stage, PR event or exhibition booth imagery.",
      zh: "建议替换为舞台、公关活动或展位画面。"
    }
  },
  "industry-fashion": {
    src: "/media/placeholders/industry-editorial.svg",
    alt: {
      en: "Placeholder for fashion editorial model shoot.",
      zh: "时尚编辑式模特拍摄占位图。"
    },
    replacementNote: {
      en: "Replace with editorial model shoot imagery.",
      zh: "建议替换为编辑式模特拍摄画面。"
    }
  },
  "industry-jewellery": {
    src: "/media/placeholders/industry-editorial.svg",
    alt: {
      en: "Placeholder for jewellery close-up and model wearing shot.",
      zh: "珠宝特写与模特佩戴图占位图。"
    },
    replacementNote: {
      en: "Replace with close-up product and model wearing shot.",
      zh: "建议替换为产品特写与模特佩戴图。"
    }
  },
  "industry-beauty": {
    src: "/media/placeholders/industry-editorial.svg",
    alt: {
      en: "Placeholder for skincare or makeup content.",
      zh: "护肤或美妆内容占位图。"
    },
    replacementNote: {
      en: "Replace with skincare or makeup campaign content.",
      zh: "建议替换为护肤或美妆广告内容。"
    }
  },
  "industry-tech": {
    src: "/media/placeholders/video-placeholder.svg",
    alt: {
      en: "Placeholder for AI product demo or office scene.",
      zh: "AI 产品演示或办公场景占位图。"
    },
    replacementNote: {
      en: "Replace with product demo or office scenario.",
      zh: "建议替换为产品演示或办公室使用场景。"
    }
  },
  "industry-automotive": {
    src: "/media/placeholders/case-study.svg",
    alt: {
      en: "Placeholder for automotive event or presenter-led car content.",
      zh: "汽车活动或主持人讲车内容占位图。"
    },
    replacementNote: {
      en: "Replace with car event, presenter or walkaround imagery.",
      zh: "建议替换为汽车活动、主持人或 walkaround 画面。"
    }
  },
  "industry-lifestyle": {
    src: "/media/placeholders/industry-editorial.svg",
    alt: {
      en: "Placeholder for lifestyle product in a UK environment.",
      zh: "英国环境中的生活方式产品占位图。"
    },
    replacementNote: {
      en: "Replace with product in UK environment.",
      zh: "建议替换为英国场景中的产品画面。"
    }
  },
  "case-london-celebrity-hero": {
    src: "/media/placeholders/case-study.svg",
    alt: {
      en: "Placeholder for London celebrity event case study hero.",
      zh: "伦敦明星活动案例主视觉占位图。"
    },
    replacementNote: {
      en: "Replace with main event coverage hero visual.",
      zh: "建议替换为活动记录主视觉。"
    }
  },
  "case-fashion-campaign-hero": {
    src: "/media/placeholders/case-study.svg",
    alt: {
      en: "Placeholder for fashion campaign case study hero.",
      zh: "时尚广告案例主视觉占位图。"
    },
    replacementNote: {
      en: "Replace with campaign hero image.",
      zh: "建议替换为广告大片主图。"
    }
  },
  "case-ai-product-hero": {
    src: "/media/placeholders/video-placeholder.svg",
    alt: {
      en: "Placeholder for AI product video case study hero.",
      zh: "AI 产品视频案例主视觉占位图。"
    },
    replacementNote: {
      en: "Replace with product demo video still.",
      zh: "建议替换为产品演示视频帧。"
    }
  },
  "case-beauty-creator-hero": {
    src: "/media/placeholders/case-study.svg",
    alt: {
      en: "Placeholder for beauty creator content case study hero.",
      zh: "美妆达人内容案例主视觉占位图。"
    },
    replacementNote: {
      en: "Replace with creator beauty content hero.",
      zh: "建议替换为美妆达人内容主视觉。"
    }
  },
  "case-automotive-event-hero": {
    src: "/media/placeholders/case-study.svg",
    alt: {
      en: "Placeholder for automotive event case study hero.",
      zh: "汽车活动案例主视觉占位图。"
    },
    replacementNote: {
      en: "Replace with automotive event or presenter hero.",
      zh: "建议替换为汽车活动或主持人主视觉。"
    }
  },
  "case-jewellery-editorial-hero": {
    src: "/media/placeholders/case-study.svg",
    alt: {
      en: "Placeholder for jewellery editorial shoot case study hero.",
      zh: "珠宝编辑式拍摄案例主视觉占位图。"
    },
    replacementNote: {
      en: "Replace with jewellery editorial hero image.",
      zh: "建议替换为珠宝编辑式拍摄主图。"
    }
  },
  "case-supporting-1": {
    src: "/media/placeholders/case-study.svg",
    alt: {
      en: "Supporting case study image slot one.",
      zh: "案例支持图片槽位一。"
    },
    replacementNote: {
      en: "Replace with supporting behind-the-scenes or secondary campaign image.",
      zh: "建议替换为花絮或第二组广告画面。"
    }
  },
  "case-supporting-2": {
    src: "/media/placeholders/case-study.svg",
    alt: {
      en: "Supporting case study image slot two.",
      zh: "案例支持图片槽位二。"
    },
    replacementNote: {
      en: "Replace with supporting deliverable or detail image.",
      zh: "建议替换为交付成果或细节图。"
    }
  },
  "case-supporting-3": {
    src: "/media/placeholders/case-study.svg",
    alt: {
      en: "Supporting case study image slot three.",
      zh: "案例支持图片槽位三。"
    },
    replacementNote: {
      en: "Replace with supporting social crop or event image.",
      zh: "建议替换为社媒裁切或活动画面。"
    }
  },
  "case-video": {
    src: "/media/placeholders/video-placeholder.svg",
    alt: {
      en: "Case study video placeholder.",
      zh: "案例视频占位图。"
    },
    replacementNote: {
      en: "Replace with edited video, reel or campaign footage.",
      zh: "建议替换为成片、reel 或广告视频。"
    }
  }
};

export const serviceMediaSequence: MediaId[] = [
  "service-creative-planning",
  "service-commercial-photography",
  "service-video-production",
  "service-video-production",
  "service-talent-casting",
  "service-talent-casting",
  "service-styling",
  "service-event-coverage",
  "service-creative-planning"
];

export const industryMediaSequence: MediaId[] = [
  "industry-fashion",
  "industry-jewellery",
  "industry-beauty",
  "industry-tech",
  "industry-automotive",
  "industry-lifestyle",
  "service-event-coverage"
];

export const caseHeroMediaBySlug: Record<string, MediaId> = {
  "london-celebrity-event-coverage": "case-london-celebrity-hero",
  "fashion-campaign-production-london": "case-fashion-campaign-hero",
  "ai-product-video-uk-market": "case-ai-product-hero",
  "beauty-creator-content-sprint": "case-beauty-creator-hero",
  "automotive-event-presenter-support": "case-automotive-event-hero",
  "jewellery-editorial-shoot": "case-jewellery-editorial-hero"
};
