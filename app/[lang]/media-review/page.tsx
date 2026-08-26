import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaReviewEditor } from "@/components/media/MediaReviewEditor";
import { capabilityMediaManifest } from "@/content/capability-media";
import { isSupportedLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Capability media review | Venus Bridge",
  robots: { index: false, follow: false }
};

export default async function MediaReviewPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  if (process.env.RELEASE_PROFILE === "production" || process.env.ENABLE_MEDIA_REVIEW !== "true") notFound();
  return <MediaReviewEditor language={lang} initialRecords={capabilityMediaManifest.records} />;
}
