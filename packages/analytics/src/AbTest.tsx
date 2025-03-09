"use client";
import type { ReactNode } from "react";
import { useFeatureFlag } from "./useFeatureFlag";

interface AbTestProps {
  flag: string;
  on: ReactNode;
  off: ReactNode;
}

export const AbTest = ({ flag, on, off }: AbTestProps) => {
  return useFeatureFlag(flag) ? on : off;
};
