import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from "@xionwcfm/types/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { type ElementType, type ReactNode, forwardRef } from "react";
import { Box, type PolimophicWithSpacingSystemProps } from "../box/index";
import { cn } from "../cn/index";
import { stackVariants } from "../internal-utils/stack-variants";
import type { SemanticHTMLContentSectionType } from "../types/index";

type Props<C extends ElementType> = PolimophicWithSpacingSystemProps<C> & VariantProps<typeof stackVariants>;

type StackType = <C extends ElementType = SemanticHTMLContentSectionType>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Stack: StackType = forwardRef(function Stack<C extends ElementType = "div">(
  props: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const { children, direction, gap, w, h, justify, align, className, as, ...rest } = props;
  const typedRest = rest as PolymorphicComponentPropsWithRef<C, PolimophicWithSpacingSystemProps<C>>;
  return (
    <Box
      as={as}
      ref={ref}
      className={cn(" flex", stackVariants({ direction, gap, w, h, justify, align }), className)}
      {...typedRest}
    >
      {children}
    </Box>
  );
});
