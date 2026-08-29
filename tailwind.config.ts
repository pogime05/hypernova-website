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
        // Light editorial system — warm paper, near-black ink, one accent.
        paper: "#FAF9F6", // warm off-white base (not pure white)
        ink: "#0E0E10", // near-black text / punctuation bands
        ash: "#5A5A63", // secondary text — passes WCAG AA on paper (~6.6:1)
        rule: "#E2E0DA", // hairline borders & dividers
        accent: "#4A2BFF", // single electric indigo — used sparingly
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
