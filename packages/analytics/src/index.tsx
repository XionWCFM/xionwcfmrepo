"use client";
import type { ReactNode } from "react";
import { ClarityScript } from "./clarity";
import { GoogleAnalyticsScript } from "./google";

type AnalyticsProviderProps = {
  readonly children: ReactNode;
};

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => (
  <>
    {children}
    <ClarityScript />
    <GoogleAnalyticsScript />
  </>
);
