import type {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@xionwcfm/types/polymorphic";
import { type ElementType, type ReactNode, forwardRef } from "react";
import type { SemanticHTMLTextContentType } from "../types";

type Props<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    className?: string;
  }
>;

type ParagraphType = <C extends ElementType = SemanticHTMLTextContentType>(
  props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Paragraph: ParagraphType = forwardRef(function Paragraph<C extends ElementType = "p">(
  { children, as, className, ...rest }: Props<C>,
  ref?: PolymorphicRef<C>,
) {
  const Component = as || "p";

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
});
