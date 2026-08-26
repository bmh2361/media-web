"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CapabilityMedia } from "@/content/capability-media";
import type { Language } from "@/lib/i18n";

export function MediaReviewEditor({
  language,
  initialRecords
}: {
  language: Language;
  initialRecords: CapabilityMedia[];
}) {
  const zh = language === "zh";
  const [records, setRecords] = useState(initialRecords);
  const update = (id: string, patch: Partial<CapabilityMedia>) =>
    setRecords((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  const selected = useMemo(() => records.filter((item) => item.usedPublicly).length, [records]);
  return (
    <main className="min-h-screen bg-porcelain pb-24 pt-32 text-ink">
      <div className="container-x">
        <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">
          {zh ? "仅开发环境" : "DEVELOPMENT ONLY"}
        </p>
        <h1 className="mt-4 text-5xl font-medium">{zh ? "Phase 13 媒体审核" : "Phase 13 media review"}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-ink/65">
          {zh
            ? "24张能力媒体均在此显示。可在当前审核会话中调整公开使用、候选状态、页面分配、顺序、裁切和替代文本；正式修改应同步回媒体导入配置。"
            : "All 24 capability assets are shown. Use this review session to adjust publication, candidate status, assignments, order, crops and alt text; commit approved changes back to the import configuration."}
        </p>
        <div className="mt-8 flex gap-6 border-y border-ink/15 py-5 text-sm">
          <span>
            {records.length} {zh ? "张素材" : "assets"}
          </span>
          <span>
            {selected} {zh ? "张公开采用" : "selected publicly"}
          </span>
          <span>24 capability media · 0 case media</span>
        </div>
        <div className="mt-12 grid gap-8 xl:grid-cols-2">
          {records.map((media, index) => (
            <article key={media.id} className="border-ink/12 border bg-pearl p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_120px] items-end gap-4">
                <ReviewImage src={media.publicPath} position={media.objectPositionDesktop} mobile={false} />
                <ReviewImage src={media.mobilePath} position={media.objectPositionMobile} mobile />
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-[10px] uppercase tracking-editorial text-champagne">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{media.id}</span>
                <span>{media.category}</span>
                <span>Capability Media</span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={media.usedPublicly}
                    onChange={(event) => update(media.id, { usedPublicly: event.target.checked })}
                  />
                  {zh ? "公开使用" : "Use publicly"}
                </label>
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={media.heroCandidate}
                    onChange={(event) => update(media.id, { heroCandidate: event.target.checked })}
                  />
                  {zh ? "Hero候选" : "Hero candidate"}
                </label>
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={media.homepageCandidate}
                    onChange={(event) => update(media.id, { homepageCandidate: event.target.checked })}
                  />
                  {zh ? "首页候选" : "Homepage candidate"}
                </label>
                <label className="grid gap-1 text-xs">
                  {zh ? "顺序" : "Order"}
                  <input
                    className="border border-ink/15 bg-white p-2"
                    type="number"
                    value={index + 1}
                    readOnly
                  />
                </label>
                <EditorField
                  label={zh ? "实际使用页面" : "Actual pages"}
                  value={media.actualPages.join(", ")}
                  onChange={(value) =>
                    update(media.id, {
                      actualPages: value
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                    })
                  }
                />
                <EditorField
                  label={zh ? "桌面裁切" : "Desktop crop"}
                  value={media.objectPositionDesktop}
                  onChange={(value) => update(media.id, { objectPositionDesktop: value })}
                />
                <EditorField
                  label={zh ? "移动裁切" : "Mobile crop"}
                  value={media.objectPositionMobile}
                  onChange={(value) => update(media.id, { objectPositionMobile: value })}
                />
                <EditorField
                  label="Alt EN"
                  value={media.altEn}
                  onChange={(value) => update(media.id, { altEn: value })}
                />
                <EditorField
                  label="Alt ZH"
                  value={media.altZh}
                  onChange={(value) => update(media.id, { altZh: value })}
                />
              </div>
              <dl className="mt-5 grid gap-2 border-t border-ink/10 pt-4 text-xs leading-5 text-ink/60">
                <Fact label={zh ? "来源" : "Source"} value={media.sourcePath} />
                <Fact label={zh ? "Web-ready" : "Web-ready"} value={media.webReadyPath} />
                <Fact
                  label={zh ? "原始尺寸" : "Original dimensions"}
                  value={`${media.width} × ${media.height}`}
                />
                <Fact
                  label={zh ? "推荐页面" : "Recommended pages"}
                  value={media.recommendedPages.join(" · ")}
                />
                <Fact
                  label={zh ? "衍生图" : "Derivatives"}
                  value={`AVIF ${kb(media.avifBytes)} · WebP ${kb(media.webpBytes)} · mobile ${kb(media.mobileBytes)} · thumb ${kb(media.thumbnailBytes)}`}
                />
                <Fact label={zh ? "状态" : "Status"} value="capabilityReady: true · caseReady: false" />
              </dl>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

function ReviewImage({ src, position, mobile }: { src: string; position: string; mobile: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-mist ${mobile ? "aspect-[3/4]" : "aspect-video"}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes={mobile ? "120px" : "50vw"}
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <span className="absolute bottom-2 left-2 bg-ink/80 px-2 py-1 text-[10px] uppercase text-pearl">
        {mobile ? "Mobile" : "Desktop"}
      </span>
    </div>
  );
}
function EditorField({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-xs">
      {label}
      <input
        className="border border-ink/15 bg-white p-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-ink">{label}</dt>
      <dd className="break-words">{value}</dd>
    </div>
  );
}
const kb = (value: number) => `${Math.round(value / 1024)} KB`;
