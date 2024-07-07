import { Slot } from "@radix-ui/react-slot";
import type {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@xionwcfm/types/polymorphic";
import { type ElementType, type ReactNode, forwardRef } from "react";
import { cn } from "./external-utils/cn";
import { getS } from "./internal-utils/get-s";
import type { SpacingSystemProps } from "./internal-utils/type";

export type PolimophicWithSpacingSystemProps<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    className?: string;
    asChild?: boolean;
  } & SpacingSystemProps
>;

type BoxType = <C extends ElementType = ElementType>(
  props: PolymorphicComponentPropsWithRef<C, PolimophicWithSpacingSystemProps<C>>,
) => ReactNode | null;

export const Box: BoxType = forwardRef(function Box<C extends ElementType = "div">(
  { children, as, className, asChild = false, ...rest }: PolimophicWithSpacingSystemProps<C>,
  ref?: PolymorphicRef<C>,
) {
  const AsComponent = as || "div";
  const SlottableComponent = asChild ? Slot : AsComponent;
  const { m, my, mx, mr, ml, mt, mb, p, py, px, pr, pl, pt, pb, style, ...omitSpacingRest } = rest;
  const defaultCss = `${getS("m", m)} ${getS("mr", mr)} ${getS("ml", ml)} ${getS("mb", mb)} ${getS("mt", mt)}  ${getS("my", my)} ${getS("mx", mx)}  
   ${getS("py", py)} ${getS("px", px)} ${getS("pt", pt)}  ${getS("pb", pb)}  ${getS("pl", pl)}  ${getS("pr", pr)}  ${getS("p", p)}`;

  return (
    <SlottableComponent as={AsComponent} ref={ref} className={cn(defaultCss, className)} {...omitSpacingRest}>
      {children}
    </SlottableComponent>
  );
});
