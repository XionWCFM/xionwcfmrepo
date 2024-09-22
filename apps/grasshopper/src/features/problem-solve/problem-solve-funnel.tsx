"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { funnelOptions, useFunnelDefaultStep } from "@xionhub/funnel-core";
import { useInternalRouter } from "@xionwcfm/adapters/router";
import { Spacing } from "@xionwcfm/xds";
import { GrasshopperQuestionAnswerType } from "~/entities/grasshoppers/model/grasshopper.model";
import { grasshopperResultSearchParams } from "~/entities/grasshoppers/model/grasshopper.schema";
import { userStore } from "~/entities/user/model/user.store";
import { $Routes } from "~/shared/routes";
import { PageLayout } from "~/shared/ui/page-layout";
import { grassHopperQuestionOptions } from "../../entities/grasshoppers/api/grasshopper.api";
import { useQuestionAnswer } from "./model/use-question-answer";
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
  const questionAnswer = useQuestionAnswer(questions);
  const router = useInternalRouter();

  useFunnelDefaultStep(step, () => {
    router.replace(createStep("information"));
  });

  return (
    <PageLayout>
      <ProblemSolveBar userName={userName} step={step} questionAnswers={questionAnswer.state} />

      <Funnel>
        <Funnel.Step name={"information"}>
          <ProblemSolveInformationStep onProblemSolveNext={() => router.push(createStep("problem"))} />
        </Funnel.Step>

        <Funnel.Step name={"problem"}>
          <ProblemSolveProblemStep
            userName={userName}
            grasshopperQuestions={questionAnswer.state}
            onAnswerClick={(payload) => questionAnswer.update(payload)}
            onResultNext={() =>
              router.push(grasshopperResultSearchParams.create({ userName, questionAnswers: questionAnswer.state }))
            }
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
