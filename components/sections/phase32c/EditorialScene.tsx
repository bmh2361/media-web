import { CapabilityImage } from "@/components/media/CapabilityImage";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import type { CapabilityMedia } from "@/content/capability-media";
import type { PortfolioMedia } from "@/content/portfolio";
import type { Language } from "@/lib/i18n";

export type EditorialSceneMedia =
  | { kind: "capability"; media: CapabilityMedia }
  | { kind: "portfolio"; media: PortfolioMedia };

export function EditorialScene({
  scene,
  language,
  className = "",
  sizes = "100vw",
  priority = false,
  fit,
  mediaRole
}: {
  scene: EditorialSceneMedia;
  language: Language;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  mediaRole?:
    | "hero-landscape"
    | "hero-portrait"
    | "proof-landscape"
    | "proof-portrait"
    | "card-landscape"
    | "mosaic-fill"
    | "editorial-natural";
}) {
  return scene.kind === "capability" ? (
    <CapabilityImage
      media={scene.media}
      language={language}
      className={className}
      sizes={sizes}
      priority={priority}
      fit={fit}
      mediaRole={mediaRole}
    />
  ) : (
    <PortfolioImage
      media={scene.media}
      language={language}
      className={className}
      sizes={sizes}
      priority={priority}
      fit={fit}
      mediaRole={mediaRole}
    />
  );
}
