import { delay } from "./delay";

type PromiseF = (...args: never[]) => unknown;

export const defer = <T extends PromiseF>(fn: T, ms: number) => {
  return async (...args: Parameters<T>) => {
    const [awaitedValue] = await Promise.all([fn(...args), delay(ms)]);
    return awaitedValue as Awaited<ReturnType<T>>;
  };
};
