import { ReactNode } from "react";
import { CustomerSignUpStepProps } from "../customer-sign-up-funnel-options";

type CustomerSignUpDoneProps = {
  children?: ReactNode;
} & CustomerSignUpStepProps;

export function CustomerSignUpDone(props: CustomerSignUpDoneProps) {
  const { children } = props;
  return <div></div>;
}
