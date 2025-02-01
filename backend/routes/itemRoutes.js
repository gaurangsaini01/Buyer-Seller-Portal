const express = require("express");
const { addItem, getAllItems,getItemData } = require("../controllers/items");
const { auth } = require("../middlewares/auth");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/additem", upload.array("file",5), auth, addItem);
router.get("/getallitems", auth, getAllItems);
router.get("/getitemdata", auth, getItemData);
module.exports = router;
