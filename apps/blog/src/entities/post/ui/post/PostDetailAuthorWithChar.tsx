import { Image, Link } from "@repo/router";
import { Flex, Paragraph } from "@xionwcfm/xds";

import { ASSET_XION_CHAR_GRAY } from "~/shared/assets";
import { AUTHOR_DESCRIPTION, AUTHOR_NAME } from "~/shared/constants";
import { XionEmailIcon } from "~/shared/ui/icon/XionEmailIcon";
import { XionGithubLogoIcon } from "~/shared/ui/icon/XionGithubIcon";
import { XionLinkedinIcon } from "~/shared/ui/icon/XionLinkedInIcon";
export const PostDetailAuthorWithChar = () => {
  return (
    <Flex className=" gap-[16px]">
      <Image {...ASSET_XION_CHAR_GRAY} />
      <Flex className=" flex-col justify-between">
        <Flex className=" flex-col gap-[12px]">
          <Link href={"/"} aria-label={"navigate root route"}>
            <Paragraph
              className=" text-size-6 bg-neutral-600 font-bold"
              weight={"bold"}
              color={"neutral-600"}
              size={"6"}
            >
              {AUTHOR_NAME}
            </Paragraph>
          </Link>

          <Paragraph size={"4"} weight={"thin"} color={"neutral-600"}>
            {AUTHOR_DESCRIPTION}
          </Paragraph>
        </Flex>

        <Flex className=" gap-[12px]">
          <XionGithubLogoIcon />
          <XionLinkedinIcon />
          <XionEmailIcon />
        </Flex>
      </Flex>
    </Flex>
  );
};
