import baseConfig from "@xionwcfm/tailwindcss-config/base";
import { XION_STYLE } from "@xionwcfm/token";
import type { Config } from "tailwindcss";

const config: Config = {
  ...baseConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: XION_STYLE.colors,
    borderRadius: XION_STYLE.borderRadius,
    spacing: XION_STYLE.spacing,
    fontSize: XION_STYLE.fontSize,
    fontWeight: XION_STYLE.fontWeight,
    lineHeight: XION_STYLE.lineHeight,
    boxShadow: XION_STYLE.boxShadow,
    extend: {
      keyframes: XION_STYLE.keyframes as Config["theme"],
      animation: XION_STYLE.animation,
      screens: XION_STYLE.screens,
    },
  },
  plugins: [...(baseConfig?.plugins ?? []), require("tailwindcss-animate")],
};
export default config;
