import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d0e",
        night: "#141719",
        graphite: "#242729",
        slate: "#5d6264",
        silver: "#cbc5ba",
        champagne: "#c8a56a",
        pearl: "#f3f0e9",
        porcelain: "#f8f6f1",
        mist: "#e8e4dc",
        blue: "#2d58ef",
        blueBright: "#2d58ef"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"],
        zh: ["var(--font-zh)", "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", "sans-serif"]
      },
      maxWidth: { container: "1320px", reading: "62ch" },
      letterSpacing: { editorial: "0.055em" },
      transitionTimingFunction: { editorial: "cubic-bezier(.22,1,.36,1)" },
      boxShadow: { soft: "none", cinematic: "none" }
    }
  },
  plugins: []
};
export default config;
