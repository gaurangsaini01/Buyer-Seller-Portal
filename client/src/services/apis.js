const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
const LOGIN_API = BASE_URL + "/login";
const SIGNUP_API = BASE_URL + "/signup";
const GET_PROFILE_DATA = BASE_URL + "/getprofiledata";
const UPDATE_PROFILE_DATA = BASE_URL + '/updateprofiledata'
const ADD_ITEM_API = BASE_URL + '/additem'
const GET_ALL_ITEMS_API = BASE_URL + '/getallitems'

export { LOGIN_API, SIGNUP_API, GET_PROFILE_DATA ,UPDATE_PROFILE_DATA ,ADD_ITEM_API ,GET_ALL_ITEMS_API};
