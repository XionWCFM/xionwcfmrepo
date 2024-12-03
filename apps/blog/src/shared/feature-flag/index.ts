import { env } from "@repo/env";
type FeatureFlagType = "header-hambuger" | "author-email";

type FeatureFlagContextType = {
  today?: Date;
};

export const isEnabled = (type: FeatureFlagType, context?: FeatureFlagContextType) => {
  const today = context?.today ?? new Date();
  switch (type) {
    case "header-hambuger":
      return env.NODE_ENV === "development";
    case "author-email":
      return true;
    default:
      throw new Error("Unknown feature flag type");
  }
};
