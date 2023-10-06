const mongoose = require("mongoose");

// Define the schema for the 'Item' model
const orderSchema = new mongoose.Schema(
  {
    _orderDet: String,
    _name: String,
    _contactNum: String,
    _status: String,
    _date: String,
    _materialType: String,
    _quantity: String,
    _price: String,
    _orderNum: Number,
    _time: String,
    _userName: String,
  },
  { collection: "order" }
);

module.exports = mongoose.model("Order", orderSchema);
