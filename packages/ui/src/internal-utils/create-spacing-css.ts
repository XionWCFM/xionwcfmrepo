import type { CssSpacingGapType, HAndWType, ReturnCssSpacingWAndHAndMarginType } from "./type.js";

export const createSpacingCss = (type?: HAndWType, gap?: CssSpacingGapType): ReturnCssSpacingWAndHAndMarginType => {
  if (gap === "0" || gap === undefined || type === undefined) {
    return "";
  }
  return `${type}-${gap}`;
};
