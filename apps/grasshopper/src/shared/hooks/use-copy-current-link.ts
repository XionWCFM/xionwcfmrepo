import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCopyCurrentLink = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const copyClipboard = useCallback(() => {
    try {
      const url = `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      navigator.clipboard.writeText(url);
      return true;
    } catch (e) {
      return false;
    }
  }, [pathname, searchParams]);
  return { copyClipboard };
};
