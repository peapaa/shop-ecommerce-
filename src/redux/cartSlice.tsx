import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../pages/registration/Login";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { message } from "antd";

export interface ProductCart {
  title: string;
  price: string;
  productImageUrl: string;
  category: string;
  description: string;
  quantity: number;
  totalQuantity: number;
  date: string;
  id?: string;
  uid?: string;
}

const initialState: ProductCart[] = [];

// cartSlice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action: PayloadAction<ProductCart>) => {
    //   const item = state.find((item) => item.id === action.payload.id);
    //   if (!item) {
    //     state.push(action.payload);
    //   } else {
    //     item.quantity += 1;
    //   }
    // },
    // deleteFromCart: (state, action: PayloadAction<{ id: string }>) => {
    //   return state.filter((item) => item.id !== action.payload.id);
    // },
    // incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
    //   const item = state.find((item) => item.id === action.payload.id);
    //   if (item) {
    //     item.quantity++;
    //   }
    // },
    // updateInitialState: (state, action: PayloadAction<ProductCart[]>) => {
    //   return action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductCarts.pending, (state, action) => {
        console.log("getProductCarts.pending", action);
      })
      .addCase(
        getProductCarts.fulfilled,
        (state, action: PayloadAction<ProductCart[]>) => {
          console.log("getProductCarts.fulfilled", action);
          return action.payload;
        }
      )
      .addCase(getProductCarts.rejected, (state, action) => {
        console.error("Error fetching product carts:", action.payload);
      })

      .addCase(addProductToCarts.pending, (state, action) => {
        console.log("addProductToCarts.pending", action);
      })
      .addCase(
        addProductToCarts.fulfilled,
        (state, action: PayloadAction<ProductCart | null>) => {
          if (action.payload) {
            const item = state.find((item) => item.id === action.payload?.id);
            if (!item) {
              state.push(action.payload);
            } else {
              item.quantity += 1;
            }
          }
          console.log("addProductToCarts.fulfilled", action);
        }
      )
      .addCase(addProductToCarts.rejected, (state, action) => {
        console.error("add product cart fail:", action.payload);
      })

      .addCase(
        incrementQuantity.fulfilled,
        (state, action: PayloadAction<ProductCart | null>) => {
          if (action.payload) {
            const item = state.find((item) => item.id === action.payload?.id);
            if (item) {
              item.quantity += 1;
            }
          }
        }
      )
      .addCase(incrementQuantity.rejected, (state, action) => {
        console.error("add product cart fail:", action.payload);
      })

      .addCase(
        decreaseQuantity.fulfilled,
        (state, action: PayloadAction<ProductCart | null>) => {
          if (action.payload) {
            const item = state.find((item) => item.id === action.payload?.id);
            if (item && item.quantity > 1) {
              item.quantity -= 1;
            }
          }
        }
      )
      .addCase(decreaseQuantity.rejected, (state, action) => {
        console.error("decrease quantity for cart fail:", action.payload);
      })

      .addCase(
        deleteProductFromCart.fulfilled,
        (state, action: PayloadAction<ProductCart | null>) => {
          if (action.payload) {
            const item = state.filter((item) => item.id !== action.payload?.id);
            return item;
          }
        }
      )
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        console.error("delete product from cart failed:", action.payload);
      });
  },
});

export const getProductCarts = createAsyncThunk<ProductCart[], void>(
  "cart/getCartFromFirebase",
  async () => {
    try {
      const userString = sessionStorage.getItem("userSession");
      const user: User | null = userString ? JSON.parse(userString) : null;

      if (user) {
        const q1 = query(
          collection(fireDB, "carts"),
          where("uid", "==", user.uid)
        );
        const allProductCarts = await getDocs(q1);
        const data = allProductCarts.docs.map(
          (doc) => doc.data() as ProductCart
        );
        console.log("data from context", data);
        return data;
      } else {
        console.error("User UID is undefined");
        return [];
      }
    } catch (err) {
      console.error("Error fetching product carts:", err);
      return [];
    }
  }
);

export const addProductToCarts = createAsyncThunk<
  ProductCart | null,
  ProductCart
