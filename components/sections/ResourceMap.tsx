"use client";
import { motion, useReducedMotion } from "framer-motion";
import { motionSystem as motionTokens } from "@/lib/motion-system";
const nodes = [
  [50, 14],
  [82, 34],
  [78, 74],
  [50, 88],
  [18, 72],
  [16, 34],
  [50, 52]
] as const;
export function ResourceMap({ language }: { language: "en" | "zh" }) {
  const reduced = useReducedMotion();
  const labels =
    language === "zh"
      ? ["科研人员", "学术嘉宾", "科技企业", "创新项目", "行业伙伴", "媒体传播", "活动与圆桌"]
      : [
          "Researchers",
          "Academic speakers",
          "Technology companies",
          "Innovation programmes",
          "Industry partners",
          "Media & communication",
          "Events & roundtables"
        ];
  return (
    <figure className="border border-blue/20 bg-white p-5 md:p-8" aria-labelledby="resource-caption">
      <figcaption id="resource-caption" className="mb-4 text-xs text-slate">
        {language === "zh"
          ? "概念资源图，不代表正式合作关系"
          : "Conceptual resource map — not formal partnerships"}
      </figcaption>
      <svg
        viewBox="0 0 100 100"
        className="w-full"
        role="img"
        aria-label={
          language === "zh"
            ? "科研与创新资源协调示意图"
            : "Research and innovation resource coordination diagram"
        }
      >
        {nodes.slice(0, 6).map((n, i) => (
          <motion.line
            key={i}
            x1="50"
            y1="52"
            x2={n[0]}
            y2={n[1]}
            stroke="#b59a71"
            strokeWidth=".35"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={motionTokens.viewport}
            transition={{ duration: reduced ? 0.01 : 0.7, delay: i * 0.05 }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={labels[i]}>
            <circle
              cx={n[0]}
              cy={n[1]}
              r={i === 6 ? 5 : 3}
              fill={i === 6 ? "#0b0d10" : "#fbfaf7"}
              stroke="#b59a71"
              strokeWidth=".5"
            />
            <text x={n[0]} y={n[1] + (i === 6 ? 9 : 6)} textAnchor="middle" fontSize="3" fill="#242830">
              {labels[i]}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
