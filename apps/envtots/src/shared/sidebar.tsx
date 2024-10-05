"use client";

import { createSafeContext, useDraft } from "@xionwcfm/react";
import { Box } from "@xionwcfm/xds/box";
import { Button } from "@xionwcfm/xds/button";
import { cn } from "@xionwcfm/xds/cn";
import { Flex } from "@xionwcfm/xds/flex";
import { Paragraph } from "@xionwcfm/xds/paragraph";
import { Pressable } from "@xionwcfm/xds/pressable";
import { Spacing } from "@xionwcfm/xds/spacing";
import { Stack } from "@xionwcfm/xds/stack";
import { ComponentPropsWithoutRef, ReactNode, Ref, forwardRef, useRef } from "react";

const useId = () => {
  const idRef = useRef<string>("");
  if (idRef.current === "") {
    idRef.current = Math.random().toString(36).substr(2, 9);
  }
  return idRef.current;
};

const Item = forwardRef(function Item(
  props: ComponentPropsWithoutRef<"button"> & { icon?: ReactNode; value?: string },
  ref: Ref<HTMLButtonElement>,
) {
  const { icon, children, className, value, onClick, ...rest } = props;
  const id = useId();
  const { value: currentValue, onValueChange } = useContextState();
  const componentId = value ?? id;
  const isCurrent = currentValue === componentId;
  return (
    <Pressable className=" group w-full flex justify-start">
      <Button
        size={"sm"}
        className={cn(" font-light text-gray-500 text-size-4", className, isCurrent && "bg-gray-100")}
        onClick={(e: any) => {
          onClick?.(e);
          onValueChange(componentId);
        }}
        ref={ref}
        {...rest}
      >
        <Flex gap={"12"} items={"center"}>
          <Box
            className={cn(
              " duration-200 transition-all ",
              "group-hover:scale-125 group-hover:text-primary-500",
              isCurrent && " scale-125 text-primary-500",
            )}
          >
            {icon}
          </Box>
          <Paragraph
            className={cn(
              " transition-all duration-200",
              "group-hover:font-medium  group-hover:text-primary-500 group-hover:scale-[1.05] ",
              isCurrent && " scale-[1.05] text-primary-500 font-medium",
            )}
          >
            {children}
          </Paragraph>
        </Flex>
      </Button>
    </Pressable>
  );
});

type LayoutProps =
  | { header?: ReactNode; footer?: ReactNode; value?: string; onValueChange?: never }
  | { header?: ReactNode; footer?: ReactNode; value: string; onValueChange: (prev: string) => void };

const Layout = (props: ComponentPropsWithoutRef<"div"> & LayoutProps) => {
  const {
    header,
    footer,
    className,
    children,
    value: injectValue,
    onValueChange: injectOnValueChange,
    ...rest
  } = props;
  const [_internal, _setInternal] = useDraft(injectValue ?? "");
  const value = injectValue ?? _internal;
  const onValueChange = typeof injectOnValueChange === "function" ? injectOnValueChange : _setInternal;

  return (
    <InternalContextProvider value={{ value, onValueChange }}>
      <Stack position={"relative"}>
        <Spacing className={cn(" w-[200px]")} />
        <Stack
          py={"16"}
          position={"fixed"}
          justify={"between"}
          items={"start"}
          className={cn(" h-full border-r border-gray-300 ", " w-[200px]", className)}
          {...rest}
        >
          <Stack gap={"4"} w={"100%"}>
            {header}
            <Stack px={"4"} gap={"4"}>
              {children}
            </Stack>
          </Stack>
          <Stack px={"16"}>{footer}</Stack>
        </Stack>
      </Stack>
    </InternalContextProvider>
  );
};

const [InternalContextProvider, useContextState] = createSafeContext<{
  value: string;
  onValueChange: (prev: string) => void;
}>(null);

export const Sidebar = {
  Layout,
  Item,
};
