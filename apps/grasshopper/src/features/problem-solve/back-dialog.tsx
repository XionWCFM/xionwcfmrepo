import { useInternalRouter } from "@repo/router/router";
import { Button, ConfirmDialog } from "@xionwcfm/xds";

export const ProblemSolveBackDialog = (props: { isOpen: boolean; onClose: () => void }) => {
  const { isOpen, onClose } = props;
  const router = useInternalRouter();

  const handleClick = () => {
    onClose();
    router.back();
  };
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="정말 뒤로가실건가요?"
      description="지금 뒤로가면 여태까지 푼 문제들이 초기화돼요"
      primaryButton={
        <Button className="w-full" onClick={handleClick} variant={"primary"} size={"md"}>
          네
        </Button>
      }
      secondaryButton={
        <Button as="button" onClick={onClose} className=" w-full" variant={"outline"} size={"md"}>
          취소
        </Button>
      }
    />
  );
};
