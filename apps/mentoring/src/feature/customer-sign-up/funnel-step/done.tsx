import { Button, Stack } from "@xionwcfm/xds";
import { FixedBottom } from "~/shared/ui/fixed-bottom";
import { CustomerSignUpStepProps } from "../funnel-options";

type CustomerSignUpDoneProps = CustomerSignUpStepProps;

export function CustomerSignUpDone(props: CustomerSignUpDoneProps) {
  const { onNextStep, onCommit, id } = props;
  const handleCtaClick = () => {
    if (!id) {
      onCommit({ id: Math.random().toString(36).substring(7) });
    }
    onNextStep();
  };
  return (
    <Stack>
      <FixedBottom>
        <Button onClick={handleCtaClick} variant={"emphasis"} size={"full"}>
          음료 주문하러가기
        </Button>
      </FixedBottom>
    </Stack>
  );
}
