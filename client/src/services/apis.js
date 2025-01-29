const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
const LOGIN_API = BASE_URL + "/login";
const SIGNUP_API = BASE_URL + "/signup";
const GET_PROFILE_DATA = BASE_URL + "/getprofiledata";
const UPDATE_PROFILE_DATA = BASE_URL + '/updateprofiledata'

export { LOGIN_API, SIGNUP_API, GET_PROFILE_DATA ,UPDATE_PROFILE_DATA};
