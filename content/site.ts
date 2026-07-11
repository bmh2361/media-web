import type { Language } from "@/lib/i18n";

type Localized<T> = Record<Language, T>;

export const brand = {
  en: "FrameBridge Studio",
  zh: "镜桥创意",
  strapline: {
    en: "UK Creative Production for Chinese Brands Going Global.",
    zh: "为中国品牌提供英国本地创意制作与商业内容落地服务。"
  }
} satisfies Localized<string> & { strapline: Localized<string> };

export const ui = {
  en: {
    startBrief: "Start a brief",
    viewAllServices: "View all services",
    mediaFrameKicker: "Visual system",
    footerNote: "London and China-ready production coordination",
    contactLocation: "United Kingdom, serving China-facing teams",
    brandShort: "FrameBridge",
    copyright: "© 2026 FrameBridge Studio / 镜桥创意",
    aboutMedia: "London production culture"
  },
  zh: {
    startBrief: "提交需求",
    viewAllServices: "查看全部服务",
    mediaFrameKicker: "视觉体系",
    footerNote: "英国本地制作与中英双语项目协作",
    contactLocation: "英国本地，服务面向中国市场的团队",
    brandShort: "FrameBridge",
    copyright: "© 2026 FrameBridge Studio / 镜桥创意",
    aboutMedia: "伦敦制作现场"
  }
} satisfies Localized<Record<string, string>>;

export const navItems = [
  { href: "/services", label: { en: "Services", zh: "服务" } },
  { href: "/industries", label: { en: "Industries", zh: "行业" } },
  { href: "/talent", label: { en: "Talent & Creators", zh: "人才与创作者" } },
  { href: "/work", label: { en: "Work", zh: "案例作品" } },
  { href: "/for-agencies", label: { en: "For Agencies", zh: "代理合作" } },
  { href: "/about", label: { en: "About", zh: "关于" } },
  { href: "/contact", label: { en: "Contact", zh: "联系" } }
] as const;

export const home = {
  en: {
    eyebrow: "London-based production for China-facing teams",
    title: "UK Creative Production for Chinese Brands Going Global",
    intro:
      "We help brands create campaign-ready content in the UK through photography, video, styling, models, creators, events and bilingual local production.",
    ctaPrimary: "Start a Brand Project",
    ctaSecondary: "View Our Work",
    proofTitle: "Built for serious overseas campaigns",
    proofPoints: [
      "London-based production",
      "Chinese-English bilingual team",
      "Models, creators and styling network",
      "Commercial photo, video and event content",
      "For brands, agencies and PR teams"
    ],
    sections: {
      scenariosEyebrow: "What we create",
      scenariosTitle: "Campaign assets with a clear commercial job.",
      scenariosIntro:
        "One brief can become a complete UK content package for launch, social, PR, retail and agency handoff.",
      capabilitiesEyebrow: "Core capabilities",
      capabilitiesTitle: "Production depth, without the overseas friction.",
      industriesEyebrow: "Industries",
      industriesTitle: "Built for categories where image quality carries the brand.",
      workEyebrow: "Featured work",
      workTitle: "Preview campaigns shaped for China-facing use.",
      talentEyebrow: "Talent network",
      talentTitle: "The right faces, makers and specialists in the UK.",
      talentText:
        "FrameBridge Studio works with UK-based models, actors, presenters, Chinese creators, stylists, makeup artists, photographers and videographers, matching each role to the brand, script, audience and platform.",
      processEyebrow: "How we work",
      processTitle: "A calm route from brief to campaign-ready assets.",
      finalTitle: "Planning a brand shoot, campaign or event in the UK?",
      finalText:
        "Send the brief, timeline and reference direction. We will map the production route and the team you need."
    },
    caseLabels: {
      challenge: "Challenge",
      delivered: "Delivered"
    },
    scenarioCards: [
      "Overseas Campaign Content",
      "Product Launch Assets",
      "Social Media Visuals",
      "Fashion & Beauty Lookbooks",
      "AI & Product Videos",
      "Automotive & Event Coverage",
      "Creator-led Campaigns",
      "Short Drama & Brand Storytelling"
    ],
    capabilityCards: [
      {
        title: "Creative Production",
        text: "Concept direction, production planning, crew, location and schedule management for UK shoots."
      },
      {
        title: "Commercial Photography",
        text: "Campaign, lookbook, product, still life and social-first image production with polished styling."
      },
      {
        title: "Video & Brand Films",
        text: "Launch films, product videos, short-form edits and motion assets for paid and owned channels."
      },
      {
        title: "Talent, Model & Creator Casting",
        text: "Models, actors, presenters and UK-based Chinese creators matched to the campaign brief."
      },
      {
        title: "Makeup, Styling & Image Direction",
        text: "On-camera makeup, wardrobe, product styling and image direction for premium commercial standards."
      },
      {
        title: "Event, PR & Exhibition Coverage",
        text: "Photo and video coverage for launches, press moments, exhibitions and live brand activations."
      }
    ],
    industries: [
      "Fashion",
      "Jewellery & Accessories",
      "Beauty & Skincare",
      "AI & Technology",
      "Automotive",
      "Lifestyle",
      "Food & Beverage",
      "Entertainment",
      "Education",
      "Cross-border E-commerce"
    ],
    featuredWork: [
      {
        title: "London Celebrity Event Coverage",
        industry: "Entertainment / PR",
        challenge:
          "A China-facing team needed premium event coverage in London with fast editorial turnaround.",
        delivered:
          "Red-carpet photo coverage, short video clips, bilingual coordination and PR-ready assets.",
        cta: "View case"
      },
      {
        title: "Fashion Campaign Production",
        industry: "Fashion",
        challenge:
          "A fashion brand needed UK campaign visuals that felt editorial, premium and usable across channels.",
        delivered:
          "Creative production, model casting, styling, location planning, campaign stills and social cuts.",
        cta: "View case"
      },
      {
        title: "AI Product Video for UK Market",
        industry: "AI / Technology",
        challenge:
          "A technology company needed human-facing product content for a UK audience and Chinese stakeholders.",
        delivered:
          "Presenter casting, product video, clean interface visuals and bilingual production management.",
        cta: "View case"
      }
    ],
    process: [
      "Send us your brief",
      "Define the content goal",
      "Build the production plan",
      "Cast talent and source resources",
      "Shoot in the UK",
      "Deliver campaign-ready assets"
    ],
    talentNetwork: [
      "Models",
      "Actors",
      "Presenters",
      "Chinese creators",
      "Stylists",
      "Makeup artists",
      "Photographers",
      "Videographers"
    ],
    finalCta: "Send Us Your Brief"
  },
  zh: {
    eyebrow: "服务面向中国市场的英国本地制作团队",
    title: "为中国品牌打造英国本地商业内容资产",
    intro: "我们帮助品牌在英国完成商业拍摄、短视频、模特达人、妆造造型、活动内容和海外传播素材交付。",
    ctaPrimary: "开始品牌项目",
    ctaSecondary: "查看案例",
    proofTitle: "为真正需要海外传播落地的项目而建",
    proofPoints: [
      "伦敦本地制作支持",
      "中英双语项目团队",
      "模特、达人与造型资源网络",
      "商业摄影、视频与活动内容",
      "服务品牌、代理公司与公关团队"
    ],
    sections: {
      scenariosEyebrow: "我们帮助品牌制作",
      scenariosTitle: "每一组内容，都服务一个清晰的商业目标。",
      scenariosIntro: "从一个项目需求出发，延展为适用于上市、社媒、公关、零售与代理交付的英国内容资产。",
      capabilitiesEyebrow: "核心能力",
      capabilitiesTitle: "有英国本地制作深度，也有跨境沟通效率。",
      industriesEyebrow: "服务行业",
      industriesTitle: "为影像质感影响品牌判断的行业而设计。",
      workEyebrow: "精选案例",
      workTitle: "面向中国传播场景的英国制作预览。",
      talentEyebrow: "人才与创作者网络",
      talentTitle: "在英国找到适合品牌、镜头与渠道的人。",
      talentText:
        "镜桥创意长期协作英国本地模特、演员、主持人、华人创作者、造型师、化妆师、摄影师与摄像团队，并根据品牌调性、脚本、受众与平台需求进行匹配。",
      processEyebrow: "工作流程",
      processTitle: "从需求到可投放素材的稳定路径。",
      finalTitle: "正在计划英国品牌拍摄、活动或海外宣传内容？",
      finalText: "发送项目需求、时间节点与参考方向，我们会协助梳理制作路径与所需团队。"
    },
    caseLabels: {
      challenge: "挑战",
      delivered: "交付"
    },
    scenarioCards: [
      "海外广告内容",
      "新品上市素材",
      "社交媒体视觉",
      "时尚与美妆画册",
      "AI 与产品视频",
      "汽车与活动记录",
      "达人共创广告",
      "短剧与品牌故事"
    ],
    capabilityCards: [
      {
        title: "创意制作",
        text: "提供创意方向、制作策划、团队、场地与拍摄日程管理，支持品牌在英国顺利落地。"
      },
      {
        title: "商业摄影",
        text: "完成广告、画册、产品、静物与社媒视觉拍摄，并保持精致造型与商业交付标准。"
      },
      {
        title: "视频与品牌影片",
        text: "制作上市影片、产品视频、短视频剪辑与动态素材，适配投放和自有渠道。"
      },
      {
        title: "模特、演员与达人选角",
        text: "根据品牌、脚本与渠道需求匹配模特、演员、主持人与英国华人创作者。"
      },
      {
        title: "妆造、造型与视觉指导",
        text: "提供镜头妆造、服装造型、产品陈列与视觉把控，确保商业内容质感。"
      },
      {
        title: "活动、公关与展会内容",
        text: "为发布会、媒体活动、展会与品牌现场提供图片和视频内容记录。"
      }
    ],
    industries: [
      "时尚",
      "珠宝与配饰",
      "美妆护肤",
      "AI 与科技",
      "汽车",
      "生活方式",
      "食品饮品",
      "娱乐",
      "教育",
      "跨境电商"
    ],
    featuredWork: [
      {
        title: "伦敦明星活动内容记录",
        industry: "娱乐 / 公关",
        challenge: "面向中国传播的团队需要在伦敦完成高质感活动记录，并快速交付编辑素材。",
        delivered: "红毯图片、短视频片段、中英双语协调与可用于公关发布的内容资产。",
        cta: "查看案例"
      },
      {
        title: "时尚品牌广告制作",
        industry: "时尚",
        challenge: "品牌需要一组兼具编辑质感与多渠道适配能力的英国广告视觉。",
        delivered: "创意制作、模特选角、造型、场地规划、广告图片与社媒短内容。",
        cta: "查看案例"
      },
      {
        title: "面向英国市场的 AI 产品视频",
        industry: "AI / 科技",
        challenge: "科技公司需要更有人感的产品内容，同时兼顾英国受众与中国团队沟通。",
        delivered: "出镜人才匹配、产品视频、干净界面视觉与中英双语制作管理。",
        cta: "查看案例"
      }
    ],
    process: [
      "发送项目需求",
      "明确内容目标",
      "搭建制作方案",
      "选角并匹配资源",
      "在英国完成拍摄",
      "交付可投放素材"
    ],
    talentNetwork: ["模特", "演员", "主持人", "华人创作者", "造型师", "化妆师", "摄影师", "摄像师"],
    finalCta: "提交项目需求"
  }
} satisfies Localized<{
  eyebrow: string;
  title: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
  proofTitle: string;
  proofPoints: string[];
  sections: Record<string, string>;
  scenarioCards: string[];
  capabilityCards: Array<{ title: string; text: string }>;
  industries: string[];
  featuredWork: Array<{ title: string; industry: string; challenge: string; delivered: string; cta: string }>;
  caseLabels: Record<string, string>;
  process: string[];
  talentNetwork: string[];
  finalCta: string;
}>;

