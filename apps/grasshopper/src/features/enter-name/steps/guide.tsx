import { Fragment } from "react";
import { StepTitle } from "../components/step-title";
export const EnterNameGuideStep = ({
  onTutorialNext,
  onProblemSolveNext,
  userName,
}: { userName: string; onTutorialNext: () => void; onProblemSolveNext: () => void }) => {
  const stepTitle = `반가워요 ${userName}님!\n먼저 간단한 문제를 풀어볼까요?`;
  return (
    <Fragment>
      <StepTitle>{stepTitle}</StepTitle>
    </Fragment>
  );
};
