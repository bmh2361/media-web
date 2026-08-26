import { ArtDirectedImage } from "@/components/media/ArtDirectedImage";
import type { CapabilityMedia } from "@/content/capability-media";
import type { Language } from "@/lib/i18n";

export function CapabilityImage({
  media,
  language,
  className = "",
  sizes = "100vw",
  priority = false,
  fit = "cover",
  mediaRole
}: {
  media: CapabilityMedia;
  language: Language;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  mediaRole?: "hero-landscape" | "hero-portrait" | "proof-landscape" | "proof-portrait" | "card-landscape" | "mosaic-fill" | "editorial-natural";
}) {
  return (
    <ArtDirectedImage
      media={media}
      language={language}
      className={className}
      sizes={sizes}
      priority={priority}
      fit={fit}
      contentRole="capability-media"
      mediaRole={mediaRole}
    />
  );
}
