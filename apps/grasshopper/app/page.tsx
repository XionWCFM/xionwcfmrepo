"use client";
import { Link } from "@xionwcfm/adapters/link";
import { FixedBottom, FixedBottomCta, Paragraph, Spacing, Stack, cn } from "@xionwcfm/xds";
import { Fragment, useState } from "react";
import { StepTitle } from "~/features/enter-name/components/step-title";
import { Lottie } from "~/shared/intergration/lottie";
import { LOTTIE_EMOJI_SAD, LOTTIE_READING_BOOK } from "~/shared/lotties";
import { $Routes } from "~/shared/routes";
import { PageLayout } from "~/shared/ui/page-layout";
import { Tab } from "~/shared/ui/tab";

const TAB_HOME_VALUE = "home";
const TAB_RANKING_VALUE = "ranking";

export default function Home() {
  const [tab, setTab] = useState(TAB_HOME_VALUE);
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

          <FixedBottom>
            <FixedBottomCta>
              <Link href={$Routes.enterName.path()} aria-label="navigate to username input page">
                시작하기
              </Link>
            </FixedBottomCta>
          </FixedBottom>
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
    </Fragment>
  );
}
