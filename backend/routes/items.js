const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Order = require("../models/order");
const Appointment = require("../models/appointment");
const UserID = require("../models/counter");
const mongoose = require("mongoose");

router.post("/register", async (req, res) => {
  try {
    // Extract data from the request body
    const { _email, _pwd, _fName, _lName, _userName } = req.body;
    // Create a function to get the next custom _id value
    async function getNextUserId() {
      const counterDoc = await Counter.findOneAndUpdate(
        { _id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      return counterDoc.seq;
    }

    // Use the getNextUserId function to get the next custom _id value
    const nextUserId = await getNextUserId();

    //const newUser = new User({ _email, _pwd, _fName, _lName, _userName });

    mongoose.connection.collection("user").insertOne({
      _id: nextUserId,
      _email: req.body.email,
      _pwd: req.body.password,
      _fName: req.body.firstName,
      _lName: req.body.lastName,
      _userName: req.body.userName,
    });

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
