import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageIntro({
  eyebrow,
  title,
  intro,
  children,
  dark = false
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={cn("pt-36", dark ? "bg-ink text-pearl" : "text-ink")}>
      <div className="container-x pb-16">
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-editorial",
            dark ? "text-champagne" : "text-slate"
          )}
        >
          {eyebrow}
        </p>
        <h1 className="editorial-heading mt-5 max-w-5xl text-balance font-semibold">{title}</h1>
        <p className={cn("mt-7 max-w-2xl text-lg leading-8", dark ? "text-pearl/70" : "text-ink/70")}>
          {intro}
        </p>
        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  );
}
