import { ReactNode } from "react";
import { CustomerSignUpStepProps } from "../customer-sign-up-funnel-options";

type CustomerSignUpNameProps = {
  children?: ReactNode;
} & CustomerSignUpStepProps;

export function CustomerSignUpName(props: CustomerSignUpNameProps) {
  const { children } = props;
  return <div></div>;
}
