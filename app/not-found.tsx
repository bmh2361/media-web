import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Venus Bridge",
  robots: { index: false, follow: false }
};

export { default } from "./[lang]/not-found";
