type FeatureFlagType = "seo-start";

type FeatureFlagContextType = {
  today?: Date;
};

export const isEnabled = (type: FeatureFlagType, context?: FeatureFlagContextType) => {
  const today = context?.today ?? new Date();
  switch (type) {
    case "seo-start":
      return false;
    default:
      throw new Error("Unknown feature flag type");
  }
};
