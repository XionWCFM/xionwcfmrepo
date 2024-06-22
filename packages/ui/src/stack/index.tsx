import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from "@xionwcfm/types/polymorphic";
import { type VariantProps, cva } from "class-variance-authority";
import { type ElementType, type ReactNode, forwardRef } from "react";
import type { PolimophicWithSpacingSystemProps } from "../box/index";
import { cn } from "../cn/index";
import { getS } from "../internal-utils/get-s";
import { stackVariants } from "../internal-utils/stack-variants";
import type { SemanticHTMLContentSectionType } from "../types/index";

type Props<C extends ElementType> = PolimophicWithSpacingSystemProps<C> & VariantProps<typeof stackVariants>;

type StackType = <C extends ElementType = SemanticHTMLContentSectionType>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Stack: StackType = forwardRef(function Stack<C extends ElementType = "div">(
  { children, as, className, direction, gap, w, h, justify, align, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "div";
  const { m, my, mx, mr, ml, mt, mb, p, py, px, pr, pl, pt, pb, ...omitSpacingRest } = rest;
  const defaultCss = ` ${getS("my", my)} ${getS("mx", mx)}  
  ${getS("py", py)} ${getS("px", px)} `;

  return (
    <Component
      ref={ref}
      className={cn(" flex", defaultCss, stackVariants({ direction, gap, w, h, justify, align }), className)}
      {...omitSpacingRest}
    >
      {children}
    </Component>
  );
});
