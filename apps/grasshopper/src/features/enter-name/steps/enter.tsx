import { useInputState } from "@xionwcfm/react";
import { FixedBottom, FixedBottomCta, Paragraph, Spacing, UnderlineInput } from "@xionwcfm/xds";
import { Fragment } from "react";
import { StepTitle } from "../components/step-title";

export const EnterNameEnterStep = ({ onNext, userName }: { userName: string; onNext: (name: string) => void }) => {
  const [value, onChange] = useInputState(userName);
  const disabled = !parseUserName(value);

  const handleCtaClick = () => {
    onNext(value);
  };

  return (
    <Fragment>
      <StepTitle>{"닉네임을 정해주세요"}</StepTitle>
      <Paragraph weight={"thin"} color={"neutral-500"}>
        {"닉네임은 1자 이상 8자 이하를 권장드리고 있어요"}
      </Paragraph>

      <Spacing h={"32"} />
      <UnderlineInput placeholder="닉네임" value={value} onChange={onChange} />

      <FixedBottom>
        <FixedBottomCta disabled={disabled} onClick={handleCtaClick}>
          다음으로
        </FixedBottomCta>
      </FixedBottom>
    </Fragment>
  );
};

const parseUserName = (value: string) => {
  return value.length > 0 && value.length < 9;
};
