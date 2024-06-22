import type { CssSpacingElementType, CssSpacingGapType, ReturnCssSpacingElementType } from "../types/index.js";

export const createSpacingElementCss = (
  type?: CssSpacingElementType,
  gap?: CssSpacingGapType,
): ReturnCssSpacingElementType => {
  if (!type || !gap || gap === "0") return "";
  return `${type}-${gap}`;
};
