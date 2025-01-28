import axios from "axios";
import { setToken, setUser } from "../../redux/slices/authSlice.js";
import { toast } from "react-toastify";
import { LOGIN_API, SIGNUP_API } from "../apis.js";
async function operationLogin(data, navigate, dispatch) {
  try {
    const res = await axios.post(LOGIN_API, data);

    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    dispatch(setToken(res.data.token));
    dispatch(setUser(res.data.user));
    toast.success("Logged In !", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/dashboard");
    return;
  } catch (err) {
    toast.error(err.response.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
}
async function operationSignup(data, navigate) {
  try {
    console.log(data);
    const res = await axios.post(SIGNUP_API, data);
    console.log(res);
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    toast.success("Signup success, login please !", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/");
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message, {
      position: "top-center",
      autoClose: 1500,
      theme: "dark",
    });
  }
}

export { operationLogin, operationSignup };
