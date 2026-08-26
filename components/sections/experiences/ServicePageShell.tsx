import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { withLanguage, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ServicePageShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function ServiceBreadcrumbs({
  language,
  current,
  dark = false
}: {
  language: Language;
  current: string;
  dark?: boolean;
}) {
  return (
    <nav
      aria-label={language === "zh" ? "面包屑导航" : "Breadcrumb"}
      className={cn("text-xs", dark ? "text-pearl/60" : "text-ink/65")}
    >
      <Link className="inline-flex min-h-11 items-center" href={withLanguage("/services", language)}>
        {language === "zh" ? "服务" : "Services"}
      </Link>
      <span aria-hidden className="px-2">
        /
      </span>
      <span className="inline-flex min-h-11 items-center" aria-current="page">
        {current}
      </span>
    </nav>
  );
}

export function ServiceHero({
  eyebrow,
  title,
  intro,
  children,
  dark = false
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={cn("relative overflow-hidden pt-32", dark ? "bg-ink text-pearl" : "bg-pearl text-ink")}
    >
      <div
        className={cn(
          "container-x relative grid gap-8 pb-16 lg:pb-20",
          Boolean(children) && "lg:grid-cols-[minmax(0,1fr)_minmax(20rem,.75fr)] lg:items-end"
        )}
      >
        <div>
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-editorial",
              dark ? "text-champagne" : "text-blue"
            )}
          >
            {eyebrow}
          </p>
          <h1 className="editorial-heading mt-5 max-w-4xl font-semibold">{title}</h1>
          <p className={cn("mt-7 max-w-2xl text-lg leading-8", dark ? "text-pearl/70" : "text-ink/65")}>
            {intro}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}

export function ServiceCTA({
  language,
  title,
  cta,
  project,
  dark = true
}: {
  language: Language;
  title: string;
  cta: string;
  project: string;
  dark?: boolean;
}) {
  return (
    <section className={cn("section-y text-center", dark ? "bg-ink text-pearl" : "bg-pearl text-ink")}>
      <div className="container-x">
        <h2 className="mx-auto max-w-4xl text-4xl font-semibold md:text-6xl">{title}</h2>
        <ButtonLink
          href={`${withLanguage("/contact", language)}?project=${project}`}
          showArrow
          variant={dark ? "secondary" : "primary"}
          className="mt-9"
          data-project-type={project}
        >
          {cta}
        </ButtonLink>
      </div>
    </section>
  );
}
