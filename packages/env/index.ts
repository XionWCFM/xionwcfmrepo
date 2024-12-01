import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  client: {
    PUBLIC_POSTHOG_KEY: z.string().min(1).startsWith("phc_"),
    PUBLIC_POSTHOG_HOST: z.string().min(1),
    PUBLIC_GA_MEASUREMENT_ID: z.string().min(1).optional(),
  },
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  clientPrefix: "PUBLIC_",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
