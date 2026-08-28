import Link from "next/link";
import { CapabilityImage } from "@/components/media/CapabilityImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import {
  capabilityCollectionsForExpertise,
  capabilityMediaById,
  type CapabilityMedia
} from "@/content/capability-media";
import type { ExpertiseDefinition } from "@/content/information-architecture";
import { pathLabels } from "@/content/information-architecture";
import { publicInstitutionRelationships } from "@/content/institutions";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";

const byId = (id: string) => capabilityMediaById(id) as CapabilityMedia;

export function EntertainmentCulturePage({
  language,
  sector
}: {
  language: Language;
  sector: ExpertiseDefinition;
}) {
  const zh = language === "zh";
  const collections = capabilityCollectionsForExpertise("entertainment-culture");
  return (
    <>
      <ExpertiseSchema language={language} sector={sector} />
      <EditorialHero
        language={language}
        eyebrow={zh ? "娱乐与文化" : "ENTERTAINMENT & CULTURE"}
        title={sector.headline?.[language] ?? sector.title[language]}
        intro={sector.intro?.[language] ?? sector.subtitle[language]}
        primary={byId("vbm-020")}
        secondary={byId("vbm-007")}
      />

      <MediaCapabilitySection
        language={language}
        eyebrow={zh ? "现场制作" : "LIVE PRODUCTION"}
        title={zh ? "艺人与现场表演" : "Artists & Live Performance"}
        text={
          zh
            ? "围绕演出、舞台和伦敦内容，提供演唱会摄影、现场表演记录、经批准的后台内容、社交优先精选与活动文档。图片仅说明视觉与制作能力，不代表官方身份或艺人管理关系。"
            : "Concert photography, stage content, live-performance capture, approved backstage content, tour and London content, social-first selects and event documentation. Visuals demonstrate capability, not official status or artist management."
        }
        items={
          zh
            ? ["演唱会与舞台摄影", "现场表演记录", "社交优先精选", "活动文档"]
            : [
                "Concert photography",
                "Stage and performance capture",
                "Social-first selects",
                "Event documentation"
              ]
        }
        media={[byId("vbm-006")]}
      />

      <MediaCapabilitySection
        language={language}
        reverse
        tone="light"
        eyebrow={zh ? "商业语境" : "COMMERCIAL CONTEXT"}
        title={zh ? "创作者与商业内容" : "Creator & Commercial Content"}
        text={
          zh
            ? "将创作者、产品与品牌目的放在同一套内容结构中，支持创作者合作、产品导向社交内容、时尚与美妆整合、伦敦生活方式场景以及竖版和多格式素材。"
            : "Creator campaigns, influencer brand content and product-led social content, with beauty and fashion integration, London lifestyle settings, and vertical or multi-format assets."
        }
        items={
          zh
            ? ["创作者合作", "产品导向社交内容", "伦敦生活方式内容", "多画幅交付"]
            : ["Creator campaigns", "Product-led social", "London lifestyle", "Multi-format delivery"]
        }
        media={[byId("vbm-011"), byId("vbm-014")]}
      />

      <MediaCapabilitySection
        language={language}
        eyebrow={zh ? "人物内容" : "PEOPLE-LED CONTENT"}
        title={zh ? "采访与编辑内容" : "Interviews & Editorial Content"}
        text={
          zh
            ? "为艺人、创作者和编辑式对谈规划长内容与社交短版；按项目范围协调摄影、灯光与收音。群像只用于说明外景制作或演员协同，不作为采访证据。"
            : "Artist and creator interviews, editorial conversations, long-form content and social cutdowns, with camera, lighting and sound coordination where included. Group location imagery is not presented as interview evidence."
        }
        items={
          zh
            ? ["艺人与创作者采访", "编辑式对谈", "长内容与社交短版", "摄影、灯光与收音"]
            : [
                "Artist and creator interviews",
                "Editorial conversations",
                "Long and short form",
                "Camera, light and sound"
              ]
        }
        media={[byId("vbm-024"), byId("vbm-023")]}
      />

      <Section compact className="bg-ink text-pearl">
        <Container className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Eyebrow className="text-champagne">{zh ? "按项目配置" : "PROJECT-SPECIFIC"}</Eyebrow>
            <h2 className="editorial-heading mt-5">{zh ? "人才、妆造与造型" : "Talent, Makeup & Styling"}</h2>
          </div>
          <div>
            <p className="body-large text-pearl/70">
              {zh
                ? "可根据具体项目协调艺人、创作者、主持人、模特、演员、化妆、发型与服装造型。网站不将画面中的人物建立为公开人才名单。"
                : "Artists, creators, presenters, models, actors, makeup, hair and wardrobe styling can be coordinated around the individual brief. People shown are not presented as a public talent roster."}
            </p>
            <p className="mt-8 border-l border-champagne pl-5 text-lg">
              {zh
                ? "人才档期与使用范围将根据具体项目单独确认。"
                : "Talent availability and usage are confirmed per project."}
            </p>
          </div>
        </Container>
      </Section>

      <MediaCapabilitySection
        language={language}
        tone="light"
        reverse
        eyebrow={zh ? "现场项目" : "LIVE PROGRAMMES"}
        title={zh ? "现场活动与文化项目" : "Live Events & Cultural Programmes"}
        text={
          zh
            ? "为演出、文化活动、粉丝活动、创作者活动和媒体区域协调现场采访、摄影、视频与本地执行。核心视觉不使用汽车或纯行业会议画面。"
            : "Concerts, cultural events, fan and creator events, media areas, live interviews, photography, video and local coordination, using entertainment-relevant visual evidence."
        }
        items={
          zh
            ? ["演出与文化活动", "粉丝与创作者活动", "现场采访", "摄影、视频与本地协调"]
            : [
                "Concerts and cultural events",
                "Fan and creator events",
                "Live interviews",
                "Photo, video and local coordination"
              ]
        }
        media={[byId("vbm-008"), byId("vbm-009")]}
      />

      <VisualExperience language={language} collections={collections} />
      <RelatedPaths language={language} paths={sector.relatedPaths} />
    </>
  );
}

