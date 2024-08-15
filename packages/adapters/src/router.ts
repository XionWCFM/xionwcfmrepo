"use client";
import { useRouter } from "next/navigation";

export const useInternalRouter = () => {
  const router = useRouter();

  return {
    push: router.push,
    replace: router.replace,
    back: router.back,
    refresh: router.refresh,
    prefetch: router.prefetch,
    forward: router.forward,
  };
};
