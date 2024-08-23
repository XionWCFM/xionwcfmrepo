import { Slot, Slottable } from "@radix-ui/react-slot";
import type {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@xionwcfm/types/polymorphic";
import { type ElementType, type ReactNode, forwardRef } from "react";
import { cn } from "./external-utils/cn";
import { SpacingSystemProps, getS } from "./internal-utils/get-s";

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
  const { m, my, mx, mr, ml, mt, mb, p, py, px, pr, pl, pt, pb, ...omitSpacingRest } = rest;

  return (
    <SlottableComponent
      as={AsComponent}
      ref={ref}
      className={cn(getS({ m, my, mx, mr, ml, mt, mb, p, py, px, pr, pl, pt, pb }), className)}
      {...omitSpacingRest}
    >
      {children}
    </SlottableComponent>
  );
});
