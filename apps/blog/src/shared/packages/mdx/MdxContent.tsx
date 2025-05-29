import * as runtime from "react/jsx-runtime";
import { MdxComponents } from "./MdxComponents";

const useMdxComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

export const MdxContent = (props: { mdx: string }) => {
  const { mdx } = props;
  const Component = useMdxComponent(mdx);
  return <Component components={MdxComponents} />;
};
