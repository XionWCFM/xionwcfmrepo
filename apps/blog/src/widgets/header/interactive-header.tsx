"use client";
import { Image, Link } from "@repo/router";

import { useScrollDirection } from "@xionwcfm/react";
import { Flex, cn } from "@xionwcfm/xds";
import { XION_BOX_LOGO_48_X_16_WEBP } from "~/shared/constants/images/images";
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
      <Flex className=" md:max-w-[768px] w-screen items-center justify-between px-[16px] md:px-[0] py-[16px]">
        <Link href={"/"} aria-label={"home 화면으로 돌아갑니다"}>
          <Image src={XION_BOX_LOGO_48_X_16_WEBP.src} width={96} height={32} alt="boxlogo" />
        </Link>
      </Flex>
      <Border />
    </Flex>
  );
};
