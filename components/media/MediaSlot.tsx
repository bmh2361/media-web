"use client";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import { media, type MediaId } from "@/content/media";
import type { Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const positions = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right"
};
export function MediaSlot({
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
  const item = media[id],
    guides = process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_SHOW_MEDIA_GUIDES === "true",
    reduced = useReducedMotion(),
    [failed, setFailed] = useState(false);
  const type = item.type ?? "image";
  const position = positions[item.safeArea ?? "center"];
  const restricted = item.publicationStatus === "restricted";
  const fallback = (
    <div
      className="absolute inset-0 bg-[linear-gradient(135deg,#14171c,#242830)]"
      role="img"
      aria-label={item.alt[language]}
    />
  );
  return (
    <figure
      data-media-id={id}
      style={{ aspectRatio: item.aspectRatio }}
      className={cn("group relative overflow-hidden bg-ink", className)}
    >
      {failed || restricted ? (
        fallback
      ) : type === "video" ? (
        <video
          src={item.src}
          poster={item.poster ?? "/media/placeholders/video-placeholder.svg"}
          muted={item.muted !== false}
          loop={item.loop}
          autoPlay={Boolean(item.autoPlay && !reduced)}
          controls={item.controls !== false}
          playsInline
          preload="metadata"
          aria-label={item.alt[language]}
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", position, imageClassName)}
        />
      ) : (
        <Image
          src={item.src}
          alt={type === "diagram" && item.decorative ? "" : item.alt[language]}
          aria-hidden={(type === "diagram" && item.decorative) || undefined}
          fill
          priority={priority || item.priority}
          sizes={sizes}
          onError={() => setFailed(true)}
          className={cn(
            "object-cover transition-transform duration-700 group-hover:scale-[1.018]",
            position,
            imageClassName
          )}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
      />
      {guides && !restricted && showCaption ? (
        <figcaption
          className={cn(
            "absolute bottom-3 left-3 right-3 border-t border-pearl/20 bg-ink/70 p-3 text-pearl backdrop-blur-sm",
            captionClassName
          )}
        >
          <p className="text-[10px] font-semibold uppercase tracking-editorial text-champagne">
            {id} · {type} · {item.aspectRatio ?? "unspecified"}
          </p>
          {item.replacementNote && (
            <p className="mt-1 text-xs leading-5 text-pearl/80">{item.replacementNote[language]}</p>
          )}
          {item.suggestedContent && (
            <p className="mt-1 text-xs text-pearl/60">
              {item.suggestedContent[language]} · safe area: {item.safeArea ?? "center"} · video:{" "}
              {item.videoSuitable ? "suitable" : "still"}
            </p>
          )}
          {item.composition && <p className="mt-1 text-xs text-pearl/60">{item.composition[language]}</p>}
        </figcaption>
      ) : null}
    </figure>
  );
}
