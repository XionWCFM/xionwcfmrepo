"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Image } from "@xionwcfm/adapters/image";
import { Link } from "@xionwcfm/adapters/link";
import { useScrollDirection } from "@xionwcfm/hooks/use-scroll-direction";
import { Separate } from "@xionwcfm/ui/separate";
import { Stack } from "@xionwcfm/ui/stack";
import { ASSET_XION_BOX_LOGO_48_16 } from "~/shared/assets";
import { isEnabled } from "~/shared/feature-flag";
import { ROUTES } from "~/shared/routes";

export const InteractiveHeader = () => {
  const scrollDirection = useScrollDirection();
  const shouldHiding = scrollDirection === "down" ? "-translate-y-[64px]" : "translate-y-0";
  return (
    <Stack
      className={` z-20 w-screen bg-neutral-50   fixed transition-transform duration-300 ${shouldHiding}`}
      as={"header"}
      align={"center"}
    >
      <Stack
        className=" px-16 md:px-0 md:max-w-768  "
        w={"screen"}
        direction={"row"}
        align={"center"}
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

        {isEnabled("header-hambuger") ? (
          <button type={"button"}>
            <HamburgerMenuIcon className=" w-24 h-24 text-neutral-400" />
          </button>
        ) : null}
      </Stack>
      <Separate />
    </Stack>
  );
};
