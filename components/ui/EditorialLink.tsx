import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type EditorialLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

export function EditorialLink({ children, className, ...props }: EditorialLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex min-h-11 items-center gap-3 border-b border-current py-2 text-sm font-medium",
        className
      )}
    >
      {children}
      <span aria-hidden>↗</span>
    </Link>
  );
}
