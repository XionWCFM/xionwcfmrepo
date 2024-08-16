import { ReactNode } from "react";
import { CustomerSignUpStepProps } from "../customer-sign-up-funnel-options";

type CustomerSignUpStartProps = {
  children?: ReactNode;
} & CustomerSignUpStepProps;

export function CustomerSignUpStart(props: CustomerSignUpStartProps) {
  const { children } = props;
  return <div></div>;
}
