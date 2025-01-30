const express = require("express");
const { buyItem ,getPreviousBuyOrders} = require("../controllers/order");
const router = express.Router();
const { auth } = require("../middlewares/auth");

router.post("/buyitem", auth, buyItem);
router.get("/getpreviousbuyorders", auth, getPreviousBuyOrders);


module.exports = router;
