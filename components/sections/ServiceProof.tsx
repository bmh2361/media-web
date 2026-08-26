import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceProof } from "@/content/service-proof";
import type { Language } from "@/lib/i18n";

export function ServiceProof({
  service,
  language
}: {
  service: keyof typeof serviceProof;
  language: Language;
}) {
  const proof = serviceProof[service];
  const rows = [
    [language === "zh" ? "客户问题" : "Client problem", proof.clientProblem[language]],
    [language === "zh" ? "相关能力" : "Relevant capabilities", proof.capabilities[language]],
    [language === "zh" ? "典型交付" : "Typical deliverables", proof.deliverables[language]],
    [language === "zh" ? "项目依赖" : "Dependencies", proof.dependencies[language]],
    [language === "zh" ? "需确认事项" : "Approvals", proof.approvals[language]],
    [
      language === "zh" ? "Venus Bridge 责任" : "Venus Bridge responsibility",
      proof.frameBridge[language]
    ],
    [language === "zh" ? "客户责任" : "Client responsibility", proof.client[language]],
    [language === "zh" ? "典型下一步" : "Typical next step", proof.nextStep[language]],
    [language === "zh" ? "相关概念项目模式" : "Related concept project models", proof.relatedModels[language]]
  ];
  return (
    <section className="section-y bg-porcelain">
      <div className="container-x">
        <SectionHeading eyebrow={proof.eyebrow[language]} title={proof.title[language]} />
        <div className="mt-10 grid gap-px bg-ink/10 md:grid-cols-3">
          {rows.map(([label, value]) => (
            <article key={label} className="bg-pearl p-6">
              <h3 className="text-sm font-semibold text-blue">{label}</h3>
              <p className="mt-4 text-sm leading-6 text-ink/70">{value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
