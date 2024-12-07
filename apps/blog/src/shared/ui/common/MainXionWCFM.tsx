import { Image } from "@repo/router/image";

import { Paragraph, Stack } from "@xionwcfm/xds";
import { ASSET_XION_CHAR_WHITE } from "~/shared/assets";
import { XionEmailIcon } from "../icon/XionEmailIcon";
import { XionGithubLogoIcon } from "../icon/XionGithubIcon";
import { XionLinkedinIcon } from "../icon/XionLinkedInIcon";

export const MainXionWcfm = () => {
  return (
    <Stack justify={"between"} px={"20"} py={"20"} className=" relative bg-primary-600 h-[450px]">
      <Paragraph as="h1" weight={"bold"} size={"10"} responsive={true} color={"neutral-50"}>
        {"FRONTEND DEVELOPER\nXIONWCFM"}
      </Paragraph>
      <Stack className=" " direction={"row"}>
        <Image {...ASSET_XION_CHAR_WHITE} />
      </Stack>
      <Stack className=" absolute bottom-0 right-0 translate-x-[-20px] translate-y-[-16px]">
        <Stack direction={"row"} gap={"8"}>
          <XionLinkedinIcon className=" text-neutral-50" />
          <XionGithubLogoIcon className=" text-neutral-50" />
          <XionEmailIcon className="  text-neutral-50" />
        </Stack>
      </Stack>
    </Stack>
  );
};
