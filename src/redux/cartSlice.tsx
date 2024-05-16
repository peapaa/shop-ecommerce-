import { createSlice } from "@reduxjs/toolkit";

const initialState: any[] = [];
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
  },
});
export const { addToCart, deleteFromCart, incrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
