import "server-only";
import { env } from "@repo/env";
import { PostHog } from "posthog-node";

export const analytics = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
  host: env.NEXT_PUBLIC_POSTHOG_HOST,
});
