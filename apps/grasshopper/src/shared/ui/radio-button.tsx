import { cn } from "@xionwcfm/xds";
import React from "react";
import { ComponentPropsWithoutRef } from "react";

export const RadioButton = (props: ComponentPropsWithoutRef<"button"> & { selected?: boolean }) => {
  const { className, children, selected = false, ...rest } = props;

  return (
    <button
      type="button"
      className={cn(
        " w-full px-12 py-8 flex justify-center items-center rounded-sm",
        " duration-200 transition-all",
        !selected && " ring-1 ring-neutral-200 text-neutral-500 font-light",
        selected && " ring-2 ring-primary-300 text-primary-500 font-medium",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
