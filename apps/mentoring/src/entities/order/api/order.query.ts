import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEY } from "~/shared/query-key";
import { fetchOrderById, fetchOrderIsComplete, fetchOrderIsReady } from "./order.api";

export const orderByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: QUERY_KEY.ORDER.ID(id),
    queryFn: () => fetchOrderById(id),
  });

export const orderIsCompletedQueryOptions = (id: string) =>
  queryOptions({
    queryKey: QUERY_KEY.ORDER.IS_COMPLETED(id),
    queryFn: () => fetchOrderIsComplete(id),
  });

export const orderIsReadyQueryOptions = (id: string) =>
  queryOptions({
    queryKey: QUERY_KEY.ORDER.IS_READY(id),
    queryFn: () => fetchOrderIsReady(id),
  });
