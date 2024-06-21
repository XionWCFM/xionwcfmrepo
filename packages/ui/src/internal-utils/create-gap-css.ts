import type { CssSpacingGapType, ReturnCssSpacingGapType } from "../types/index.js";

export const createGapCss = (num?: CssSpacingGapType): ReturnCssSpacingGapType => {
  if (num === undefined) return "";
  return `gap-${num}` as const;
};
