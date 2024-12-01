import NextLink from "next/link";
import { type ComponentPropsWithoutRef, type ComponentType, type ReactNode, type Ref, forwardRef } from "react";

type LinkProps = {
  href: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  children?: ReactNode;
  "aria-label": string;
} & ComponentPropsWithoutRef<"a">;

export type LinkType = ComponentType<LinkProps>;

export const Link = forwardRef(function Link(props: LinkProps, ref: Ref<HTMLAnchorElement>) {
  const { href, replace, scroll, prefetch, children, ...attributes } = props;
  return (
    <NextLink
      title={props["aria-label"] ?? ""}
      href={href}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      ref={ref}
      {...attributes}
    >
      {children}
    </NextLink>
  );
});
