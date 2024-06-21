import type {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@xionwcfm/types/polymorphic";
import { type ElementType, type ReactNode, forwardRef } from "react";
import { cn } from "../cn/index.js";
import { createDirectionCss } from "../internal-utils/create-direction-css.js";
import { createGapCss } from "../internal-utils/create-gap-css.js";
import type { CssDirectionType, CssSpacingGapType, SemanticHTMLContentSectionType } from "../types/index.js";

type Props<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    className?: string;
    direction?: CssDirectionType;
    gap?: CssSpacingGapType;
  }
>;

type StackType = <C extends ElementType = SemanticHTMLContentSectionType>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Stack: StackType = forwardRef(function Stack<C extends ElementType = "div">(
  { children, as, className, direction, gap, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "div";
  const defaultGap: CssSpacingGapType = gap ?? "0";
  const defaultDirection: CssDirectionType = direction ?? "column";

  return (
    <Component
      ref={ref}
      className={cn(`${createGapCss(defaultGap)} ${createDirectionCss(defaultDirection)}`, className)}
      {...rest}
    >
      {children}
    </Component>
  );
});
