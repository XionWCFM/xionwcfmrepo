"use client";

import { Image } from "@xionwcfm/adapters/image";
import { cn } from "@xionwcfm/xds";
import { ComponentProps, Fragment, ReactNode, useState } from "react";

export const LoadingImage = (props: ComponentProps<typeof Image> & { fallback?: ReactNode }) => {
  const { onLoadStart, onLoad, fallback, className, ...rest } = props;
  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      {loading ? fallback : null}
      <Image
        onLoadStart={(e) => {
          onLoadStart?.(e);
          setLoading(true);
        }}
        className={cn(loading && " absolute invisible", className)}
        onLoad={(e) => {
          setLoading(false);
        }}
        {...rest}
      />
    </Fragment>
  );
};