>("cart/addProductToCarts", async (item: ProductCart) => {
  try {
    const userString = sessionStorage.getItem("userSession");
    const user: User | null = userString ? JSON.parse(userString) : null;
    if (user) {
      const q = query(
        collection(fireDB, "carts"),
        where("id", "==", item.id),
        where("uid", "==", user.uid)
      );
      const productCarts = await getDocs(q);
      console.log("productCarts", productCarts);
      if (productCarts.empty) {
        console.log("add new product");
        await addDoc(collection(fireDB, "carts"), { ...item, uid: user.uid });
        message.success("Added to cart successfully");
        return { ...item, uid: user.uid };
      } else {
        let updatedItem: ProductCart | null = null;
        productCarts.forEach((doc) => {
          const updatedData = {
            ...doc.data(),
            quantity: doc.data().quantity + 1,
          };
          setDoc(doc.ref, updatedData);
          updatedItem = updatedData as ProductCart;
        });
        message.success("Added to cart successfully");
        return updatedItem;
      }
    }
    return null;
  } catch (err) {
    console.error("Error adding to cart:", err);
    message.error("add cart failed");
    throw err;
  }
});

export const incrementQuantity = createAsyncThunk<
  ProductCart | null,
  ProductCart
>("cart/incrementQuantity", async (item: ProductCart) => {
  try {
    const userString = sessionStorage.getItem("userSession");
    const user: User | null = userString ? JSON.parse(userString) : null;
    if (user) {
      const q = query(
        collection(fireDB, "carts"),
        where("id", "==", item.id),
        where("uid", "==", user.uid)
      );
      const productCarts = await getDocs(q);
      console.log("productCarts", productCarts);

      let updatedItem: ProductCart | null = null;
      productCarts.forEach((doc) => {
        const updatedData = {
          ...doc.data(),
          quantity: doc.data().quantity + 1,
        };
        setDoc(doc.ref, updatedData);
        updatedItem = updatedData as ProductCart;
      });
      message.success("increase to cart successfully");
      return updatedItem;
    }
    return null;
  } catch (err) {
    console.error("Error increase to cart:", err);
    message.error("increase cart failed");
    throw err;
  }
});

export const decreaseQuantity = createAsyncThunk<
  ProductCart | null,
  ProductCart
>("cart/decreaseQuantity", async (item: ProductCart) => {
  try {
    const userString = sessionStorage.getItem("userSession");
    const user: User | null = userString ? JSON.parse(userString) : null;
    if (user) {
      const q = query(
        collection(fireDB, "carts"),
        where("id", "==", item.id),
        where("uid", "==", user.uid)
      );
      const productCarts = await getDocs(q);
      console.log("productCarts", productCarts);

      let updatedItem: ProductCart | null = null;
      productCarts.forEach((doc) => {
        if (doc.data().quantity > 1) {
          const updatedData = {
            ...doc.data(),
            quantity: doc.data().quantity - 1,
          };
          setDoc(doc.ref, updatedData);
          updatedItem = updatedData as ProductCart;
          message.success("decrease to cart successfully");
        }
      });
      return updatedItem;
    }
    return null;
  } catch (err) {
    console.error("Error decrease to cart:", err);
    message.error("decrease cart failed");
    throw err;
  }
});

export const deleteProductFromCart = createAsyncThunk<
  ProductCart | null,
  ProductCart
>("cart/deleteProductFromCart", async (item: ProductCart) => {
  try {
    const userString = sessionStorage.getItem("userSession");
    const user: User | null = userString ? JSON.parse(userString) : null;
    if (user) {
      const q = query(
        collection(fireDB, "carts"),
        where("id", "==", item.id),
        where("uid", "==", user.uid)
      );
      const productCarts = await getDocs(q);
      console.log("productCarts", productCarts);

      let updatedItem: ProductCart | null = null;
      productCarts.forEach((doc) => {
        if (doc.data()) {
          const updatedData = doc.data();
          deleteDoc(doc.ref);
          updatedItem = updatedData as ProductCart;
          // message.success("delete to cart successfully");
        }
      });
      return updatedItem;
    }
    return null;
  } catch (err) {
    console.error("Error decrease to cart:", err);
    message.error("decrease cart failed");
    throw err;
  }
});

// export const {
//   // addToCart,
//   // incrementQuantity,
//   // updateInitialState,
//   // deleteFromCart,
// } = cartSlice.actions;

export default cartSlice.reducer;

export const useAppDispatch: () => AppDispatch = useDispatch;
