import { cn } from "@xionwcfm/xds";

export const RowSeparator = ({ className }: { className?: string }) => {
  return <div className={cn("bg-gray-200 h-[1px] w-full", className)} />;
};
