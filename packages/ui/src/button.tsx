import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from "@xionwcfm/types/polymorphic";
import { type VariantProps, cva } from "class-variance-authority";
import { type ElementType, type ReactNode, forwardRef } from "react";
import { Box, type PolimophicWithSpacingSystemProps } from "./box";
import { cn } from "./external-utils/cn";
import type { SemanticHTMLContentSectionType } from "./internal-utils/type";

export const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "",
      outline: "",
      destructive: "",
      primary: "",
      secondary: "",
      ghost: "",
      link: "",
      icon: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
      icon: "",
    },
  },
});

type ButtonOptionProps = {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

type Props<C extends ElementType> = PolimophicWithSpacingSystemProps<C> &
  VariantProps<typeof buttonVariants> &
  ButtonOptionProps;

type ButtonType = <C extends ElementType = SemanticHTMLContentSectionType>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Button: ButtonType = forwardRef(function Button<C extends ElementType = "button">(
  props: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const { children, className, as, variant, size, loading, disabled, fullWidth, endIcon, startIcon, asChild, ...rest } =
    props;
  const typedRest = rest as PolymorphicComponentPropsWithRef<C, PolimophicWithSpacingSystemProps<C>>;

  return <Box as={as} asChild ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...typedRest} />;
});
