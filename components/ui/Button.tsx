import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-pearl shadow-soft hover:-translate-y-0.5 hover:bg-graphite hover:shadow-cinematic",
  secondary:
    "border border-ink/20 bg-pearl/70 text-ink hover:-translate-y-0.5 hover:border-champagne hover:bg-white",
  ghost: "text-ink hover:text-blue"
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/50";

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
      {showArrow ? <ArrowRight size={16} strokeWidth={1.8} /> : null}
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
