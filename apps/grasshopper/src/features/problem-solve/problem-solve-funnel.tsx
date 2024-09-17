"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { funnelOptions, useFunnelDefaultStep } from "@xionhub/funnel-core";
import { useInternalRouter } from "@xionwcfm/adapters/router";
import { Spacing } from "@xionwcfm/xds";
import { userStore } from "~/entities/user/user.store";
import { $Routes } from "~/shared/routes";
import { PageLayout } from "~/shared/ui/page-layout";
import { grassHopperQuestionOptions } from "../grasshopper-question/api/grasshopper-question.api";
import { createResultSearchParams } from "./lib/create-result-search-params";
import { GrasshopperQuestionAnswerType, useProblemSolveReducer } from "./model/problem-solve.action";
import { ProblemSolveBar } from "./problem-solve-bar";
import { ProblemSolveInformationStep } from "./steps/information";
import { ProblemSolveProblemStep } from "./steps/problem";

const problemSolveFunnelOptions = funnelOptions({
  defaultPrefix: $Routes.problemSolve.path(),
  steps: ["information", "problem"] as const,
  funnelId: "problem-solve",
});

export const ProblemSolveFunnel = () => {
  const [Funnel, { step, createStep }] = useFunnel(problemSolveFunnelOptions);
  const { userName } = userStore.useAtomValue();
  const { data: questions } = useSuspenseQuery(grassHopperQuestionOptions.getQuestions());
  const [questionAndAnswers, dispatch] = useProblemSolveReducer(questions);

  const router = useInternalRouter();

  useFunnelDefaultStep(step, () => {
    router.replace(createStep("information"));
  });

  return (
    <PageLayout>
      <ProblemSolveBar userName={userName} step={step} grasshopperQuestions={questionAndAnswers} />

      <Funnel>
        <Funnel.Step name={"information"}>
          <ProblemSolveInformationStep onProblemSolveNext={() => router.push(createStep("problem"))} />
        </Funnel.Step>

        <Funnel.Step name={"problem"}>
          <ProblemSolveProblemStep
            userName={userName}
            grasshopperQuestions={questionAndAnswers}
            onAnswerClick={(payload) => dispatch({ type: "SET_ANSWER", payload })}
            onResultNext={() => router.push(createResultSearchParams({ userName, questionAndAnswers }))}
          />
        </Funnel.Step>
      </Funnel>
      <Spacing h={"256"} />
    </PageLayout>
  );
};

export type ProblemSolveResultType = Pick<GrasshopperQuestionAnswerType, "selectedAnswerId"> & {
  answerId: string;
};
