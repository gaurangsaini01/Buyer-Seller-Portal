const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
var jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    //data fetch from req body
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    //validate data
    if (
      !firstName ||
      !email ||
      !password ||
      !confirmPassword ||
      !lastName ||
      firstName.trim() == "" ||
      lastName.trim() == ""
    ) {
      return res.status(403).json({
        success: false,
        message: "Field Missing",
      });
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Name Format",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@iiit\.(com|in|ac)$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Only IIIT mails allowed",
      });
    }

    const passwordRegex1 = /^.{6,}$/;
    if (!passwordRegex1.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be 6 char long",
      });
    }

    //dono password ko match kerlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords Don't Match",
      });
    }

    //check user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists , Please Login",
      });
    }

    //if all good hash password and create entry in db and send success response
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dp: `https://api.dicebear.com/8.x/initials/svg?seed=${firstName}`,
    });
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User Cannot Be Registered , try Again",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    //check for empty Fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Fields",
      });
    }

    const iiitEmailRegex = /^[a-zA-Z0-9._%+-]+@iiit\.(com|in|ac)$/;

    if (!iiitEmailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Only IIIT mail allowed",
      });
    }

    //Check User Exists Or Not
    const user = await User.findOne({ email }).populate("cart");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Doesn't Exist Go SignUp",
      });
    }
    //If passwords are matching
    if (await bcrypt.compare(password, user.password)) {
      //create a token using jwt
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      //   user.token = token;
      res.status(200).json({
        success: true,
        message: "Logged In Successfully",
        // user,
        token,
      });
    }
    //If passwords are not matching
    else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
}

module.exports = { login, signup };
