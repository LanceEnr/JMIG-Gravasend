const mongoose = require("mongoose");

// Define the schema for the 'Item' model
const userSchema = new mongoose.Schema(
  {
    _email: String,
    _mobile: String,
    _name: String,
    _pwd: String,
    _uname: String,
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", userSchema);
