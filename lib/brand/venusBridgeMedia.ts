export const venusBridgeMedia = {
  name: "Venus Bridge",
  shortName: "Venus Bridge",
  monogram: "VB",
  slogan: "BRIDGING VISION. ELEVATING BRANDS.",
  positioning: {
    en: "UK and European market validation, partnerships and local execution for Chinese companies.",
    zh: "为中国企业提供英国与欧洲市场验证、商务合作与本地执行。"
  },
  legalTradingStatement: {
    en: "Venus Bridge Media is a trading name of Vivian Adventure Ltd.",
    zh: "Venus Bridge Media 为 Vivian Adventure Ltd 旗下业务品牌。"
  },
  colors: {
    black: "#0a0b0d",
    graphite: "#15171a",
    ivory: "#f4f0e8",
    gold: "#cca672",
    goldMuted: "#a8875d",
    stone: "#968f84",
    border: "rgba(204, 166, 114, 0.22)"
  },
  logos: {
    mark: {
      light: "/brand/venus-bridge/webp/venus-bridge-monogram-black.webp",
      dark: "/brand/venus-bridge/webp/venus-bridge-monogram-white.webp",
      width: 449,
      height: 367,
      alt: "Venus Bridge monogram",
      use: "Mobile navigation, favicon, app icon, opening sequence and restrained media marks."
    },
    name: {
      light: "/brand/venus-bridge/webp/venus-bridge-primary-stack-black.webp",
      dark: "/brand/venus-bridge/webp/venus-bridge-primary-stack-white.webp",
      width: 1270,
      height: 670,
      alt: "Venus Bridge — Global Partnerships",
      use: "Formal brand identification on controlled light or dark surfaces; not narrow headers."
    },
    wordmark: {
      light: "/brand/venus-bridge/webp/venus-bridge-wordmark-black.webp",
      dark: "/brand/venus-bridge/webp/venus-bridge-wordmark-white.webp",
      width: 1270,
      height: 199,
      alt: "Venus Bridge wordmark",
      use: "Desktop header when paired with the VB monogram."
    },
    tagline: {
      light: "/brand/venus-bridge/webp/venus-bridge-horizontal-lockup-black.webp",
      dark: "/brand/venus-bridge/webp/venus-bridge-horizontal-lockup-white.webp",
      width: 929,
      height: 174,
      alt: "Venus Bridge — Global Partnerships",
      use: "About, brand statement and footer areas with enough room for the slogan."
    },
    "full-transparent": {
      light: "/brand/venus-bridge/webp/venus-bridge-primary-stack-black.webp",
      dark: "/brand/venus-bridge/webp/venus-bridge-primary-stack-white.webp",
      width: 1270,
      height: 670,
      alt: "Venus Bridge — Global Partnerships",
      use: "Controlled brand imagery, social and Open Graph output; never over busy low-contrast media."
    }
  },
  appIcons: {
    apple: "/brand/venus-bridge/favicon/venus-bridge-icon-180.png",
    small: "/brand/venus-bridge/favicon/venus-bridge-icon-192.png",
    large: "/brand/venus-bridge/favicon/venus-bridge-icon-512.png",
    favicon: "/brand/venus-bridge/favicon/venus-bridge-icon-48.png"
  }
} as const;

export type BrandLogoVariant = keyof typeof venusBridgeMedia.logos;
export type BrandSurface = "light" | "dark";
