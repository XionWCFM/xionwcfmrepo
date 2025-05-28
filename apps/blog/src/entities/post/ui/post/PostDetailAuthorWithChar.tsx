import { Image, Link } from "@repo/router";
import { Flex, Paragraph } from "@xionwcfm/xds";

import { AUTHOR_DESCRIPTION, AUTHOR_NAME } from "~/shared/constants/constants";
import { XION_CHAR_GRAY_60_X_90_WEBP } from "~/shared/constants/images/images";
import { XionEmailIcon } from "~/shared/ui/icon/XionEmailIcon";
import { XionGithubLogoIcon } from "~/shared/ui/icon/XionGithubIcon";
import { XionLinkedinIcon } from "~/shared/ui/icon/XionLinkedInIcon";

export const PostDetailAuthorWithChar = () => {
  return (
    <Flex className=" gap-[16px]">
      <Image src={XION_CHAR_GRAY_60_X_90_WEBP.src} alt="char" width={90} height={135} />
      <Flex className=" flex-col justify-between">
        <Flex className=" flex-col gap-[12px]">
          <Link href={"/"} aria-label={"navigate root route"}>
            <Paragraph
              className=" text-size-6 text-neutral-600 font-bold"
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
