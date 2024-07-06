import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Link } from "@xionwcfm/adapters/link";
import { cn } from "@xionwcfm/ui/cn";
import { EXTERNAL_LINKED_IN } from "~/shared/constants";
import type { IconProps } from "./icon.type";

export const XionLinkedinIcon = (props: IconProps) => {
  const { onClick, className } = props;
  return (
    <Link
      className=" hover:opacity-70"
      target={"_blank"}
      href={EXTERNAL_LINKED_IN}
      onClick={onClick}
      aria-label={"go to XionWCFM LinkedIn"}
    >
      <LinkedInLogoIcon className={cn(" w-24 h-24 text-neutral-500", className)} />
    </Link>
  );
};
