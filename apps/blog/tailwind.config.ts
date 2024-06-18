import baseConfig from "@xionwcfm/tailwindcss-config/base";
import { XION_STYLE } from "@xionwcfm/token";
import type { Config } from "tailwindcss";
const config: Config = {
  ...baseConfig,
  theme: XION_STYLE as unknown as Config["theme"],
};
export default config;
