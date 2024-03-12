// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  arrayUnion,
  doc,
  getFirestore,
  runTransaction,
} from "firebase/firestore";
import Product from "../models/Product";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpzazCyQ_Rda3-dqkYhcTwzZoUhvr4Rvo",
  authDomain: "casa-avenida.firebaseapp.com",
  projectId: "casa-avenida",
  storageBucket: "casa-avenida.appspot.com",
  messagingSenderId: "486024544296",
  appId: "1:486024544296:web:ef7b8ca2bce5a4b0c3751d",
  measurementId: "G-Q54GWNH5HD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addProductsToStock = async (newProducts: Product[]) => {
  const docRef = doc(db, "stock", "5IA3rZKyrYdQIS1dU1m4");
  let produ: Product[] = [];
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw "Document doesn't exist";
      }
      produ = sfDoc.data().products;
      console.log(produ);
      newProducts.forEach((newProduct) => {
        const find = produ.find(
          (produ) => produ.description === newProduct.description
        );
        if (find) {
          find.amount += Number(newProduct.amount);
          transaction.update(docRef, {
            products: produ,
          });
        } else {
          transaction.update(docRef, {
            products: arrayUnion(newProduct),
          });
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
};
