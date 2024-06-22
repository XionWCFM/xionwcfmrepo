import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from "@xionwcfm/types/polymorphic";
import { type ElementType, type ReactNode, forwardRef } from "react";
import type { PolimophicWithSpacingSystemProps } from "../box";
import { cn } from "../cn";

type Props<C extends ElementType> = PolimophicWithSpacingSystemProps<C>;
type SkeletonType = <C extends ElementType = "div" | "button" | "a">(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Skeleton: SkeletonType = forwardRef(function Skeleton<C extends ElementType = "div">(
  { children, as, className, variant, w, h, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "div";

  return (
    <Component
      ref={ref}
      className={cn(
        " text-size-2 font-medium py-4 px-16 bg-neutral-200 rounded-full text-neutral-500 hover:bg-neutral-300 duration-200 transition-all",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});
