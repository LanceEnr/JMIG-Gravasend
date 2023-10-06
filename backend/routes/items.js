const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Order = require("../models/order");
const Appointment = require("../models/appointment");
const Inquiry = require("../models/inquiry");
const Counter = require("../models/counter");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const iv = crypto.randomBytes(16).toString("hex");
const encryptionKey = crypto.randomBytes(32).toString("hex");

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

    const existingUsernameUser = await User.findOne({ _userName });

    const emails = await User.distinct("_email");
    let isEmailUsed = false;

    for (const hashedEmailFromDB of emails) {
      const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(encryptionKey, "hex"),
        Buffer.from(iv, "hex")
      );
      const encryptedEmail = Buffer.concat([
        cipher.update(_email, "utf8"),
        cipher.final(),
      ]);
      const userDataToStoreForUser = `${iv}:${encryptionKey}`;

      if (hashedEmailFromDB === encryptedEmail.toString("base64")) {
        isEmailUsed = true;
        break;
      }
    }

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

    const hashedPassword = await bcrypt.hash(_pwd, saltRounds);

    const cipherForEncryption = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(encryptionKey, "hex"),
      Buffer.from(iv, "hex")
    );
    const encryptedEmailForUser = Buffer.concat([
      cipherForEncryption.update(_email, "utf8"),
      cipherForEncryption.final(),
    ]);
    const userDataToStoreForUser = `${iv}:${encryptionKey}`;

    const newUser = new User({
      _email: encryptedEmailForUser.toString("base64"), // Store the encrypted email in base64 format
      _pwd: hashedPassword,
      _fName,
      _lName,
      _userName,
      _phone,
      _bday,
      _address,
    });

    // Save the new user with encrypted email
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
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

      res.status(200).json({
        message: "Authentication successful",
        token,
        userName: user._userName,
      });
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
    const storedUsername = req.query.userName;
    const orders = await Order.find({ _userName: storedUsername });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/appointment", async (req, res) => {
  try {
    const storedUsername = req.query.userName;
    const appointments = await Appointment.find({ _userName: storedUsername });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user", async (req, res) => {
  try {
    const storedUsername = req.query.userName;
    const users = await User.find({ _userName: storedUsername });

    const decryptedUsers = [];

    for (const user of users) {
      const totalOrders = await Order.countDocuments({
        _userName: storedUsername,
      });
      const pendingOrders = await Order.countDocuments({
        _userName: storedUsername,
        status: "Pending",
      });

      decryptedUsers.push({
        ...user._doc,
        totalOrders,
        pendingOrders,
      });
    }

    res.json(decryptedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/setuser", async (req, res) => {
  try {
    const storedUsername = req.query.userName;
    const users = await User.find({ _userName: storedUsername });

    const selectedFields = users.map((user) => {
      return {
        Phone: user._phone,
        Address: user._address,
      };
    });

    res.json(selectedFields);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/changepassword", async (req, res) => {
  try {
    const { userName, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ _userName: userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user._pwd);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user._pwd = hashedPassword;

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/updatephoneaddress", async (req, res) => {
  try {
    const { userName, phone, address } = req.body;
    const user = await User.findOne({ _userName: userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user._phone = phone;
    user._address = address;

    await user.save();

    res.status(200).json({ message: "Phone and address updated successfully" });
  } catch (error) {
    console.error("Error updating phone and address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const getNextAppointmentNum = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "appointmentNumber" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};
router.post("/save-appointment", async (req, res) => {
  try {
    const { _userName, _note, _date, _fName, _lName, _phone, _time, _email } =
      req.body;

    // Check if an appointment with the same date, time, and status "Cancelled" exists
    const existingAppointment = await Appointment.findOne({
      _date,
      _time,
      _status: { $ne: "Cancelled" }, // Exclude "Cancelled" status
    });

    if (existingAppointment) {
      // An appointment with the same date and time already exists and is not cancelled
      return res.status(400).json({ error: "Appointment conflict" });
    }

    const _appointmentNum = await getNextAppointmentNum();
    const appointment = new Appointment({
      _appointmentNum,
      _userName,
      _note,
      _date,
      _fName,
      _lName,
      _phone,
      _email,
      _time,
      _status: "Upcoming",
    });

    await appointment.save();

    res.json({ message: "Appointment saved successfully" });
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-appointment", async (req, res) => {
  try {
    const { appointmentNum } = req.query;

    // Find the appointment by its ID
    const appointment = await Appointment.findById(appointmentNum);

    if (!appointment) {
      // If the appointment with the given ID is not found
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Return the appointment details
    res.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/cancel-appointment", async (req, res) => {
  try {
    const { _appointmentNum, _status } = req.body;

    const appointment = await Appointment.findOne({ _appointmentNum });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    appointment._status = _status;
    await appointment.save();

    res.json({ message: "Appointment canceled successfully" });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/get-counts", async (req, res) => {
  const storedUsername = req.query.userName;
  const users = await User.find({ _userName: storedUsername });

  try {
    for (const user of users) {
      const ordersCount = await Order.countDocuments({
        _userName: storedUsername,
      });
      const appointmentsCount = await Appointment.countDocuments({
        _userName: storedUsername,
      });
      res.json({
        totalOrders: ordersCount,
        totalAppointments: appointmentsCount,
      });
    }
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
