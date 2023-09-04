const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Order = require("../models/order");
const Appointment = require("../models/appointment");

router.get("/register", async (req, res) => {
  try {
    const users = await User.find({});
    console.log("Found users:", users); // Add this line for logging
    res.json(users);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/register2", async (req, res) => {
  try {
    // Extract data from the request body
    const { _email, _mobile, _name, _pwd, _uname } = req.body;
    console.log(_email);
    // Create a new user with the extracted data
    const newUser = new User({ _email, _mobile, _name, _pwd, _uname });

    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/order", async (req, res) => {
  try {
    const orders = await Order.find({});
    console.log("Found orders:", orders); // Add this line for logging
    res.json(orders);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/appointment", async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    console.log("Found appointments:", appointments); // Add this line for logging
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
