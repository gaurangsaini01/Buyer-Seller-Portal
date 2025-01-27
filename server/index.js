const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { connectWithDB } = require("./config/database.js");

app.use(cors());
app.use(express.json());
connectWithDB();

const port = process.env.port;
app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
app.get("/", (req, res) => {
  res.send("<h1>Welcome To Homepage 1357</h1>");
});
