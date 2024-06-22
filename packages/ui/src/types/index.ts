export type SemanticHTMLContentSectionType =
  | "div"
  | "main"
  | "article"
  | "aside"
  | "footer"
  | "header"
  | "address"
  | "section"
  | "nav";

export type SemanticHTMLTextContentType =
  | "blockquote"
  | "div"
  | "figcaption"
  | "figure"
  | "hr"
  | "pre"
  | "p"
  | "span"
  | "b"
  | "br"
  | "code"
  | "i"
  | "q"
  | "strong"
  | "time";

export type SemanticHTMLClickableContentType = "button" | "a";

export type SemanticHTMLListContentType = "ul" | "ol" | "li" | "dl" | "dt" | "dd";

export type HAndWType = "h" | "w";

export type CssMarginSpacingElementType = "my" | "mx" | "ml" | "mr" | "mb" | "mt" | "m";
export type CssPaddingSpacingElementType = "p" | "pl" | "pr" | "pb" | "pt" | "px" | "py";
export type CssSpacingElementType = "px" | "py" | "mx" | "my";

export type CssSpacingGapType = "0" | "4" | "8" | "12" | "16" | "20" | "24" | "28" | "32" | "36" | "40";

export type CssDirectionType = "row" | "column";

export type ReturnCssDirectionType = "flex-row" | "flex-col";

export type ReturnCssSpacingGapType = "" | `gap-${CssSpacingGapType}`;

export type ReturnCssSpacingWAndHAndMarginType = "" | `${HAndWType}-${CssSpacingGapType}`;

export type ReturnCssSpacingElementType = "" | `${CssSpacingElementType}-${CssSpacingGapType}`;

export type SpacingSystemProps = Partial<Record<CssSpacingElementType, CssSpacingGapType>>;
