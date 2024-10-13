"use client";
import { Pubsub } from "./pubsub";

import { Children, ReactElement, cloneElement, useEffect, useRef } from "react";
import { useIntersection } from "./use-intersection";
import { useMergedRef } from "./use-merge-ref";
import { useShallowEffect } from "./use-shallow-effect";

type LoggerOptions<T extends Record<string, any>, Q extends keyof T> = {
  useTracker: () => (context: T[Q]) => void | Promise<void>;
};

export const createLogger = <T extends Record<string, any>>(option: LoggerOptions<T, keyof T>) => {
  type Q = keyof T;
  const logPubsub = new Pubsub<"log">();

  const Tracker = () => {
    const tracker = option.useTracker();
    useEffect(() => {
      const handler = (context: T[Q]) => {
        tracker(context);
      };
      logPubsub.subscribe("log", handler);
      return () => {
        logPubsub.unsubscribe("log", handler);
      };
    }, [tracker]);
    return null;
  };

  const track = (context: T[Q]) => {
    logPubsub.publish("log", context);
  };

  const LogRoutes = (context: T[Q]) => {
    useShallowEffect(() => {
      track(context);
    }, [context]);
    return null;
  };

  const LogScreen = ({
    children,
    options,
    ...context
  }: { children: ReactElement; options?: IntersectionObserverInit } & T[Q]) => {
    const intersection = useIntersection(options);
    const child = Children.only(children);
    const tracked = useRef(false);
    useEffect(() => {
      if (intersection.entry?.isIntersecting && !tracked.current) {
        track(context as unknown as T[Q]);
        tracked.current = true;
      }
    }, [intersection, child.props, track, tracked]);

    return cloneElement(child, {
      ref: useMergedRef((child as any)?.ref ?? null, intersection.ref),
    });
  };

  const LogClick = ({ children, ...context }: { children: ReactElement } & T[Q]) => {
    const child = Children.only(children);
    return cloneElement(child, {
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        track(context as unknown as T[Q]);
        if (child.props.onClick) {
          child.props.onClick(event);
        }
      },
    });
  };

  return { track, Tracker, Screen: LogScreen, Click: LogClick, Routes: LogRoutes };
};
