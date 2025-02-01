const mongoose = require("mongoose");
const User = require("./user");
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
  },
  image: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      "Electronics",
      "Fashion",
      "Home & Kitchen",
      "Beauty & Personal Care",
      "Health",
      "Education",
      "Sports & Outdoors",
      "Toys & Games",
      "Automotive",
      "Groceries",
      "Furniture",
      "Pet Supplies",
      "Baby Products",
      "Jewelry & Accessories",
    ],
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
