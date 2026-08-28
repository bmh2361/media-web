import { ImageResponse } from "next/og";
import { isSupportedLocale } from "@/lib/i18n";

export const runtime = "edge";

const cardCopy = {
  en: {
    home: [
      "UK & European Market Execution",
      "Local commercial judgement, relationships and integrated execution for Chinese companies."
    ],
    companies: [
      "For Chinese Companies",
      "Validate opportunities and move UK and European market plans forward locally."
    ],
    partners: [
      "For UK & European Partners",
      "Relevant China-related opportunities with clear context and one bilingual coordination route."
    ],
    work: [
      "Real UK & European Projects",
      "Verified responsibilities and approved evidence from published work."
    ],
    "how-we-work": [
      "How We Work",
      "One accountable local team from market goal through execution and follow-through."
    ],
    about: ["About Venus Bridge", "A China-aware UK and European market execution team."],
    contact: [
      "Discuss Your UK & European Plans",
      "Share the market goal and we will assess the most useful next step."
    ],
    privacy: ["Privacy Notice", "How project-enquiry information is collected and used."],
    terms: ["Website Terms", "Website-use terms for Venus Bridge."]
  },
  zh: {
    home: ["英国与欧洲市场执行", "为中国企业提供本地商业判断、合作关系与一体化执行。"],
    companies: ["为中国企业提供本地支持", "验证市场机会，并在英国与欧洲本地推进市场计划。"],
    partners: ["面向英国与欧洲合作方", "围绕真实中国相关项目，提供清晰背景与双语协调。"],
    work: ["真实英国与欧洲项目", "展示已公开项目中的已验证职责与获批证据。"],
    "how-we-work": ["我们的工作方式", "由一个负责的本地团队推进目标、执行与后续跟进。"],
    about: ["关于 Venus Bridge", "理解中国企业语境的英国与欧洲市场执行团队。"],
    contact: ["沟通英国与欧洲市场计划", "说明市场目标，我们会判断最有帮助的下一步。"],
    privacy: ["隐私说明", "了解项目咨询信息的收集与使用方式。"],
    terms: ["网站条款", "Venus Bridge 网站使用说明。"]
  }
} as const;

export async function GET(request: Request, { params }: { params: Promise<{ lang: string; page: string }> }) {
  const { lang, page } = await params;
  const language = isSupportedLocale(lang) ? lang : "en";
  const key = page.split("--")[0] as keyof (typeof cardCopy)["en"];
  const [title, support] = cardCopy[language][key] ?? cardCopy[language].home;
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f4f0e8",
          background: "#0a0b0d"
        }}
      >
        {/* ImageResponse requires a native image element for the generated canvas. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Venus Bridge — Global Partnerships"
          src={new URL(
            "/brand/venus-bridge/png/venus-bridge-horizontal-lockup-white.png",
            request.url
          ).toString()}
          width="440"
          height="82"
          style={{ objectFit: "contain", objectPosition: "left top" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700 }}>{title}</div>
          <div style={{ display: "flex", color: "#b8b0a4", fontSize: 28 }}>{support}</div>
        </div>
        <div style={{ display: "flex", height: 4, width: "100%", background: "#cca672" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
