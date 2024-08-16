import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCNB5PKG2B-pERd6iX4GftHUrX-bR5TTFo",
  authDomain: "xionhub-5c453.firebaseapp.com",
  projectId: "xionhub-5c453",
  storageBucket: "xionhub-5c453.appspot.com",
  messagingSenderId: "471819605008",
  appId: "1:471819605008:web:ba08c1dbe897f8a7812695",
  measurementId: "G-X40B6L7TDD",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
