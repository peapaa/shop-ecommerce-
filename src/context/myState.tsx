import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { Product } from "../components/admin/AddProductPage";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

export interface UserDetail {
  name: string;
  email: string;
  uid: string;
  role: string;
  time: Date;
  date: string;
  avatar: string;
  active: string;
}
function MyState({ children }: { children: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [getAllProduct, setGetAllProduct] = useState<Product[]>([]);
  const [getAllOrder, setGetAllOrder] = useState<any[]>([]);
  const [getAllUser, setGetAllUser] = useState<UserDetail[]>([]);

  console.log("getAllProduct 23/05", getAllProduct);
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

  // get all orders
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

  // get all user
  const getAllUserFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "user"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray: any = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data() });
        });
        setGetAllUser(userArray);
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
      await getAllUserFunction();
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
        getAllOrderFunction,
        getAllUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
