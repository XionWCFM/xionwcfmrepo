import { queryOptions } from "@tanstack/react-query";
import { delay } from "es-toolkit/promise";
import { GRASSHOPPERS_WITH_IMAGE } from "server/grasshopper/grasshopper.data";
import { createGrasshopperQuestion } from "../../../../server/grasshopper/create-grasshopper-question";

export const GRASSHOOPER_QUESTION_QUERY_KEYS = {
  all: () => ["grass-hopper-question"],
  questions: () => [...GRASSHOOPER_QUESTION_QUERY_KEYS.all(), "questions"],
};

export const grassHopperQuestionOptions = {
  getQuestions: () =>
    queryOptions({
      queryKey: GRASSHOOPER_QUESTION_QUERY_KEYS.questions(),
      queryFn: async () => {
        await delay(1000);
        return createGrasshopperQuestion(GRASSHOPPERS_WITH_IMAGE, { type: "객관식", limit: 35 });
      },
    }),
};
