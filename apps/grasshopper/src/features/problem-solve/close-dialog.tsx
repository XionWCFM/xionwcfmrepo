import { useInternalRouter } from "@xionwcfm/adapters/router";
import { Button, ConfirmDialog } from "@xionwcfm/xds";
import { delay } from "es-toolkit/promise";
import { useState } from "react";
import { createResultSearchParams } from "./lib/create-result-search-params";
import { GrasshopperQuestionAnswerType } from "./model/problem-solve.action";

export const ProblemSolveCloseDialog = (props: {
  grasshopperQuestions: GrasshopperQuestionAnswerType[];
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}) => {
  const { userName, isOpen, onClose, grasshopperQuestions } = props;
  const [loading, setLoading] = useState(false);
  const router = useInternalRouter();

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleGetReportClick = async () => {
    setLoading(true);
    await delay(3000);
    setLoading(false);
    onClose();
    router.push(createResultSearchParams({ userName, questionAndAnswers: grasshopperQuestions }));
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={handleClose}
      title="결과지를 받으실건가요?"
      description="문제를 다 풀지 않아도 결과지를 받을 수 있어요"
      primaryButton={
        <Button loading={loading} className=" w-full" onClick={handleGetReportClick} variant={"primary"} size={"md"}>
          네
        </Button>
      }
      secondaryButton={
        <Button as="button" disabled={loading} onClick={onClose} className=" w-full" variant={"outline"} size={"md"}>
          취소
        </Button>
      }
    />
  );
};
