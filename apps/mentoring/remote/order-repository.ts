import { omit } from "@xionwcfm/utils/object";
import { getDocs, setDoc } from "firebase/firestore";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { OrderType } from "../src/entities/order/model/order.model";
import { firestore } from "./firestore";
import { REMOTE_CONSTANT } from "./remote.constant";

class OrderRepository {
  async getOrderById(orderId: string): Promise<OrderType> {
    const docRef = doc(firestore, REMOTE_CONSTANT.ORDER_COLLECTION_ID, orderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { ...data, id: docSnap.id } as OrderType;
    }
    throw new Error("Barista not found");
  }
  async getOrders(): Promise<OrderType[]> {
    const docRef = collection(firestore, REMOTE_CONSTANT.ORDER_COLLECTION_ID);
    const snapshot = await getDocs(docRef);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data, id: doc.id } as OrderType;
    });
  }
  async createOrder(order: Omit<OrderType, "id">): Promise<{ id: string }> {
    const randomId = Math.random().toString(36).substring(7);
    const docRef = doc(collection(firestore, REMOTE_CONSTANT.ORDER_COLLECTION_ID), randomId);
    await setDoc(docRef, order);
    return { id: randomId };
  }
  async updateOrder(orderId: string, order: Partial<OrderType>) {
    const docRef = doc(firestore, REMOTE_CONSTANT.ORDER_COLLECTION_ID, orderId);
    const omittedValue = omit(order, ["id"]);
    await updateDoc(docRef, omittedValue);
  }
}

export const orderRepository = new OrderRepository();
