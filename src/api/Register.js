const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0:27017/Users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for your users (assuming you have a User model)
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  mobileNumber: String,
  password: String,
  address: String,
  gender: String,
});

const User = mongoose.model("User", userSchema);

// Registration route
app.post("./api/register", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port ${PORT}`);
});
