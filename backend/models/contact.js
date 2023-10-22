const mongoose = require("mongoose");

// Define the schema for the 'Item' model
const contactSchema = new mongoose.Schema(
  {
    _address: String,
    _contactNo: String,
    _email: String,
    _fb: String,
    _messenger: String,
  },
  { collection: "contact" }
);

module.exports = mongoose.model("Contact", contactSchema);
