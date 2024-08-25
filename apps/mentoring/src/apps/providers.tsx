"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import { OverlayProvider } from "overlay-kit";
import { PropsWithChildren } from "react";
import { useState } from "react";
const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            staleTime: 60 * 1000,
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

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <Provider>
        <OverlayProvider>{children}</OverlayProvider>
      </Provider>
    </QueryProvider>
  );
};
