const express = require("express");
const router = express.Router();
const User = require("../models/adminUser");
const Counter = require("../models/counter");
const Code = require("../models/adminCode");
const Order = require("../models/order");
const Inventory = require("../models/inventory");
const Inquiry = require("../models/inquiry");
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
    pass: "dgqg rirx mvlv frix", // Your email password
  },
});
const decryptEmail = (encryptedEmail, iv, encryptionKey) => {
  try {
    if (!encryptedEmail || !iv || !encryptionKey) {
      // Handle missing parameters gracefully
      return "1";
    }

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(encryptionKey, "hex"),
      Buffer.from(iv, "hex")
    );

    let decrypted = decipher.update(encryptedEmail, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Error decrypting email:", error);
    return "2"; // Handle decryption error gracefully
  }
};

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
const registeredUsers = [
  // Your registered users' data here
];

router.post("/adminRegister", async (req, res) => {
  const {
    _email,
    _pwd,
    _fName,
    _lName,
    _userName,
    _phone,
    _bday,
    _address,
    _adminCode,
  } = req.body;
  const saltRounds = 10;

  try {
    const {
      _email,
      _pwd,
      _fName,
      _lName,
      _userName,
      _phone,
      _bday,
      _address,
      _adminCode,
    } = req.body;

    const existingUsernameUser = await User.findOne({ _userName });
    const adminCodeDoc = await Code.findOne({ _adminCode });

    const users = await User.find({}, "_email _iv _encryptionKey");
    let isEmailUsed = false;

    for (const user of users) {
      const { _email: encryptedEmail, _iv, _encryptionKey } = user;

      const decryptedEmail = decryptEmail(encryptedEmail, _iv, _encryptionKey);

      if (decryptedEmail === _email) {
        isEmailUsed = true;
        break; // Exit the loop early if a match is found
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
      _iv: iv,
      _encryptionKey: encryptionKey,
    });

    if (!adminCodeDoc) {
      // If the admin code is not found, handle the error or return an appropriate response
      return { success: false, message: "Admin code not found" };
    }

    // Update _isRedeem to true
    adminCodeDoc._isRedeem = true;

    // Save the updated document
    await adminCodeDoc.save();

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/adminLogin", async (req, res) => {
  const { _pwd, _userName } = req.body;
  try {
    const user = await User.findOne({ _userName });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(_pwd, user._pwd);

    if (passwordMatch) {
      const adminToken = jwt.sign({ userId: user._id }, "JMIGGravelandSand", {
        expiresIn: "7d",
      });

      return res.status(200).json({
        message: "Authentication successful",
        adminToken,
        userName: user._userName,
      });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
const getNextInventoryNum = async () => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "_inventoryID" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    return counter.value;
  } catch (err) {
    console.error("Error getting the next inventory number:", err);
    throw err;
  }
};
router.get("/generateId", async (req, res) => {
  try {
    const id = await getNextInventoryNum();
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate ID" });
  }
});
router.get("/currentInventory", async (req, res) => {
  try {
    const data = await Inventory.find(
      { _status: "current" },
      {
        _inventoryID: 1,
        _itemName: 1,
        _quantity: 1,
        _location: 1,
        _lastUpdated: 1,
        _id: 0, // Exclude the default _id field
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/incomingInventory", async (req, res) => {
  try {
    const data = await Inventory.find(
      { _status: "incoming" },
      {
        _inventoryID: 1,
        _itemName: 1,
        _quantity: 1,
        _location: 1,
        _lastUpdated: 1,
        _id: 0, // Exclude the default _id field
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/outgoingInventory", async (req, res) => {
  try {
    const data = await Inventory.find(
      { _status: "outgoing" },
      {
        _inventoryID: 1,
        _itemName: 1,
        _quantity: 1,
        _location: 1,
        _lastUpdated: 1,
        _id: 0, // Exclude the default _id field
      }
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/generateCode", async (req, res) => {
  try {
    const { accessCode } = req.body;

    const existingCode = await Code.findOne({
      _adminCode: accessCode,
    });

    if (existingCode) {
      return res.status(400).json({ error: "Admin Code conflict" });
    }

    const code = new Code({
      _isRedeem: "false",
      _adminCode: accessCode,
    });

    await code.save();

    res.json({ message: "Admin code generated successfully" });
  } catch (error) {
    console.error("Error generating admin code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/addInventory", async (req, res) => {
  const { actionId, itemName, quantity, location, lastUpdated } = req.body;
  const exisitingName = await Inventory.findOne({
    _itemName: itemName,
    _status: "current",
  });

  if (exisitingName) {
    // An appointment with the same date and time already exists and is not cancelled
    return res.status(400).json({ error: "Name conflict" });
  }
  const inventory = new Inventory({
    _inventoryID: actionId,
    _itemName: itemName,
    _quantity: quantity,
    _location: location,
    _lastUpdated: lastUpdated,
    _status: "current",
  });

  await inventory.save();

  res.json({ message: "Appointment saved successfully" });
});

router.delete("/deleteRecord/:_inventoryID", async (req, res) => {
  try {
    const id = req.params._inventoryID;
    const removedRecord = await Inventory.findOneAndRemove({
      _inventoryID: id,
    }); // Use findOneAndRemove

    if (removedRecord) {
      res.json({ message: "Record deleted successfully" });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    console.error("Error deleting record", error);
    res
      .status(500)
      .json({ message: "Failed to delete the record", error: error.message });
  }
});
router.get("/get-order", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.json(orders);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch order data" });
  }
});
router.get("/get-inquiry", async (req, res) => {
  try {
    const inquiry = await Inquiry.find(); // Fetch all orders from the database
    res.json(inquiry);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch order data" });
  }
});

module.exports = router;