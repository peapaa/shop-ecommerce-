import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { Product } from "../components/admin/AddProductPage";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { User } from "../pages/registration/Login";

// get users information
const userString = sessionStorage.getItem("userSession");
const user: User | null = userString ? JSON.parse(userString) : null;

function MyState({ children }: { children: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [getAllProduct, setGetAllProduct] = useState<Product[]>([]);
  const [initialState, setInitialState] = useState<any[]>([]);

  // all products
  const getAllProductFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("date", "desc"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray: Product[] = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...(doc.data() as Product), id: doc.id });
        });
        setGetAllProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // all products from carts
  const getAllProductCarts = async () => {
    setLoading(true);
    try {
      const q1 = query(
        collection(fireDB, "carts"),
        where("uid", "==", user?.uid)
      );

      const allProductCarts = await getDocs(q1);
      const data = allProductCarts.docs.map((doc) => doc.data());
      console.log("data from context", data);
      if (data.length > 0) {
        setInitialState(data);
      } else {
        setInitialState([]);
      }
      setLoading(false);
    } catch (err) {
      console.log("error", err);
      setLoading(false);
    }
  };
  console.log("initialState from myState", initialState);
  // save all product to localStorage
  if (initialState) {
    localStorage.setItem("initialState", JSON.stringify(initialState));
  }

  // run function
  useEffect(() => {
    getAllProductFunction();
    getAllProductCarts();
  }, []);
  // console.log("initialState context", initialState);
  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
