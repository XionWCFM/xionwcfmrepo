import { defer } from "@xionwcfm/utils/async";
import { useCallback, useEffect, useRef } from "react";

const DEFAULT_POLLING_INTERVAL = 1_000;
const DEFAULT_POLLING_ERROR_RETRIES = 10;
const DEFAULT_POLLING_RETRIES = 10;
const DEFAULT_POLLING_TIMEOUT = 1000 * 10 * 60;
const DEFAULT_POLLING_SHOULD_RETRY = () => true;
const DEFAULT_POLLING_SHOULD_ERROR_RETRY = () => true;
const DEFAULT_POLLING_ON_ERROR = () => {};

type GenericFunction = (...args: any[]) => any;

type PollingOptionType<T extends GenericFunction> = {
  interval?: number;
  retries?: number;
  shouldRetry?: (value: Awaited<ReturnType<T>>) => boolean;
  errorRetries?: number;
  onError?: (error: Error) => void;
  shouldErrorRetry?: (error: Error) => boolean;
  timeout?: number;
  signal?: AbortSignal;
};

const withPolling = <T extends GenericFunction>(fn: T, option?: PollingOptionType<T>) => {
  return async (...args: Parameters<T>) => {
    let retryCount = option?.retries ?? DEFAULT_POLLING_RETRIES;
    let errorCount = option?.errorRetries ?? DEFAULT_POLLING_ERROR_RETRIES;
    const interval = option?.interval ?? DEFAULT_POLLING_INTERVAL;
    const shouldRetry = option?.shouldRetry ?? DEFAULT_POLLING_SHOULD_RETRY;
    const shouldErrorRetry = option?.shouldErrorRetry ?? DEFAULT_POLLING_SHOULD_ERROR_RETRY;
    const onError = option?.onError ?? DEFAULT_POLLING_ON_ERROR;
    const timeoutValue = option?.timeout ?? DEFAULT_POLLING_TIMEOUT;

    const endTime = Date.now() + timeoutValue;
    const deferFn = defer(fn, interval);

    while (retryCount > 0 && errorCount > 0 && Date.now() < endTime) {
      try {
        if (option?.signal?.aborted) {
          break;
        }

        const result = await deferFn(...args);
        if (shouldRetry(result)) {
          retryCount -= 1;
          continue;
        }
        return result;
      } catch (e) {
        errorCount -= 1;
        onError(e as Error);
        const isRetry = shouldErrorRetry(e as Error);
        if (!isRetry) {
          throw e;
        }
      }
    }
    if (option?.signal?.aborted) {
      throw new Error("요청이 취소되었습니다.");
    }
    throw new Error("재시도 횟수 초과");
  };
};

export const usePolling = <T extends (...args: any[]) => any>(fn: T, option?: PollingOptionType<T>) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const startPolling = useCallback(
    async (...arg: Parameters<T>) => {
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const poll = withPolling(fn, { ...option, signal: controller.signal });
      return await poll(...arg);
    },
    [fn, option],
  );

  const stopPolling = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // 언마운트 시 폴링 중단
      }
    };
  }, []);
  return [startPolling, stopPolling] as const;
};
