const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
