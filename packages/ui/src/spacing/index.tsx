import type {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@xionwcfm/types/polymorphic";
import { type ElementType, type ReactNode, forwardRef } from "react";
import type { SemanticHTMLContentSectionType } from "../types";
type Props<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    className?: string;
  }
>;

type SpacingType = <C extends ElementType = SemanticHTMLContentSectionType>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Spacing: SpacingType = forwardRef(function Spacing<C extends ElementType = "div">(
  { children, as, className, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "div";

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
});
