import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
  total: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.cart = action.payload;
      state.totalPrice=0;
      action.payload.forEach((item) => (state.totalPrice += item.price));
      state.total = action.payload.length;
    },
  },
});

export const { add } = cartSlice.actions;
export default cartSlice.reducer;
