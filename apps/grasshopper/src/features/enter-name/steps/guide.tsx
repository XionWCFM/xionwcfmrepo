import { ThrottleEvent } from "@xionwcfm/react";
import { FixedBottom, FixedBottomCta, Spacing } from "@xionwcfm/xds";
import { toast } from "@xionwcfm/xds/toast";
import { delay } from "es-toolkit/promise";
import { Fragment, useState } from "react";
import { GrasshopperQuestion } from "~/entities/grasshoppers/model/grasshopper.model";
import { QuestionAndAnswerForm } from "~/shared/ui/question-and-answer-form";
import { Title } from "../../../shared/ui/title";

export const EnterNameGuideStep = ({
  onProblemSolveNext,
  userName,
}: { userName: string; onTutorialNext: () => void; onProblemSolveNext: () => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = async () => {
    const isCorrectAnswer = selected === sampleQuestion.grasshopper.id;

    showAnswerToast(isCorrectAnswer);

    if (isCorrectAnswer) {
      return onProblemSolveNext();
    }
  };

  return (
    <Fragment>
      <Title>{getTitle(userName)}</Title>

      <Spacing h={"16"} />

      <QuestionAndAnswerForm
        choices={sampleQuestion.choices}
        questionTitle={sampleQuestion.questionTitle}
        grasshopper={sampleQuestion.grasshopper}
        selectedId={selected}
        onClick={(value) => setSelected(value)}
      />

      <Spacing h={"256"} />
      <FixedBottom>
        <ThrottleEvent delay={THROTTLE_DELAY_POLICY}>
          <FixedBottomCta disabled={selected === null} onClick={handleClick}>
            제출하기
          </FixedBottomCta>
        </ThrottleEvent>
      </FixedBottom>
    </Fragment>
  );
};

const THROTTLE_DELAY_POLICY = 1000;

const showAnswerToast = async (isCorrectAnswer: boolean) => {
  if (isCorrectAnswer) {
    toast.success("잘하셨어요! 이제 진짜 문제를 풀어볼까요?", { duration: 1000 });
    await delay(1000);
    toast.dismiss();
  } else {
    toast.success("다시 한번 생각해볼까요?");
  }
};

const getTitle = (userName: string) => {
  return `반가워요 ${userName}님!\n먼저 간단한 문제를 풀어볼까요?`;
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
} satisfies GrasshopperQuestion;
