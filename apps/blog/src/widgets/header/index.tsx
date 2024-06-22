import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Image } from "@xionwcfm/adapters/image";
import { Link } from "@xionwcfm/adapters/link";
import { Stack } from "@xionwcfm/ui/stack";
import { ASSET_XION_BOX_LOGO_48_16 } from "~/shared/assets";
import { ROUTES } from "~/shared/routes";

export const Header = () => {
  return (
    <Stack
      className=" bg-neutral-50"
      as={"header"}
      direction={"row"}
      align={"center"}
      justify={"between"}
      px={"16"}
      py={"8"}
    >
      <Link href={ROUTES.root()}>
        <Image
          {...ASSET_XION_BOX_LOGO_48_16}
          width={ASSET_XION_BOX_LOGO_48_16.width * 2}
          height={ASSET_XION_BOX_LOGO_48_16.height * 2}
        />
      </Link>

      <button type={"button"}>
        <HamburgerMenuIcon className=" w-24 h-24 text-neutral-400" />
      </button>
    </Stack>
  );
};
