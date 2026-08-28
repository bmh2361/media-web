"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrandMark } from "@/components/brand/BrandMark";
import type { Language } from "@/lib/i18n";
import { easings } from "@/lib/motion-system";

const nodes = [
  {
    en: "Create in the UK",
    zh: "英国内容制作",
    detail: { en: "Content · Talent · Interviews", zh: "内容 · 人才 · 访谈" },
    position: "left-[5%] top-[16%] sm:left-[8%] sm:top-[17%]"
  },
  {
    en: "Launch in the UK",
    zh: "英国发布与现场执行",
    detail: { en: "Launches · Events · Roadshows", zh: "发布 · 活动 · 路演" },
    position: "right-[4%] top-[13%] sm:right-[7%] sm:top-[15%]"
  },
  {
    en: "Enter the UK Market",
    zh: "英国市场进入",
    detail: { en: "Readiness · Coordination · Delivery", zh: "准备 · 协调 · 落地" },
    position: "bottom-[9%] left-[27%] sm:bottom-[14%] sm:left-[29%]"
  }
] as const;

export function ProductionSystemCanvas({ language, active }: { language: Language; active: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div
      className="relative min-h-[29rem] overflow-hidden rounded-[1.25rem] border border-champagne/20 bg-graphite shadow-[0_32px_90px_rgba(0,0,0,.28)] sm:min-h-[34rem] lg:h-[min(640px,68vh)] lg:min-h-[36rem]"
      aria-label={language === "zh" ? "Venus Bridge 三条项目路径" : "Venus Bridge three project routes"}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_36%,rgba(204,166,114,.10),transparent_34%),linear-gradient(145deg,rgba(255,255,255,.035),transparent_45%)]" />
      <div className="absolute inset-x-5 top-5 z-20 flex items-center justify-between border-b border-pearl/10 pb-4 text-[10px] uppercase tracking-[.16em] text-pearl/50 sm:inset-x-7 sm:top-7">
        <span>VBM / LDN / 26</span>
        <span>{language === "zh" ? "项目路径" : "Project routes"}</span>
      </div>

      <BrandMark
        surface="dark"
        decorative
        className="pointer-events-none absolute right-[2%] top-[27%] w-[52%] opacity-[.045] sm:w-[48%]"
      />

      <svg
        className="pointer-events-none absolute inset-[8%] h-[84%] w-[84%]"
        viewBox="0 0 1000 650"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M40 515 C205 175 330 115 500 332 C640 510 766 500 960 105"
          stroke="rgba(244,240,232,.08)"
          strokeWidth="14"
        />
        <motion.path
          d="M40 515 C205 175 330 115 500 332 C640 510 766 500 960 105"
          stroke="#cca672"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.72, delay: 0.24, ease: easings.editorial }}
        />
      </svg>

      {nodes.map((node, index) => (
        <motion.div
          key={node.en}
          className={`absolute z-10 w-[46%] max-w-[15rem] border-l border-champagne/65 bg-ink/75 p-4 backdrop-blur-sm sm:w-[42%] sm:p-5 ${node.position}`}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reduced ? 0 : 0.36, delay: 0.34 + index * 0.1, ease: easings.editorial }}
        >
          <span className="text-[10px] tracking-[.16em] text-champagne">0{index + 1}</span>
          <h2 className="mt-3 text-base font-medium leading-tight text-pearl sm:text-xl">{node[language]}</h2>
          <p className="mt-2 text-xs leading-5 text-pearl/55">{node.detail[language]}</p>
        </motion.div>
      ))}

      <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-5 text-[10px] uppercase tracking-[.15em] text-pearl/40 sm:flex">
        <span>London / UK</span>
        <span className="size-1 rounded-full bg-champagne" />
        <span>16:9 + 4:5</span>
        <span className="size-1 rounded-full bg-champagne" />
        <span>Delivery / Ready</span>
      </div>
    </div>
  );
}
