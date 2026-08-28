import type { Language } from "@/lib/i18n";

type Localized<T> = Record<Language, T>;

export type MediaPublicationStatus = "placeholder" | "illustrative" | "approved" | "restricted";
export type MediaApprovalStatus = "placeholder" | "internal-review" | "approved" | "restricted";
export type MediaRightsState = "not-applicable" | "unverified" | "company-approved" | "client-approved";
export type MediaSourceType = "placeholder" | "illustration" | "company-library" | "client-supplied";
export type MediaMode = "fallback" | "demo" | "approved";

export type CasePrefix = "event" | "fashion" | "technology" | "beauty" | "automotive" | "jewellery";
type CaseSlot = "hero" | "landscape" | "portrait" | "diagram";
export type CaseMediaId = `${CasePrefix}-concept-${CaseSlot}`;
type PageMediaId =
  | "production-hero"
  | "production-storyboard-01"
  | "production-storyboard-02"
  | "production-storyboard-03"
  | "production-contact-sheet-01"
  | "production-contact-sheet-02"
  | "production-video-poster"
  | "talent-hero"
  | "talent-contact-sheet-01"
  | "talent-contact-sheet-02"
  | "talent-contact-sheet-03"
  | "talent-private-shortlist"
  | "research-hero"
  | "research-interview"
  | "research-roundtable"
  | "research-technical-content"
  | "research-resource-diagram"
  | "events-hero"
  | "events-stage"
  | "events-exhibition"
  | "events-panel"
  | "events-interview"
  | "events-floorplan"
  | "agency-hero"
  | "agency-workflow"
  | "agency-handoff"
  | "agency-production";
export type MediaId =
  | "hero-cinematic"
  | "home-hero-primary"
  | "home-hero-secondary"
  | "home-create"
  | "home-connect"
  | "home-activate"
  | "home-localise"
  | "home-featured-case"
  | "home-supporting-case-01"
  | "home-supporting-case-02"
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
  | "case-video"
  | PageMediaId
  | CaseMediaId;

type MediaBase = {
  id?: MediaId;
  type?: "image" | "video" | "diagram";
  src: string;
  mobileSource?: string;
  aspectRatio?: string;
  alt: Localized<string>;
  caption?: Localized<string>;
  credit?: string;
  route?: string;
  section?: string;
  purpose?: string;
  approvalStatus?: MediaApprovalStatus;
  projectId?: string;
  clientApprovalRequired?: boolean;
  assetPriority?: "critical" | "high" | "standard";
  focalPoint?: { x: number; y: number };
  replacementNote?: Localized<string>;
  suggestedContent?: Localized<string>;
  composition?: Localized<string>;
  videoSuitable?: boolean;
  safeArea?: "center" | "top" | "bottom" | "left" | "right";
  pageUsage?: string[];
  publicationStatus?: MediaPublicationStatus;
  rightsState?: MediaRightsState;
  sourceType?: MediaSourceType;
  criticalForProduction?: boolean;
  priority?: boolean;
  poster?: string;
  captions?: Partial<Record<Language, string>>;
  transcript?: Partial<Record<Language, string>>;
  speaking?: boolean;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  decorative?: boolean;
};
export type ImageMedia = MediaBase & { type?: "image"; width?: number; height?: number };
export type VideoMedia = MediaBase & {
  type: "video";
  poster: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
};
export type DiagramMedia = MediaBase & { type: "diagram"; decorative?: boolean };
export type MediaSlotDefinition = ImageMedia | VideoMedia | DiagramMedia;
export type PublishedMediaSlotDefinition = MediaSlotDefinition & {
  aspectRatio: string;
  route: string;
  section: string;
  purpose: string;
  approvalStatus: MediaApprovalStatus;
  clientApprovalRequired: boolean;
  assetPriority: "critical" | "high" | "standard";
  focalPoint: { x: number; y: number };
  publicationStatus: MediaPublicationStatus;
  rightsState: MediaRightsState;
  sourceType: MediaSourceType;
  pageUsage: string[];
  criticalForProduction: boolean;
};

