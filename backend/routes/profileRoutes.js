const express = require("express");
const { getprofiledata ,updateprofiledata} = require("../controllers/profile");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/getprofiledata", auth, getprofiledata);
router.post("/updateprofiledata", auth, updateprofiledata);

module.exports = router
