import { ReactNode } from "react";
import { CustomerSignUpStepProps } from "../customer-sign-up-funnel-options";

type CustomerSignUpConfirmProps = {
  children?: ReactNode;
} & CustomerSignUpStepProps;

export function CustomerSignUpConfirm(props: CustomerSignUpConfirmProps) {
  const { children } = props;
  return <div></div>;
}
