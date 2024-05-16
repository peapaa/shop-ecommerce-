// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyAwMnltcVp_UXPrC_VdSyVa8EksSdbB9dQ",
//   authDomain: "myshop-9c5dc.firebaseapp.com",
//   projectId: "myshop-9c5dc",
//   storageBucket: "myshop-9c5dc.appspot.com",
//   messagingSenderId: "147173673265",
//   appId: "1:147173673265:web:c1e3dd1021cda869934810",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCorS6NRPd036mRTDzQB6kHkB3bhmOfkdg",
  authDomain: "shop-new-ad561.firebaseapp.com",
  projectId: "shop-new-ad561",
  storageBucket: "shop-new-ad561.appspot.com",
  messagingSenderId: "181051908858",
  appId: "1:181051908858:web:aacf18f59f23462a7c5f43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
