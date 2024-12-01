import "server-only";
import { env } from "@repo/env";
import { PostHog } from "posthog-node";

export const analytics = new PostHog(env.PUBLIC_POSTHOG_KEY, {
  host: env.PUBLIC_POSTHOG_HOST,

  // Don't batch events and flush immediately - we're running in a serverless environment
  flushAt: 1,
  flushInterval: 0,
});
