import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Image } from "@xionwcfm/adapters/image";
import { Link } from "@xionwcfm/adapters/link";
import { EmailIcon } from "@xionwcfm/icon/email-icon";
import { Paragraph } from "@xionwcfm/ui/paragraph";
import { Stack } from "@xionwcfm/ui/stack";
import { ASSET_XION_CHAR_GRAY } from "~/shared/assets";
import { AUTHOR_DESCRIPTION, AUTHOR_NAME } from "~/shared/constants";
import { isEnabled } from "~/shared/feature-flag";
export const PostDetailAuthorWithChar = () => {
  return (
    <Stack direction={"row"} gap={"16"}>
      <Image {...ASSET_XION_CHAR_GRAY} />
      <Stack justify={"between"}>
        <Stack gap={"12"}>
          <Paragraph weight={"bold"} color={"neutral-600"} size={"6"}>
            {AUTHOR_NAME}
          </Paragraph>
          <Paragraph size={"4"} weight={"thin"} color={"neutral-600"}>
            {AUTHOR_DESCRIPTION}
          </Paragraph>
        </Stack>

        <Stack direction={"row"} gap={"20"}>
          <Link href="" aria-label={"go to XionWCFM github"}>
            <GitHubLogoIcon className=" w-24 h-24 text-neutral-500" />
          </Link>

          <Link href="" aria-label={"go to XionWCFM LinkedIn"}>
            <LinkedInLogoIcon className=" w-24 h-24 text-neutral-500" />
          </Link>
          {isEnabled("author-email") ? <EmailIcon className=" w-24 h-24 text-neutral-500" /> : null}
        </Stack>
      </Stack>
    </Stack>
  );
};
