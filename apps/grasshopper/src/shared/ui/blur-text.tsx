import { cn } from "@xionwcfm/xds";
import { type PropsWithChildren, useState } from "react";

export const BlurText = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(true);
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={() => setState(false)}
      style={{ transitionDuration: `2000ms` }}
      className={cn(" cursor-pointer transition-all", state && " blur-sm shadow-sm")}
    >
      {children}
    </div>
  );
};
