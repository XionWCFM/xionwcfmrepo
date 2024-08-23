import { DefaultError, QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const usePollingQuery = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  pollingOptions?: {
    interval?: number;
    errorRetries?: number;
    pollRetries?: number;
    timeout?: number;
    shouldRetry?: (value: Awaited<TData>) => boolean;
  },
) => {
  const [pollCount, setPollCount] = useState(0);
  const [shouldRetry, setShouldRetry] = useState(true);

  const data = useQuery({
    ...options,
    queryFn: async () => {
      setPollCount((prev) => prev + 1);
      //@ts-ignore
      return options.queryFn();
    },
    refetchInterval: pollingOptions?.interval ?? 1000,
    enabled: shouldRetry && pollCount < (pollingOptions?.pollRetries ?? 10),
  });

  useEffect(() => {
    if (data.data !== undefined) {
      //@ts-ignore
      const result = pollingOptions?.shouldRetry?.(data.data);
      if (result === true) {
        setShouldRetry(false);
      }
    }
  }, [data]);
  return data;
};
