import { Fragment } from "react";
import { StepTitle } from "../components/step-title";
export const EnterNameGuideStep = ({
  onTutorialNext,
  onProblemSolveNext,
  userName,
}: { userName: string; onTutorialNext: () => void; onProblemSolveNext: () => void }) => {
  const stepTitle = `반가워요 ${userName}님!`;
  return (
    <Fragment>
      <StepTitle>{stepTitle}</StepTitle>
    </Fragment>
  );
};
