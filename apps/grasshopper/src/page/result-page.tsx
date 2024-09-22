"use client";
import { wrap } from "@suspensive/react";
import { Separated } from "@xionwcfm/react";
import { Paragraph, Spacing, Stack } from "@xionwcfm/xds";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { grasshopperResultSearchParams } from "~/entities/grasshoppers/model/grasshopper-searchparams";
import { CopyResult } from "~/features/problem-result/copy-result";
import { GraphChart } from "~/features/problem-result/graph-chart";
import { NumberChart } from "~/features/problem-result/number-chart";
import { RetryButton } from "~/features/problem-result/retry-button";
import { Lottie } from "~/shared/intergration/lottie";
import { Navigate } from "~/shared/internal/create-navigate";
import { LOTTIE_EMOJI_HAPPY } from "~/shared/lotties";
import { $Routes } from "~/shared/routes";
import { PageLayout } from "~/shared/ui/page-layout";
import { RowSeparator } from "~/shared/ui/row-separator";
import { Title } from "~/shared/ui/title";

export const ResultPage = wrap.ErrorBoundary({ fallback: <Navigate to={$Routes.root.path()} /> }).on(function Page() {
  return (
    <PageLayout>
      <ResultTopSection />

      <RowSeparator className=" my-16" />

      <ResultStatistics />

      <Spacing h={"128"} />
    </PageLayout>
  );
});

const ResultTopSection = wrap.Suspense().on(() => {
  const searchParams = useSearchParams();
  const { userName } = grasshopperResultSearchParams.parse(searchParams);
  return (
    <Fragment>
      <Title>{`${userName}님의\n메뚜기 퀴즈 결과는?`}</Title>

      <Stack justify={"center"} items={"center"} w={"100%"}>
        <Lottie className=" w-[180px] h-[180px]" animationData={LOTTIE_EMOJI_HAPPY} autoplay loop />
      </Stack>

      <Paragraph color={"neutral-500"} size={"4"}>
        {`${userName}님은 어떤 결과를 얻으셨을까요?`}
      </Paragraph>
    </Fragment>
  );
});

const ResultStatistics = wrap.Suspense().on(() => {
  const searchParams = useSearchParams();
  const { userName, answer, wrong, skip, total } = grasshopperResultSearchParams.parse(searchParams);
  return (
    <Separated with={<RowSeparator className=" my-16" />}>
      <GraphChart answer={answer} wrong={wrong} skip={skip} userName={userName} total={total} />

      <NumberChart answer={answer} wrong={wrong} skip={skip} userName={userName} />

      <CopyResult />

      <RetryButton />
    </Separated>
  );
});
