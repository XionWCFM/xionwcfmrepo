import baseConfig from "@xionwcfm/tailwindcss-config/base";
import { XION_STYLE } from "@xionwcfm/token";
import type { Config } from "tailwindcss";
const config: Config = {
  ...baseConfig,
  content: [
    "../../apps/storybook/**/*.{js,ts,jsx,tsx,mdx}",
    "./.stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: XION_STYLE as unknown as Config["theme"],
};
export default config;
