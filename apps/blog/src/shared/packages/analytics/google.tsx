import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { env } from "../env";

export const GoogleAnalyticsScript = () => {
  return (
    <>
      <GoogleTagManager gtmId={env.NEXT_PUBLIC_GTM_ID} />
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
    </>
  );
};
