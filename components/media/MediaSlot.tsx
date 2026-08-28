"use client";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { media, type MediaId } from "@/content/media";
import type { Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { mediaTransition } from "@/lib/motion-system";

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
  showCaption = true,
  reveal = "crossfade"
}: {
  id: MediaId;
  language: Language;
  className?: string;
  imageClassName?: string;
  captionClassName?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
  reveal?: "curtain" | "crossfade";
}) {
  const item = media[id],
    guides = process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_SHOW_MEDIA_GUIDES === "true",
    reduced = useReducedMotion(),
    [mobile, setMobile] = useState(false),
    [constrainedConnection, setConstrainedConnection] = useState(false),
    [failed, setFailed] = useState(false),
    [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: {
          saveData?: boolean;
          effectiveType?: string;
          addEventListener?: (type: string, listener: () => void) => void;
          removeEventListener?: (type: string, listener: () => void) => void;
        };
      }
    ).connection;
    const sync = () =>
      setConstrainedConnection(
        Boolean(connection?.saveData || /(?:^|-)2g|3g/.test(connection?.effectiveType ?? ""))
      );
    sync();
    connection?.addEventListener?.("change", sync);
    return () => connection?.removeEventListener?.("change", sync);
  }, []);
  const type = item.type ?? "image";
  const position = positions[item.safeArea ?? "center"];
  const source = mobile && item.mobileSource ? item.mobileSource : item.src;
  const objectPosition = `${item.focalPoint.x}% ${item.focalPoint.y}%`;
  const restricted = item.publicationStatus === "restricted";
  const fallbackTone =
    id.includes("talent") || id.includes("fashion") || id.includes("beauty")
      ? "from-[#5e5047] via-[#2d2928] to-[#151618]"
      : id.includes("event")
        ? "from-[#55462f] via-[#282624] to-[#111214]"
        : id.includes("tech") || id.includes("research")
          ? "from-[#394247] via-[#25292b] to-[#111315]"
          : "from-[#554c42] via-[#292827] to-[#121315]";
  const fallback = (
    <div
      className={cn("absolute inset-0 overflow-hidden bg-gradient-to-br", fallbackTone)}
      role="img"
      aria-label={item.alt[language]}
    >
      <div className="absolute inset-[8%] border border-pearl/15" />
      <div className="absolute -right-[12%] top-[12%] aspect-square w-[60%] rounded-full border border-pearl/10" />
      <div className="media-grain absolute inset-0 opacity-25" />
    </div>
  );
  return (
    <figure
      data-media-id={id}
      data-media-state={failed ? "failed" : loaded ? "loaded" : "loading"}
      style={{ aspectRatio: item.aspectRatio }}
      className={cn("group relative w-full max-w-full overflow-hidden bg-graphite", className)}
    >
      {failed || restricted ? (
        fallback
      ) : type === "video" && (reduced || constrainedConnection) ? (
        <Image
          src={item.poster ?? item.src}
          alt={item.alt[language]}
          fill
          sizes={sizes}
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className={cn("object-cover", position, imageClassName)}
          style={{ objectPosition }}
        />
      ) : type === "video" ? (
        <video
          src={source}
          poster={item.poster}
          muted={item.muted !== false}
          loop={item.loop}
          autoPlay={Boolean(item.autoPlay && !reduced && !mobile && !constrainedConnection)}
          controls={item.controls !== false}
          playsInline
          preload="metadata"
          aria-label={item.alt[language]}
          onError={() => setFailed(true)}
          onLoadedData={() => setLoaded(true)}
          className={cn("h-full w-full object-cover", position, imageClassName)}
          style={{ objectPosition }}
        >
          {item.captions?.[language] ? (
            <track kind="captions" src={item.captions[language]} srcLang={language} default />
          ) : null}
        </video>
      ) : (
        <Image
          src={source}
          alt={type === "diagram" && item.decorative ? "" : item.alt[language]}
          aria-hidden={(type === "diagram" && item.decorative) || undefined}
          fill
          priority={priority || item.priority}
          sizes={sizes}
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className={cn(
            "object-cover transition-transform duration-700 group-hover:scale-[1.018]",
            position,
            imageClassName,
            !loaded && "opacity-0"
          )}
          style={{ objectPosition }}
        />
      )}
      {!failed && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-graphite"
          initial={false}
          animate={
            loaded
              ? reduced
                ? { opacity: 0 }
                : reveal === "curtain"
                  ? { clipPath: "inset(0 0 100% 0)" }
                  : { opacity: 0 }
              : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
          }
          transition={reduced ? { duration: 0.01 } : mediaTransition}
        >
          <div className="media-loading-shimmer absolute inset-0" />
        </motion.div>
      )}
      <AnimatePresence>
        {loaded && !failed && !reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-pearl/10"
            initial={{ opacity: 0.35 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: mediaTransition.duration }}
          />
        )}
      </AnimatePresence>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
      />
      {showCaption && item.caption && !guides ? (
        <figcaption
          className={cn("absolute bottom-3 left-3 right-3 text-xs leading-5 text-pearl/80", captionClassName)}
        >
          {item.caption[language]}
          {item.credit ? <span className="ml-2 text-pearl/50">© {item.credit}</span> : null}
        </figcaption>
      ) : null}
      {guides && !restricted && showCaption ? (
        <figcaption
          className={cn(
            "absolute bottom-3 left-3 right-3 border-t border-pearl/20 bg-ink/70 p-3 text-pearl backdrop-blur-sm",
            captionClassName
          )}
        >
          <p className="text-[10px] font-semibold uppercase tracking-editorial text-champagne">
            {id} · {type} · {item.aspectRatio ?? "unspecified"} · {item.approvalStatus}
          </p>
          <p className="mt-1 text-xs text-pearl/70">
            {item.route} · {item.section} · focal {item.focalPoint.x}/{item.focalPoint.y}
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
