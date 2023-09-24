const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    _name: String,
    _contactNum: String,
    _date: String,
    _note: String,
    _status: String,
    _endTime: String,
    _startTime: String,
    _appointmentNum: Number,
  },
  { collection: "appointment" }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
