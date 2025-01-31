const mongoose = require("mongoose");
require("dotenv").config();

async function connectWithDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("Error in connecting Database:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
}

module.exports = { connectWithDB };
