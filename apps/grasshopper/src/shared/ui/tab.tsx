import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "@xionwcfm/xds";
import { type ComponentProps, type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";

const Root = RadixTabs.Root;

const Trigger = forwardRef<ElementRef<typeof RadixTabs.Trigger>, ComponentProps<typeof RadixTabs.Trigger>>(
  (props, ref) => {
    const { children, className, ...rest } = props;
    return (
      <RadixTabs.Trigger
        ref={ref}
        className={cn(
          " w-full",
          "data-[state=active]:font-medium data-[state=active]:text-neutral-500",
          "data-[state=inactive]:font-light data-[state=inactive]:text-neutral-300",
        )}
        {...rest}
      >
        {children}
      </RadixTabs.Trigger>
    );
  },
);

const List = forwardRef<ElementRef<typeof RadixTabs.List>, ComponentProps<typeof RadixTabs.List>>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <RadixTabs.List
      className={cn(" h-[52px] relative w-full flex justify-center items-center", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </RadixTabs.List>
  );
});

const TransrateBar = (props: ComponentPropsWithoutRef<"div">) => {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      className={cn(
        "absolute max-w-[450px] w-[50%] left-0 bottom-0  transition-all duration-200",
        " h-[2px] bg-neutral-500",
        className,
      )}
    ></div>
  );
};

const Content = RadixTabs.Content;

export const Tab = {
  Root,
  List,
  Trigger,
  TransrateBar,
  Content,
};
