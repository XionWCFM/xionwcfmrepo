import { MDXRemote as RSCMDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import { MDXComponents } from "./MdxComponents";

interface MdxRemoteProps {
  source: string;
}
export const MdxRemote = ({ source }: MdxRemoteProps) => {
  return (
    <RSCMDXRemote
      source={source}
      components={MDXComponents}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
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
        },
      }}
    />
  );
};