export function TechnologyAiResearchPage({
  language,
  sector
}: {
  language: Language;
  sector: ExpertiseDefinition;
}) {
  const zh = language === "zh";
  const collections = capabilityCollectionsForExpertise("technology-ai-research");
  return (
    <>
      <ExpertiseSchema language={language} sector={sector} />
      <EditorialHero
        language={language}
        eyebrow={zh ? "科技、AI与科研" : "TECHNOLOGY, AI & RESEARCH"}
        title={sector.headline?.[language] ?? sector.title[language]}
        intro={sector.intro?.[language] ?? sector.subtitle[language]}
        primary={byId("vbm-003")}
        secondary={byId("vbm-001")}
      />

      <MediaCapabilitySection
        language={language}
        eyebrow={zh ? "核心能力" : "CORE CAPABILITY"}
        title={zh ? "科技与 AI" : "Technology & AI"}
        text={
          zh
            ? "以媒体与制作公司的角色呈现 AI 产品、机器人、智能硬件、产品演示、使用场景、展会内容、发布内容与技术视觉传播。我们不开发 AI 模型，不提供软件或算法咨询，也不为技术有效性背书。"
            : "Media production for AI products, robotics, intelligent hardware, demonstrations, user scenarios, exhibition and launch content, and technical visual communication. We do not develop AI models, provide software or algorithm consulting, or certify technical claims."
        }
        items={
          zh
            ? ["AI 产品与机器人", "智能硬件与产品演示", "使用场景", "技术视觉传播"]
            : [
                "AI products and robotics",
                "Intelligent hardware",
                "Demonstrations and user scenarios",
                "Technical visual communication"
              ]
        }
        media={[byId("vbm-002")]}
        feature
      />

      <MediaCapabilitySection
        language={language}
        reverse
        tone="light"
        eyebrow={zh ? "专业观点" : "EXPERT PERSPECTIVES"}
        title={zh ? "创始人、专家与行业内容" : "Founder, Expert & Industry Content"}
        text={
          zh
            ? "支持创始人采访、专家内容、行业演讲、科技叙事、长短版本与活动现场专家内容。实际为演讲或发布会的画面会准确标注为行业演讲内容，不冒充一对一采访。"
            : "Founder and expert interviews, industry presentations, technology storytelling, long and short-form content, event-based expert content and bilingual communication. Stage presentations are described accurately as industry speaker content."
        }
        items={
          zh
            ? ["创始人与专家采访", "行业演讲", "科技叙事", "双语传播"]
            : [
                "Founder and expert interviews",
                "Industry presentations",
                "Technology storytelling",
                "Bilingual communication"
              ]
        }
        media={[byId("vbm-004"), byId("vbm-005")]}
      />

      <MediaCapabilitySection
        language={language}
        eyebrow={zh ? "英国发布" : "UK LAUNCH"}
        title={zh ? "产品发布、展览与演示" : "Product Launches, Exhibitions & Demonstrations"}
        text={
          zh
            ? "支持产品发布、科技展示、展览、演示拍摄、演讲内容、相关方活动与创新路演，并与“英国发布与现场执行”路径衔接。"
            : "Product launches, technology showcases, exhibitions, demonstration capture, speaker content, stakeholder events and innovation roadshows, connected to the Launch in the UK route."
        }
        items={
          zh
            ? ["产品发布", "科技展示与展览", "演示拍摄", "演讲与相关方活动"]
            : [
                "Product launches",
                "Showcases and exhibitions",
                "Demonstration capture",
                "Speaker and stakeholder content"
              ]
        }
        media={[byId("vbm-010")]}
      />

      <Section compact className="border-y border-ink/10 bg-pearl">
        <Container className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <Eyebrow>{zh ? "科研与创新 · 次级能力" : "RESEARCH & INNOVATION · SECONDARY"}</Eyebrow>
            <h2 className="mt-5 text-4xl font-medium">
              {zh ? "以科研理解为基础的内容传播" : "Research-informed communication"}
            </h2>
          </div>
          <div>
            <p className="body-large text-ink/70">
              {zh
                ? "可支持专家主导传播、技术采访、科研叙事、适用情况下的高校—产业活动、创新传播，以及按项目匹配度与档期协调学术和产业网络。当前没有可公开的高校科研项目媒体，因此不建立案例网格、大学 Logo 墙或背书性栏目。"
                : "Expert-led communication, technical interviews, research storytelling, university–industry events where applicable, innovation communication, and academic or industry network coordination subject to project fit and availability. No university case grid, logo wall or endorsement claim is shown without verified material."}
            </p>
          </div>
        </Container>
      </Section>

      {publicInstitutionRelationships.length > 0 ? (
        <Section compact className="bg-porcelain">
          <Container>
            <Eyebrow>{zh ? "学术、科研与产业联系" : "ACADEMIC & RESEARCH CONNECTIONS"}</Eyebrow>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {publicInstitutionRelationships.map((item) => (
                <div key={item.institutionId} className="border border-ink/10 p-5 text-sm text-ink/60">
                  {zh ? item.publicWordingZh : item.publicWordingEn}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <VisualExperience language={language} collections={collections} />
      <RelatedPaths language={language} paths={sector.relatedPaths} />
    </>
  );
}

function ExpertiseSchema({ language, sector }: { language: Language; sector: ExpertiseDefinition }) {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          lang: language,
          name: sector.title[language],
          description: sector.intro?.[language] ?? sector.subtitle[language],
          path: `/industries/${sector.slug}`
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          lang: language,
          items: [
            { name: "Venus Bridge", path: "/" },
            { name: language === "zh" ? "专业领域" : "Expertise", path: "/expertise" },
            { name: sector.title[language], path: `/industries/${sector.slug}` }
          ]
        })}
      />
    </>
  );
}

function EditorialHero({
  language,
  eyebrow,
  title,
  intro,
  primary,
  secondary
}: {
  language: Language;
  eyebrow: string;
  title: string;
  intro: string;
  primary: CapabilityMedia;
  secondary: CapabilityMedia;
}) {
  return (
    <section className="bg-ink pt-16 text-pearl">
      <Container className="grid gap-10 py-14 lg:min-h-[760px] lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-20">
        <div>
          <Eyebrow className="text-champagne">{eyebrow}</Eyebrow>
          <h1 className="editorial-heading mt-6 max-w-[13ch]">{title}</h1>
          <p className="body-large text-pearl/68 mt-7 max-w-2xl">{intro}</p>
          <p className="mt-8 max-w-xl border-l border-champagne/60 pl-4 text-sm leading-6 text-pearl/55">
            {language === "zh"
              ? "页面图片为经授权的能力媒体；除已通过发布门控的项目外，不代表具名客户案例。"
              : "Images are approved capability media. They are not named client case studies unless separately released through the case gate."}
          </p>
        </div>
        <div className="grid grid-cols-[1.12fr_.88fr] items-end gap-4">
          <CapabilityImage
            media={primary}
            language={language}
            className="aspect-[3/4]"
            sizes="(min-width:1024px) 38vw, 58vw"
            priority
          />
          <CapabilityImage
            media={secondary}
            language={language}
            className="mb-8 aspect-[4/5]"
            sizes="(min-width:1024px) 24vw, 36vw"
            priority
          />
        </div>
      </Container>
    </section>
  );
}

function MediaCapabilitySection({
  language,
  eyebrow,
  title,
  text,
  items,
  media,
  reverse = false,
  tone = "paper",
  feature = false
}: {
  language: Language;
  eyebrow: string;
  title: string;
  text: string;
  items: string[];
  media: CapabilityMedia[];
  reverse?: boolean;
  tone?: "paper" | "light";
  feature?: boolean;
}) {
  return (
    <Section className={tone === "light" ? "bg-porcelain" : "bg-pearl"}>
      <Container
        className={`grid gap-12 lg:items-center ${reverse ? "lg:grid-cols-[1.1fr_.9fr]" : "lg:grid-cols-[.9fr_1.1fr]"}`}
      >
        <div className={reverse ? "lg:order-2" : ""}>
          <Eyebrow className="text-champagne">{eyebrow}</Eyebrow>
          <h2 className="editorial-heading mt-5 max-w-[13ch]">{title}</h2>
          <p className="body-large text-ink/68 mt-6 max-w-2xl">{text}</p>
          <ul className="mt-8 grid gap-3 border-t border-ink/15 pt-6 text-sm sm:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="before:mr-2 before:text-champagne before:content-['—']">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`grid gap-4 ${media.length === 1 ? "grid-cols-1" : "grid-cols-2"} ${reverse ? "lg:order-1" : ""}`}
        >
          {media.map((item, index) => (
            <CapabilityImage
              key={item.id}
              media={item}
              language={language}
              className={`${media.length === 1 ? "aspect-[4/3]" : feature && index === 0 ? "row-span-2 aspect-[3/4]" : "aspect-[4/5]"} ${media.length === 3 && index === 2 ? "col-start-2" : ""}`}
              sizes="(min-width:1024px) 28vw, 50vw"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function VisualExperience({
  language,
  collections
}: {
  language: Language;
  collections: ReturnType<typeof capabilityCollectionsForExpertise>;
}) {
  const zh = language === "zh";
  return (
    <Section compact className="bg-mist">
      <Container>
        <Eyebrow className="text-champagne">{zh ? "精选视觉经验" : "SELECTED VISUAL EXPERIENCE"}</Eyebrow>
        <h2 className="editorial-heading mt-5 max-w-[15ch]">
          {zh
            ? "作为制作能力的视觉样本，而不是客户案例。"
            : "Visual evidence of production capability — not client case studies."}
        </h2>
        <div className="mt-10 grid gap-px bg-ink/15 md:grid-cols-3">
          {collections.slice(0, 3).map((item) => (
            <article key={item.id} className="bg-mist p-7 lg:p-9">
              <p className="text-xs uppercase tracking-editorial text-champagne">
                {zh ? "能力媒体" : "Capability media"}
              </p>
              <h3 className="mt-2 text-2xl font-medium">{zh ? item.titleZh : item.titleEn}</h3>
              <p className="mt-8 text-sm text-ink/55">
                {zh ? `${item.media.length} 张已审核视觉素材` : `${item.media.length} reviewed visual assets`}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function RelatedPaths({
  language,
  paths
}: {
  language: Language;
  paths: ExpertiseDefinition["relatedPaths"];
}) {
  const zh = language === "zh";
  return (
    <Section compact className="bg-ink text-pearl">
      <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Eyebrow className="text-champagne">{zh ? "相关客户路径" : "RELATED PATHS"}</Eyebrow>
          <h2 className="editorial-heading mt-5 max-w-[13ch]">
            {zh ? "从目标出发，选择英国执行路径。" : "Choose the UK route around the objective."}
          </h2>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
            {paths.map((path) => (
              <EditorialLink
                key={path}
                href={withLanguage(`/what-we-do/${path}`, language)}
                className="text-pearl"
              >
                {pathLabels[path][language]}
              </EditorialLink>
            ))}
          </div>
        </div>
        <Link href={withLanguage("/contact", language)} className="border-b border-champagne pb-2 text-sm">
          {zh ? "提交项目需求" : "Send a project brief"}
        </Link>
      </Container>
    </Section>
  );
}
