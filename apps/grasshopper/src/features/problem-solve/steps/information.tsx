import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FixedBottom, FixedBottomCta, Paragraph, Spacing, Stack } from "@xionwcfm/xds";
import Lottie from "lottie-react";
import { Fragment } from "react";
import { StepTitle } from "~/features/enter-name/components/step-title";
import { LOTTIE_EMOJI_MEH } from "~/shared/lotties";

export const ProblemSolveInformationStep = ({ onProblemSolveNext }: { onProblemSolveNext: () => void }) => {
  return (
    <Fragment>
      <StepTitle>메뚜기 퀴즈는 이렇게 진행돼요</StepTitle>

      <Spacing h={"8"} />
      <Stack gap={"16"}>
        <Paragraph className=" flex  items-center" color={"neutral-500"} size={"5"} weight={"light"}>
          <CheckCircledIcon className=" mr-8 text-primary-500" />총{" "}
          <Paragraph color={"primary-500"} weight={"medium"}>
            35개
          </Paragraph>
          의 문제가 주어져요
        </Paragraph>

        <Paragraph className=" flex items-center" color={"neutral-500"} size={"5"} weight={"light"}>
          <CheckCircledIcon className=" text-primary-500 mr-8" />
          문제는 모두{" "}
          <Paragraph color={"primary-500"} weight={"medium"}>
            객관식
          </Paragraph>
          으로 이루어져있어요
        </Paragraph>

        <Paragraph className=" flex items-center" color={"neutral-500"} size={"5"} weight={"light"}>
          <CheckCircledIcon className=" text-primary-500 mr-8" />
          문제를 다 풀지 않고 제출해도 괜찮아요
        </Paragraph>

        <Paragraph className=" flex items-center" color={"neutral-500"} size={"5"} weight={"light"}>
          <CheckCircledIcon className=" text-primary-500 mr-8" />
          문제를 그만 풀고 싶다면 X 버튼을 눌러요
        </Paragraph>

        <Paragraph className=" flex  items-center" color={"neutral-500"} size={"5"} weight={"light"}>
          <CheckCircledIcon className=" mr-8 text-primary-500" />
          <Paragraph>그게 다에요! 이제 풀어볼까요?</Paragraph>
        </Paragraph>
      </Stack>

      <Spacing h={"48"} />

      <Stack justify={"center"} items={"center"}>
        <Lottie className=" w-[200px] h-[200px]" animationData={LOTTIE_EMOJI_MEH} autoplay loop />
      </Stack>

      <FixedBottom>
        <FixedBottomCta onClick={onProblemSolveNext}>문제 풀기</FixedBottomCta>
      </FixedBottom>
    </Fragment>
  );
};
