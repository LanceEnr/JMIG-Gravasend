const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const router = express.Router();
alert("run");
// Use body-parser middleware to parse incoming request bodies
router.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for your users (assuming you have a User model)
const userSchema = new mongoose.Schema({
  firstName: String,
});

const User = mongoose.model("User", userSchema);

// Registration route
router.post("/register", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
