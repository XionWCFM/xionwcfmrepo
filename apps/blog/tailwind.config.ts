import { vars } from "@xionwcfm/token";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: vars.colors,
    borderRadius: vars.borderRadius,
    spacing: vars.spacing,
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
    lineHeight: vars.lineHeight,
    boxShadow: vars.boxShadow,
    extend: {
      keyframes: vars.keyframes as Config["theme"],
      animation: vars.animation,
      screens: vars.screens,
    },
  },
  darkMode: "class",
};
export default config;
