import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setLoading] = useState(false);

  const wait = async <T>(promise: Promise<T>) => {
    setLoading(true);
    const result = await promise;
    setLoading(false);
    return result;
  };

  return [isLoading, wait] as const;
};
