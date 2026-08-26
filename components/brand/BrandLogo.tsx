import Image from "next/image";
import { venusBridgeMedia, type BrandLogoVariant, type BrandSurface } from "@/lib/brand/venusBridgeMedia";
import { cn } from "@/lib/utils";

const defaultWidths: Record<BrandLogoVariant, string> = {
  mark: "w-10",
  name: "w-64",
  wordmark: "w-48",
  tagline: "w-72",
  "full-transparent": "w-72"
};

export function BrandLogo({
  variant,
  surface = "dark",
  className,
  priority = false,
  decorative = false,
  sizes
}: {
  variant: BrandLogoVariant;
  surface?: BrandSurface;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  sizes?: string;
}) {
  const asset = venusBridgeMedia.logos[variant];
  return (
    <span
      className={cn("inline-flex max-w-full items-center justify-center", defaultWidths[variant], className)}
      data-brand-logo={variant}
      data-brand-surface={surface}
    >
      <Image
        src={asset[surface]}
        width={asset.width}
        height={asset.height}
        alt={decorative ? "" : asset.alt}
        aria-hidden={decorative || undefined}
        priority={priority}
        sizes={sizes ?? `${asset.width}px`}
        className="h-auto w-full object-contain"
      />
    </span>
  );
}
