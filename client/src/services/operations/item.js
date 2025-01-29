import axios from "axios";
import { ADD_ITEM_API, GET_ALL_ITEMS_API } from "../apis";
import { toast } from "react-toastify";
async function addItem(formData, token) {
  try {
    const res = await axios.post(ADD_ITEM_API, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (!res.data.success) {
      throw new Error("Cannot add item");
    }
    toast.success("Item Listed", {
      autoClose: 1500,
      position: "top-center",
      theme: "dark",
    });
    return res.data.success;
  } catch (err) {}
}

async function getItemsData(token) {
  try {
    const res = await axios.get(GET_ALL_ITEMS_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Cannot get data");
    }
    const data = res.data.data;
    return data;
  } catch (err) {
    console.log(err);
    toast.error("Cannot fetch Data", {
      autoClose: 1500,
      position: "top-center",
      theme: "dark",
    });
  }
}
export { addItem, getItemsData };
