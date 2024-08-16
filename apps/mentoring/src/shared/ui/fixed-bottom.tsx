import { Portal } from "@xionwcfm/ui";
import { PropsWithChildren } from "react";

export const FixedBottom = ({ children }: PropsWithChildren) => {
  return (
    <Portal>
      <div className=" fixed bottom-[0px] z-20  w-screen px-16 pb-16 left-[50%] translate-x-[-50%]">{children}</div>
    </Portal>
  );
};
