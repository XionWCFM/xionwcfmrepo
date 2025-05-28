"use client";
import { Image, Link } from "@repo/router";

import { useScrollDirection } from "@xionwcfm/react";
import { Flex, cn } from "@xionwcfm/xds";
import { ASSET_XION_BOX_LOGO_48_16 } from "~/shared/assets";
import { ROUTES } from "~/shared/routes";
import { Border } from "~/shared/ui/common/Border";

export const InteractiveHeader = () => {
  const scrollDirection = useScrollDirection();
  const shouldHiding = scrollDirection === "down" ? "-translate-y-[64px]" : "translate-y-0";
  return (
    <Flex
      className={cn(
        "items-center z-[20] w-screen bg-neutral-50 fixed transition-transform duration-300  flex-col",
        shouldHiding,
      )}
      as={"header"}
    >
      <Flex className=" md:max-w-[768px] w-screen items-center justify-between px-[16px] md:px-[0] py-[8px]">
        <Link href={ROUTES.root()} aria-label={"home 화면으로 돌아갑니다"}>
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
