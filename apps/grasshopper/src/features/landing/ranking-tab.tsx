import { Stack } from "@xionwcfm/xds";
import Lottie from "lottie-react";
import { LOTTIE_EMOJI_SAD } from "~/shared/lotties";
import { PageLayout } from "~/shared/ui/page-layout";
import { Title } from "../../shared/ui/title";

export const RankingTab = () => {
  return (
    <PageLayout>
      <Title>{"랭킹 시스템은 개발 중이에요\n조금만 기다려주세요!"}</Title>
      <Stack justify={"center"} items={"center"} mt={"32"}>
        <Lottie className=" w-[200px] h-[200px]" animationData={LOTTIE_EMOJI_SAD} autoplay={true} loop={true} />
      </Stack>
    </PageLayout>
  );
};
