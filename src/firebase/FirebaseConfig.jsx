// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(app);
const auth = getAuth(app);

export { fireDB, auth, storage };
