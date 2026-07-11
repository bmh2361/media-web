import { ImageResponse } from "next/og";
import { isSupportedLocale } from "@/lib/i18n";

export const runtime = "edge";

export async function GET(_: Request, { params }: { params: Promise<{ lang: string; page: string }> }) {
  const { lang, page } = await params;
  const language = isSupportedLocale(lang) ? lang : "en";
  const path = page.replaceAll("--", " / ");
  const concept = path.includes("work");
  const title = concept
    ? language === "zh"
      ? "概念项目模式"
      : "Concept Project Model"
    : path
        .split(" / ")
        .map((part) => part.replaceAll("-", " "))
        .join(" · ") || "FrameBridge Studio";
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
          color: "#f7f2e8",
          background: "#14171c"
        }}
      >
        <div style={{ display: "flex", color: "#d8c7a2", fontSize: 28 }}>FRAMEBRIDGE STUDIO</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700 }}>{title}</div>
          <div style={{ display: "flex", color: "#9fb6cc", fontSize: 28 }}>
            {concept
              ? language === "zh"
                ? "项目模式示例"
                : "Illustrative project planning"
              : "UK production, talent and innovation"}
          </div>
        </div>
        <div style={{ display: "flex", height: 18, width: "100%", background: "#6fb7ff" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
