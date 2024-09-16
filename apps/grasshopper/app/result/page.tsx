"use client";
import { useInternalRouter } from "@xionwcfm/adapters/router";
import { InView } from "@xionwcfm/react";
import { XION_STYLE } from "@xionwcfm/token";
import { objectEntries } from "@xionwcfm/utils";
import { Button, Flex, Paragraph, Spacing, Stack, cn } from "@xionwcfm/xds";
import { toast } from "@xionwcfm/xds/toast";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import qs from "qs";
import { PropsWithChildren, useState } from "react";
import * as z from "zod";
import { StepTitle } from "~/features/enter-name/components/step-title";
import { Lottie } from "~/shared/intergration/lottie";
import { LOTTIE_EMOJI_HAPPY } from "~/shared/lotties";
import { $Routes } from "~/shared/routes";
import { PageLayout } from "~/shared/ui/page-layout";
export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useInternalRouter();
  const { success, data } = getResultPageSearchParamsData(searchParams);

  if (!success) {
    return redirect($Routes.root.path());
  }

  const { username, result } = data;
  const { answer, wrong, skip } = calculateResult(result);

  const handleHomeClick = () => {
    router.push($Routes.root.path());
  };
  const handleCopyClick = () => {
    const url = `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    navigator.clipboard.writeText(url);
    toast.success("링크가 복사되었어요");
  };

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
      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} mb={"32"}>
        {`${username}님의 테스트 결과를 \n그래프로 표현하면 다음과 같아요`}
      </Paragraph>
      <Flex gap={"32"} justify={"center"}>
        <Stack justify={"center"} items={"center"}>
          <Graph color={XION_STYLE.colors.warning[300]} percentage={calculatePercentage(result.length, skip)} />
          <Paragraph color={"neutral-400"} weight={"light"} size={"5"}>
            스킵
          </Paragraph>
        </Stack>

        <Stack justify={"center"} items={"center"}>
          <Graph
            delay={1000}
            color={XION_STYLE.colors.danger[400]}
            percentage={calculatePercentage(result.length, wrong)}
          />
          <Paragraph color={"neutral-400"} weight={"light"} size={"5"}>
            오답
          </Paragraph>
        </Stack>

        <Stack justify={"center"} items={"center"}>
          <Graph
            delay={2000}
            color={XION_STYLE.colors.primary[400]}
            percentage={calculatePercentage(result.length, answer)}
          />
          <Paragraph color={"neutral-400"} weight={"light"} size={"5"}>
            정답
          </Paragraph>
        </Stack>
      </Flex>
      <div className=" bg-gray-200 h-[1px] w-full my-16" />

      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} mb={"32"}>
        {`${username}님의 테스트 결과를\n숫자로 보면 어떨까요?`}
      </Paragraph>

      <Stack>
        <Stack className=" w-screen max-w-[160px]" gap={"16"}>
          <Flex justify={"between"}>
            <Paragraph color={"neutral-600"} size={"4"}>
              스킵한 문제
            </Paragraph>
            <BlurText>
              <Paragraph color={"warning-400"} size={"4"}>
                {skip}개
              </Paragraph>
            </BlurText>
          </Flex>

          <Flex justify={"between"}>
            <Paragraph color={"neutral-600"} size={"4"}>
              틀린 문제
            </Paragraph>
            <BlurText>
              <Paragraph color={"danger-400"} size={"4"}>
                {wrong}개
              </Paragraph>
            </BlurText>
          </Flex>

          <Flex justify={"between"}>
            <Paragraph color={"neutral-600"} size={"4"}>
              맞춘 문제
            </Paragraph>
            <BlurText>
              <Paragraph color={"primary-500"} size={"4"}>
                {answer}개
              </Paragraph>
            </BlurText>
          </Flex>
        </Stack>
      </Stack>

      <div className=" bg-gray-200 h-[1px] w-full mt-48 mb-16" />

      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} mb={"12"}>
        {"나의 결과를 친구들에게 쉽게 공유할 수 있어요\n버튼을 눌러 링크를 복사하고 친구에게 전달하세요!"}
      </Paragraph>

      <Button variant={"outline"} size={"md"} onClick={handleCopyClick}>
        내 결과지 복사하기
      </Button>

      <div className=" bg-gray-200 h-[1px] w-full mt-48 mb-16" />

      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} mb={"16"}>
        {"다시 한번 문제를 풀어보는 건 어때요?"}
      </Paragraph>
      <Button variant={"emphasis"} size={"lg"} onClick={handleHomeClick}>
        문제 풀러가기
      </Button>
      <Spacing h={"128"} />
    </PageLayout>
  );
}

const BlurText = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(true);
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={() => setState(false)}
      style={{ transitionDuration: `2000ms` }}
      className={cn(" transition-all", state && " blur-sm shadow-sm")}
    >
      {children}
    </div>
  );
};

const Graph = (props: { color?: string; percentage: number; width?: string; height?: string; delay?: number }) => {
  const { percentage, color, height, width, delay = 200 } = props;
  const [isAnimation, setIsAnimation] = useState(false);
  return (
    <InView
      once
      onIntersectStart={() => {
        setTimeout(() => {
          setIsAnimation(true);
        }, delay);
      }}
    >
      <div
        className=" bg-gray-200 flex  rounded-sm items-end"
        style={{ height: height ?? "200px", width: width ?? "40px" }}
      >
        <div
          className=" rounded-sm w-full transition-all  "
          style={{
            height: isAnimation ? `${percentage}%` : "0%",
            backgroundColor: color ?? XION_STYLE.colors.primary[500],
            transitionDuration: `1600ms`,
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)", // 부드러운 애니메이션을 위한 easing 함수
          }}
        ></div>
      </div>
    </InView>
  );
};

const calculatePercentage = (total: number, item: number) => {
  return (item / total) * 100;
};

const calculateResult = (param: { selectedAnswerId: string; answerId: string; pageNum: string }[]) => {
  return param.reduce(
    (acc, cur) => {
      if (cur.selectedAnswerId === "") {
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        return { ...acc, skip: acc.skip + 1 };
      }
      if (cur.selectedAnswerId === cur.answerId) {
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        return { ...acc, answer: acc.answer + 1 };
      }
      // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
      return { ...acc, wrong: acc.wrong + 1 };
    },
    { answer: 0, wrong: 0, skip: 0 },
  );
};

const getResultPageSearchParamsData = (searchParams: URLSearchParams) => {
  return resultPageSearchParamsSchema.safeParse(qs.parse(searchParams.toString(), { parseArrays: true }));
};

const resultPageSearchParamsSchema = z
  .object({
    username: z.string(),
    result: z.record(
      z.string(),
      z.object({
        selectedAnswerId: z.string(),
        answerId: z.string(),
      }),
    ),
  })
  .transform((value) => ({
    username: value.username,
    result: objectEntries(value.result).map(([key, value]) => ({ pageNum: key, ...value })),
  }));
