import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "@xionwcfm/adapters/link";
import { cn } from "@xionwcfm/ui/cn";
import { EXTERNAL_GITHUB } from "~/shared/constants";
import type { IconProps } from "./icon.type";

export const XionGithubLogoIcon = (props: IconProps) => {
  const { onClick, className } = props;
  return (
    <Link target={"_blank"} href={EXTERNAL_GITHUB} onClick={onClick} aria-label={"go to XionWCFM github"}>
      <GitHubLogoIcon className={cn(" w-24 h-24 text-neutral-500", className)} />
    </Link>
  );
};
