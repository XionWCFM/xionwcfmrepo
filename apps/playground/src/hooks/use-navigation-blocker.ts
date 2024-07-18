import { useCallback, useEffect, useState } from "react";

type ConfirmFunction = () => Promise<boolean> | boolean;

function useNavigationBlocker(getConfirmation: ConfirmFunction) {
  const [isBlocked, setIsBlocked] = useState(false);

  const handleBeforeUnload = useCallback(
    async (event: BeforeUnloadEvent) => {
      const shouldBlock = await getConfirmation();
      if (shouldBlock) {
        event.preventDefault();
        event.returnValue = "";
        setIsBlocked(true);
      } else {
        setIsBlocked(false);
      }
    },
    [getConfirmation],
  );

  const handlePopState = useCallback(async () => {
    confirm("hel");
    const shouldBlock = await getConfirmation();
    if (shouldBlock) {
      window.history.pushState(null, "", window.location.href);
      setIsBlocked(true);
    } else {
      setIsBlocked(false);
    }
  }, [getConfirmation]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handleBeforeUnload, handlePopState]);

  return isBlocked;
}

export default useNavigationBlocker;
