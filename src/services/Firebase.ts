// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
