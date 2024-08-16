import { ReactNode } from "react";
import { CustomerSignUpStepProps } from "../customer-sign-up-funnel-options";

type CustomerSignUpPhoneProps = {
  children?: ReactNode;
} & CustomerSignUpStepProps;

export function CustomerSignUpPhone(props: CustomerSignUpPhoneProps) {
  const { children } = props;
  return <div></div>;
}
