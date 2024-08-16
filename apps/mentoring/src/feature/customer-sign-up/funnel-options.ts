import { funnelOptions } from "@xionhub/funnel-core";
import { ROUTES } from "~/shared/routes";
import { CustomerSignUpStateType } from "./state";

export const customerSignUpFunnelOptions = () =>
  funnelOptions({
    steps: ["start", "name", "phone", "confirm", "done"] as const,
    funnelId: "step",
    defaultPrefix: ROUTES.CUSTOMER_SIGN_UP(),
  });

export type CustomerSignUpStepProps = {
  onNextStep: () => void;
  onCommit: (param: Partial<CustomerSignUpStateType>) => void;
} & CustomerSignUpStateType;
