const mongoose = require("mongoose");
const Item = require("./item");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      default: 18,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    about: {
      type: String,
      trim: true,
      default: "",
    },
    contactNumber: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    sellerReviews: [
      {
        reviewerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          trim: true,
        },
      },
    ],
    createdItems: [
      //  field to store IDs of items created by the user
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    dp: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
