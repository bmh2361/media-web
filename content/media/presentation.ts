import generated from "@/content/media/presentation-profiles.json";

export type MediaPresentationProfile = {
  assetId: string;
  mediaType: "case-media" | "capability-media";
  subjectType:
    | "single-person"
    | "group"
    | "product"
    | "vehicle"
    | "technology-device"
    | "stage"
    | "interview"
    | "environment"
    | "detail"
    | "mixed";
  focalPoint: { x: number; y: number };
  protectedArea: { left: number; top: number; right: number; bottom: number };
  containsFace: boolean;
  containsMultipleFaces: boolean;
  containsProduct: boolean;
  containsVehicle: boolean;
  containsTextOrLogo: boolean;
  preferredFit: "cover" | "contain" | "editorial" | "full-width-natural" | "portrait-frame";
  desktopAspectRatio: string;
  tabletAspectRatio: string;
  mobileAspectRatio: string;
  desktopObjectPosition: string;
  tabletObjectPosition: string;
  mobileObjectPosition: string;
  backgroundTreatment:
    | "rich-black"
    | "graphite"
    | "soft-ivory"
    | "warm-neutral"
    | "cool-neutral"
    | "image-derived-muted"
    | "transparent";
  overlay: "none" | "subtle-dark" | "subtle-light" | "edge-gradient";
  safeForTextOverlay: boolean;
  sourcePublicPath: string;
  desktopAvifPath: string;
  desktopWebpPath: string;
  desktopJpegPath: string;
  tabletAvifPath: string;
  tabletWebpPath: string;
  mobileAvifPath: string;
  mobileWebpPath: string;
  desktopWidth: number;
  desktopHeight: number;
  tabletWidth: number;
  tabletHeight: number;
  mobileWidth: number;
  mobileHeight: number;
  altEn: string;
  altZh: string;
};

export const mediaPresentationProfiles = generated.profiles as MediaPresentationProfile[];

const profileMap = new Map(mediaPresentationProfiles.map((profile) => [profile.assetId, profile]));

export function getMediaPresentationProfile(assetId: string) {
  return profileMap.get(assetId);
}
