import { createSlice } from "@reduxjs/toolkit";
import { User } from "../pages/registration/Login";

// get user from sessionStorage
const userString = sessionStorage.getItem("userSession");
const user: User | null = userString ? JSON.parse(userString) : null;
console.log("user from state", user);

// get initialState from localStorage
let initialState: any[] = [];
const initialStateString = localStorage.getItem("initialState");
initialState = initialStateString ? JSON.parse(initialStateString) : [];
console.log("initialState from cartSlice", initialState);

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
      return action.payload;
    },
  },
});
export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  updateInitialState,
} = cartSlice.actions;
export default cartSlice.reducer;
