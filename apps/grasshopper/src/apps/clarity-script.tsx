"use client";
import Script from "next/script";

export const ClarityScript = () => {
  return (
    <Script
      id="clarityScript"
      type="text/javascript"
      defer
      strategy={"lazyOnload"}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "o49xyobsd2");`,
      }}
    />
  );
};
