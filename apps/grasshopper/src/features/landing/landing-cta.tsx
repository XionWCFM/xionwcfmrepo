import { useInternalRouter } from "@xionwcfm/adapters/router";
import { Button, ConfirmDialog, FixedBottom, FixedBottomCta } from "@xionwcfm/xds";
import { overlay } from "overlay-kit";
import { userStore } from "~/entities/user/user.store";
import { $Routes } from "~/shared/routes";

export const FixedLandingCta = () => {
  const { userName } = userStore.useAtomValue();
  const isFirstUser = userName.length === 0;
  const router = useInternalRouter();

  const handleCtaClick = () => {
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

const StartDialog = ({ isOpen, onClose, userName }: { isOpen: boolean; onClose: () => void; userName: string }) => {
  const router = useInternalRouter();
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="이전에 방문하신적이 있으시군요!"
      description={`${userName}님에겐 설명이 더 필요 없겠네요 \n바로 문제를 풀러갈까요?`}
      primaryButton={
        <Button
          className=" w-full  text-size-4"
          variant={"primary"}
          size={"md"}
          onClick={() => {
            onClose();
            router.push($Routes.problemSolve.path());
          }}
        >
          좋아요!
        </Button>
      }
      secondaryButton={
        <Button
          className=" w-full text-size-4"
          variant={"outline"}
          size={"md"}
          onClick={() => {
            onClose();
            router.push($Routes.enterName.path());
          }}
        >
          설명을 들을래요
        </Button>
      }
    />
  );
};
