import defaultConfig from "@repo/tailwindcss-config";
import type { Config } from "tailwindcss";

const config: Config = {
  ...defaultConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/mdx/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
export default config;