const casePrefixes: CasePrefix[] = ["event", "fashion", "technology", "beauty", "automotive", "jewellery"];
const caseMedia = Object.fromEntries(
  casePrefixes.flatMap((prefix) =>
    (
      [
        [`${prefix}-concept-hero`, "image", "16 / 9"],
        [`${prefix}-concept-landscape`, "image", "3 / 2"],
        [`${prefix}-concept-portrait`, "image", "4 / 5"],
        [`${prefix}-concept-diagram`, "diagram", "16 / 9"]
      ] as const
    ).map(([id, type, aspectRatio]) => [
      id,
      {
        type,
        src:
          type === "diagram"
            ? "/media/placeholders/video-placeholder.svg"
            : "/media/placeholders/case-study.svg",
        aspectRatio,
        alt: {
          en: `Abstract ${prefix} concept ${type}.`,
          zh: `${prefix} 概念项目抽象${type === "diagram" ? "示意图" : "媒体"}。`
        },
        replacementNote: {
          en: `Replace ${id} with approved project media.`,
          zh: `请将 ${id} 替换为已获批准的项目素材。`
        },
        suggestedContent: {
          en: "Approved, rights-cleared project content.",
          zh: "已获授权且权利清晰的项目内容。"
        },
        safeArea: "center",
        pageUsage: [`case:${prefix}`],
        publicationStatus: "illustrative",
        rightsState: "not-applicable",
        sourceType: "illustration",
        ...(type === "diagram" ? { decorative: false } : {})
      }
    ])
  )
) as Record<CaseMediaId, MediaSlotDefinition>;

const pageSlot = (
  src: string,
  aspectRatio: string,
  alt: Localized<string>,
  pageUsage: string[],
  videoSuitable = false
): ImageMedia => ({
  src,
  aspectRatio,
  alt,
  replacementNote: {
    en: "Replace with approved, rights-cleared project media before publication.",
    zh: "请在发布前替换为已批准且权利清晰的项目素材。"
  },
  suggestedContent: {
    en: "A real, approved project image that communicates the working context.",
    zh: "能清楚呈现项目工作场景的真实且已批准素材。"
  },
  composition: {
    en: "Keep the principal subject inside the central safe area.",
    zh: "请将主要主体保留在中央安全区域内。"
  },
  safeArea: "center",
  pageUsage,
  publicationStatus: "placeholder",
  rightsState: "not-applicable",
  sourceType: "placeholder",
  videoSuitable
});

