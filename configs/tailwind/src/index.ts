import { vars } from "@xionwcfm/token";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: ["./.stories/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
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
  plugins: [tailwindcssAnimate],
  darkMode: "class",
};
export default config;
