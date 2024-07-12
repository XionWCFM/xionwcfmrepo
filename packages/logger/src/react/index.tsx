"use client";
import { type PropsWithChildren, type ReactNode, useCallback, useEffect, useRef } from "react";
import type { GetCallbackHandlerParam, LoggerReturnStructure } from "../core";

function usePreservedCallback<Callback extends (...args: any[]) => any>(callback: Callback) {
  const callbackRef = useRef<Callback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: any[]) => {
    return callbackRef.current(...args);
  }, []) as Callback;
}

type LoggerProps<T extends LoggerReturnStructure> = {
  children?: ReactNode;
  logger: T;
  handler: GetCallbackHandlerParam<T["subscribe"]>;
};

export const ReactLogger = <T extends LoggerReturnStructure>(props: LoggerProps<T>) => {
  const { children, logger, handler } = props;
  const callback = usePreservedCallback(handler);

  useEffect(() => {
    logger.subscribe(callback);

    return () => {
      logger.unsubscribe(callback);
    };
  }, [callback, logger]);

  return children;
};

export type LogEvent<T extends { subscribe: (...args: any[]) => void }> = Parameters<
  Parameters<T["subscribe"]>["0"]
>["0"];
