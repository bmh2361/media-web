import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/motion/PageTransition";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/structured-data";
import { isLanguage, type Language } from "@/lib/i18n";
import { getWorkPresentation } from "@/lib/release";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://framebridge.studio")
};
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default async function LanguageLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const language = lang as Language;
  const workPresentation = getWorkPresentation();
  return (
    <html lang={language === "zh" ? "zh-CN" : "en-GB"}>
      <body>
        <JsonLd data={organizationJsonLd()} />
        <a href="#main-content" className="skip-link">
          {language === "zh" ? "跳至主要内容" : "Skip to main content"}
        </a>
        <Header language={language} workNavigationLabel={workPresentation.navigationLabel[language]} />
        <ScrollProgress />
        <PageTransition lang={lang} className={language === "zh" ? "zh-copy" : undefined}>
          {children}
        </PageTransition>
        <Footer language={language} />
      </body>
    </html>
  );
}
