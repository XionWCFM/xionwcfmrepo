import * as runtime from "react/jsx-runtime";
import { MdxComponents } from "./MdxComponents";
import { compileMdx } from "./compile";

const useMdxComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

export const MdxRemote = async (props: {
  mdx: string;
}) => {
  const { mdx, ...rest } = props;
  const { code } = await compileMdx(mdx);
  const Component = useMdxComponent(code);
  return <Component components={MdxComponents} {...rest} />;
};
