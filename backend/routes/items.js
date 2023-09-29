const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Order = require("../models/order");
const Appointment = require("../models/appointment");
const Inquiry = require("../models/inquiry");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use a valid email service (e.g., Gmail, Outlook, etc.)
  auth: {
    user: "gravelandsandsupplyjmig@gmail.com", // Your email address
    pass: "JMIGGravelAndSandSupply", // Your email password
  },
});

router.post("/register", async (req, res) => {
  const saltRounds = 10;

  try {
    const { _email, _pwd, _fName, _lName, _userName, _phone, _bday, _address } =
      req.body;

    const hashedPassword = await bcrypt.hash(_pwd, saltRounds);
    const hashedEmail = await bcrypt.hash(_email, saltRounds);
    const existingUsernameUser = await User.findOne({ _userName });

    const emails = await User.distinct("_email");
    const isEmailUsed = emails.some(async (hashedEmailFromDB) => {
      const isMatch = await bcrypt.compare(_email, hashedEmailFromDB);
      return isMatch;
    });

    if (existingUsernameUser) {
      return res
        .status(409)
        .json({ field: "username", message: "Username already in use" });
    }

    if (isEmailUsed) {
      return res
        .status(409)
        .json({ field: "email", message: "Email already in use" });
    }

    const newUser = new User({
      _email: hashedEmail,
      _pwd: hashedPassword,
      _fName,
      _lName,
      _userName,
      _phone,
      _bday,
      _address,
    });

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/inquiry", async (req, res) => {
  try {
    const { _name, _email, _message } = req.body;

    const newInquiry = new Inquiry({
      _name,
      _email,
      _message,
    });

    await newInquiry.save();
    res.json({ message: "User registered successfully" });
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
        expiresIn: "7d",
      });
      res.status(200).json({ message: "Authentication successful", token });
    } else {
      res.status(401).json({ message: "Authentication failed" });
      res.json({ field: "email", message: "Email already in use" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/order", async (req, res) => {
  try {
    const orders = await Order.find({});
    console.log("Found orders:", orders);
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
