import { Image } from "@repo/router/image";

import { Flex, Paragraph, Stack } from "@xionwcfm/xds";
import { ASSET_XION_CHAR_WHITE } from "~/shared/assets";
import { XionGithubLogoIcon } from "../icon/XionGithubIcon";
import { XionLinkedinIcon } from "../icon/XionLinkedInIcon";

export const MainTitle = () => {
  return (
    <Stack justify={"between"} px={"20"} py={"20"} className=" w-full items-center bg-primary-600 relative h-[450px]">
      <Flex className=" w-full  max-w-1440 justify-between">
        <Stack>
          <Paragraph as="h1" weight={"bold"} size={"10"} responsive={true} color={"neutral-50"}>
            {"FRONTEND DEVELOPER\nXIONWCFM"}
          </Paragraph>
          <Stack direction={"row"}>
            <Image {...ASSET_XION_CHAR_WHITE} />
          </Stack>

          <Flex className=" mt-16 gap-x-8 h-fit">
            <XionLinkedinIcon className=" text-neutral-50" />
            <XionGithubLogoIcon className=" text-neutral-50" />
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};
