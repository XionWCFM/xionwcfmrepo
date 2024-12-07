import { Paragraph, Stack } from "@xionwcfm/xds";
import type { MDXComponents as tmdxComponents } from "mdx/types";
import Image from "next/image";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { CallOut } from "./CallOut";
import { MdxNextLink } from "./MdxNextLink";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;
type ElementProps = HTMLAttributes<HTMLElement>;
type PreProps = HTMLAttributes<HTMLPreElement>;

export const MdxComponents: tmdxComponents = {
  a: ({ className, href, ...props }: AnchorProps) => (
    <MdxNextLink
      className={
        " underline underline-offset-4 text-primary-600 hover:rounded-sm duration-200 transition-colors hover:text-primary-700 hover:bg-neutral-200"
      }
      target={"_blank"}
      href={href}
      {...props}
    />
  ),
  img: (props) => {
    return (
      <Stack my="16" as={"span"} items={"center"} className=" relative w-full h-256 md:h-512">
        <Image
          className=" transition-all duration-200 rounded-md hover:opacity-70"
          src={props.src ?? ""}
          alt={props.alt ?? ""}
          title={props.alt}
          aria-label={props.alt}
          objectFit="contain"
          fill={true}
        />
      </Stack>
    );
  },
  h1: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph mt="20" mb="12" as="h2" color={"neutral-700"} {...props} />
  ),
  h2: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph mt="20" mb="12" as={"h2"} size={"9"} weight={"bold"} color={"neutral-700"} {...props} />
  ),
  h3: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph mt="20" mb="12" as={"h3"} size={"8"} weight={"bold"} color={"neutral-700"} {...props} />
  ),
  h4: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph mt="20" mb="12" as={"h4"} size={"7"} weight={"bold"} color={"neutral-700"} {...props} />
  ),
  h5: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph mt="20" mb="12" as={"h5"} size={"6"} weight={"bold"} color={"neutral-700"} {...props} />
  ),
  h6: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph mt="20" mb="12" as={"h6"} size={"6"} weight={"bold"} color={"neutral-700"} {...props} />
  ),
  p: ({ className, color, ...props }: ParagraphProps) => (
    <Paragraph size={"5"} mt="24" className=" leading-[240%]" weight={"light"} color={"neutral-600"} {...props} />
  ),
  pre: ({ className, ...props }: PreProps) => (
    <pre className={" my-24 overflow-x-auto rounded-sm bg-primary-50 px-24 py-12 text-neutral-700"} {...props} />
  ),
  hr: (_props) => <hr className=" border-t border-neutral-300 my-24" />,
  code: ({ className, ...props }: ElementProps) => (
    <code className={" whitespace-pre-wrap text-gray-800 text-size-4"} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={" px-32 py-24 flex  rounded-md flex-col gap-y-16 list-disc font-regular text-neutral-600"}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={" text-neutral-600 font-thin px-20 py-12 list-decimal "} {...props} />
  ),
  li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => <li className={""} {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className=" my-6 w-full overflow-y-auto">
      <table className={"w-full"} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={"m-0 border-t p-0 even:bg-muted"} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={"border px-8 py-4 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={"border px-8 py-4 text-left [&[align=center]]:text-center [&[align=right]]:text-right"} {...props} />
  ),
  CallOut: CallOut,
};
