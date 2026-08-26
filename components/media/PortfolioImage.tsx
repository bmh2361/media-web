import { ArtDirectedImage } from "@/components/media/ArtDirectedImage";
import type { PortfolioMedia } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";

export function PortfolioImage({
  media,
  language,
  className = "",
  sizes = "100vw",
  priority = false,
  fit = "cover",
  mediaRole,
  desktopFocalPoint,
  mobileFocalPoint
}: {
  media: PortfolioMedia;
  language: Language;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain" | "natural";
  mediaRole?: "hero-landscape" | "hero-portrait" | "proof-landscape" | "proof-portrait" | "card-landscape" | "mosaic-fill" | "editorial-natural";
  desktopFocalPoint?: { x: number; y: number };
  mobileFocalPoint?: { x: number; y: number };
}) {
  return (
    <ArtDirectedImage
      media={media}
      language={language}
      className={className}
      sizes={sizes}
      priority={priority}
      fit={fit}
      contentRole="case-media"
      mediaRole={mediaRole}
      desktopFocalPoint={desktopFocalPoint}
      mobileFocalPoint={mobileFocalPoint}
    />
  );
}
