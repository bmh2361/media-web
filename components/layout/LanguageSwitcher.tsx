"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLanguage, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  language,
  className
}: {
  language: Language;
  className?: string;
}) {
  const pathname = usePathname();
  const nextLanguage = alternateLanguage(language);
  const nextPath = pathname.replace(`/${language}`, `/${nextLanguage}`);

  return (
    <Link
      href={nextPath || `/${nextLanguage}`}
      className={cn(
        "rounded-full border border-ink/10 px-3 py-1 text-sm font-medium transition hover:border-blue hover:text-blue",
        className
      )}
      aria-label="Switch language"
    >
      {language === "en" ? "中文" : "EN"}
    </Link>
  );
}
