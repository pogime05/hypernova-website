import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Layered surface system — depth via stacked tones, not flat black.
        bg: "#0A0A0F", // base canvas
        surface: "#13131A", // raised panels / cards
        elevated: "#1A1A24", // highest surfaces / inner UI / popovers
        hairline: "rgba(255,255,255,0.06)", // 1px separators
        accent: "#6C47FF",
        cyan: "#00D9FF",
        primary: "#F0F0F5",
        muted: "#9B9BAD", // raised from #6B6B7B for WCAG AA on dark bg
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "blink": "blink 1s step-end infinite",
        "shimmer": "shimmer 2.4s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.4)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
