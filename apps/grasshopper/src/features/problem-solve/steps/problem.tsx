import { useDraft } from "@xionwcfm/react";
import { FixedBottom, FixedBottomCta, Paragraph, Spacing } from "@xionwcfm/xds";
import { toast } from "@xionwcfm/xds/toast";
import { Fragment, useReducer, useState } from "react";
import { GrasshopperQuestionType } from "~/features/grasshopper-question/model/grasshopper-question.model";
import { QuestionAndAnswerForm } from "~/shared/ui/question-and-answer-form";
import { GrasshopperQuestionAnswerType } from "../model/problem-solve.action";

const calculateAnswer = (questions: GrasshopperQuestionAnswerType[], index: number) => {
  if (!questions[index]) {
    throw new Error("question index range over");
  }

  const isAnswer = questions[index].selectedAnswerId === questions[index].grasshopper.id;
  const rightAnswer = questions[index].grasshopper?.name;
  const selectedAnswer =
    questions[index].choices.find((choice) => choice.id === questions[index]?.selectedAnswerId)?.name ?? "";

  return { isAnswer, rightAnswer, selectedAnswer };
};

export const ProblemSolveProblemStep = ({
  onResultNext,
  grasshopperQuestions,
  userName,
  onAnswerClick,
}: {
  onResultNext: () => void;
  grasshopperQuestions: GrasshopperQuestionAnswerType[];
  userName: string;
  onAnswerClick: (value: { quizId: string } & Pick<GrasshopperQuestionAnswerType, "selectedAnswerId">) => void;
}) => {
  const [page, setPage] = useState(0);

  const isLastQuestion = grasshopperQuestions.length - 1 === page;
  const ctaText = isLastQuestion ? "제출하고 결과지 보기" : "제출하기";
  const isNotAnswered = grasshopperQuestions[page]?.selectedAnswerId === null;

  const handleCtaClick = () => {
    if (isNotAnswered) {
      return;
    }

    toast.dismiss();

    if (isLastQuestion) {
      return onResultNext();
    }

    const { isAnswer, rightAnswer } = calculateAnswer(grasshopperQuestions, page);
    if (isAnswer) {
      toast.success("정답이에요! 🔥");
    } else {
      toast.error(`정답은 ${rightAnswer}였어요 😭`);
    }
    return setPage((prev) => prev + 1);
  };

  return (
    <Fragment>
      <Spacing h={"40"} />
      <Paragraph
        size={"3"}
        color={"neutral-400"}
        weight={"light"}
        mb={"8"}
      >{`${userName}님은 지금까지 ${grasshopperQuestions.length}문제 중 ${page}문제를 풀었어요`}</Paragraph>
      {grasshopperQuestions.map((question, index) =>
        index === page ? (
          <QuestionAndAnswerForm
            key={question.id}
            {...question}
            selectedId={question.selectedAnswerId}
            onClick={(answerId) => {
              onAnswerClick({ quizId: question.id, selectedAnswerId: answerId });
            }}
          />
        ) : null,
      )}

      <FixedBottom>
        <FixedBottomCta disabled={isNotAnswered} onClick={handleCtaClick}>
          {ctaText}
        </FixedBottomCta>
      </FixedBottom>
    </Fragment>
  );
};
