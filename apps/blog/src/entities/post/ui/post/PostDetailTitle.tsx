import { Paragraph } from "@xionwcfm/xds";
import type { PropsWithChildren } from "react";

export const PostDetailTitle = (props: PropsWithChildren) => {
  return (
    <Paragraph as="h1" weight={"bold"} responsive size={"10"} color={"neutral-600"}>
      {props.children}
    </Paragraph>
  );
};
