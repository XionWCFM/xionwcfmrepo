import EmailIcon from "@xionwcfm/icon/email-icon";
import { cn } from "@xionwcfm/ui/cn";
import type { IconProps } from "./icon.type";

export const XionEmailIcon = (props: IconProps) => {
  const { onClick, className } = props;
  return <EmailIcon onClick={onClick} className={cn("w-24 h-24 text-neutral-500", className)} />;
};
