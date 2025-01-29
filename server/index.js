const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const itemRoutes = require("./routes/itemRoutes.js");
require("dotenv").config();
const { connectWithDB } = require("./config/database.js");

app.use(cors());
app.use(express.json());
connectWithDB();

app.use(authRoutes);
app.use(profileRoutes);
app.use(itemRoutes);

const port = process.env.port;
app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
app.get("/", (req, res) => {
  res.send("<h1>Welcome To Homepage 1357</h1>");
});
