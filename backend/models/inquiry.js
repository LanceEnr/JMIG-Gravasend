const mongoose = require("mongoose");

// Define the schema for the 'Item' model
const inquirySchema = new mongoose.Schema(
  {
    _name: String,
    _email: String,
    _message: String,
  },
  { collection: "inquiry" }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
