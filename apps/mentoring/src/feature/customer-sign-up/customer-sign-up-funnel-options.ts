import { funnelOptions } from "@xionhub/funnel-core";

export const customerSignUpFunnelOptions = () =>
  funnelOptions({
    steps: ["start", "name", "phone", "confirm", "done"] as const,
    funnelId: "step",
    defaultPrefix: "/customer",
  });

export type CustomerSignUpStepProps = {
  onNextStep: () => void;
};
