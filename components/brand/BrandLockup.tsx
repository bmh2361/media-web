import { BrandLogo } from "./BrandLogo";
import type { BrandSurface } from "@/lib/brand/venusBridgeMedia";
import { cn } from "@/lib/utils";

export function BrandLockup({
  variant,
  surface = "dark",
  className,
  priority = false
}: {
  variant: "header" | "footer";
  surface?: BrandSurface;
  className?: string;
  priority?: boolean;
}) {
  return (
    <BrandLogo
      variant="tagline"
      surface={surface}
      className={cn(variant === "footer" ? "w-64" : "w-[13.5rem]", className)}
      priority={priority}
      sizes={variant === "footer" ? "256px" : "216px"}
    />
  );
}