export const services = [
  {
    title: { en: "Creative production", zh: "创意制作" },
    text: {
      en: "Creative direction, production planning, crew sourcing, location coordination and on-set management for UK-based campaigns.",
      zh: "提供创意方向、拍摄策划、团队搭建、场地协调与英国本地现场制片管理。"
    },
    tag: { en: "Strategy to set", zh: "从策略到现场" }
  },
  {
    title: { en: "Commercial photography", zh: "商业摄影" },
    text: {
      en: "Campaign, lookbook, e-commerce, still life and social-first image production with refined styling and delivery standards.",
      zh: "完成广告大片、画册、电商、静物与社媒视觉拍摄，并配合专业造型与交付规范。"
    },
    tag: { en: "Image systems", zh: "视觉资产体系" }
  },
  {
    title: { en: "Brand films and product videos", zh: "品牌影片与产品视频" },
    text: {
      en: "Launch films, product stories, campaign edits and short videos designed for paid media, owned channels and retail moments.",
      zh: "制作品牌影片、上市视频、产品故事、广告剪辑与短视频，适配投放、自有渠道与零售场景。"
    },
    tag: { en: "Motion assets", zh: "动态内容资产" }
  },
  {
    title: { en: "Short-form and short drama production", zh: "短视频与短剧制作" },
    text: {
      en: "Narrative-led social content for platforms that reward strong hooks, fast production rhythms and repeatable formats.",
      zh: "为强调开场吸引力、节奏效率与系列化表达的平台制作剧情类短内容。"
    },
    tag: { en: "Social formats", zh: "社媒内容形式" }
  },
  {
    title: { en: "Casting and creator coordination", zh: "选角与创作者协调" },
    text: {
      en: "Models, actors, presenters, bilingual hosts and UK-based Chinese creators matched to brand, script and channel.",
      zh: "根据品牌、脚本与渠道需求匹配模特、演员、主持人、双语出镜人才与英国华人创作者。"
    },
    tag: { en: "People on camera", zh: "镜头前人才" }
  },
  {
    title: { en: "Makeup, styling and event coverage", zh: "妆造造型与活动内容" },
    text: {
      en: "On-camera makeup, wardrobe, product styling, event coverage, exhibition documentation and PR-ready content capture.",
      zh: "支持镜头妆造、服装造型、产品陈列、活动记录、展会拍摄与公关传播素材采集。"
    },
    tag: { en: "Polish and presence", zh: "造型与现场质感" }
  }
];

export const industries = [
  {
    en: "Fashion and designer brands",
    zh: "时装与设计师品牌",
    description: {
      en: "Editorial campaigns, lookbooks, social launch assets and showroom content.",
      zh: "编辑式广告、品牌画册、社媒上市素材与展厅内容。"
    }
  },
  {
    en: "Jewellery, watches and accessories",
    zh: "珠宝、腕表与配饰",
    description: {
      en: "Detail-led still life, model imagery and premium product storytelling.",
      zh: "强调细节质感的静物、模特图像与高端产品叙事。"
    }
  },
  {
    en: "Beauty, fragrance and wellness",
    zh: "美妆、香氛与健康生活",
    description: {
      en: "Texture, ingredient, routine and creator-led content for launch and retention.",
      zh: "围绕质地、成分、使用场景与创作者表达的上市及复购内容。"
    }
  },
  {
    en: "AI products and technology companies",
    zh: "AI 产品与科技公司",
    description: {
      en: "Human-facing product films, presenter demos and clean campaign visuals.",
      zh: "更有人感的产品影片、出镜讲解与清晰商业视觉。"
    }
  },
  {
    en: "Automotive and mobility brands",
    zh: "汽车与出行品牌",
    description: {
      en: "Lifestyle films, local production support and event-ready visual assets.",
      zh: "生活方式影片、本地制作支持与适用于活动发布的视觉资产。"
    }
  },
  {
    en: "Media, PR, MCN and advertising agencies",
    zh: "媒体、公关、MCN 与广告代理",
    description: {
      en: "A reliable UK production desk for agency teams serving Chinese clients.",
      zh: "为服务中国客户的代理团队提供稳定可靠的英国制作支持。"
    }
  }
] satisfies Array<Localized<string> & { description: Localized<string> }>;

export const caseStudies = [
  {
    category: { en: "Fashion campaign", zh: "时装广告" },
    title: { en: "London editorial shoot for a China launch", zh: "面向中国上市的伦敦编辑式拍摄" },
    text: {
      en: "A modular image and motion package designed for launch pages, paid social, showroom use and PR distribution.",
      zh: "为上市页面、广告投放、展厅展示与公关传播设计的图片与视频资产组合。"
    }
  },
  {
    category: { en: "Beauty product film", zh: "美妆产品影片" },
    title: {
      en: "Controlled light, refined styling, fast campaign edits",
      zh: "可控光线、精致造型与高效广告剪辑"
    },
    text: {
      en: "Product-led stills and short-form edits shaped around ingredient cues, texture and channel-specific ratios.",
      zh: "围绕成分卖点、质地表现与不同渠道比例制作产品静物与短视频剪辑。"
    }
  },
  {
    category: { en: "Technology story", zh: "科技品牌故事" },
    title: { en: "Human-facing assets for an AI product", zh: "为 AI 产品建立更有人感的传播资产" },
    text: {
      en: "Presenter-led video, clean product visuals and bilingual delivery support for a global-facing release.",
      zh: "结合出镜讲解、干净产品视觉与双语交付支持，服务面向海外的发布项目。"
    }
  }
];

export const talentCards = [
  {
    title: { en: "Models and actors", zh: "模特与演员" },
    text: {
      en: "Commercial, editorial and social-first talent matched to category, styling and usage needs.",
      zh: "根据品类、造型与使用范围匹配商业、编辑与社媒方向人才。"
    }
  },
  {
    title: { en: "Presenters and hosts", zh: "主持人与出镜讲解" },
    text: {
      en: "Bilingual on-camera talent for product demos, launch films, interviews and event coverage.",
      zh: "适用于产品演示、发布影片、访谈与活动记录的双语出镜人才。"
    }
  },
  {
    title: { en: "UK Chinese creators", zh: "英国华人创作者" },
    text: {
      en: "Creator coordination for campaigns that need UK location value and China-facing audience fluency.",
      zh: "为需要英国场景价值与中国受众理解的项目协调在英华人创作者。"
    }
  }
];

export const process = [
  {
    title: { en: "Clarify the brief", zh: "梳理项目需求" },
    text: {
      en: "We align campaign goals, required formats, usage rights, timeline, budget range and Chinese market expectations before production begins.",
      zh: "在制作前明确传播目标、内容规格、使用范围、时间节点、预算区间与中国市场传播语境。"
    }
  },
  {
    title: { en: "Build the UK production plan", zh: "搭建英国制作方案" },
    text: {
      en: "Locations, crew, models, creators, styling, permits, call sheets and bilingual communication routes are planned around the campaign.",
      zh: "围绕项目目标规划场地、团队、模特达人、造型、许可、通告与中英双语沟通路径。"
    }
  },
  {
    title: { en: "Produce and deliver assets", zh: "制作并交付传播素材" },
    text: {
      en: "We manage the shoot and shape final assets for brand approval, agency handoff, paid media, PR and social platform use.",
      zh: "执行拍摄并交付适用于品牌审核、代理交接、广告投放、公关传播与社媒发布的内容资产。"
    }
  }
];

