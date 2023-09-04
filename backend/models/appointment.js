const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    _name: String,
    _contactNum: String,
    _date: String,
    _time: String,
    _note: String,
  },
  { collection: "appointment" }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
