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
        ink: "#0b0d10",
        night: "#14171c",
        graphite: "#242830",
        slate: "#646b75",
        silver: "#c8cdd2",
        champagne: "#d8c7a2",
        pearl: "#fbfaf7",
        porcelain: "#f7f3ec",
        mist: "#ece7dd",
        blue: "#6fb7ff"
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"PingFang SC\"",
          "\"Microsoft YaHei\"",
          "sans-serif"
        ],
        serif: [
          "var(--font-newsreader)",
          "Georgia",
          "\"Noto Serif SC\"",
          "\"Songti SC\"",
          "serif"
        ]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(11, 13, 16, 0.12)",
        cinematic: "0 32px 120px rgba(11, 13, 16, 0.32)"
      },
      maxWidth: {
        container: "1440px"
      },
      letterSpacing: {
        editorial: "0.08em"
      }
    }
  },
  plugins: []
};

export default config;
