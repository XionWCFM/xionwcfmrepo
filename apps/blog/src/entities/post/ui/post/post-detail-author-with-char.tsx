import { Image } from "@xionwcfm/adapters/image";
import { Link } from "@xionwcfm/adapters/link";
import { Paragraph, Stack } from "@xionwcfm/xds";

import { ASSET_XION_CHAR_GRAY } from "~/shared/assets";
import { AUTHOR_DESCRIPTION, AUTHOR_NAME } from "~/shared/constants";
import { ROUTES } from "~/shared/routes";
import { XionEmailIcon } from "~/shared/ui/icon/xion-email-icon";
import { XionGithubLogoIcon } from "~/shared/ui/icon/xion-github-icon";
import { XionLinkedinIcon } from "~/shared/ui/icon/xion-linkedin-icon";
export const PostDetailAuthorWithChar = () => {
  return (
    <Stack direction={"row"} gap={"16"}>
      <Image {...ASSET_XION_CHAR_GRAY} />
      <Stack justify={"between"}>
        <Stack gap={"12"}>
          <Link href={ROUTES.root()} aria-label={"navigate root route"}>
            <Paragraph weight={"bold"} color={"neutral-600"} size={"6"}>
              {AUTHOR_NAME}
            </Paragraph>
          </Link>

          <Paragraph size={"4"} weight={"thin"} color={"neutral-600"}>
            {AUTHOR_DESCRIPTION}
          </Paragraph>
        </Stack>

        <Stack direction={"row"} gap={"12"}>
          <XionGithubLogoIcon />
          <XionLinkedinIcon />
          <XionEmailIcon />
        </Stack>
      </Stack>
    </Stack>
  );
};
