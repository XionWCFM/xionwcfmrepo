type FeatureFlagType = "header-hambuger" | "author-email";

type FeatureFlagContextType = {
  today?: Date;
};

export const isEnabled = (type: FeatureFlagType, context?: FeatureFlagContextType) => {
  const today = context?.today ?? new Date();
  switch (type) {
    case "header-hambuger":
      return false;
    case "author-email":
      return false;
    default:
      throw new Error("Unknown feature flag type");
  }
};
