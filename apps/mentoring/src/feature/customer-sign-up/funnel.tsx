"use client";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { useFunnelDefaultStep } from "@xionhub/funnel-core";
import { useRouter } from "next/navigation";
import { ROUTES } from "~/shared/routes";
import { customerSignUpFunnelOptions } from "./funnel-options";
import { CustomerSignUpConfirm } from "./funnel-step/confirm";
import { CustomerSignUpDone } from "./funnel-step/done";
import { CustomerSignUpGuard } from "./funnel-step/guard";
import { CustomerSignUpName } from "./funnel-step/name";
import { CustomerSignUpPhone } from "./funnel-step/phone";
import { CustomerSignUpStart } from "./funnel-step/start";
import { CustomerSignUpStateType, useCustomerSignUpStorage } from "./state";

export const CustomerSignUpFunnel = () => {
  const [Funnel, { step, createStep }] = useFunnel(customerSignUpFunnelOptions());
  const router = useRouter();

  const [customerSignUpState, customerSignUpDispatch] = useCustomerSignUpStorage();

  const dispatch = (newValue: Partial<CustomerSignUpStateType>) =>
    customerSignUpDispatch((prev) => ({ ...prev, ...newValue }));

  useFunnelDefaultStep(step, () => router.replace(createStep("start")));

  return (
    <Funnel>
      <Funnel.Step name={"start"}>
        <CustomerSignUpGuard>
          <CustomerSignUpStart
            onNextStep={() => router.push(createStep("name"))}
            onCommit={dispatch}
            {...customerSignUpState}
          />
        </CustomerSignUpGuard>
      </Funnel.Step>

      <Funnel.Step name={"name"}>
        <CustomerSignUpGuard>
          <CustomerSignUpName
            onNextStep={() => router.push(createStep("phone"))}
            onCommit={dispatch}
            {...customerSignUpState}
          />
        </CustomerSignUpGuard>
      </Funnel.Step>
      <Funnel.Step name={"phone"}>
        <CustomerSignUpGuard>
          <CustomerSignUpPhone
            onNextStep={() => router.push(createStep("confirm"))}
            onCommit={dispatch}
            {...customerSignUpState}
          />
        </CustomerSignUpGuard>
      </Funnel.Step>

      <Funnel.Step name={"confirm"}>
        <CustomerSignUpGuard>
          <CustomerSignUpConfirm
            onNextStep={() => router.push(createStep("done"))}
            onCommit={dispatch}
            {...customerSignUpState}
          />
        </CustomerSignUpGuard>
      </Funnel.Step>

      <Funnel.Step name={"done"}>
        <CustomerSignUpDone
          onNextStep={() => router.push(ROUTES.CUSTOMER())}
          onCommit={dispatch}
          {...customerSignUpState}
        />
      </Funnel.Step>
    </Funnel>
  );
};
