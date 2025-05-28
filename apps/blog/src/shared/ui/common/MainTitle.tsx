import { Image } from "@repo/router";

import { Flex, Paragraph } from "@xionwcfm/xds";
import { XION_CHAR_WHITE_135_X_197_WEBP } from "~/shared/constants/images/images";
import { XionGithubLogoIcon } from "../icon/XionGithubIcon";
import { XionLinkedinIcon } from "../icon/XionLinkedInIcon";

export const MainTitle = () => {
  return (
    <Flex className=" flex-col justify-between p-[20px] w-full items-center bg-primary-600 relative h-[450px]">
      <Flex className=" w-full  max-w-1440 justify-between">
        <Flex className=" flex-col">
          <Paragraph className=" mb-[8px]" as="h1" weight={"bold"} size={"10"} responsive={true} color={"neutral-50"}>
            {"FRONTEND DEVELOPER\nXIONWCFM"}
          </Paragraph>

          <Flex className="  mb-[16px]">
            <Image src={XION_CHAR_WHITE_135_X_197_WEBP.src} width={135} height={197} alt="XionWCFM" />
          </Flex>

          <Flex className="gap-x-[8px] h-fit">
            <XionLinkedinIcon className=" text-neutral-50" />
            <XionGithubLogoIcon className=" text-neutral-50" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
