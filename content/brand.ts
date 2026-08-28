import { company } from "@/content/company";
import { venusBridgeMedia } from "@/lib/brand/venusBridgeMedia";

export const brand = {
  name: venusBridgeMedia.name,
  nameZh: venusBridgeMedia.name,
  domain: company.websiteDomain,
  email: company.businessEmail,
  strapline: venusBridgeMedia.positioning,
  slogan: venusBridgeMedia.slogan,
  cta: { en: "Start a Project", zh: "提交项目" }
} as const;
