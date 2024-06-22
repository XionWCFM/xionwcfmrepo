import Link from "next/link";
import type { HTMLProps } from "react";

export const MdxNextLink = (props: HTMLProps<HTMLAnchorElement>) => {
  const { href, ...rest } = props;
  if (!href) return null;
  const isAnchorLink = href.startsWith("#");

  if (isAnchorLink) {
    return <a aria-label={props["aria-label"]} title={href.replace("#", "")} href={href} {...rest} />;
  }
  return (
    <Link href={href} className={props.className} target={props.target} title={props.target} rel={props.rel}>
      {props.children}
    </Link>
  );
};
