import { FixedBottom, FixedBottomCta, Paragraph, Stack } from "@xionwcfm/xds";
import { Fragment } from "react";
import { Lottie } from "~/shared/intergration/lottie";
import { LOTTIE_EMOJI_HAPPY } from "~/shared/lotties";
import { Title } from "../../../shared/ui/title";

export const EnterNameStartStep = ({ onNext }: { onNext: () => void }) => {
  return (
    <Fragment>
      <Title>{"시작하기 전에\n먼저 닉네임을 정해볼까요?"}</Title>

      <Paragraph weight={"thin"} color={"neutral-600"}>
        {"닉네임은 내 테스트 결과를 공유할 때 사용돼요"}
      </Paragraph>

      <Stack justify={"center"} items={"center"} className=" h-[400px]">
        <Lottie className=" w-[240px] h-[240px]" animationData={LOTTIE_EMOJI_HAPPY} autoplay loop={false} />
      </Stack>

      <FixedBottom>
        <FixedBottomCta onClick={onNext}>알겠어요</FixedBottomCta>
      </FixedBottom>
    </Fragment>
  );
};
