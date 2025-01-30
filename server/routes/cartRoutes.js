const express = require("express");
const router = express.Router();
const {
  addToCart,
  updateCart,
  getCart,
  deleteFromCart,
} = require("../controllers/cart.js");
const { auth } = require("../middlewares/auth.js");

router.post("/addtocart", auth, addToCart);
router.post("/updatecart", auth, updateCart);
router.get("/getcart", auth, getCart);
router.delete("/deletecart/:id", auth, deleteFromCart);

module.exports = router;
