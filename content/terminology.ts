export type TerminologyRule = {
  chinese: string;
  preferredEnglish: readonly string[];
  prohibitedEnglish?: readonly string[];
};

export const commercialTerminology = [
  {
    chinese: "机械执行",
    preferredEnglish: ["mechanically following", "blindly following"],
    prohibitedEnglish: ["translating"]
  },
  {
    chinese: "中欧沟通",
    preferredEnglish: ["China–Europe communication", "China–Europe coordination"],
    prohibitedEnglish: ["translation"]
  },
  {
    chinese: "中英双语沟通",
    preferredEnglish: ["bilingual Chinese–English communication"],
    prohibitedEnglish: ["China-to-Europe"]
  },
  { chinese: "拓展", preferredEnglish: ["grow", "expand", "develop"], prohibitedEnglish: ["activate"] },
  { chinese: "商务与执行责任", preferredEnglish: ["commercial and delivery responsibility"] },
  {
    chinese: "判断",
    preferredEnglish: ["judgement", "assessment", "insight"],
    prohibitedEnglish: ["learning", "framing"]
  },
  {
    chinese: "项目路径",
    preferredEnglish: ["project route", "project plan"],
    prohibitedEnglish: ["delivery brief"]
  },
  { chinese: "视觉记录", preferredEnglish: ["visual documentation"] },
  { chinese: "服务承诺", preferredEnglish: ["service commitment"], prohibitedEnglish: ["service guarantee"] }
] as const satisfies readonly TerminologyRule[];
