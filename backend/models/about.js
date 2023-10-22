const mongoose = require("mongoose");

// Define the schema for the 'Item' model
const aboutSchema = new mongoose.Schema(
  {
    _mission: String,
    _vision: String,
  },
  { collection: "about" }
);

module.exports = mongoose.model("About", aboutSchema);
