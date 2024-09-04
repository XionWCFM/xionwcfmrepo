import { Button, Paragraph, Stack } from "@xionwcfm/xds";
import { FixedBottom } from "~/shared/ui/fixed-bottom";
import { CustomerSignUpStepProps } from "../funnel-options";

type CustomerSignUpStartProps = CustomerSignUpStepProps;

export function CustomerSignUpStart(props: CustomerSignUpStartProps) {
  const { onNextStep } = props;

  const handleCtaClick = () => {
    onNextStep();
  };
  return (
    <Stack>
      <Paragraph>커피 주문 시작하기</Paragraph>
      <FixedBottom>
        <Button onClick={handleCtaClick} variant={"emphasis"} size={"full"}>
          다음으로
        </Button>
      </FixedBottom>
    </Stack>
  );
}
