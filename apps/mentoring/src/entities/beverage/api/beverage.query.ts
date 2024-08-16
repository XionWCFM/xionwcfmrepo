import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEY } from "~/shared/query-key";
import { fetchBeverages } from "./beverage.api";

export const beveragesQueryOptions = () =>
  queryOptions({
    queryKey: QUERY_KEY.BEVERAGE.ALL(),
    queryFn: fetchBeverages,
  });
