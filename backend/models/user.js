const mongoose = require("mongoose");

// Define the schema for the 'Item' model
const userSchema = new mongoose.Schema(
  {
    _email: String,
    _pwd: String,
    _fName: String,
    _lName: String,
    _userName: String,
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", userSchema);
