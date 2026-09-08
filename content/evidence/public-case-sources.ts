export const publicCaseSourceTypes = [
  "official-company",
  "official-event",
  "government",
  "investor",
  "trade-press",
  "owner-confirmation"
] as const;

export type PublicCaseSourceType = (typeof publicCaseSourceTypes)[number];
export type PublicCaseSource = {
  id: string;
  sourceType: PublicCaseSourceType;
  title: string;
  publisher: string;
  url: string | null;
  publishedDate: string | null;
  retrievedDate: string;
  supports: (
    | "marketMoment"
    | "whyItMattered"
    | "subsequentDevelopment"
    | "exactEventIdentity"
    | "productContext"
    | "venusBridgeRole"
    | "verifiedOutputs"
  )[];
};

export type PublicCaseSourceManifestEntry = {
  caseSlug: string;
  sources: PublicCaseSource[];
  lastResearchVerified: string;
};

const retrievedDate = "2026-09-09";
const ownerSource = (caseSlug: string): PublicCaseSource => ({
  id: `${caseSlug}-owner-scope`,
  sourceType: "owner-confirmation",
  title: "Existing approved project record and media-use confirmation",
  publisher: "Venus Bridge owner record",
  url: null,
  publishedDate: null,
  retrievedDate,
  supports: ["venusBridgeRole", "verifiedOutputs"]
});

export const publicCaseSourceManifest: PublicCaseSourceManifestEntry[] = [
  {
    caseSlug: "byd-bd11-london",
    lastResearchVerified: retrievedDate,
    sources: [
      {
        id: "byd-bd11-global-launch",
        sourceType: "official-company",
        title: "All-new Fully Electric BYD BD11 Double Deck Bus",
        publisher: "BYD Europe",
        url: "https://bydeurope.com/article/464",
        publishedDate: "2024-05-21",
        retrievedDate,
        supports: ["marketMoment", "whyItMattered", "exactEventIdentity", "productContext"]
      },
      ownerSource("byd-bd11-london")
    ]
  },
  {
    caseSlug: "geely-london-brand-launch",
    lastResearchVerified: retrievedDate,
    sources: [
      {
        id: "geely-ex5-uk-launch",
        sourceType: "official-company",
        title: "Geely Debuts EX5 in the UK, Driving Its Expansion into Europe’s Rapidly-Growing EV Segment",
        publisher: "Geely Auto",
        url: "https://www.geely.com/en/news/2025/geely-debuts-ex5-uk",
        publishedDate: "2025-10-23",
        retrievedDate,
        supports: [
          "marketMoment",
          "whyItMattered",
          "exactEventIdentity",
          "productContext",
          "subsequentDevelopment"
        ]
      },
      ownerSource("geely-london-brand-launch")
    ]
  },
  {
    caseSlug: "changan-europe-launch-2025",
    lastResearchVerified: retrievedDate,
    sources: [
      {
        id: "changan-iaa-2025",
        sourceType: "official-company",
        title: "2025 Munich Motor Show: Changan’s new-energy and intelligent technologies draw attention",
        publisher: "Global Changan",
        url: "https://www.globalchangan.com/cn/newsroom/2025-munich-motor-show-changan-automobiles-new-energy-and-intelligent-technologies-draw-attention.html",
        publishedDate: "2025-09-08",
        retrievedDate,
        supports: ["marketMoment", "whyItMattered", "exactEventIdentity", "productContext"]
      },
      {
        id: "changan-europe-launch-mainz",
        sourceType: "official-company",
        title: "Changan Automobile Launches CHANGAN, DEEPAL, and AVATR in Europe",
        publisher: "Global Changan",
        url: "https://www.globalchangan.com/newsroom/changan-automobile-launches-changan-deepal-and-avatr-in-europe-ushering-in-a-new-era-of-evs.html",
        publishedDate: "2025-03-21",
        retrievedDate,
        supports: ["exactEventIdentity", "subsequentDevelopment"]
      },
      ownerSource("changan-europe-launch-2025")
    ]
  },
  {
    caseSlug: "catl-open-day-2025",
    lastResearchVerified: retrievedDate,
    sources: [
      {
        id: "catl-shenxing-pro-open-day",
        sourceType: "official-company",
        title: "CATL Launches Shenxing Pro, Europe’s Optimal Solution for E-Mobility at IAA Mobility 2025",
        publisher: "CATL",
        url: "https://www.catl.com/en/news/6527.html",
        publishedDate: "2025-09-07",
        retrievedDate,
        supports: ["marketMoment", "whyItMattered", "exactEventIdentity", "productContext"]
      },
      ownerSource("catl-open-day-2025")
    ]
  },
  {
    caseSlug: "leapmotor-iaa-2023",
    lastResearchVerified: retrievedDate,
    sources: [
      {
        id: "leapmotor-2023-annual-report",
        sourceType: "investor",
        title: "Zhejiang Leapmotor Technology Co., Ltd. Annual Report 2023",
        publisher: "Leapmotor / Hong Kong Exchanges and Clearing",
        url: "https://www.hkexnews.hk/listedco/listconews/sehk/2024/0429/2024042900917.pdf",
        publishedDate: "2024-04-29",
        retrievedDate,
        supports: ["marketMoment", "whyItMattered", "exactEventIdentity", "productContext"]
      },
      ownerSource("leapmotor-iaa-2023")
    ]
  },
  {
    caseSlug: "agibot-london-launch",
    lastResearchVerified: retrievedDate,
    sources: [
      {
        id: "agibot-uk-launch-2026",
        sourceType: "official-company",
        title:
          "AGIBOT Hosts UK APC2026 in London, Advancing Commercial Deployment of Humanoid Robotics in Europe",
        publisher: "AGIBOT",
        url: "https://www.agibot.com/article/231/detail/81.html",
        publishedDate: "2026-06-30",
        retrievedDate,
        supports: [
          "marketMoment",
          "whyItMattered",
          "exactEventIdentity",
          "productContext",
          "subsequentDevelopment"
        ]
      },
      ownerSource("agibot-london-launch")
    ]
  }
];

export const publicCaseSourcesBySlug = new Map(
  publicCaseSourceManifest.map((entry) => [entry.caseSlug, entry] as const)
);
