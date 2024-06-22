import type {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@xionwcfm/types/polymorphic";
import { type ElementType, type ReactNode, forwardRef } from "react";
import { cn } from "../cn";
import { getS } from "../internal-utils/get-s";
import type { SpacingSystemProps } from "../types";

export type PolimophicWithSpacingSystemProps<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    className?: string;
  } & SpacingSystemProps
>;

type BoxType = <C extends ElementType = ElementType>(
  props: PolymorphicComponentPropsWithRef<C, PolimophicWithSpacingSystemProps<C>>,
) => ReactNode | null;

const getMargin = () => {
  return {};
};

export const Box: BoxType = forwardRef(function Box<C extends ElementType = "div">(
  { children, as, className, ...rest }: PolimophicWithSpacingSystemProps<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "div";
  const { m, my, mx, mr, ml, mt, mb, p, py, px, pr, pl, pt, pb, style, ...omitSpacingRest } = rest;
  const defaultCss = `${getS("my", my)} ${getS("mx", mx)}  
   ${getS("py", py)} ${getS("px", px)}`;

  return (
    <Component ref={ref} className={cn(defaultCss, className)} {...omitSpacingRest}>
      {children}
    </Component>
  );
});
