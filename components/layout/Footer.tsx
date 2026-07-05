import Link from "next/link";
import { brand, footerCredibility, navItems, ui } from "@/content/site";
import { withLanguage, type Language } from "@/lib/i18n";

export function Footer({ language }: { language: Language }) {
  return (
    <footer className="border-t border-pearl/10 bg-ink text-pearl">
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-editorial">{brand.en}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-pearl/70">{brand.strapline[language]}</p>
          <p className="mt-5 max-w-md text-xs leading-6 text-pearl/48">{footerCredibility[language]}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLanguage(item.href, language)}
              className="text-sm text-pearl/70 transition hover:text-pearl"
            >
              {item.label[language]}
            </Link>
          ))}
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-pearl/10 py-6 text-xs text-pearl/50 sm:flex-row sm:items-center sm:justify-between">
        <span>{ui[language].copyright}</span>
        <span>{ui[language].footerNote}</span>
      </div>
    </footer>
  );
}
