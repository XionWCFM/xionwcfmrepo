import { useReducer } from "react";
import { GrasshopperQuestionType } from "~/features/grasshopper-question/model/grasshopper-question.model";

export type GrasshopperQuestionAnswerType = GrasshopperQuestionType & { selectedAnswerId: string | null };

type Action = {
  type: "SET_ANSWER";
  payload: {
    quizId: string;
    selectedAnswerId: string | null;
  };
};

const createInitialState = (grasshopperQuestions: GrasshopperQuestionType[]) => {
  return grasshopperQuestions.map((question, index) => ({
    ...question,
    questionTitle: `Q${index + 1}. ${question.questionTitle}`,
    selectedAnswerId: null,
  })) satisfies GrasshopperQuestionAnswerType[];
};

const reducer = (state: GrasshopperQuestionAnswerType[], action: Action) => {
  switch (action.type) {
    case "SET_ANSWER": {
      return state.map((question) =>
        question.id === action.payload.quizId
          ? { ...question, selectedAnswerId: action.payload.selectedAnswerId }
          : { ...question },
      );
    }
    default: {
      throw new Error("정의되지 않은 액션 타입");
    }
  }
};

export const useProblemSolveReducer = (questions: GrasshopperQuestionType[]) => {
  return useReducer(reducer, createInitialState(questions));
};
