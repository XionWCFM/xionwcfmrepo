import { defer, delay } from "@xionwcfm/utils/async";
import { useEffect, useState } from "react";

const withPolling = <T extends (...args: any[]) => any>(
  fn: T,
  option?: {
    interval?: number;
    retries?: number;
    shouldRetry?: (value: ReturnType<T>) => boolean;
    errorRetries?: number;
    onError?: (error: Error) => void;
    shouldErrorRetry?: (error: Error) => boolean;
    timeout?: number;
  },
) => {
  return async (...args: Parameters<T>) => {
    let retryCount = option?.retries ?? 10;
    let errorCount = option?.errorRetries ?? 10;
    const interval = option?.interval ?? 1000;
    const shouldRetry = option?.shouldRetry ?? (() => true);
    const shouldErrorRetry = option?.shouldErrorRetry ?? (() => true);
    const onError = option?.onError ?? (() => {});
    const timeoutValue = option?.timeout ?? 1000 * 60 * 10;
    const endTime = Date.now() + timeoutValue;
    const deferFn = defer(fn, interval);

    while (retryCount > 0 && errorCount > 0 && Date.now() < endTime) {
      try {
        console.log("result 앞에꺼", Date.now());
        const result = await deferFn(...args);
        console.log("result 뒤에꺼", Date.now(), result);
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
    throw new Error("재시도 횟수 초과");
  };
};

const task = async () => {
  await delay(500);
  throw new Error("error");
};

const poll = withPolling(task, { shouldRetry: () => true });

const Component = () => {
  const [render, setRender] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setRender(false);
  //   }, 3000);
  // }, []);
  return render ? <PollComponent /> : null;
};

const PollComponent = () => {
  useEffect(() => {
    console.log("is work?");
    poll();
  }, []);
  return null;
};

describe("Async를 테스트합니다.", () => {
  it("Async는", async () => {});
});
