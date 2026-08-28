import generated from "@/content/capability-media.generated.json";
import type { CapabilityMediaCategory, CapabilityMediaCollection } from "@/content/types";

export type CapabilityMedia = {
  id: string;
  category: CapabilityMediaCategory;
  categoryEn: string;
  categoryZh: string;
  sourcePath: string;
  webReadyPath: string;
  originalFilename: string;
  duplicateSourcePaths: string[];
  width: number;
  height: number;
  outputWidth: number;
  outputHeight: number;
  orientation: "portrait" | "landscape" | "square";
  aspectRatio: string;
  heroCandidate: boolean;
  homepageCandidate: boolean;
  recommendedPages: string[];
  actualPages: string[];
  usedPublicly: boolean;
  publicPath: string;
  avifPath: string;
  jpegPath: string;
  mobilePath: string;
  mobileAvifPath: string;
  thumbnailPath: string;
  objectPositionDesktop: string;
  objectPositionMobile: string;
  altEn: string;
  altZh: string;
  contentRole: "capability-media";
  caseReady: false;
  capabilityReady: true;
  websiteUseApproved: true;
  mediaRightsApproved: true;
  copyrightApproved: true;
  creditRequired: false;
  public: true;
  sourceBytes: number;
  webReadyBytes: number;
  webpBytes: number;
  avifBytes: number;
  jpegBytes: number;
  mobileBytes: number;
  mobileAvifBytes: number;
  thumbnailBytes: number;
};

export const capabilityMediaManifest = generated as {
  packageVersion: string;
  sourceRecordCount: 24;
  duplicateBinaryAssetsRemoved: 1;
  records: CapabilityMedia[];
};

export const capabilityMediaById = (id: string) =>
  capabilityMediaManifest.records.find((media) => media.id === id);

const collection = (
  input: Omit<CapabilityMediaCollection, "media" | "caseReady" | "capabilityReady" | "public"> & {
    mediaIds: string[];
  }
): CapabilityMediaCollection => ({
  ...input,
  media: input.mediaIds.map(capabilityMediaById).filter((media): media is CapabilityMedia => Boolean(media)),
  caseReady: false,
  capabilityReady: true,
  public: true
});

export const capabilityMediaCollections: CapabilityMediaCollection[] = [
  collection({
    id: "live-performance",
    slug: "live-performance",
    titleEn: "Live Performance",
    titleZh: "现场表演",
    category: "artist-live-performance",
    primaryExpertise: "entertainment-culture",
    relatedPaths: ["launch-in-the-uk"],
    treatment: "hero",
    mediaIds: ["vbm-020", "vbm-006", "vbm-007"]
  }),
  collection({
    id: "creator-commercial-content",
    slug: "creator-commercial-content",
    titleEn: "Creator Commercial Content",
    titleZh: "创作者商业内容",
    category: "creator-commercial-content",
    primaryExpertise: "entertainment-culture",
    relatedPaths: ["create-in-the-uk"],
    treatment: "editorial-grid",
    mediaIds: ["vbm-011", "vbm-014"]
  }),
  collection({
    id: "interview-editorial",
    slug: "interview-editorial",
    titleEn: "Interview & Editorial",
    titleZh: "采访与编辑内容",
    category: "artist-creator-interviews",
    primaryExpertise: "entertainment-culture",
    relatedPaths: ["create-in-the-uk"],
    treatment: "supporting-media",
    mediaIds: ["vbm-024", "vbm-023"]
  }),
  collection({
    id: "ai-product-robotics",
    slug: "ai-product-robotics",
    titleEn: "AI Product & Robotics",
    titleZh: "AI 产品与机器人",
    category: "technology-ai-product",
    primaryExpertise: "technology-ai-research",
    relatedPaths: ["create-in-the-uk", "launch-in-the-uk"],
    treatment: "hero",
    mediaIds: ["vbm-003", "vbm-001", "vbm-002"]
  }),
  collection({
    id: "expert-industry-content",
    slug: "expert-industry-content",
    titleEn: "Expert & Industry Content",
    titleZh: "专家与行业内容",
    category: "founder-expert-interviews",
    primaryExpertise: "technology-ai-research",
    relatedPaths: ["create-in-the-uk", "launch-in-the-uk"],
    treatment: "editorial-grid",
    mediaIds: ["vbm-004", "vbm-005"]
  }),
  collection({
    id: "technology-launch-exhibition",
    slug: "technology-launch-exhibition",
    titleEn: "Technology Launch & Exhibition",
    titleZh: "科技发布与展览",
    category: "events-exhibitions-roadshows",
    primaryExpertise: "technology-ai-research",
    relatedPaths: ["launch-in-the-uk"],
    treatment: "capability-strip",
    mediaIds: ["vbm-010", "vbm-003", "vbm-004"]
  })
];

export const capabilityCollectionsForExpertise = (expertise: CapabilityMediaCollection["primaryExpertise"]) =>
  capabilityMediaCollections.filter((item) => item.primaryExpertise === expertise);

export const capabilityMediaForPage = (page: string) =>
  capabilityMediaManifest.records.filter((media) => media.actualPages.includes(page));