export const proofStrip = [
  {
    value: { en: "UK", zh: "英国" },
    label: { en: "Local production network", zh: "本地制作网络" }
  },
  {
    value: { en: "CN/EN", zh: "中英" },
    label: { en: "Bilingual project control", zh: "双语项目管理" }
  },
  {
    value: { en: "360", zh: "全链路" },
    label: { en: "Creative, talent and delivery", zh: "创意、人才与交付" }
  }
];

export const contactForm = {
  en: {
    name: "Name",
    company: "Company / brand",
    email: "Email",
    project: "Project type",
    message: "Brief, timeline and production needs",
    submit: "Send brief"
  },
  zh: {
    name: "姓名",
    company: "公司 / 品牌",
    email: "邮箱",
    project: "项目类型",
    message: "需求、时间节点与制作内容",
    submit: "发送需求"
  }
} satisfies Localized<Record<string, string>>;

export const pageCopy = {
  services: {
    en: {
      eyebrow: "Services",
      title: "Production services that make UK content creation feel close.",
      intro:
        "A flexible production partner for brands and agencies that need polished assets, reliable talent and bilingual control."
    },
    zh: {
      eyebrow: "服务",
      title: "让英国内容制作变得清晰可控的服务体系。",
      intro: "为需要高质感素材、可靠人才与双语管理的品牌和代理公司提供灵活制作支持。"
    }
  },
  industries: {
    en: {
      eyebrow: "Industries",
      title: "Category fluency for brands with overseas ambition.",
      intro:
        "We support fashion, beauty, technology, automotive and agency teams that need UK-based assets with a China-facing sensibility."
    },
    zh: {
      eyebrow: "行业",
      title: "理解行业，也理解出海内容语境。",
      intro: "服务时尚、美妆、科技、汽车与代理团队，在英国制作兼具本地质感与中国传播语境的内容资产。"
    }
  },
  talent: {
    en: {
      eyebrow: "Talent & Creators",
      title: "Talent, creators and on-camera specialists.",
      intro:
        "From models and actors to bilingual presenters and UK-based Chinese creators, we source people who can carry the campaign."
    },
    zh: {
      eyebrow: "人才与创作者",
      title: "模特、演员、主持人与英国华人创作者。",
      intro: "从平面模特、演员到双语主持与在英华人达人，我们为项目匹配真正适合镜头与品牌的人。"
    }
  },
  work: {
    en: {
      eyebrow: "Work",
      title: "Work shaped for campaign use.",
      intro:
        "A curated portfolio area for commercial photography, brand film, social video, event coverage and creator-led content."
    },
    zh: {
      eyebrow: "案例作品",
      title: "为商业传播而制作的作品。",
      intro: "这里将展示商业摄影、品牌影片、社媒视频、活动记录与创作者内容等精选项目。"
    }
  },
  "for-agencies": {
    en: {
      eyebrow: "For Agencies",
      title: "A quiet production desk for agencies.",
      intro:
        "We help advertising, PR, media and MCN teams deliver UK shoots, local talent and creator projects without building a local office."
    },
    zh: {
      eyebrow: "代理合作",
      title: "为代理公司提供稳定的英国制作支持。",
      intro: "帮助广告、公关、媒体与 MCN 团队完成英国拍摄、本地人才协调与达人项目，无需自行搭建本地办公室。"
    }
  },
  about: {
    en: {
      eyebrow: "About",
      title: "A bridge between UK production craft and Chinese brand momentum.",
      intro:
        "FrameBridge Studio was built for teams that care about image quality, speed, cultural nuance and calm project communication."
    },
    zh: {
      eyebrow: "关于",
      title: "连接英国制作能力与中国品牌增长节奏。",
      intro: "镜桥创意服务重视影像质感、执行效率、文化语境与项目沟通稳定性的团队。"
    }
  },
  contact: {
    en: {
      eyebrow: "Contact",
      title: "Tell us what you need to create in the UK.",
      intro:
        "Share your timeline, market, content formats, talent needs and any reference direction. We will shape a practical production route."
    },
    zh: {
      eyebrow: "联系",
      title: "告诉我们你希望在英国完成什么内容。",
      intro: "请提供时间节点、目标市场、内容形式、人才需求与参考方向，我们会协助梳理可执行的制作路径。"
    }
  }
} satisfies Record<string, Localized<{ eyebrow: string; title: string; intro: string }>>;

export const aboutPoints = {
  en: ["UK production network", "Chinese brand context", "Commercial content discipline"],
  zh: ["英国本地制作网络", "中国品牌语境理解", "商业内容执行标准"]
} satisfies Localized<string[]>;

