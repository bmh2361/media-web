import { TeamProfileIndex } from "@/components/team/TeamProfileIndex";
import { extendedProductionRoles } from "@/content/team";
import type { Language } from "@/lib/i18n";

export function AboutTeam({ language }: { language: Language }) {
  const zh = language === "zh";
  const capabilitySystem = zh
    ? [
        ["中国", "企业关系与需求发现"],
        ["市场战略", "商业判断与欧洲市场语境"],
        ["合作关系", "买家、行业、机构与本地伙伴协调"],
        ["创意", "品牌与制作方向"],
        ["交付", "跨境协调与当地执行"]
      ]
    : [
        ["CHINA", "Corporate relationships & requirement discovery"],
        ["MARKET STRATEGY", "Commercial judgement & UK and European context"],
        ["PARTNERSHIPS", "Buyer, industry, institutional and local stakeholder coordination"],
        ["CREATIVE", "Brand & production direction"],
        ["DELIVERY", "Cross-border coordination & local execution"]
      ];

  return (
    <>
      <section
        className="section-compact bg-mist"
        aria-labelledby="delivery-system-title"
        data-about-chapter="operating-model"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 min-[1200px]:col-span-5">
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {zh ? "一个能力系统" : "ONE CAPABILITY SYSTEM"}
            </p>
            <h2
              id="delivery-system-title"
              className="type-heading-section zh-display-measure heading-measure-standard mt-6 max-w-[11ch]"
            >
              {zh ? "五种能力，服务同一个市场结果。" : "Five disciplines. One commercial direction."}
            </h2>
            <p className="text-ink/58 mt-7 max-w-sm text-base leading-7">
              {zh
                ? "Venus Bridge 将中国端企业理解、欧洲市场判断、本地合作关系、创意方向与现场执行连接在一起。"
                : "Venus Bridge connects China-side understanding, European market judgement, local relationships, creative direction and delivery on the ground."}
            </p>
          </div>

          <ol className="border-t border-ink/15 lg:col-span-7 lg:col-start-6 min-[1200px]:col-span-6 min-[1200px]:col-start-7" data-operating-sequence>
            {capabilitySystem.map(([title, description], index) => (
              <li
                key={title}
                className="grid grid-cols-[3.25rem_1fr] gap-3 border-b border-ink/15 py-5 md:grid-cols-[4.5rem_1fr] md:py-6"
              >
                <span className="pt-1 text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span>
                <div className="grid gap-4 md:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] md:gap-8">
                  <h3 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">{title}</h3>
                  <p className="text-ink/52 text-sm leading-6 md:text-base md:leading-7">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section-y bg-porcelain"
        aria-labelledby="about-team-title"
        data-about-chapter="people"
      >
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-editorial text-champagne">
                {zh ? "核心团队" : "CORE TEAM"}
              </p>
              <h2 id="about-team-title" className="type-heading-section zh-display-measure heading-measure-wide mt-6 max-w-[11ch]">
                {zh ? "把总部目标变成本地行动的人。" : "The people turning headquarters goals into local action."}
              </h2>
            </div>
            <p className="text-ink/58 max-w-md text-lg leading-8 lg:col-span-4 lg:col-start-9">
              {zh
                ? "五位核心成员分别贡献中国端关系、欧洲商业、创意、技术与实施能力，并围绕同一个市场目标协作。"
                : "Five core members contribute China-side relationships, European commercial, creative, technology and implementation expertise around the same market goal."}
            </p>
          </div>
          <div className="mt-10 lg:mt-16">
            <TeamProfileIndex language={language} />
          </div>
        </div>
      </section>

      <section
        className="section-compact overflow-hidden bg-ink text-pearl"
        aria-labelledby="specialist-network-title"
        data-about-chapter="specialists"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-editorial text-champagne">
              {zh ? "专业能力按需加入" : "SPECIALIST DEPTH"}
            </p>
            <h2
              id="specialist-network-title"
              className="type-heading-section zh-display-measure heading-measure-compact mt-6 max-w-[11ch]"
            >
              {zh ? "由项目决定需要什么专业能力。" : "The project determines the expertise required."}
            </h2>
            <p className="text-pearl/58 mt-7 max-w-md text-base leading-7">
              {zh
                ? "Venus Bridge 保留核心商务与执行责任，并仅在项目目标需要时引入专业能力。"
                : "Venus Bridge keeps core commercial and delivery responsibility, bringing in specialist capability only where the goal requires it."}
            </p>
            <p className="text-pearl/72 mt-10 border-l border-champagne pl-5 text-sm leading-6">
              {zh ? "一个核心团队，按需配置专业能力。" : "One core team, with specialist capability added as required."}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" data-specialist-presentation="typographic-network">
            <p className="text-pearl/34 mb-6 text-xs uppercase tracking-editorial">
              {zh ? "按项目组合" : "ASSEMBLED AROUND THE PROJECT"}
            </p>
            <ul className="border-t border-pearl/15">
              {extendedProductionRoles.map((role, index) => (
                <li
                  key={role.id}
                  className={`grid min-h-[4.25rem] grid-cols-[3rem_1fr] items-center gap-3 border-b border-pearl/15 py-3 ${index % 2 ? "sm:ml-10" : "sm:mr-10"}`}
                >
                  <span className="text-champagne/64 text-xs">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-pearl/84 text-xl font-medium tracking-[-0.02em] md:text-2xl">
                    {role.title[language]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
