"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { alternateLanguage, switchLanguagePath, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ language, className }: { language: Language; className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextLanguage = alternateLanguage(language);
  const nextPath = switchLanguagePath(pathname, language, searchParams.toString());

  return (
    <Link
      href={nextPath}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/10 px-3 py-2 text-sm font-medium transition hover:border-blue hover:text-blue",
        className
      )}
      aria-label={language === "zh" ? "切换至英文" : "Switch to Chinese"}
      hrefLang={nextLanguage === "zh" ? "zh-CN" : "en-GB"}
      data-analytics="language-switch"
    >
      {language === "en" ? "中文" : "EN"}
    </Link>
  );
}
