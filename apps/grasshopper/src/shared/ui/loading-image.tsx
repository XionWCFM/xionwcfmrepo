"use client";

import { Image } from "@xionwcfm/adapters/image";
import { cn } from "@xionwcfm/xds";
import { ComponentProps, Fragment, ReactNode, useState } from "react";

export const LoadingImage = (props: ComponentProps<typeof Image> & { fallback?: ReactNode }) => {
  const { onLoad, onLoadStart, onError, fallback, className, ...rest } = props;
  const [isLoaded, setLoaded] = useState(true);
  const isRenderFallback = !isLoaded;
  return (
    <Fragment>
      {isRenderFallback ? fallback : null}

      <Image
        className={cn(!isLoaded && " absolute invisible", className)}
        onLoadStart={(e) => {
          setLoaded(false);
          onLoadStart?.(e);
        }}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        {...rest}
      />
    </Fragment>
  );
};
