"use client";
import { env } from "@repo/env";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import posthogRaw from "posthog-js";
import { PostHogProvider as PostHogProviderRaw, usePostHog } from "posthog-js/react";
import { type ReactNode, Suspense, useEffect } from "react";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = `${url}?${searchParams.toString()}`;
      }

      // biome-ignore lint/style/useNamingConvention: <explanation>
      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

export default function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
type PostHogProviderProps = {
  readonly children: ReactNode;
};

export const PostHogProvider = (properties: Omit<PostHogProviderProps, "client">) => {
  const { children, ...rest } = properties;
  useEffect(() => {
    posthogRaw.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      loaded: (posthog) => {
        if (env.NODE_ENV === "development") {
          posthog.debug();
        }
      },
    });
  }, []);

  return (
    <PostHogProviderRaw client={posthogRaw} {...rest}>
      {children}
      <PostHogPageView />
    </PostHogProviderRaw>
  );
};
