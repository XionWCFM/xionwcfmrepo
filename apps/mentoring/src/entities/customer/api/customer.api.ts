import { http } from "~/shared/http";
import { CustomerType } from "../model/customer.model";

export const fetchSignUpCustomer = async (customer: Omit<CustomerType, "id">) => {
  return http.post<Omit<CustomerType, "id">, { id: string }>("/api/customer", customer);
};

export const fetchCustomerByPhone = async (phone: string) => {
  return http.get<CustomerType>(`/api/customer?phone=${phone}`);
};
