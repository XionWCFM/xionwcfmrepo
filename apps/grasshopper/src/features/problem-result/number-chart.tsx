import { Flex, Paragraph, Stack, cn } from "@xionwcfm/xds";
import { Fragment, PropsWithChildren, useState } from "react";

export const NumberChart = ({
  skip,
  wrong,
  answer,
  userName,
}: { skip: number; wrong: number; answer: number; userName: string }) => {
  return (
    <Fragment>
      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} mb={"32"}>
        {`${userName}님의 테스트 결과를\n숫자로 보면 어떨까요?`}
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
    </Fragment>
  );
};

const BlurText = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(true);
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={() => setState(false)}
      style={{ transitionDuration: `2000ms` }}
      className={cn(" cursor-pointer transition-all", state && " blur-sm shadow-sm")}
    >
      {children}
    </div>
  );
};
