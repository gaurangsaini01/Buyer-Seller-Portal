const Order = require("../models/order.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
async function buyItem(req, res) {
  try {
    const userId = req.user.id; // buyer
    const cartItems = req.body.cartItems;
    // const totalPrice = req.body.totalPrice;
    // console.log(userId, cartItems, totalPrice);

    for (const item of cartItems) {
      const exists = await Order.findOne({ buyerId: userId, itemId: item._id });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Cart contains previously bought items",
        });
      }

      const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
      //   const hashedOTP = await bcrypt.hash(otp, 10);

      await Order.create({
        buyerId: userId,
        sellerId: item.sellerId,
        itemId: item._id,
        amount: item.price,
        otp,
      });
    }

    const user = await User.findById(userId);
    user.cart = [];
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Order Placed Successfully !",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error buying item",
    });
  }
}
async function getPreviousBuyOrders(req, res) {
  try {
    const userId = req.user.id;
    const orders = await Order.find({
      buyerId: userId,
      status: "Pending",
    }).populate("buyerId sellerId itemId");
    if (!orders) {
      return res.status(400).json({
        success: false,
        message: "No Pending order Present",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Backend Errors Getting items",
    });
  }
}
async function getPendingSellOrders(req, res) {
  try {
    const userId = req.user.id;
    const response = await Order.find({
      sellerId: userId,
      status: "Pending",
    }).populate("buyerId sellerId itemId");
    if (!res) {
      return res.status(200).json({
        success: false,
        message: "No pending sell order",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Pending Sell orders Fetched Successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Backend Errors Getting items",
    });
  }
}
async function deliverOrder(req, res) {
  try {
    const userId = req.user.id;
    const otp = req.body.otp;
    const { orderId } = req.body;
    console.log(typeof otp, typeof orderId);

    const order = await Order.findOneAndUpdate(
      { _id: orderId, otp },
      {
        status: "Completed",
      },
      { new: true }
    );
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Wrong OTP",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Delivered order",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Backend Error Delivering items",
    });
  }
}
async function getPreviousBoughtOrders(req, res) {
  try {
    const userId = req.user.id;
    const orders = await Order.find({
      buyerId: userId,
      status: "Completed",
    }).populate("buyerId sellerId itemId");
    if (!orders) {
      return res.status(400).json({
        success: false,
        message: "No orders",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched Bought Orders",
      data: orders,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Backend Error Delivering items",
    });
  }
}
async function getPreviousSoldOrders(req, res) {
  try {
    const userId = req.user.id;
    const orders = await Order.find({
      sellerId: userId,
      status: "Completed",
    }).populate("buyerId sellerId itemId");
    if (!orders) {
      return res.status(400).json({
        success: false,
        message: "No orders",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched Bought Orders",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Backend Error Delivering items",
    });
  }
}

module.exports = {
  buyItem,
  getPreviousBuyOrders,
  getPendingSellOrders,
  deliverOrder,
  getPreviousBoughtOrders,
  getPreviousSoldOrders,
};
