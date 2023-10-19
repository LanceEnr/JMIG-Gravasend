const express = require("express");
const router = express.Router();
const User = require("../models/adminUser");
const Counter = require("../models/counter");
const Code = require("../models/adminCode");
const Order = require("../models/order");
const Inventory = require("../models/inventory");
const Appointment = require("../models/appointment");
const Inquiry = require("../models/inquiry");
const Banner = require("../models/banner");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const iv = crypto.randomBytes(16).toString("hex");
const encryptionKey = crypto.randomBytes(32).toString("hex");
const multer = require("multer");
const path = require("path");

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

const storage = multer.diskStorage({
  destination: "images/banner/uploads/", // The directory where uploaded files will be saved
  filename: function (req, file, cb) {
    cb(null, "banner-" + Date.now() + path.extname(file.originalname)); // Generate a unique filename for each uploaded file
  },
});

// Create a multer instance with the defined storage engine
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // Limit the file size to 1MB
  },
});

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

const getNextCode = async () => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "_codeID" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    return counter.value;
  } catch (err) {
    console.error("Error getting the next inventory number:", err);
    throw err;
  }
};
router.post("/generateCode", async (req, res) => {
  try {
    const _codeID = await getNextCode();
    console.log(_codeID);
    const { accessCode, formattedDate } = req.body;

    const existingCode = await Code.findOne({
      _adminCode: accessCode,
    });

    if (existingCode) {
      return res.status(400).json({ error: "Admin Code conflict" });
    }

    const code = new Code({
      _isRedeem: "false",
      _adminCode: accessCode,
      _dateTime: formattedDate,
      _codeID: _codeID,
    });

    await code.save();

    res.json(code);
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

router.get("/get-events", async (req, res) => {
  try {
    const appointment = await Appointment.find(); // Fetch all orders from the database
    res.json(appointment);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch order data" });
  }
});

router.post("/update-appointment-admin", async (req, res) => {
  const {
    appointmentNum,
    _date,
    _time,
    _dateTime,
    _reasonResched,
    _cancelReason,
  } = req.body;

  try {
    const existingAppointment = await Appointment.findOne({
      _date,
      _time,
      _status: { $ne: "Cancelled" },
    });

    if (existingAppointment) {
      return res.status(400).json({ error: "Appointment conflict" });
    }

    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _appointmentNum: appointmentNum },
      {
        $set: {
          _date,
          _time,
          _dateTime,
          _reasonResched,
        },
      },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
      console.log("Appointment not found");
    }

    // Respond with a success message
    return res.status(200).json({ message: "Appointment edited successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error updating appointment:", error);
    console.log("Error updating appointmen");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/cancel-appointment-admin", async (req, res) => {
  const { appointmentNum, _status, _cancelReason } = req.body;

  try {
    const cancelAppointment = await Appointment.findOneAndUpdate(
      { _appointmentNum: appointmentNum },
      {
        $set: {
          _status,
          _cancelReason,
        },
      },
      { new: true }
    );

    if (!cancelAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
      console.log("Appointment not found");
    }

    // Respond with a success message
    return res
      .status(200)
      .json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error cancelling appointment:", error);
    console.log("Error cancelling appointmen");
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/adminUser", async (req, res) => {
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

      // Decrypt the email for each user using their IV and encryption key
      const decryptedEmail = decryptEmail(
        user._email,
        user._iv,
        user._encryptionKey
      );

      decryptedUsers.push({
        ...user._doc,
        totalOrders,
        pendingOrders,
        _email: decryptedEmail, // Replace the encrypted email with the decrypted one
      });
    }

    res.json(decryptedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/admin-changepassword", async (req, res) => {
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

router.post("/admin-check-email", async (req, res) => {
  const { _email } = req.body;

  const users = await User.find({}, "_email _iv _encryptionKey");
  let isEmailUsed = false;
  for (const user of users) {
    const { _email: encryptedEmail, _iv, _encryptionKey } = user;

    const decryptedEmail = decryptEmail(encryptedEmail, _iv, _encryptionKey);

    if (decryptedEmail === _email) {
      isEmailUsed = true;
      break;
    }
  }
  if (isEmailUsed) {
    console.log("working");
    res.json({ exists: isEmailUsed });
  } else {
    console.log("working");
    res.json({ exists: isEmailUsed });
  }
});

router.post("/admin-send-otp", async (req, res) => {
  const { _email } = req.body;

  const otp = generateOTP();

  const mailOptions = {
    to: _email,
    subject: "Password Reset One-Time Password (OTP)",
    text: `Dear Admin,

We have received a request to reset your password for JMIG Gravel and Sand Supply. Your One-Time Password (OTP) for the password reset process is: ${otp}

Please enter this OTP on the reset password page to continue with the password reset procedure.

If you did not request this password reset, please ignore this email.

Sincerely,
JMIG Gravel and Sand Supply`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending OTP:", error);
      res.json({ success: false });
    } else {
      console.log("OTP sent successfully.");
      res.json({ success: true, otp: otp });
    }
  });
});

router.post("/admin-reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    let getEmail = "";
    const users = await User.find({}, "_email _iv _encryptionKey");
    let emailVerified = false;
    for (const user of users) {
      const { _email: encryptedEmail, _iv, _encryptionKey } = user;

      const decryptedEmail = decryptEmail(encryptedEmail, _iv, _encryptionKey);

      if (decryptedEmail === email) {
        getEmail = encryptedEmail;
      }
    }
    const user = await User.findOne({ _email: getEmail });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user._pwd = hashedPassword;

    await user.save();

    res.json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to reset password." });
  }
});

router.get("/accessCodes", async (req, res) => {
  try {
    const codes = await Code.find({}, { _id: 0 }); // Exclude the _id field
    res.json(codes);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch order data" });
  }
});

router.delete("/accessCodes/:adminCode", async (req, res) => {
  const adminCode = req.params.adminCode;

  try {
    // Find and remove the code by _adminCode
    await Code.deleteOne({ _adminCode: adminCode });
    res.status(204).send(); // 204 No Content on successful deletion
  } catch (error) {
    console.error("Error deleting code:", error);
    res.status(500).json({ error: "Failed to delete the code" });
  }
});

router.post("/upload-banner", upload.single("image"), async (req, res) => {
  const category = req.body.category;
  const heading = req.body.heading;
  const subheading = req.body.subheading;
  const image = req.file.path;

  const banner = new Banner({
    _bannerType: category,
    heading: heading,
    _heading: subheading,
    _subheading: image,
  });

  try {
    await banner.save();

    // Respond with a success message
    res.status(200).json({ message: "Banner uploaded and saved successfully" });
  } catch (error) {
    console.error("Error uploading banner:", error);
    res.status(500).json({ error: "Banner upload failed" });
  }
});

module.exports = router;
