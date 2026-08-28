import Link from "next/link";
import { MediaSlot } from "@/components/media/MediaSlot";
import type { IndustryRecord } from "@/content/pages/industries";
import { withLanguage, type Language } from "@/lib/i18n";

export function IndustryExperience({
  record,
  language,
  showScenarios,
  showMarketEntry
}: {
  record: IndustryRecord;
  language: Language;
  showScenarios: boolean;
  showMarketEntry: boolean;
}) {
  const zh = language === "zh";
  const details = (
    <div>
      <p className="eyebrow text-champagne">{zh ? "进入英国时的常见问题" : "Common UK challenge"}</p>
      <h2 className="editorial-heading mt-5 max-w-[14ch]">{record.title[language]}</h2>
      <p className="body-large mt-6 max-w-2xl text-ink/65">{record.challenge[language]}</p>
      <div className="mt-8 grid gap-6 border-t border-ink/15 pt-6 sm:grid-cols-3">
        <IndustryList
          title={zh ? "Venus Bridge 可承担" : "Venus Bridge role"}
          items={record.capabilities}
          language={language}
        />
        <IndustryList
          title={zh ? "典型内容形式" : "Typical formats"}
          items={record.formats}
          language={language}
        />
        <IndustryList
          title={zh ? "典型交付" : "Typical delivery"}
          items={record.deliverables}
          language={language}
        />
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        {record.detailPath ? (
          <Link
            href={withLanguage(record.detailPath, language)}
            className="inline-flex min-h-11 items-center border-b border-ink px-1 text-sm font-medium"
          >
            {zh ? "查看行业制作详情" : "Explore sector production"} ↗
          </Link>
        ) : null}
        {record.relatedServicePaths.map((path) => (
          <Link
            key={path}
            href={withLanguage(path, language)}
            className="inline-flex min-h-11 items-center border-b border-ink px-1 text-sm font-medium"
          >
            {zh ? "相关服务" : "Related service"} ↗
          </Link>
        ))}
        {showScenarios && record.relatedWorkFilter ? (
          <Link
            href={withLanguage("/work", language)}
            className="inline-flex min-h-11 items-center border-b border-ink px-1 text-sm font-medium"
          >
            {zh ? "相关制作场景" : "Related production scenario"} ↗
          </Link>
        ) : null}
        {showMarketEntry &&
        ["fashion-beauty-apparel", "ai-technology-robotics", "automotive-mobility"].includes(record.key) ? (
          <Link
            href={withLanguage("/services/uk-market-entry", language)}
            className="inline-flex min-h-11 items-center border-b border-ink px-1 text-sm font-medium"
          >
            {zh ? "该行业的英国市场进入协同" : "UK market entry for this sector"} ↗
          </Link>
        ) : null}
      </div>
    </div>
  );

  if (record.variant === "systems" || record.variant === "channel-matrix") {
    return (
      <section id={record.key} className="section-y scroll-mt-32 border-t border-ink/10 bg-mist">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          {details}
          <div className="grid gap-3 rounded-[18px] bg-ink p-5 text-pearl sm:grid-cols-2">
            {[...record.formats, ...record.deliverables].map((item, index) => (
              <div key={item.en} className="min-h-32 border border-pearl/15 p-4">
                <span className="text-xs text-champagne">0{index + 1}</span>
                <p className="mt-8 text-lg">{item[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (record.variant === "publication" || record.variant === "sequence") {
    return (
      <section id={record.key} className="section-y scroll-mt-32 border-t border-ink/10 bg-pearl">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <MediaSlot
              id={record.mediaIds[0]}
              language={language}
              showCaption={false}
              sizes="(min-width:1024px) 38vw,100vw"
              className={record.variant === "publication" ? "aspect-[3/4]" : "aspect-[4/3]"}
            />
            {details}
          </div>
          {record.variant === "sequence" ? (
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {record.mediaIds.slice(0, 3).map((id) => (
                <MediaSlot
                  key={id}
                  id={id}
                  language={language}
                  showCaption={false}
                  className="aspect-[4/3]"
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section
      id={record.key}
      className={`scroll-mt-32 border-t border-ink/10 ${record.variant === "cinematic" ? "bg-night py-16 text-pearl" : "bg-porcelain py-16"}`}
    >
      <div className="container-x">
        <MediaSlot
          id={record.mediaIds[0]}
          language={language}
          showCaption={false}
          sizes="100vw"
          className="aspect-[16/7]"
        />
        <div
          className={`mt-10 ${record.variant === "cinematic" ? "[&_a]:border-pearl [&_a]:text-pearl [&_h2]:text-pearl [&_li]:text-pearl/80 [&_p]:text-pearl/70" : ""}`}
        >
          {details}
        </div>
      </div>
    </section>
  );
}

function IndustryList({
  title,
  items,
  language
}: {
  title: string;
  items: IndustryRecord["capabilities"];
  language: Language;
}) {
  return (
    <div>
      <p className="eyebrow text-slate">{title}</p>
      <ul className="mt-3 space-y-2 text-base leading-7">
        {items.map((item) => (
          <li key={item.en}>{item[language]}</li>
        ))}
      </ul>
    </div>
  );
}
