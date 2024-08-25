import { useDraft } from "@xionwcfm/hooks";
import { Button, Paragraph, Stack, UnderlineInput } from "@xionwcfm/ui";
import { FixedBottom } from "~/shared/ui/fixed-bottom";
import { CustomerSignUpStepProps } from "../funnel-options";

type CustomerSignUpPhoneProps = CustomerSignUpStepProps;

export function CustomerSignUpPhone(props: CustomerSignUpPhoneProps) {
  const { phone, onCommit, onNextStep } = props;
  const [draftPhone, setDraftPhone] = useDraft(phone);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftPhone(e.target.value);
  };
  const handleCtaClick = () => {
    onCommit({ phone: draftPhone });
    onNextStep();
  };

  return (
    <Stack>
      <Paragraph>핸드폰 번호 입력하기</Paragraph>
      <UnderlineInput value={draftPhone} onChange={handleInputChange} />
      <FixedBottom>
        <Button onClick={handleCtaClick} variant={"emphasis"} size={"full"}>
          다음으로
        </Button>
      </FixedBottom>
    </Stack>
  );
}
