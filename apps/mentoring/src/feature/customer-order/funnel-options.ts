import { funnelOptions } from "@xionhub/funnel-core";

export const customerOrderFunnelOptions = () =>
  funnelOptions({
    steps: ["start", "menu", "pay", "wating", "done"] as const,
    funnelId: "step",
    defaultPrefix: "/customer",
  });
