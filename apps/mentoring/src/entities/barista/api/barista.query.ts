import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEY } from "~/shared/query-key";
import { fetchBaristaByPhone } from "./barista.api";

export const baristaQueryOptions = (phone: string) =>
  queryOptions({
    queryKey: QUERY_KEY.BARISTA.PHONE(phone),
    queryFn: () => fetchBaristaByPhone(phone),
  });
