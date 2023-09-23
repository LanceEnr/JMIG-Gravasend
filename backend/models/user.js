const mongoose = require("mongoose");

// Define the schema for the 'Item' model
const userSchema = new mongoose.Schema(
  {
    _email: String,
    _pwd: String,
    _firstName: String,
    _lastName: String,
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", userSchema);
