import { setDoc } from "firebase/firestore";
import { collection, doc, getDoc } from "firebase/firestore/lite";
import { BaristaType } from "../src/entities/barista/model/barista.model";
import { CustomerType } from "../src/entities/customer/model/customer.model";
import { firestore } from "./firestore";
import { REMOTE_CONSTANT } from "./remote.constant";

class CustomerRepository {
  async getCustomerById(customerId: string): Promise<CustomerType> {
    const docRef = doc(firestore, REMOTE_CONSTANT.CUSTOMER_COLLECTION_ID, customerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { ...data, id: docSnap.id } as CustomerType;
    }
    throw new Error("Barista not found");
  }
  async createBarista(customer: Omit<CustomerType, "id">): Promise<{ id: string }> {
    const randomId = Math.random().toString(36).substring(7);
    const docRef = doc(collection(firestore, REMOTE_CONSTANT.CUSTOMER_COLLECTION_ID), randomId);
    await setDoc(docRef, customer);
    return { id: randomId };
  }
}

export const customerRepository = new CustomerRepository();
