import { Stack } from "@xionwcfm/xds";
import type { PropsWithChildren } from "react";

export const PageLayout = ({ children }: PropsWithChildren) => {
  return <Stack className=" px-16 pt-16 pb-12">{children}</Stack>;
};
