import { Flex, Paragraph, Stack } from "@xionwcfm/xds";
import { Fragment } from "react";
import { BlurText } from "~/shared/ui/blur-text";

export const NumberChart = (props: { skip: number; wrong: number; answer: number; userName: string }) => {
  const { skip, wrong, answer, userName } = props;

  const numberCharts = [
    { content: "스킵한 문제", count: skip, color: "warning-400" },
    { content: "틀린 문제", count: wrong, color: "danger-400" },
    { content: "맞춘 문제", count: answer, color: "primary-500" },
  ] as const;

  return (
    <Fragment>
      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} mb={"32"}>
        {getNumberTitle(userName)}
      </Paragraph>

      <Stack>
        <Stack className=" w-screen max-w-[160px]" gap={"16"}>
          {numberCharts.map((chart) => (
            <Flex key={chart.content} justify={"between"}>
              <Paragraph color={"neutral-600"} size={"4"}>
                {chart.content}
              </Paragraph>
              <BlurText>
                <Paragraph color={chart.color} size={"4"}>
                  {chart.count}개
                </Paragraph>
              </BlurText>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Fragment>
  );
};

const getNumberTitle = (userName: string) => {
  return `${userName}님의 테스트 결과를\n숫자로 보면 어떨까요?`;
};
