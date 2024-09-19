import { Paragraph } from "@xionwcfm/xds";
import React from "react";
import { PropsWithChildren } from "react";

export const Title = ({ children }: PropsWithChildren) => {
  return (
    <Paragraph mt={"24"} mb={"16"} color={"neutral-600"} size={"8"} as={"h2"}>
      {children}
    </Paragraph>
  );
};
