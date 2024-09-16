"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { funnelOptions, useFunnelDefaultStep } from "@xionhub/funnel-core";
import { useInternalRouter } from "@xionwcfm/adapters/router";
import { Button, ConfirmDialog } from "@xionwcfm/xds";
import { delay } from "es-toolkit/promise";
import { overlay } from "overlay-kit";
import { useState } from "react";
import { userStore } from "~/entities/user/user.store";
import { $Routes } from "~/shared/routes";
import { Bar } from "~/shared/ui/bar";
import { PageLayout } from "~/shared/ui/page-layout";
import { grassHopperQuestionOptions } from "../grasshopper-question/api/grasshopper-question.api";
import { GrasshopperQuestionAnswerType, useProblemSolveReducer } from "./model/problem-solve.action";
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
  const [grasshopperQuestions, dispatch] = useProblemSolveReducer(questions);

  const router = useInternalRouter();

  useFunnelDefaultStep(step, () => {
    router.replace(createStep("information"));
  });

  return (
    <PageLayout>
      <ProblemSolveBar userName={userName} step={step} grasshopperQuestions={grasshopperQuestions} />

      <Funnel>
        <Funnel.Step name={"information"}>
          <ProblemSolveInformationStep onProblemSolveNext={() => router.push(createStep("problem"))} />
        </Funnel.Step>

        <Funnel.Step name={"problem"}>
          <ProblemSolveProblemStep
            userName={userName}
            grasshopperQuestions={grasshopperQuestions}
            onAnswerClick={(payload) => dispatch({ type: "SET_ANSWER", payload })}
            onResultNext={() =>
              router.push(
                $Routes.result.path({
                  query: { username: userName, result: createProblemSolveResult(grasshopperQuestions) },
                }),
              )
            }
          />
        </Funnel.Step>
      </Funnel>
    </PageLayout>
  );
};

export type ProblemSolveResultType = Pick<GrasshopperQuestionAnswerType, "selectedAnswerId"> & {
  pageNum: number;
  answerId: string;
};

const createProblemSolveResult = (grasshoppers: GrasshopperQuestionAnswerType[]): ProblemSolveResultType[] => {
  return grasshoppers.map(
    (question, index) =>
      ({
        pageNum: index,
        selectedAnswerId: question.selectedAnswerId,
        answerId: question.grasshopper.id,
      }) satisfies ProblemSolveResultType,
  );
};

const ProblemSolveBar = ({
  userName,
  step,
  grasshopperQuestions,
}: {
  userName: string;
  step: typeof problemSolveFunnelOptions.step;
  grasshopperQuestions: GrasshopperQuestionAnswerType[];
}) => {
  const router = useInternalRouter();

  const handleBackClick = () => {
    if (step === "problem") {
      return overlay.open(({ isOpen, unmount }) => <ProblemSolveBackDialog isOpen={isOpen} onClose={unmount} />);
    }
    return router.back();
  };

  const handleCloseClick = () => {
    if (step === "information") {
      overlay.open(({ isOpen, unmount }) => <InformationCloseDialog isOpen={isOpen} onClose={unmount} />);
    }

    if (step === "problem") {
      overlay.open(({ isOpen, unmount }) => (
        <ProblemSolveCloseDialog
          userName={userName}
          grasshopperQuestions={grasshopperQuestions}
          isOpen={isOpen}
          onClose={unmount}
        />
      ));
    }
  };
  return (
    <Bar.Root left={<Bar.BackIcon onClick={handleBackClick} />} right={<Bar.CloseIcon onClick={handleCloseClick} />} />
  );
};

const ProblemSolveBackDialog = (props: { isOpen: boolean; onClose: () => void }) => {
  const { isOpen, onClose } = props;
  const router = useInternalRouter();
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="정말 뒤로가실건가요?"
      description="지금 뒤로가면 여태까지 푼 문제들이 초기화돼요"
      primaryButton={
        <Button
          className=" w-full"
          onClick={async () => {
            onClose();
            router.back();
          }}
          variant={"primary"}
          size={"md"}
        >
          네
        </Button>
      }
      secondaryButton={
        <Button as="button" onClick={onClose} className=" w-full" variant={"outline"} size={"md"}>
          취소
        </Button>
      }
    />
  );
};

const ProblemSolveCloseDialog = (props: {
  grasshopperQuestions: GrasshopperQuestionAnswerType[];
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}) => {
  const { userName, isOpen, onClose, grasshopperQuestions } = props;
  const [loading, setLoading] = useState(false);
  const router = useInternalRouter();

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={() => {
        if (!loading) {
          onClose();
        }
      }}
      title="결과지를 받으실건가요?"
      description="문제를 다 풀지 않아도 결과지를 받을 수 있어요"
      primaryButton={
        <Button
          loading={loading}
          className=" w-full"
          onClick={async () => {
            setLoading(true);
            await delay(3000);
            setLoading(false);
            onClose();
            router.push(
              $Routes.result.path({
                query: { result: createProblemSolveResult(grasshopperQuestions), username: userName },
              }),
            );
          }}
          variant={"primary"}
          size={"md"}
        >
          네
        </Button>
      }
      secondaryButton={
        <Button as="button" disabled={loading} onClick={onClose} className=" w-full" variant={"outline"} size={"md"}>
          취소
        </Button>
      }
    />
  );
};

const InformationCloseDialog = (props: { isOpen: boolean; onClose: () => void }) => {
  const { isOpen, onClose } = props;
  const router = useInternalRouter();

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="메인 화면으로 돌아가시겠어요?"
      primaryButton={
        <Button
          className=" w-full"
          onClick={() => {
            onClose();
            router.push($Routes.root.path());
          }}
          variant={"primary"}
          size={"md"}
        >
          네
        </Button>
      }
      secondaryButton={
        <Button onClick={onClose} className=" w-full" variant={"outline"} size={"md"}>
          취소
        </Button>
      }
    />
  );
};
