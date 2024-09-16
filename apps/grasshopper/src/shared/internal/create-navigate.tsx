import { useRouter } from "next/navigation";
import { useEffect } from "react";

type CreateNavigateRouterType = {
  push: (to: string) => void;
  replace: (to: string) => void;
};

const createNavigate = (useInjectRouter: () => CreateNavigateRouterType) => {
  return function Navigate(props: { to: string; replace?: boolean }) {
    const { to, replace } = props;
    const router = useInjectRouter();

    useEffect(() => {
      if (replace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    }, [router, to, replace]);

    return null;
  };
};

export const Navigate = createNavigate(() => useRouter());
