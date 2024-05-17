import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../pages/registration/Login";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";

const initialState: any[] = [];

// cartSlice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((item: any) => item.id === action.payload.id);
      if (!item) {
        state.push({
          ...action.payload,
        });
      } else {
        item.quantity += 1;
      }
    },
    deleteFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity++;
        }
        return item;
      });
    },
    updateInitialState: (state, action) => {
      return (state = action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductCarts.pending, (state, action) => {
        console.log("getProductCarts.pendiing", action);
      })
      .addCase(getProductCarts.fulfilled, (state, action) => {
        console.log("getProductCarts.fulfilled", action);
        state.push(...action.payload);
      })
      .addCase(getProductCarts.rejected, (state, action) => {
        console.error("Error fetching product carts:", action.payload);
      });
  },
});

export const getProductCarts = createAsyncThunk(
  "cart/getCartFromFirebase",
  async () => {
    try {
      const userString = sessionStorage.getItem("userSession");
      const user: User | null = userString ? JSON.parse(userString) : null;

      if (user?.uid) {
        const q1 = query(
          collection(fireDB, "carts"),
          where("uid", "==", user.uid)
        );
        const allProductCarts = await getDocs(q1);
        const data = allProductCarts.docs.map((doc) => doc.data());
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
export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  updateInitialState,
} = cartSlice.actions;
export default cartSlice.reducer;

export const useAppDispatch: () => AppDispatch = useDispatch;
