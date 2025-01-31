import axios from "axios";
import { GET_PROFILE_DATA, UPDATE_PROFILE_DATA } from "../apis";
import { toast } from "react-toastify";
async function getProfileData(token) {
  try {
    const res = await axios.get(GET_PROFILE_DATA, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("DATA NOT RECIEVED");
    }
    const data = res.data.data;
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    toast.error("Error getting user data", {
      theme: "dark",
      position: "top-center",
      autoClose: 1500,
    });
  }
}

async function updateProfile(data, token) {
  try {
    const res = await axios.post(UPDATE_PROFILE_DATA, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("COULDN'T UPDATE DATA");
    }
    const user = res.data.data;
    toast.success("Data updated Successfully", {
      theme: "dark",
      position: "top-center",
      autoClose: 1500,
    });
    return user;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message, {
      theme: "dark",
      position: "top-center",
      autoClose: 1500,
    });
  }
}
export { getProfileData, updateProfile };
