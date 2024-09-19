import { useDraft } from "@xionwcfm/react";
import { useCallback } from "react";
import { GrasshopperQuestionType } from "~/features/grasshopper-question/model/grasshopper-question.model";

export type GrasshopperQuestionAnswerType = GrasshopperQuestionType & { selectedAnswerId: string | null };

const createInitialState = (grasshopperQuestions: GrasshopperQuestionType[]) => {
  return grasshopperQuestions.map((question) => ({
    ...question,
    selectedAnswerId: null,
  })) satisfies GrasshopperQuestionAnswerType[];
};

const updateQuestionAnswerState = (
  state: GrasshopperQuestionAnswerType[],
  { quizId, selectedAnswerId }: { quizId: string; selectedAnswerId: string | null },
): GrasshopperQuestionAnswerType[] => {
  return state.map((question) => {
    if (question.id === quizId) {
      return { ...question, selectedAnswerId };
    }
    return { ...question };
  });
};

export const useQuestionAnswer = (questions: GrasshopperQuestionType[]) => {
  const [state, dispatch] = useDraft<GrasshopperQuestionAnswerType[]>(createInitialState(questions));
  const update = useCallback(
    (param: { quizId: string; selectedAnswerId: string | null }) =>
      dispatch((prev) => updateQuestionAnswerState(prev, param)),
    [dispatch],
  );
  return { state, update };
};