export const servicesPage = {
  en: {
    eyebrow: "Services",
    title: "From brief to campaign-ready content.",
    intro:
      "We bring together creative planning, production, talent, styling, photography, video and local execution in the UK.",
    labels: {
      usefulFor: "Useful for",
      deliverables: "Deliverables",
      industries: "Related industries",
      caseStudy: "Related case study",
      cta: "Plan this service",
      packagesEyebrow: "Packages",
      packagesTitle: "Production shapes built around the job.",
      packagesIntro:
        "No fixed public pricing. Each package is scoped around schedule, format, crew, talent, usage and delivery requirements.",
      finalTitle: "Send us your brief and we’ll build the right production plan.",
      finalCta: "Send Brief"
    },
    services: [
      {
        name: "Creative Production",
        explanation:
          "A joined-up production layer for brand campaigns, product launches, storytelling and social content.",
        usefulFor: ["Brand campaigns", "Product launches", "Storytelling", "Social content"],
        deliverables: [
          "Creative route",
          "Production plan",
          "Crew and schedule",
          "Location and shoot management"
        ],
        industries: ["Fashion", "Beauty", "Technology", "Automotive", "Agencies"],
        caseStudy: "Fashion Campaign Production"
      },
      {
        name: "Commercial Photography",
        explanation:
          "Premium stills for campaign visuals, lookbooks, product lifestyle images, e-commerce and PR assets.",
        usefulFor: ["Campaign visuals", "Lookbooks", "Product lifestyle", "E-commerce", "PR assets"],
        deliverables: ["Shot list", "Art direction", "Retouched stills", "Channel-ready exports"],
        industries: ["Fashion", "Jewellery", "Beauty", "Lifestyle", "E-commerce"],
        caseStudy: "London editorial shoot for a China launch"
      },
      {
        name: "Video & Brand Films",
        explanation:
          "Film and motion content for product explainers, founder videos, brand films, event videos and social edits.",
        usefulFor: ["Product explainers", "Founder videos", "Brand films", "Event videos", "Social edits"],
        deliverables: ["Script or treatment", "Production crew", "Edited hero film", "Short cutdowns"],
        industries: ["AI", "Technology", "Beauty", "Automotive", "Education"],
        caseStudy: "AI Product Video for UK Market"
      },
      {
        name: "Short-form Video & Short Drama",
        explanation:
          "Fast, story-led content for TikTok, Douyin, Xiaohongshu, Instagram Reels, product placement and brand narratives.",
        usefulFor: ["TikTok", "Douyin", "Xiaohongshu", "Instagram Reels", "Product placement"],
        deliverables: ["Concept hooks", "Episode plan", "Cast and crew", "Vertical edits"],
        industries: ["Beauty", "Fashion", "Entertainment", "Consumer tech", "Lifestyle"],
        caseStudy: "Short Drama & Brand Storytelling"
      },
      {
        name: "Model, Actor & Presenter Casting",
        explanation:
          "Casting support for fashion shoots, automotive explainers, beauty campaigns, AI demos and event hosting.",
        usefulFor: [
          "Fashion shoots",
          "Automotive explainers",
          "Beauty campaigns",
          "AI product demos",
          "Event hosting"
        ],
        deliverables: ["Talent shortlist", "Usage guidance", "Booking coordination", "On-set talent support"],
        industries: ["Fashion", "Automotive", "Beauty", "AI", "Events"],
        caseStudy: "Presenter-led AI product video"
      },
      {
        name: "Creator & Influencer Coordination",
        explanation:
          "Coordination for UK-based Chinese creators, local creators and social-first campaign assets.",
        usefulFor: ["Creator seeding", "Social-first assets", "Launch awareness", "UK location value"],
        deliverables: ["Creator shortlist", "Briefing notes", "Content coordination", "Usage-ready assets"],
        industries: ["Beauty", "Lifestyle", "Food & Beverage", "Education", "E-commerce"],
        caseStudy: "Creator-led Campaign"
      },
      {
        name: "On-camera Makeup & Styling",
        explanation:
          "Camera-ready makeup, wardrobe, product styling and image direction for commercial shoots and events.",
        usefulFor: ["Commercial shoots", "Campaign visuals", "Artists", "Presenters", "Models", "Events"],
        deliverables: ["Makeup plan", "Wardrobe styling", "Product styling", "On-set touch-ups"],
        industries: ["Fashion", "Beauty", "Entertainment", "Jewellery", "Events"],
        caseStudy: "Beauty product film"
      },
      {
        name: "Event, PR & Exhibition Coverage",
        explanation:
          "Photo and video content for launches, dinners, trade shows, concerts, brand activations and press moments.",
        usefulFor: ["Launches", "Dinners", "Trade shows", "Concerts", "Brand activations", "Press moments"],
        deliverables: ["Event photography", "Highlight clips", "PR selects", "Fast social edits"],
        industries: ["PR", "Entertainment", "Automotive", "Fashion", "Lifestyle"],
        caseStudy: "London Celebrity Event Coverage"
      },
      {
        name: "UK Production Consulting",
        explanation:
          "Local guidance for Chinese brands navigating content strategy, logistics, casting, locations and execution in the UK.",
        usefulFor: [
          "Local strategy",
          "Production feasibility",
          "Casting guidance",
          "Location planning",
          "Execution support"
        ],
        deliverables: [
          "Production route",
          "Budget guidance",
          "Local resource map",
          "Risk and logistics notes"
        ],
        industries: ["Chinese brands", "Agencies", "Technology", "Consumer goods", "E-commerce"],
        caseStudy: "UK Launch Production"
      }
    ],
    packages: [
      "Brand Campaign Day",
      "Product Content Sprint",
      "Event Content Coverage",
      "Creator Campaign Package",
      "UK Launch Production",
      "Short Drama Production"
    ]
  },
  zh: {
    eyebrow: "服务",
    title: "从项目需求到可投放的海外内容资产。",
    intro: "我们整合策划、制作、模特达人、妆造造型、摄影摄像与英国本地执行，帮助品牌高效完成商业内容交付。",
    labels: {
      usefulFor: "适用于",
      deliverables: "交付内容",
      industries: "相关行业",
      caseStudy: "相关案例",
      cta: "规划此服务",
      packagesEyebrow: "服务组合",
      packagesTitle: "根据项目目标搭建制作组合。",
      packagesIntro:
        "不展示固定公开价格。每个组合都会根据时间、内容形式、团队、人才、使用范围与交付要求进行定制。",
      finalTitle: "把项目需求发给我们，我们会为你搭建合适的制作方案。",
      finalCta: "提交需求"
    },
    services: [
      {
        name: "创意制作",
        explanation: "为品牌广告、新品上市、品牌故事与社媒内容提供完整的英国本地制作统筹。",
        usefulFor: ["品牌广告", "新品上市", "品牌故事", "社媒内容"],
        deliverables: ["创意方向", "制作方案", "团队与日程", "场地与现场管理"],
        industries: ["时尚", "美妆", "科技", "汽车", "代理公司"],
        caseStudy: "时尚品牌广告制作"
      },
      {
        name: "商业摄影",
        explanation: "为广告视觉、画册、产品生活方式图、电商与公关素材制作高质感图片资产。",
        usefulFor: ["广告视觉", "品牌画册", "产品生活方式", "电商素材", "公关图片"],
        deliverables: ["拍摄清单", "视觉指导", "精修图片", "渠道适配导出"],
        industries: ["时尚", "珠宝", "美妆", "生活方式", "电商"],
        caseStudy: "面向中国上市的伦敦编辑式拍摄"
      },
      {
        name: "视频与品牌影片",
        explanation: "制作产品讲解、创始人视频、品牌影片、活动视频与社媒剪辑。",
        usefulFor: ["产品讲解", "创始人视频", "品牌影片", "活动视频", "社媒剪辑"],
        deliverables: ["脚本或方案", "拍摄团队", "主视频成片", "短版剪辑"],
        industries: ["AI", "科技", "美妆", "汽车", "教育"],
        caseStudy: "面向英国市场的 AI 产品视频"
      },
      {
        name: "短视频与短剧制作",
        explanation: "面向 TikTok、抖音、小红书、Instagram Reels、产品植入与剧情化品牌内容的短内容制作。",
        usefulFor: ["TikTok", "抖音", "小红书", "Instagram Reels", "产品植入"],
        deliverables: ["内容钩子", "分集方案", "演员与团队", "竖屏剪辑"],
        industries: ["美妆", "时尚", "娱乐", "消费科技", "生活方式"],
        caseStudy: "短剧与品牌故事"
      },
      {
        name: "模特、演员与主持人选角",
        explanation: "支持时尚拍摄、汽车讲解、美妆广告、AI 产品演示与活动主持的人才匹配。",
        usefulFor: ["时尚拍摄", "汽车讲解", "美妆广告", "AI 产品演示", "活动主持"],
        deliverables: ["人才 shortlist", "使用范围建议", "预订协调", "现场人才支持"],
        industries: ["时尚", "汽车", "美妆", "AI", "活动"],
        caseStudy: "AI 产品出镜讲解视频"
      },
      {
        name: "创作者与达人协调",
        explanation: "协调英国华人创作者、本地创作者与适合社媒传播的内容资产。",
        usefulFor: ["达人种草", "社媒内容", "上市声量", "英国场景价值"],
        deliverables: ["达人名单", "沟通 brief", "内容协调", "可使用素材"],
        industries: ["美妆", "生活方式", "食品饮品", "教育", "电商"],
        caseStudy: "达人共创广告"
      },
      {
        name: "镜头妆造与造型",
        explanation: "为商业拍摄、广告视觉、艺人、主持人、模特与活动提供镜头妆造、服装和产品造型。",
        usefulFor: ["商业拍摄", "广告视觉", "艺人", "主持人", "模特", "活动"],
        deliverables: ["妆造方案", "服装造型", "产品陈列", "现场补妆与调整"],
        industries: ["时尚", "美妆", "娱乐", "珠宝", "活动"],
        caseStudy: "美妆产品影片"
      },
      {
        name: "活动、公关与展会记录",
        explanation: "为发布会、晚宴、展会、演出、品牌快闪与媒体现场提供图片和视频内容记录。",
        usefulFor: ["发布会", "晚宴", "展会", "演出", "品牌快闪", "媒体现场"],
        deliverables: ["活动摄影", "高光视频", "公关精选图", "快速社媒剪辑"],
        industries: ["公关", "娱乐", "汽车", "时尚", "生活方式"],
        caseStudy: "伦敦明星活动内容记录"
      },
      {
        name: "英国本地制作咨询",
        explanation: "为需要英国本地内容策略、物流、选角、场地与执行指导的中国品牌提供制作咨询。",
        usefulFor: ["本地策略", "制作可行性", "选角建议", "场地规划", "执行支持"],
        deliverables: ["制作路径", "预算建议", "本地资源图谱", "风险与物流提示"],
        industries: ["中国品牌", "代理公司", "科技", "消费品", "电商"],
        caseStudy: "英国上市制作支持"
      }
    ],
    packages: ["品牌广告拍摄日", "产品内容冲刺", "活动内容记录", "达人广告组合", "英国上市制作", "短剧制作"]
  }
} satisfies Localized<{
  eyebrow: string;
  title: string;
  intro: string;
  labels: Record<string, string>;
  services: Array<{
    name: string;
    explanation: string;
    usefulFor: string[];
    deliverables: string[];
    industries: string[];
    caseStudy: string;
  }>;
  packages: string[];
}>;

