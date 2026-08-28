import type { CSSProperties } from "react";
import Image from "next/image";
import { getMediaPresentationProfile } from "@/content/media/presentation";
import type { Language } from "@/lib/i18n";

type ArtDirectedMedia = {
  id: string;
  altEn: string;
  altZh: string;
  publicPath: string;
  avifPath?: string;
  mobilePath?: string;
  mobileAvifPath?: string;
  objectPositionDesktop?: string;
  objectPositionMobile?: string;
  width?: number;
  height?: number;
  outputWidth?: number;
  outputHeight?: number;
};

type ArtDirectedImageProps = {
  media: ArtDirectedMedia;
  language: Language;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain" | "natural";
  contentRole?: string;
  desktopFocalPoint?: { x: number; y: number };
  mobileFocalPoint?: { x: number; y: number };
  mediaRole?:
    | "hero-landscape"
    | "hero-portrait"
    | "proof-landscape"
    | "proof-portrait"
    | "card-landscape"
    | "mosaic-fill"
    | "editorial-natural";
};

const backgroundClasses = {
  "rich-black": "bg-[var(--media-bg-rich-black)]",
  graphite: "bg-[var(--media-bg-graphite)]",
  "soft-ivory": "bg-[var(--media-bg-soft-ivory)]",
  "warm-neutral": "bg-[var(--media-bg-warm-neutral)]",
  "cool-neutral": "bg-[var(--media-bg-cool-neutral)]",
  "image-derived-muted": "bg-[var(--media-bg-image-derived-muted)]",
  transparent: "bg-transparent"
};

