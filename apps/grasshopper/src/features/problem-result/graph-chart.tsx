import { XION_STYLE } from "@xionwcfm/token";
import { Flex, Paragraph, Stack } from "@xionwcfm/xds";
import { Fragment } from "react";
import { Graph } from "~/shared/ui/graph";
import { calculatePercentage } from "~/shared/utils/calculate-percentage";

export const GraphChart = (props: { total: number; answer: number; wrong: number; skip: number; userName: string }) => {
  const { total, answer, wrong, skip, userName } = props;

  const graphs = [
    { content: "스킵", color: XION_STYLE.colors.warning[300], percentage: skip },
    { content: "오답", color: XION_STYLE.colors.danger[400], percentage: wrong },
    { content: "정답", color: XION_STYLE.colors.primary[400], percentage: answer },
  ];

  return (
    <Fragment>
      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} mb={"32"}>
        {getGraphTitle(userName)}
      </Paragraph>

      <Flex gap={"32"} justify={"center"}>
        {graphs.map((graph) => (
          <Stack key={graph.content} justify={"center"} items={"center"}>
            <Graph color={graph.color} percentage={calculatePercentage(total, graph.percentage)} />
            <Paragraph color={"neutral-400"} weight={"light"} size={"5"}>
              {graph.content}
            </Paragraph>
          </Stack>
        ))}
      </Flex>
    </Fragment>
  );
};

const getGraphTitle = (userName: string) => {
  return `${userName}님의 테스트 결과를 \n그래프로 표현하면 다음과 같아요`;
};
