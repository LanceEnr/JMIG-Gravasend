const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemsRouter = require("./routes/items"); // Import your route handlers
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb://johnnikkodelacruzcics:dRxdqtOQYFTxNPyS@atlas-sql-64f295afdbcd3517fdfe51a9-il682.a.query.mongodb.net/gravasend?ssl=true&authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name");
    console.log("Found users:", users); // Add this line for logging

    res.json(users);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/*
app.get("/", async (req, res) => {
  try {
    const user = userModel.find();
    res.json(user);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/register", async (req, res) => {
  try {
    // Extract the "name" field from the request body
    const { name } = req.body;

    // Create a new item with the extracted name
    const newUser = new user({ name });

    // Save the item to MongoDB
    await newUser.save();

    res.json({ message: "Item saved successfully" });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
*/

app.use("/api/items", itemsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});
