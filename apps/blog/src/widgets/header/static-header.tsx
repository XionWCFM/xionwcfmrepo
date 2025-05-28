"use client";
import { Image, Link } from "@repo/router";
import { Flex } from "@xionwcfm/xds";
import { ASSET_XION_BOX_LOGO_48_16 } from "~/shared/assets";
import { Border } from "~/shared/ui/common/Border";

export const StaticHeader = () => {
  return (
    <Flex className={" z-20  bg-neutral-50 w-screen items-center  "} as={"header"}>
      <Flex className=" md:max-w-[768px] w-screen items-center justify-between px-[16px] md:px-[0] py-[8px]">
        <Link href={"/"} aria-label={"home 화면으로 돌아갑니다"}>
          <Image
            {...ASSET_XION_BOX_LOGO_48_16}
            width={ASSET_XION_BOX_LOGO_48_16.width * 2}
            height={ASSET_XION_BOX_LOGO_48_16.height * 2}
          />
        </Link>
      </Flex>
      <Border />
    </Flex>
  );
};
