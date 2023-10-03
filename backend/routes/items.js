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
const crypto = require("crypto");
const iv = crypto.randomBytes(16);
const encryptionKey = crypto.randomBytes(32);

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
      const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
      const encryptedEmail = Buffer.concat([
        cipher.update(_email, "utf8"),
        cipher.final(),
      ]);

      if (hashedEmailFromDB === encryptedEmail) {
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

    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      encryptionKey, // Replace with your actual secret key
      iv // Replace with your IV
    );
    const encryptedEmail =
      cipher.update(_email, "utf8", "hex") + cipher.final("hex");
    const newUser = new User({
      _email: encryptedEmail,
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

    const decryptedUsers = users.map((user) => {
      try {
        // Ensure user.encryptedData is defined and not empty
        if (!user.encryptedData) {
          throw new Error("Encrypted data is missing.");
        }

        // Extract IV and encryption key from the user's data (modify this part based on your storage)
        const userDataParts = user.encryptedData.split(":");
        if (userDataParts.length !== 2) {
          throw new Error("Invalid encrypted data format.");
        }

        const iv = Buffer.from(userDataParts[0], "hex");
        const encryptionKey = Buffer.from(userDataParts[1], "hex");

        const decipher = crypto.createDecipheriv(
          "aes-256-cbc",
          encryptionKey,
          iv
        );

        const decryptedEmail =
          decipher.update(user._email, "hex", "utf8") + decipher.final("utf8");

        return { ...user._doc, _email: decryptedEmail };
      } catch (decryptionError) {
        console.error("Decryption error:", decryptionError);
        // Handle decryption error here, e.g., log it or skip the user
        return { ...user._doc, _email: "Decryption error" };
      }
    });

    res.json(decryptedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
