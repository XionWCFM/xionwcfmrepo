"use client";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { useFunnelDefaultStep } from "@xionhub/funnel-core";
import { useRouter } from "next/navigation";
import { ROUTES } from "~/shared/routes";
import { customerSignUpFunnelOptions } from "./customer-sign-up-funnel-options";
import { useCustomerSignUpDispatch, useCustomerSignUpState } from "./customer-sign-up-state";
import { CustomerSignUpConfirm } from "./funnel-step/customer-sign-up-confirm";
import { CustomerSignUpDone } from "./funnel-step/customer-sign-up-done";
import { CustomerSignUpGuard } from "./funnel-step/customer-sign-up-guard";
import { CustomerSignUpName } from "./funnel-step/customer-sign-up-name";
import { CustomerSignUpPhone } from "./funnel-step/customer-sign-up-phone";
import { CustomerSignUpStart } from "./funnel-step/customer-sign-up-start";

export const CustomerSignUpFunnel = () => {
  const [Funnel, { step, createStep }] = useFunnel(customerSignUpFunnelOptions());
  const router = useRouter();

  const customerSignUpState = useCustomerSignUpState();
  const customerSignUpdispatch = useCustomerSignUpDispatch();

  useFunnelDefaultStep(step, () => router.replace(createStep("start")));

  return (
    <Funnel>
      <Funnel.Step name={"start"}>
        <CustomerSignUpGuard>
          <CustomerSignUpStart
            onNextStep={() => router.push(createStep("name"))}
            onCommit={customerSignUpdispatch}
            {...customerSignUpState}
          />
        </CustomerSignUpGuard>
      </Funnel.Step>

      <Funnel.Step name={"name"}>
        <CustomerSignUpGuard>
          <CustomerSignUpName
            onNextStep={() => router.push(createStep("phone"))}
            onCommit={customerSignUpdispatch}
            {...customerSignUpState}
          />
        </CustomerSignUpGuard>
      </Funnel.Step>
      <Funnel.Step name={"phone"}>
        <CustomerSignUpGuard>
          <CustomerSignUpPhone
            onNextStep={() => router.push(createStep("confirm"))}
            onCommit={customerSignUpdispatch}
            {...customerSignUpState}
          />
        </CustomerSignUpGuard>
      </Funnel.Step>

      <Funnel.Step name={"confirm"}>
        <CustomerSignUpGuard>
          <CustomerSignUpConfirm
            onNextStep={() => router.push(createStep("done"))}
            onCommit={customerSignUpdispatch}
            {...customerSignUpState}
          />
        </CustomerSignUpGuard>
      </Funnel.Step>

      <Funnel.Step name={"done"}>
        <CustomerSignUpDone
          onNextStep={() => router.push(ROUTES.CUSTOMER())}
          onCommit={customerSignUpdispatch}
          {...customerSignUpState}
        />
      </Funnel.Step>
    </Funnel>
  );
};