const pageMedia: Record<PageMediaId, MediaSlotDefinition> = {
  "production-hero": pageSlot(
    "/media/placeholders/hero-cinematic.svg",
    "16 / 10",
    { en: "Commercial production hero media placeholder.", zh: "商业制作页主视觉占位图。" },
    ["commercial production hero"],
    true
  ),
  "production-storyboard-01": pageSlot(
    "/media/placeholders/case-study.svg",
    "3 / 2",
    { en: "Commercial storyboard frame one placeholder.", zh: "商业分镜第一帧占位图。" },
    ["commercial storyboard"]
  ),
  "production-storyboard-02": pageSlot(
    "/media/placeholders/service-production.svg",
    "3 / 2",
    { en: "Commercial storyboard frame two placeholder.", zh: "商业分镜第二帧占位图。" },
    ["commercial storyboard"]
  ),
  "production-storyboard-03": pageSlot(
    "/media/placeholders/video-placeholder.svg",
    "3 / 2",
    { en: "Commercial storyboard frame three placeholder.", zh: "商业分镜第三帧占位图。" },
    ["commercial storyboard"],
    true
  ),
  "production-contact-sheet-01": pageSlot(
    "/media/placeholders/industry-editorial.svg",
    "4 / 5",
    { en: "Commercial contact sheet image one placeholder.", zh: "商业联系表图片一占位图。" },
    ["commercial contact sheet"]
  ),
  "production-contact-sheet-02": pageSlot(
    "/media/placeholders/case-study.svg",
    "4 / 5",
    { en: "Commercial contact sheet image two placeholder.", zh: "商业联系表图片二占位图。" },
    ["commercial contact sheet"]
  ),
  "production-video-poster": pageSlot(
    "/media/placeholders/video-placeholder.svg",
    "16 / 9",
    { en: "Commercial video poster placeholder.", zh: "商业视频海报占位图。" },
    ["commercial deliverables"],
    true
  ),
  "talent-hero": pageSlot(
    "/media/placeholders/industry-editorial.svg",
    "4 / 5",
    { en: "Casting desk hero placeholder.", zh: "选角工作台主视觉占位图。" },
    ["talent hero"]
  ),
  "talent-contact-sheet-01": pageSlot(
    "/media/placeholders/service-production.svg",
    "3 / 4",
    { en: "Anonymous talent contact sheet one placeholder.", zh: "匿名人才联系表一占位图。" },
    ["talent contact sheet"]
  ),
  "talent-contact-sheet-02": pageSlot(
    "/media/placeholders/industry-editorial.svg",
    "3 / 4",
    { en: "Anonymous talent contact sheet two placeholder.", zh: "匿名人才联系表二占位图。" },
    ["talent contact sheet"]
  ),
  "talent-contact-sheet-03": pageSlot(
    "/media/placeholders/case-study.svg",
    "3 / 4",
    { en: "Anonymous talent contact sheet three placeholder.", zh: "匿名人才联系表三占位图。" },
    ["talent contact sheet"]
  ),
  "talent-private-shortlist": pageSlot(
    "/media/placeholders/video-placeholder.svg",
    "4 / 3",
    { en: "Private talent shortlist process placeholder.", zh: "私密人才候选流程占位图。" },
    ["talent shortlist"]
  ),
  "research-hero": pageSlot(
    "/media/placeholders/video-placeholder.svg",
    "16 / 10",
    { en: "Research and innovation hero placeholder.", zh: "科研与创新主视觉占位图。" },
    ["research hero"],
    true
  ),
  "research-interview": pageSlot(
    "/media/placeholders/case-study.svg",
    "4 / 3",
    { en: "Technical interview placeholder.", zh: "技术访谈占位图。" },
    ["research narrative"],
    true
  ),
  "research-roundtable": pageSlot(
    "/media/placeholders/service-production.svg",
    "4 / 3",
    { en: "Research roundtable placeholder.", zh: "科研圆桌占位图。" },
    ["research narrative"],
    true
  ),
  "research-technical-content": pageSlot(
    "/media/placeholders/video-placeholder.svg",
    "16 / 9",
    { en: "Technical communication placeholder.", zh: "技术传播内容占位图。" },
    ["research outputs"],
    true
  ),
  "research-resource-diagram": pageSlot(
    "/media/placeholders/video-placeholder.svg",
    "16 / 9",
    { en: "Illustrative resource coordination diagram placeholder.", zh: "示意性资源协作模型占位图。" },
    ["research resource map"]
  ),
  "events-hero": pageSlot(
    "/media/placeholders/case-study.svg",
    "16 / 10",
    { en: "Event and exhibition hero placeholder.", zh: "活动与展会主视觉占位图。" },
    ["events hero"],
    true
  ),
  "events-stage": pageSlot(
    "/media/placeholders/video-placeholder.svg",
    "16 / 9",
    { en: "Event stage placeholder.", zh: "活动舞台占位图。" },
    ["events format"],
    true
  ),
  "events-exhibition": pageSlot(
    "/media/placeholders/case-study.svg",
    "4 / 3",
    { en: "Exhibition placeholder.", zh: "展览占位图。" },
    ["events format"]
  ),
  "events-panel": pageSlot(
    "/media/placeholders/service-production.svg",
    "4 / 3",
    { en: "Industry panel placeholder.", zh: "行业论坛占位图。" },
    ["events format"],
    true
  ),
  "events-interview": pageSlot(
    "/media/placeholders/industry-editorial.svg",
    "4 / 3",
    { en: "Event interview area placeholder.", zh: "活动访谈区占位图。" },
    ["events capture"],
    true
  ),
  "events-floorplan": pageSlot(
    "/media/placeholders/video-placeholder.svg",
    "16 / 9",
    { en: "Illustrative event layout placeholder.", zh: "活动布局示意占位图。" },
    ["events architecture"]
  ),
  "agency-hero": pageSlot(
    "/media/placeholders/hero-cinematic.svg",
    "16 / 10",
    { en: "Agency support hero placeholder.", zh: "代理支持主视觉占位图。" },
    ["agency hero"]
  ),
  "agency-workflow": pageSlot(
    "/media/placeholders/service-production.svg",
    "4 / 3",
    { en: "White-label agency workflow placeholder.", zh: "白标代理工作流占位图。" },
    ["agency workflow"]
  ),
  "agency-handoff": pageSlot(
    "/media/placeholders/video-placeholder.svg",
    "4 / 3",
    { en: "Agency asset handoff placeholder.", zh: "代理素材交接占位图。" },
    ["agency handoff"]
  ),
  "agency-production": pageSlot(
    "/media/placeholders/case-study.svg",
    "4 / 3",
    { en: "Agency production support placeholder.", zh: "代理制作支持占位图。" },
    ["agency scope"]
  )
};