export const industriesPage = {
  en: {
    eyebrow: "Industries",
    title: "Content production shaped around your industry.",
    intro:
      "Different categories need different proof, formats and production rhythms. We help Chinese brands build UK content assets that fit the way their buyers, agencies and overseas audiences make decisions.",
    labels: {
      insight: "Industry insight",
      needs: "What brands usually need",
      delivers: "What FrameBridge delivers",
      examples: "Example deliverables",
      services: "Related services",
      cta: "Discuss this industry"
    },
    industries: [
      {
        name: "Fashion",
        insight:
          "Fashion brands need a visual world that feels current in London while still working for Chinese e-commerce, social and campaign channels.",
        needs: [
          "Lookbook",
          "Campaign visuals",
          "Model try-on content",
          "Street style",
          "London editorial shoots",
          "Short-form social videos"
        ],
        delivers:
          "We combine casting, styling, locations, art direction, photography and motion to produce assets that can move from campaign launch to social proof.",
        examples: [
          "Editorial stills",
          "Model try-on reels",
          "Street-style sets",
          "Lookbook selects",
          "Paid social crops"
        ],
        relatedServices: [
          "Creative Production",
          "Commercial Photography",
          "Talent Casting",
          "Makeup & Styling"
        ]
      },
      {
        name: "Jewellery & Accessories",
        insight:
          "Luxury accessories depend on close detail, believable wearing moments and a restrained sense of lifestyle.",
        needs: [
          "Editorial model images",
          "Wearing shots",
          "Product close-ups",
          "Luxury lifestyle scenes",
          "Detail-focused photography",
          "Short visual stories"
        ],
        delivers:
          "We build controlled image environments with model casting, product handling, styling and precise stills or short motion assets.",
        examples: [
          "Macro detail images",
          "Model wearing sets",
          "Lifestyle stills",
          "Short product story",
          "PR image selects"
        ],
        relatedServices: ["Commercial Photography", "Video & Brand Films", "On-camera Makeup & Styling"]
      },
      {
        name: "Beauty & Skincare",
        insight:
          "Beauty content has to prove texture, finish, credibility and social relevance across multiple platforms.",
        needs: [
          "Makeup looks",
          "Before-after content",
          "Product trials",
          "Creator videos",
          "Model skin and beauty visuals",
          "Xiaohongshu, Douyin, TikTok and Instagram content"
        ],
        delivers:
          "We coordinate models, makeup artists, creators, product styling and fast social formats for campaign and platform-specific use.",
        examples: [
          "Beauty stills",
          "Routine videos",
          "Creator-led trials",
          "Before-after assets",
          "Vertical short edits"
        ],
        relatedServices: [
          "Creator Coordination",
          "Makeup & Styling",
          "Commercial Photography",
          "Short-form Video"
        ]
      },
      {
        name: "AI & Technology",
        insight:
          "Technology brands need content that makes abstract products feel clear, useful and credible to buyers and stakeholders.",
        needs: [
          "Product demo videos",
          "Founder interviews",
          "Office and user scenarios",
          "B2B explainers",
          "Event coverage",
          "LinkedIn and website content"
        ],
        delivers:
          "We create presenter-led, founder-led and product-led assets with clean visuals, bilingual coordination and UK-context production support.",
        examples: [
          "Demo film",
          "Founder interview",
          "Website hero video",
          "LinkedIn cuts",
          "Event highlight clips"
        ],
        relatedServices: ["Video & Brand Films", "Presenter Casting", "UK Production Consulting"]
      },
      {
        name: "Automotive",
        insight:
          "Automotive content needs confidence, clear product explanation and a sense of place, whether for launches, showrooms or events.",
        needs: [
          "Presenter-led car videos",
          "Product walkaround",
          "Event and exhibition coverage",
          "Lifestyle driving visuals",
          "Creator attendance",
          "Brand launch assets"
        ],
        delivers:
          "We coordinate presenters, creators, locations, event coverage and polished photo-video capture for UK-facing automotive moments.",
        examples: [
          "Walkaround video",
          "Launch event content",
          "Lifestyle stills",
          "Creator attendance clips",
          "Exhibition coverage"
        ],
        relatedServices: ["Video & Brand Films", "Talent Casting", "Event & PR Coverage"]
      },
      {
        name: "Lifestyle & Consumer Products",
        insight:
          "Consumer products need believable usage scenes that show how the product fits into everyday UK life.",
        needs: [
          "Product lifestyle imagery",
          "Social media content",
          "User scenario videos",
          "Creator-led content",
          "UK location-based visual assets"
        ],
        delivers:
          "We produce location-based image and video sets with models, creators and product styling that feel natural, premium and useful across channels.",
        examples: [
          "Lifestyle image sets",
          "Usage videos",
          "Creator posts",
          "Retail crops",
          "Product-in-location assets"
        ],
        relatedServices: ["Creative Production", "Commercial Photography", "Creator Coordination"]
      },
      {
        name: "Media, Advertising & PR Agencies",
        insight:
          "Agency teams need a UK partner that can move quickly, communicate clearly and protect the creative standard on the ground.",
        needs: [
          "Reliable UK execution partner",
          "Local talent and crew",
          "Styling and makeup",
          "Event coverage",
          "Fast content delivery",
          "Bilingual production coordination"
        ],
        delivers:
          "We operate as a quiet local production desk for agency teams, handling UK execution, talent, crew, styling, content capture and bilingual updates.",
        examples: [
          "Local crew sourcing",
          "Talent shortlist",
          "Event same-day selects",
          "Bilingual production notes",
          "Agency handoff assets"
        ],
        relatedServices: [
          "UK Production Consulting",
          "Event & PR Coverage",
          "Talent Casting",
          "Creative Production"
        ]
      }
    ]
  },
  zh: {
    eyebrow: "行业",
    title: "围绕不同行业需求打造英国本地商业内容。",
    intro:
      "不同品类需要不同的信任表达、内容形式与制作节奏。我们帮助中国品牌在英国建立适合海外传播、代理交付和商业转化的内容资产。",
    labels: {
      insight: "行业洞察",
      needs: "品牌通常需要",
      delivers: "镜桥创意交付",
      examples: "示例交付物",
      services: "相关服务",
      cta: "咨询此行业方案"
    },
    industries: [
      {
        name: "时尚",
        insight: "时尚品牌需要在伦敦语境中建立当代感，同时兼顾中国电商、社媒与广告渠道的使用需求。",
        needs: ["Lookbook", "广告视觉", "模特试穿内容", "街拍风格", "伦敦编辑式拍摄", "短视频社媒内容"],
        delivers: "我们整合选角、造型、场地、视觉指导、摄影与动态内容，帮助素材从广告上线延展到社媒种草。",
        examples: ["编辑式图片", "模特试穿短视频", "街拍视觉组", "画册精选图", "广告投放裁切"],
        relatedServices: ["创意制作", "商业摄影", "人才选角", "妆造与造型"]
      },
      {
        name: "珠宝与配饰",
        insight: "高端配饰内容依赖细节质感、可信的佩戴场景和克制的生活方式表达。",
        needs: ["模特编辑图", "佩戴图", "产品特写", "高级生活方式场景", "细节摄影", "短视觉故事"],
        delivers: "我们搭建可控拍摄环境，协调模特、产品 handling、造型与精细静物或短动态素材。",
        examples: ["微距细节图", "模特佩戴组图", "生活方式静物", "短产品故事", "公关精选图"],
        relatedServices: ["商业摄影", "视频与品牌影片", "镜头妆造与造型"]
      },
      {
        name: "美妆护肤",
        insight: "美妆内容需要证明质地、妆效、可信度与平台适配能力。",
        needs: [
          "妆容视觉",
          "前后对比内容",
          "产品试用",
          "达人视频",
          "模特皮肤与美妆视觉",
          "小红书、抖音、TikTok 与 Instagram 内容"
        ],
        delivers: "我们协调模特、化妆师、创作者、产品造型与短视频流程，为广告与平台内容提供素材。",
        examples: ["美妆静态图", "护肤流程视频", "达人试用内容", "前后对比素材", "竖屏短视频"],
        relatedServices: ["创作者协调", "妆造与造型", "商业摄影", "短视频制作"]
      },
      {
        name: "AI 与科技",
        insight: "科技品牌需要把抽象产品讲清楚，让买家、用户和内部团队都能快速理解其价值。",
        needs: [
          "产品演示视频",
          "创始人访谈",
          "办公室与用户场景",
          "B2B 讲解",
          "活动记录",
          "LinkedIn 与官网内容"
        ],
        delivers: "我们制作出镜讲解、创始人访谈与产品演示内容，并提供清晰视觉与中英双语制作协调。",
        examples: ["产品演示影片", "创始人访谈", "官网主视觉视频", "LinkedIn 短版", "活动高光视频"],
        relatedServices: ["视频与品牌影片", "主持人选角", "英国制作咨询"]
      },
      {
        name: "汽车",
        insight: "汽车内容需要清晰讲解、品牌信心和场景感，适用于上市、展会、试驾与传播节点。",
        needs: [
          "主持人讲车视频",
          "产品 walkaround",
          "活动与展会记录",
          "生活方式驾驶视觉",
          "达人出席",
          "品牌上市素材"
        ],
        delivers: "我们协调主持人、创作者、场地、活动记录与高质感影像团队，支持英国本地汽车传播场景。",
        examples: ["讲车视频", "上市活动内容", "生活方式图片", "达人出席短片", "展会记录"],
        relatedServices: ["视频与品牌影片", "人才选角", "活动与公关记录"]
      },
      {
        name: "生活方式与消费品",
        insight: "消费品内容需要可信的使用场景，让产品自然进入英国本地生活方式。",
        needs: ["产品生活方式图片", "社媒内容", "用户场景视频", "达人共创内容", "英国场景视觉资产"],
        delivers: "我们通过本地场地、模特、创作者与产品造型，制作自然、高级且可用于多渠道的图片和视频素材。",
        examples: ["生活方式组图", "使用场景视频", "达人内容", "零售渠道裁切", "产品场景图"],
        relatedServices: ["创意制作", "商业摄影", "创作者协调"]
      },
      {
        name: "媒体、广告与公关代理",
        insight: "代理团队需要一个可靠的英国本地执行伙伴，既能快速响应，也能守住创意与交付标准。",
        needs: [
          "可靠英国执行伙伴",
          "本地人才与团队",
          "造型与妆造",
          "活动记录",
          "快速内容交付",
          "中英双语制作协调"
        ],
        delivers: "我们作为代理团队的英国本地制作台，处理执行、人才、团队、造型、内容采集与双语进度沟通。",
        examples: ["本地团队协调", "人才 shortlist", "活动当日精选", "双语制作记录", "代理交付素材"],
        relatedServices: ["英国制作咨询", "活动与公关记录", "人才选角", "创意制作"]
      }
    ]
  }
} satisfies Localized<{
  eyebrow: string;
  title: string;
  intro: string;
  labels: Record<string, string>;
  industries: Array<{
    name: string;
    insight: string;
    needs: string[];
    delivers: string;
    examples: string[];
    relatedServices: string[];
  }>;
}>;

