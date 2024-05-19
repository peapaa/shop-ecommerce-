import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { Product } from "../components/admin/AddProductPage";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

function MyState({ children }: { children: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [getAllProduct, setGetAllProduct] = useState<Product[]>([]);
  const [getAllOrder, setGetAllOrder] = useState<any[]>([]);

  console.log("getAllOrder", getAllOrder);
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
    setLoading(false);
  };

  const getAllOrderFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "order"), orderBy("date", "desc"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray: any = [];
        QuerySnapshot.forEach((doc) => {
          orderArray.push({ ...doc.data() });
        });
        setGetAllOrder(orderArray);
        setLoading(false);
      });
      return () => data;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };
  // run function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllProductFunction();
      await getAllOrderFunction();
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
        getAllOrder,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
