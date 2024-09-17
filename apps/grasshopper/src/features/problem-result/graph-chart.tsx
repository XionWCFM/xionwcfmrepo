import { InView } from "@xionwcfm/react";
import { XION_STYLE } from "@xionwcfm/token";
import { Flex, Paragraph, Stack } from "@xionwcfm/xds";
import { Fragment, useState } from "react";

export const GraphChart = ({
  total,
  answer,
  wrong,
  skip,
  username,
}: { total: number; answer: number; wrong: number; skip: number; username: string }) => {
  return (
    <Fragment>
      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} mb={"32"}>
        {`${username}님의 테스트 결과를 \n그래프로 표현하면 다음과 같아요`}
      </Paragraph>
      <Flex gap={"32"} justify={"center"}>
        <Stack justify={"center"} items={"center"}>
          <Graph color={XION_STYLE.colors.warning[300]} percentage={calculatePercentage(total, skip)} />
          <Paragraph color={"neutral-400"} weight={"light"} size={"5"}>
            스킵
          </Paragraph>
        </Stack>

        <Stack justify={"center"} items={"center"}>
          <Graph delay={1000} color={XION_STYLE.colors.danger[400]} percentage={calculatePercentage(total, wrong)} />
          <Paragraph color={"neutral-400"} weight={"light"} size={"5"}>
            오답
          </Paragraph>
        </Stack>

        <Stack justify={"center"} items={"center"}>
          <Graph delay={2000} color={XION_STYLE.colors.primary[400]} percentage={calculatePercentage(total, answer)} />
          <Paragraph color={"neutral-400"} weight={"light"} size={"5"}>
            정답
          </Paragraph>
        </Stack>
      </Flex>
    </Fragment>
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
