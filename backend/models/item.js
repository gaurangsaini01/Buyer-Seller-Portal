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
      "Home",
      "Beauty",
      "Health",
      "Education",
      "Sports",
      "Toys",
      "Automotive",
      "Groceries",
      "Furniture",
      "Jewelry",
    ],
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
