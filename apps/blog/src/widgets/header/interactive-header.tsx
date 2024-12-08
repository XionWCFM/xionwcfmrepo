"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Image } from "@repo/router/image";
import { Link } from "@repo/router/link";

import { useScrollDirection } from "@xionwcfm/react";
import { Stack, cn } from "@xionwcfm/xds";
import { ASSET_XION_BOX_LOGO_48_16 } from "~/shared/assets";
import { isEnabled } from "~/shared/feature-flag";
import { ROUTES } from "~/shared/routes";
import { Border } from "~/shared/ui/common/Border";

export const InteractiveHeader = () => {
  const scrollDirection = useScrollDirection();
  const shouldHiding = scrollDirection === "down" ? "-translate-y-[64px]" : "translate-y-0";
  return (
    <Stack
      className={cn("z-20 w-screen bg-neutral-50 fixed transition-transform duration-300", shouldHiding)}
      as={"header"}
      items={"center"}
    >
      <Stack
        maxW={{ md: "768" }}
        w={"screen"}
        direction={"row"}
        items={"center"}
        justify={"between"}
        px={{ initial: "16", md: "0" }}
        py={"8"}
      >
        <Link href={ROUTES.root()} aria-label={"home 화면으로 돌아갑니다"}>
          <Image
            {...ASSET_XION_BOX_LOGO_48_16}
            width={ASSET_XION_BOX_LOGO_48_16.width * 2}
            height={ASSET_XION_BOX_LOGO_48_16.height * 2}
          />
        </Link>

        {isEnabled("header-hambuger") ? (
          <button type={"button"}>
            <HamburgerMenuIcon className=" w-24 h-24 text-neutral-400" />
          </button>
        ) : null}
      </Stack>
      <Border />
    </Stack>
  );
};
