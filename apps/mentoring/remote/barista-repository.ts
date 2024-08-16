import { setDoc } from "firebase/firestore";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { BaristaType } from "../src/entities/barista/model/barista.model";
import { firestore } from "./firestore";
import { REMOTE_CONSTANT } from "./remote.constant";

class BaristaRepository {
  async getBaristaById(baristaId: string): Promise<BaristaType> {
    const docRef = doc(firestore, REMOTE_CONSTANT.BARISTA_COLLECTION_ID, baristaId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { ...data, id: docSnap.id } as BaristaType;
    }
    throw new Error("Barista not found");
  }
  async getCustomerByPhoneNumber(phoneNumber: string): Promise<BaristaType> {
    const docRef = doc(firestore, REMOTE_CONSTANT.CUSTOMER_COLLECTION_ID);
    const q = query(collection(firestore, REMOTE_CONSTANT.CUSTOMER_COLLECTION_ID), where("phone", "==", phoneNumber));
    const snapshot = await getDocs(q);
    const firstDoc = snapshot.docs[0];
    if (firstDoc) {
      return { ...firstDoc.data(), id: firstDoc.id } as BaristaType;
    }
    throw new Error("customer not found");
  }

  async createBarista(barista: Omit<BaristaType, "id">): Promise<{ id: string }> {
    const randomId = Math.random().toString(36).substring(7);
    const docRef = doc(collection(firestore, REMOTE_CONSTANT.BARISTA_COLLECTION_ID), randomId);
    await setDoc(docRef, barista);
    return { id: randomId };
  }
}

export const baristaRepository = new BaristaRepository();
