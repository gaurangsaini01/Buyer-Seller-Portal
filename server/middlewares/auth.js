require("dotenv").config();
var jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    const token = req.header("Authorization").split(" ")[1];

    //if token missing, then return response
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token Missing",
      });
    }
    //verify token if present
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //user me payload daldiya
      req.user = decode;
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        message: "Some Token issue",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Something Went Wrong while validating token",
    });
  }
}
module.exports = { auth };
