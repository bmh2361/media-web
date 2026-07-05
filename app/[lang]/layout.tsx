import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/motion/PageTransition";
import { isLanguage, type Language } from "@/lib/i18n";

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
  if (!isLanguage(lang)) {
    notFound();
  }

  return (
    <>
      <Header language={lang as Language} />
      <PageTransition lang={lang} className={lang === "zh" ? "zh-copy" : undefined}>
        {children}
      </PageTransition>
      <Footer language={lang as Language} />
    </>
  );
}
