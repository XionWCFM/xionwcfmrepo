import { CheckCircledIcon, CrossCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { SwitchCase } from "@xionwcfm/react";
import { cn } from "@xionwcfm/xds";
import { type VariantProps, cva } from "class-variance-authority";

const calloutVariants = cva(" shadow-xs my-12 ring-[1px] text-size-7 px-12 py-80 rounded-sm", {
  variants: {
    variant: {
      info: "bg-primary-100 text-primary-600 ring-primary-300",
      success: "bg-success-100 text-success-600 ring-success-300",
      warning: " bg-warning-100 text-warning-600 ring-warning-300",
      error: " bg-danger-100 text-danger-600 ring-danger-300",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

type CallOutProps = {
  children: React.ReactNode;
} & VariantProps<typeof calloutVariants>;

export const CallOut = ({ variant, children }: CallOutProps) => {
  return (
    <div className={cn(calloutVariants({ variant }), "flex gap-x-16 items-center")}>
      <SwitchCase
        value={variant ?? "info"}
        caseBy={{
          info: <InfoCircledIcon className="text-primary-600 h-[20px] w-[20px]" />,
          success: <CheckCircledIcon className="text-success-600 h-[20px] w-[20px]" />,
          warning: <ExclamationTriangleIcon className="text-warning-600 h-[20px] w-[20px]" />,
          error: <CrossCircledIcon className="text-danger-600 h-[20px] w-[20px]" />,
        }}
      />

      <span className=" whitespace-pre-wrap">{children}</span>
    </div>
  );
};
