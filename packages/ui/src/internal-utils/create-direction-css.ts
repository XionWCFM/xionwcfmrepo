import type { CssDirectionType, ReturnCssDirectionType } from "../types/index.js";

export const createDirectionCss = (direction: CssDirectionType): ReturnCssDirectionType => {
  return direction === "column" ? "flex-col" : "flex-row";
};
