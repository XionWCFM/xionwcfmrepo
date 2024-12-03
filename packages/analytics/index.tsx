"use client";
import type { ReactNode } from "react";
import { ClarityScript } from "./clarity";
import { GoogleAnalyticsScript } from "./google";
import { PostHogProvider } from "./posthog/client";

type AnalyticsProviderProps = {
  readonly children: ReactNode;
};

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => (
  <PostHogProvider>
    {children}
    <ClarityScript />
    <GoogleAnalyticsScript />
  </PostHogProvider>
);
