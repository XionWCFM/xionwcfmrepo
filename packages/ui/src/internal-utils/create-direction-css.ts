import type { CssDirectionType, ReturnCssDirectionType } from "./type.js";

export const createDirectionCss = (direction: CssDirectionType): ReturnCssDirectionType => {
  return direction === "column" ? "flex-col" : "flex-row";
};
