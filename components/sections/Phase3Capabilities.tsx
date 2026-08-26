import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CapabilityIndexHero, type CapabilityIndexItem } from "@/components/sections/phase32c/CapabilityIndexHero";
import { EditorialScene, type EditorialSceneMedia } from "@/components/sections/phase32c/EditorialScene";
import { SelectedEngagements } from "@/components/sections/phase32c/SelectedEngagements";
import { capabilityMediaById, type CapabilityMedia } from "@/content/capability-media";
import { phase3 } from "@/content/phase3";
import { findPortfolioProject, type PortfolioProject } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

const requiredCapabilityMedia = (id: string) => {
  const media = capabilityMediaById(id);
  if (!media || !media.websiteUseApproved || !media.mediaRightsApproved || !media.copyrightApproved) throw new Error(`Phase 3.2C media ${id} is not publication-ready.`);
  return media;
};
const projectScene = (project: PortfolioProject, category: "hero" | "cover" | "gallery" = "hero"): EditorialSceneMedia => ({ kind: "portfolio", media: project.media.find((item) => item.category === category) ?? project.media[0] });
const capabilityScene = (media: CapabilityMedia): EditorialSceneMedia => ({ kind: "capability", media });

export function Phase3Capabilities({ language }: { language: Language }) {
  const copy = phase3[language];
  const zh = language === "zh";
  const changan = findPortfolioProject("changan-europe-launch-2025")!;
  const byd = findPortfolioProject("byd-bd11-london")!;
  const catl = findPortfolioProject("catl-open-day-2025")!;
  const leapmotor = findPortfolioProject("leapmotor-iaa-2023")!;
  const londonFilm = findPortfolioProject("london-automotive-brand-film")!;
  const teal = findPortfolioProject("london-fashion-week-2025")!;
  const beauty = findPortfolioProject("beauty-fashion-brand-content")!;
  const robot = requiredCapabilityMedia("vbm-003");
  const designTalk = requiredCapabilityMedia("vbm-005");
  const creatorAuto = requiredCapabilityMedia("vbm-013");
  const beautyDevice = requiredCapabilityMedia("vbm-014");
  const skincare = requiredCapabilityMedia("vbm-015");
  const fashionRetail = requiredCapabilityMedia("vbm-018");
  const cosmetics = requiredCapabilityMedia("vbm-019");
  const interview = requiredCapabilityMedia("vbm-024");

  const indexItems: CapabilityIndexItem[] = [
    { id: copy.capabilities[1].id, title: copy.capabilities[1].title, summary: copy.capabilities[1].short, scene: projectScene(byd) },
    { id: copy.capabilities[3].id, title: copy.capabilities[3].title, summary: copy.capabilities[3].short, scene: projectScene(londonFilm) },
    { id: copy.capabilities[2].id, title: copy.capabilities[2].title, summary: copy.capabilities[2].short, scene: capabilityScene(creatorAuto) },
    { id: copy.capabilities[0].id, title: copy.capabilities[0].title, summary: copy.capabilities[0].short }
  ];
  const industryMoments = [
    { title: zh ? "伦敦车辆发布" : "London Vehicle Launch", meta: zh ? "伦敦现场 · 车辆展示 · 活动记录" : "London setting · vehicle presentation · event documentation", scene: projectScene(byd, "cover"), href: byd.slug },
    { title: zh ? "欧洲品牌发布" : "European Brand Launch", meta: zh ? "发布现场 · 产品展示 · 利益相关方内容" : "Launch environment · product presentation · stakeholder content", scene: projectScene(changan, "cover"), href: changan.slug },
    { title: zh ? "能源技术活动" : "Energy Technology Event", meta: zh ? "技术议题 · 高管演讲 · 活动内容" : "Technology narrative · executive stage · event content", scene: projectScene(catl, "gallery"), href: catl.slug },
    { title: zh ? "国际展会现场" : "International Exhibition", meta: zh ? "展台环境 · 商业交流 · 产品内容" : "Exhibition environment · commercial interaction · product content", scene: projectScene(leapmotor), href: leapmotor.slug },
    { title: zh ? "机器人与创新场景" : "Robotics & Innovation Environment", meta: zh ? "技术展示 · 行业场景 · 产品内容" : "Technology display · industry setting · product content", scene: capabilityScene(robot) },
    { title: zh ? "行业设计对话" : "Industry Design Conversation", meta: zh ? "专业议题 · 现场受众 · 内容记录" : "Industry topic · live audience · content documentation", scene: capabilityScene(designTalk) }
  ];
  const campaignWall = [
    { label: zh ? "创作者品牌激活" : "CREATOR BRAND ACTIVATION", scene: capabilityScene(creatorAuto), className: "md:col-span-7 md:row-span-2" },
    { label: zh ? "产品型创作者内容" : "PRODUCT-LED CREATOR CONTENT", scene: capabilityScene(skincare), className: "md:col-span-5" },
    { label: zh ? "美妆产品内容" : "BEAUTY PRODUCT CONTENT", scene: capabilityScene(cosmetics), className: "md:col-span-5" },
    { label: zh ? "造型与商业制作" : "STYLING & COMMERCIAL PRODUCTION", scene: projectScene(teal, "gallery"), className: "md:col-span-5" },
    { label: zh ? "时尚零售场景" : "FASHION RETAIL CONTEXT", scene: capabilityScene(fashionRetail), className: "md:col-span-3" },
    { label: zh ? "创意美妆制作" : "CREATIVE BEAUTY PRODUCTION", scene: projectScene(beauty), className: "md:col-span-4" }
  ];
  const outputs = [
    { label: zh ? "品牌影片" : "BRAND FILM", scene: projectScene(londonFilm) },
    { label: zh ? "高管与创作者访谈" : "EXECUTIVE & CREATOR INTERVIEW", scene: capabilityScene(interview) },
    { label: zh ? "创作者内容" : "CREATOR CONTENT", scene: capabilityScene(beautyDevice) },
    { label: zh ? "时尚与美妆" : "FASHION & BEAUTY", scene: projectScene(teal, "gallery") },
    { label: zh ? "活动与利益相关方内容" : "EVENT & STAKEHOLDER CONTENT", scene: projectScene(catl, "gallery") },
    { label: zh ? "产品与社交内容" : "PRODUCT & SOCIAL CONTENT", scene: capabilityScene(skincare) }
  ];

  return (
    <>
      <section className="bg-ink pt-[76px] text-pearl lg:pt-[88px]">
        <Container className="py-14 lg:py-20">
          <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><Eyebrow className="text-champagne">{copy.capabilitiesIntro.eyebrow}</Eyebrow><h1 className="type-display-page zh-display-measure mt-6 max-w-[17ch]">{zh ? "围绕你的英国目标，我们可以一起完成什么？" : "What can we build around your UK objective?"}</h1></div><p className="type-body text-pearl/65 lg:col-span-4">{copy.capabilitiesIntro.body}</p></div>
          <CapabilityIndexHero items={indexItems} language={language} />
        </Container>
      </section>

      <Section id="institutional-expert-collaboration" className="bg-pearl">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
            <div><span className="text-xs text-champagne">01</span><h2 className="editorial-heading mt-6 max-w-[12ch]">{copy.capabilities[0].title}</h2><p className="mt-7 max-w-md text-lg leading-8 text-ink/65">{zh ? "当商业目标需要可信的知识交流，我们帮助设计合适的参与形式，并准确处理角色、流程与公开边界。" : "When the objective calls for credible knowledge exchange, we help shape the right format and coordinate the roles, process and publication boundaries."}</p></div>
            <div className="border-y border-ink/15">
              <div className="grid gap-8 py-8 lg:grid-cols-[.72fr_1.28fr]"><p className="max-w-md text-2xl leading-9">{zh ? "知识交流围绕清晰的商业目标展开。参与不等于背书。" : "Knowledge exchange is designed around a clear commercial objective. Participation is not endorsement."}</p><div><p className="text-xs uppercase tracking-editorial text-slate">{zh ? "可能的合作形式" : "What it could involve"}</p><div className="mt-4 grid grid-cols-2 gap-x-6 text-sm leading-6">{copy.capabilities[0].examples.concat(zh ? ["研究团队交流", "技术工作坊", "专业观点访谈", "企业或研究参访"] : ["Research-group engagement", "Technical workshops", "Thought-leadership interviews", "Corporate or research visits"]).map((format) => <span key={format} className="border-t border-ink/10 py-3">{format}</span>)}</div></div></div>
              <SelectedEngagements records={[]} language={language} />
              <div className="border-t border-ink/15 py-8"><p className="text-xs uppercase tracking-editorial text-slate">{zh ? "合作如何展开" : "How an engagement comes together"}</p><ol className="mt-6 grid md:grid-cols-2">{(zh ? [["明确知识目标", "确定交流需要为业务实现什么。"], ["设计合适形式", "选择对谈、圆桌、参访、工作坊或访谈等形式。"], ["协调合作过程", "根据范围协调参与者、简报、议程、双语沟通与现场。"], ["适当形成内容", "在获得许可时制作访谈、影像与专业内容。"]] : [["Define the knowledge objective", "Set what the exchange must achieve for the business."], ["Design the right engagement", "Choose an appropriate discussion, roundtable, visit, workshop or interview format."], ["Coordinate the engagement", "Align participants, brief, agenda, bilingual delivery and logistics within scope."], ["Document where appropriate", "Create interviews, film or stakeholder content where permissions allow."]]).map(([title, text], index) => <li key={title} className="grid min-h-48 grid-cols-[2.5rem_1fr] gap-4 border-t border-ink/10 py-6 md:px-5 md:odd:border-r md:odd:pl-0"><span className="text-xs text-champagne">0{index + 1}</span><div><h3 className="text-xl font-medium">{title}</h3><p className="mt-4 text-sm leading-6 text-ink/60">{text}</p></div></li>)}</ol></div>
              <p className="border-l border-champagne/55 py-1 pl-5 text-sm leading-7 text-ink/65">{zh ? "当前公开登记中没有通过全部门禁的具名机构项目。机构、人员、关系类型与项目细节只有在职责证据和公开授权齐备后才会展示。" : "No named institutional project currently passes every public evidence gate. Institutions, people, relationship types and project details appear only after role evidence and publication permission are complete."}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="industry-presence-events" className="bg-night text-pearl">
        <Container><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><span className="text-xs text-champagne">02</span><h2 className="editorial-heading mt-6 max-w-[12ch]">{copy.capabilities[1].title}</h2></div><p className="max-w-xl text-lg leading-8 text-pearl/65 lg:justify-self-end">{copy.capabilities[1].problem}</p></div>
          <div className="mt-16 space-y-12 lg:space-y-16">{industryMoments.slice(0, 4).map((item, index) => <article key={item.title} className={`grid gap-7 lg:grid-cols-12 lg:items-end ${index === 0 ? "" : "border-t border-pearl/10 pt-12"}`}><div className={`${index % 2 ? "lg:order-2 lg:col-span-8" : "lg:col-span-9"}`}><EditorialScene scene={item.scene} language={language} sizes="(min-width:1024px) 72vw, 100vw" mediaRole={index === 0 ? "hero-landscape" : "proof-landscape"} /></div><div className={`${index % 2 ? "lg:order-1 lg:col-span-4" : "lg:col-span-3"}`}><span className="text-xs text-champagne">{String(index + 1).padStart(2, "0")}</span><h3 className="type-heading-card mt-5">{item.title}</h3><p className="mt-5 text-base leading-7 text-pearl/65">{item.meta}</p>{item.href ? <Link href={withLanguage(`/work/${item.href}`, language)} className="mt-6 inline-flex min-h-11 items-center border-b border-champagne text-sm text-champagne">{zh ? "查看项目" : "View project"}</Link> : null}</div></article>)}</div>
        </Container>
      </Section>

      <Section id="creators-talent-cultural-partnerships" className="bg-porcelain">
        <Container><div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><span className="text-xs text-champagne">03</span><h2 className="editorial-heading mt-6 max-w-[12ch]">{copy.capabilities[2].title}</h2></div><p className="max-w-xl text-lg leading-8 text-ink/65 lg:justify-self-end">{zh ? "把创作者、人才、造型与制作纳入同一个品牌目标，而不是把人员本身当作产品。" : "Bring creators, talent, styling and production into one brand objective—without treating people as the product category."}</p></div>
          <div className="mt-14 grid gap-5 md:grid-cols-12">{campaignWall.slice(0, 3).map((item, index) => <div key={item.label} className={`group relative overflow-hidden bg-ink ${index === 0 ? "min-h-[520px] md:col-span-7 md:row-span-2" : "min-h-[300px] md:col-span-5"}`}><EditorialScene scene={item.scene} language={language} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.02]" sizes="(min-width:768px) 58vw, 100vw" mediaRole="mosaic-fill" /><p className="absolute bottom-4 left-4 bg-ink/85 px-4 py-3 text-xs uppercase tracking-editorial text-pearl">{item.label}</p></div>)}</div>
        </Container>
      </Section>

      <Section id="creative-production-brand-assets" className="bg-pearl">
        <Container><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><span className="text-xs text-champagne">04</span><h2 className="editorial-heading mt-6 max-w-[12ch]">{copy.capabilities[3].title}</h2></div><div className="lg:justify-self-end"><p className="max-w-xl text-lg leading-8 text-ink/65">{zh ? "把行业活动、专业对谈与创作者合作，转化为能够继续服务品牌沟通的影片、摄影、访谈与社交内容。" : "Turn industry activity, expert conversations and creator collaborations into film, photography, interviews and social content that keep working for the brand."}</p><p className="mt-5 text-sm text-ink/65">{zh ? "现场发生的事，也是品牌资产的起点。" : "The activity is the beginning of the asset—not the end of the project."}</p></div></div>
          <div className="mt-14 grid gap-x-6 gap-y-12 border-t border-ink/15 pt-8 md:grid-cols-12">{outputs.slice(0, 4).map((item, index) => <div key={item.label} className={index % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:pt-20"}><EditorialScene scene={item.scene} language={language} sizes="(min-width:768px) 58vw, 100vw" mediaRole={index === 2 ? "proof-portrait" : "proof-landscape"} /><p className="mt-4 border-t border-ink/15 pt-4 text-xs uppercase tracking-editorial text-slate">0{index + 1} · {item.label}</p></div>)}</div>
        </Container>
      </Section>

      <Section className="bg-ink text-pearl">
        <Container><Eyebrow className="text-champagne">{copy.programmes.eyebrow}</Eyebrow><h2 className="editorial-heading mt-5 max-w-[13ch]">{copy.programmes.title}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-pearl/65">{copy.programmes.body}</p>
          <div className="mt-14 border-t border-pearl/15">{copy.programmes.items.map((programme, index) => <details key={programme.title} className="group border-b border-pearl/15"><summary className="grid min-h-32 cursor-pointer list-none grid-cols-[3rem_1fr_auto] items-center gap-5 py-7"><span className="text-xs text-champagne">0{index + 1}</span><h3 className="text-2xl font-medium md:text-3xl">{programme.title}</h3><ArrowDownRight className="transition group-open:rotate-90" /></summary><div className="grid gap-7 pb-9 pl-12 md:grid-cols-2 lg:grid-cols-4"><div><p className="text-[10px] uppercase tracking-editorial text-champagne">{zh ? "目标" : "What this could achieve"}</p><p className="mt-3 text-sm leading-7 text-pearl/65">{programme.objective}</p></div><div><p className="text-[10px] uppercase tracking-editorial text-champagne">{zh ? "可以如何展开" : "What it could involve"}</p><p className="mt-3 text-sm leading-7 text-pearl/65">{programme.activity}</p></div><div><p className="text-[10px] uppercase tracking-editorial text-champagne">{zh ? "可以形成什么" : "What it could create"}</p><p className="mt-3 text-sm leading-7 text-pearl/65">{programme.outputs}</p></div><div><p className="text-[10px] uppercase tracking-editorial text-champagne">{zh ? "相关能力" : "Capabilities involved"}</p><p className="mt-3 text-sm leading-7 text-pearl/65">{programme.capabilities.join(" · ")}</p><Link href={withLanguage(`/work/${programme.proof.slug}`, language)} className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-champagne underline-offset-4 hover:underline">{zh ? "查看相关项目" : "View related work"}</Link></div></div></details>)}</div>
        </Container>
      </Section>

      <Section className="bg-ink text-pearl"><Container className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><Eyebrow className="text-champagne">{copy.finalCta.eyebrow}</Eyebrow><h2 className="editorial-heading mt-5 max-w-[14ch]">{copy.finalCta.title}</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/70">{copy.finalCta.body}</p></div><ButtonLink href={withLanguage("/contact", language)} variant="secondary" className="border-pearl/30 text-pearl hover:bg-pearl hover:text-ink" showArrow>{copy.finalCta.button}</ButtonLink></Container></Section>
    </>
  );
}
