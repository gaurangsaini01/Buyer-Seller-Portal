import axios from "axios";
import { toast } from "react-toastify";
import { BUY_ITEMS_API, GET_PENDING_BUY_ORDERS_API } from "../apis";
import { add } from "../../redux/slices/cartSlice";

async function buyItemsFromCart(cartItems, token, dispatch) {
  try {
    if (cartItems.length == 0) {
      toast.error("Cart Empty !", {
        theme: "dark",
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    const res = await axios.post(
      BUY_ITEMS_API,
      {
        cartItems,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.data.success) {
      throw new Error("Error Placing Order");
    }
    dispatch(add([]));
    toast.success("Order Placed Successfully", {
      theme: "dark",
      autoClose: 1500,
      position: "top-center",
    });
    return res;
  } catch (err) {
    console.log(err);
    toast.error(err.response.data.message, {
      autoClose: 1500,
      position: "top-center",
      theme: "dark",
    });
  }
}

async function getPendingBuyOrders(token) {
  try {
    const res = await axios.get(GET_PENDING_BUY_ORDERS_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Error Getting Data");
    }
    const data = res.data.data;
    // toast.success("Pending Order Fetched", {
    //   autoClose: 1000,
    //   position: "top-center",
    //   theme: "dark",
    // });
    return data;
  } catch (err) {}
}
export { buyItemsFromCart, getPendingBuyOrders };
