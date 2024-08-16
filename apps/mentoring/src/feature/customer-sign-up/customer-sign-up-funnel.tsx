"use client";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { useRouter } from "next/navigation";
import { customerSignUpFunnelOptions } from "./customer-sign-up-funnel-options";
import { CustomerSignUpStart } from "./funnel-step/customer-sign-up-start";

export const CustomerOrderFunnel = () => {
  const [Funnel, { createStep }] = useFunnel(customerSignUpFunnelOptions());
  const router = useRouter();
  return (
    <Funnel>
      <Funnel.Step name={"start"}>
        <CustomerSignUpStart onNextStep={() => router.push(createStep("name"))} />
      </Funnel.Step>
      <Funnel.Step name={"name"}>
        <div className=""></div>
      </Funnel.Step>
      <Funnel.Step name={"phone"}>
        <div className=""></div>
      </Funnel.Step>

      <Funnel.Step name={"confirm"}>
        <div className=""></div>
      </Funnel.Step>

      <Funnel.Step name={"done"}>
        <div className=""></div>
      </Funnel.Step>
    </Funnel>
  );
};
