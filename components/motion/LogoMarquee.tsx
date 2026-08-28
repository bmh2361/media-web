"use client";

import Image from "next/image";
import { demoBrands } from "@/content/demo-brands";

export function LogoMarquee({ language }: { language: "en" | "zh" }) {
  if (process.env.NEXT_PUBLIC_SHOW_DEMO_BRANDS !== "true") return null;
  const group = (hidden = false) => (
    <div className="logo-marquee-group" aria-hidden={hidden || undefined}>
      {demoBrands.map((brand) => (
        <div key={`${brand.id}-${hidden}`} className="logo-marquee-item">
          <Image src={brand.src} alt={hidden ? "" : brand.alt} width={brand.width} height={brand.height} />
        </div>
      ))}
    </div>
  );
  return (
    <section
      className="overflow-hidden border-y border-pearl/10 bg-ink py-8 text-pearl"
      aria-label={language === "zh" ? "演示品牌标记（非真实客户）" : "Demo marks (not client logos)"}
    >
      <p className="container-x mb-5 text-[10px] uppercase tracking-[.18em] text-pearl/70">
        {language === "zh"
          ? "非客户名单 · 仅供界面演示"
          : "Not a client roster · interface demonstration only"}
      </p>
      <div className="logo-marquee-window">
        <div className="logo-marquee-track">
          {group()}
          {group(true)}
        </div>
      </div>
    </section>
  );
}
