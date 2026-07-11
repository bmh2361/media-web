import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  theme = "light"
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-editorial",
            theme === "dark" ? "text-champagne" : "text-slate"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "editorial-heading mt-4 text-balance font-semibold",
          theme === "dark" ? "text-pearl" : "text-ink"
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-lg leading-8",
            theme === "dark" ? "text-pearl/70" : "text-ink/60"
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
