const mongoose = require("mongoose");

// Define the schema for the 'Item' model
const userSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("user", userSchema);
