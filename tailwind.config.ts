import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        foreground: "#fafafa",
        background: "#0f0f0f",
        primary: "#baff29",
        muted: colors.neutral[400],
      },
      fontFamily: {
        sans: ["SF Pro Display", ...defaultTheme.fontFamily.sans],
        mono: ["SF Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};

export default config;
