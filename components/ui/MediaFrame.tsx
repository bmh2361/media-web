import { cn } from "@/lib/utils";
export function MediaFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[18px] bg-graphite", className)}>{children}</div>
  );
}
