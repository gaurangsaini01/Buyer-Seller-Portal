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

      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP
      const hashedOTP = await bcrypt.hash(otp, 10);

      await Order.create({
        buyerId: userId,
        sellerId: item.sellerId,
        itemId: item._id,
        amount: item.price,
        otp: hashedOTP,
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

module.exports = { buyItem };
