import qs from "qs";
import * as z from "zod";
import { $Routes } from "~/shared/routes";
import { decrypt } from "~/shared/utils/crypto";
import { encrypt } from "~/shared/utils/crypto";
import { GrasshopperQuestionAnswerType } from "./grasshopper.model";

const createResultSearchParams = (param: {
  userName: string;
  questionAnswers: GrasshopperQuestionAnswerType[];
}) => {
  return $Routes.result.path({
    query: { data: encrypt({ userName: param.userName, ...calculateProblemResult(param.questionAnswers) }) },
  });
};

const calculateProblemResult = (questionAnswers: GrasshopperQuestionAnswerType[]) => {
  return questionAnswers.reduce(
    (acc, cur) => {
      if (cur.selectedAnswerId === null) {
        return { total: questionAnswers.length, answer: acc.answer, wrong: acc.wrong, skip: acc.skip + 1 };
      }
      if (cur.selectedAnswerId === cur.grasshopper.id) {
        return { total: questionAnswers.length, wrong: acc.wrong, skip: acc.skip, answer: acc.answer + 1 };
      }
      return { total: questionAnswers.length, answer: acc.answer, skip: acc.skip, wrong: acc.wrong + 1 };
    },
    { answer: 0, wrong: 0, skip: 0, total: questionAnswers.length },
  );
};

const resultPageSearchParamsSchema = z
  .object({
    data: z.string(),
  })
  .transform(({ data }) => {
    const decrypted = decrypt(data);
    return z
      .object({ userName: z.string(), answer: z.number(), wrong: z.number(), skip: z.number(), total: z.number() })
      .parse(decrypted);
  });

const getResultPageSearchParamsData = (searchParams: URLSearchParams) => {
  return resultPageSearchParamsSchema.parse(qs.parse(searchParams.toString(), { parseArrays: true }));
};

export const grasshopperResultSearchParams = {
  create: createResultSearchParams,
  parse: getResultPageSearchParamsData,
};
