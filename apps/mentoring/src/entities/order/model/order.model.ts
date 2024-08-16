import { BeverageType } from "../../beverage/model/beverage.model";

export type OrderStatus = "receipt" | "preparing" | "ready" | "completed" | "cancelled";

export type OrderType = {
  id: string;
  customerId: string;
  status: OrderStatus;
  beverages: {
    beverageId: string;
    quantity: number;
  }[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type CompletedBeverageStatus = "ready" | "completed";

export type CompletedBeverageType = {
  status: CompletedBeverageStatus;
  orderId: string;
  beverages: BeverageType[];
};
