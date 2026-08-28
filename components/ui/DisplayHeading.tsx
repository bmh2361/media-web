import { cn } from "@/lib/utils";
export function DisplayHeading({
  children,
  className,
  as = "h1"
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  const Tag = as;
  return <Tag className={cn("display-heading", className)}>{children}</Tag>;
}
