import { BrandLogo } from "./BrandLogo";
import type { BrandSurface } from "@/lib/brand/venusBridgeMedia";

export function BrandMark({
  surface = "dark",
  className,
  priority = false,
  decorative = false
}: {
  surface?: BrandSurface;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <BrandLogo
      variant="mark"
      surface={surface}
      className={className}
      priority={priority}
      decorative={decorative}
      sizes="96px"
    />
  );
}
