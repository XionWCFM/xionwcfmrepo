"use client";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { funnelOptions, useFunnelDefaultStep } from "@xionhub/funnel-core";
import { useInternalRouter } from "@xionwcfm/adapters/router";
import { Button, ConfirmDialog } from "@xionwcfm/xds";
import { delay } from "es-toolkit/promise";
import { overlay } from "overlay-kit";
import { Fragment, useState } from "react";
import { userStore } from "~/entities/user/user.store";
import { $Routes } from "~/shared/routes";
import { Bar } from "~/shared/ui/bar";
import { PageLayout } from "~/shared/ui/page-layout";
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

  const router = useInternalRouter();

  useFunnelDefaultStep(step, () => {
    router.replace(createStep("information"));
  });

  return (
    <PageLayout>
      <ProblemSolveBar step={step} />
      <Funnel>
        <Funnel.Step name={"information"}>
          <ProblemSolveInformationStep onProblemSolveNext={() => router.push(createStep("problem"))} />
        </Funnel.Step>
        <Funnel.Step name={"problem"}>
          <ProblemSolveProblemStep
            onResultNext={() => router.push($Routes.result.path({ query: { username: userName } }))}
          />
        </Funnel.Step>
      </Funnel>
    </PageLayout>
  );
};

const ProblemSolveBar = ({ step }: { step: typeof problemSolveFunnelOptions.step }) => {
  const router = useInternalRouter();
  const handleBackClick = () => {
    router.back();
  };

  const handleCloseClick = () => {
    if (step === "information") {
      overlay.open(({ isOpen, unmount }) => <InformationCloseDialog isOpen={isOpen} onClose={unmount} />);
    }

    if (step === "problem") {
      overlay.open(({ isOpen, unmount }) => <ProblemSolveCloseDialog isOpen={isOpen} onClose={unmount} />);
    }
  };
  return (
    <Bar.Root left={<Bar.BackIcon onClick={handleBackClick} />} right={<Bar.CloseIcon onClick={handleCloseClick} />} />
  );
};

const ProblemSolveCloseDialog = (props: { isOpen: boolean; onClose: () => void }) => {
  const { isOpen, onClose } = props;
  const [loading, setLoading] = useState(false);
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
