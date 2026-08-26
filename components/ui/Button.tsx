import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "border border-ink bg-ink text-pearl hover:bg-graphite",
  secondary:
    "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-pearl",
  ghost: "text-ink hover:text-champagne"
};

const base =
  "group inline-flex min-h-12 min-w-12 items-center justify-center gap-3 rounded-sm px-5 py-3 text-sm font-semibold transition duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/50";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {showArrow ? <ArrowRight size={16} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" /> : null}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: ButtonVariant }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
