import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).startsWith("phc_"),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
    NEXT_PUBLIC_GA_ID: z.string().min(1),
    NEXT_PUBLIC_GTM_ID: z.string().min(1),
    NEXT_PUBLIC_GSC_ID: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_CLOUD_FRONT_URL: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
  },
  server: {
    NEXT_SUPABASE_SERVICE_ROLE: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    JWT_SECRET: z.string().min(1),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    NEXT_PUBLIC_GSC_ID: process.env.NEXT_PUBLIC_GSC_ID,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_CLOUD_FRONT_URL: process.env.NEXT_PUBLIC_CLOUD_FRONT_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_SUPABASE_SERVICE_ROLE: process.env.NEXT_SUPABASE_SERVICE_ROLE,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  },
  emptyStringAsUndefined: true,
});
