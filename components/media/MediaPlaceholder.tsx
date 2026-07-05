import Image from "next/image";
import { media, type MediaId } from "@/content/media";
import type { Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function MediaPlaceholder({
  id,
  language,
  className,
  imageClassName,
  captionClassName,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  showCaption = true
}: {
  id: MediaId;
  language: Language;
  className?: string;
  imageClassName?: string;
  captionClassName?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
}) {
  const item = media[id];

  return (
    <figure className={cn("group relative overflow-hidden rounded-lg bg-ink shadow-cinematic", className)}>
      <Image
        src={item.src}
        alt={item.alt[language]}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover transition duration-700 group-hover:scale-[1.025]", imageClassName)}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,13,16,0.04),rgba(11,13,16,0.72))]" />
      {showCaption ? (
        <figcaption className={cn("absolute bottom-4 left-4 right-4 border-t border-pearl/20 pt-3 text-pearl", captionClassName)}>
          <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">
            {language === "zh" ? "媒体占位" : "Media placeholder"}
          </p>
          <p className="mt-2 text-sm leading-5 text-pearl/78">{item.replacementNote[language]}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}
