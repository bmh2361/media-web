import { notFound } from "next/navigation";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { portfolioProjects } from "@/content/portfolio";
import { isSupportedLocale, type Language, withLanguage } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const automotiveProjects = portfolioProjects.filter((project) => project.sector === "automotive");
const heroProject = automotiveProjects.find((project) => project.slug === "byd-bd11-london")!;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) return {};
  return buildMetadata({
    lang,
    path: "/industries/automotive",
    title:
      lang === "zh"
        ? "汽车内容制作、品牌发布与道路影像｜Venus Bridge"
        : "Automotive Production, Brand Launches & Road Content | Venus Bridge",
    description:
      lang === "zh"
        ? "面向英国与欧洲市场的汽车发布、展会、产品展示、道路影像与双语本地制作支持。"
        : "Automotive launch, exhibition, product, road and bilingual local-production content across the UK and Europe."
  });
}

export default async function AutomotivePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const language: Language = lang;
  const zh = language === "zh";
  const hero = heroProject.media.find((media) => media.category === "hero")!;
  const capabilityGroups = [
    {
      title: zh ? "品牌发布与现场活动" : "Brand Launches & Live Events",
      text: zh
        ? "记录舞台演示、车辆亮相、演讲者、嘉宾与现场环境，形成适用于品牌、公关与自有渠道的视觉素材。"
        : "Capture presentations, vehicle reveals, speakers, guests and venue context for brand, press and owned-channel use.",
      items: zh
        ? ["发布活动摄影", "舞台与演讲记录", "嘉宾与车辆互动"]
        : ["Launch photography", "Stage and speaker capture", "Guest and vehicle interaction"]
    },
    {
      title: zh ? "产品与车辆内容" : "Product & Vehicle Content",
      text: zh
        ? "围绕车辆外观、内饰、产品细节与展示环境建立清晰的内容层级。"
        : "Build a clear visual hierarchy around exterior, interior, product detail and display environment.",
      items: zh
        ? ["外观与内饰", "产品细节", "展台与展示空间"]
        : ["Exterior and interior", "Product details", "Stand and showroom context"]
    },
    {
      title: zh ? "道路与生活方式制作" : "Road & Lifestyle Production",
      text: zh
        ? "在英国或欧洲城市、公路与生活方式环境中拍摄车辆与地点之间的关系。"
        : "Place vehicles within UK or European city, road and lifestyle environments.",
      items: zh
        ? ["道路影像", "城市环境", "现场车辆拍摄"]
        : ["Road imagery", "Urban context", "On-location vehicle capture"]
    },
    {
      title: zh ? "展会与利益相关方内容" : "Exhibition & Stakeholder Content",
      text: zh
        ? "将展台、产品、演讲、采访与观众互动纳入一套有序的现场拍摄计划。"
        : "Bring stands, products, presentations, interviews and visitor interaction into one ordered capture plan.",
      items: zh
        ? ["展会摄影", "采访与主持", "社交与公关素材"]
        : ["Exhibition photography", "Interview and presenter content", "Social and press assets"]
    }
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd({
          lang: language,
          items: [
            { name: "Venus Bridge", path: "/" },
            { name: zh ? "行业" : "Industries", path: "/industries" },
            { name: zh ? "汽车" : "Automotive", path: "/industries/automotive" }
          ]
        })}
      />
      <section className="bg-ink pt-32 text-pearl">
        <Container className="grid gap-10 pb-14 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <Eyebrow className="text-champagne">{zh ? "汽车与出行" : "Automotive & Mobility"}</Eyebrow>
            <h1 className="mt-6 max-w-[14ch] text-[clamp(2.8rem,5.4vw,5.8rem)] font-medium leading-[.98] tracking-[-.045em]">
              {zh
                ? "汽车内容制作、品牌发布与道路影像"
                : "Automotive Production, Brand Launches & Road Content"}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-pearl/65">
              {zh
                ? "为进入英国和欧洲市场的汽车、出行与技术品牌提供发布、展会、产品、道路与双语本地制作支持。"
                : "Launch, exhibition, product, road and bilingual local-production support for automotive, mobility and technology brands entering UK and European markets."}
            </p>
          </div>
          <PortfolioImage
            media={hero}
            language={language}
            className="aspect-[16/10]"
            priority
            sizes="(min-width:1024px) 55vw, 100vw"
          />
        </Container>
      </section>

      <Section className="bg-porcelain">
        <Container>
          <Eyebrow>{zh ? "我们制作什么" : "What we produce"}</Eyebrow>
          <h2 className="editorial-heading mt-5 max-w-[14ch]">
            {zh
              ? "发布、产品、道路与现场内容，不是车辆销售页面。"
              : "Launch, product, road and live content — not an automotive sales catalogue."}
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {capabilityGroups.map((group, index) => (
              <article key={group.title} className="border-t border-ink/15 py-7 md:px-6">
                <span className="text-xs text-champagne">0{index + 1}</span>
                <h3 className="mt-5 text-3xl font-medium">{group.title}</h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-ink/65">{group.text}</p>
                <p className="mt-5 text-sm text-ink/50">{group.items.join(" · ")}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-pearl">
        <Container>
          <Eyebrow>{zh ? "精选汽车项目" : "Selected automotive projects"}</Eyebrow>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {automotiveProjects.slice(0, 4).map((project, index) => {
              const cover = project.media.find((media) => media.category === "cover")!;
              return (
                <article key={project.slug} className={index === 0 ? "lg:col-span-2" : ""}>
                  <PortfolioImage
                    media={cover}
                    language={language}
                    className={index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}
                    sizes={index === 0 ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 33vw, 100vw"}
                  />
                  <h3 className="mt-5 text-2xl font-medium">{zh ? project.titleZh : project.titleEn}</h3>
                  <p className="mt-3 text-sm text-ink/55">
                    {[project.location, project.year].filter(Boolean).join(" · ")}
                  </p>
                  <EditorialLink href={withLanguage(`/work/${project.slug}`, language)} className="mt-4">
                    {zh ? "查看项目" : "View project"}
                  </EditorialLink>
                </article>
              );
            })}
          </div>
          <EditorialLink href={withLanguage("/work#production-experience", language)} className="mt-10">
            {zh ? "查看全部汽车制作经验" : "View all automotive production experience"}
          </EditorialLink>
        </Container>
      </Section>

      <Section className="bg-night text-pearl">
        <Container className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Eyebrow className="text-champagne">{zh ? "制作场景" : "Production Scenario"}</Eyebrow>
            <h2 className="editorial-heading mt-5 max-w-[12ch]">
              {zh ? "汽车发布与路演制作" : "Automotive Launch & Roadshow Production"}
            </h2>
            <p className="mt-6 text-base leading-7 text-pearl/60">
              {zh
                ? "以下是能力说明，不是现有汽车图片所证明的完整路演交付记录。"
                : "This is a capability route, not a claim that the real automotive images evidence a completed roadshow delivery."}
            </p>
          </div>
          <div className="grid gap-px border border-champagne/30 bg-pearl/10 sm:grid-cols-2">
            {(zh
              ? [
                  "路演形式规划",
                  "场地协调",
                  "产品展示",
                  "主持人与采访",
                  "双语活动材料",
                  "摄影与视频",
                  "嘉宾动线",
                  "多城市本地制作",
                  "社交与公关素材",
                  "会后素材交接"
                ]
              : [
                  "Roadshow format development",
                  "Venue coordination",
                  "Product presentation",
                  "Presenter and interview coordination",
                  "Bilingual event materials",
                  "Photography and video",
                  "Guest and stakeholder flow",
                  "Multi-city local production",
                  "Social and press content",
                  "Post-event asset handoff"
                ]
            ).map((item, index) => (
              <p key={item} className="bg-night p-5 text-sm leading-6">
                <span className="mr-3 text-champagne">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-porcelain">
        <Container className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>{zh ? "英国与欧洲制作支持" : "UK & European production support"}</Eyebrow>
            <h2 className="editorial-heading mt-5 max-w-[14ch]">
              {zh
                ? "把车辆、地点、人员与内容交付接入同一条执行路线。"
                : "Connect vehicles, locations, people and content handoff through one delivery route."}
            </h2>
          </div>
          <ButtonLink href={withLanguage("/contact?project=events&brief=full", language)} showArrow>
            {zh ? "讨论汽车项目" : "Discuss an automotive brief"}
          </ButtonLink>
        </Container>
      </Section>
    </>
  );
}
