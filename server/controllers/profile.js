const User = require("../models/user");

async function getprofiledata(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "no userId Present",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "no user Present with such id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Details Fetched Successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Some backend error while getting user Details",
    });
  }
}
async function updateprofiledata(req, res) {
  try {
    const userId = req.user.id;
    const data = req.body;
    console.log(data);
    if (
      !data.firstName ||
      !data.lastName ||
      data.firstName.trim() == "" ||
      data.lastName.trim() == ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Name Cannot be empty",
      });
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(data.firstName) || !nameRegex.test(data.lastName)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Name Format",
      });
    }

    if (data.age > 60 || data.age < 18) {
      return res.status(400).json({
        success: false,
        message: "Age must be within 18-60",
      });
    }
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(data.contactNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Phone Number",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Some server error in updating profile",
    });
  }
}
module.exports = { getprofiledata, updateprofiledata };
