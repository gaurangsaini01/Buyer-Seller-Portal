const express = require("express");
const { buyItem ,getPreviousBuyOrders,getPendingSellOrders,deliverOrder,getPreviousBoughtOrders,getPreviousSoldOrders} = require("../controllers/order");
const router = express.Router();
const { auth } = require("../middlewares/auth");

router.post("/buyitem", auth, buyItem);
router.get("/getpreviousbuyorders", auth, getPreviousBuyOrders);
router.get("/getpendingsellorders", auth, getPendingSellOrders);
router.post("/deliverorder", auth, deliverOrder);
router.get("/getpreviousboughtorders", auth, getPreviousBoughtOrders);
router.get("/getprevioussoldorders", auth, getPreviousSoldOrders);


module.exports = router;
