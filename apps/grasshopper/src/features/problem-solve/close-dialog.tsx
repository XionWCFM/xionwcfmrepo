import { useInternalRouter } from "@repo/router/router";
import { useLoading } from "@xionwcfm/react";
import { Button, ConfirmDialog } from "@xionwcfm/xds";
import { delay } from "es-toolkit/promise";
import { GrasshopperQuestionAnswerType } from "~/entities/grasshoppers/model/grasshopper.model";
import { grasshopperResultSearchParams } from "~/entities/grasshoppers/model/grasshopper.schema";

export const ProblemSolveCloseDialog = (props: {
  questionAnswers: GrasshopperQuestionAnswerType[];
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}) => {
  const { userName, isOpen, onClose, questionAnswers } = props;
  const [isLoading, startTransition] = useLoading();
  const router = useInternalRouter();

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const handleGetReportClick = async () => {
    await startTransition(delay(3000));
    onClose();
    router.push(grasshopperResultSearchParams.create({ userName, questionAnswers: questionAnswers }));
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={handleClose}
      title="결과지를 받으실건가요?"
      description="문제를 다 풀지 않아도 결과지를 받을 수 있어요"
      primaryButton={
        <Button loading={isLoading} className=" w-full" onClick={handleGetReportClick} variant={"primary"} size={"md"}>
          네
        </Button>
      }
      secondaryButton={
        <Button as="button" disabled={isLoading} onClick={onClose} className=" w-full" variant={"outline"} size={"md"}>
          취소
        </Button>
      }
    />
  );
};
