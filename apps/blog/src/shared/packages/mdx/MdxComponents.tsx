import { Flex, Paragraph } from "@xionwcfm/xds";
import type { MDXComponents as tmdxComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;
type ElementProps = HTMLAttributes<HTMLElement>;

export const MdxComponents: tmdxComponents = {
  a: ({ className, href, ...props }: AnchorProps) => {
    if (!href) {
      return null;
    }
    const isAnchorLink = href.startsWith("#");

    if (isAnchorLink) {
      return <a aria-label={props["aria-label"]} title={href.replace("#", "")} href={href} {...props} />;
    }

    return (
      <Link
        className={
          " underline underline-offset-4 text-primary-600 hover:rounded-sm duration-200 transition-colors hover:text-primary-700 hover:bg-neutral-200"
        }
        target={"_blank"}
        href={href ?? ""}
        {...props}
      />
    );
  },
  img: (props) => {
    return (
      <Flex as={"span"} className=" my-[16px] items-center relative w-full h-256 md:h-512">
        <Image
          className=" transition-all duration-200 rounded-md hover:opacity-70"
          src={props.src ?? ""}
          alt={props.alt ?? ""}
          title={props.alt}
          aria-label={props.alt}
          objectFit="contain"
          fill={true}
        />
      </Flex>
    );
  },
  h1: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph className=" mt-[20px] mb-[12px] text-neutral-700" as="h2" {...props} />
  ),
  h2: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph className=" mt-[20px] mb-[12px] text-neutral-700" as={"h2"} size={"9"} weight={"bold"} {...props} />
  ),
  h3: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph className=" mt-[20px] mb-[12px] text-neutral-700" as={"h3"} size={"8"} weight={"bold"} {...props} />
  ),
  h4: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph className=" mt-[20px] mb-[12px] text-neutral-700" as={"h4"} size={"7"} weight={"bold"} {...props} />
  ),
  h5: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph className=" mt-[20px] mb-[12px] text-neutral-700" as={"h5"} size={"6"} weight={"bold"} {...props} />
  ),
  h6: ({ className, color, ...props }: HeadingProps) => (
    <Paragraph className=" mt-[20px] mb-[12px] text-neutral-700" as={"h6"} size={"6"} weight={"bold"} {...props} />
  ),
  p: ({ className, color, ...props }: ParagraphProps) => (
    <Paragraph className=" mt-[16px] text-neutral-600 font-regular leading-loose" size={"6"} {...props} />
  ),
  //@ts-expect-error
  pre: (props: {
    "data-language"?: "tsx";
    "data-theme"?: string & {};
    children: {
      props: {
        children: ReactNode;
      };
    };
  }) => {
    if (props["data-language"]) {
      return (
        <pre className=" overflow-x-auto rounded-sm bg-neutral-50 px-[24px] py-[12px] text-neutral-700">
          <code>{props.children.props.children}</code>
        </pre>
      );
    }
    return (
      <pre
        className={" my-[16px] overflow-x-auto rounded-sm bg-neutral-50 px-[24px] py-[12px] text-neutral-700"}
        {...props}
      >
        <code className={" text-neutral-700"}>{props.children.props.children}</code>
      </pre>
    );
  },
  hr: (_props) => <hr className=" border-t border-neutral-300 my-[24px]" />,
  code: ({ className, ...props }: ElementProps) => (
    <code className={" px-[8px] py-[4px] rounded-md bg-primary-50 text-primary-700 font-medium"} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={" px-[32px] py-[24px] flex  rounded-md flex-col gap-y-[16px] list-disc font-regular text-neutral-600"}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={" text-neutral-700 px-[16px] py-[16px] list-decimal"}>{props.children}</ol>
  ),
  li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => <li className={""} {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className=" my-[6px] w-full overflow-y-auto">
      <table className={"w-full"} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={"m-0 border-t p-0 even:bg-muted"} {...props} />
  ),
  br: () => null,
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={
        "border px-[8px] py-[4px] text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      }
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={"border px-[8px] py-[4px] text-left [&[align=center]]:text-center [&[align=right]]:text-right"}
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span className={" text-neutral-700 font-bold"} {...props} />
  ),
};
