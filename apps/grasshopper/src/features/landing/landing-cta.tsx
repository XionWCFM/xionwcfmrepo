import { useInternalRouter } from "@repo/router/router";
import { FixedBottom, FixedBottomCta } from "@xionwcfm/xds";
import { overlay } from "overlay-kit";
import { userStore } from "~/entities/user/model/user.store";
import { $Routes } from "~/shared/routes";
import { StartDialog } from "./start-dialog";

export const FixedLandingCta = () => {
  const { userName } = userStore.useAtomValue();
  const router = useInternalRouter();

  const handleCtaClick = () => {
    const isFirstUser = userName.length === 0;

    if (isFirstUser) {
      return router.push($Routes.enterName.path());
    }
    return overlay.open(({ isOpen, unmount }) => <StartDialog isOpen={isOpen} onClose={unmount} userName={userName} />);
  };

  return (
    <FixedBottom>
      <FixedBottomCta onClick={handleCtaClick}>시작하기</FixedBottomCta>
    </FixedBottom>
  );
};
