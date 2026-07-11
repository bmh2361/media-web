import Link from "next/link";
import { MediaSlot } from "@/components/media/MediaSlot";
import type { IndustryRecord, IndustryVariant } from "@/content/pages/industries";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

type Props = { record: IndustryRecord; language: Language };

function Copy({ record, language }: Props) {
  const labels =
    language === "zh"
      ? ["商业挑战", "相关能力", "常见形式", "预期交付"]
      : ["Commercial challenge", "Capabilities", "Formats", "Deliverables"];
  const groups: Array<[string, string[]]> = [
    [labels[0], [record.challenge[language]]],
    [labels[1], record.capabilities.map((item) => item[language])],
    [labels[2], record.formats.map((item) => item[language])],
    [labels[3], record.deliverables.map((item) => item[language])]
  ];
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {groups.map(([label, values]) => (
        <div key={label} className="border-current/20 border-t pt-4">
          <p className="text-xs uppercase tracking-editorial opacity-50">{label}</p>
          <p className="mt-4 leading-7 opacity-75">{values.join(" · ")}</p>
        </div>
      ))}
    </div>
  );
}

function Links({ record, language }: Props) {
  return (
    <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-blue">
      {record.relatedServicePaths.map((path) => (
        <Link key={path} href={withLanguage(path, language)}>
          {language === "zh" ? "相关服务" : "Related service"} →
        </Link>
      ))}
      <Link href={withLanguage("/work", language)}>
        {language === "zh" ? "查看项目模式" : "Explore Project Models"} →
      </Link>
    </div>
  );
}

function Editorial({ record, language }: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <Copy record={record} language={language} />
        <Links record={record} language={language} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MediaSlot id={record.mediaIds[0]} language={language} className="aspect-[4/5]" />
        <MediaSlot id={record.mediaIds[1]} language={language} className="mt-12 aspect-[3/2]" />
        <MediaSlot id={record.mediaIds[2]} language={language} className="col-span-2 aspect-[16/7]" />
      </div>
    </div>
  );
}
function Systems({ record, language }: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
      <div className="border border-blue/30 bg-ink p-6 text-pearl">
        <p className="text-xs uppercase tracking-editorial text-blueBright">
          {language === "zh" ? "内容流程" : "Content flow"}
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            language === "zh" ? "产品用例" : "Product use case",
            language === "zh" ? "审核演示" : "Reviewed demonstration",
            language === "zh" ? "渠道交付" : "Channel delivery"
          ].map((step) => (
            <p key={step} className="border border-pearl/20 p-4 text-sm">
              {step}
            </p>
          ))}
        </div>
        <div className="mt-5">
          <Copy record={record} language={language} />
        </div>
        <Links record={record} language={language} />
      </div>
      <MediaSlot id={record.mediaIds[0]} language={language} className="aspect-[4/5]" />
    </div>
  );
}
function Cinematic({ record, language }: Props) {
  return (
    <>
      <MediaSlot id={record.mediaIds[0]} language={language} className="aspect-[16/7]" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <MediaSlot id={record.mediaIds[1]} language={language} className="aspect-[4/3]" />
        <div>
          <Copy record={record} language={language} />
          <Links record={record} language={language} />
        </div>
      </div>
    </>
  );
}
function Publication({ record, language }: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-[.7fr_1fr_.7fr]">
      <MediaSlot id={record.mediaIds[0]} language={language} className="aspect-[4/5]" />
      <div className="columns-1 gap-8 md:columns-2">
        <Copy record={record} language={language} />
      </div>
      <div>
        <MediaSlot id={record.mediaIds[1]} language={language} className="aspect-square" />
        <Links record={record} language={language} />
      </div>
    </div>
  );
}
function Sequence({ record, language }: Props) {
  const steps =
    language === "zh" ? ["舞台", "访谈", "观众", "回顾"] : ["Stage", "Interview", "Audience", "Recap"];
  return (
    <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
      <div>
        <Copy record={record} language={language} />
        <Links record={record} language={language} />
      </div>
      <div>
        <div className="grid grid-cols-4 gap-px bg-ink/20">
          {steps.map((step) => (
            <p key={step} className="bg-pearl p-4 text-xs uppercase tracking-editorial">
              {step}
            </p>
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <MediaSlot id={record.mediaIds[0]} language={language} className="aspect-[4/3]" />
          <MediaSlot id={record.mediaIds[1]} language={language} className="aspect-[4/3]" />
        </div>
      </div>
    </div>
  );
}
function ChannelMatrix({ record, language }: Props) {
  const channels =
    language === "zh" ? ["电商", "社媒", "零售", "创作者"] : ["E-commerce", "Social", "Retail", "Creator"];
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
      <div>
        <div className="grid grid-cols-2 gap-px bg-ink/20">
          {channels.map((channel) => (
            <p key={channel} className="bg-porcelain p-5 text-sm font-semibold">
              {channel}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <Copy record={record} language={language} />
        </div>
        <Links record={record} language={language} />
      </div>
      <MediaSlot id={record.mediaIds[0]} language={language} className="aspect-[4/5]" />
    </div>
  );
}

const variants: Record<IndustryVariant, (props: Props) => React.ReactNode> = {
  editorial: Editorial,
  systems: Systems,
  cinematic: Cinematic,
  publication: Publication,
  sequence: Sequence,
  "channel-matrix": ChannelMatrix
};

export function IndustryExperience({ record, language }: Props) {
  const Variant = variants[record.variant];
  return (
    <section
      data-industry-variant={record.variant}
      className="section-y border-t border-ink/10 bg-porcelain text-ink even:bg-ink even:text-pearl"
    >
      <div className="container-x">
        <p className="text-xs uppercase tracking-editorial text-champagne">{record.variant}</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight">{record.title[language]}</h2>
        <Variant record={record} language={language} />
      </div>
    </section>
  );
}
