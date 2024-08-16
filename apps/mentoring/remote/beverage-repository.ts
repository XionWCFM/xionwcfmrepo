import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { BeverageType } from "../src/entities/beverage/model/beverage.model";
import { firestore } from "./firestore";
import { REMOTE_CONSTANT } from "./remote.constant";

class BeverageRepository {
  async getBeverageById(BeverageId: string): Promise<BeverageType> {
    const docRef = doc(firestore, REMOTE_CONSTANT.BEVERAGE_COLLECTION_ID, BeverageId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { ...data, id: docSnap.id } as BeverageType;
    }
    throw new Error("Beverage not found");
  }

  async getBeverages(): Promise<BeverageType[]> {
    const docRef = collection(firestore, REMOTE_CONSTANT.BEVERAGE_COLLECTION_ID);
    const docSnap = await getDocs(docRef);
    const beverages = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return beverages as BeverageType[];
  }
}

export const beverageRepository = new BeverageRepository();