export const talentPage = {
  en: {
    eyebrow: "Talent & Creators",
    title: "Local talent, creators and production resources in the UK.",
    intro: "We help brands build the right team for each shoot, campaign, event or video production.",
    privateNote:
      "We do not publish private talent names, contact details or personal information. A relevant shortlist is shared after a project brief.",
    labels: {
      suitableFor: "Suitable for",
      useCases: "Example use cases",
      industries: "Related industries",
      cta: "Request Talent Options",
      processEyebrow: "How talent matching works",
      processTitle: "A discreet process for finding the right people.",
      disclaimerTitle: "Professional note"
    },
    categories: [
      {
        name: "British Models",
        suitableFor: "Campaign imagery, lifestyle shoots and brand content that needs a UK-facing look.",
        useCases: [
          "Fashion lookbooks",
          "Lifestyle product shoots",
          "Automotive content",
          "Brand launch visuals"
        ],
        industries: ["Fashion", "Lifestyle", "Automotive", "Jewellery"]
      },
      {
        name: "Asian & Chinese Models",
        suitableFor:
          "China-facing campaigns that need culturally relevant faces and clear on-camera communication.",
        useCases: ["Beauty campaigns", "E-commerce content", "Try-on videos", "Editorial shoots"],
        industries: ["Beauty", "Fashion", "Jewellery", "Consumer products"]
      },
      {
        name: "UK-based Chinese Creators",
        suitableFor:
          "Social-first campaigns that need UK context, Chinese-language fluency and audience trust.",
        useCases: [
          "Xiaohongshu content",
          "Douyin/TikTok videos",
          "Launch seeding",
          "Creator-led product trials"
        ],
        industries: ["Beauty", "Lifestyle", "Education", "E-commerce"]
      },
      {
        name: "Actors for Commercials and Short Drama",
        suitableFor: "Scripted brand stories, product placement and short-form narrative content.",
        useCases: ["Short drama", "Commercial scripts", "Social storytelling", "Brand characters"],
        industries: ["Entertainment", "Beauty", "Consumer tech", "Lifestyle"]
      },
      {
        name: "Presenters and Event Hosts",
        suitableFor:
          "Product explainers, automotive walkarounds, launch events, interviews and bilingual hosting.",
        useCases: ["AI product demos", "Car videos", "Event hosting", "Founder interviews"],
        industries: ["AI & Technology", "Automotive", "Education", "Events"]
      },
      {
        name: "Makeup Artists",
        suitableFor: "Camera-ready makeup for models, presenters, artists, beauty campaigns and live events.",
        useCases: ["Beauty looks", "Presenter makeup", "Event touch-ups", "Campaign shoots"],
        industries: ["Beauty", "Fashion", "Entertainment", "Events"]
      },
      {
        name: "Hair Stylists and Fashion Stylists",
        suitableFor: "Wardrobe, hair, styling direction and on-set refinement for campaign-level visuals.",
        useCases: ["Fashion editorials", "Lookbooks", "Presenter wardrobe", "Product styling"],
        industries: ["Fashion", "Jewellery", "Beauty", "Lifestyle"]
      },
      {
        name: "Photographers and Videographers",
        suitableFor:
          "Specialist image and video capture across campaigns, events, products and social content.",
        useCases: ["Campaign stills", "Event coverage", "Product videos", "Short-form social edits"],
        industries: ["Fashion", "PR", "Technology", "Consumer products"]
      },
      {
        name: "Directors, Producers and Editors",
        suitableFor:
          "Higher-complexity productions that need creative direction, coordination and post-production control.",
        useCases: ["Brand films", "Short drama", "Launch videos", "Multi-location productions"],
        industries: ["Technology", "Automotive", "Entertainment", "Agencies"]
      }
    ],
    process: [
      "Understand brand and audience",
      "Define visual direction",
      "Shortlist suitable profiles",
      "Confirm availability and usage scope",
      "Coordinate shoot and delivery"
    ],
    disclaimer:
      "Talent availability, rates and usage rights vary by project. We provide curated options after reviewing the brief."
  },
  zh: {
    eyebrow: "人才与创作者",
    title: "英国本地模特、达人与内容制作资源。",
    intro: "我们根据品牌项目需求，匹配适合的模特、演员、主持人、达人、妆造师、摄影摄像与制作团队。",
    privateNote: "我们不会公开真实人才姓名、联系方式或私人信息。具体人选资料会在了解项目需求后定向提供。",
    labels: {
      suitableFor: "适合",
      useCases: "示例用途",
      industries: "相关行业",
      cta: "索取人才方案",
      processEyebrow: "人才匹配流程",
      processTitle: "以保密、专业的方式匹配合适团队。",
      disclaimerTitle: "专业说明"
    },
    categories: [
      {
        name: "英国本地模特",
        suitableFor: "适合需要英国本地气质、生活方式场景和品牌视觉可信度的广告内容。",
        useCases: ["时尚画册", "生活方式产品拍摄", "汽车内容", "品牌上市视觉"],
        industries: ["时尚", "生活方式", "汽车", "珠宝"]
      },
      {
        name: "亚洲与华人模特",
        suitableFor: "适合面向中国市场、需要文化相关性与清晰镜头表达的品牌项目。",
        useCases: ["美妆广告", "电商内容", "试穿视频", "编辑式拍摄"],
        industries: ["美妆", "时尚", "珠宝", "消费品"]
      },
      {
        name: "英国华人创作者",
        suitableFor: "适合需要英国生活场景、中文表达能力与中国受众信任感的社媒项目。",
        useCases: ["小红书内容", "抖音/TikTok 视频", "新品种草", "达人试用"],
        industries: ["美妆", "生活方式", "教育", "电商"]
      },
      {
        name: "广告与短剧演员",
        suitableFor: "适合剧情化品牌故事、产品植入与短视频叙事内容。",
        useCases: ["短剧", "广告脚本", "社媒剧情", "品牌角色"],
        industries: ["娱乐", "美妆", "消费科技", "生活方式"]
      },
      {
        name: "主持人与活动司仪",
        suitableFor: "适合产品讲解、汽车 walkaround、发布活动、访谈与双语主持。",
        useCases: ["AI 产品演示", "讲车视频", "活动主持", "创始人访谈"],
        industries: ["AI 与科技", "汽车", "教育", "活动"]
      },
      {
        name: "化妆师",
        suitableFor: "适合模特、主持人、艺人、美妆广告与活动现场的镜头妆造。",
        useCases: ["美妆造型", "主持人妆容", "活动补妆", "广告拍摄"],
        industries: ["美妆", "时尚", "娱乐", "活动"]
      },
      {
        name: "发型师与时尚造型师",
        suitableFor: "适合广告级视觉中的服装、发型、整体造型方向与现场细节把控。",
        useCases: ["时尚编辑片", "品牌画册", "主持人服装", "产品造型"],
        industries: ["时尚", "珠宝", "美妆", "生活方式"]
      },
      {
        name: "摄影师与摄像师",
        suitableFor: "适合广告、活动、产品与社媒内容中的专业图片和视频采集。",
        useCases: ["广告图片", "活动记录", "产品视频", "社媒短内容"],
        industries: ["时尚", "公关", "科技", "消费品"]
      },
      {
        name: "导演、制片与剪辑",
        suitableFor: "适合更复杂的项目，需要创意方向、制作协调与后期把控。",
        useCases: ["品牌影片", "短剧", "上市视频", "多场地制作"],
        industries: ["科技", "汽车", "娱乐", "代理公司"]
      }
    ],
    process: [
      "理解品牌与目标受众",
      "明确视觉方向",
      "筛选合适人选资料",
      "确认档期与使用范围",
      "协调拍摄与交付"
    ],
    disclaimer: "具体人选、档期、报价和肖像使用范围会根据项目需求确认。我们会在了解项目后提供匹配方案。"
  }
} satisfies Localized<{
  eyebrow: string;
  title: string;
  intro: string;
  privateNote: string;
  labels: Record<string, string>;
  categories: Array<{
    name: string;
    suitableFor: string;
    useCases: string[];
    industries: string[];
  }>;
  process: string[];
  disclaimer: string;
}>;

