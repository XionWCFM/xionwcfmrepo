import type {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@xionwcfm/types/polymorphic";
import { type VariantProps, cva } from "class-variance-authority";
import { type ElementType, type ReactNode, forwardRef } from "react";
import { cn } from "../cn";
import type { SemanticHTMLContentSectionType } from "../types";

const spacingVariants = cva("", {
  variants: {
    w: {
      default: "",
      "0": "w-0",
      "4": "w-4",
      "8": "w-8",
      "12": "w-12",
      "16": "w-16",
      "20": "w-20",
      "24": "w-24",
      "28": "w-28",
      "32": "w-32",
      "36": "w-36",
      "40": "w-40",
      "44": "w-44",
      "48": "w-48",
      "64": "w-64",
      "76": "w-76",
      "88": "w-88",
      "100": "w-100",
      "128": "w-128",
    },
    h: {
      default: "",
      "0": "h-0",
      "4": "h-4",
      "8": "h-8",
      "12": "h-12",
      "16": "h-16",
      "20": "h-20",
      "24": "h-24",
      "28": "h-28",
      "32": "h-32",
      "36": "h-36",
      "40": "h-40",
      "44": "h-44",
      "48": "h-48",
      "64": "h-64",
      "76": "h-76",
      "88": "h-88",
      "100": "h-100",
      "128": "h-128",
    },
  },
  defaultVariants: {
    w: "default",
    h: "default",
  },
});

type Props<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    className?: string;
  }
> &
  VariantProps<typeof spacingVariants>;

type SpacingType = <C extends ElementType = SemanticHTMLContentSectionType>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Spacing: SpacingType = forwardRef(function Spacing<C extends ElementType = "div">(
  { children, as, className, w, h, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "div";

  return (
    <Component ref={ref} className={cn(spacingVariants({ w, h }), className)} {...rest}>
      {children}
    </Component>
  );
});
