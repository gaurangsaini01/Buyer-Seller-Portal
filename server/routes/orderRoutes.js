const express = require("express");
const { buyItem } = require("../controllers/order");
const router = express.Router();
const { auth } = require("../middlewares/auth");

router.post("/buyitem", auth, buyItem);

module.exports = router;
