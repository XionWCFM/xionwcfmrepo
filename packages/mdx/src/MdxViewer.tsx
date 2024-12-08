import { evaluate } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import type React from "react";
import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import { MdxComponents } from "./MdxComponents";

export const MdxViewer = ({ source }: { source: string }) => {
  const [Content, setContent] = useState<React.FC | null>(null);

  useEffect(() => {
    const compileMdx = async () => {
      //@ts-expect-error
      const { default: mdxContent } = await evaluate(source, {
        ...runtime,
        // biome-ignore lint/style/useNamingConvention: <explanation>
        useMDXComponents: () => MdxComponents,
        remarkPlugins: [remarkBreaks],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["subheading-anchor"],
                ariaLabel: "Link to section",
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: "slack-dark",
              //@ts-expect-error
              onVisitLine(node) {
                if (node.children.length === 0) {
                  node.children = [{ type: "text", value: " " }];
                }
              },
              //@ts-expect-error
              onVisitHighlightedLine(node) {
                node.properties.className.push("line--highlighted");
              },
              //@ts-expect-error
              onVisitHighlightedWord(node) {
                node.properties.className = ["word--highlighted"];
              },
            },
          ],
        ],
      });
      setContent(() => mdxContent);
    };

    compileMdx();
  }, [source]);

  return Content ? (
    <MDXProvider components={MdxComponents}>
      <Content />
    </MDXProvider>
  ) : null;
};
