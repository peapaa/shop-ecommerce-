import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { Product } from "../components/admin/AddProductPage";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

function MyState({ children }: { children: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [getAllProduct, setGetAllProduct] = useState<Product[]>([]);

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

  // run function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllProductFunction();
      setLoading(false);
    };

    fetchData();
  }, []);

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
