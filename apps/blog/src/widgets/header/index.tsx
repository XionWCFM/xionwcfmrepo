import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Image } from "@xionwcfm/adapters/image";
import { Stack } from "@xionwcfm/ui/stack";
import { ASSET_XION_BOX_LOGO_48_16 } from "~/shared/assets";
export const Header = () => {
  return (
    <Stack as={"header"} direction={"row"} justify={"between"} px={"12"} py={"8"}>
      <Image {...ASSET_XION_BOX_LOGO_48_16} />
      <HamburgerMenuIcon />
    </Stack>
  );
};
