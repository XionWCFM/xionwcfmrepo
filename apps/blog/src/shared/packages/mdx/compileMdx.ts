import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";

export const compileMdx = async (mdx: string) => {
  const matterData = matter(mdx);
  const result = await compile(matterData.content, {
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
          theme: "github-light",
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
    jsxRuntime: "automatic",
    outputFormat: "function-body",
  });

  return {
    frontmatter: matterData.data,
    code: result.toString(),
  };
};
