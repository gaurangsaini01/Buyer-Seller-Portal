const mongoose = require("mongoose");
const User = require("./user");
const Item = require("./item");

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Who placed the order
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Who is selling
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  }, // What item is being bought
  amount: { type: Number, required: true },
  otp: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  }, // Order status
});

module.exports = mongoose.model("Order", orderSchema);
