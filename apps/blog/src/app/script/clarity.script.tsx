"use client";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

export const ClarityScript = () => {
  return (
    <>
      <Script id="clarityScript" type="text/javascript" defer strategy={"afterInteractive"}>{`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "mvz3tc93tn")`}</Script>
    </>
  );
};

export const useHI = () => {
  const searchParams = useSearchParams();
  const getAllSearchParams = () => {
    const obj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };
};
