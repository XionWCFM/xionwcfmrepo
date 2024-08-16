import { http } from "~/shared/http";
import { BaristaType } from "../model/barista.model";

export const fetchSignUpBarista = async (barista: Omit<BaristaType, "id">) => {
  return http.post<Omit<BaristaType, "id">, { id: string }>("/api/barista", barista);
};

export const fetchBaristaByPhone = async (phone: string) => {
  return http.get<BaristaType>(`/api/barista?phone=${phone}`);
};