export const workPage = {
  en: {
    eyebrow: "Work / Case Studies",
    title: "Selected work across campaigns, events, products and talent-led content.",
    intro:
      "Structured examples of how FrameBridge Studio supports Chinese brands and agencies with UK-based creative production.",
    confidentialNote: "Some client names are kept confidential due to project agreements.",
    filters: [
      "All",
      "Fashion",
      "Beauty",
      "Technology",
      "Automotive",
      "Events",
      "Creator Campaigns",
      "Short Drama",
      "Product Content"
    ],
    labels: {
      industry: "Industry",
      challenge: "Challenge",
      delivered: "Delivered",
      viewCase: "View case",
      overview: "Overview",
      clientNeed: "Client need",
      ourRole: "Our role",
      productionScope: "Production scope",
      deliverables: "Deliverables",
      visualDirection: "Visual direction",
      relatedServices: "Related services",
      cta: "Plan a similar project",
      back: "Back to work"
    },
    cases: [
      {
        slug: "london-celebrity-event-coverage",
        title: "London Celebrity Event Coverage",
        industry: "Entertainment / Event",
        filters: ["Events"],
        challenge:
          "A live entertainment project needed polished visual coverage and social-ready assets in London.",
        delivered: "Event photography, backstage content, highlight visuals, social media assets.",
        overview:
          "A fast-moving London event required premium coverage that could serve PR, social and stakeholder reporting without disrupting the live environment.",
        clientNeed:
          "The team needed a discreet local production partner able to capture talent moments, atmosphere, backstage detail and audience-facing highlights.",
        ourRole:
          "FrameBridge coordinated event content capture, shot priorities, backstage access needs and delivery formats for social and PR use.",
        productionScope: [
          "Pre-event shot planning",
          "Event photography",
          "Backstage content",
          "Highlight visual capture",
          "Social-ready asset selection"
        ],
        deliverables: [
          "Edited event photo selects",
          "Backstage content set",
          "Highlight visuals",
          "Social media crops"
        ],
        visualDirection:
          "Cinematic event reportage with polished lighting, clean composition and a sense of occasion.",
        relatedServices: ["Event & PR Coverage", "Commercial Photography", "Video & Brand Films"]
      },
      {
        slug: "fashion-campaign-production-london",
        title: "Fashion Campaign Production in London",
        industry: "Fashion",
        filters: ["Fashion"],
        challenge: "A Chinese fashion brand needed overseas campaign visuals with UK-based models.",
        delivered:
          "Model casting, styling, makeup, photography, short-form video and London location production.",
        overview:
          "A fashion campaign was built around London location value, editorial styling and a modular asset set for launch, social and retail use.",
        clientNeed:
          "The brand needed UK-based faces, styling control, location planning and a production rhythm that could serve multiple channels.",
        ourRole:
          "FrameBridge managed model casting, styling coordination, shoot planning, crew and campaign asset delivery.",
        productionScope: [
          "Creative production",
          "Model casting",
          "Wardrobe and makeup",
          "London location planning",
          "Photography and short-form capture"
        ],
        deliverables: ["Campaign stills", "Lookbook selects", "Short-form video cuts", "Social crops"],
        visualDirection:
          "Premium London editorial with confident styling, clean movement and refined brand presence.",
        relatedServices: [
          "Creative Production",
          "Commercial Photography",
          "Talent Casting",
          "Makeup & Styling"
        ]
      },
      {
        slug: "ai-product-video-uk-market",
        title: "AI Product Video for UK Market",
        industry: "AI / Technology",
        filters: ["Technology", "Product Content"],
        challenge: "A technology product needed English-facing demo content and overseas usage scenarios.",
        delivered:
          "Presenter-led product video, user scenario footage, office-style visuals and social edits.",
        overview:
          "A technology product needed to become easier to understand for international users, partners and internal stakeholders.",
        clientNeed:
          "The team needed clear English-facing content, credible usage environments and short assets for website and social deployment.",
        ourRole:
          "FrameBridge coordinated presenter casting, office-style scenarios, product demo capture and bilingual production management.",
        productionScope: [
          "Presenter casting",
          "Demo planning",
          "Office and user scenarios",
          "Video production",
          "Social cutdowns"
        ],
        deliverables: [
          "Presenter-led product video",
          "Scenario footage",
          "Website video assets",
          "Short social edits"
        ],
        visualDirection:
          "Clean, intelligent and human-facing, with restrained technology cues and practical product clarity.",
        relatedServices: ["Video & Brand Films", "Presenter Casting", "UK Production Consulting"]
      },
      {
        slug: "beauty-creator-content-sprint",
        title: "Beauty Creator Content Sprint",
        industry: "Beauty",
        filters: ["Beauty", "Creator Campaigns"],
        challenge: "A beauty brand needed authentic social content with UK-based Chinese creators.",
        delivered: "Creator coordination, makeup looks, product trial videos and vertical social assets.",
        overview:
          "A beauty content sprint focused on credible creator-led product use, platform-native rhythm and fast vertical delivery.",
        clientNeed:
          "The brand needed UK-based Chinese creators who could demonstrate product texture, routine and results for social platforms.",
        ourRole:
          "FrameBridge shortlisted creators, coordinated makeup looks, production support and content delivery formats.",
        productionScope: [
          "Creator shortlist",
          "Product trial setup",
          "Makeup direction",
          "Vertical video capture",
          "Social asset coordination"
        ],
        deliverables: [
          "Creator trial videos",
          "Makeup look clips",
          "Vertical edits",
          "Product social assets"
        ],
        visualDirection:
          "Authentic, bright and platform-native while keeping the finish premium and brand-safe.",
        relatedServices: ["Creator Coordination", "Makeup & Styling", "Short-form Video"]
      },
      {
        slug: "automotive-event-presenter-support",
        title: "Automotive Event Presenter Support",
        industry: "Automotive",
        filters: ["Automotive", "Events"],
        challenge: "A car brand needed on-camera talent and event content support for a UK activation.",
        delivered: "Presenter shortlist, event coverage, short-form clips and product walkaround content.",
        overview:
          "An automotive activation required confident on-camera explanation, local event capture and fast content for post-event communication.",
        clientNeed:
          "The team needed presenter options, product walkaround support and content coverage that could work for both social and internal recap.",
        ourRole:
          "FrameBridge supported presenter sourcing, shoot flow, on-site capture priorities and short-form delivery.",
        productionScope: [
          "Presenter shortlist",
          "Event capture",
          "Walkaround planning",
          "Short-form video capture",
          "Asset handoff"
        ],
        deliverables: ["Presenter options", "Walkaround clips", "Event coverage", "Short-form edits"],
        visualDirection: "Confident, clear and premium, balancing product detail with event energy.",
        relatedServices: ["Talent Casting", "Event & PR Coverage", "Video & Brand Films"]
      },
      {
        slug: "jewellery-editorial-shoot",
        title: "Jewellery Editorial Shoot",
        industry: "Jewellery & Accessories",
        filters: ["Product Content", "Fashion"],
        challenge: "A jewellery brand needed premium overseas visual assets with model wearing shots.",
        delivered: "Model styling, makeup, editorial photography, close-ups and social media crops.",
        overview:
          "A jewellery shoot required detail-led imagery, elegant wearing shots and a premium visual atmosphere suitable for launch and PR.",
        clientNeed:
          "The brand needed a controlled UK shoot with model styling, product close-ups and social-ready adaptations.",
        ourRole:
          "FrameBridge coordinated model styling, makeup, photography direction, close-up capture and export formats.",
        productionScope: [
          "Model and styling coordination",
          "Product handling",
          "Editorial photography",
          "Detail close-ups",
          "Social crop delivery"
        ],
        deliverables: [
          "Model wearing shots",
          "Jewellery close-ups",
          "Editorial stills",
          "Social media crops"
        ],
        visualDirection:
          "Refined, tactile and quiet-luxury inspired, with close attention to material, skin and silhouette.",
        relatedServices: ["Commercial Photography", "Makeup & Styling", "Creative Production"]
      }
    ]
  },
  zh: {
    eyebrow: "案例作品",
    title: "覆盖品牌拍摄、活动内容、产品宣传与达人模特项目的精选案例。",
    intro: "通过结构化案例展示镜桥创意如何为中国品牌与代理团队提供英国本地创意制作支持。",
    confidentialNote: "部分项目因客户协议不公开品牌名称。",
    filters: ["全部", "时尚", "美妆", "科技", "汽车", "活动", "达人广告", "短剧", "产品内容"],
    labels: {
      industry: "行业",
      challenge: "挑战",
      delivered: "交付",
      viewCase: "查看案例",
      overview: "概览",
      clientNeed: "客户需求",
      ourRole: "我们的角色",
      productionScope: "制作范围",
      deliverables: "交付内容",
      visualDirection: "视觉方向",
      relatedServices: "相关服务",
      cta: "规划类似项目",
      back: "返回案例"
    },
    cases: [
      {
        slug: "london-celebrity-event-coverage",
        title: "伦敦明星活动内容记录",
        industry: "娱乐 / 活动",
        filters: ["活动"],
        challenge: "一个现场娱乐项目需要在伦敦完成高质感视觉记录，并快速交付适合社媒传播的素材。",
        delivered: "活动摄影、后台内容、高光视觉、社交媒体素材。",
        overview: "一个节奏紧凑的伦敦活动需要高质感内容记录，既服务公关传播，也满足社媒与内部复盘需求。",
        clientNeed: "团队需要一位低干扰的英国本地制作伙伴，捕捉艺人现场、后台细节、氛围与高光瞬间。",
        ourRole: "镜桥创意协调活动内容采集、拍摄重点、后台动线需求与社媒公关交付规格。",
        productionScope: ["活动前拍摄规划", "活动摄影", "后台内容记录", "高光视觉采集", "社媒素材筛选"],
        deliverables: ["精修活动精选图", "后台内容组", "高光视觉", "社媒裁切素材"],
        visualDirection: "具有电影感的活动纪实，保持精致光线、干净构图与现场氛围。",
        relatedServices: ["活动与公关记录", "商业摄影", "视频与品牌影片"]
      },
      {
        slug: "fashion-campaign-production-london",
        title: "伦敦时尚广告制作",
        industry: "时尚",
        filters: ["时尚"],
        challenge: "一个中国时尚品牌需要使用英国本地模特完成海外广告视觉。",
        delivered: "模特选角、造型、妆造、摄影、短视频与伦敦场地制作。",
        overview:
          "项目围绕伦敦场景价值、编辑式造型与多渠道资产交付，搭建一组可用于上市与社媒传播的广告内容。",
        clientNeed: "品牌需要英国本地面孔、造型把控、场地规划与适配多个渠道的制作节奏。",
        ourRole: "镜桥创意统筹模特选角、造型协调、拍摄规划、团队搭建与广告素材交付。",
        productionScope: ["创意制作", "模特选角", "服装与妆造", "伦敦场地规划", "图片与短视频采集"],
        deliverables: ["广告图片", "Lookbook 精选", "短视频剪辑", "社媒裁切"],
        visualDirection: "高级伦敦编辑式视觉，强调自信造型、干净动态与品牌质感。",
        relatedServices: ["创意制作", "商业摄影", "人才选角", "妆造与造型"]
      },
      {
        slug: "ai-product-video-uk-market",
        title: "面向英国市场的 AI 产品视频",
        industry: "AI / 科技",
        filters: ["科技", "产品内容"],
        challenge: "一个科技产品需要英文产品演示内容与海外使用场景。",
        delivered: "出镜讲解产品视频、用户场景画面、办公室风格视觉与社媒剪辑。",
        overview: "科技产品需要更容易被海外用户、合作伙伴与内部团队理解的表达方式。",
        clientNeed: "团队需要英文内容、可信的使用环境与可用于官网和社媒的短内容。",
        ourRole: "镜桥创意协调出镜人才、办公室场景、产品演示拍摄与中英双语制作管理。",
        productionScope: ["主持人选角", "演示规划", "办公室与用户场景", "视频制作", "社媒短版"],
        deliverables: ["出镜讲解产品视频", "场景画面", "官网视频素材", "社媒短剪辑"],
        visualDirection: "干净、理性且有人感，用克制科技感和清晰讲解呈现产品价值。",
        relatedServices: ["视频与品牌影片", "主持人选角", "英国制作咨询"]
      },
      {
        slug: "beauty-creator-content-sprint",
        title: "美妆达人内容冲刺",
        industry: "美妆",
        filters: ["美妆", "达人广告"],
        challenge: "一个美妆品牌需要与英国华人创作者完成真实可信的社媒内容。",
        delivered: "达人协调、妆容视觉、产品试用视频与竖屏社媒素材。",
        overview: "项目聚焦可信的达人试用、平台原生节奏与快速竖屏交付。",
        clientNeed: "品牌需要英国华人创作者展示产品质地、使用流程与效果。",
        ourRole: "镜桥创意筛选创作者、协调妆容方向、制作支持与内容交付规格。",
        productionScope: ["达人 shortlist", "产品试用设置", "妆造方向", "竖屏视频采集", "社媒素材协调"],
        deliverables: ["达人试用视频", "妆容短片", "竖屏剪辑", "产品社媒素材"],
        visualDirection: "真实、明亮、平台原生，同时保持高级且符合品牌安全。",
        relatedServices: ["创作者协调", "妆造与造型", "短视频制作"]
      },
      {
        slug: "automotive-event-presenter-support",
        title: "汽车活动主持人与内容支持",
        industry: "汽车",
        filters: ["汽车", "活动"],
        challenge: "一个汽车品牌需要为英国活动匹配出镜人才，并完成现场内容支持。",
        delivered: "主持人 shortlist、活动记录、短视频片段与产品 walkaround 内容。",
        overview: "汽车活动需要自信的镜头讲解、本地现场记录与适合后续传播的快速内容。",
        clientNeed: "团队需要主持人选项、产品讲解支持，以及可用于社媒和内部复盘的活动素材。",
        ourRole: "镜桥创意支持主持人筛选、拍摄流程、现场内容重点与短视频交付。",
        productionScope: ["主持人 shortlist", "活动采集", "Walkaround 规划", "短视频拍摄", "素材交付"],
        deliverables: ["主持人选项", "Walkaround 视频", "活动记录", "短视频剪辑"],
        visualDirection: "自信、清晰、高级，在产品细节与活动能量之间取得平衡。",
        relatedServices: ["人才选角", "活动与公关记录", "视频与品牌影片"]
      },
      {
        slug: "jewellery-editorial-shoot",
        title: "珠宝编辑式拍摄",
        industry: "珠宝与配饰",
        filters: ["产品内容", "时尚"],
        challenge: "一个珠宝品牌需要使用模特佩戴图完成高质感海外视觉资产。",
        delivered: "模特造型、妆造、编辑式摄影、产品特写与社媒裁切。",
        overview: "珠宝拍摄需要细节导向的图像、优雅佩戴场景和适合上市与公关的高级视觉氛围。",
        clientNeed: "品牌需要一场可控的英国拍摄，完成模特造型、产品特写与社媒适配素材。",
        ourRole: "镜桥创意协调模特造型、妆造、摄影方向、特写拍摄与导出规格。",
        productionScope: ["模特与造型协调", "产品 handling", "编辑式摄影", "细节特写", "社媒裁切交付"],
        deliverables: ["模特佩戴图", "珠宝特写", "编辑式图片", "社媒裁切"],
        visualDirection: "精致、有触感、低调奢华，关注材质、皮肤与轮廓。",
        relatedServices: ["商业摄影", "妆造与造型", "创意制作"]
      }
    ]
  }
} satisfies Localized<{
  eyebrow: string;
  title: string;
  intro: string;
  confidentialNote: string;
  filters: string[];
  labels: Record<string, string>;
  cases: Array<{
    slug: string;
    title: string;
    industry: string;
    filters: string[];
    challenge: string;
    delivered: string;
    overview: string;
    clientNeed: string;
    ourRole: string;
    productionScope: string[];
    deliverables: string[];
    visualDirection: string;
    relatedServices: string[];
  }>;
}>;

