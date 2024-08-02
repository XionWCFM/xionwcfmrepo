import baseConfig from "@xionwcfm/tailwindcss-config/base";
import { XION_STYLE } from "@xionwcfm/token";
import type { Config } from "tailwindcss";
const config: Config = {
  ...baseConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // theme: XION_STYLE as unknown as Config["theme"],
  theme: {
    extend: {
      ...(XION_STYLE as unknown as Config["theme"]),
    },
  },
};
export default config;
