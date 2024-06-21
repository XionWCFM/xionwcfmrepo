import type {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@xionwcfm/types/polymorphic";
import { type ElementType, type ReactNode, forwardRef } from "react";
import { cn } from "../cn";
import { createSpacingElementCss } from "../internal-utils/create-spacing-element-css";
import { spacingVariants } from "../internal-utils/spacing-variants";
import type {
  CssSpacingElementType,
  CssSpacingGapType,
  SemanticHTMLContentSectionType,
  SpacingSystemProps,
} from "../types";

const getS = (type: CssSpacingElementType, gap?: CssSpacingGapType) => {
  return spacingVariants({ spacing: createSpacingElementCss(type, gap) });
};

type Props<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    className?: string;
  } & SpacingSystemProps
>;

type BoxType = <C extends ElementType = SemanticHTMLContentSectionType>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Box: BoxType = forwardRef(function Box<C extends ElementType = "div">(
  { children, as, className, m, my, mx, mr, ml, mt, mb, p, py, px, pr, pl, pt, pb, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "div";

  return (
    <Component
      ref={ref}
      className={cn(
        `${getS("m", m)} ${getS("my", my)} ${getS("mx", mx)} ${getS("mr", mr)} ${getS("ml", ml)} ${getS("mt", mt)} ${getS("mb", mb)} ${getS("p", p)} ${getS("py", py)} ${getS("px", px)} ${getS("pr", pr)} ${getS("pl", pl)} ${getS("pt", pt)} ${getS("pb", pb)}`,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});
