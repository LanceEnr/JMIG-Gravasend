const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const GravaSendModel = require("./models/GravaSend");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/GravaSend");

app.post("/register", (req, res) => {
  GravaSendModel.create(req.body)
    .then((GravaSend) => res.json(GravaSend))
    .catch((err) => res.json(err));
});

app.listen(3000, () => {
  console.log("server is running");
});
