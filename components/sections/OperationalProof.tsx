import type { Language } from "@/lib/i18n";
const proof = {
  en: [
    "London-based project coordination",
    "Chinese-English bilingual communication",
    "UK talent and specialist sourcing",
    "Production planning and local execution",
    "Usage-rights and deliverable coordination",
    "Agency and confidentiality-aware workflow",
    "Multi-format content handoff",
    "UK-wide production coordination where feasible"
  ],
  zh: [
    "伦敦本地项目统筹",
    "中英双语沟通",
    "英国人才与专业资源筛选",
    "制作规划与本地执行",
    "使用权与交付协调",
    "理解代理流程与保密要求",
    "多格式内容交付",
    "在可行条件下协调英国多地制作"
  ]
};
export function OperationalProof({ language }: { language: Language }) {
  return (
    <section className="section-y bg-ink text-pearl">
      <div className="container-x">
        <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">
          {language === "zh" ? "执行能力" : "Operational proof"}
        </p>
        <h2 className="mt-5 max-w-3xl text-4xl font-semibold md:text-6xl">
          {language === "zh" ? "以清晰流程建立项目可信度。" : "Credibility through operational clarity."}
        </h2>
        <div className="mt-12 grid gap-px border border-pearl/10 bg-pearl/10 md:grid-cols-2 lg:grid-cols-4">
          {proof[language].map((x, i) => (
            <div key={x} className="bg-ink p-5">
              <span className="text-xs text-champagne">0{i + 1}</span>
              <p className="mt-8 text-sm leading-6 text-pearl/70">{x}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
