import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://framebridge.studio"),
  title: {
    default: "FrameBridge Studio | UK Creative Production for Chinese Brands",
    template: "%s | FrameBridge Studio"
  },
  description:
    "UK-based creative production, photography, video, styling, models, creators and event content partner for Chinese brands, agencies and PR teams.",
  openGraph: {
    title: "FrameBridge Studio | UK Creative Production for Chinese Brands",
    description:
      "UK-based creative production, photography, video, styling, models, creators and event content partner for Chinese brands, agencies and PR teams.",
    type: "website",
    siteName: "FrameBridge Studio",
    images: ["/media/placeholders/hero-cinematic.svg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
