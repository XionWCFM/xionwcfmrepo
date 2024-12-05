import { cn } from "@xionwcfm/xds";
import type { ComponentPropsWithoutRef } from "react";

const MOBILE_SIZE = {
  IPHONE_14_PRO_MAX: {
    width: "430px",
    height: "932px",
  },
};

type MobieSizeVariants = keyof typeof MOBILE_SIZE;

export const Iframe = (props: ComponentPropsWithoutRef<"iframe"> & { title: string; device?: MobieSizeVariants }) => {
  const { children, className, title, src, device = "IPHONE_14_PRO_MAX", ...rest } = props;

  return (
    <iframe
      src={src}
      title={title}
      className={cn(" w-full", className)}
      style={{
        maxWidth: MOBILE_SIZE[device].width,
      }}
      height={MOBILE_SIZE[device].height}
      {...rest}
    />
  );
};
