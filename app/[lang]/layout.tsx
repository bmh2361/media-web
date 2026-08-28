import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { EditorialMotionLayer } from "@/components/motion/EditorialMotionLayer";
import { PageTransition } from "@/components/motion/PageTransition";
import { MobileExperienceLayer } from "@/components/motion/MobileExperienceLayer";
import { OpeningSequenceProvider } from "@/components/motion/OpeningSequenceProvider";
import { PointerLabel } from "@/components/motion/PointerLabel";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/structured-data";
import { isLanguage, type Language } from "@/lib/i18n";
import { getEffectiveWorkMode } from "@/lib/release";
import { venusBridgeMedia } from "@/lib/brand/venusBridgeMedia";
import { MeasurementBridge } from "@/components/analytics/MeasurementBridge";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://venusbridgemedia.example"),
  applicationName: venusBridgeMedia.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: venusBridgeMedia.appIcons.favicon, type: "image/png", sizes: "48x48" }],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: venusBridgeMedia.appIcons.apple, type: "image/png", sizes: "180x180" }]
  }
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
  const workMode = getEffectiveWorkMode();
  const organization = organizationJsonLd();
  return (
    <html lang={language === "zh" ? "zh-CN" : "en-GB"}>
      <body>
        <Suspense fallback={null}>
          <MeasurementBridge />
        </Suspense>
        <OpeningSequenceProvider>
          {organization ? <JsonLd data={organization} /> : null}
          <a href="#main-content" className="skip-link">
            {language === "zh" ? "跳至主要内容" : "Skip to main content"}
          </a>
          <Header language={language} showWork={workMode !== "hidden"} />
          <EditorialMotionLayer />
          <MobileExperienceLayer language={language} />
          <PointerLabel />
          <PageTransition lang={lang} className={language === "zh" ? "zh-copy" : undefined}>
            {children}
          </PageTransition>
          <Footer language={language} showWork={workMode !== "hidden"} />
        </OpeningSequenceProvider>
      </body>
    </html>
  );
}
