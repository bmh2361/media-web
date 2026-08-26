"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackMeasurement } from "@/lib/measurement";

export function MeasurementBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackMeasurement("page_view");
    const caseMatch = pathname.match(/^\/(?:en|zh)\/work\/([^/]+)$/);
    if (caseMatch) {
      trackMeasurement("case_view", {
        case_slug: caseMatch[1],
        category: document.querySelector<HTMLElement>("[data-case-category]")?.dataset.caseCategory
      });
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const path = href.split("?")[0];
      const ctaLocation = link.dataset.analyticsLocation || pathname;
      if (link.dataset.analytics === "language-switch") {
        trackMeasurement("language_switch", { destination: path });
      } else if (/\/(?:en|zh)\/work\/[^/]+$/.test(path)) {
        trackMeasurement("case_detail_open", { case_slug: path.split("/").at(-1), cta_location: ctaLocation });
      } else if (path.endsWith("/companies")) {
        trackMeasurement("companies_cta_click", { cta_location: ctaLocation });
      } else if (path.endsWith("/partners")) {
        trackMeasurement("partners_cta_click", { cta_location: ctaLocation });
      } else if (path.endsWith("/contact")) {
        trackMeasurement("discuss_project_click", { cta_location: ctaLocation });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
