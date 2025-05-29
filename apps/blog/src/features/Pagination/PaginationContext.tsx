"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext, useMemo } from "react";

export const PAGINATION_SEARCH_PARAMS_KEY = "page";

const PaginationContext = createContext<{
  page: number;
  onPageChange: (page: number) => void;
} | null>(null);

const parsePaginationSearchParams = (value: string | null) => {
  if (value === null) {
    return 1;
  }
  const numberValue = Number.parseInt(value);
  if (Number.isNaN(numberValue)) {
    return 1;
  }
  return numberValue;
};

export const PaginationProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const page = parsePaginationSearchParams(searchParams.get(PAGINATION_SEARCH_PARAMS_KEY));
  const router = useRouter();

  const onPageChange = useCallback(
    (page: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(PAGINATION_SEARCH_PARAMS_KEY, page.toString());
      router.push(`?${newSearchParams.toString()}`);
    },
    [router, searchParams],
  );

  const value = useMemo(() => ({ page, onPageChange }), [page, onPageChange]);
  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>;
};

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};
