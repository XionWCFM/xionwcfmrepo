import { http } from "~/shared/http";
import { BeverageType } from "../model/beverage.model";

export const fetchBeverages = async () => {
  return http.get<BeverageType[]>("/api/beverage");
};
