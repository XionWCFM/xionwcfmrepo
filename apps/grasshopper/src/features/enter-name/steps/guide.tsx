"use client";
import { useThrottle } from "@xionwcfm/react";
import { FixedBottom, FixedBottomCta, Spacing } from "@xionwcfm/xds";
import { toast } from "@xionwcfm/xds/toast";
import { delay } from "es-toolkit/promise";
import { Fragment, useState } from "react";
import { GrasshopperQuestionType } from "~/features/grasshopper-question/model/grasshopper-question.model";
import { QuestionAndAnswerForm } from "~/shared/ui/question-and-answer-form";
import { StepTitle } from "../components/step-title";

export const EnterNameGuideStep = ({
  onProblemSolveNext,
  userName,
}: { userName: string; onTutorialNext: () => void; onProblemSolveNext: () => void }) => {
  const stepTitle = `반가워요 ${userName}님!\n먼저 간단한 문제를 풀어볼까요?`;
  const [selected, setSelected] = useState<string | null>(null);

  const disabled = selected === null;

  const handleClick = useThrottle(async () => {
    if (selected === sampleQuestion.grasshopper.id) {
      toast.success("잘하셨어요! 이제 진짜 문제를 풀어볼까요?", { duration: 1000 });
      await delay(1000);
      toast.dismiss();
      onProblemSolveNext();
    } else {
      toast.success("다시 한번 생각해볼까요?");
    }
  }, 1000);

  return (
    <Fragment>
      <StepTitle>{stepTitle}</StepTitle>

      <Spacing h={"16"} />

      <QuestionAndAnswerForm {...sampleQuestion} selectedId={selected} onClick={(value) => setSelected(value)} />

      <FixedBottom>
        <FixedBottomCta disabled={disabled} onClick={handleClick}>
          제출하기
        </FixedBottomCta>
      </FixedBottom>
    </Fragment>
  );
};

const sampleQuestion = {
  id: "hello",
  type: "객관식",
  questionTitle: "이 메뚜기의 이름은 무엇일까요?",
  grasshopper: { id: "1", imgSrc: "/grasshoppers/우리벼메뚜기.png", name: "우리벼메뚜기" },
  choices: [
    { id: "2", name: "지네" },
    { id: "3", name: "방아깨비" },
    { id: "4", name: "소금쟁이" },
    { id: "1", name: "우리벼메뚜기" },
  ],
} satisfies GrasshopperQuestionType;
