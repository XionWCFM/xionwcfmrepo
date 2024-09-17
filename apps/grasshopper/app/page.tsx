"use client";
import { useInternalRouter } from "@xionwcfm/adapters/router";
import { Button, ConfirmDialog, FixedBottom, FixedBottomCta, Paragraph, Spacing, Stack, cn } from "@xionwcfm/xds";
import { overlay } from "overlay-kit";
import { Fragment, useState } from "react";
import { userStore } from "~/entities/user/user.store";
import { StepTitle } from "~/features/enter-name/components/step-title";
import { Lottie } from "~/shared/intergration/lottie";
import { LOTTIE_EMOJI_SAD, LOTTIE_READING_BOOK } from "~/shared/lotties";
import { $Routes } from "~/shared/routes";
import { PageLayout } from "~/shared/ui/page-layout";
import { Tab } from "~/shared/ui/tab";

const TAB_HOME_VALUE = "home";
const TAB_RANKING_VALUE = "ranking";

export default function Home() {
  const { userName } = userStore.useAtomValue();
  const [tab, setTab] = useState(TAB_HOME_VALUE);
  const isFirstUser = userName.length === 0;
  const router = useInternalRouter();

  const handleCtaClick = () => {
    if (isFirstUser) {
      return router.push($Routes.enterName.path());
    }
    return overlay.open(({ isOpen, unmount }) => <StartDialog isOpen={isOpen} onClose={unmount} userName={userName} />);
  };

  return (
    <Fragment>
      <Tab.Root value={tab} onValueChange={setTab}>
        <Tab.List>
          <Tab.Trigger value={TAB_HOME_VALUE}>홈</Tab.Trigger>
          <Tab.Trigger value={TAB_RANKING_VALUE}>랭킹</Tab.Trigger>
          <Tab.TransrateBar
            className={cn(
              tab === TAB_HOME_VALUE && " translate-x-0",
              tab === TAB_RANKING_VALUE && "translate-x-[100%]",
            )}
          />
        </Tab.List>

        <Tab.Content value={TAB_HOME_VALUE}>
          <Stack items={"center"} justify={"center"}>
            <Stack className=" w-screen max-w-[450px] h-[100vw] max-h-[450px] ">
              <Lottie autoplay loop animationData={LOTTIE_READING_BOOK} />
            </Stack>
            <Spacing h={"24"} />
            <Paragraph color={"neutral-500"} weight={"light"} size={"8"} className=" text-center">
              {"나는 메뚜기의 종류를 \n100가지 이상 맞출 수 있을까?"}
            </Paragraph>
          </Stack>
        </Tab.Content>

        <Tab.Content value={TAB_RANKING_VALUE}>
          <PageLayout>
            <StepTitle>{"랭킹 시스템은 개발 중이에요\n조금만 기다려주세요!"}</StepTitle>
            <Stack justify={"center"} items={"center"} mt={"32"}>
              <Lottie className=" w-[200px] h-[200px]" animationData={LOTTIE_EMOJI_SAD} autoplay loop />
            </Stack>
          </PageLayout>
        </Tab.Content>
      </Tab.Root>
      <FixedBottom>
        <FixedBottomCta onClick={handleCtaClick}>시작하기</FixedBottomCta>
      </FixedBottom>
    </Fragment>
  );
}

const StartDialog = ({ isOpen, onClose, userName }: { isOpen: boolean; onClose: () => void; userName: string }) => {
  const router = useInternalRouter();
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      title="이전에 방문하신적이 있으시군요!"
      description={`${userName}님에겐 설명이 더 필요 없겠네요 \n바로 문제를 풀러갈까요?`}
      primaryButton={
        <Button
          className=" w-full  text-size-4"
          variant={"primary"}
          size={"md"}
          onClick={() => {
            onClose();
            router.push($Routes.problemSolve.path());
          }}
        >
          좋아요!
        </Button>
      }
      secondaryButton={
        <Button
          className=" w-full text-size-4"
          variant={"outline"}
          size={"md"}
          onClick={() => {
            onClose();
            router.push($Routes.enterName.path());
          }}
        >
          설명을 들을래요
        </Button>
      }
    />
  );
};
