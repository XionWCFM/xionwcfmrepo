import { Paragraph } from "@xionwcfm/ui/paragraph";
import type { PropsWithChildren } from "react";

export const PostDetailTitle = (props: PropsWithChildren) => {
  return (
    <Paragraph weight={"bold"} responsive size={"10"} color={"neutral-600"}>
      {props.children}
    </Paragraph>
  );
};
