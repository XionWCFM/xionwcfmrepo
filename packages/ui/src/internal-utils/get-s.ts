import type { CssSpacingElementType, CssSpacingGapType } from "../types";
import { createSpacingElementCss } from "./create-spacing-element-css";
import { spacingVariants } from "./spacing-variants";

export const getS = (type: CssSpacingElementType, gap?: CssSpacingGapType) => {
  return spacingVariants({ spacing: createSpacingElementCss(type, gap) });
};
