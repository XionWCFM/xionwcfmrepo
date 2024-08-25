import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
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
    const docRef = query(collection(firestore, REMOTE_CONSTANT.BEVERAGE_COLLECTION_ID));
    const snapshot = await getDocs(docRef);
    return snapshot.docs.map((doc) => doc.data()) as BeverageType[];
  }
}

export const beverageRepository = new BeverageRepository();
