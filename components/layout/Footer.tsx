import Link from "next/link";
import { Suspense } from "react";
import { brand } from "@/content/brand";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { withLanguage, type Language } from "@/lib/i18n";
const groups = [
  {
    en: "Services",
    zh: "服务",
    links: [
      ["Commercial Production", "商业制作", "/services/commercial-production"],
      ["Talent Coordination", "人才协调", "/talent"],
      ["Research & Innovation", "科研与创新", "/services/research-innovation"],
      ["Events & Exhibitions", "活动与展会", "/services/events-exhibitions"]
    ]
  },
  {
    en: "Company",
    zh: "公司",
    links: [
      ["Industries", "行业", "/industries"],
      ["Work", "案例", "/work"],
      ["Agency Support", "代理支持", "/for-agencies"],
      ["About", "关于", "/about"]
    ]
  },
  {
    en: "Information",
    zh: "信息",
    links: [
      ["Contact", "联系", "/contact"],
      ["Privacy", "隐私", "/privacy"],
      ["Terms", "条款", "/terms"]
    ]
  }
] as const;
export function Footer({ language }: { language: Language }) {
  return (
    <footer className="border-t border-pearl/10 bg-ink text-pearl">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-editorial">{brand.name}</p>
          <p className="mt-5 max-w-md text-sm leading-6 text-pearl/70">{brand.strapline[language]}</p>
          <a href={`mailto:${brand.email}`} className="mt-7 inline-block text-sm text-champagne">
            {brand.email}
          </a>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {groups.map((g) => (
            <div key={g.en}>
              <p className="text-xs uppercase tracking-editorial text-pearl/60">{g[language]}</p>
              <div className="mt-5 grid gap-3">
                {g.links.map((l) => (
                  <Link
                    key={l[2]}
                    href={withLanguage(l[2], language)}
                    className="text-sm text-pearl/70 hover:text-pearl"
                  >
                    {language === "zh" ? l[1] : l[0]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-pearl/10 py-6 text-xs text-pearl/50">
        <span>
          © {new Date().getFullYear()} {brand.name}
        </span>
        <Suspense fallback={<span className="h-7 w-12" aria-hidden />}>
          <LanguageSwitcher
            language={language}
            className="border-pearl/20 text-pearl/70 hover:border-pearl hover:text-pearl"
          />
        </Suspense>
      </div>
    </footer>
  );
}
