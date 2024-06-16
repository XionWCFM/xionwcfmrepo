"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useInternalRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const serachParams = useSearchParams();
  const href = typeof window !== "undefined" ? window?.location?.href : "";
  const hostname = typeof window !== "undefined" ? window?.location?.hostname : "";
  const protocol = typeof window !== "undefined" ? window?.location?.protocol : "";
  const host = typeof window !== "undefined" ? window?.location?.host : "";
  const slash = typeof window !== "undefined" ? "//" : "";
  const basePath = `${protocol}${slash}${host}`;
  return {
    push: (href: string, option?: { scroll?: boolean }) => router.push(href, option),
    replace: (href: string, option?: { scroll?: boolean }) => router.replace(href, option),
    back: () => router.back(),
    refresh: () => router.refresh(),
    prefetch: (href: string) => router.prefetch(href),
    pathname: pathname,
    searchParams: serachParams ? serachParams.toString() : "",
    get: (qs: string) => (serachParams ? serachParams.get(qs) : ""),
    href: href,
    hostname: hostname,
    protocol: protocol,
    host: host,
    basePath: basePath,
  };
};
