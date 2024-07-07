import type { CssSpacingGapType, ReturnCssSpacingGapType } from "./type.js";

export const createGapCss = (num?: CssSpacingGapType): ReturnCssSpacingGapType => {
  if (num === undefined) return "";
  return `gap-${num}` as const;
};
