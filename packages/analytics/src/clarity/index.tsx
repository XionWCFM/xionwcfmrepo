import { env } from "@repo/env";
import Script from "next/script";

export const ClarityScript = () => {
  if (env.NODE_ENV === "development") {
    return null;
  }

  return (
    <Script
      id="clarityScript"
      type="text/javascript"
      defer={true}
      strategy={"lazyOnload"}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        // biome-ignore lint/style/useNamingConvention: <explanation>
        __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "mvz3tc93tn")`,
      }}
    />
  );
};
