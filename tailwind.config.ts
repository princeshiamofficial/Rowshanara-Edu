import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        muted: {
          DEFAULT: "#f1f3f5",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#f1f3f5",
          foreground: "#0f172a",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f8fafc",
        },
        border: "#e2e8f0",
        input: "#cbd5e1",
        ring: "#E09100",
        sidebar: {
          DEFAULT: "#1C294A",
          foreground: "#ffffff",
          primary: "#FF8E3C",
          "primary-foreground": "#ffffff",
          accent: "#FC6B03",
          "accent-foreground": "#ffffff",
          border: "#23335C",
          ring: "#ff760f",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
