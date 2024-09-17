import { $Routes } from "~/shared/routes";
import { encrypt } from "~/shared/utils/crypto";
import { GrasshopperQuestionAnswerType } from "../model/problem-solve.action";

export const createResultSearchParams = (param: {
  userName: string;
  questionAndAnswers: GrasshopperQuestionAnswerType[];
}) => {
  return $Routes.result.path({
    query: { data: encrypt({ username: param.userName, ...calculateProblemResult(param.questionAndAnswers) }) },
  });
};

const calculateProblemResult = (param: GrasshopperQuestionAnswerType[]) => {
  return param.reduce(
    (acc, cur) => {
      if (cur.selectedAnswerId === null) {
        return { total: param.length, answer: acc.answer, wrong: acc.wrong, skip: acc.skip + 1 };
      }
      if (cur.selectedAnswerId === cur.grasshopper.id) {
        return { total: param.length, wrong: acc.wrong, skip: acc.skip, answer: acc.answer + 1 };
      }
      return { total: param.length, answer: acc.answer, skip: acc.skip, wrong: acc.wrong + 1 };
    },
    { answer: 0, wrong: 0, skip: 0, total: param.length },
  );
};
