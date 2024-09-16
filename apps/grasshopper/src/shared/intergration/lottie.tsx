"use client";
import { cn } from "@xionwcfm/xds";
import OriginalLottie from "lottie-react";
import { ComponentProps } from "react";

export const Lottie = (props: ComponentProps<typeof OriginalLottie>) => {
  const { className, ...rest } = props;
  return <OriginalLottie className={cn(" w-full h-full", className)} {...rest} />;
};
