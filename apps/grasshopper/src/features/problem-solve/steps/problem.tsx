import { useLoading } from "@xionwcfm/react";
import { FixedBottom, FixedBottomCta, Paragraph, Spacing } from "@xionwcfm/xds";
import { toast } from "@xionwcfm/xds/toast";
import { delay } from "es-toolkit/promise";
import { Fragment, useCallback, useState } from "react";
import { GrasshopperQuestionAnswerType } from "~/entities/grasshoppers/model/grasshopper.model";
import { QuestionAndAnswerForm } from "~/shared/ui/question-and-answer-form";

export const ProblemSolveProblemStep = (props: {
  onResultNext: () => void;
  grasshopperQuestions: GrasshopperQuestionAnswerType[];
  userName: string;
  onAnswerClick: (value: { quizId: string } & Pick<GrasshopperQuestionAnswerType, "selectedAnswerId">) => void;
}) => {
  const { onResultNext, grasshopperQuestions, userName, onAnswerClick } = props;
  const { currentQuestion, navigateToNext, page, isLastQuestion } = useQuestionNavigation(grasshopperQuestions);
  const [isLoading, startTransition] = useLoading();

  const handleCtaClick = async () => {
    if (isLastQuestion) {
      await startTransition(delay(3000));
      return onResultNext();
    }

    showAnswerToast(currentQuestion);
    navigateToNext();
  };

  return (
    <Fragment>
      <Spacing h={"40"} />

      <Paragraph size={"3"} color={"neutral-400"} weight={"light"} mb={"8"}>
        {getProgressText(userName, grasshopperQuestions.length, page)}
      </Paragraph>

      <QuestionAndAnswerForm
        grasshopper={currentQuestion.grasshopper}
        choices={currentQuestion.choices}
        questionTitle={getQuestionTitle(currentQuestion.questionTitle, page)}
        selectedId={currentQuestion.selectedAnswerId}
        onClick={(answerId) => {
          onAnswerClick({ quizId: currentQuestion.id, selectedAnswerId: answerId });
        }}
      />

      <FixedBottom>
        <FixedBottomCta
          loading={isLoading}
          disabled={currentQuestion.selectedAnswerId === null}
          onClick={handleCtaClick}
        >
          {getCtaText(isLastQuestion)}
        </FixedBottomCta>
      </FixedBottom>
    </Fragment>
  );
};

const isAnswerCorrect = (question: GrasshopperQuestionAnswerType) => {
  return question.selectedAnswerId === question.grasshopper.id;
};

const showAnswerToast = (grasshopperQuestion: GrasshopperQuestionAnswerType) => {
  toast.dismiss();
  if (isAnswerCorrect(grasshopperQuestion)) {
    return toast.success("정답이에요! 🔥");
  }
  toast.error(`정답은 ${grasshopperQuestion.grasshopper.name}였어요 😭`);
};

const getCtaText = (isLastQuestion: boolean) => {
  return isLastQuestion ? "제출하고 결과지 보기" : "제출하기";
};

const getQuestionTitle = (questionTitle: string, pageIndex: number) => {
  return `Q.${pageIndex + 1} ${questionTitle}`;
};

const getProgressText = (userName: string, totalQuestions: number, currentPage: number) =>
  `${userName}님은 지금까지 ${totalQuestions}문제 중 ${currentPage}문제를 풀었어요`;

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

  const isLastQuestion = grasshopperQuestions.length - 1 === page;
  return { page, currentQuestion, navigateToNext, navigateToPrev, isLastQuestion };
};
