import { Image } from "@xionwcfm/adapters/image";
import { Paragraph } from "@xionwcfm/ui/paragraph";
import { Stack } from "@xionwcfm/ui/stack";
import { ASSET_XION_CHAR_WHITE } from "~/shared/assets";
import { XionEmailIcon } from "../icon/xion-email-icon";
import { XionGithubLogoIcon } from "../icon/xion-github-icon";
import { XionLinkedinIcon } from "../icon/xion-linkedin-icon";

export const MainXionWCFM = () => {
  return (
    <Stack justify={"between"} px={"20"} py={"20"} className=" relative bg-primary-600 h-[450px]">
      <Paragraph as="h1" color={"neutral-50"} weight={"bold"} size={"10"} responsive>
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
