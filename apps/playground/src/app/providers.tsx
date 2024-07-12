"use client";
import { createLogger } from "@xionwcfm/logger";
import type { PropsWithChildren } from "react";

export const logger = createLogger();

export const Providers = (props: PropsWithChildren) => {
  return props.children;
};
