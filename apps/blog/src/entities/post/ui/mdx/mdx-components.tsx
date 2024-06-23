import { Paragraph } from "@xionwcfm/ui/paragraph";
import type { MDXComponents as TMDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { MdxNextImage } from "./mdx-next-image";
import { MdxNextLink } from "./mdx-next-link";

type AProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type HProps = HTMLAttributes<HTMLHeadingElement>;
type PProps = HTMLAttributes<HTMLParagraphElement>;
type CProps = HTMLAttributes<HTMLElement>;
type PreProps = HTMLAttributes<HTMLPreElement>;

export const MDXComponents: TMDXComponents = {
  img: MdxNextImage,
  a: ({ className, href, ...props }: AProps) => <MdxNextLink target={"_blank"} href={href} {...props} />,
  h1: ({ className, color, ...props }: HProps) => <Paragraph as="h2" color={"neutral-700"} {...props} />,
  h2: ({ className, color, ...props }: HProps) => (
    <Paragraph my="12" as={"h2"} size={"9"} weight={"bold"} color={"neutral-700"} {...props} />
  ),
  h3: ({ className, color, ...props }: HProps) => (
    <Paragraph my={"8"} as={"h3"} size={"8"} weight={"bold"} color={"neutral-700"} {...props} />
  ),
  h4: ({ className, color, ...props }: HProps) => (
    <Paragraph my="8" as={"h4"} size={"7"} weight={"bold"} color={"neutral-700"} {...props} />
  ),
  h5: ({ className, color, ...props }: HProps) => (
    <Paragraph my="8" as={"h5"} size={"6"} weight={"bold"} color={"neutral-700"} {...props} />
  ),
  h6: ({ className, color, ...props }: HProps) => (
    <Paragraph my="8" as={"h6"} size={"6"} weight={"bold"} color={"neutral-700"} {...props} />
  ),
  p: ({ className, color, ...props }: PProps) => (
    <Paragraph size={"5"} leading={"looser"} weight={"light"} color={"neutral-600"} {...props} />
  ),
  pre: ({ className, ...props }: PreProps) => (
    <pre className={" my-24 overflow-x-auto rounded-sm bg-neutral-200 px-24 py-12 text-neutral-700"} {...props} />
  ),
  hr: (props) => <hr className=" border-t border-neutral-300 my-16" />,
  code: ({ className, ...props }: CProps) => <code className={" text-size-3"} {...props} />,
};
