export const brand = {
  name: "FrameBridge Studio",
  nameZh: "镜桥创意",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://framebridge.studio",
  email: "hello@framebridge.studio",
  strapline: {
    en: "London-based commercial production, talent and innovation activation partner for China-facing and international teams.",
    zh: "服务中国品牌与国际团队的英国商业制作、人才资源与创新活动落地伙伴。"
  },
  cta: { en: "Send Brief", zh: "提交需求" }
} as const;
