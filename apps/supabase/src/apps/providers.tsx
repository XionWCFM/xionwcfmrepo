"use client";
import { DefaultProps, DefaultPropsProvider, ErrorBoundary, ErrorBoundaryGroup, Suspense } from "@suspensive/react";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@xionwcfm/xds/toast";
import { Provider } from "jotai";
import { OverlayProvider } from "overlay-kit";
import { PropsWithChildren, useState } from "react";
import { logger } from "./logger";

const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: 3,
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

const defaultProps = new DefaultProps({ Delay: { ms: 200 } });

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <Provider>
        <OverlayProvider>
          <DefaultPropsProvider defaultProps={defaultProps}>
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <ErrorBoundaryGroup>
                  <ErrorBoundary onReset={reset} fallback={null}>
                    <Suspense>
                      {children}
                      <Suspense>
                        <logger.Tracker />
                        <logger.Routes />
                      </Suspense>
                      <Toaster />
                    </Suspense>
                  </ErrorBoundary>
                </ErrorBoundaryGroup>
              )}
            </QueryErrorResetBoundary>
          </DefaultPropsProvider>
        </OverlayProvider>
      </Provider>
    </QueryProvider>
  );
};
