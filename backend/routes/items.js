const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Order = require("../models/order");
const Appointment = require("../models/appointment");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const saltRounds = 10;

  try {
    const { _email, _pwd, _fName, _lName, _userName } = req.body;
    bcrypt.hash(_pwd, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        bcrypt.hash(_email, saltRounds, async (err, hashedEmail) => {
          if (err) {
            console.error("Error hashing email:", err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            const newUser = new User({
              _email: hashedEmail,
              _pwd: hashedPassword,
              _fName,
              _lName,
              _userName,
            });

            await newUser.save();
            res.json({ message: "User registered successfully" });
          }
        });
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { _pwd, _userName } = req.body;
  try {
    const user = await User.findOne({ _userName });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(_pwd, user._pwd);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, "JMIGGravelandSand", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Authentication successful", token });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
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
