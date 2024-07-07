import { createSpacingElementCss } from "./create-spacing-element-css";
import { spacingVariants } from "./spacing-variants";
import type { CssSpacingElementType, CssSpacingGapType } from "./type";

export const getS = (type: CssSpacingElementType, gap?: CssSpacingGapType) => {
  return spacingVariants({ spacing: createSpacingElementCss(type, gap) });
};
