"use client";

import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { funnelOptions, useFunnelDefaultStep } from "@xionhub/funnel-core";
import { useInternalRouter } from "@repo/adapters/router";
import { userStore } from "~/entities/user/model/user.store";
import { $Routes } from "~/shared/routes";
import { Bar } from "~/shared/ui/bar";
import { PageLayout } from "~/shared/ui/page-layout";
import { EnterNameEnterStep } from "./steps/enter";
import { EnterNameGuideStep } from "./steps/guide";
import { EnterNameOnboarding } from "./steps/on-boarding";
import { EnterNameStartStep } from "./steps/start";

const enterNameFunnelOptions = funnelOptions({
  defaultPrefix: $Routes.enterName.path(),
  funnelId: "enter-name",
  steps: ["start", "enter", "guide", "on-boarding"] as const,
});

export const EnterNameFunnel = () => {
  const [user, setUser] = userStore.useAtom();
  const router = useInternalRouter();
  const [Funnel, { createStep, step }] = useFunnel(enterNameFunnelOptions);

  useFunnelDefaultStep(step, () => router.replace(createStep("on-boarding")));

  return (
    <PageLayout>
      <EnterNameBar />

      <Funnel>
        <Funnel.Step name={"on-boarding"}>
          <EnterNameOnboarding onStartNext={() => router.push(createStep("start"))} />
        </Funnel.Step>

        <Funnel.Step name={"start"}>
          <EnterNameStartStep onNext={() => router.push(createStep("enter"))} />
        </Funnel.Step>

        <Funnel.Step name={"enter"}>
          <EnterNameEnterStep
            userName={user.userName}
            onNext={(userName) => {
              setUser({ userName });
              router.push(createStep("guide"));
            }}
          />
        </Funnel.Step>

        <Funnel.Step name={"guide"}>
          <Funnel.Guard
            condition={isUserNameValid(user.userName)}
            onRestrict={() => {
              router.replace(createStep("enter"));
            }}
          >
            <EnterNameGuideStep
              userName={user.userName}
              onProblemSolveNext={() => router.push($Routes.problemSolve.path())}
              onTutorialNext={() => router.push($Routes.tutorial.path())}
            />
          </Funnel.Guard>
        </Funnel.Step>
      </Funnel>
    </PageLayout>
  );
};

const EnterNameBar = () => {
  const router = useInternalRouter();

  const handleBackClick = () => {
    router.back();
  };

  return <Bar.Root left={<Bar.BackIcon onClick={handleBackClick} />} />;
};

const isUserNameValid = (userName: string) => {
  return userName.length > 0;
};
