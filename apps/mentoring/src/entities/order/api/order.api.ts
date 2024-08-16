import { http } from "~/shared/http";
import { OrderType } from "../model/order.model";

export const fetchCreateOrder = async (order: Partial<Omit<OrderType, "id">>) => {
  return http.post<Partial<Omit<OrderType, "id">>, { id: string }>("/api/order", order);
};

export const fetchUpdateOrder = async (order: Partial<OrderType> & { id: string }) => {
  return http.put<Partial<OrderType> & { id: string }, { id: string }>(`/api/order?id=${order.id}`, order);
};

export const fetchOrderById = async (id: string) => {
  return http.get<OrderType>(`/api/order?id=${id}`);
};
