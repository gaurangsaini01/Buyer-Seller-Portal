const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
const LOGIN_API = BASE_URL + "/login";
const SIGNUP_API = BASE_URL + "/signup";
const GET_PROFILE_DATA = BASE_URL + "/getprofiledata";
const UPDATE_PROFILE_DATA = BASE_URL + "/updateprofiledata";
const ADD_ITEM_API = BASE_URL + "/additem";
const GET_ALL_ITEMS_API = BASE_URL + "/getallitems";
const GET_ITEM_DATA_API = BASE_URL + "/getitemdata";
const ADD_TO_CART_API = BASE_URL + "/addtocart";
const UPDATE_CART_API = BASE_URL + "/updatecart";
const GET_CART_API = BASE_URL + "/getcart";
const DELETE_CART_API = BASE_URL + "/deletecart";
const BUY_ITEMS_API = BASE_URL + '/buyitem'
const GET_PENDING_BUY_ORDERS_API = BASE_URL + '/getpreviousbuyorders'

export {
  LOGIN_API,
  SIGNUP_API,
  GET_PROFILE_DATA,
  UPDATE_PROFILE_DATA,
  ADD_ITEM_API,
  GET_ALL_ITEMS_API,
  GET_ITEM_DATA_API,
  ADD_TO_CART_API,
  UPDATE_CART_API,
  GET_PENDING_BUY_ORDERS_API,
  GET_CART_API,
  DELETE_CART_API,
  BUY_ITEMS_API
};
