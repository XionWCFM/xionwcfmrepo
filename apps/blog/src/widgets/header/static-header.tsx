import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Image } from "@repo/adapters/image";
import { Link } from "@repo/adapters/link";
import { Stack } from "@xionwcfm/xds";

import { ASSET_XION_BOX_LOGO_48_16 } from "~/shared/assets";
import { isEnabled } from "~/shared/feature-flag";
import { ROUTES } from "~/shared/routes";
import { Separate } from "~/shared/ui/common/separate";

export const StaticHeader = () => {
  return (
    <Stack className={" z-20  bg-neutral-50  "} w={"screen"} as={"header"} items={"center"}>
      <Stack
        maxW={{ md: "768", xl: "1024" }}
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
      <Separate />
    </Stack>
  );
};
