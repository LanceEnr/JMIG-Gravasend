const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Order = require("../models/order");
const Appointment = require("../models/appointment");
const mongoose = require("mongoose");

router.post("/register", async (req, res) => {
  try {
    // Extract data from the request body
    const { _email, _pwd, _firstName, _lastName } = req.body;
    const newUser = new User({ _email, _pwd, _firstName, _lastName });

    mongoose.connection.collection("user").insertOne(newUser);

    res.json({ message: "User registered successfully" });
    // The rest of your code to create a new user and handle the response
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