export function ArtDirectedImage({
  media,
  language,
  className = "",
  sizes = "100vw",
  priority = false,
  fit,
  contentRole,
  mediaRole,
  desktopFocalPoint,
  mobileFocalPoint
}: ArtDirectedImageProps) {
  const profile = getMediaPresentationProfile(media.id);
  if (!profile || fit === "natural") {
    const width = media.outputWidth ?? media.width ?? 1600;
    const height = media.outputHeight ?? media.height ?? 900;
    return (
      <figure
        className={`relative overflow-hidden bg-mist ${className}`}
        data-media-id={media.id}
        data-content-role={contentRole}
        data-media-role={mediaRole}
        data-natural-ratio={fit === "natural" || undefined}
      >
        <picture>
          {media.mobileAvifPath ? (
            <source media="(max-width: 767px)" srcSet={media.mobileAvifPath} type="image/avif" />
          ) : null}
          {media.mobilePath ? (
            <source media="(max-width: 767px)" srcSet={media.mobilePath} type="image/webp" />
          ) : null}
          {media.avifPath ? <source srcSet={media.avifPath} type="image/avif" /> : null}
          <Image
            src={media.publicPath}
            alt={language === "zh" ? media.altZh : media.altEn}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
            loading={priority ? "eager" : "lazy"}
            style={{ objectPosition: media.objectPositionDesktop ?? "50% 50%" }}
            className={
              fit === "natural"
                ? "h-auto w-full"
                : `h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`
            }
          />
        </picture>
      </figure>
    );
  }

  const imageFit = fit ?? (profile.preferredFit === "cover" ? "cover" : "contain");
  const useUnpaddedSource = imageFit === "cover" && profile.preferredFit !== "cover";
  const desktopPosition = desktopFocalPoint
    ? `${desktopFocalPoint.x * 100}% ${desktopFocalPoint.y * 100}%`
    : profile.desktopObjectPosition;
  const mobilePosition = mobileFocalPoint
    ? `${mobileFocalPoint.x * 100}% ${mobileFocalPoint.y * 100}%`
    : profile.mobileObjectPosition;
  const style = {
    "--media-aspect-desktop": profile.desktopAspectRatio,
    "--media-aspect-tablet": profile.tabletAspectRatio,
    "--media-aspect-mobile": profile.mobileAspectRatio,
    "--media-position-desktop": desktopPosition,
    "--media-position-tablet": profile.tabletObjectPosition,
    "--media-position-mobile": mobilePosition
  } as CSSProperties;

  return (
    <figure
      className={`art-directed-image relative overflow-hidden ${backgroundClasses[profile.backgroundTreatment]} ${className}`}
      style={style}
      data-art-directed-image
      data-media-id={media.id}
      data-subject-type={profile.subjectType}
      data-preferred-fit={profile.preferredFit}
      data-focal-point={`${profile.focalPoint.x},${profile.focalPoint.y}`}
      data-protected-area={`${profile.protectedArea.left},${profile.protectedArea.top},${profile.protectedArea.right},${profile.protectedArea.bottom}`}
      data-content-role={contentRole}
      data-media-role={mediaRole}
    >
      <picture data-source-treatment={useUnpaddedSource ? "unpadded-cover" : "art-directed"}>
        <source
          media="(max-width: 767px)"
          srcSet={
            useUnpaddedSource
              ? (media.mobileAvifPath ?? media.mobilePath ?? media.publicPath)
              : profile.mobileAvifPath
          }
          type={useUnpaddedSource && !media.mobileAvifPath ? "image/webp" : "image/avif"}
        />
        {useUnpaddedSource && media.mobileAvifPath && media.mobilePath ? (
          <source media="(max-width: 767px)" srcSet={media.mobilePath} type="image/webp" />
        ) : null}
        {!useUnpaddedSource ? (
          <source media="(max-width: 767px)" srcSet={profile.mobileWebpPath} type="image/webp" />
        ) : null}
        {!useUnpaddedSource ? (
          <source media="(max-width: 1023px)" srcSet={profile.tabletAvifPath} type="image/avif" />
        ) : null}
        {!useUnpaddedSource ? (
          <source media="(max-width: 1023px)" srcSet={profile.tabletWebpPath} type="image/webp" />
        ) : null}
        <source
          srcSet={useUnpaddedSource ? (media.avifPath ?? media.publicPath) : profile.desktopAvifPath}
          type={useUnpaddedSource && !media.avifPath ? "image/webp" : "image/avif"}
        />
        {useUnpaddedSource && media.avifPath ? <source srcSet={media.publicPath} type="image/webp" /> : null}
        {!useUnpaddedSource ? <source srcSet={profile.desktopWebpPath} type="image/webp" /> : null}
        <Image
          src={useUnpaddedSource ? media.publicPath : profile.desktopJpegPath}
          alt={language === "zh" ? profile.altZh : profile.altEn}
          width={profile.desktopWidth}
          height={profile.desktopHeight}
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          unoptimized
          className={`h-full w-full ${imageFit === "cover" ? "object-cover" : "object-contain"}`}
        />
      </picture>
      {profile.overlay !== "none" ? (
        <span className={`media-overlay media-overlay-${profile.overlay}`} />
      ) : null}
    </figure>
  );
}

export function EditorialImage(props: ArtDirectedImageProps) {
  return <ArtDirectedImage {...props} />;
}

export function ProductImage(props: ArtDirectedImageProps) {
  return <ArtDirectedImage {...props} fit="contain" />;
}

export function PortraitImage(props: ArtDirectedImageProps) {
  return <ArtDirectedImage {...props} fit="contain" />;
}

export function ProjectHeroMedia(props: ArtDirectedImageProps) {
  return <ArtDirectedImage {...props} priority />;
}

export function MediaGallery({
  items,
  language
}: {
  items: Array<{ media: ArtDirectedMedia; className: string; sizes: string }>;
  language: Language;
}) {
  return (
    <div className="mt-20 grid gap-5 md:grid-cols-12" data-media-gallery>
      {items.map((item) => (
        <EditorialImage
          key={item.media.id}
          media={item.media}
          language={language}
          className={item.className}
          sizes={item.sizes}
          fit="cover"
          contentRole="case-media"
          mediaRole={
            getMediaPresentationProfile(item.media.id)?.subjectType === "single-person"
              ? "proof-portrait"
              : "proof-landscape"
          }
        />
      ))}
    </div>
  );
}
