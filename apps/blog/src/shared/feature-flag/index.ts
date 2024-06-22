type FeatureFlagType = "seo-start" | "header-hambuger";

type FeatureFlagContextType = {
  today?: Date;
};

export const isEnabled = (type: FeatureFlagType, context?: FeatureFlagContextType) => {
  const today = context?.today ?? new Date();
  switch (type) {
    case "seo-start":
      return false;
    case "header-hambuger":
      return false;
    default:
      throw new Error("Unknown feature flag type");
  }
};
