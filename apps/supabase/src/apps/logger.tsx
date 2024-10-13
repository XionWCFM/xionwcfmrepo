"use client";

import { createLogger } from "@xionwcfm/logger";
import { usePathname, useSearchParams } from "next/navigation";
import { ComponentProps, useEffect, useRef } from "react";

const serviceName = "@yeonpick";
const environment = process.env.NODE_ENV;

const _logger = createLogger<{
  page: {
    type: "page";
    eventName: string;
    pathname: string;
    context?: Record<string, any>;
    previous: string;
    query: string;
  };
  click: { type: "click"; eventName: string; context?: Record<string, any> };
  screen: { type: "screen"; eventName: string; context?: Record<string, any> };
}>({
  useTracker: () => {
    const pathname = usePathname();
    return (context) => {
      console.log("logworking", { pathname, serviceName, environment, ...context });
    };
  },
});

function usePrevious<T>(value: T, { defaultValue }: { defaultValue?: T } = {}): T {
  const ref = useRef<T>(defaultValue != null ? defaultValue : value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const logger = {
  ..._logger,
  click: (context: Omit<Parameters<typeof _logger.track>[0], "type">) => {
    return _logger.track({ type: "click", ...context });
  },
  screen: (context: Omit<Parameters<typeof _logger.track>[0], "type">) => {
    return _logger.track({ type: "screen", ...context });
  },
  Click: function Click(props: Omit<ComponentProps<typeof _logger.Click>, "type">) {
    return <_logger.Click type="click" {...props} />;
  },
  Screen: function Screen(props: Omit<ComponentProps<typeof _logger.Screen>, "type">) {
    return <_logger.Screen type="screen" {...props} />;
  },
  Routes: function Routes() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const previous = usePrevious(pathname, { defaultValue: "/" });
    const eventName = `page${pathname}`;
    return (
      <_logger.Routes
        type="page"
        eventName={eventName}
        pathname={pathname}
        query={searchParams.toString()}
        previous={previous}
      />
    );
  },
};
