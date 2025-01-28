import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice.js";
const rootReducer = combineReducers({
  auth: authSlice,
});
export default rootReducer;
