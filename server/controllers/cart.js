const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const Item = require("../models/item");

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const itemId = req.body.id;
    const user = await User.findById(userId).populate("cart");
    const item = await Item.findById(itemId);
    if (item.sellerId.toString() === user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot buy your own item",
      });
    }

    const isPresent = user.cart.some((item) => item._id.toString() == itemId);
    if (isPresent) {
      return res.status(400).json({
        success: false,
        message: "Item already in cart",
      });
    }
    user.cart.push(new mongoose.Types.ObjectId(itemId));
    await user.save();

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
    const userId = req.user.id;
    const itemId = req.params.id;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { cart: itemId },
      },
      { new: true }
    ).populate("cart");
    const cart = user.cart;
    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Backend Error in Deleting from Cart",
    });
  }
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
