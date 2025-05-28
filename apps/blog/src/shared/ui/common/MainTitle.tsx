import { Image } from "@repo/router";

import { Flex, Paragraph } from "@xionwcfm/xds";
import { ASSET_XION_CHAR_WHITE } from "~/shared/assets";
import { XionGithubLogoIcon } from "../icon/XionGithubIcon";
import { XionLinkedinIcon } from "../icon/XionLinkedInIcon";

export const MainTitle = () => {
  return (
    <Flex className=" flex-col justify-between p-[20px] w-full items-center bg-primary-600 relative h-[450px]">
      <Flex className=" w-full  max-w-1440 justify-between">
        <Flex className=" flex-col">
          <Paragraph as="h1" weight={"bold"} size={"10"} responsive={true} color={"neutral-50"}>
            {"FRONTEND DEVELOPER\nXIONWCFM"}
          </Paragraph>
          <Flex>
            <Image {...ASSET_XION_CHAR_WHITE} />
          </Flex>

          <Flex className=" mt-[16px] gap-x-[8px] h-fit">
            <XionLinkedinIcon className=" text-neutral-50" />
            <XionGithubLogoIcon className=" text-neutral-50" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
