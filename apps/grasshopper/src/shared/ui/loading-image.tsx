"use client";

import { Image } from "@xionwcfm/adapters/image";
import { ComponentProps, Fragment, ReactNode, useState } from "react";

export const LoadingImage = (props: ComponentProps<typeof Image> & { fallback?: ReactNode }) => {
  const { onLoadStart, onLoad, fallback, ...rest } = props;
  const [loading, setLoading] = useState(false);
  return (
    <Fragment>
      {loading ? (
        fallback
      ) : (
        <Image
          onLoadStart={(e) => {
            setLoading(true);
            onLoadStart?.(e);
          }}
          onLoad={(e) => {
            setLoading(false);
            onLoad?.(e);
          }}
          {...rest}
        />
      )}
    </Fragment>
  );
};
