"use client";
import { Image } from "@repo/router/image";
import { Link } from "@repo/router/link";
import { Stack } from "@xionwcfm/xds";
import { ASSET_XION_BOX_LOGO_48_16 } from "~/shared/assets";
import { ROUTES } from "~/shared/routes";
import { Border } from "~/shared/ui/common/Border";

export const StaticHeader = () => {
  return (
    <Stack className={" z-20  bg-neutral-50  "} w={"screen"} as={"header"} items={"center"}>
      <Stack
        className=" px-16 md:px-0"
        maxW={{ md: "768", xl: "1024" }}
        w={"screen"}
        direction={"row"}
        items={"center"}
        justify={"between"}
        py={"8"}
      >
        <Link href={ROUTES.root()} aria-label={"home 화면으로 돌아갑니다"}>
          <Image
            {...ASSET_XION_BOX_LOGO_48_16}
            width={ASSET_XION_BOX_LOGO_48_16.width * 2}
            height={ASSET_XION_BOX_LOGO_48_16.height * 2}
          />
        </Link>
        {/* 
        {isEnabled("header-hambuger") ? (
          <button type={"button"}>
            <HamburgerMenuIcon className=" w-24 h-24 text-neutral-400" />
          </button>
        ) : null} */}
      </Stack>
      <Border />
    </Stack>
  );
};
