import { cn } from "@xionwcfm/xds";

export const Border = (props: { className?: string }) => {
  return <div className={cn(" border-t w-full border-neutral-200", props.className)} />;
};
