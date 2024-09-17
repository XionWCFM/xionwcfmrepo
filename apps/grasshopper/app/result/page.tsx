"use client";
import { Separated } from "@xionwcfm/react";
import { Paragraph, Spacing, Stack } from "@xionwcfm/xds";
import { redirect, useSearchParams } from "next/navigation";
import qs from "qs";
import * as z from "zod";
import { StepTitle } from "~/features/enter-name/components/step-title";
import { CopyResult } from "~/features/problem-result/copy-result";
import { GraphChart } from "~/features/problem-result/graph-chart";
import { NumberChart } from "~/features/problem-result/number-chart";
import { ProblemSolveRetry } from "~/features/problem-result/problem-solve-retry";
import { Lottie } from "~/shared/intergration/lottie";
import { LOTTIE_EMOJI_HAPPY } from "~/shared/lotties";
import { $Routes } from "~/shared/routes";
import { PageLayout } from "~/shared/ui/page-layout";
import { decrypt } from "~/shared/utils/crypto";

export default function Page() {
  const searchParams = useSearchParams();
  const { success, data: solveResult } = getResultPageSearchParamsData(searchParams);

  if (!success) {
    return redirect($Routes.root.path());
  }

  const { username } = solveResult;
  console.log(solveResult);
  return (
    <PageLayout>
      <StepTitle>{`${username}님의\n메뚜기 퀴즈 결과는?`}</StepTitle>

      <Stack justify={"center"} items={"center"} w={"100%"}>
        <Lottie className=" w-[180px] h-[180px]" animationData={LOTTIE_EMOJI_HAPPY} autoplay loop />
      </Stack>

      <Paragraph color={"neutral-500"} size={"4"}>
        {`${username}님은 어떤 결과를 얻으셨을까요?`}
      </Paragraph>

      <div className=" bg-gray-200 h-[1px] w-full my-16" />

      <Separated with={<RowSeparator />}>
        <GraphChart {...solveResult} />

        <NumberChart {...solveResult} />

        <CopyResult />

        <ProblemSolveRetry />
      </Separated>

      <Spacing h={"128"} />
    </PageLayout>
  );
}

const RowSeparator = () => {
  return <div className=" bg-gray-200 h-[1px] w-full my-16" />;
};
const getResultPageSearchParamsData = (searchParams: URLSearchParams) => {
  return resultPageSearchParamsSchema.safeParse(qs.parse(searchParams.toString(), { parseArrays: true }));
};

const resultPageSearchParamsSchema = z
  .object({
    data: z.string(),
  })
  .transform(({ data }) => {
    const decrypted = decrypt(data);
    return z
      .object({ username: z.string(), answer: z.number(), wrong: z.number(), skip: z.number(), total: z.number() })
      .parse(decrypted);
  });
