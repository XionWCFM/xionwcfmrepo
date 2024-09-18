import { useLoading } from "@xionwcfm/react";
import { FixedBottom, FixedBottomCta, Paragraph, Spacing } from "@xionwcfm/xds";
import { toast } from "@xionwcfm/xds/toast";
import { delay } from "es-toolkit/promise";
import { Fragment, useCallback, useState } from "react";
import { QuestionAndAnswerForm } from "~/shared/ui/question-and-answer-form";
import { GrasshopperQuestionAnswerType } from "../model/problem-solve.action";

const isAnswer = (question: GrasshopperQuestionAnswerType) => {
  return question.selectedAnswerId === question.grasshopper.id;
};

export const ProblemSolveProblemStep = (props: {
  onResultNext: () => void;
  grasshopperQuestions: GrasshopperQuestionAnswerType[];
  userName: string;
  onAnswerClick: (value: { quizId: string } & Pick<GrasshopperQuestionAnswerType, "selectedAnswerId">) => void;
}) => {
  const { onResultNext, grasshopperQuestions, userName, onAnswerClick } = props;
  const { currentQuestion, navigateToNext, page } = useQuestionNavigation(grasshopperQuestions);
  const [isLoading, startTransition] = useLoading();

  const isLastQuestion = grasshopperQuestions.length - 1 === page;

  const ctaText = isLastQuestion ? "제출하고 결과지 보기" : "제출하기";

  const isNotAnswered = currentQuestion.selectedAnswerId === null;

  const handleLastQuestion = async () => {
    if (isLastQuestion) {
      await startTransition(delay(3000));
      return onResultNext();
    }
  };

  const handleQuestion = () => {
    toast.dismiss();
    if (isAnswer(currentQuestion)) {
      toast.success("정답이에요! 🔥");
    } else {
      toast.error(`정답은 ${currentQuestion.grasshopper.name}였어요 😭`);
    }
    return navigateToNext();
  };

  const handleCtaClick = async () => {
    if (isLastQuestion) {
      return handleLastQuestion();
    }
    return handleQuestion();
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
            grasshopper={question.grasshopper}
            choices={question.choices}
            questionTitle={question.questionTitle}
            selectedId={question.selectedAnswerId}
            onClick={(answerId) => {
              onAnswerClick({ quizId: question.id, selectedAnswerId: answerId });
            }}
          />
        ) : null,
      )}

      <FixedBottom>
        <FixedBottomCta loading={isLoading} disabled={isNotAnswered} onClick={handleCtaClick}>
          {ctaText}
        </FixedBottomCta>
      </FixedBottom>
    </Fragment>
  );
};

const useQuestionNavigation = (grasshopperQuestions: GrasshopperQuestionAnswerType[]) => {
  const [page, navigate] = useState(0);
  const currentQuestion = grasshopperQuestions[page];

  if (!currentQuestion) {
    throw new Error("invalid index by useQuestionNavigation");
  }

  const navigateToNext = useCallback(() => {
    navigate((prev) => (prev + 1 < grasshopperQuestions.length ? prev + 1 : prev));
  }, [navigate]);

  const navigateToPrev = useCallback(() => {
    navigate((prev) => (prev - 1 > -1 ? prev - 1 : prev));
  }, [navigate]);

  return { page, currentQuestion, navigateToNext, navigateToPrev };
};
