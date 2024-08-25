import { BeverageType } from "../../beverage/model/beverage.model";

export type OrderStatus = "preparing" | "orderReception" | "making" | "ready" | "completed" | "cancelled";

export type OrderType = {
  id: string;
  customerId: string;
  status: OrderStatus;
  beverages: {
    beverageId: string;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string | null;
};

export type CompletedBeverageStatus = "ready" | "completed";

export type CompletedBeverageType = {
  status: CompletedBeverageStatus;
  orderId: string;
  beverages: BeverageType[];
};
