import { Button, Paragraph, Stack } from "@xionwcfm/ui";
import { FixedBottom } from "~/shared/ui/fixed-bottom";
import { CustomerSignUpStepProps } from "../funnel-options";
type CustomerSignUpConfirmProps = CustomerSignUpStepProps;

export function CustomerSignUpConfirm(props: CustomerSignUpConfirmProps) {
  const { onNextStep, name, phone } = props;

  const handleCtaClick = async () => {
    onNextStep();
  };

  return (
    <Stack>
      <Paragraph>{`이름 : ${name}`}</Paragraph>
      <Paragraph>{`핸드폰 : ${phone}`}</Paragraph>

      <FixedBottom>
        <Button onClick={handleCtaClick} variant={"emphasis"} size={"full"}>
          다음으로
        </Button>
      </FixedBottom>
    </Stack>
  );
}
