const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    _appointmentNum: {
      type: Number,
      unique: true,
    },
    _date: String,
    _status: String,
    _userName: String,
    _dayOfWeek: String,
    _time: String,
    _fname: String,
    _lName: String,
    _email: String,
    _note: String,
    _phone: String,
  },
  { collection: "appointment" }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
