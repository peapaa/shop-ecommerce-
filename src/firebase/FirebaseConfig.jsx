// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAwMnltcVp_UXPrC_VdSyVa8EksSdbB9dQ",
  authDomain: "myshop-9c5dc.firebaseapp.com",
  projectId: "myshop-9c5dc",
  storageBucket: "myshop-9c5dc.appspot.com",
  messagingSenderId: "147173673265",
  appId: "1:147173673265:web:c1e3dd1021cda869934810",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
