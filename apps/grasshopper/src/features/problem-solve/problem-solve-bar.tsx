import { useInternalRouter } from "@xionwcfm/adapters/router";
import { overlay } from "overlay-kit";
import { Bar } from "~/shared/ui/bar";
import { ProblemSolveBackDialog } from "./back-dialog";
import { ProblemSolveCloseDialog } from "./close-dialog";
import { InformationCloseDialog } from "./information-close-dialog";
import { GrasshopperQuestionAnswerType } from "./model/problem-solve.action";

export const ProblemSolveBar = ({
  userName,
  step,
  grasshopperQuestions,
}: {
  userName: string;
  step: "information" | "problem" | undefined;
  grasshopperQuestions: GrasshopperQuestionAnswerType[];
}) => {
  const router = useInternalRouter();

  const handleBackClick = () => {
    if (step === "problem") {
      return overlay.open(({ isOpen, unmount }) => <ProblemSolveBackDialog isOpen={isOpen} onClose={unmount} />);
    }
    return router.back();
  };

  const handleCloseClick = () => {
    if (step === "information") {
      overlay.open(({ isOpen, unmount }) => <InformationCloseDialog isOpen={isOpen} onClose={unmount} />);
    }

    if (step === "problem") {
      overlay.open(({ isOpen, unmount }) => (
        <ProblemSolveCloseDialog
          userName={userName}
          grasshopperQuestions={grasshopperQuestions}
          isOpen={isOpen}
          onClose={unmount}
        />
      ));
    }
  };
  return (
    <Bar.Root left={<Bar.BackIcon onClick={handleBackClick} />} right={<Bar.CloseIcon onClick={handleCloseClick} />} />
  );
};
