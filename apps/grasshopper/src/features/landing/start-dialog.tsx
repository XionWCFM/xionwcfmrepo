import { useInternalRouter } from "@repo/adapters/router";
import { Button, ConfirmDialog } from "@xionwcfm/xds";
import { $Routes } from "~/shared/routes";

export const StartDialog = ({
  isOpen,
  onClose,
  userName,
}: { isOpen: boolean; onClose: () => void; userName: string }) => {
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
