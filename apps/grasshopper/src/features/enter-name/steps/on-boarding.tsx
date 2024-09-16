import { Link } from "@xionwcfm/adapters/link";
import { FixedBottom, FixedBottomCta, Paragraph, Pressable, Separator, Spacing } from "@xionwcfm/xds";
import { Fragment } from "react";
import { StepTitle } from "../components/step-title";

export const EnterNameOnboarding = ({ onStartNext }: { onStartNext: () => void }) => {
  return (
    <Fragment>
      <StepTitle>{"메뚜기의 종류를 잘 외우는 것은 \n우리에게 정말 필요한 일이죠!"}</StepTitle>

      <Spacing h={"16"} />
      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} leading={"loose"}>
        {
          "메뚜기의 종류를 잘 맞출 수 있는 사람은 그렇지 않은 사람보다 메뚜기를 잘 알고 있을 확률이 높다는 연구 결과도 있으니까요"
        }
      </Paragraph>

      <FixedBottom>
        <Paragraph px={"16"} mb={"32"} color={"neutral-500"} weight={"light"} size={"4"} leading={"loose"}>
          저희 사이트의 메뚜기 사진은{"\n"}
          <Pressable>
            <Paragraph
              as={Link}
              color={"success-700"}
              weight={"medium"}
              aria-label="한국 생물 다양성 협회 링크"
              className=" underline underline-offset-4"
              href=""
              target={"_blank"}
            >
              한국 생물 다양성 협회
            </Paragraph>
          </Pressable>
          에 저작권이 있어요
        </Paragraph>
        <FixedBottomCta onClick={onStartNext}>다음으로</FixedBottomCta>
      </FixedBottom>
    </Fragment>
  );
};
