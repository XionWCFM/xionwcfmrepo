import type { CssSpacingGapType, HAndWAndMType, ReturnCssSpacingWAndHAndMarginType } from "../types/index.js";

export const createSpacingCss = (type?: HAndWAndMType, gap?: CssSpacingGapType): ReturnCssSpacingWAndHAndMarginType => {
  if (gap === "0" || gap === undefined || type === undefined) {
    return "";
  }
  return `${type}-${gap}`;
};
