const User = require("../models/user");

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const itemId = req.body.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { cart: itemId } },
      { new: true }
    ).populate("cart");
    return res.status(200).json({
      success: true,
      message: "Added to Cart",
      data: user.cart, 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Backend Error in Adding to Cart",
    });
  }
}
async function deleteFromCart(req, res) {
  try {
  } catch (error) {}
}
async function updateCart(req, res) {
  try {
  } catch (error) {}
}
async function getCart(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("cart");
    const cart = user.cart;
    console.log(user);
    return res.status(200).json({
      success: true,
      message: "Cart Fetched Successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cart Fetched failed from server",
    });
  }
}

module.exports = { addToCart, deleteFromCart, updateCart, getCart };
