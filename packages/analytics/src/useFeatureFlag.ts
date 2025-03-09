import { useFeatureFlagEnabled } from "posthog-js/react";

export const useFeatureFlag = (featureFlag: string) => {
  const isEnabled = useFeatureFlagEnabled(featureFlag);
  return isEnabled;
};
