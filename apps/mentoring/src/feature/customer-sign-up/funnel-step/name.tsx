import { useDraft } from "@xionwcfm/react";
import { Button, Paragraph, Stack, UnderlineInput } from "@xionwcfm/xds";
import { FixedBottom } from "~/shared/ui/fixed-bottom";
import { CustomerSignUpStepProps } from "../funnel-options";
type CustomerSignUpNameProps = CustomerSignUpStepProps;

export function CustomerSignUpName(props: CustomerSignUpNameProps) {
  const { onNextStep, onCommit, name } = props;
  const [draftName, setDraftName] = useDraft(name);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftName(e.target.value);
  };

  const handleCtaClick = () => {
    onCommit({ name: draftName });
    onNextStep();
  };

  return (
    <Stack>
      <Paragraph>이름 입력하기</Paragraph>
      <UnderlineInput value={draftName} onChange={handleInputChange} />
      <FixedBottom>
        <Button onClick={handleCtaClick} variant={"emphasis"} size={"full"}>
          다음으로
        </Button>
      </FixedBottom>
    </Stack>
  );
}