const mediaSeed: Record<MediaId, MediaSlotDefinition> = {
  ...caseMedia,
  ...pageMedia,
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
  "home-hero-primary": {
    src: "/media/placeholders/hero-cinematic.svg",
    aspectRatio: "4 / 5",
    alt: { en: "Primary homepage campaign media placeholder.", zh: "首页主广告媒体占位图。" },
    replacementNote: {
      en: "Use approved campaign footage or a hero still with clear subject space.",
      zh: "使用已批准的广告视频或保留主体空间的主视觉图片。"
    },
    suggestedContent: {
      en: "Campaign, set or event image with a clear focal point.",
      zh: "具有清晰视觉主体的广告、片场或活动画面。"
    },
    safeArea: "center",
    pageUsage: ["home hero"],
    priority: true
  },
  "home-hero-secondary": {
    src: "/media/placeholders/industry-editorial.svg",
    aspectRatio: "3 / 2",
    alt: { en: "Secondary homepage production media placeholder.", zh: "首页辅助制作媒体占位图。" },
    replacementNote: {
      en: "Use a supporting detail, production or location image.",
      zh: "使用辅助细节、制作现场或场地图片。"
    },
    suggestedContent: { en: "Supporting campaign detail.", zh: "广告项目辅助细节。" },
    safeArea: "center",
    pageUsage: ["home hero"]
  },
  "home-create": {
    src: "/media/placeholders/service-production.svg",
    aspectRatio: "4 / 3",
    alt: { en: "Create pillar media placeholder.", zh: "CREATE 模块媒体占位图。" },
    safeArea: "center",
    pageUsage: ["home pillars"]
  },
  "home-connect": {
    src: "/media/placeholders/industry-editorial.svg",
    aspectRatio: "4 / 3",
    alt: { en: "Connect pillar media placeholder.", zh: "CONNECT 模块媒体占位图。" },
    safeArea: "center",
    pageUsage: ["home pillars"]
  },
  "home-activate": {
    src: "/media/placeholders/case-study.svg",
    aspectRatio: "4 / 3",
    alt: { en: "Activate pillar media placeholder.", zh: "ACTIVATE 模块媒体占位图。" },
    safeArea: "center",
    pageUsage: ["home pillars"]
  },
  "home-localise": {
    src: "/media/placeholders/service-production.svg",
    aspectRatio: "4 / 3",
    alt: {
      en: "UK production and local execution media placeholder.",
      zh: "英国制作与本地落地执行媒体占位图。"
    },
    safeArea: "center",
    pageUsage: ["home pillars"]
  },
  "home-featured-case": {
    src: "/media/placeholders/case-study.svg",
    aspectRatio: "16 / 10",
    alt: { en: "Featured case media placeholder.", zh: "精选案例媒体占位图。" },
    safeArea: "center",
    pageUsage: ["home work"]
  },
  "home-supporting-case-01": {
    src: "/media/placeholders/video-placeholder.svg",
    aspectRatio: "4 / 5",
    alt: { en: "Supporting case video poster placeholder.", zh: "支持案例视频海报占位图。" },
    safeArea: "center",
    pageUsage: ["home work"]
  },
  "home-supporting-case-02": {
    src: "/media/placeholders/industry-editorial.svg",
    aspectRatio: "4 / 5",
    alt: { en: "Supporting case media placeholder.", zh: "支持案例媒体占位图。" },
    safeArea: "center",
    pageUsage: ["home work"]
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

export const criticalMediaIds = new Set<MediaId>([
  "home-hero-primary",
  "home-featured-case",
  "production-hero",
  "talent-hero",
  "research-hero",
  "events-hero",
  "agency-hero",
  "industry-fashion",
  "industry-beauty",
  "industry-tech",
  "industry-automotive",
  "industry-lifestyle"
]);

const criticalMediaGovernance: Record<
  Exclude<MediaId, never>,
  {
    route: string;
    section: string;
    purpose: string;
    clientApprovalRequired: boolean;
    projectId?: string;
    focalPoint?: { x: number; y: number };
  }
> = {
  "home-hero-primary": {
    route: "/[lang]",
    section: "hero",
    purpose: "Primary cinematic proof of London production capability.",
    clientApprovalRequired: true,
    focalPoint: { x: 58, y: 46 }
  },
  "home-featured-case": {
    route: "/[lang]",
    section: "project-models",
    purpose: "Disclosed project-model preview; replace only with approved portfolio evidence.",
    clientApprovalRequired: true,
    projectId: "concept-models"
  },
  "production-hero": {
    route: "/[lang]/services/commercial-production",
    section: "hero",
    purpose: "Show an authentic commercial production environment.",
    clientApprovalRequired: true
  },
  "talent-hero": {
    route: "/[lang]/talent",
    section: "hero",
    purpose: "Communicate a private, curated casting and styling workspace.",
    clientApprovalRequired: true,
    focalPoint: { x: 50, y: 38 }
  },
  "research-hero": {
    route: "/[lang]/services/research-innovation",
    section: "hero",
    purpose: "Show credible technical communication or expert production.",
    clientApprovalRequired: true
  },
  "events-hero": {
    route: "/[lang]/services/events-exhibitions",
    section: "hero",
    purpose: "Show live-event scale and operational control.",
    clientApprovalRequired: true
  },
  "agency-hero": {
    route: "/[lang]/for-agencies",
    section: "hero",
    purpose: "Represent discreet UK production and white-label handoff.",
    clientApprovalRequired: true
  },
  "industry-fashion": {
    route: "/[lang]/industries",
    section: "fashion",
    purpose: "Approved fashion production context.",
    clientApprovalRequired: true
  },
  "industry-beauty": {
    route: "/[lang]/industries",
    section: "beauty",
    purpose: "Approved beauty campaign context.",
    clientApprovalRequired: true
  },
  "industry-tech": {
    route: "/[lang]/industries",
    section: "technology",
    purpose: "Approved technology demonstration or interview context.",
    clientApprovalRequired: true
  },
  "industry-automotive": {
    route: "/[lang]/industries",
    section: "automotive",
    purpose: "Approved automotive production or launch context.",
    clientApprovalRequired: true
  },
  "industry-lifestyle": {
    route: "/[lang]/industries",
    section: "lifestyle",
    purpose: "Approved UK lifestyle production context.",
    clientApprovalRequired: true
  }
} as Record<
  MediaId,
  {
    route: string;
    section: string;
    purpose: string;
    clientApprovalRequired: boolean;
    projectId?: string;
    focalPoint?: { x: number; y: number };
  }
>;

const projectIdByPrefix: Record<CasePrefix, string> = {
  event: "london-celebrity-event-coverage",
  fashion: "fashion-campaign-production-london",
  technology: "ai-product-video-uk-market",
  beauty: "beauty-creator-content-sprint",
  automotive: "automotive-event-presenter-support",
  jewellery: "jewellery-editorial-shoot"
};
const legacyProjectIdByMedia: Partial<Record<MediaId, string>> = {
  "case-london-celebrity-hero": "london-celebrity-event-coverage",
  "case-fashion-campaign-hero": "fashion-campaign-production-london",
  "case-ai-product-hero": "ai-product-video-uk-market",
  "case-beauty-creator-hero": "beauty-creator-content-sprint",
  "case-automotive-event-hero": "automotive-event-presenter-support",
  "case-jewellery-editorial-hero": "jewellery-editorial-shoot"
};

function projectIdForMedia(id: MediaId) {
  const prefix = casePrefixes.find((value) => id.startsWith(`${value}-concept-`));
  if (prefix) return projectIdByPrefix[prefix];
  return legacyProjectIdByMedia[id];
}

function routeForMedia(id: MediaId, projectId?: string) {
  if (projectId) return `/[lang]/work/${projectId}`;
  if (id.startsWith("home-") || id === "hero-cinematic") return "/[lang]";
  if (id.startsWith("industry-")) return "/[lang]/industries";
  if (id.startsWith("service-")) return "/[lang]/services";
  if (id.startsWith("production-")) return "/[lang]/services/commercial-production";
  if (id.startsWith("talent-")) return "/[lang]/talent";
  if (id.startsWith("research-")) return "/[lang]/services/research-innovation";
  if (id.startsWith("events-")) return "/[lang]/services/events-exhibitions";
  if (id.startsWith("agency-")) return "/[lang]/for-agencies";
  if (id.startsWith("case-")) return "/[lang]/work/[project]";
  return "/[lang]";
}

function aspectRatioFor(id: MediaId, item: MediaSlotDefinition) {
  if (item.aspectRatio) return item.aspectRatio;
  if (id.includes("portrait") || id.includes("talent") || id.includes("fashion")) return "4 / 5";
  return "16 / 9";
}

function approvalStatusFor(item: MediaSlotDefinition): MediaApprovalStatus {
  if (item.publicationStatus === "approved") return "approved";
  if (item.publicationStatus === "restricted") return "restricted";
  if (item.publicationStatus === "illustrative") return "internal-review";
  return "placeholder";
}

const approvedPortfolio = (
  src: string,
  mobileSource: string,
  projectId: string,
  alt: Localized<string>
): Partial<MediaSlotDefinition> => ({
  src,
  mobileSource,
  projectId,
  alt,
  publicationStatus: "approved",
  approvalStatus: "approved",
  rightsState: "company-approved",
  sourceType: "company-library",
  clientApprovalRequired: false
});

const approvedPortfolioMediaById: Partial<Record<MediaId, Partial<MediaSlotDefinition>>> = {
  "service-creative-planning": approvedPortfolio(
    "/media/portfolio/automotive/changan-europe-launch-2025/01-hero.webp",
    "/media/portfolio/automotive/changan-europe-launch-2025/01-hero-mobile.webp",
    "changan-europe-launch-2025",
    {
      en: "Presenter introducing vehicles on a blue-lit European launch stage.",
      zh: "欧洲品牌发布舞台上的车辆与演讲者。"
    }
  ),
  "service-commercial-photography": approvedPortfolio(
    "/media/portfolio/fashion-beauty-apparel/teal-editorial-series/02-cover.webp",
    "/media/portfolio/fashion-beauty-apparel/teal-editorial-series/02-cover-mobile.webp",
    "teal-editorial-series",
    {
      en: "Editorial fashion image combining tailored styling and a London bus.",
      zh: "将剪裁造型与伦敦巴士结合的时尚编辑影像。"
    }
  ),
  "service-video-production": approvedPortfolio(
    "/media/portfolio/automotive/london-automotive-brand-film/01-hero.webp",
    "/media/portfolio/automotive/london-automotive-brand-film/01-hero-mobile.webp",
    "london-automotive-brand-film",
    {
      en: "London street frame from an automotive brand story film.",
      zh: "汽车品牌故事影片中的伦敦街景画面。"
    }
  ),
  "service-talent-casting": approvedPortfolio(
    "/media/portfolio/talent-casting-styling/talent-categories/04-gallery.webp",
    "/media/portfolio/talent-casting-styling/talent-categories/04-gallery-mobile.webp",
    "talent-categories",
    {
      en: "Two male talent examples in contrasting editorial styling.",
      zh: "两位男性人才的不同编辑造型示例。"
    }
  ),
  "service-styling": approvedPortfolio(
    "/media/portfolio/fashion-beauty-apparel/commercial-fashion-styling/01-hero.webp",
    "/media/portfolio/fashion-beauty-apparel/commercial-fashion-styling/01-hero-mobile.webp",
    "commercial-fashion-styling",
    { en: "Structured camel outerwear in a commercial fashion image.", zh: "商业时尚影像中的驼色结构外套。" }
  ),
  "service-event-coverage": approvedPortfolio(
    "/media/portfolio/automotive/catl-open-day-2025/01-hero.webp",
    "/media/portfolio/automotive/catl-open-day-2025/01-hero-mobile.webp",
    "catl-open-day-2025",
    {
      en: "Audience and presentation stage at an automotive Open Day.",
      zh: "汽车 Open Day 的观众与发布舞台。"
    }
  ),
  "production-hero": approvedPortfolio(
    "/media/portfolio/automotive/london-automotive-brand-film/01-hero.webp",
    "/media/portfolio/automotive/london-automotive-brand-film/01-hero-mobile.webp",
    "london-automotive-brand-film",
    {
      en: "Automotive brand story frame produced on location in London.",
      zh: "伦敦现场制作的汽车品牌故事画面。"
    }
  ),
  "production-storyboard-01": approvedPortfolio(
    "/media/portfolio/fashion-beauty-apparel/teal-editorial-series/03-gallery.webp",
    "/media/portfolio/fashion-beauty-apparel/teal-editorial-series/03-gallery-mobile.webp",
    "teal-editorial-series",
    { en: "Full-length fashion image in a sculpted garden setting.", zh: "雕塑花园环境中的全身时尚影像。" }
  ),
  "production-storyboard-02": approvedPortfolio(
    "/media/portfolio/automotive/european-road-lifestyle/03-gallery.webp",
    "/media/portfolio/automotive/european-road-lifestyle/03-gallery-mobile.webp",
    "european-road-lifestyle",
    { en: "Performance vehicle captured in motion on a European road.", zh: "欧洲道路上行驶中的性能车辆。" }
  ),
  "production-storyboard-03": approvedPortfolio(
    "/media/portfolio/fashion-beauty-apparel/creative-beauty-makeup/03-gallery.webp",
    "/media/portfolio/fashion-beauty-apparel/creative-beauty-makeup/03-gallery-mobile.webp",
    "creative-beauty-makeup",
    {
      en: "Creative beauty portrait focused on styling and makeup texture.",
      zh: "突出造型与妆面质感的创意美妆肖像。"
    }
  ),
  "events-hero": approvedPortfolio(
    "/media/portfolio/automotive/changan-europe-launch-2025/01-hero.webp",
    "/media/portfolio/automotive/changan-europe-launch-2025/01-hero-mobile.webp",
    "changan-europe-launch-2025",
    { en: "Automotive European brand launch stage in Munich.", zh: "慕尼黑汽车欧洲品牌发布舞台。" }
  ),
  "events-stage": approvedPortfolio(
    "/media/portfolio/automotive/catl-open-day-2025/05-gallery.webp",
    "/media/portfolio/automotive/catl-open-day-2025/05-gallery-mobile.webp",
    "catl-open-day-2025",
    { en: "Audience facing a wide technical presentation stage.", zh: "面向技术发布舞台的现场观众。" }
  ),
  "events-exhibition": approvedPortfolio(
    "/media/portfolio/automotive/leapmotor-iaa-2023/01-hero.webp",
    "/media/portfolio/automotive/leapmotor-iaa-2023/01-hero-mobile.webp",
    "leapmotor-iaa-2023",
    { en: "Automotive exhibition stand at IAA Mobility 2023.", zh: "IAA Mobility 2023 汽车展台。" }
  ),
  "events-panel": approvedPortfolio(
    "/media/portfolio/automotive/byd-bd11-london/06-gallery.webp",
    "/media/portfolio/automotive/byd-bd11-london/06-gallery-mobile.webp",
    "byd-bd11-london",
    { en: "Audience listening during a London vehicle presentation.", zh: "伦敦车辆发布活动中的现场观众。" }
  ),
  "events-interview": approvedPortfolio(
    "/media/portfolio/automotive/london-automotive-brand-film/03-gallery.webp",
    "/media/portfolio/automotive/london-automotive-brand-film/03-gallery-mobile.webp",
    "london-automotive-brand-film",
    {
      en: "Interview subject beside an electric vehicle in England.",
      zh: "英格兰场景中站在电动车旁的采访人物。"
    }
  ),
  "agency-hero": approvedPortfolio(
    "/media/portfolio/automotive/london-automotive-brand-film/07-gallery.webp",
    "/media/portfolio/automotive/london-automotive-brand-film/07-gallery-mobile.webp",
    "london-automotive-brand-film",
    {
      en: "Aerial vehicle movement through an English rural landscape.",
      zh: "车辆穿行英格兰乡村的航拍画面。"
    }
  ),
  "agency-workflow": approvedPortfolio(
    "/media/portfolio/automotive/european-road-lifestyle/04-gallery.webp",
    "/media/portfolio/automotive/european-road-lifestyle/04-gallery-mobile.webp",
    "european-road-lifestyle",
    {
      en: "Multiple performance vehicles moving through a European route.",
      zh: "多辆性能车辆沿欧洲道路行驶。"
    }
  ),
  "agency-handoff": approvedPortfolio(
    "/media/portfolio/automotive/london-automotive-brand-film/02-cover.webp",
    "/media/portfolio/automotive/london-automotive-brand-film/02-cover-mobile.webp",
    "london-automotive-brand-film",
    {
      en: "Aerial production view of vehicles and a countryside venue.",
      zh: "车辆与乡村场地的航拍制作画面。"
    }
  ),
  "agency-production": approvedPortfolio(
    "/media/portfolio/automotive/changan-europe-launch-2025/04-gallery.webp",
    "/media/portfolio/automotive/changan-europe-launch-2025/04-gallery-mobile.webp",
    "changan-europe-launch-2025",
    { en: "Guests viewing vehicles in an outdoor launch display.", zh: "嘉宾在户外发布展示区观看车辆。" }
  ),
  "industry-fashion": approvedPortfolio(
    "/media/portfolio/fashion-beauty-apparel/teal-editorial-series/01-hero.webp",
    "/media/portfolio/fashion-beauty-apparel/teal-editorial-series/01-hero-mobile.webp",
    "teal-editorial-series",
    { en: "Model in teal styling against modern architecture.", zh: "现代建筑前身着青绿色造型的模特。" }
  ),
  "industry-beauty": approvedPortfolio(
    "/media/portfolio/fashion-beauty-apparel/creative-beauty-makeup/04-gallery.webp",
    "/media/portfolio/fashion-beauty-apparel/creative-beauty-makeup/04-gallery-mobile.webp",
    "creative-beauty-makeup",
    { en: "Close beauty portrait with graphic blue and pink eye makeup.", zh: "蓝粉色图形眼妆的美妆近景。" }
  ),
  "industry-automotive": approvedPortfolio(
    "/media/portfolio/automotive/changan-europe-launch-2025/02-cover.webp",
    "/media/portfolio/automotive/changan-europe-launch-2025/02-cover-mobile.webp",
    "changan-europe-launch-2025",
    {
      en: "Guests and vehicles inside a European automotive launch venue.",
      zh: "欧洲汽车发布场地中的嘉宾与车辆。"
    }
  ),
  "industry-lifestyle": approvedPortfolio(
    "/media/portfolio/automotive/european-road-lifestyle/07-gallery.webp",
    "/media/portfolio/automotive/european-road-lifestyle/07-gallery-mobile.webp",
    "european-road-lifestyle",
    {
      en: "Yellow performance car moving through a European city at night.",
      zh: "夜间穿行欧洲城市的黄色性能车辆。"
    }
  )
};

const demoMediaById: Partial<Record<MediaId, string>> = {
  "home-hero-primary": "/media/demo/home-hero.webp",
  "home-create": "/media/demo/production-frame.webp",
  "home-connect": "/media/demo/talent-sheet.webp",
  "home-activate": "/media/demo/event-stage.webp",
  "home-localise": "/media/demo/agency-handoff.webp",
  "home-featured-case": "/media/demo/campaign-sequence.webp",
  "home-supporting-case-01": "/media/demo/fashion-crop.webp",
  "home-supporting-case-02": "/media/demo/technology-layer.webp",
  "production-hero": "/media/demo/production-frame.webp",
  "production-storyboard-01": "/media/demo/editorial-spread.webp",
  "production-storyboard-02": "/media/demo/landscape-film.webp",
  "talent-hero": "/media/demo/talent-sheet.webp",
  "talent-contact-sheet-01": "/media/demo/portrait-shadow.webp",
  "events-hero": "/media/demo/event-stage.webp",
  "events-exhibition": "/media/demo/exhibition-space.webp",
  "events-interview": "/media/demo/interview-frame.webp",
  "research-hero": "/media/demo/research-map.webp",
  "research-interview": "/media/demo/interview-frame.webp",
  "research-technical-content": "/media/demo/technology-layer.webp",
  "agency-hero": "/media/demo/agency-handoff.webp",
  "agency-handoff": "/media/demo/agency-handoff.webp",
  "service-commercial-photography": "/media/demo/fashion-crop.webp",
  "service-video-production": "/media/demo/production-frame.webp",
  "service-talent-casting": "/media/demo/talent-sheet.webp",
  "service-styling": "/media/demo/styling-form.webp",
  "service-event-coverage": "/media/demo/event-stage.webp",
  "industry-fashion": "/media/demo/fashion-crop.webp",
  "industry-jewellery": "/media/demo/beauty-study.webp",
  "industry-beauty": "/media/demo/beauty-study.webp",
  "industry-tech": "/media/demo/technology-layer.webp",
  "industry-automotive": "/media/demo/automotive-motion.webp",
  "industry-lifestyle": "/media/demo/editorial-spread.webp",
  "case-london-celebrity-hero": "/media/demo/event-stage.webp",
  "case-fashion-campaign-hero": "/media/demo/campaign-sequence.webp",
  "case-ai-product-hero": "/media/demo/technology-layer.webp",
  "case-beauty-creator-hero": "/media/demo/beauty-study.webp",
  "case-automotive-event-hero": "/media/demo/automotive-motion.webp",
  "case-jewellery-editorial-hero": "/media/demo/editorial-spread.webp"
};
export const mediaMode: MediaMode = process.env.NEXT_PUBLIC_SHOW_DEMO_MEDIA === "true" ? "demo" : "fallback";

export const media: Record<MediaId, PublishedMediaSlotDefinition> = Object.fromEntries(
  Object.entries(mediaSeed).map(([rawId, item]) => {
    const id = rawId as MediaId;
    const resolvedItem = { ...item, ...approvedPortfolioMediaById[id] } as MediaSlotDefinition;
    const critical = criticalMediaIds.has(id);
    const governance = criticalMediaGovernance[id];
    const projectId = resolvedItem.projectId ?? governance?.projectId ?? projectIdForMedia(id);
    return [
      id,
      {
        ...resolvedItem,
        src: mediaMode === "demo" && demoMediaById[id] ? demoMediaById[id]! : resolvedItem.src,
        aspectRatio: aspectRatioFor(id, resolvedItem),
        route: resolvedItem.route ?? governance?.route ?? routeForMedia(id, projectId),
        section: resolvedItem.section ?? governance?.section ?? resolvedItem.pageUsage?.[0] ?? id,
        purpose:
          resolvedItem.purpose ??
          governance?.purpose ??
          resolvedItem.suggestedContent?.en ??
          resolvedItem.alt.en,
        approvalStatus: resolvedItem.approvalStatus ?? approvalStatusFor(resolvedItem),
        projectId,
        clientApprovalRequired:
          resolvedItem.clientApprovalRequired ?? governance?.clientApprovalRequired ?? Boolean(projectId),
        assetPriority:
          resolvedItem.assetPriority ?? (critical ? "critical" : resolvedItem.priority ? "high" : "standard"),
        focalPoint: resolvedItem.focalPoint ?? governance?.focalPoint ?? { x: 50, y: 50 },
        publicationStatus: resolvedItem.publicationStatus ?? "placeholder",
        rightsState: resolvedItem.rightsState ?? "not-applicable",
        sourceType: resolvedItem.sourceType ?? "placeholder",
        pageUsage: resolvedItem.pageUsage ?? ["unassigned"],
        criticalForProduction: resolvedItem.criticalForProduction ?? critical
      }
    ];
  })
) as Record<MediaId, PublishedMediaSlotDefinition>;

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
