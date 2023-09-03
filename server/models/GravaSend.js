const mongoose = require("mongoose");

const GravaSendSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  mobileNumber: String,
  password: String,
  address: String,
  gender: String,
});

const GravaSendModel = mongoose.model("GravaSend", GravaSendSchema);
module.exports = GravaSendModel;
