const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemsRouter = require("./routes/items"); // Import your route handlers
const User = require("./models/user");
const Order = require("./models/order");
const Appointment = require("./models/appointment");
const { Tune } = require("@mui/icons-material");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(itemsRouter);
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://johnnikkodelacruzcics:dRxdqtOQYFTxNPyS@atlas-sql-64f295afdbcd3517fdfe51a9-il682.a.query.mongodb.net/gravasend?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connection.on("connected", () => {
  const connectedDatabaseName = mongoose.connection.db.databaseName;
  console.log(`Connected to MongoDB database: ${connectedDatabaseName}`);
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

/*


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
