import Link from "next/link";
import { Suspense } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { phase5Navigation } from "@/content/phase5";
import { withLanguage, type Language } from "@/lib/i18n";
import { company, areWebsiteTermsApproved } from "@/content/company";

const links = [
  ["companies", "/companies"],
  ["partners", "/partners"],
  ["work", "/work"],
  ["how", "/how-we-work"],
  ["about", "/about"],
  ["contact", "/contact"]
] as const;

export function Footer({ language, showWork = true }: { language: Language; showWork?: boolean }) {
  const copy = phase5Navigation[language];
  const legalStatement =
    areWebsiteTermsApproved() && company.legalEntityMode === "incorporated"
      ? language === "zh"
        ? `Venus Bridge Media 为 ${company.legalName} 的业务品牌。`
        : `Venus Bridge Media is a trading name of ${company.legalName}.`
      : "Venus Bridge";
  return (
    <footer className="border-t border-pearl/10 bg-ink text-pearl" data-mobile-footer>
      <div className="container-x grid gap-8 py-10 md:gap-10 md:py-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-16 lg:py-24">
        <div>
          <BrandLockup variant="footer" surface="dark" className="w-72" />
          <p className="mt-5 max-w-lg text-base leading-7 text-pearl/65 lg:mt-6">
            {language === "zh"
              ? "Venus Bridge 帮助中国企业验证、进入并拓展英国与欧洲市场，通过本地商业判断、相关合作关系与一体化执行推动行动落地。"
              : "Venus Bridge helps Chinese companies validate, enter and activate in the UK and Europe through local commercial judgement, relevant relationships and integrated execution."}
          </p>
          <p className="mt-6 text-xs uppercase tracking-editorial text-champagne lg:mt-8">
            London, United Kingdom
          </p>
        </div>
        <nav
          className="grid grid-cols-3 gap-x-5 gap-y-1 sm:grid-cols-4 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 lg:justify-self-end"
          aria-label="Footer navigation"
        >
          {links
            .filter(([key]) => key !== "work" || showWork)
            .map(([key, path]) => (
              <Link
                key={key}
                href={withLanguage(path, language)}
                className="min-h-11 py-3 text-sm text-pearl/70 hover:text-pearl"
              >
                {copy[key]}
              </Link>
            ))}
          <Link
            href={withLanguage("/privacy", language)}
            className="min-h-11 py-3 text-sm text-pearl/70 hover:text-pearl"
          >
            {language === "zh" ? "隐私" : "Privacy"}
          </Link>
          <Link
            href={withLanguage("/terms", language)}
            className="min-h-11 py-3 text-sm text-pearl/70 hover:text-pearl"
          >
            {language === "zh" ? "条款" : "Terms"}
          </Link>
          <Link href="/radar" className="min-h-11 py-3 text-sm text-pearl/70 hover:text-pearl">
            {language === "zh" ? "商业研究雷达" : "Business Radar"}
          </Link>
        </nav>
      </div>
      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-pearl/10 py-3 text-xs text-pearl/50 lg:py-6">
        <span>{legalStatement}</span>
        <span>© {new Date().getFullYear()} Venus Bridge</span>
        <Suspense fallback={<span className="w-12" />}>
          <LanguageSwitcher language={language} className="border-pearl/20 text-pearl/70" />
        </Suspense>
      </div>
    </footer>
  );
}
