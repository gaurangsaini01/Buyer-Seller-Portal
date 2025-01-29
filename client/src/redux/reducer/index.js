import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice.js";
import cartSlice from "../slices/cartSlice.js";
const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
});
export default rootReducer;
