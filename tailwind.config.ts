import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2a6010",
          100: "#d4edbc",
          200: "#a8d979",
          600: "#2a6010",
          700: "#1e4a0c",
          800: "#133008",
        },
        accent: {
          DEFAULT: "#f89522",
          dark: "#c44e17",
          light: "#fbd08a",
        },
      },
      fontFamily: {
        sans: ["var(--font-marianne)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