export const footerCredibility = {
  en: "FrameBridge Studio is a London-based creative production and talent partner supporting Chinese brands, agencies and PR teams with UK content production, commercial visuals and local execution.",
  zh: "镜桥创意位于伦敦，为中国品牌、广告公司、媒体与PR团队提供英国本地商业内容制作、人才资源与项目执行支持。"
} satisfies Localized<string>;

export const agenciesPage = {
  en: {
    eyebrow: "For Agencies",
    title: "Your UK production partner for brand, media and PR projects.",
    intro:
      "We support agencies with local production, talent, styling, photography, video, event coverage and bilingual coordination across the UK.",
    sections: {
      supportEyebrow: "What we support",
      supportTitle: "Local execution across the production stack.",
      whyEyebrow: "Why agencies work with us",
      whyTitle: "Built for clear handoffs, approval checkpoints and discreet delivery.",
      whiteLabelEyebrow: "White-label / partner support",
      whiteLabelTitle: "Support the project without competing for the client relationship.",
      requestsEyebrow: "Typical agency requests",
      requestsTitle: "The briefs we help turn into UK execution.",
      processEyebrow: "Process",
      processTitle: "A practical route from agency brief to delivered assets.",
      ctaTitle: "Need a UK execution partner?",
      ctaText: "Send us the brief.",
      ctaButton: "Send Brief"
    },
    support: [
      "UK shoot execution",
      "Model and actor casting",
      "Creator coordination",
      "Event and PR coverage",
      "Commercial photography",
      "Short-form video",
      "Styling and makeup",
      "Location and logistics support",
      "Bilingual coordination"
    ],
    why: [
      "Local UK execution",
      "Flexible production team",
      "Bilingual communication",
      "Clear communication checkpoints",
      "Discreet white-label support available",
      "Familiar with Chinese brand expectations",
      "Familiar with UK production realities"
    ],
    whiteLabel:
      "We can work behind the scenes as your UK production partner when your agency owns the client relationship.",
    requests: [
      "We need models in London for a fashion campaign.",
      "We need a bilingual team to shoot a product video in the UK.",
      "We need event coverage at a UK exhibition.",
      "We need creators for a Xiaohongshu or TikTok campaign.",
      "We need a presenter for an automotive or technology activation."
    ],
    process: [
      "Share the client brief",
      "Confirm scope and confidentiality",
      "Build production plan",
      "Provide talent and resource options",
      "Execute in the UK",
      "Deliver assets to agency specifications"
    ]
  },
  zh: {
    eyebrow: "代理合作",
    title: "媒体、广告与PR公司的英国本地制作伙伴。",
    intro:
      "我们为媒体、广告、公关和MCN团队提供英国本地拍摄、模特达人、妆造造型、摄影摄像、活动内容和中英双语执行支持。",
    sections: {
      supportEyebrow: "支持范围",
      supportTitle: "覆盖制作链路的英国本地执行支持。",
      whyEyebrow: "为什么代理团队选择我们",
      whyTitle: "适合清晰交接、明确审核节点与低调交付的合作方式。",
      whiteLabelEyebrow: "白标 / 合作伙伴支持",
      whiteLabelTitle: "支持项目落地，不介入贵司客户关系。",
      requestsEyebrow: "常见代理需求",
      requestsTitle: "我们帮助代理团队把需求变成英国本地执行。",
      processEyebrow: "合作流程",
      processTitle: "从代理 brief 到素材交付的实用路径。",
      ctaTitle: "需要英国本地执行伙伴？",
      ctaText: "把项目需求发给我们。",
      ctaButton: "提交需求"
    },
    support: [
      "英国本地拍摄执行",
      "模特与演员选角",
      "达人协调",
      "活动与公关记录",
      "商业摄影",
      "短视频制作",
      "造型与妆造",
      "场地与物流支持",
      "中英双语协调"
    ],
    why: [
      "英国本地执行能力",
      "灵活制作团队",
      "中英双语沟通",
      "清晰的沟通与审核节点",
      "可提供低调白标支持",
      "理解中国品牌预期",
      "熟悉英国制作现实条件"
    ],
    whiteLabel: "如果项目由贵司主导客户关系，我们也可以作为英国本地执行伙伴，在幕后提供制作支持。",
    requests: [
      "我们需要在伦敦为时尚广告匹配模特。",
      "我们需要一个双语团队在英国拍产品视频。",
      "我们需要英国展会的活动内容记录。",
      "我们需要小红书或 TikTok 广告的达人资源。",
      "我们需要汽车或科技活动的出镜主持人。"
    ],
    process: [
      "分享客户 brief",
      "确认范围与保密要求",
      "搭建制作方案",
      "提供人才与资源选项",
      "在英国执行制作",
      "按代理规格交付素材"
    ]
  }
} satisfies Localized<{
  eyebrow: string;
  title: string;
  intro: string;
  sections: Record<string, string>;
  support: string[];
  why: string[];
  whiteLabel: string;
  requests: string[];
  process: string[];
}>;
