const mongoose = require("mongoose");

// Define the schema for the 'Item' model
const orderSchema = new mongoose.Schema(
  {
    _orderDet: String,
    _name: String,
    _contactNum: String,
    _status: String,
    _date: String,
  },
  { collection: "order" }
);

module.exports = mongoose.model("Order", orderSchema);
