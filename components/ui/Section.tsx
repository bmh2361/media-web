import { cn } from "@/lib/utils";
export function Section({
  children,
  className,
  compact = false,
  id
}: {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn(compact ? "section-compact" : "section-y", className)}>
      {children}
    </section>
  );
}
