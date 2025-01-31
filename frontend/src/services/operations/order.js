import axios, { Axios } from "axios";
import { toast } from "react-toastify";
import {
  BUY_ITEMS_API,
  DELIVER_ORDER_API,
  GET_PENDING_BUY_ORDERS_API,
  GET_PENDING_SELL_ORDERS_API,
  GET_PREVIOUS_BOUGHT_ORDERS_API,
  GET_PREVIOUS_SOLD_ORDERS_API,
} from "../apis";
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

    return data;
  } catch (err) {
    toast.error("Error Fetching Orders", {
      autoClose: 1000,
      position: "top-center",
      theme: "dark",
    });
  }
}
async function getPendingSellingOrders(token) {
  try {
    const res = await axios.get(GET_PENDING_SELL_ORDERS_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Error Getting Data");
    }
    const data = res.data.data;

    return data;
  } catch (err) {
    toast.error("Error Fetching Orders", {
      autoClose: 1000,
      position: "top-center",
      theme: "dark",
    });
  }
}
async function deliverOrder(orderId, otp, token) {
  try {
    const res = await axios.post(
      DELIVER_ORDER_API,
      {
        otp,
        orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    if (!res.data.success) {
      throw new Error("Error Delivering Order");
    }
    const data = res.data.data;
    toast.success("Order Delivered", {
      autoClose: 1500,
      theme: "dark",
      position: "top-center",
    });
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message, {
      autoClose: 1500,
      theme: "dark",
      position: "top-center",
    });
  }
}

async function getPreviousBoughtOrders(token) {
  try {
    const res = await axios.get(GET_PREVIOUS_BOUGHT_ORDERS_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Error Delivering Order");
    }
    const data = res.data.data;
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message, {
      autoClose: 1500,
      theme: "dark",
      position: "top-center",
    });
  }
}
async function getPreviousSoldOrders(token) {
  try {
    const res = await axios.get(GET_PREVIOUS_SOLD_ORDERS_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.data.success) {
      throw new Error("Error Delivering Order");
    }
    const data = res.data.data;
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message, {
      autoClose: 1500,
      theme: "dark",
      position: "top-center",
    });
  }
}

export {
  buyItemsFromCart,
  getPendingBuyOrders,
  getPreviousBoughtOrders,
  getPendingSellingOrders,
  deliverOrder,
  getPreviousSoldOrders
};
