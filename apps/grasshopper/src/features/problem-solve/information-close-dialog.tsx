import { useInternalRouter } from "@repo/router/router";
import { Button } from "@xionwcfm/xds";
import { ConfirmDialog } from "@xionwcfm/xds/confirm-dialog";
import { $Routes } from "~/shared/routes";

export const InformationCloseDialog = (props: { isOpen: boolean; onClose: () => void }) => {
  const { isOpen, onClose } = props;
  const router = useInternalRouter();
  const handleClick = () => {
    onClose();
    router.push($Routes.root.path());
  };
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="메인 화면으로 돌아가시겠어요?"
      primaryButton={
        <Button className=" w-full" onClick={handleClick} variant={"primary"} size={"md"}>
          네
        </Button>
      }
      secondaryButton={
        <Button onClick={onClose} className=" w-full" variant={"outline"} size={"md"}>
          취소
        </Button>
      }
    />
  );
};
