import type { MetadataRoute } from "next";
import { venusBridgeMedia } from "@/lib/brand/venusBridgeMedia";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: venusBridgeMedia.name,
    short_name: venusBridgeMedia.shortName,
    description: venusBridgeMedia.positioning.en,
    start_url: "/en",
    display: "standalone",
    background_color: venusBridgeMedia.colors.black,
    theme_color: venusBridgeMedia.colors.black,
    icons: [
      { src: venusBridgeMedia.appIcons.small, sizes: "192x192", type: "image/png" },
      { src: venusBridgeMedia.appIcons.large, sizes: "512x512", type: "image/png" }
    ]
  };
}
