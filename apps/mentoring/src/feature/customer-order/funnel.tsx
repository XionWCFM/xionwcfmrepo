import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { useFunnelDefaultStep } from "@xionhub/funnel-core";
import { useRouter } from "next/navigation";
import { customerOrderFunnelOptions } from "./funnel-options";

const CustomerOrderFunnel = () => {
  const [Funnel, { step, createStep }] = useFunnel(customerOrderFunnelOptions());
  const router = useRouter();
  useFunnelDefaultStep(step, () => {
    router.replace(createStep("start"));
  });
};
