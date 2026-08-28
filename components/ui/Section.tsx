import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
export function Section({
  children,
  className,
  compact = false,
  ...props
}: ComponentPropsWithoutRef<"section"> & { compact?: boolean }) {
  return (
    <section {...props} className={cn(compact ? "section-compact" : "section-y", className)}>
      {children}
    </section>
  );
}
