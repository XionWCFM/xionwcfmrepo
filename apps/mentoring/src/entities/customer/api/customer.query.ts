import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEY } from "~/shared/query-key";
import { fetchCustomerByPhone } from "./customer.api";

export const customerQueryOptions = (phone: string) =>
  queryOptions({
    queryKey: QUERY_KEY.CUSTOMER.PHONE(phone),
    queryFn: () => fetchCustomerByPhone(phone),
  });
