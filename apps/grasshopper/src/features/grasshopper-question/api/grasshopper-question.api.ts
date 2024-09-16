import { queryOptions } from "@tanstack/react-query";
import { GrasshopperQuestionType } from "../model/grasshopper-question.model";
export const GRASSHOOPER_QUESTION_QUERY_KEYS = {
  all: () => ["grass-hopper-question"],
  questions: () => [...GRASSHOOPER_QUESTION_QUERY_KEYS.all(), "questions"],
};

export const grassHopperQuestionOptions = {
  getQuestions: () =>
    queryOptions({
      queryKey: GRASSHOOPER_QUESTION_QUERY_KEYS.questions(),
      queryFn: async () => {},
    }),
};
