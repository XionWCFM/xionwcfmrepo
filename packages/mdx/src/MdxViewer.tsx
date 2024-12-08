import { evaluate } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import type React from "react";
import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
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
